// Keyword taxonomy used to derive filter facets (profession, department,
// category, degree level) from department/programme names that are already
// confirmed in output/*.mdx. This never adds new academic facts — it only
// groups existing confirmed names for search/filter purposes.
// See docs/04_CONTENT_SPEC.md ("Tagging & Facets") for the rationale.

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function makeMatcher(keywords) {
  const pattern = keywords.map(escapeRegExp).join("|");
  return new RegExp(`\\b(${pattern})\\b`, "i");
}

export const PROFESSIONS = [
  {
    id: "engineering-technology",
    label: "Engineering & Technology",
    category: "Natural Science",
    keywords: [
      "engineering",
      "architecture",
      "construction technology",
      "urban planning",
      "surveying engineering",
      "mining engineering",
      "textile engineering",
      "mechatronics",
      "electromechanical",
    ],
  },
  {
    id: "computing-it",
    label: "Computing & Information Technology",
    category: "Natural Science",
    keywords: [
      "computer science",
      "software engineering",
      "information technology",
      "information system",
      "information systems",
      "data science",
      "cyber ?security",
      "computing",
    ],
  },
  {
    id: "medicine-health",
    label: "Medicine & Health Sciences",
    category: "Natural Science",
    keywords: [
      "medicine",
      "medical",
      "nursing",
      "midwifery",
      "pharmacy",
      "dentistry",
      "dental",
      "public health",
      "health officer",
      "anesthesia",
      "radiograph",
      "laboratory science",
      "physiotherapy",
      "optometry",
      "health science",
    ],
  },
  {
    id: "natural-sciences",
    label: "Natural & Physical Sciences",
    category: "Natural Science",
    keywords: [
      "biology",
      "chemistry",
      "physics",
      "mathematics",
      "statistics",
      "geology",
      "environmental science",
      "biotechnology",
      "food science",
    ],
  },
  {
    id: "agriculture-veterinary",
    label: "Agriculture & Veterinary Medicine",
    category: "Natural Science",
    keywords: [
      "agriculture",
      "agronomy",
      "animal science",
      "plant science",
      "forestry",
      "veterinary",
      "agribusiness",
      "horticulture",
      "natural resource",
    ],
  },
  {
    id: "business-economics",
    label: "Business & Economics",
    category: "Social Science",
    keywords: [
      "accounting",
      "finance",
      "management",
      "economics",
      "marketing",
      "business administration",
      "logistics",
      "supply chain",
      "cooperative",
    ],
  },
  {
    id: "law",
    label: "Law",
    category: "Social Science",
    keywords: ["\\bLL\\.?B\\b", "\\blaw\\b", "\\blaws\\b"],
  },
  {
    id: "education",
    label: "Education & Teacher Training",
    category: "Social Science",
    keywords: ["education", "\\bteacher\\b", "pedagogy"],
  },
  {
    id: "social-sciences-humanities",
    label: "Social Sciences & Humanities",
    category: "Social Science",
    keywords: [
      "sociology",
      "psychology",
      "political science",
      "\\bhistory\\b",
      "literature",
      "language",
      "linguistics",
      "journalism",
      "communication",
      "anthropology",
      "philosophy",
      "theology",
      "social work",
      "geography",
    ],
  },
  {
    id: "arts-design",
    label: "Arts & Design",
    category: "Social Science",
    keywords: [
      "fine arts",
      "\\bmusic\\b",
      "theatre",
      "\\bfilm\\b",
      "\\bdesign\\b",
      "sculpture",
      "painting",
    ],
  },
];

