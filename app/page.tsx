import { getAllUniversitiesLite, getPopularUniversities } from "@/lib/data";
import { UniversityExplorer } from "@/components/university/UniversityExplorer";

export default function HomePage() {
  const universities = getAllUniversitiesLite();
  const popular = getPopularUniversities();

  return (
    <main className="container-px mx-auto max-w-6xl py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Find Ethiopian Universities
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[15px] text-muted">
          Search by university, city, or region. See the colleges, departments,
          and programmes each one offers.
        </p>
      </div>

      <div className="mt-10">
        <UniversityExplorer universities={universities} popular={popular} />
      </div>
    </main>
  );
}