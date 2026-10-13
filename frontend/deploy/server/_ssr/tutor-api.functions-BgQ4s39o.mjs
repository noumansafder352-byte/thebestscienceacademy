import { r as __toESM } from "../_runtime.mjs";
import { c as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { O as isRedirect, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-BFFE07zL.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-ClGaW0lh.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BwdutfJC.mjs";
import { a as numberType, i as enumType, n as arrayType, o as objectType, r as booleanType, s as stringType, t as anyType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tutor-api.functions-BgQ4s39o.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var listPublicTutors = createServerFn({ method: "GET" }).handler(createSsrRpc("0b5c81aad2c4c0680bb340207d8a73218a803a7c6a141289abe6a69c5bb59dc7"));
var getPublicTutorBySlug = createServerFn({ method: "GET" }).inputValidator((input) => objectType({ slug: stringType().min(1) }).parse(input)).handler(createSsrRpc("075604a7564d2201279d3b478149fcd4a3bde1f8622cbba91ab5a835981569d2"));
var educationItemSchema = objectType({
	qualification: stringType(),
	degree: stringType(),
	institution: stringType(),
	year: stringType()
});
var applicationSchema = objectType({
	full_name: stringType().min(2).max(120),
	gender: stringType().max(20),
	nationality: stringType().max(60),
	country: stringType().max(60),
	city: stringType().max(60),
	timezone: stringType().max(40).optional().default(""),
	email: stringType().email().max(160),
	phone: stringType().max(40),
	whatsapp: stringType().max(40),
	preferred_contact: enumType([
		"Email",
		"WhatsApp",
		"Phone"
	]),
	professional_title: stringType().min(2).max(160),
	qualification: stringType().max(200),
	experience_years: stringType().max(40),
	bio: stringType().max(4e3),
	methodology: stringType().max(4e3),
	subjects: arrayType(stringType()).min(1).max(40),
	curriculums: arrayType(stringType()).min(1).max(40),
	grade_levels: arrayType(stringType()).min(1).max(20),
	languages: arrayType(stringType()).min(1).max(20),
	education: arrayType(educationItemSchema).max(10),
	schedule: arrayType(objectType({
		day: stringType(),
		slots: arrayType(stringType())
	})).max(10).optional().default([]),
	photo_path: stringType().min(1),
	cv_path: stringType().min(1),
	cnic_front_path: stringType().optional().default(""),
	cnic_back_path: stringType().optional().default("")
});
var submitTutorApplication = createServerFn({ method: "POST" }).inputValidator((input) => applicationSchema.parse(input)).handler(createSsrRpc("70d70b484d091fe8362b26c82fd571ab0d71933413534f8714c75a1e9ef33944"));
var bookingSchema = objectType({
	tutor_slug: stringType().max(200).optional().nullable(),
	student_name: stringType().min(2).max(120),
	parent_name: stringType().max(120).optional().nullable(),
	email: stringType().email().max(160),
	phone: stringType().max(40).optional().nullable(),
	whatsapp: stringType().max(40).optional().nullable(),
	country: stringType().max(60).optional().nullable(),
	curriculum: stringType().max(60).optional().nullable(),
	subject: stringType().max(120).optional().nullable(),
	grade_level: stringType().max(60).optional().nullable(),
	preferred_time: stringType().max(120).optional().nullable(),
	notes: stringType().max(2e3).optional().nullable()
});
var submitTrialBooking = createServerFn({ method: "POST" }).inputValidator((input) => bookingSchema.parse(input)).handler(createSsrRpc("77d2f5a4183c406bb59386f6230d282a3d393707bd222d9e31b9419c8e47d967"));
var contactSchema = objectType({
	name: stringType().min(2).max(120),
	email: stringType().email().max(160),
	phone: stringType().max(40).optional().nullable(),
	subject: stringType().max(200).optional().nullable(),
	message: stringType().min(2).max(4e3)
});
var submitContactMessage = createServerFn({ method: "POST" }).inputValidator((input) => contactSchema.parse(input)).handler(createSsrRpc("30c5db227f66853b5ba71eb098cb2116bd5cea08ff0fd5dd9c6bd57bb4a07c59"));
var getIsAdmin = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("45f48468797df8e099344264c304f97403031aed5e2a346e4362f984bfa7f848"));
var adminListApplications = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("03a4488b13449c67390535511afe86c74762c2d72efcca2cd18810c89e3089b6"));
var adminGetApplication = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({ id: stringType().uuid() }).parse(i)).handler(createSsrRpc("fd46966a05c31cc0d732a1579f83c785ec767c29929f3b48fd20d5988097fa72"));
var adminUpdateApplicationNotes = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
	id: stringType().uuid(),
	admin_notes: stringType().max(4e3)
}).parse(i)).handler(createSsrRpc("aae15ec7cef034d60f1fed5e46a427f1d6c9eed89a807c673461acf46febe526"));
var REJECTION_REASONS = [
	"Insufficient teaching experience",
	"Qualifications do not meet requirements",
	"Incomplete application / documents",
	"Subject specialisation not currently needed",
	"Unable to verify credentials",
	"Other"
];
var adminRejectApplication = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
	id: stringType().uuid(),
	reason: stringType().min(2).max(200),
	comments: stringType().max(2e3).optional().nullable()
}).parse(i)).handler(createSsrRpc("47464d8a181cf489094c26f4fa2754244d510a70b6d38e1bdbf631da0fb5725d"));
var adminResendRejectionEmail = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({ id: stringType().uuid() }).parse(i)).handler(createSsrRpc("ea7a5c60de2dcaced2e16575d3ffa52a0317538fc7847864139857563fbfcdce"));
var REJECTION_REASON_OPTIONS = REJECTION_REASONS;
var adminReopenApplication = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({ id: stringType().uuid() }).parse(i)).handler(createSsrRpc("902938a7ca0e43aa2065a8964c0a94df92bb93ab507bb9df5fdba2b0b7e0b343"));
var adminDeleteApplication = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({ id: stringType().uuid() }).parse(i)).handler(createSsrRpc("44def8c4c47a998feb1488d927f6c99783cc05ef04a3c0fbff848bb852072d89"));
var adminApproveApplication = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({ id: stringType().uuid() }).parse(i)).handler(createSsrRpc("af0f606aa856d726e36a46396bc3bea287446dc0479e1c20606cc2a2f9e311c6"));
var adminListBookings = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("f39f46ddbb832c1641d615febb50bb76efeb76eaf3eaae613e919d9de8898892"));
var adminListMessages = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("4485aa4f24e7e248770e1513cab1397f9acbf8f24c0262e373c5c8d0ec12231f"));
var adminMarkMessageRead = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
	id: stringType().uuid(),
	status: enumType(["read", "unread"]).optional()
}).parse(i)).handler(createSsrRpc("44fea06a4b5c6d9181c4553616218e19dddc8d31002f65770939958ed59c9a97"));
var adminGetMessage = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({ id: stringType().uuid() }).parse(i)).handler(createSsrRpc("623802c57df26df3a1ae68ed837414dc72cb84a624d0360af08ed46654e9527a"));
var adminDeleteMessage = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({ id: stringType().uuid() }).parse(i)).handler(createSsrRpc("754ad347375a684641651d307a30e644dc28a83178621b1d88af5fa42e148e88"));
var adminListTutors = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("42786e20e67db3cd450d95a3f115d3ae6eed27347253df7f11cde354808f7051"));
var adminSetTutorActive = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
	id: stringType().uuid(),
	is_active: booleanType()
}).parse(i)).handler(createSsrRpc("1d728f6c48283e7a0be8c07822135d560586d20e89840bea939057939cb7c61f"));
var adminGetTutor = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({ id: stringType().uuid() }).parse(i)).handler(createSsrRpc("047c6841888bfac78c0443d0b945ed7aecfff269d827729feba5ab152cf261d6"));
var tutorUpdateSchema = objectType({
	id: stringType().uuid(),
	patch: objectType({
		name: stringType().min(2).max(120).optional(),
		title: stringType().max(200).optional(),
		qualification: stringType().max(200).optional(),
		experience: stringType().max(60).optional(),
		bio: stringType().max(4e3).optional(),
		methodology: stringType().max(4e3).optional(),
		gender: stringType().max(20).optional(),
		nationality: stringType().max(60).optional(),
		country: stringType().max(60).optional(),
		city: stringType().max(60).optional(),
		timezone: stringType().max(40).optional(),
		availability: enumType([
			"Available",
			"Fully Booked",
			"Limited Availability"
		]).optional(),
		subjects: arrayType(stringType()).optional(),
		curriculums: arrayType(stringType()).optional(),
		grade_levels: arrayType(stringType()).optional(),
		languages: arrayType(stringType()).optional(),
		education: arrayType(anyType()).optional(),
		schedule: arrayType(anyType()).optional(),
		photo_url: stringType().nullable().optional(),
		is_active: booleanType().optional(),
		rating: numberType().min(0).max(5).optional(),
		reviews: numberType().int().min(0).max(1e5).optional(),
		is_featured: booleanType().optional()
	})
});
var adminUpdateTutor = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => tutorUpdateSchema.parse(i)).handler(createSsrRpc("41d52dc72a5f25e1bedb49d3ec8b99121f68aac582b5305479fe0b5746890e4d"));
var adminDeleteTutor = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({ id: stringType().uuid() }).parse(i)).handler(createSsrRpc("16770ad04fe93bcc48040e3c0fa1f32bf9da9fc8ba30cc4bccf2859ca1a58516"));
var adminStatsSummary = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("24bced9769df11fe5dc75434b494113ea75d1a9081e8d685260f677b15215750"));
//#endregion
export { listPublicTutors as C, useServerFn as D, submitTutorApplication as E, getPublicTutorBySlug as S, submitTrialBooking as T, adminSetTutorActive as _, adminDeleteTutor as a, adminUpdateTutor as b, adminGetTutor as c, adminListMessages as d, adminListTutors as f, adminResendRejectionEmail as g, adminReopenApplication as h, adminDeleteMessage as i, adminListApplications as l, adminRejectApplication as m, adminApproveApplication as n, adminGetApplication as o, adminMarkMessageRead as p, adminDeleteApplication as r, adminGetMessage as s, REJECTION_REASON_OPTIONS as t, adminListBookings as u, adminStatsSummary as v, submitContactMessage as w, getIsAdmin as x, adminUpdateApplicationNotes as y };
