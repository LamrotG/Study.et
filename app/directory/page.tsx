import type { Metadata } from "next";
import { getAllUniversitiesLite } from "@/lib/data";
import { UniversityExplorer } from "@/components/university/UniversityExplorer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Directory — study.et",
};

export default function DirectoryPage() {
  const universities = getAllUniversitiesLite();

  return (
    <main className="container-px mx-auto max-w-6xl py-16">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Directory" }]} />

      <h1 className="mt-4 text-2xl font-semibold tracking-tight">Directory</h1>
      <p className="mt-2 text-[15px] text-muted">
        All {universities.length} universities in the directory.
      </p>

      <div className="mt-8">
        <UniversityExplorer universities={universities} />
      </div>
    </main>
  );
}
