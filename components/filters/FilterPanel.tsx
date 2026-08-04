"use client";

import { useMemo } from "react";
import type { UniversityLite } from "@/lib/data";
import { FilterGroup, type FilterOption } from "./FilterGroup";

export type FilterState = {
  regions: string[];
  professions: string[];
  departments: string[];
  categories: string[];
  degreeLevels: string[];
};

export const EMPTY_FILTERS: FilterState = {
  regions: [],
  professions: [],
  departments: [],
  categories: [],
  degreeLevels: [],
};

function countOptions(
  universities: UniversityLite[],
  getValues: (u: UniversityLite) => string[]
): FilterOption[] {
  const counts = new Map<string, number>();
  for (const u of universities) {
    for (const value of new Set(getValues(u))) {
      counts.set(value, (counts.get(value) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([value, count]) => ({ value, label: value, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export function matchesFilters(u: UniversityLite, filters: FilterState): boolean {
  const { regions, professions, departments, categories, degreeLevels } = filters;

  if (regions.length > 0 && !(u.regionGroup && regions.includes(u.regionGroup)))
    return false;
  if (
    professions.length > 0 &&
    !professions.some((p) => u.facets.professions.includes(p))
  )
    return false;
  if (
    departments.length > 0 &&
    !departments.some((d) => u.facets.departments.includes(d))
  )
    return false;
  if (
    categories.length > 0 &&
    !categories.some((c) => u.facets.categories.includes(c))
  )
    return false;
  if (
    degreeLevels.length > 0 &&
    !degreeLevels.some((d) => u.facets.degreeLevels.includes(d))
  )
    return false;

  return true;
}

export function FilterPanel({
  universities,
  value,
  onChange,
}: {
  universities: UniversityLite[];
  value: FilterState;
  onChange: (next: FilterState) => void;
}) {
  const regionOptions = useMemo(
    () => countOptions(universities, (u) => (u.regionGroup ? [u.regionGroup] : [])),
    [universities]
  );
  const professionOptions = useMemo(
    () => countOptions(universities, (u) => u.facets.professions),
    [universities]
  );
  const departmentOptions = useMemo(
    () => countOptions(universities, (u) => u.facets.departments),
    [universities]
  );
  const categoryOptions = useMemo(
    () => countOptions(universities, (u) => u.facets.categories),
    [universities]
  );
  const degreeLevelOptions = useMemo(
    () => countOptions(universities, (u) => u.facets.degreeLevels),
    [universities]
  );

  const activeCount = Object.values(value).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  return (
    <div className="flex flex-wrap items-start gap-2">
      <FilterGroup
        title="Region"
        options={regionOptions}
        selected={value.regions}
        onChange={(regions) => onChange({ ...value, regions })}
      />
      <FilterGroup
        title="Profession"
        options={professionOptions}
        selected={value.professions}
        onChange={(professions) => onChange({ ...value, professions })}
      />
      <FilterGroup
        title="Department"
        options={departmentOptions}
        selected={value.departments}
        onChange={(departments) => onChange({ ...value, departments })}
      />
      <FilterGroup
        title="Field category"
        options={categoryOptions}
        selected={value.categories}
        onChange={(categories) => onChange({ ...value, categories })}
      />
      <FilterGroup
        title="Degree level"
        options={degreeLevelOptions}
        selected={value.degreeLevels}
        onChange={(degreeLevels) => onChange({ ...value, degreeLevels })}
      />
      {activeCount > 0 && (
        <button
          type="button"
          onClick={() => onChange(EMPTY_FILTERS)}
          className="self-center rounded-full border border-line px-3 py-1.5 text-xs text-muted underline-offset-2 hover:border-ink hover:text-ink"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
}