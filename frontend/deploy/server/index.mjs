globalThis.__nitro_main__ = import.meta.url;
import { a as toEventHandler, c as serve, i as defineLazyEventHandler, n as HTTPError, r as defineHandler, s as NodeResponse, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/about-Cr-a-j7w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f2a-vlSK3BSJSqf9IQxRTMHfLY2CA1s\"",
		"mtime": "2026-07-23T08:34:28.896Z",
		"size": 16170,
		"path": "../public/assets/about-Cr-a-j7w.js"
	},
	"/assets/admin-BPPPeFAg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a62-uXixnikv2JKShvc9P/8kwU6iKdw\"",
		"mtime": "2026-07-23T08:34:28.897Z",
		"size": 6754,
		"path": "../public/assets/admin-BPPPeFAg.js"
	},
	"/assets/admin.applications-BgdyJs8_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"48e2-bjPX68V1Q0Ea0RTK4yXgfp8vUYo\"",
		"mtime": "2026-07-23T08:34:28.897Z",
		"size": 18658,
		"path": "../public/assets/admin.applications-BgdyJs8_.js"
	},
	"/assets/admin.index-C8JEWbt7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1da0-1K6ZLWSWapImN3b9ltkwINZbBu4\"",
		"mtime": "2026-07-23T08:34:28.897Z",
		"size": 7584,
		"path": "../public/assets/admin.index-C8JEWbt7.js"
	},
	"/assets/admin.login-QItKv8m7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d00-Ax1WssK6RTxZv/FdnMJBK2Q5oAA\"",
		"mtime": "2026-07-23T08:34:28.897Z",
		"size": 3328,
		"path": "../public/assets/admin.login-QItKv8m7.js"
	},
	"/assets/admin.messages-BWK17d-m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2870-fw/bEOAhJgxFkwIEVTN9nbIqKQc\"",
		"mtime": "2026-07-23T08:34:28.898Z",
		"size": 10352,
		"path": "../public/assets/admin.messages-BWK17d-m.js"
	},
	"/assets/admin.settings-CcuTgHpk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"730-OijluNDgH0F4SwLYARu3VVeNT44\"",
		"mtime": "2026-07-23T08:34:28.898Z",
		"size": 1840,
		"path": "../public/assets/admin.settings-CcuTgHpk.js"
	},
	"/assets/admin.students-oPw50txV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b5-laF3ng8E5XLfjsphQlL/KG+e2i4\"",
		"mtime": "2026-07-23T08:34:28.898Z",
		"size": 2485,
		"path": "../public/assets/admin.students-oPw50txV.js"
	},
	"/assets/admin.tutors-BMa7iJ7D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d56-nChnHF+IXO2iTiq6AJ1REb8bp8I\"",
		"mtime": "2026-07-23T08:34:28.899Z",
		"size": 7510,
		"path": "../public/assets/admin.tutors-BMa7iJ7D.js"
	},
	"/assets/admin.tutors._id.edit-Cf7kdWBU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"385c-X0dC67A4sYwOzcO89JUkeonSIbs\"",
		"mtime": "2026-07-23T08:34:28.899Z",
		"size": 14428,
		"path": "../public/assets/admin.tutors._id.edit-Cf7kdWBU.js"
	},
	"/assets/book-open-BQ8iWQKf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"117-8zN9ebfBbydZhztTnZlG/F3Tu+I\"",
		"mtime": "2026-07-23T08:34:28.899Z",
		"size": 279,
		"path": "../public/assets/book-open-BQ8iWQKf.js"
	},
	"/assets/briefcase-CWNZ4qaQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dc-fAfOisPysx5nf5dg9wtkdQOITAk\"",
		"mtime": "2026-07-23T08:34:28.899Z",
		"size": 220,
		"path": "../public/assets/briefcase-CWNZ4qaQ.js"
	},
	"/assets/become-a-tutor-UDz6sxOV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6877-8Z7e+Etw5fJm8op1EVmmrUeO7lI\"",
		"mtime": "2026-07-23T08:34:28.899Z",
		"size": 26743,
		"path": "../public/assets/become-a-tutor-UDz6sxOV.js"
	},
	"/assets/calendar-CGjIXPHR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"101-smd9mv4VL4aAqHvAQlYzf/XfWt0\"",
		"mtime": "2026-07-23T08:34:28.900Z",
		"size": 257,
		"path": "../public/assets/calendar-CGjIXPHR.js"
	},
	"/assets/chart-line-5VtfXEwm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b8-RLUGpdiWsYbOi79C4rtvPHQiV1Y\"",
		"mtime": "2026-07-23T08:34:28.900Z",
		"size": 184,
		"path": "../public/assets/chart-line-5VtfXEwm.js"
	},
	"/assets/chevron-down-BpASf7Va.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"80-HXxenXBiJIxoPKvOBspTafEJ2kI\"",
		"mtime": "2026-07-23T08:34:28.904Z",
		"size": 128,
		"path": "../public/assets/chevron-down-BpASf7Va.js"
	},
	"/assets/chevron-up-B40dVDwc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"80-0SO2ifVR9uRcDrX9YgxKPkluw1U\"",
		"mtime": "2026-07-23T08:34:28.905Z",
		"size": 128,
		"path": "../public/assets/chevron-up-B40dVDwc.js"
	},
	"/assets/circle-check-InjwXXhy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-4hd/D0Up6Hxj7E2GXFhLSFEXhy8\"",
		"mtime": "2026-07-23T08:34:28.905Z",
		"size": 178,
		"path": "../public/assets/circle-check-InjwXXhy.js"
	},
	"/assets/clock-B2pIceno.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-BpF4VYTRLD7230jzkcrEGFIiSss\"",
		"mtime": "2026-07-23T08:34:28.906Z",
		"size": 169,
		"path": "../public/assets/clock-B2pIceno.js"
	},
	"/assets/contact-D-fOTZyV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cf0-sVzu1jRB5hvU8MO2G7i3EzRPHg8\"",
		"mtime": "2026-07-23T08:34:28.906Z",
		"size": 7408,
		"path": "../public/assets/contact-D-fOTZyV.js"
	},
	"/assets/createLucideIcon-ZVtXeRM_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d0-ZBHa+gb8BTk7PpVmps1wY/ejgTg\"",
		"mtime": "2026-07-23T08:34:28.906Z",
		"size": 1232,
		"path": "../public/assets/createLucideIcon-ZVtXeRM_.js"
	},
	"/assets/file-text-CbxI8LfN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"181-sqhu4GLXLjK+cPjcS4ev7FFIbpI\"",
		"mtime": "2026-07-23T08:34:28.911Z",
		"size": 385,
		"path": "../public/assets/file-text-CbxI8LfN.js"
	},
	"/assets/createMiddleware-Bi-ToyvZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7f28-aN1uwmicUmOSbP+NsO609D6GMHI\"",
		"mtime": "2026-07-23T08:34:28.909Z",
		"size": 32552,
		"path": "../public/assets/createMiddleware-Bi-ToyvZ.js"
	},
	"/assets/graduation-cap-DGuwsVvI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14c-W3b8qleIAJqdXPmCFlQ5wj/Dg6w\"",
		"mtime": "2026-07-23T08:34:28.911Z",
		"size": 332,
		"path": "../public/assets/graduation-cap-DGuwsVvI.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"19-yHADZo6lKl+mSNPU9098EiqzPCE\"",
		"mtime": "2026-07-22T14:14:52.591Z",
		"size": 25,
		"path": "../public/robots.txt"
	},
	"/assets/invariant-DEEwAagU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c-eVh/3DMi1s3cxf4N/OJar+ew1jA\"",
		"mtime": "2026-07-23T08:34:28.911Z",
		"size": 60,
		"path": "../public/assets/invariant-DEEwAagU.js"
	},
	"/assets/jsx-runtime-DGeXAQPT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ab-mgnSm9dUpwL2+z7tKxJ2MsN0fOM\"",
		"mtime": "2026-07-23T08:34:28.912Z",
		"size": 939,
		"path": "../public/assets/jsx-runtime-DGeXAQPT.js"
	},
	"/assets/languages-DAUgbW_R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13c-207Dkmabrr4EbRpqlCNNfvl9ac0\"",
		"mtime": "2026-07-23T08:34:28.912Z",
		"size": 316,
		"path": "../public/assets/languages-DAUgbW_R.js"
	},
	"/assets/layout-DO_LYXki.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ce0-jhjA4jSRa1IUzQnKSPB/44w2U74\"",
		"mtime": "2026-07-23T08:34:28.916Z",
		"size": 11488,
		"path": "../public/assets/layout-DO_LYXki.js"
	},
	"/assets/hero-tutor-BV9Hb4ag.jpg": {
		"type": "image/jpeg",
		"etag": "\"1d19f-P5nDD8ATU0rfXy2Sy4eEokirvVU\"",
		"mtime": "2026-07-23T08:34:28.932Z",
		"size": 119199,
		"path": "../public/assets/hero-tutor-BV9Hb4ag.jpg"
	},
	"/assets/mail-CCMELb0q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-fuLtAmGjy/kOceZOF+6DhVyqino\"",
		"mtime": "2026-07-23T08:34:28.916Z",
		"size": 213,
		"path": "../public/assets/mail-CCMELb0q.js"
	},
	"/assets/link-DXHu5Fvk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6884-EDPSOHpwJ64rkirrGZQHETICahI\"",
		"mtime": "2026-07-23T08:34:28.916Z",
		"size": 26756,
		"path": "../public/assets/link-DXHu5Fvk.js"
	},
	"/assets/map-pin-D6qHxVww.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-O4VHbNxt/eOSUjRW3WMphXsELoE\"",
		"mtime": "2026-07-23T08:34:28.917Z",
		"size": 259,
		"path": "../public/assets/map-pin-D6qHxVww.js"
	},
	"/assets/message-circle-C-JcUQ5Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f1-YpA7jl5iUMJjVUb/pFeLwny9Wzo\"",
		"mtime": "2026-07-23T08:34:28.917Z",
		"size": 241,
		"path": "../public/assets/message-circle-C-JcUQ5Q.js"
	},
	"/assets/message-square-DHWlthOz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-Dio/FRk5ZdB4f4eKjqBhGbOw3bw\"",
		"mtime": "2026-07-23T08:34:28.917Z",
		"size": 233,
		"path": "../public/assets/message-square-DHWlthOz.js"
	},
	"/assets/page-header-B1JPldl0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f3-lzJFvinoAyHUml1Yx/T0U4XVMBY\"",
		"mtime": "2026-07-23T08:34:28.917Z",
		"size": 755,
		"path": "../public/assets/page-header-B1JPldl0.js"
	},
	"/assets/phone-B_ymgBqu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"142-PljdfxAFAzx8jqwtJRG3oSS+3Qo\"",
		"mtime": "2026-07-23T08:34:28.917Z",
		"size": 322,
		"path": "../public/assets/phone-B_ymgBqu.js"
	},
	"/assets/phone-field-Rkh5BCSq.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"c89-KZugZhsOWhu6+xhEzF/3jMsNTO0\"",
		"mtime": "2026-07-23T08:34:28.934Z",
		"size": 3209,
		"path": "../public/assets/phone-field-Rkh5BCSq.css"
	},
	"/assets/privacy-do9sxOMa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c2-OBFDRfLoasWQ2fBaktFk2Yi7uDk\"",
		"mtime": "2026-07-23T08:34:28.918Z",
		"size": 1986,
		"path": "../public/assets/privacy-do9sxOMa.js"
	},
	"/assets/programs-8t4kNdz9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1873-NJ53ncF6k8BnwBAXvMWskqVB8Ps\"",
		"mtime": "2026-07-23T08:34:28.918Z",
		"size": 6259,
		"path": "../public/assets/programs-8t4kNdz9.js"
	},
	"/assets/phone-field-B5x5O1FI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"31e65-7yACSegFWaIl2v7/B7I3kka8oS0\"",
		"mtime": "2026-07-23T08:34:28.918Z",
		"size": 204389,
		"path": "../public/assets/phone-field-B5x5O1FI.js"
	},
	"/assets/search-CIGHZTbP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-hhio2W6/ccx17X77DWMgZ2dmuGU\"",
		"mtime": "2026-07-23T08:34:28.919Z",
		"size": 174,
		"path": "../public/assets/search-CIGHZTbP.js"
	},
	"/assets/index-C-Dt7U39.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"788eb-Z4QP0EfoAJLMuVficiDpyXmzwQ8\"",
		"mtime": "2026-07-23T08:34:28.896Z",
		"size": 493803,
		"path": "../public/assets/index-C-Dt7U39.js"
	},
	"/assets/routes-D2y2tIio.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"860a-vpzOqHLkkHnuC5vFvmuE9t+E1ME\"",
		"mtime": "2026-07-23T08:34:28.918Z",
		"size": 34314,
		"path": "../public/assets/routes-D2y2tIio.js"
	},
	"/assets/shield-check-BncgTuV3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-7Z01xAwmYdyLfrc0OVsbAtAZ84Y\"",
		"mtime": "2026-07-23T08:34:28.919Z",
		"size": 320,
		"path": "../public/assets/shield-check-BncgTuV3.js"
	},
	"/assets/site-data-B6sOkp_r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2aa5-TycAJx98G/IaLOX5K8czZ8oYsbo\"",
		"mtime": "2026-07-23T08:34:28.919Z",
		"size": 10917,
		"path": "../public/assets/site-data-B6sOkp_r.js"
	},
	"/assets/sparkles-DrVkaye1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-lMxdUW2rGCzEztr+Qgq0xvdWxTY\"",
		"mtime": "2026-07-23T08:34:28.920Z",
		"size": 494,
		"path": "../public/assets/sparkles-DrVkaye1.js"
	},
	"/assets/star-BpGwKtz-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d8-Ug7VNx43hTLrCeGM4RqlXiwHBrg\"",
		"mtime": "2026-07-23T08:34:28.920Z",
		"size": 472,
		"path": "../public/assets/star-BpGwKtz-.js"
	},
	"/assets/sigma-C9LP9_G8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e81-880HjGbb2yCVz8Ae+ImG4MW6/JA\"",
		"mtime": "2026-07-23T08:34:28.919Z",
		"size": 3713,
		"path": "../public/assets/sigma-C9LP9_G8.js"
	},
	"/assets/styles-EBGyam_b.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"22d72-cVzR0PVanfQoF3qZznM07oV+LDE\"",
		"mtime": "2026-07-23T08:34:28.936Z",
		"size": 142706,
		"path": "../public/assets/styles-EBGyam_b.css"
	},
	"/assets/subjects-BWcQ3bM4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b57-RZlb+pVCR7ZEPo6Cm388NOkaUdQ\"",
		"mtime": "2026-07-23T08:34:28.921Z",
		"size": 2903,
		"path": "../public/assets/subjects-BWcQ3bM4.js"
	},
	"/assets/terms-CvzGH-6w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7fb-CYGoOmPvHSN8yvBDJPKMv4G8ht4\"",
		"mtime": "2026-07-23T08:34:28.921Z",
		"size": 2043,
		"path": "../public/assets/terms-CvzGH-6w.js"
	},
	"/assets/triangle-alert-CB-ut4zy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21c-u/Dd3QpNtwKyoKJ4GXmREdl/4tI\"",
		"mtime": "2026-07-23T08:34:28.921Z",
		"size": 540,
		"path": "../public/assets/triangle-alert-CB-ut4zy.js"
	},
	"/assets/tutor-1-DAQcHp1E.jpg": {
		"type": "image/jpeg",
		"etag": "\"ca02-H9PO+P4yJCTq2b/yOeJbmtjm/L4\"",
		"mtime": "2026-07-23T08:34:28.938Z",
		"size": 51714,
		"path": "../public/assets/tutor-1-DAQcHp1E.jpg"
	},
	"/assets/tutor-2-CZ-4SZ3x.jpg": {
		"type": "image/jpeg",
		"etag": "\"c4a7-Ju+duBmM8iOpHC4+XPn31ET772E\"",
		"mtime": "2026-07-23T08:34:28.939Z",
		"size": 50343,
		"path": "../public/assets/tutor-2-CZ-4SZ3x.jpg"
	},
	"/assets/tutor-4-DlR4AUL1.jpg": {
		"type": "image/jpeg",
		"etag": "\"a30e-8WzADgr7FZLmp0oNJitqxX3OPg4\"",
		"mtime": "2026-07-23T08:34:28.939Z",
		"size": 41742,
		"path": "../public/assets/tutor-4-DlR4AUL1.jpg"
	},
	"/assets/tutor-3-JZxrA56-.jpg": {
		"type": "image/jpeg",
		"etag": "\"11780-ZcIdaiLO7u4CU2TsRq04/DPS380\"",
		"mtime": "2026-07-23T08:34:28.939Z",
		"size": 71552,
		"path": "../public/assets/tutor-3-JZxrA56-.jpg"
	},
	"/assets/tutor-api.functions-Fd_Z3qLe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f2e-RlLbn8BIhuJrHR7MkCGYSAaKFMY\"",
		"mtime": "2026-07-23T08:34:28.922Z",
		"size": 7982,
		"path": "../public/assets/tutor-api.functions-Fd_Z3qLe.js"
	},
	"/assets/tutor-badges-DQFKSbcW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6e0c-HFZdb2SF/mdNfXJWBRRqjF7iQBQ\"",
		"mtime": "2026-07-23T08:34:28.922Z",
		"size": 28172,
		"path": "../public/assets/tutor-badges-DQFKSbcW.js"
	},
	"/assets/tutor-card-3pO0fzge.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"933-nWhGbLtO12uOHIIUQv0GTParmp0\"",
		"mtime": "2026-07-23T08:34:28.922Z",
		"size": 2355,
		"path": "../public/assets/tutor-card-3pO0fzge.js"
	},
	"/assets/tutors.index-CkETjMkC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"131b-YTbsCgpFKP8svnD4/5mF0KqwDJ0\"",
		"mtime": "2026-07-23T08:34:28.926Z",
		"size": 4891,
		"path": "../public/assets/tutors.index-CkETjMkC.js"
	},
	"/assets/tutors._slug-CESN6g7U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b3-vT0x0I7gjo3fyoCBP0aXPzB6lTA\"",
		"mtime": "2026-07-23T08:34:28.925Z",
		"size": 435,
		"path": "../public/assets/tutors._slug-CESN6g7U.js"
	},
	"/assets/tutors._slug-DKO_HgTv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"223-eTETFk3ADozGJtHkq5iwrBSa15w\"",
		"mtime": "2026-07-23T08:34:28.926Z",
		"size": 547,
		"path": "../public/assets/tutors._slug-DKO_HgTv.js"
	},
	"/assets/tutors._slug-CuEj7yWD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30d7-DSmLe0Tzhv+fTi87KnAA0HFefm4\"",
		"mtime": "2026-07-23T08:34:28.926Z",
		"size": 12503,
		"path": "../public/assets/tutors._slug-CuEj7yWD.js"
	},
	"/assets/upload-rNbjdtaq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-cvjjzwWX/D6iYod/u91L/azxSHQ\"",
		"mtime": "2026-07-23T08:34:28.927Z",
		"size": 230,
		"path": "../public/assets/upload-rNbjdtaq.js"
	},
	"/assets/useBaseQuery-c64Ij8R0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2288-wd8KyqQp6nihsTyuAxZQd9SuVds\"",
		"mtime": "2026-07-23T08:34:28.927Z",
		"size": 8840,
		"path": "../public/assets/useBaseQuery-c64Ij8R0.js"
	},
	"/assets/useMatch-CRGyvikH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2cc-2EX8twuVR7+eDs4tSKkLzV9n/s4\"",
		"mtime": "2026-07-23T08:34:28.927Z",
		"size": 716,
		"path": "../public/assets/useMatch-CRGyvikH.js"
	},
	"/assets/useMutation-CdIxFzRE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8ea-s3kGb+5bSvwcidHA92D17qvPubY\"",
		"mtime": "2026-07-23T08:34:28.931Z",
		"size": 2282,
		"path": "../public/assets/useMutation-CdIxFzRE.js"
	},
	"/assets/useQuery-D3hFOAEG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"60-2AjxexDowPVP9whgVct9l+NlOoo\"",
		"mtime": "2026-07-23T08:34:28.932Z",
		"size": 96,
		"path": "../public/assets/useQuery-D3hFOAEG.js"
	},
	"/assets/user-DR16VMdy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a1-jfVbS3nOYsxrRmqVw3RnJNwYtOY\"",
		"mtime": "2026-07-23T08:34:28.932Z",
		"size": 417,
		"path": "../public/assets/user-DR16VMdy.js"
	},
	"/assets/useRouter-Cfzt9-WT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1dbf-5tVqBNwmmENXy3p+cZcxAWvSXSU\"",
		"mtime": "2026-07-23T08:34:28.932Z",
		"size": 7615,
		"path": "../public/assets/useRouter-Cfzt9-WT.js"
	},
	"/assets/users-BUwpnKqN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-a7zxoRIkporTl+zLfkPVLcXusm0\"",
		"mtime": "2026-07-23T08:34:28.932Z",
		"size": 306,
		"path": "../public/assets/users-BUwpnKqN.js"
	},
	"/assets/video-DnhBTAvQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f8-AmQcD+U4VHr2QH2CtVIi0xyfUhU\"",
		"mtime": "2026-07-23T08:34:28.932Z",
		"size": 248,
		"path": "../public/assets/video-DnhBTAvQ.js"
	},
	"/assets/x-B0d-gEDw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-4SG3kWfQFVJ4DwWuJ+4ekX5t0/A\"",
		"mtime": "2026-07-23T08:34:28.932Z",
		"size": 154,
		"path": "../public/assets/x-B0d-gEDw.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_OW4PNe = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_OW4PNe
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
