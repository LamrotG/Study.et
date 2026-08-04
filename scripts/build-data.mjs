// Parses the research .mdx files in ../Input/*.mdx and produces a clean,
// site-only JSON dataset at data/universities.json.
// The research input stays untouched — this script only reads from it.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import {
  extractDegreeLevel,
  matchProfessions,
  matchDepartments,
  categoriesForProfessions,
  canonicalRegionGroup,
} from "./taxonomy.mjs";
import { expandProgrammeEntry } from "./expandProgramme.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INPUT_DIR = path.join(__dirname, "..", "Input");
const DATA_DIR = path.join(__dirname, "..", "data");

// Every bullet under a Departments/Programmes heading that is actually a
// data-quality caveat (a sentence about the data, rather than a real
// department/programme name) reliably shows one of these tells: it opens
// with one of these words, or it contains phrasing that only ever shows up
// in a caveat sentence in this dataset (never in an actual name).
const CAVEAT_FIRST_WORDS = new Set([
  "no",
  "only",
  "the",
  "other",
  "additional",
  "each",
  "degree",
  "not",
]);
const CAVEAT_SUBSTRINGS = [
  "not itemised",
  "not itemized",
  "not individually confirmed",
  "not confirmed",
  "individual titles",
  "not researched",
  "confirmed to exist across",
  "confirmed to run in each",
  "not separately distinguished",
  "was not read to its",
  "beyond their names",
  "were not itemised",
  "not stated",
  "confirmed by count",
  "confirmed in each of the",
  "confirmed to exist per department",
  "departments confirmed, including",
  "not individually itemised",
];
function isCaveat(line) {
  const firstWord = line
    .trim()
    .split(/\s+/)[0]
    ?.toLowerCase()
    .replace(/[^a-z-]/g, "");
  if (firstWord && CAVEAT_FIRST_WORDS.has(firstWord)) return true;
  if (/^(programme|department|institute)-to-/i.test(line)) return true;
  const lower = line.toLowerCase();
  return CAVEAT_SUBSTRINGS.some((s) => lower.includes(s));
}

