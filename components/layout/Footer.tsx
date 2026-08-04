export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="container-px mx-auto max-w-6xl py-8 text-center text-sm text-muted">
        © {year} Study.et. All rights reserved.
      </div>
    </footer>
  );
}
