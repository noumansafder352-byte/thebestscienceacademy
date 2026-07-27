import { Link, Outlet, useNavigate, useRouterState, createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  LayoutDashboard, Users, GraduationCap, FileText, Mail, Settings, Bell, Search, ChevronDown, LogOut, Menu, X,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { getIsAdmin } from "@/lib/tutor-api.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — The Best Science Academy" },
      { name: "description", content: "Internal admin dashboard." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLayout,
});

const nav: { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/tutors", label: "Tutors", icon: GraduationCap },
  { to: "/admin/students", label: "Students", icon: Users },
  { to: "/admin/applications", label: "Applications", icon: FileText },
  { to: "/admin/messages", label: "Messages", icon: Mail },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const isLoginRoute = pathname === "/admin/login";
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const checkAdmin = useServerFn(getIsAdmin);
  const { data: adminCheck, isLoading: checkingAdmin } = useQuery({
    queryKey: ["is-admin", user?.id],
    queryFn: () => checkAdmin(),
    enabled: !!user && !isLoginRoute,
  });

  useEffect(() => {
    if (isLoginRoute) return;
    if (loading) return;
    if (!user) {
      navigate({ to: "/admin/login" });
    }
  }, [loading, user, isLoginRoute, navigate]);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  if (isLoginRoute) return <Outlet />;

  if (loading || (user && checkingAdmin)) {
    return <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">Loading…</div>;
  }

  if (user && adminCheck && !adminCheck.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center card-surface p-8">
          <h1 className="heading-md">Not authorised</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Your account doesn't have admin access. Ask a super-admin to grant you the <code>admin</code> role,
            then reload this page.
          </p>
          <button
            className="btn-ghost mt-6"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/admin/login" });
            }}
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>
    );
  }

  const renderSidebar = (onNavigate?: () => void) => (
    <>
      <div className="flex items-center justify-center border-b border-white/10 px-5 py-7">
        <img
          src="/image/The-Best-Science-Academy-White-Theme.png"
          alt="The Best Science Academy"
          className="w-full max-w-[190px] object-contain"
        />
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {nav.map((item) => {
          const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to as "/admin"}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="space-y-2 border-t border-white/10 p-4 text-xs text-white/55">
        <Link to="/" onClick={onNavigate} className="block hover:text-gold">
          ← Back to website
        </Link>
        <button
          onClick={async () => {
            onNavigate?.();
            await supabase.auth.signOut();
            navigate({ to: "/admin/login" });
          }}
          className="inline-flex items-center gap-1.5 hover:text-gold"
        >
          <LogOut className="h-3 w-3" /> Sign out
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-surface-2">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col bg-ink text-white lg:flex">{renderSidebar()}</aside>

      {/* Mobile off-canvas sidebar */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileNavOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-72 max-w-[82%] flex-col bg-ink text-white shadow-2xl">
            <button
              onClick={() => setMobileNavOpen(false)}
              aria-label="Close menu"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            {renderSidebar(() => setMobileNavOpen(false))}
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between gap-3 border-b border-border bg-surface px-4 lg:gap-4 lg:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <button
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-ink lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative min-w-0 max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search tutors, students, applications…"
                className="h-10 w-full rounded-full border border-border bg-surface-2 pl-9 pr-4 text-sm outline-none focus:border-primary focus:bg-surface"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-gold" />
            </button>
            <button className="flex h-10 items-center gap-2 rounded-full border border-border pl-1 pr-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white">
                {user?.email?.[0]?.toUpperCase() ?? "A"}
              </span>
              <span className="hidden max-w-[140px] truncate text-sm font-medium sm:inline">{user?.email ?? "Admin"}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </header>
        <main className="flex-1 p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
