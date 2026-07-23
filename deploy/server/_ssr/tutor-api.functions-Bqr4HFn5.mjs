import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-BFFE07zL.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BwdutfJC.mjs";
import { a as numberType, i as enumType, n as arrayType, o as objectType, r as booleanType, s as stringType, t as anyType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tutor-api.functions-Bqr4HFn5.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
async function signPhoto(admin, path) {
	if (!path) return null;
	if (path.startsWith("http")) return path;
	const { data } = await admin.storage.from("tutor-photos").createSignedUrl(path, 3600 * 24);
	return data?.signedUrl ?? null;
}
var listPublicTutors_createServerFn_handler = createServerRpc({
	id: "0b5c81aad2c4c0680bb340207d8a73218a803a7c6a141289abe6a69c5bb59dc7",
	name: "listPublicTutors",
	filename: "src/lib/tutor-api.functions.ts"
}, (opts) => listPublicTutors.__executeServer(opts));
var listPublicTutors = createServerFn({ method: "GET" }).handler(listPublicTutors_createServerFn_handler, async () => {
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	const { data, error } = await supabaseAdmin.from("tutors").select("id, slug, name, title, photo_url, qualification, experience, subjects, curriculums, grade_levels, languages, bio, gender, nationality, country, city, timezone, availability, methodology, education, schedule, rating, reviews, is_featured").eq("is_active", true).is("deleted_at", null).order("is_featured", { ascending: false }).order("rating", { ascending: false });
	if (error) throw error;
	return await Promise.all((data ?? []).map(async (t) => ({
		...t,
		photo_url: await signPhoto(supabaseAdmin, t.photo_url)
	})));
});
var getPublicTutorBySlug_createServerFn_handler = createServerRpc({
	id: "075604a7564d2201279d3b478149fcd4a3bde1f8622cbba91ab5a835981569d2",
	name: "getPublicTutorBySlug",
	filename: "src/lib/tutor-api.functions.ts"
}, (opts) => getPublicTutorBySlug.__executeServer(opts));
var getPublicTutorBySlug = createServerFn({ method: "GET" }).inputValidator((input) => objectType({ slug: stringType().min(1) }).parse(input)).handler(getPublicTutorBySlug_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	const { data: tutor, error } = await supabaseAdmin.from("tutors").select("id, slug, name, title, photo_url, qualification, experience, subjects, curriculums, grade_levels, languages, bio, gender, nationality, country, city, timezone, availability, methodology, education, schedule, rating, reviews, is_featured").eq("slug", data.slug).eq("is_active", true).is("deleted_at", null).maybeSingle();
	if (error) throw error;
	if (!tutor) return null;
	return {
		...tutor,
		photo_url: await signPhoto(supabaseAdmin, tutor.photo_url)
	};
});
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
var submitTutorApplication_createServerFn_handler = createServerRpc({
	id: "70d70b484d091fe8362b26c82fd571ab0d71933413534f8714c75a1e9ef33944",
	name: "submitTutorApplication",
	filename: "src/lib/tutor-api.functions.ts"
}, (opts) => submitTutorApplication.__executeServer(opts));
var submitTutorApplication = createServerFn({ method: "POST" }).inputValidator((input) => applicationSchema.parse(input)).handler(submitTutorApplication_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	const { data: row, error } = await supabaseAdmin.from("tutor_applications").insert({
		...data,
		status: "pending"
	}).select("id").single();
	if (error) throw error;
	return { id: row.id };
});
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
var submitTrialBooking_createServerFn_handler = createServerRpc({
	id: "77d2f5a4183c406bb59386f6230d282a3d393707bd222d9e31b9419c8e47d967",
	name: "submitTrialBooking",
	filename: "src/lib/tutor-api.functions.ts"
}, (opts) => submitTrialBooking.__executeServer(opts));
var submitTrialBooking = createServerFn({ method: "POST" }).inputValidator((input) => bookingSchema.parse(input)).handler(submitTrialBooking_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	const { error } = await supabaseAdmin.from("trial_bookings").insert(data);
	if (error) throw error;
	return { ok: true };
});
var contactSchema = objectType({
	name: stringType().min(2).max(120),
	email: stringType().email().max(160),
	phone: stringType().max(40).optional().nullable(),
	subject: stringType().max(200).optional().nullable(),
	message: stringType().min(2).max(4e3)
});
var submitContactMessage_createServerFn_handler = createServerRpc({
	id: "30c5db227f66853b5ba71eb098cb2116bd5cea08ff0fd5dd9c6bd57bb4a07c59",
	name: "submitContactMessage",
	filename: "src/lib/tutor-api.functions.ts"
}, (opts) => submitContactMessage.__executeServer(opts));
var submitContactMessage = createServerFn({ method: "POST" }).inputValidator((input) => contactSchema.parse(input)).handler(submitContactMessage_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	const { error } = await supabaseAdmin.from("contact_messages").insert(data);
	if (error) throw error;
	return { ok: true };
});
async function assertAdmin(ctx) {
	const { data, error } = await ctx.supabase.rpc("has_role", {
		_user_id: ctx.userId,
		_role: "admin"
	});
	if (error) throw error;
	if (!data) throw new Error("Forbidden: admin role required");
}
var getIsAdmin_createServerFn_handler = createServerRpc({
	id: "45f48468797df8e099344264c304f97403031aed5e2a346e4362f984bfa7f848",
	name: "getIsAdmin",
	filename: "src/lib/tutor-api.functions.ts"
}, (opts) => getIsAdmin.__executeServer(opts));
var getIsAdmin = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getIsAdmin_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.rpc("has_role", {
		_user_id: context.userId,
		_role: "admin"
	});
	if (error) throw error;
	return {
		isAdmin: !!data,
		userId: context.userId
	};
});
var adminListApplications_createServerFn_handler = createServerRpc({
	id: "03a4488b13449c67390535511afe86c74762c2d72efcca2cd18810c89e3089b6",
	name: "adminListApplications",
	filename: "src/lib/tutor-api.functions.ts"
}, (opts) => adminListApplications.__executeServer(opts));
var adminListApplications = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(adminListApplications_createServerFn_handler, async ({ context }) => {
	await assertAdmin(context);
	const { data, error } = await context.supabase.from("tutor_applications").select("*").order("created_at", { ascending: false });
	if (error) throw error;
	return data ?? [];
});
var adminGetApplication_createServerFn_handler = createServerRpc({
	id: "fd46966a05c31cc0d732a1579f83c785ec767c29929f3b48fd20d5988097fa72",
	name: "adminGetApplication",
	filename: "src/lib/tutor-api.functions.ts"
}, (opts) => adminGetApplication.__executeServer(opts));
var adminGetApplication = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({ id: stringType().uuid() }).parse(i)).handler(adminGetApplication_createServerFn_handler, async ({ context, data }) => {
	await assertAdmin(context);
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	const { data: app, error } = await context.supabase.from("tutor_applications").select("*").eq("id", data.id).maybeSingle();
	if (error) throw error;
	if (!app) return null;
	let cvUrl = null;
	let photoUrl = null;
	let cnicFrontUrl = null;
	let cnicBackUrl = null;
	if (app.cv_path) cvUrl = (await supabaseAdmin.storage.from("tutor-cvs").createSignedUrl(app.cv_path, 3600)).data?.signedUrl ?? null;
	if (app.photo_path) photoUrl = (await supabaseAdmin.storage.from("tutor-photos").createSignedUrl(app.photo_path, 3600)).data?.signedUrl ?? null;
	if (app.cnic_front_path) cnicFrontUrl = (await supabaseAdmin.storage.from("tutor-cvs").createSignedUrl(app.cnic_front_path, 3600)).data?.signedUrl ?? null;
	if (app.cnic_back_path) cnicBackUrl = (await supabaseAdmin.storage.from("tutor-cvs").createSignedUrl(app.cnic_back_path, 3600)).data?.signedUrl ?? null;
	return {
		...app,
		cv_url: cvUrl,
		photo_url: photoUrl,
		cnic_front_url: cnicFrontUrl,
		cnic_back_url: cnicBackUrl
	};
});
var adminUpdateApplicationNotes_createServerFn_handler = createServerRpc({
	id: "aae15ec7cef034d60f1fed5e46a427f1d6c9eed89a807c673461acf46febe526",
	name: "adminUpdateApplicationNotes",
	filename: "src/lib/tutor-api.functions.ts"
}, (opts) => adminUpdateApplicationNotes.__executeServer(opts));
var adminUpdateApplicationNotes = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
	id: stringType().uuid(),
	admin_notes: stringType().max(4e3)
}).parse(i)).handler(adminUpdateApplicationNotes_createServerFn_handler, async ({ context, data }) => {
	await assertAdmin(context);
	const { error } = await context.supabase.from("tutor_applications").update({ admin_notes: data.admin_notes }).eq("id", data.id);
	if (error) throw error;
	return { ok: true };
});
var adminRejectApplication_createServerFn_handler = createServerRpc({
	id: "47464d8a181cf489094c26f4fa2754244d510a70b6d38e1bdbf631da0fb5725d",
	name: "adminRejectApplication",
	filename: "src/lib/tutor-api.functions.ts"
}, (opts) => adminRejectApplication.__executeServer(opts));
var adminRejectApplication = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
	id: stringType().uuid(),
	reason: stringType().min(2).max(200),
	comments: stringType().max(2e3).optional().nullable()
}).parse(i)).handler(adminRejectApplication_createServerFn_handler, async ({ context, data }) => {
	await assertAdmin(context);
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const { data: app, error: fetchErr } = await context.supabase.from("tutor_applications").select("id, full_name, email").eq("id", data.id).single();
	if (fetchErr) throw fetchErr;
	const { sendRejectionEmail } = await import("./rejection-email.server-CLzcH0sX.mjs");
	const result = await sendRejectionEmail({
		to: app.email,
		applicantName: app.full_name,
		reason: data.reason,
		comments: data.comments ?? null
	});
	const { error } = await context.supabase.from("tutor_applications").update({
		status: "rejected",
		reviewed_by: context.userId,
		reviewed_at: now,
		rejected_by: context.userId,
		rejected_at: now,
		rejection_reason: data.reason,
		rejection_comments: data.comments ?? null,
		rejection_email_status: result.status,
		rejection_email_error: result.error ?? null,
		rejection_email_attempted_at: now
	}).eq("id", data.id);
	if (error) throw error;
	return {
		ok: true,
		emailStatus: result.status,
		emailError: result.error
	};
});
var adminResendRejectionEmail_createServerFn_handler = createServerRpc({
	id: "ea7a5c60de2dcaced2e16575d3ffa52a0317538fc7847864139857563fbfcdce",
	name: "adminResendRejectionEmail",
	filename: "src/lib/tutor-api.functions.ts"
}, (opts) => adminResendRejectionEmail.__executeServer(opts));
var adminResendRejectionEmail = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({ id: stringType().uuid() }).parse(i)).handler(adminResendRejectionEmail_createServerFn_handler, async ({ context, data }) => {
	await assertAdmin(context);
	const { data: app, error: fetchErr } = await context.supabase.from("tutor_applications").select("id, full_name, email, rejection_reason, rejection_comments, status").eq("id", data.id).single();
	if (fetchErr) throw fetchErr;
	if (app.status !== "rejected") throw new Error("Application is not in a rejected state");
	if (!app.rejection_reason) throw new Error("No rejection reason on file");
	const { sendRejectionEmail } = await import("./rejection-email.server-CLzcH0sX.mjs");
	const result = await sendRejectionEmail({
		to: app.email,
		applicantName: app.full_name,
		reason: app.rejection_reason,
		comments: app.rejection_comments
	});
	const { error } = await context.supabase.from("tutor_applications").update({
		rejection_email_status: result.status,
		rejection_email_error: result.error ?? null,
		rejection_email_attempted_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", data.id);
	if (error) throw error;
	return {
		ok: true,
		emailStatus: result.status,
		emailError: result.error
	};
});
var adminReopenApplication_createServerFn_handler = createServerRpc({
	id: "902938a7ca0e43aa2065a8964c0a94df92bb93ab507bb9df5fdba2b0b7e0b343",
	name: "adminReopenApplication",
	filename: "src/lib/tutor-api.functions.ts"
}, (opts) => adminReopenApplication.__executeServer(opts));
var adminReopenApplication = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({ id: stringType().uuid() }).parse(i)).handler(adminReopenApplication_createServerFn_handler, async ({ context, data }) => {
	await assertAdmin(context);
	const { error } = await context.supabase.from("tutor_applications").update({
		status: "pending",
		reviewed_by: null,
		reviewed_at: null
	}).eq("id", data.id);
	if (error) throw error;
	return { ok: true };
});
var adminDeleteApplication_createServerFn_handler = createServerRpc({
	id: "44def8c4c47a998feb1488d927f6c99783cc05ef04a3c0fbff848bb852072d89",
	name: "adminDeleteApplication",
	filename: "src/lib/tutor-api.functions.ts"
}, (opts) => adminDeleteApplication.__executeServer(opts));
var adminDeleteApplication = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({ id: stringType().uuid() }).parse(i)).handler(adminDeleteApplication_createServerFn_handler, async ({ context, data }) => {
	await assertAdmin(context);
	const { error } = await context.supabase.from("tutor_applications").delete().eq("id", data.id);
	if (error) throw error;
	return { ok: true };
});
function slugify(s) {
	return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
}
var adminApproveApplication_createServerFn_handler = createServerRpc({
	id: "af0f606aa856d726e36a46396bc3bea287446dc0479e1c20606cc2a2f9e311c6",
	name: "adminApproveApplication",
	filename: "src/lib/tutor-api.functions.ts"
}, (opts) => adminApproveApplication.__executeServer(opts));
var adminApproveApplication = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({ id: stringType().uuid() }).parse(i)).handler(adminApproveApplication_createServerFn_handler, async ({ context, data }) => {
	await assertAdmin(context);
	const { data: app, error: appErr } = await context.supabase.from("tutor_applications").select("id, full_name, photo_path").eq("id", data.id).single();
	if (appErr) throw appErr;
	const base = slugify(app.full_name);
	let slug = base;
	let suffix = 1;
	while (true) {
		const { data: existing } = await context.supabase.from("tutors").select("id").eq("slug", slug).maybeSingle();
		if (!existing) break;
		suffix += 1;
		slug = `${base}-${suffix}`;
	}
	const { data: tutorId, error: rpcErr } = await context.supabase.rpc("approve_tutor_application", {
		_application_id: data.id,
		_slug: slug,
		_photo_url: app.photo_path ?? ""
	});
	if (rpcErr) throw rpcErr;
	return {
		tutorId,
		slug
	};
});
var adminListBookings_createServerFn_handler = createServerRpc({
	id: "f39f46ddbb832c1641d615febb50bb76efeb76eaf3eaae613e919d9de8898892",
	name: "adminListBookings",
	filename: "src/lib/tutor-api.functions.ts"
}, (opts) => adminListBookings.__executeServer(opts));
var adminListBookings = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(adminListBookings_createServerFn_handler, async ({ context }) => {
	await assertAdmin(context);
	const { data, error } = await context.supabase.from("trial_bookings").select("*").order("created_at", { ascending: false });
	if (error) throw error;
	return data ?? [];
});
var adminListMessages_createServerFn_handler = createServerRpc({
	id: "4485aa4f24e7e248770e1513cab1397f9acbf8f24c0262e373c5c8d0ec12231f",
	name: "adminListMessages",
	filename: "src/lib/tutor-api.functions.ts"
}, (opts) => adminListMessages.__executeServer(opts));
var adminListMessages = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(adminListMessages_createServerFn_handler, async ({ context }) => {
	await assertAdmin(context);
	const { data, error } = await context.supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
	if (error) throw error;
	return data ?? [];
});
var adminMarkMessageRead_createServerFn_handler = createServerRpc({
	id: "44fea06a4b5c6d9181c4553616218e19dddc8d31002f65770939958ed59c9a97",
	name: "adminMarkMessageRead",
	filename: "src/lib/tutor-api.functions.ts"
}, (opts) => adminMarkMessageRead.__executeServer(opts));
var adminMarkMessageRead = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
	id: stringType().uuid(),
	status: enumType(["read", "unread"]).optional()
}).parse(i)).handler(adminMarkMessageRead_createServerFn_handler, async ({ context, data }) => {
	await assertAdmin(context);
	const { error } = await context.supabase.from("contact_messages").update({ status: data.status ?? "read" }).eq("id", data.id);
	if (error) throw error;
	return { ok: true };
});
var adminGetMessage_createServerFn_handler = createServerRpc({
	id: "623802c57df26df3a1ae68ed837414dc72cb84a624d0360af08ed46654e9527a",
	name: "adminGetMessage",
	filename: "src/lib/tutor-api.functions.ts"
}, (opts) => adminGetMessage.__executeServer(opts));
var adminGetMessage = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({ id: stringType().uuid() }).parse(i)).handler(adminGetMessage_createServerFn_handler, async ({ context, data }) => {
	await assertAdmin(context);
	const { data: msg, error } = await context.supabase.from("contact_messages").select("*").eq("id", data.id).maybeSingle();
	if (error) throw error;
	return msg;
});
var adminDeleteMessage_createServerFn_handler = createServerRpc({
	id: "754ad347375a684641651d307a30e644dc28a83178621b1d88af5fa42e148e88",
	name: "adminDeleteMessage",
	filename: "src/lib/tutor-api.functions.ts"
}, (opts) => adminDeleteMessage.__executeServer(opts));
var adminDeleteMessage = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({ id: stringType().uuid() }).parse(i)).handler(adminDeleteMessage_createServerFn_handler, async ({ context, data }) => {
	await assertAdmin(context);
	const { error } = await context.supabase.from("contact_messages").delete().eq("id", data.id);
	if (error) throw error;
	return { ok: true };
});
var adminListTutors_createServerFn_handler = createServerRpc({
	id: "42786e20e67db3cd450d95a3f115d3ae6eed27347253df7f11cde354808f7051",
	name: "adminListTutors",
	filename: "src/lib/tutor-api.functions.ts"
}, (opts) => adminListTutors.__executeServer(opts));
var adminListTutors = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(adminListTutors_createServerFn_handler, async ({ context }) => {
	await assertAdmin(context);
	const { data, error } = await context.supabase.from("tutors").select("*").order("created_at", { ascending: false });
	if (error) throw error;
	return data ?? [];
});
var adminSetTutorActive_createServerFn_handler = createServerRpc({
	id: "1d728f6c48283e7a0be8c07822135d560586d20e89840bea939057939cb7c61f",
	name: "adminSetTutorActive",
	filename: "src/lib/tutor-api.functions.ts"
}, (opts) => adminSetTutorActive.__executeServer(opts));
var adminSetTutorActive = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
	id: stringType().uuid(),
	is_active: booleanType()
}).parse(i)).handler(adminSetTutorActive_createServerFn_handler, async ({ context, data }) => {
	await assertAdmin(context);
	const { error } = await context.supabase.from("tutors").update({ is_active: data.is_active }).eq("id", data.id);
	if (error) throw error;
	return { ok: true };
});
var adminGetTutor_createServerFn_handler = createServerRpc({
	id: "047c6841888bfac78c0443d0b945ed7aecfff269d827729feba5ab152cf261d6",
	name: "adminGetTutor",
	filename: "src/lib/tutor-api.functions.ts"
}, (opts) => adminGetTutor.__executeServer(opts));
var adminGetTutor = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({ id: stringType().uuid() }).parse(i)).handler(adminGetTutor_createServerFn_handler, async ({ context, data }) => {
	await assertAdmin(context);
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	const { data: tutor, error } = await context.supabase.from("tutors").select("*").eq("id", data.id).maybeSingle();
	if (error) throw error;
	if (!tutor) return null;
	let photoUrl = null;
	if (tutor.photo_url) if (tutor.photo_url.startsWith("http")) photoUrl = tutor.photo_url;
	else photoUrl = (await supabaseAdmin.storage.from("tutor-photos").createSignedUrl(tutor.photo_url, 3600)).data?.signedUrl ?? null;
	return {
		...tutor,
		photo_url_signed: photoUrl
	};
});
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
var adminUpdateTutor_createServerFn_handler = createServerRpc({
	id: "41d52dc72a5f25e1bedb49d3ec8b99121f68aac582b5305479fe0b5746890e4d",
	name: "adminUpdateTutor",
	filename: "src/lib/tutor-api.functions.ts"
}, (opts) => adminUpdateTutor.__executeServer(opts));
var adminUpdateTutor = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => tutorUpdateSchema.parse(i)).handler(adminUpdateTutor_createServerFn_handler, async ({ context, data }) => {
	await assertAdmin(context);
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	const { error } = await supabaseAdmin.from("tutors").update(data.patch).eq("id", data.id);
	if (error) throw error;
	return { ok: true };
});
var adminDeleteTutor_createServerFn_handler = createServerRpc({
	id: "16770ad04fe93bcc48040e3c0fa1f32bf9da9fc8ba30cc4bccf2859ca1a58516",
	name: "adminDeleteTutor",
	filename: "src/lib/tutor-api.functions.ts"
}, (opts) => adminDeleteTutor.__executeServer(opts));
var adminDeleteTutor = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({ id: stringType().uuid() }).parse(i)).handler(adminDeleteTutor_createServerFn_handler, async ({ context, data }) => {
	await assertAdmin(context);
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	const { data: existing } = await supabaseAdmin.from("tutors").select("photo_url, application_id").eq("id", data.id).maybeSingle();
	const { error } = await context.supabase.from("tutors").delete().eq("id", data.id);
	if (error) throw error;
	const photo = existing?.photo_url;
	const applicationId = existing?.application_id;
	if (applicationId) await supabaseAdmin.from("tutor_applications").update({ status: "removed" }).eq("id", applicationId);
	if (photo && !photo.startsWith("http")) await supabaseAdmin.storage.from("tutor-photos").remove([photo]).catch(() => {});
	return { ok: true };
});
var adminStatsSummary_createServerFn_handler = createServerRpc({
	id: "24bced9769df11fe5dc75434b494113ea75d1a9081e8d685260f677b15215750",
	name: "adminStatsSummary",
	filename: "src/lib/tutor-api.functions.ts"
}, (opts) => adminStatsSummary.__executeServer(opts));
var adminStatsSummary = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(adminStatsSummary_createServerFn_handler, async ({ context }) => {
	await assertAdmin(context);
	const [apps, tutors, bookings, messages] = await Promise.all([
		context.supabase.from("tutor_applications").select("status"),
		context.supabase.from("tutors").select("id", {
			count: "exact",
			head: true
		}).is("deleted_at", null),
		context.supabase.from("trial_bookings").select("id", {
			count: "exact",
			head: true
		}),
		context.supabase.from("contact_messages").select("id", {
			count: "exact",
			head: true
		})
	]);
	const appRows = apps.data ?? [];
	return {
		applications: {
			total: appRows.length,
			pending: appRows.filter((a) => a.status === "pending").length,
			approved: appRows.filter((a) => a.status === "approved").length,
			rejected: appRows.filter((a) => a.status === "rejected").length
		},
		tutors: tutors.count ?? 0,
		bookings: bookings.count ?? 0,
		messages: messages.count ?? 0
	};
});
//#endregion
export { adminApproveApplication_createServerFn_handler, adminDeleteApplication_createServerFn_handler, adminDeleteMessage_createServerFn_handler, adminDeleteTutor_createServerFn_handler, adminGetApplication_createServerFn_handler, adminGetMessage_createServerFn_handler, adminGetTutor_createServerFn_handler, adminListApplications_createServerFn_handler, adminListBookings_createServerFn_handler, adminListMessages_createServerFn_handler, adminListTutors_createServerFn_handler, adminMarkMessageRead_createServerFn_handler, adminRejectApplication_createServerFn_handler, adminReopenApplication_createServerFn_handler, adminResendRejectionEmail_createServerFn_handler, adminSetTutorActive_createServerFn_handler, adminStatsSummary_createServerFn_handler, adminUpdateApplicationNotes_createServerFn_handler, adminUpdateTutor_createServerFn_handler, getIsAdmin_createServerFn_handler, getPublicTutorBySlug_createServerFn_handler, listPublicTutors_createServerFn_handler, submitContactMessage_createServerFn_handler, submitTrialBooking_createServerFn_handler, submitTutorApplication_createServerFn_handler };
