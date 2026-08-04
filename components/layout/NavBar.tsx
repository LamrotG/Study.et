import Link from "next/link";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="container-px mx-auto flex max-w-6xl items-center justify-between py-5">
        <Link href="/" className="text-[15px] font-medium tracking-tight">
          study<span className="text-muted">.et</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted">
          <Link href="/" className="hover:text-ink transition-colors">
            Search
          </Link>
          <Link href="/directory" className="hover:text-ink transition-colors">
            Directory
          </Link>
          <Link href="/about" className="hover:text-ink transition-colors">
            About
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
