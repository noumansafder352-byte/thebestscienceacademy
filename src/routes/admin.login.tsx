import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Sign In — The Best Science Academy" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate({ to: "/admin" });
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-2 flex items-center justify-center px-4">
      <div className="w-full max-w-md card-surface p-8">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider font-semibold text-primary">Admin</div>
            <h1 className="font-[var(--font-display)] font-bold text-ink text-lg">
              {mode === "signin" ? "Sign in to dashboard" : "Create admin account"}
            </h1>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-semibold text-ink">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full h-11 px-4 rounded-lg border border-border bg-surface-2 text-sm focus:bg-surface focus:border-primary outline-none"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-ink">Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full h-11 px-4 rounded-lg border border-border bg-surface-2 text-sm focus:bg-surface focus:border-primary outline-none"
              placeholder="Minimum 8 characters"
            />
          </div>
          {error && (
            <p className="text-xs font-medium text-destructive">{error}</p>
          )}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          {mode === "signin" ? (
            <>
              Need an admin account?{" "}
              <button className="text-primary font-semibold" onClick={() => setMode("signup")}>
                Create one
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button className="text-primary font-semibold" onClick={() => setMode("signin")}>
                Sign in
              </button>
            </>
          )}
        </div>

        <p className="mt-6 text-[11px] text-muted-foreground leading-relaxed text-center border-t border-border pt-4">
          After creating the first account, grant admin access by running{" "}
          <code className="bg-surface-2 px-1 py-0.5 rounded">
            insert into user_roles(user_id, role) values ('&lt;your-uid&gt;', 'admin');
          </code>{" "}
          from the Cloud SQL editor.
        </p>
      </div>
    </div>
  );
}
