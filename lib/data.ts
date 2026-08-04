import universities from "@/data/universities.json";
import universitiesLite from "@/data/universities-lite.json";

export type AcademicUnit = {
  name: string;
  officialType: string | null;
  /**
   * A short (1-2 line) official description of the unit. Only ever set from
   * a confirmed official source — most units don't have one yet (this is a
   * data-collection gap, not a UI bug), and the UI must not fabricate one.
   */
  description: string | null;
  departments: string[];
  programmes: string[];
};

export type Facets = {
  professions: string[];
  departments: string[];
  categories: string[];
  degreeLevels: string[];
};

export type University = {
  slug: string;
  name: string;
  alternateNames: string[];
  officialWebsite: string | null;
  institutionType: string | null;
  city: string | null;
  region: string | null;
  regionGroup: string | null;
  /** Only set when a university's own official site explicitly states its generation (see docs/04_CONTENT_SPEC.md). */
  generation: string | null;
  status: string;
  lastChecked: string | null;
  units: AcademicUnit[];
  facets: Facets;
  stats: {
    unitCount: number;
    departmentCount: number;
    programmeCount: number;
  };
};

export const POPULAR_SLUGS = [
  "addis-ababa-university",
  "adama-science-and-technology-university",
  "bahir-dar-university",
  "haramaya-university",
  "mekelle-university",
  "jimma-university",
];

export function getAllUniversities(): University[] {
  return universities as University[];
}

export type UniversityLite = Omit<University, "units">;

export function getAllUniversitiesLite(): UniversityLite[] {
  return universitiesLite as UniversityLite[];
}

export function getUniversityBySlug(slug: string): University | undefined {
  return getAllUniversities().find((u) => u.slug === slug);
}

export function getPopularUniversities(): University[] {
  const all = getAllUniversities();
  return POPULAR_SLUGS.map((slug) => all.find((u) => u.slug === slug)).filter(
    (u): u is University => Boolean(u)
  );
}