export const DEPARTMENTS = [
  { label: "Computer Science", keywords: ["computer science"] },
  { label: "Software Engineering", keywords: ["software engineering"] },
  { label: "Information Technology", keywords: ["information technology"] },
  { label: "Information Systems", keywords: ["information systems?"] },
  {
    label: "Electrical & Computer Engineering",
    keywords: ["electrical (and|&) computer engineering", "electrical engineering"],
  },
  { label: "Mechanical Engineering", keywords: ["mechanical engineering"] },
  { label: "Civil Engineering", keywords: ["civil engineering"] },
  { label: "Chemical Engineering", keywords: ["chemical engineering"] },
  { label: "Biomedical Engineering", keywords: ["biomedical engineering"] },
  { label: "Industrial Engineering", keywords: ["industrial engineering"] },
  { label: "Architecture", keywords: ["architecture"] },
  {
    label: "Construction Technology & Management",
    keywords: ["construction technology", "construction management"],
  },
  { label: "Chemistry", keywords: ["chemistry"] },
  { label: "Physics", keywords: ["physics"] },
  { label: "Mathematics", keywords: ["mathematics"] },
  { label: "Statistics", keywords: ["statistics"] },
  { label: "Biology", keywords: ["biology"] },
  { label: "Geology", keywords: ["geology"] },
  { label: "Accounting & Finance", keywords: ["accounting( and| &) finance", "\\baccounting\\b"] },
  { label: "Economics", keywords: ["economics"] },
  { label: "Management", keywords: ["\\bmanagement\\b"] },
  { label: "Marketing", keywords: ["marketing"] },
  { label: "Business Administration", keywords: ["business administration"] },
  {
    label: "Logistics & Supply Chain Management",
    keywords: ["logistics( and| &) supply chain", "supply chain management"],
  },
  { label: "Law", keywords: ["\\bLL\\.?B\\b", "\\blaw\\b"] },
  { label: "Medicine", keywords: ["\\bmedicine\\b", "doctor of medicine"] },
  { label: "Nursing", keywords: ["nursing"] },
  { label: "Midwifery", keywords: ["midwifery"] },
  { label: "Pharmacy", keywords: ["pharmacy"] },
  { label: "Public Health", keywords: ["public health"] },
  { label: "Medical Laboratory Sciences", keywords: ["medical laboratory"] },
  { label: "Veterinary Medicine", keywords: ["veterinary"] },
  { label: "Agriculture", keywords: ["\\bagriculture\\b", "agronomy"] },
  { label: "Animal Science", keywords: ["animal science"] },
  { label: "Sociology", keywords: ["sociology"] },
  { label: "Psychology", keywords: ["psychology"] },
  { label: "Political Science", keywords: ["political science"] },
  { label: "History", keywords: ["\\bhistory\\b"] },
  {
    label: "Journalism & Communication",
    keywords: ["journalism", "communication"],
  },
  { label: "Fine Arts", keywords: ["fine arts"] },
  { label: "Music", keywords: ["\\bmusic\\b"] },
  { label: "Education", keywords: ["\\beducation\\b"] },
  {
    label: "English Language & Literature",
    keywords: ["english language", "english literature"],
  },
  { label: "Geography", keywords: ["geography"] },
];

const DEGREE_LEVEL_RULES = [
  { label: "Bachelor's", pattern: /bachelor/i },
  { label: "Master's", pattern: /master/i },
  { label: "PhD", pattern: /ph\.?\s?d/i },
  { label: "Diploma", pattern: /diploma/i },
  { label: "Specialization", pattern: /specializ/i },
];

/**
 * A single programme string looks like:
 *   "Bachelor of Science in Computer Science — Bachelor's"
 *   "Doctor of Veterinary Medicine (DVM) — Other official label"
 *   "Cyber Security Stream — Not confirmed (stream, degree level not stated)"
 * Returns a canonical degree level, or null if none is explicitly stated.
 */
export function extractDegreeLevel(programme) {
  const suffix = programme.split("—").slice(1).join("—");
  if (!suffix) return null;
  if (/not confirmed|not stated/i.test(suffix)) return null;
  for (const rule of DEGREE_LEVEL_RULES) {
    if (rule.pattern.test(suffix)) return rule.label;
  }
  return null;
}

function matchAll(text, entries, keyOf) {
  const matched = new Set();
  for (const entry of entries) {
    const matcher = makeMatcher(entry.keywords);
    if (matcher.test(text)) matched.add(keyOf(entry));
  }
  return [...matched];
}

export function matchProfessions(text) {
  return matchAll(text, PROFESSIONS, (p) => p.label);
}

export function matchDepartments(text) {
  return matchAll(text, DEPARTMENTS, (d) => d.label);
}

export function categoriesForProfessions(professionLabels) {
  const byLabel = new Map(PROFESSIONS.map((p) => [p.label, p.category]));
  return [...new Set(professionLabels.map((label) => byLabel.get(label)).filter(Boolean))];
}

// Known wording variants that describe the same official region, used only
// to group filter chips together. The raw `region` string shown on a
// university's own page is never altered.
const REGION_ALIASES = new Map([
  ["South-West Ethiopia Region", "South West Ethiopia Peoples' Region"],
]);

export function canonicalRegionGroup(region) {
  if (!region) return null;
  const stripped = region.split(" (")[0].trim();
  return REGION_ALIASES.get(stripped) ?? stripped;
}
