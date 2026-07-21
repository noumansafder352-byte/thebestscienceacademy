import tutor1 from "@/assets/tutor-1.jpg";
import tutor2 from "@/assets/tutor-2.jpg";
import tutor3 from "@/assets/tutor-3.jpg";
import tutor4 from "@/assets/tutor-4.jpg";

export const curriculums = [
  { code: "IGCSE", name: "IGCSE", desc: "Cambridge International General Certificate, Grades 9–10.", color: "primary" },
  { code: "OLEVEL", name: "O Level", desc: "Cambridge O Level for international students worldwide.", color: "primary" },
  { code: "ALEVEL", name: "A Level", desc: "Advanced Level preparation with university-ready depth.", color: "primary" },
  { code: "IB", name: "IB", desc: "International Baccalaureate MYP & DP across HL and SL.", color: "primary" },
  { code: "AQA", name: "AQA", desc: "UK-based AQA GCSE & A Level specifications.", color: "primary" },
  { code: "EDEXCEL", name: "Edexcel", desc: "Pearson Edexcel International GCSE & A Levels.", color: "primary" },
  { code: "LRN", name: "LRN", desc: "Learning Resource Network international qualifications.", color: "primary" },
  { code: "FBISE", name: "FBISE", desc: "Federal Board curriculum for overseas Pakistani students.", color: "primary" },
] as const;

export const subjects = [
  { name: "Mathematics", icon: "Sigma" },
  { name: "Additional Mathematics", icon: "Infinity" },
  { name: "Mathematics Communication", icon: "MessageSquare" },
  { name: "Physics", icon: "Atom" },
  { name: "Chemistry", icon: "FlaskConical" },
  { name: "Biology", icon: "Leaf" },
  { name: "English", icon: "BookOpen" },
  { name: "Computer Science", icon: "Code2" },
  { name: "Business", icon: "Briefcase" },
  { name: "Economics", icon: "LineChart" },
  { name: "Accounting", icon: "Calculator" },
  { name: "Further Mathematics", icon: "Infinity" },
  { name: "Urdu", icon: "Languages" },
  { name: "Islamic Studies", icon: "Moon" },
  { name: "Law", icon: "Scale" },
  { name: "Sociology", icon: "Users" },
  { name: "Physiology", icon: "HeartPulse" },
  { name: "Psychology", icon: "Brain" },
  { name: "History", icon: "Landmark" },
  { name: "Geography", icon: "Map" },
] as const;

export const stats = [
  { value: 4200, suffix: "+", label: "Students Taught" },
  { value: 5000, suffix: "+", label: "Expert Tutors" },
  { value: 24, suffix: "", label: "Subjects" },
  { value: 32, suffix: "", label: "Countries" },
] as const;


export const whyChoose = [
  { title: "One-to-One Classes", body: "Every session is fully personalised to your child's pace and goals." },
  { title: "Qualified Tutors", body: "Hand-picked MSc & PhD educators with international teaching experience." },
  { title: "Flexible Scheduling", body: "Lessons that fit GMT, GST, AEST and CET time zones seamlessly." },
  { title: "Affordable Tuition", body: "Premium quality at a fraction of typical international tutoring rates." },
  { title: "Recorded Sessions", body: "Every class is recorded for revision, parent oversight and recall." },
  { title: "Progress Reports", body: "Monthly written reports with measurable progress benchmarks." },
  { title: "Exam Preparation", body: "Past-paper drills, mark-scheme strategy and timed mock exams." },
  { title: "Interactive Learning", body: "Smart whiteboard, live problem solving and engaged discussion." },
];

export const howItWorks = [
  { step: "01", title: "Book Consultation", body: "A free 20-minute call to understand your child's needs." },
  { step: "02", title: "Assessment", body: "We map current level, gaps and target grades." },
  { step: "03", title: "Tutor Matching", body: "We pair you with the best-fit subject expert." },
  { step: "04", title: "Online Classes", body: "Weekly one-to-one lessons on a smart whiteboard." },
  { step: "05", title: "Monthly Progress", body: "Written reports and parent reviews every month." },
];

export type TutorEducation = {
  qualification: string;
  degree: string;
  institution: string;
  year: string;
};

export type TutorSchedule = { day: string; slots: string[] };

