"use client";

import { useMemo, useState } from "react";
import type { University, UniversityLite } from "@/lib/data";
import { UniversityCard } from "@/components/university/UniversityCard";
import {
  FilterPanel,
  EMPTY_FILTERS,
  matchesFilters,
  type FilterState,
} from "@/components/filters/FilterPanel";

// Maps common profession terms to the department/facet labels they correspond to.
// e.g. searching "doctor" should match universities with a "Medicine" department.
const PROFESSION_KEYWORDS: Record<string, string[]> = {
  doctor: ["medicine", "medical"],
  nurse: ["nursing"],
  midwife: ["midwifery"],
  pharmacist: ["pharmacy"],
  dentist: ["dentistry", "dental"],
  architect: ["architecture"],
  engineer: ["engineering"],
  lawyer: ["law"],
  teacher: ["education"],
  accountant: ["accounting", "finance"],
  economist: ["economics"],
  psychologist: ["psychology"],
  sociologist: ["sociology"],
  veterinarian: ["veterinary"],
  agronomist: ["agriculture", "agronomy"],
  journalist: ["journalism", "communication"],
  artist: ["fine arts", "music", "theatre", "film"],
  geologist: ["geology"],
  chemist: ["chemistry"],
  physicist: ["physics"],
  biologist: ["biology"],
  mathematician: ["mathematics"],
  statistician: ["statistics"],
  programmer: ["computer science", "software engineering", "information technology"],
  developer: ["computer science", "software engineering", "information technology"],
  "software engineer": ["software engineering", "computer science"],
  "data scientist": ["data science", "statistics", "computer science"],
  "health officer": ["public health"],
  "lab technician": ["medical laboratory"],
  physiotherapist: ["physiotherapy"],
  optometrist: ["optometry"],
  radiographer: ["radiograph"],
  anesthetist: ["anesthesia"],
  "social worker": ["social work"],
  historian: ["history"],
  geographer: ["geography"],
  musician: ["music"],
  "civil servant": ["political science", "public administration"],
};

function matchesQuery(university: UniversityLite, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  // Search by university name, alternate names, city, region
  const basicHaystack = [
    university.name,
    ...university.alternateNames,
    university.city,
    university.region,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (basicHaystack.includes(q)) return true;

  // Search by department names
  const departmentNames = university.facets.departments.join(" ").toLowerCase();
  if (departmentNames.includes(q)) return true;

  // Search by profession names
  const professionNames = university.facets.professions.join(" ").toLowerCase();
  if (professionNames.includes(q)) return true;

  // Search by profession keyword mapping (e.g. "doctor" → Medicine)
  const mappedTerms = PROFESSION_KEYWORDS[q] ?? [];
  if (mappedTerms.length > 0) {
    const allFacetText = [
      ...university.facets.departments,
      ...university.facets.professions,
    ]
      .join(" ")
      .toLowerCase();
    if (mappedTerms.some((term) => allFacetText.includes(term))) return true;
  }

  return false;
}

const GRID_CLASSES = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

type PopularTab = "universities" | "programs" | "degrees";

type PopularProgram = {
  name: string;
  universitySlug: string;
  universityName: string;
};

type PopularDegree = {
  level: string;
  count: number;
};

export function UniversityExplorer({
  universities,
  popular,
}: {
  universities: UniversityLite[];
  popular?: University[];
}) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [popularTab, setPopularTab] = useState<PopularTab>("universities");

  const activeFilterCount = Object.values(filters).reduce(
    (sum, arr) => sum + arr.length,
    0
  );
  const isFiltering = query.trim().length > 0 || activeFilterCount > 0;

  const results = useMemo(
    () =>
      universities.filter(
        (u) => matchesQuery(u, query) && matchesFilters(u, filters)
      ),
    [universities, query, filters]
  );

  // Derive popular programs from the popular universities
  const popularPrograms = useMemo<PopularProgram[]>(() => {
    if (!popular) return [];
    const seen = new Set<string>();
    const programs: PopularProgram[] = [];
    for (const u of popular) {
      for (const unit of u.units) {
        for (const programme of unit.programmes) {
          const name = programme.split("—")[0].trim();
          if (!seen.has(name)) {
            seen.add(name);
            programs.push({
              name,
              universitySlug: u.slug,
              universityName: u.name,
            });
          }
        }
      }
    }
    return programs.slice(0, 12);
  }, [popular]);

  // Derive popular degrees from all universities
  const popularDegrees = useMemo<PopularDegree[]>(() => {
    const counts = new Map<string, number>();
    for (const u of universities) {
      for (const level of u.facets.degreeLevels) {
        counts.set(level, (counts.get(level) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .map(([level, count]) => ({ level, count }))
      .sort((a, b) => b.count - a.count);
  }, [universities]);

  return (
    <div className="flex flex-col gap-8">
      <div className="min-w-0">
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">
            ⌕
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search universities, departments, schools, or professions…"
            className="w-full rounded-lg border border-line py-3 pl-11 pr-4 text-[15px] outline-none placeholder:text-muted focus:border-ink"
          />
        </div>

        <div className="mt-4">
          <FilterPanel
            universities={universities}
            value={filters}
            onChange={setFilters}
          />
        </div>

        {!isFiltering && popular && popular.length > 0 && (
          <section className="mt-8">
            <h2 className="text-sm font-medium text-muted">Popular</h2>

            <div className="mt-3 flex gap-1 border-b border-line">
              {(
                [
                  { id: "universities", label: "Universities" },
                  { id: "programs", label: "Programs" },
                  { id: "degrees", label: "Degrees" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setPopularTab(tab.id)}
                  className={`-mb-px border-b-2 px-4 py-2 text-[13px] transition-colors ${
                    popularTab === tab.id
                      ? "border-ink font-medium text-ink"
                      : "border-transparent text-muted hover:text-ink"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-4">
              {popularTab === "universities" && (
                <div className={GRID_CLASSES}>
                  {popular.map((u) => (
                    <UniversityCard key={u.slug} university={u} />
                  ))}
                </div>
              )}

              {popularTab === "programs" && (
                <div className="flex flex-col gap-2">
                  {popularPrograms.map((p) => (
                    <a
                      key={`${p.universitySlug}-${p.name}`}
                      href={`/university/${p.universitySlug}`}
                      className="flex items-center justify-between gap-4 rounded-lg border border-line px-4 py-3 text-sm transition-colors hover:border-ink hover:bg-subtle"
                    >
                      <span className="font-medium">{p.name}</span>
                      <span className="truncate text-xs text-muted">
                        {p.universityName}
                      </span>
                    </a>
                  ))}
                </div>
              )}

              {popularTab === "degrees" && (
                <div className="flex flex-col gap-2">
                  {popularDegrees.map((d) => (
                    <div
                      key={d.level}
                      className="flex items-center justify-between rounded-lg border border-line px-4 py-3 text-sm"
                    >
                      <span className="font-medium">{d.level}</span>
                      <span className="text-xs text-muted">
                        {d.count} {d.count === 1 ? "university" : "universities"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        <section className="mt-8">
          <h2 className="mb-3 text-sm font-medium text-muted">
            {isFiltering
              ? `${results.length} ${results.length === 1 ? "result" : "results"}`
              : "All universities"}
          </h2>

          {results.length > 0 ? (
            <div className={GRID_CLASSES}>
              {results.map((u) => (
                <UniversityCard key={u.slug} university={u} />
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-muted">
              No universities match your search and filters.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}