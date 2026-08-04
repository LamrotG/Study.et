# Study.et Handbook

# 03_ARCHITECTURE.md

**Version:** 1.1.0  
**Status:** Draft  
**Owner:** Study.et  
**Audience:** Engineers, AI Contributors  
**Related Documents:** 02_RULES.md, 04_CONTENT_SPEC.md, 08_ROADMAP.md, adr/

---

# Purpose

This document defines the technical architecture of Study.et: how the application is layered, how content flows from research into the published site, and which conventions keep the codebase predictable as it grows.

---

# Principles

- **Content-first** — the product is the information, not the interface.
- **Static-first** — prefer build-time generation over runtime computation.
- **Separation of concerns** — presentation, domain logic, and content stay in distinct layers.
- **Predictable conventions** — a new contributor should be able to guess where something lives.
- **Future-proof** — today's structure should not block tomorrow's database, CMS, or AI layer.

---

# Layers

1. **Presentation** — Next.js App Router (`web/app`, `web/components`).
2. **Domain logic** — data access and shaping (`web/lib`).
3. **Content** — per-university source of truth (currently `output/*.mdx`, see "Content Pipeline" below).
4. **Infrastructure** — build tooling, static generation, deployment.

---

# Repository Structure

```text
/                        # research + documentation workspace
├── CLAUDE.md            # operating rules for this repo
├── docs/                 # the handbook (this document and its siblings)
├── adr/                  # architecture decision records
├── universities.md       # input list for the research pipeline
├── templates/            # MDX template for new university research
├── output/               # researched university MDX files (source of truth)
├── logs/                 # extraction log + needs-review log
└── web/                  # the Next.js application (see below)

web/
├── app/                  # routes (App Router)
├── components/           # UI components, grouped by domain
│   ├── layout/            # NavBar, Footer, Breadcrumbs
│   ├── university/        # UniversityCard, UniversityExplorer, detail-page pieces
│   └── filters/           # FilterGroup, FilterPanel
├── lib/                  # data access + taxonomy (business logic)
├── data/                 # generated JSON (universities.json) — committed
└── scripts/              # build-data.mjs and its taxonomy helper
```

---

# Content Pipeline

## Current implementation

```text
output/*.mdx  →  web/scripts/build-data.mjs  →  web/data/*.json  →  application (web/lib/data.ts)
```

`web/scripts/build-data.mjs` parses every file in `output/`, extracts frontmatter and academic units, computes derived facets (region grouping, degree levels, profession/department/category tags — see 04_CONTENT_SPEC.md), and writes the result to `web/data/universities.json`. This runs automatically via `predev`/`prebuild` and the output is also committed, so the site works even without re-running the script.

The application (`web/lib/data.ts` and everything above it) only ever imports from `web/data/*.json`. It never reads `output/` directly.

## Planned evolution

`04_CONTENT_SPEC.md` describes a target model where reviewed research is promoted into a dedicated `content/universities/<slug>/index.mdx` before it reaches the build. That promotion step (`output/` → review → `content/`) does not exist yet — today, `build-data.mjs` reads `output/` directly and the "review" step is the `status` field (`complete` / `partial` / `needs_review`) plus manual review of the diff.

This is an intentional interim simplification while the dataset is small (~44 universities) and still under active research. Introducing the `content/` promotion layer is tracked as a Phase 2 follow-up (see 08_ROADMAP.md) and requires an ADR before implementation, per the Architecture Rules in 02_RULES.md — it should not be done incidentally alongside unrelated feature work.

---

# Routing

```text
/                          Home — search + directory
/directory                 Full directory (same explorer, no hero copy)
/university/[slug]         University detail page
/about                     About page
```

Planned:

```text
/programs/[slug]
/departments/[slug]
```

Routes and their params are stable and predictable; a slug maps 1:1 to a university for the lifetime of the project (see 11_GLOSSARY.md — Slug).

---

# Search

Client-side filtering over a build-time-generated dataset (`web/data/universities.json`). See 06_SEARCH_SPEC.md for the full search philosophy and evolution phases.

---

# Filters

Filters are metadata-driven only — they operate on facets computed at build time (region, profession, department, category, degree level), never on free-text matching. See 04_CONTENT_SPEC.md ("Tagging & Facets") for how facets are derived.

---

# Components

Reusable, composable, with business logic kept in `web/lib/`, not inside components. Components are grouped by domain (`layout/`, `university/`, `filters/`) rather than left flat, so the folder scales past a handful of files without becoming a junk drawer.

---

# Accessibility

Semantic HTML, full keyboard support, visible focus states, meaningful alt text. See 05_DESIGN_SYSTEM.md for the complete accessibility requirements.

---

# Performance

Static generation (`generateStaticParams` for university pages), optimized images, minimal client-side JavaScript. Interactive pieces (search, filters, accordions, tabs) are client components; everything else stays a server component.

---

# SEO

Metadata, Open Graph, canonical URLs, and JSON-LD are generated per page. See 07_SEO.md.

---

# Future

Admin CMS, database-backed content, an AI knowledge layer, and a contributor workflow are all planned (see 08_ROADMAP.md) and are explicitly designed for, not built yet.

---

# ADRs

Major architectural changes require an ADR before implementation (see `adr/README.md`). This includes: introducing a database, changing the content pipeline, replacing the rendering strategy, or restructuring routing.

---

# Revision Policy

This is a living document. Whenever the actual implementation diverges from what is written here, update this document rather than letting it drift — an inaccurate architecture doc is worse than none.