export type Tutor = {
  slug: string;
  name: string;
  title: string;
  photo: string;
  qualification: string;
  experience: string;
  subjects: string[];
  curriculums: string[];
  gradeLevels: string[];
  rating: number;
  reviews: number;
  languages: string[];
  bio: string;
  gender: "Male" | "Female";
  nationality: string;
  country: string;
  city: string;
  availability: "Available" | "Limited Availability" | "Fully Booked";
  timezone: string;
  methodology: string;
  education: TutorEducation[];
  schedule: TutorSchedule[];
  cvUrl?: string;
};

const defaultSchedule: TutorSchedule[] = [
  { day: "Mon", slots: ["4–6 PM", "7–9 PM"] },
  { day: "Tue", slots: ["5–7 PM"] },
  { day: "Wed", slots: ["4–6 PM", "7–9 PM"] },
  { day: "Thu", slots: ["5–8 PM"] },
  { day: "Fri", slots: ["4–6 PM"] },
  { day: "Sat", slots: ["10 AM–1 PM", "3–6 PM"] },
  { day: "Sun", slots: [] },
];

const baseMethodology =
  "Concept-first teaching anchored to the mark scheme. Every lesson combines a diagnostic warm-up, a worked exemplar, guided practice on past-paper questions, and a short written recap so parents can see progress week by week.";

