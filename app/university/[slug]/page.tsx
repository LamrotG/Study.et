import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllUniversities, getUniversityBySlug } from "@/lib/data";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AcademicUnitAccordion } from "@/components/university/AcademicUnitAccordion";
import { UniversityLogo } from "@/components/university/UniversityLogo";

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
    <main className="px-6 py-16 lg:px-[120px]">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Directory", href: "/directory" },
          { label: university.name },
        ]}
      />

      <div className="mt-6 flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-4">
          <UniversityLogo
            slug={university.slug}
            name={university.name}
            className="h-20 w-20"
          />
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {university.name}
            </h1>

            {university.alternateNames.length > 0 && (
              <p className="mt-1 text-sm text-muted">
                {university.alternateNames.join(" · ")}
              </p>
            )}

            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
              {location && <span>{location}</span>}
              {university.institutionType && <span>{university.institutionType}</span>}
            </div>
          </div>
        </div>

        {university.officialWebsite && (
          <a
            href={university.officialWebsite}
            target="_blank"
            rel="noreferrer noopener"
            className="shrink-0 text-sm underline underline-offset-2 hover:text-ink"
          >
            Official website ↗
          </a>
        )}
      </div>

      <hr className="mt-6 border-line" />

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