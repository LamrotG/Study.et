import Link from "next/link";
import type { UniversityLite } from "@/lib/data";
import { UniversityLogo } from "./UniversityLogo";

export function UniversityCard({ university }: { university: UniversityLite }) {
  const location = [university.city, university.regionGroup ?? university.region]
    .filter(Boolean)
    .join(", ");
  const institutionType = university.institutionType?.split("(")[0].trim();

  return (
    <Link
      href={`/university/${university.slug}`}
      className="group flex h-full flex-col gap-4 rounded-lg border border-line p-5 transition-colors hover:border-ink hover:bg-subtle"
    >
      <div className="flex items-start justify-between gap-2">
        <UniversityLogo
          slug={university.slug}
          name={university.name}
          className="h-10 w-10"
        />
        <span
          aria-hidden="true"
          className="text-muted transition-transform group-hover:translate-x-0.5"
        >
          →
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-[15px] leading-snug">{university.name}</h3>
        {location && <p className="mt-1 truncate text-sm text-muted">{location}</p>}
      </div>

      {(institutionType || university.stats.programmeCount > 0) && (
        <div className="flex flex-wrap gap-1.5">
          {institutionType && (
            <span className="rounded-full bg-subtle px-2 py-0.5 text-xs text-muted">
              {institutionType}
            </span>
          )}
          {university.stats.programmeCount > 0 && (
            <span className="rounded-full bg-subtle px-2 py-0.5 text-xs text-muted">
              {university.stats.programmeCount} programmes
            </span>
          )}
        </div>
      )}
    </Link>
  );
}