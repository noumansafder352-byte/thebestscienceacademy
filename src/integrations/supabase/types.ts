export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: Database["public"]["Enums"]["message_status"]
          subject: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: Database["public"]["Enums"]["message_status"]
          subject?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: Database["public"]["Enums"]["message_status"]
          subject?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      trial_bookings: {
        Row: {
          country: string | null
          created_at: string
          curriculum: string | null
          email: string
          grade_level: string | null
          id: string
          notes: string | null
          parent_name: string | null
          phone: string | null
          preferred_time: string | null
          status: Database["public"]["Enums"]["booking_status"]
          student_name: string
          subject: string | null
          tutor_slug: string | null
          updated_at: string
          whatsapp: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          curriculum?: string | null
          email: string
          grade_level?: string | null
          id?: string
          notes?: string | null
          parent_name?: string | null
          phone?: string | null
          preferred_time?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          student_name: string
          subject?: string | null
          tutor_slug?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string
          curriculum?: string | null
          email?: string
          grade_level?: string | null
          id?: string
          notes?: string | null
          parent_name?: string | null
          phone?: string | null
          preferred_time?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          student_name?: string
          subject?: string | null
          tutor_slug?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      tutor_applications: {
        Row: {
          admin_notes: string | null
          availability: Database["public"]["Enums"]["tutor_availability"] | null
          bio: string | null
          city: string | null
          cnic_back_path: string | null
          cnic_front_path: string | null
          country: string | null
          created_at: string
          curriculums: string[]
          cv_path: string | null
          education: Json
          email: string
          experience_years: string | null
          full_name: string
          gender: string | null
          grade_levels: string[]
          id: string
          languages: string[]
          methodology: string | null
          nationality: string | null
          phone: string | null
          photo_path: string | null
          preferred_contact:
            | Database["public"]["Enums"]["preferred_contact"]
            | null
          professional_title: string
          qualification: string | null
          rejected_at: string | null
          rejected_by: string | null
          rejection_comments: string | null
          rejection_email_attempted_at: string | null
          rejection_email_error: string | null
          rejection_email_status: string | null
          rejection_reason: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          schedule: Json
          status: Database["public"]["Enums"]["application_status"]
          subjects: string[]
          timezone: string | null
          updated_at: string
          whatsapp: string | null
        }
        Insert: {
          admin_notes?: string | null
          availability?:
            | Database["public"]["Enums"]["tutor_availability"]
            | null
          bio?: string | null
          city?: string | null
          cnic_back_path?: string | null
          cnic_front_path?: string | null
          country?: string | null
          created_at?: string
          curriculums?: string[]
          cv_path?: string | null
          education?: Json
          email: string
          experience_years?: string | null
          full_name: string
          gender?: string | null
          grade_levels?: string[]
          id?: string
          languages?: string[]
          methodology?: string | null
          nationality?: string | null
          phone?: string | null
          photo_path?: string | null
          preferred_contact?:
            | Database["public"]["Enums"]["preferred_contact"]
            | null
          professional_title: string
          qualification?: string | null
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_comments?: string | null
          rejection_email_attempted_at?: string | null
          rejection_email_error?: string | null
          rejection_email_status?: string | null
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          schedule?: Json
          status?: Database["public"]["Enums"]["application_status"]
          subjects?: string[]
          timezone?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Update: {
          admin_notes?: string | null
          availability?:
            | Database["public"]["Enums"]["tutor_availability"]
            | null
          bio?: string | null
          city?: string | null
          cnic_back_path?: string | null
          cnic_front_path?: string | null
          country?: string | null
          created_at?: string
          curriculums?: string[]
          cv_path?: string | null
          education?: Json
          email?: string
          experience_years?: string | null
          full_name?: string
          gender?: string | null
          grade_levels?: string[]
          id?: string
          languages?: string[]
          methodology?: string | null
          nationality?: string | null
          phone?: string | null
          photo_path?: string | null
          preferred_contact?:
            | Database["public"]["Enums"]["preferred_contact"]
            | null
          professional_title?: string
          qualification?: string | null
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_comments?: string | null
          rejection_email_attempted_at?: string | null
          rejection_email_error?: string | null
          rejection_email_status?: string | null
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          schedule?: Json
          status?: Database["public"]["Enums"]["application_status"]
          subjects?: string[]
          timezone?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      tutors: {
        Row: {
          application_id: string | null
          availability: Database["public"]["Enums"]["tutor_availability"]
          bio: string | null
          city: string | null
          country: string | null
          created_at: string
          curriculums: string[]
          deleted_at: string | null
          education: Json
          experience: string | null
          gender: string | null
          grade_levels: string[]
          id: string
          is_active: boolean
          is_featured: boolean
          languages: string[]
          methodology: string | null
          name: string
          nationality: string | null
          photo_url: string | null
          qualification: string | null
          rating: number
          reviews: number
          schedule: Json
          slug: string
          subjects: string[]
          timezone: string | null
          title: string
          updated_at: string
        }
        Insert: {
          application_id?: string | null
          availability?: Database["public"]["Enums"]["tutor_availability"]
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          curriculums?: string[]
          deleted_at?: string | null
          education?: Json
          experience?: string | null
          gender?: string | null
          grade_levels?: string[]
          id?: string
          is_active?: boolean
          is_featured?: boolean
          languages?: string[]
          methodology?: string | null
          name: string
          nationality?: string | null
          photo_url?: string | null
          qualification?: string | null
          rating?: number
          reviews?: number
          schedule?: Json
          slug: string
          subjects?: string[]
          timezone?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          application_id?: string | null
          availability?: Database["public"]["Enums"]["tutor_availability"]
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          curriculums?: string[]
          deleted_at?: string | null
          education?: Json
          experience?: string | null
          gender?: string | null
          grade_levels?: string[]
          id?: string
          is_active?: boolean
          is_featured?: boolean
          languages?: string[]
          methodology?: string | null
          name?: string
          nationality?: string | null
          photo_url?: string | null
          qualification?: string | null
          rating?: number
          reviews?: number
          schedule?: Json
          slug?: string
          subjects?: string[]
          timezone?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tutors_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "tutor_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      approve_tutor_application: {
        Args: { _application_id: string; _photo_url: string; _slug: string }
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      application_status:
        | "pending"
        | "interview"
        | "approved"
        | "rejected"
        | "removed"
      booking_status:
        | "new"
        | "contacted"
        | "scheduled"
        | "completed"
        | "cancelled"
      message_status: "unread" | "read" | "archived"
      preferred_contact: "Email" | "WhatsApp" | "Phone"
      tutor_availability: "Available" | "Limited Availability" | "Fully Booked"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      application_status: [
        "pending",
        "interview",
        "approved",
        "rejected",
        "removed",
      ],
      booking_status: [
        "new",
        "contacted",
        "scheduled",
        "completed",
        "cancelled",
      ],
      message_status: ["unread", "read", "archived"],
      preferred_contact: ["Email", "WhatsApp", "Phone"],
      tutor_availability: ["Available", "Limited Availability", "Fully Booked"],
    },
  },
} as const