export const allTutors: Tutor[] = [
  { slug: "hassan-raza", name: "Mr. Hassan Raza", title: "Senior Physics & Mathematics Tutor", photo: tutor1, qualification: "MSc Physics, Punjab University", experience: "9 yrs", subjects: ["Physics", "Mathematics"], curriculums: ["A Level", "IGCSE"], gradeLevels: ["High School", "College"], rating: 4.9, reviews: 184, languages: ["English", "Urdu"], gender: "Male", nationality: "Pakistani", country: "Pakistan", city: "Lahore", availability: "Available", timezone: "GMT+5 (PKT)", methodology: baseMethodology, education: [{ qualification: "Master's", degree: "MSc Physics", institution: "Punjab University", year: "2014" }, { qualification: "Bachelor's", degree: "BSc Physics", institution: "GC University Lahore", year: "2012" }], schedule: defaultSchedule, bio: "Specialises in A Level Physics and Further Maths. Former lecturer with a portfolio of A* graduates now studying at Imperial, UCL and NYU." },
  { slug: "ayesha-khan", name: "Ms. Ayesha Khan", title: "IB & AQA English Literature Specialist", photo: tutor2, qualification: "MA English Literature, NUML", experience: "7 yrs", subjects: ["English", "Literature"], curriculums: ["IB", "AQA"], gradeLevels: ["High School", "College"], rating: 4.9, reviews: 142, languages: ["English", "Urdu"], gender: "Female", nationality: "Pakistani", country: "Pakistan", city: "Islamabad", availability: "Limited Availability", timezone: "GMT+5 (PKT)", methodology: baseMethodology, education: [{ qualification: "Master's", degree: "MA English Literature", institution: "NUML Islamabad", year: "2016" }], schedule: defaultSchedule, bio: "IB English A and AQA Literature specialist. Known for transforming reluctant writers into confident, analytical essayists." },
  { slug: "bilal-ahmed", name: "Dr. Bilal Ahmed", title: "Doctorate Mathematics Coach", photo: tutor3, qualification: "PhD Mathematics, LUMS", experience: "12 yrs", subjects: ["Mathematics", "Further Mathematics"], curriculums: ["A Level", "Edexcel"], gradeLevels: ["High School", "College", "University"], rating: 5.0, reviews: 211, languages: ["English", "Urdu"], gender: "Male", nationality: "Pakistani", country: "Pakistan", city: "Lahore", availability: "Fully Booked", timezone: "GMT+5 (PKT)", methodology: baseMethodology, education: [{ qualification: "Doctorate", degree: "PhD Mathematics", institution: "LUMS", year: "2013" }, { qualification: "Master's", degree: "MSc Mathematics", institution: "Punjab University", year: "2008" }], schedule: defaultSchedule, bio: "Doctorate-level mathematician with 12 years of online tutoring across Edexcel and Cambridge A Level Maths and Further Maths." },
  { slug: "sana-tariq", name: "Ms. Sana Tariq", title: "IGCSE Chemistry & Biology Tutor", photo: tutor4, qualification: "MSc Chemistry, Karachi University", experience: "6 yrs", subjects: ["Chemistry", "Biology"], curriculums: ["IGCSE", "O Level"], gradeLevels: ["Middle School", "High School"], rating: 4.8, reviews: 96, languages: ["English", "Urdu"], gender: "Female", nationality: "Pakistani", country: "Pakistan", city: "Karachi", availability: "Available", timezone: "GMT+5 (PKT)", methodology: baseMethodology, education: [{ qualification: "Master's", degree: "MSc Chemistry", institution: "Karachi University", year: "2017" }], schedule: defaultSchedule, bio: "Patient, exam-focused IGCSE Chemistry and Biology coach. Students consistently move up two grade bands within a term." },
  { slug: "usman-ali", name: "Mr. Usman Ali", title: "Computer Science & Mathematics Tutor", photo: tutor1, qualification: "MSc Computer Science, FAST", experience: "8 yrs", subjects: ["Computer Science", "Mathematics"], curriculums: ["IGCSE", "A Level"], gradeLevels: ["High School", "College"], rating: 4.8, reviews: 121, languages: ["English", "Urdu"], gender: "Male", nationality: "Pakistani", country: "Pakistan", city: "Islamabad", availability: "Available", timezone: "GMT+5 (PKT)", methodology: baseMethodology, education: [{ qualification: "Master's", degree: "MSc Computer Science", institution: "FAST NUCES", year: "2015" }], schedule: defaultSchedule, bio: "Computer Science specialist covering Python, Java, algorithms and exam-style problem solving for Cambridge and AQA." },
  { slug: "mariam-sheikh", name: "Ms. Mariam Sheikh", title: "IB & A Level Economics Specialist", photo: tutor2, qualification: "MA Economics, LSE Alum", experience: "10 yrs", subjects: ["Economics", "Business"], curriculums: ["IB", "A Level"], gradeLevels: ["High School", "College", "University"], rating: 4.9, reviews: 175, languages: ["English"], gender: "Female", nationality: "British Pakistani", country: "United Kingdom", city: "London", availability: "Limited Availability", timezone: "GMT (UK)", methodology: baseMethodology, education: [{ qualification: "Master's", degree: "MA Economics", institution: "London School of Economics", year: "2013" }], schedule: defaultSchedule, bio: "LSE-trained Economics tutor for IB HL and A Level — sharp, structured and exam-board literate." },
  { slug: "tariq-mehmood", name: "Mr. Tariq Mehmood", title: "IGCSE Biology & Chemistry Tutor", photo: tutor3, qualification: "MSc Biology, AKU", experience: "5 yrs", subjects: ["Biology", "Chemistry"], curriculums: ["IGCSE", "O Level"], gradeLevels: ["Middle School", "High School"], rating: 4.7, reviews: 78, languages: ["English", "Urdu"], gender: "Male", nationality: "Pakistani", country: "Pakistan", city: "Karachi", availability: "Available", timezone: "GMT+5 (PKT)", methodology: baseMethodology, education: [{ qualification: "Master's", degree: "MSc Biology", institution: "Aga Khan University", year: "2018" }], schedule: defaultSchedule, bio: "Medical-school graduate teaching Biology with deep mark-scheme command. Loved by O Level students worldwide." },
  { slug: "hira-naveed", name: "Ms. Hira Naveed", title: "AQA & Edexcel English Specialist", photo: tutor4, qualification: "MA English, Oxford Alum", experience: "11 yrs", subjects: ["English", "Literature"], curriculums: ["AQA", "Edexcel"], gradeLevels: ["High School", "College"], rating: 5.0, reviews: 203, languages: ["English"], gender: "Female", nationality: "British Pakistani", country: "United Kingdom", city: "Oxford", availability: "Available", timezone: "GMT (UK)", methodology: baseMethodology, education: [{ qualification: "Master's", degree: "MA English", institution: "University of Oxford", year: "2012" }], schedule: defaultSchedule, bio: "Oxford-trained English specialist for AQA and Edexcel GCSE/A Level. Famous for unlocking top-band essay writing." },
];

// Backwards-compatible alias used elsewhere
export const featuredTutors = allTutors.slice(0, 4);

export const testimonials = [
  { quote: "My daughter jumped two grades in A Level Physics within a single term. The structured approach is unmatched.", author: "Sarah M.", role: "Parent · London, UK" },
  { quote: "The IB Maths tutor explained concepts more clearly than my school teachers. I finally enjoy studying.", author: "Ahmed J.", role: "Student · Dubai, UAE" },
  { quote: "We tried three tutoring services before this one. Honestly, it's a different league of professionalism.", author: "Linda P.", role: "Parent · Melbourne, AU" },
];

export const countries = ["United Kingdom", "United Arab Emirates", "Australia", "Saudi Arabia", "Qatar", "Singapore", "Germany", "Canada", "Malaysia", "Kuwait", "Oman", "Netherlands"];

