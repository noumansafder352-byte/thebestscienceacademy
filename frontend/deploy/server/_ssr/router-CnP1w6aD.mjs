import { r as __toESM } from "../_runtime.mjs";
import { a as QueryClientProvider, c as require_react, s as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Route } from "./admin.index-Cbm-Zwdx.mjs";
import { t as Route$19 } from "./admin.tutors._id.edit-DhHTS00s.mjs";
import { t as Route$20 } from "./tutors._slug-D7aG2YAW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CnP1w6aD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-EBGyam_b.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "btn-primary",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "btn-primary",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "btn-ghost",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$18 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "The Best Science Academy — World-Class Online Tutors for International Students" },
			{
				name: "description",
				content: "Premium online one-to-one tuition for IGCSE, O Level, A Level, IB, AQA, Edexcel and more — expert Pakistani tutors teaching students in the UK, UAE, Australia, Europe and Asia."
			},
			{
				name: "author",
				content: "The Best Science Academy"
			},
			{
				property: "og:title",
				content: "The Best Science Academy"
			},
			{
				property: "og:description",
				content: "World-class online tutors for international students. IGCSE, O Level, A Level, IB, AQA, Edexcel and more."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$18.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$15 = () => import("./routes-hObuvzjM.mjs");
var Route$17 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "The Best Science Academy — World-Class Online Tutors for International Students" },
		{
			name: "description",
			content: "Premium online one-to-one tuition for IGCSE, O Level, A Level, IB, AQA & Edexcel — expert tutors for students in the UK, UAE, Australia, Europe and Asia."
		},
		{
			property: "og:title",
			content: "The Best Science Academy"
		},
		{
			property: "og:description",
			content: "World-class online tutors for international students."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./about-C2k4bojt.mjs");
var Route$16 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About — The Best Science Academy" },
		{
			name: "description",
			content: "Our story, mission and methodology. Premium online tutoring for international students by qualified Pakistani educators."
		},
		{
			property: "og:title",
			content: "About The Best Science Academy"
		},
		{
			property: "og:description",
			content: "World-class online tutors for international students."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./admin-DYjMPVia.mjs");
var Route$15 = createFileRoute("/admin")({
	head: () => ({ meta: [
		{ title: "Admin Dashboard — The Best Science Academy" },
		{
			name: "description",
			content: "Internal admin dashboard."
		},
		{
			name: "robots",
			content: "noindex, nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./become-a-tutor-OxT4KOkb.mjs");
var Route$14 = createFileRoute("/become-a-tutor")({
	head: () => ({ meta: [
		{ title: "Become a Tutor — The Best Science Academy" },
		{
			name: "description",
			content: "Apply to join a global academy. Teach international students online with a premium platform, competitive pay and flexible hours."
		},
		{
			property: "og:title",
			content: "Become a Tutor"
		},
		{
			property: "og:description",
			content: "Teach international students online from anywhere."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./contact-B-90XG-O.mjs");
var Route$13 = createFileRoute("/contact")({
	head: () => ({ meta: [
		{ title: "Contact — The Best Science Academy" },
		{
			name: "description",
			content: "Book a free trial, ask a question or get tutor recommendations. We respond within one business day."
		},
		{
			property: "og:title",
			content: "Contact The Best Science Academy"
		},
		{
			property: "og:description",
			content: "Book a free trial or speak to our academic team."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./privacy-CgD72f7_.mjs");
var Route$12 = createFileRoute("/privacy")({
	head: () => ({
		meta: [
			{ title: "Privacy Policy — The Best Science Academy" },
			{
				name: "description",
				content: "How The Best Science Academy collects, uses and protects your personal information."
			},
			{
				property: "og:title",
				content: "Privacy Policy"
			}
		],
		links: [{
			rel: "canonical",
			href: "/privacy"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./programs-BhpRFjHa.mjs");
var Route$11 = createFileRoute("/programs")({
	head: () => ({ meta: [
		{ title: "Programs & Curriculums — The Best Science Academy" },
		{
			name: "description",
			content: "Expert one-to-one tuition for IGCSE, O Level, A Level, IB, AQA, Edexcel, LRN and FBISE."
		},
		{
			property: "og:title",
			content: "Programs & Curriculums"
		},
		{
			property: "og:description",
			content: "Every major international curriculum, expertly taught."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var BASE_URL = "";
var Route$10 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const { data: tutors } = await createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY, { auth: {
		storage: void 0,
		persistSession: false,
		autoRefreshToken: false
	} }).from("tutors").select("slug").eq("is_active", true);
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[
		{
			path: "/",
			changefreq: "weekly",
			priority: "1.0"
		},
		{
			path: "/about",
			changefreq: "monthly",
			priority: "0.8"
		},
		{
			path: "/programs",
			changefreq: "monthly",
			priority: "0.9"
		},
		{
			path: "/subjects",
			changefreq: "monthly",
			priority: "0.9"
		},
		{
			path: "/tutors",
			changefreq: "weekly",
			priority: "0.9"
		},
		{
			path: "/become-a-tutor",
			changefreq: "monthly",
			priority: "0.7"
		},
		{
			path: "/contact",
			changefreq: "yearly",
			priority: "0.6"
		},
		{
			path: "/privacy",
			changefreq: "yearly",
			priority: "0.3"
		},
		{
			path: "/terms",
			changefreq: "yearly",
			priority: "0.3"
		},
		...(tutors ?? []).map((t) => ({
			path: `/tutors/${t.slug}`,
			changefreq: "monthly",
			priority: "0.7"
		}))
	].map((e) => `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`).join("\n")}\n</urlset>`;
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$8 = () => import("./subjects-CMpWPS7n.mjs");
var Route$9 = createFileRoute("/subjects")({
	head: () => ({ meta: [
		{ title: "Subjects — The Best Science Academy" },
		{
			name: "description",
			content: "Specialist online tuition across Mathematics, Physics, Chemistry, Biology, English and more."
		},
		{
			property: "og:title",
			content: "Subjects"
		},
		{
			property: "og:description",
			content: "Specialist online tutors across 12+ subjects."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./terms-BC-qDYY7.mjs");
var Route$8 = createFileRoute("/terms")({
	head: () => ({
		meta: [
			{ title: "Terms & Conditions — The Best Science Academy" },
			{
				name: "description",
				content: "The terms that govern your use of The Best Science Academy's website and tutoring services."
			},
			{
				property: "og:title",
				content: "Terms & Conditions"
			}
		],
		links: [{
			rel: "canonical",
			href: "/terms"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./admin.applications-CFjCabSL.mjs");
var Route$7 = createFileRoute("/admin/applications")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./admin.login-DeC9VjOJ.mjs");
var Route$6 = createFileRoute("/admin/login")({
	head: () => ({ meta: [{ title: "Admin Sign In — The Best Science Academy" }, {
		name: "robots",
		content: "noindex, nofollow"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./admin.messages-YJDPaw3J.mjs");
var Route$5 = createFileRoute("/admin/messages")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./admin.settings-CTBadbxN.mjs");
var Route$4 = createFileRoute("/admin/settings")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./admin.students-Cl71463d.mjs");
var Route$3 = createFileRoute("/admin/students")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./admin.tutors-6fCAUjbq.mjs");
var Route$2 = createFileRoute("/admin/tutors")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./tutors.index-CxhbsdGk.mjs");
var Route$1 = createFileRoute("/tutors/")({
	head: () => ({
		meta: [
			{ title: "Find Tutors — The Best Science Academy" },
			{
				name: "description",
				content: "Browse vetted online tutors for IGCSE, O Level, A Level, IB and more. Filter by subject, curriculum and experience."
			},
			{
				property: "og:title",
				content: "Find Tutors"
			},
			{
				property: "og:description",
				content: "Browse our vetted online tutors."
			}
		],
		links: [{
			rel: "canonical",
			href: "/tutors"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$17.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$18
});
var AboutRoute = Route$16.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$18
});
var AdminRoute = Route$15.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$18
});
var BecomeATutorRoute = Route$14.update({
	id: "/become-a-tutor",
	path: "/become-a-tutor",
	getParentRoute: () => Route$18
});
var ContactRoute = Route$13.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$18
});
var PrivacyRoute = Route$12.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$18
});
var ProgramsRoute = Route$11.update({
	id: "/programs",
	path: "/programs",
	getParentRoute: () => Route$18
});
var SitemapDotxmlRoute = Route$10.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$18
});
var SubjectsRoute = Route$9.update({
	id: "/subjects",
	path: "/subjects",
	getParentRoute: () => Route$18
});
var TermsRoute = Route$8.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$18
});
var AdminIndexRoute = Route.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var AdminApplicationsRoute = Route$7.update({
	id: "/applications",
	path: "/applications",
	getParentRoute: () => AdminRoute
});
var AdminLoginRoute = Route$6.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => AdminRoute
});
var AdminMessagesRoute = Route$5.update({
	id: "/messages",
	path: "/messages",
	getParentRoute: () => AdminRoute
});
var AdminSettingsRoute = Route$4.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AdminRoute
});
var AdminStudentsRoute = Route$3.update({
	id: "/students",
	path: "/students",
	getParentRoute: () => AdminRoute
});
var AdminTutorsRoute = Route$2.update({
	id: "/tutors",
	path: "/tutors",
	getParentRoute: () => AdminRoute
});
var TutorsIndexRoute = Route$1.update({
	id: "/tutors/",
	path: "/tutors/",
	getParentRoute: () => Route$18
});
var TutorsSlugRoute = Route$20.update({
	id: "/tutors/$slug",
	path: "/tutors/$slug",
	getParentRoute: () => Route$18
});
var AdminTutorsRouteChildren = { AdminTutorsIdEditRoute: Route$19.update({
	id: "/$id/edit",
	path: "/$id/edit",
	getParentRoute: () => AdminTutorsRoute
}) };
var AdminRouteChildren = {
	AdminApplicationsRoute,
	AdminLoginRoute,
	AdminMessagesRoute,
	AdminSettingsRoute,
	AdminStudentsRoute,
	AdminTutorsRoute: AdminTutorsRoute._addFileChildren(AdminTutorsRouteChildren),
	AdminIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	AdminRoute: AdminRoute._addFileChildren(AdminRouteChildren),
	BecomeATutorRoute,
	ContactRoute,
	PrivacyRoute,
	ProgramsRoute,
	SitemapDotxmlRoute,
	SubjectsRoute,
	TermsRoute,
	TutorsSlugRoute,
	TutorsIndexRoute
};
var routeTree = Route$18._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