function parseAcademicUnits(body) {
  const section = body.split(/^## Academic Units$/m)[1];
  if (!section) return [];
  const rest = section.split(/^## /m)[0];

  const unitBlocks = rest.split(/^### /m).slice(1);
  return unitBlocks.map((block) => {
    const lines = block.split("\n");
    const name = lines[0].trim();

    const typeMatch = block.match(/\*\*Official unit type:\*\*\s*(.+)/);
    const officialType = typeMatch ? typeMatch[1].trim() : null;

    // Not yet populated for any unit as of this pass — see docs/04_CONTENT_SPEC.md.
    // Wired up now so a future research pass can add "**Description:** ..."
    // to a unit block and have it show up with no further code changes.
    const descriptionMatch = block.match(/\*\*Description:\*\*\s*(.+)/);
    const description = descriptionMatch ? descriptionMatch[1].trim() : null;

    const departments = [];
    const programmes = [];

    // Split on #### headings (Departments / Programmes / combined)
    const subBlocks = block.split(/^#### /m).slice(1);
    for (const sub of subBlocks) {
      const subLines = sub.split("\n");
      const heading = subLines[0].trim().toLowerCase();
      const items = subLines
        .slice(1)
        .filter((l) => /^\s*-\s+/.test(l))
        .map((l) => l.replace(/^\s*-\s+/, "").trim())
        // Drop meta/caveat bullets (data-quality notes written as list items),
        // keeping only actual department/programme names.
        .filter((l) => !isCaveat(l))
        // A single confirmed bullet sometimes condenses several distinct
        // names into one semicolon/comma-joined line — split those back
        // into one item each (see expandProgramme.mjs); re-filter in case
        // expansion produced its own caveat note (e.g. an "and others" gap).
        .flatMap(expandProgrammeEntry)
        .filter((l) => !isCaveat(l));

      if (heading.startsWith("department")) departments.push(...items);
      if (heading.includes("programme")) programmes.push(...items);
    }

    return {
      name,
      officialType,
      description,
      departments: [...new Set(departments)],
      programmes: [...new Set(programmes)],
    };
  });
}

// A handful of universities (e.g. AAU) list programmes that couldn't be
// attributed to any specific college under a separate top-level section
// rather than inside "## Academic Units".
function parseUniversityWideProgrammes(body) {
  const section = body.split(/^## University-wide Programmes$/m)[1];
  if (!section) return null;
  const rest = section.split(/^## /m)[0];
  const programmes = rest
    .split("\n")
    .filter((l) => /^\s*-\s+/.test(l))
    .map((l) => l.replace(/^\s*-\s+/, "").trim())
    .filter((l) => !isCaveat(l))
    .flatMap(expandProgrammeEntry)
    .filter((l) => !isCaveat(l));

  if (programmes.length === 0) return null;
  return {
    name: "University-wide Programmes",
    officialType: null,
    description: null,
    departments: [],
    programmes: [...new Set(programmes)],
  };
}

function countProgrammes(units) {
  return units.reduce((sum, u) => sum + u.programmes.length, 0);
}

function countDepartments(units) {
  return units.reduce((sum, u) => sum + u.departments.length, 0);
}

// Some region values carry a parenthetical zone/note, e.g.
// "Amhara (East Gojjam Zone)" or "Oromia (mailing address: Dire Dawa)".
// Filter chips use just the leading region name (canonicalized for known
// wording variants — see taxonomy.mjs); the full string still displays on
// the university's own page.
function regionGroupOf(region) {
  return canonicalRegionGroup(region);
}

// Derives filter facets from the confirmed department/programme text of a
// university. This only groups already-confirmed names — see
// docs/04_CONTENT_SPEC.md ("Tagging & Facets").
function facetsOf(units) {
  const allText = units
    .flatMap((u) => [...u.departments, ...u.programmes])
    .join(" | ");

  const professions = matchProfessions(allText);
  const departments = matchDepartments(allText);
  const categories = categoriesForProfessions(professions);
  const degreeLevels = [
    ...new Set(
      units
        .flatMap((u) => u.programmes.map(extractDegreeLevel))
        .filter(Boolean)
    ),
  ];

  return { professions, departments, categories, degreeLevels };
}

function build() {
  const files = fs
    .readdirSync(INPUT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .sort();

  const universities = files.map((file) => {
    const raw = fs.readFileSync(path.join(INPUT_DIR, file), "utf8");
    const { data, content } = matter(raw);

    const units = parseAcademicUnits(content);
    const universityWide = parseUniversityWideProgrammes(content);
    if (universityWide) units.push(universityWide);

    return {
      slug: data.slug,
      name: data.name,
      alternateNames: data.alternateNames ?? [],
      officialWebsite: data.officialWebsite ?? null,
      institutionType: data.institutionType ?? null,
      city: data.mainLocation?.city ?? null,
      region: data.mainLocation?.region ?? null,
      regionGroup: regionGroupOf(data.mainLocation?.region ?? null),
      generation: data.generation ?? null,
      status: data.status ?? "needs_review",
      lastChecked: data.lastChecked ?? null,
      units,
      facets: facetsOf(units),
      stats: {
        unitCount: units.length,
        departmentCount: countDepartments(units),
        programmeCount: countProgrammes(units),
      },
    };
  });

  universities.sort((a, b) => a.name.localeCompare(b.name));

  const regionCount = new Set(universities.map((u) => u.regionGroup).filter(Boolean))
    .size;

  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(DATA_DIR, "universities.json"),
    JSON.stringify(universities, null, 2)
  );

  // Lightweight version for the landing page — omits the heavy `units` array
  // so the home page loads fast. Full data is fetched per-university on the
  // detail page.
  const lite = universities.map((u) => ({
    slug: u.slug,
    name: u.name,
    alternateNames: u.alternateNames,
    officialWebsite: u.officialWebsite,
    institutionType: u.institutionType,
    city: u.city,
    region: u.region,
    regionGroup: u.regionGroup,
    generation: u.generation,
    status: u.status,
    lastChecked: u.lastChecked,
    facets: u.facets,
    stats: u.stats,
  }));
  fs.writeFileSync(
    path.join(DATA_DIR, "universities-lite.json"),
    JSON.stringify(lite, null, 2)
  );

  console.log(
    `Built data for ${universities.length} universities (${regionCount} regions).`
  );
}

build();