export const curriculumComparison = [
  { name: "IGCSE", ages: "14–16", level: "Secondary", countries: "UK, UAE, Asia, Europe", subjects: "70+", exam: "Written + Practical" },
  { name: "O Level", ages: "14–16", level: "Secondary", countries: "Commonwealth", subjects: "40+", exam: "Written" },
  { name: "A Level", ages: "16–18", level: "Pre-University", countries: "UK, UAE, Singapore", subjects: "55+", exam: "Modular + Linear" },
  { name: "IB DP", ages: "16–19", level: "Pre-University", countries: "Global", subjects: "6 + Core", exam: "IA + Final Exams" },
  { name: "AQA", ages: "14–18", level: "GCSE / A Level", countries: "UK", subjects: "60+", exam: "Linear" },
  { name: "Edexcel", ages: "14–18", level: "IGCSE / IAL", countries: "UK + International", subjects: "40+", exam: "Modular" },
];

// ============ Admin dashboard mock data ============
export const adminStats = [
  { label: "Active Students", value: "1,284", delta: "+12.4%", trend: "up" as const },
  { label: "Active Tutors", value: "186", delta: "+4.1%", trend: "up" as const },
  { label: "Trial Requests", value: "92", delta: "+28%", trend: "up" as const },
  { label: "Monthly Revenue", value: "$48,920", delta: "+9.2%", trend: "up" as const },
];

export const adminTutors = allTutors.map((t, i) => ({
  id: 1000 + i,
  slug: t.slug,
  name: t.name,
  subject: t.subjects[0],
  curriculum: t.curriculums[0],
  rating: t.rating,
  status: (i % 5 === 0 ? "Pending" : i % 7 === 0 ? "On Leave" : "Active") as "Active" | "Pending" | "On Leave",
  joined: ["2024-03-12", "2024-05-04", "2023-11-21", "2024-08-19", "2024-02-07", "2023-09-30", "2024-06-15", "2025-01-08"][i % 8],
}));

export const adminStudents = [
  { id: 2001, name: "Aisha Rahman", country: "United Kingdom", curriculum: "A Level", subjects: 3, status: "Active" },
  { id: 2002, name: "Omar Al-Farsi", country: "UAE", curriculum: "IGCSE", subjects: 4, status: "Active" },
  { id: 2003, name: "Ethan Walker", country: "Australia", curriculum: "IB", subjects: 6, status: "Trial" },
  { id: 2004, name: "Lina Park", country: "Singapore", curriculum: "A Level", subjects: 2, status: "Active" },
  { id: 2005, name: "Sara Mehmood", country: "Saudi Arabia", curriculum: "O Level", subjects: 5, status: "Paused" },
  { id: 2006, name: "Daniel Müller", country: "Germany", curriculum: "AQA", subjects: 3, status: "Active" },
  { id: 2007, name: "Ahmed Jameel", country: "Qatar", curriculum: "IB", subjects: 4, status: "Trial" },
];

export const adminApplications = [
  { id: 3001, name: "Sadia Iqbal", subject: "Physics", curriculum: "A Level", experience: "6 yrs", date: "2025-06-22", status: "Review" },
  { id: 3002, name: "Hamza Sheikh", subject: "Mathematics", curriculum: "IGCSE", experience: "4 yrs", date: "2025-06-23", status: "Interview" },
  { id: 3003, name: "Areeba Noor", subject: "Chemistry", curriculum: "IB", experience: "8 yrs", date: "2025-06-24", status: "Approved" },
  { id: 3004, name: "Imran Qureshi", subject: "Economics", curriculum: "AQA", experience: "5 yrs", date: "2025-06-25", status: "Review" },
  { id: 3005, name: "Maira Yousaf", subject: "Biology", curriculum: "O Level", experience: "3 yrs", date: "2025-06-26", status: "Rejected" },
];

export const adminMessages = [
  { id: 4001, from: "Sarah M. (UK)", subject: "Question about A Level Physics tutor availability", date: "2h ago", unread: true },
  { id: 4002, from: "Faisal Al-Marri (UAE)", subject: "Following up on free trial booking", date: "5h ago", unread: true },
  { id: 4003, from: "Linda P. (AU)", subject: "Excellent first session — thank you!", date: "1d ago", unread: false },
  { id: 4004, from: "Daniel Müller (DE)", subject: "Re: monthly progress report", date: "2d ago", unread: false },
];
