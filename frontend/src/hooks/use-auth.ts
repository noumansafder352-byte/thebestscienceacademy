import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, login, logout, type AuthMe } from "@/lib/tutor-api.functions";

const AUTH_KEY = ["auth", "me"] as const;

/** The signed-in user (from the backend's session cookie). */
export function useAuth() {
  const { data, isLoading } = useQuery({
    queryKey: AUTH_KEY,
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
  return { user: data?.user ?? null, isAdmin: data?.isAdmin ?? false, loading: isLoading };
}

/** Sign in / sign out, keeping every useAuth() in sync. */
export function useAuthActions() {
  const queryClient = useQueryClient();
  return {
    async signIn(email: string, password: string): Promise<AuthMe> {
      const me = await login({ data: { email, password } });
      queryClient.setQueryData(AUTH_KEY, me);
      return me;
    },
    async signOut(): Promise<void> {
      try {
        await logout();
      } finally {
        queryClient.setQueryData(AUTH_KEY, null);
        // Drop cached admin data so nothing is shown after signing out.
        queryClient.removeQueries({ predicate: (q) => q.queryKey[0] !== AUTH_KEY[0] });
      }
    },
  };
}
