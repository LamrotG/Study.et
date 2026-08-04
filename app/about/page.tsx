import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "About — study.et",
};

export default function AboutPage() {
  return (
    <main className="container-px mx-auto max-w-2xl py-16">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">About</h1>
      <div className="mt-6 flex flex-col gap-4 text-[15px] leading-relaxed text-muted">
        <p>
          study.et is a directory of Ethiopian universities: their colleges,
          departments, and academic programmes.
        </p>
        <p>
          Data is collected from each university&apos;s official website.
          Where a source was unclear, incomplete, or unreachable, the
          affected section is left out rather than guessed.
        </p>
        <p>
          This is an early version. Coverage and accuracy will improve over
          time.
        </p>
      </div>
    </main>
  );
}
