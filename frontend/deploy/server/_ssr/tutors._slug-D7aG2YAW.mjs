import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tutors._slug-D7aG2YAW.js
var $$splitComponentImporter = () => import("./tutors._slug-DgH2CrhU.mjs");
var $$splitErrorComponentImporter = () => import("./tutors._slug-Ccd6XP7m.mjs");
var $$splitNotFoundComponentImporter = () => import("./tutors._slug-mxJuIJ94.mjs");
var Route = createFileRoute("/tutors/$slug")({
	head: () => ({ meta: [{ title: "Tutor Profile — The Best Science Academy" }, {
		name: "description",
		content: "Premium online tutor profile."
	}] }),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
