import { Link, Outlet, useNavigate, useRouterState, createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  LayoutDashboard, Users, GraduationCap, FileText, Mail, Settings, Bell, Search, ChevronDown, LogOut,
} from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
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

  return (
    <div className="min-h-screen bg-surface-2 flex">
      <aside className="hidden lg:flex w-64 shrink-0 bg-ink text-white flex-col">
        <div className="px-5 py-6 flex items-center justify-center border-b border-white/10">
          <div className="h-16 w-16 rounded-xl bg-white/95 p-1.5 flex items-center justify-center">
            <img src={logo.url} alt="The Best Science Academy" className="h-full w-full object-contain" />
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to as "/admin"}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10 text-xs text-white/55 space-y-2">
          <Link to="/" className="hover:text-gold block">← Back to website</Link>
          <button
            onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/admin/login" }); }}
            className="hover:text-gold inline-flex items-center gap-1.5"
          >
            <LogOut className="h-3 w-3" /> Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-5 lg:px-8 gap-4">
          <div className="relative max-w-md flex-1">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search tutors, students, applications…"
              className="w-full h-10 pl-9 pr-4 rounded-full border border-border bg-surface-2 text-sm focus:bg-surface focus:border-primary outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="h-10 w-10 rounded-full border border-border flex items-center justify-center relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-gold" />
            </button>
            <button className="flex items-center gap-2 h-10 pl-1 pr-3 rounded-full border border-border">
              <span className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary text-white text-xs font-bold flex items-center justify-center">
                {user?.email?.[0]?.toUpperCase() ?? "A"}
              </span>
              <span className="hidden sm:inline text-sm font-medium truncate max-w-[140px]">{user?.email ?? "Admin"}</span>
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
