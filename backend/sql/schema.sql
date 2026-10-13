-- =====================================================================
--  The Best Science Academy — MySQL / MariaDB schema
--
--  Converted from the Supabase (PostgreSQL) migrations in /supabase.
--  Works on MySQL 8.0.13+ and MariaDB 10.4+.
--
--  Run locally with:   npm run db:setup
--  Or import this file into an existing database (e.g. via phpMyAdmin).
--  Every statement is idempotent, so re-running it is safe.
--
--  Conversion notes (Postgres -> MySQL):
--    uuid                -> CHAR(36), generated in app code (crypto.randomUUID)
--    text[] / jsonb      -> JSON
--    enum types          -> inline ENUM(...)
--    timestamptz         -> DATETIME(6), always stored as UTC
--    set_updated_at()    -> ON UPDATE CURRENT_TIMESTAMP(6)
--    auth.users+profiles -> users (one table)
--    has_role(), approve_tutor_application(), RLS policies -> backend code
-- =====================================================================

SET NAMES utf8mb4;

-- ---------------------------------------------------------------------
--  Users (replaces Supabase auth.users + public.profiles)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id             CHAR(36)     NOT NULL,
  email          VARCHAR(255) NOT NULL,
  -- bcrypt hash; existing Supabase hashes are copied over unchanged
  password_hash  VARCHAR(255) NOT NULL,
  full_name      VARCHAR(255) NULL,
  last_login_at  DATETIME(6)  NULL,
  created_at     DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at     DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  UNIQUE KEY users_email_key (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
--  User roles
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_roles (
  id          CHAR(36)    NOT NULL,
  user_id     CHAR(36)    NOT NULL,
  role        ENUM('admin', 'moderator', 'user') NOT NULL,
  created_at  DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  UNIQUE KEY user_roles_user_role_key (user_id, role),
  CONSTRAINT user_roles_user_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
--  Tutor applications (private — admin only)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tutor_applications (
  id                 CHAR(36)     NOT NULL,
  status             ENUM('pending', 'interview', 'approved', 'rejected', 'removed') NOT NULL DEFAULT 'pending',

  -- Personal
  full_name          VARCHAR(255) NOT NULL,
  gender             VARCHAR(50)  NULL,
  nationality        VARCHAR(100) NULL,
  country            VARCHAR(100) NULL,
  city               VARCHAR(100) NULL,
  timezone           VARCHAR(100) NULL,

  -- Private contact
  email              VARCHAR(255) NOT NULL,
  phone              VARCHAR(50)  NULL,
  whatsapp           VARCHAR(50)  NULL,
  preferred_contact  ENUM('Email', 'WhatsApp', 'Phone') NULL,

  -- Professional
  professional_title VARCHAR(255) NOT NULL,
  qualification      TEXT         NULL,
  experience_years   VARCHAR(50)  NULL,
  bio                TEXT         NULL,
  methodology        TEXT         NULL,

  -- Lists (JSON arrays of strings)
  subjects           JSON         NOT NULL DEFAULT (JSON_ARRAY()),
  curriculums        JSON         NOT NULL DEFAULT (JSON_ARRAY()),
  grade_levels       JSON         NOT NULL DEFAULT (JSON_ARRAY()),
  languages          JSON         NOT NULL DEFAULT (JSON_ARRAY()),

  -- Structured (JSON arrays of objects)
  education          JSON         NOT NULL DEFAULT (JSON_ARRAY()),
  schedule           JSON         NOT NULL DEFAULT (JSON_ARRAY()),
  availability       ENUM('Available', 'Limited Availability', 'Fully Booked') NULL DEFAULT 'Available',

  -- Uploaded files (paths inside backend/uploads)
  photo_path         VARCHAR(500) NULL,
  cv_path            VARCHAR(500) NULL,
  cnic_front_path    VARCHAR(500) NULL,
  cnic_back_path     VARCHAR(500) NULL,

  -- Admin review
  admin_notes        TEXT         NULL,
  reviewed_by        CHAR(36)     NULL,
  reviewed_at        DATETIME(6)  NULL,

  -- Rejection
  rejection_reason             TEXT         NULL,
  rejection_comments           TEXT         NULL,
  rejected_by                  CHAR(36)     NULL,
  rejected_at                  DATETIME(6)  NULL,
  rejection_email_status       VARCHAR(50)  NULL,
  rejection_email_error        TEXT         NULL,
  rejection_email_attempted_at DATETIME(6)  NULL,

  created_at         DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at         DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  KEY tutor_applications_status_created_idx (status, created_at),
  KEY tutor_applications_created_idx (created_at),
  CONSTRAINT tutor_applications_reviewed_by_fk FOREIGN KEY (reviewed_by) REFERENCES users (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
--  Tutors (public profiles)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tutors (
  id             CHAR(36)     NOT NULL,
  application_id CHAR(36)     NULL,
  slug           VARCHAR(255) NOT NULL,
  name           VARCHAR(255) NOT NULL,
  title          VARCHAR(255) NOT NULL,
  photo_url      VARCHAR(500) NULL,
  qualification  TEXT         NULL,
  experience     VARCHAR(100) NULL,

  subjects       JSON         NOT NULL DEFAULT (JSON_ARRAY()),
  curriculums    JSON         NOT NULL DEFAULT (JSON_ARRAY()),
  grade_levels   JSON         NOT NULL DEFAULT (JSON_ARRAY()),
  languages      JSON         NOT NULL DEFAULT (JSON_ARRAY()),

  bio            TEXT         NULL,
  gender         VARCHAR(50)  NULL,
  nationality    VARCHAR(100) NULL,
  country        VARCHAR(100) NULL,
  city           VARCHAR(100) NULL,
  timezone       VARCHAR(100) NULL,
  availability   ENUM('Available', 'Limited Availability', 'Fully Booked') NOT NULL DEFAULT 'Available',
  methodology    TEXT         NULL,
  education      JSON         NOT NULL DEFAULT (JSON_ARRAY()),
  schedule       JSON         NOT NULL DEFAULT (JSON_ARRAY()),

  rating         DECIMAL(3,2) NOT NULL DEFAULT 5.00,
  reviews        INT          NOT NULL DEFAULT 0,
  is_active      TINYINT(1)   NOT NULL DEFAULT 1,
  is_featured    TINYINT(1)   NOT NULL DEFAULT 0,
  deleted_at     DATETIME(6)  NULL,

  created_at     DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at     DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  UNIQUE KEY tutors_slug_key (slug),
  KEY tutors_deleted_at_idx (deleted_at),
  KEY tutors_public_list_idx (is_active, deleted_at, is_featured, rating),
  KEY tutors_application_idx (application_id),
  CONSTRAINT tutors_application_fk FOREIGN KEY (application_id) REFERENCES tutor_applications (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
--  Trial bookings
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS trial_bookings (
  id             CHAR(36)     NOT NULL,
  tutor_slug     VARCHAR(255) NULL,
  student_name   VARCHAR(255) NOT NULL,
  parent_name    VARCHAR(255) NULL,
  email          VARCHAR(255) NOT NULL,
  phone          VARCHAR(50)  NULL,
  whatsapp       VARCHAR(50)  NULL,
  country        VARCHAR(100) NULL,
  curriculum     VARCHAR(100) NULL,
  subject        VARCHAR(255) NULL,
  grade_level    VARCHAR(100) NULL,
  preferred_time VARCHAR(255) NULL,
  notes          TEXT         NULL,
  status         ENUM('new', 'contacted', 'scheduled', 'completed', 'cancelled') NOT NULL DEFAULT 'new',
  created_at     DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at     DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  KEY trial_bookings_created_idx (created_at),
  KEY trial_bookings_status_idx (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
--  Contact messages
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_messages (
  id          CHAR(36)     NOT NULL,
  name        VARCHAR(255) NOT NULL,
  email       VARCHAR(255) NOT NULL,
  phone       VARCHAR(50)  NULL,
  subject     VARCHAR(255) NULL,
  message     TEXT         NOT NULL,
  status      ENUM('unread', 'read', 'archived') NOT NULL DEFAULT 'unread',
  created_at  DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at  DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  KEY contact_messages_status_created_idx (status, created_at),
  KEY contact_messages_created_idx (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
