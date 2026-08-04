import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllUniversities, getUniversityBySlug } from "@/lib/data";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AcademicUnitAccordion } from "@/components/university/AcademicUnitAccordion";

export function generateStaticParams() {
  return getAllUniversities().map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const university = getUniversityBySlug(slug);
  return { title: university ? `${university.name} — study.et` : "study.et" };
}

export default async function UniversityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const university = getUniversityBySlug(slug);

  if (!university) notFound();

  const location = [university.city, university.region]
    .filter(Boolean)
    .join(", ");

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Directory", href: "/directory" },
          { label: university.name },
        ]}
      />

      <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
        {university.name}
      </h1>

      {university.alternateNames.length > 0 && (
        <p className="mt-1 text-sm text-muted">
          {university.alternateNames.join(" · ")}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
        {location && <span>{location}</span>}
        {university.institutionType && <span>{university.institutionType}</span>}
        {university.officialWebsite && (
          <a
            href={university.officialWebsite}
            target="_blank"
            rel="noreferrer noopener"
            className="underline underline-offset-2 hover:text-ink"
          >
            Official website ↗
          </a>
        )}
      </div>

      <div className="mt-10">
        {university.units.length > 0 ? (
          <AcademicUnitAccordion units={university.units} />
        ) : (
          <p className="text-sm text-muted">
            No academic units confirmed for this university yet.
          </p>
        )}
      </div>
    </main>
  );
}
