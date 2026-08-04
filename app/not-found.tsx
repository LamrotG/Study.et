import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Not found</h1>
      <p className="mt-2 text-[15px] text-muted">
        That page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block text-sm underline underline-offset-2 hover:text-ink"
      >
        Back to search
      </Link>
    </main>
  );
}
