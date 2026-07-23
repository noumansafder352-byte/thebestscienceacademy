import { r as __toESM } from "../_runtime.mjs";
import { c as require_react, i as useQuery, s as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, f as Outlet, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { Q as GraduationCap, R as Mail, S as Search, Tt as Bell, V as LogOut, W as LayoutDashboard, _t as ChevronDown, a as Users, b as Settings, nt as FileText } from "../_libs/lucide-react.mjs";
import { D as useServerFn, x as getIsAdmin } from "./tutor-api.functions-BgQ4s39o.mjs";
import { t as supabase } from "./client-B11Yrd_E.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DYjMPVia.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var logo_png_asset_default = {
	version: 1,
	asset_id: "ee334a1d-b444-4db0-aeb9-f18c4f66d936",
	project_id: "5145809a-d258-43b7-85b4-066d1b7b5045",
	url: "/__l5e/assets-v1/ee334a1d-b444-4db0-aeb9-f18c4f66d936/logo.png",
	r2_key: "a/v1/5145809a-d258-43b7-85b4-066d1b7b5045/ee334a1d-b444-4db0-aeb9-f18c4f66d936/logo.png",
	original_filename: "logo.png",
	size: 5610,
	content_type: "image/png",
	created_at: "2026-06-29T09:38:37Z"
};
function useAuth() {
	const [session, setSession] = (0, import_react.useState)(null);
	const [user, setUser] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
			setSession(s);
			setUser(s?.user ?? null);
		});
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			setUser(data.session?.user ?? null);
			setLoading(false);
		});
		return () => sub.subscription.unsubscribe();
	}, []);
	return {
		session,
		user,
		loading
	};
}
var nav = [
	{
		to: "/admin",
		label: "Dashboard",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/admin/tutors",
		label: "Tutors",
		icon: GraduationCap
	},
	{
		to: "/admin/students",
		label: "Students",
		icon: Users
	},
	{
		to: "/admin/applications",
		label: "Applications",
		icon: FileText
	},
	{
		to: "/admin/messages",
		label: "Messages",
		icon: Mail
	},
	{
		to: "/admin/settings",
		label: "Settings",
		icon: Settings
	}
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
		enabled: !!user && !isLoginRoute
	});
	(0, import_react.useEffect)(() => {
		if (isLoginRoute) return;
		if (loading) return;
		if (!user) navigate({ to: "/admin/login" });
	}, [
		loading,
		user,
		isLoginRoute,
		navigate
	]);
	if (isLoginRoute) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	if (loading || user && checkingAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center text-sm text-muted-foreground",
		children: "Loading…"
	});
	if (user && adminCheck && !adminCheck.isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center card-surface p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "heading-md",
					children: "Not authorised"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: [
						"Your account doesn't have admin access. Ask a super-admin to grant you the ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "admin" }),
						" role, then reload this page."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "btn-ghost mt-6",
					onClick: async () => {
						await supabase.auth.signOut();
						navigate({ to: "/admin/login" });
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Sign out"]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-surface-2 flex",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "hidden lg:flex w-64 shrink-0 bg-ink text-white flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-5 py-6 flex items-center justify-center border-b border-white/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-16 w-16 rounded-xl bg-white/95 p-1.5 flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: logo_png_asset_default.url,
							alt: "The Best Science Academy",
							className: "h-full w-full object-contain"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex-1 p-3 space-y-1",
					children: nav.map((item) => {
						const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-4 w-4" }), item.label]
						}, item.to);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 border-t border-white/10 text-xs text-white/55 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-gold block",
						children: "← Back to website"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: async () => {
							await supabase.auth.signOut();
							navigate({ to: "/admin/login" });
						},
						className: "hover:text-gold inline-flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3 w-3" }), " Sign out"]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 flex flex-col min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "h-16 bg-surface border-b border-border flex items-center justify-between px-5 lg:px-8 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative max-w-md flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						placeholder: "Search tutors, students, applications…",
						className: "w-full h-10 pl-9 pr-4 rounded-full border border-border bg-surface-2 text-sm focus:bg-surface focus:border-primary outline-none"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "h-10 w-10 rounded-full border border-border flex items-center justify-center relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-2 right-2 h-2 w-2 rounded-full bg-gold" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "flex items-center gap-2 h-10 pl-1 pr-3 rounded-full border border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary text-white text-xs font-bold flex items-center justify-center",
								children: user?.email?.[0]?.toUpperCase() ?? "A"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline text-sm font-medium truncate max-w-[140px]",
								children: user?.email ?? "Admin"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 text-muted-foreground" })
						]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 p-5 lg:p-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})]
		})]
	});
}
//#endregion
export { AdminLayout as component };
