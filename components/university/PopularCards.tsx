"use client";

import Link from "next/link";

function initials(name: string) {
  return name
    .split(" ")
    .filter((w) => w[0] === w[0]?.toUpperCase())
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

export type PopularProgram = {
  name: string;
  universityCount: number;
  exampleUniversitySlug: string;
  exampleUniversityName: string;
};

export type PopularDegree = {
  level: string;
  count: number;
};

export function ProgramCard({ program }: { program: PopularProgram }) {
  return (
    <Link
      href={`/university/${program.exampleUniversitySlug}`}
      className="group flex items-center gap-4 rounded-lg border border-line p-4 transition-colors hover:border-ink hover:bg-subtle"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-line text-xs text-muted">
        {initials(program.name)}
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-[15px] leading-snug">{program.name}</h3>
        <p className="mt-0.5 truncate text-sm text-muted">
          {program.exampleUniversityName}
        </p>
      </div>
      <span className="shrink-0 rounded-full bg-subtle px-2 py-0.5 text-xs text-muted">
        {program.universityCount}{" "}
        {program.universityCount === 1 ? "university" : "universities"}
      </span>
      <span
        aria-hidden="true"
        className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5"
      >
        →
      </span>
    </Link>
  );
}

export function DegreeCard({ degree }: { degree: PopularDegree }) {
  return (
    <div className="group flex items-center gap-4 rounded-lg border border-line p-4 transition-colors hover:border-ink hover:bg-subtle">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-line text-xs text-muted">
        {initials(degree.level)}
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-[15px] leading-snug">{degree.level}</h3>
      </div>
      <span className="shrink-0 rounded-full bg-subtle px-2 py-0.5 text-xs text-muted">
        {degree.count} {degree.count === 1 ? "university" : "universities"}
      </span>
    </div>
  );
}