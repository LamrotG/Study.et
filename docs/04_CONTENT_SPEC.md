# Study.et Handbook

# 04_CONTENT_SPEC.md

**Version:** 1.1.0  
**Status:** Draft  
**Owner:** Study.et  
**Audience:** Engineers, Research Contributors, AI Contributors  
**Related Documents:** 02_RULES.md, 03_ARCHITECTURE.md, 06_SEARCH_SPEC.md, 12_DATA_COLLECTION.md

---

# Purpose

This document defines how university content is structured, derived, and validated — from the raw research file through to the facets the website filters on.

---

# Content Philosophy

- Official sources first.
- One university = one MDX file.
- Content is independent from application code.
- Research and published content remain conceptually separate, even while they share a directory during the current phase (see 03_ARCHITECTURE.md — Content Pipeline).

---

# Directory Structure

```text
output/
  addis-ababa-university.mdx
  bahir-dar-university.mdx
  ...
templates/
  university-template.mdx
logs/
  extraction-log.md
  needs-review.md
```

Planned (not yet implemented — see 03_ARCHITECTURE.md):

```text
content/
  universities/
    addis-ababa-university/
      index.mdx
      cover.jpg
```

The application never reads `output/` directly today either way — it consumes the generated `web/data/*.json` produced by `web/scripts/build-data.mjs`. See 12_DATA_COLLECTION.md for the full research workflow used to produce and review the MDX files in `output/`.

---

# Frontmatter

Required:

- `name`
- `slug`
- `officialWebsite`
- `institutionType`
- `mainLocation` (`city`, `region`)
- `status`
- `lastChecked`

Optional:

- `alternateNames`
- `logo`
- `coverImage`
- `socials`

---

# Page Sections

1. Overview
2. Academic Units (with nested Departments / Programmes)
3. University-wide Programmes (used only when ownership cannot be confirmed)
4. Source Register
5. Data Notes

---

# Asset Rules

Images live beside the MDX file (once the `content/` layer exists). Use descriptive filenames (see 07_SEO.md — Images).

---

# Tagging & Facets

The website's filters (region, profession, department, category, degree level) are **derived facets**, computed at build time from the confirmed department/programme text already present in each MDX file. They are a search/filter convenience, not new factual claims about a university — nothing is added to a university's page that isn't already sourced.

## Region

`mainLocation.region` as written by the source is preserved and displayed on the university page unchanged. A separate `regionGroup` strips any parenthetical zone note (e.g. `"Amhara (East Gojjam Zone)"` → `"Amhara"`) for use as a filter chip, and canonicalizes known wording variants of the same official region (e.g. `"South-West Ethiopia Region"` and `"South West Ethiopia Peoples' Region"` are the same region described two different ways across sources, and are grouped together for filtering only).

## Profession, Category, Department

A keyword taxonomy (`web/scripts/taxonomy.mjs`) scans each university's confirmed department and programme names and tags the university with the broad fields it offers (e.g. "Engineering & Technology", "Medicine & Health Sciences"), a coarser Natural/Social category, and specific common department tags (e.g. "Computer Science", "Civil Engineering"). A university is only tagged with a facet if at least one of its confirmed items matches; nothing is inferred beyond grouping existing confirmed names.

## Degree Level

Programme entries already carry an explicit level suffix where the source states one (e.g. `"— Bachelor's"`, `"— Master's"`, `"— PhD"`). The build script extracts this into a `degreeLevels` facet per university. Programmes without an explicit level are not assigned one.

---

# Validation

Every page MUST:

- Have a unique slug.
- Link to an official website (or explain why it is missing).
- Include source references.
- Build without errors.

---

# Source Rules

Use official university sources whenever possible. Never fabricate or infer information beyond the facet grouping described above, which only reorganizes already-confirmed names.

---

# Review Workflow

Research → `output/` → review (status field + human check) → build (`web/scripts/build-data.mjs`) → publish.

See 12_DATA_COLLECTION.md for the detailed research and review workflow.

---

# Future Compatibility

Structure should support future migration to:

- A `content/` promotion layer (Phase 2, see 03_ARCHITECTURE.md)
- A database
- A CMS
- An AI knowledge base

---

# Revision Policy

Living document. Update this file whenever a new page section, frontmatter field, or facet is introduced.
