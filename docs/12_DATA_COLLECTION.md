# Study.et Handbook

# 12_DATA_COLLECTION.md

**Version:** 1.0.0  
**Status:** Living Document  
**Owner:** Study.et  
**Audience:** Research Contributors, AI Contributors  
**Related Documents:** 04_CONTENT_SPEC.md, 03_ARCHITECTURE.md

---

# Purpose

This document is the operating ruleset for **researching and writing university data** — the process that produces the files in `output/*.mdx`. It was the original content of the repository's root `CLAUDE.md` during Phase 1 data collection and is preserved here so the research workflow can be resumed at any time (new universities, re-verification, filling `needs_review` gaps) without being lost.

`CLAUDE.md` now covers day-to-day engineering on the `web/` application. Use **this** document whenever the active task is collecting, verifying, or correcting university data rather than building product features.

---

# Project purpose (research scope)

This part of the project builds a trusted, searchable dataset of Ethiopian universities for students who have completed the Ethiopian matric exam and are preparing to join university.

Students should be able to answer questions such as:

- Which Ethiopian universities offer Computer Science?
- Does a specific university have a department of Architecture?
- Which college or faculty contains a given department?
- What programmes and degree levels are offered at a university?
- Where can a student verify this information on the official university website?

The goal of this workflow is **high-quality structured data**, not the website itself. Accuracy, source traceability, and consistency are more important than collecting information quickly.

---

## Project structure

```text
/
├── CLAUDE.md              # engineering rules (product build phase)
├── docs/
│   └── 12_DATA_COLLECTION.md   # this document
├── universities.md        # input list of universities + official websites
├── output/
│   └── [university-slug].mdx
├── logs/
│   ├── extraction-log.md
│   └── needs-review.md
├── templates/
│   └── university-template.mdx
└── web/                    # the application (out of scope for this document)
```

### Input file

`universities.md` contains the universities and their official website to process:

```md
- Addis Ababa University | https://www.aau.edu.et/
- Bahir Dar University | https://www.bdu.edu.et/
```

### Output files

Create exactly one MDX file per university:

```text
output/addis-ababa-university.mdx
output/bahir-dar-university.mdx
```

Use lowercase URL-safe slugs separated by hyphens.

---

## Non-negotiable data rules

1. Use only the university's official website as a factual source.
2. Do not use ChatGPT knowledge, Wikipedia, social media, third-party directories, blog posts, search-result snippets, or assumptions as evidence.
3. Never invent, infer, merge, or "complete" a college, school, faculty, department, programme, degree level, campus, or contact detail.
4. If the official website is unclear, incomplete, broken, contradictory, inaccessible, or lacks the requested data:
   - preserve only confirmed facts;
   - mark the relevant section as `needs_review`;
   - write the issue to `logs/needs-review.md`.
5. Every meaningful item must include one or more exact official source URLs.
6. Do not treat a department as a programme, or a programme as a department.
7. Preserve the wording used by the university. Do not silently rename items for consistency.
8. Do not claim that a university "does not offer" something merely because it was not found. Use `not_confirmed` instead.
9. Do not overwrite an existing university file without reading it first. Preserve manually corrected information unless new official evidence clearly replaces it.
10. Collect data in batches of at most five universities. After each batch, report completed files, files needing review, and any blocked websites.

---

## What to collect

Collect only information that can be confirmed on official pages.

### Required data

For every university, attempt to collect:

- Official university name
- Official website URL
- Alternate/short name, if officially used
- Institution type, if stated: public, private, autonomous, etc.
- Main campus/city/region, other if explicitly stated
- Colleges, schools, faculties, institutes, or academic units
- Departments under each academic unit
- Academic programmes, where listed
- Degree level, only when explicitly stated:
  - Diploma
  - Bachelor's
  - Master's
  - PhD
  - Specialization
  - Other official label
- Campus/location of a specific unit or programme, if explicitly stated
- Source URLs
- Date checked
- Data-quality status

### Do not collect unless explicitly requested later

- Entrance requirements
- Cut-off points
- Fees
- Application deadlines
- Staff lists
- Student opinions
- Rankings
- Claims about programme quality
- Dormitory information
- Unverified phone numbers or social-media links

---

## Important terminology

University websites use different organizational structures. Preserve the source terminology.

Possible academic unit types include:

- College
- School
- Faculty
- Institute
- Academy
- Department
- Centre/Center
- Campus

Do not force every structure into "college."

Example hierarchy:

```text
University
  └── College of Natural and Computational Sciences
        └── Department of Computer Science
              └── BSc in Computer Science
```

Another university may use:

```text
University
  └── School of Computing
        └── Software Engineering Programme
```

Both are valid. Record what the official website actually states.

---

## Research workflow

For each university:

1. Read its entry in `universities.md`.
2. Visit the official domain listed there.
3. Look for academic information on pages such as:
   - Academics
   - Academic Programmes / Programs
   - Colleges
   - Schools
   - Faculties
   - Departments
   - Institutes
   - Undergraduate
   - Graduate Studies
   - Campuses
4. Follow relevant internal links on the official domain.
5. Prefer pages directly maintained by the university or the relevant college/school/department.
6. Extract only clearly supported information.
7. Create or update the university's MDX file using the required template.
8. Add all consulted source URLs to the file.
9. Record issues in `logs/needs-review.md`.
10. Add an entry to `logs/extraction-log.md`.

### Handling PDFs

Official PDFs may be used when they are hosted on the university's official domain and clearly identify the university.

- Record the direct PDF URL.
- Record its publication year/date if visible.
- Prefer newer official information when pages conflict.
- Do not extract information from scanned PDFs unless the text is sufficiently legible.
- If an old PDF conflicts with a newer webpage, retain the newer source and flag the conflict.

### Handling inaccessible sites

If a site cannot be accessed:

- Do not retry excessively.
- Do not use an unofficial replacement source.
- Create a minimal MDX file with `status: needs_review`.
- State the issue clearly in `logs/needs-review.md`.
- Continue with the next university.

---

## Required MDX format

Every university file must use this format.

```mdx
---
name: "Official University Name"
slug: "official-university-name"
officialWebsite: "https://www.example.edu.et/"
alternateNames: []
institutionType: null
mainLocation:
  city: null
  region: null
status: "complete"
lastChecked: "YYYY-MM-DD"
sourceCount: 0
---

# Official University Name

## Overview

- **Official website:** [https://www.example.edu.et/](https://www.example.edu.et/)
- **Institution type:** Not confirmed
- **Main location:** Not confirmed
- **Data status:** Complete

## Academic Units

### College / School / Faculty Name

**Official unit type:** College  
**Source:** [Official unit page](https://www.example.edu.et/example)

#### Departments

- Department of Example
- Department of Another Example

#### Programmes

- BSc in Example — Bachelor's
- MSc in Another Example — Master's

### Another Academic Unit

**Official unit type:** School  
**Source:** [Official school page](https://www.example.edu.et/example-school)

#### Departments

- No departments confirmed from the official source.

#### Programmes

- No programmes confirmed from the official source.

## Source Register

1. [University academic page](https://www.example.edu.et/academics/) — accessed YYYY-MM-DD
2. [College page](https://www.example.edu.et/college/) — accessed YYYY-MM-DD
3. [Department page](https://www.example.edu.et/department/) — accessed YYYY-MM-DD

## Data Notes

- Only officially confirmed information is included.
- [Add a note only when clarification, uncertainty, or a conflict exists.]
```

### Status values

Use only one of these values:

- `complete` — Academic structure was found and recorded with sources.
- `partial` — Some confirmed data was found, but important sections were unavailable.
- `needs_review` — A material uncertainty, conflict, inaccessible site, or unclear structure needs a human check.
- `not_started` — Reserved for files intentionally created before research begins.

Do not use `complete` simply because a file exists.

---

## Source requirements

A source is valid only if it is:

- On the official university domain; or
- An official document hosted by the university; or
- An official subdomain belonging to that university.

For each academic unit, use the most direct page available.

Good:

```md
**Source:** [College of Engineering](https://university.edu.et/college-of-engineering/)
```

Not sufficient:

```md
**Source:** University website
```

Not sufficient:

```md
**Source:** Google search result
```

When one source supports multiple departments, cite it once at the academic-unit level. If a department has its own page, include its source in a note or source register.

---

## Normalization rules

Keep the official name in the main record.

Examples:

- Keep: `College of Natural and Computational Sciences`
- Keep: `Faculty of Technology`
- Keep: `School of Medicine`

Do not rewrite these as one generic label.

For search friendliness, you may add aliases only when they are obvious formatting variants, not different meanings:

```md
aliases:
  - "Computer Science"
  - "Computer science"
```

Do not add aliases for programmes that are merely similar.

Examples:

- `Computer Science` is not automatically the same as `Information Technology`.
- `Software Engineering` is not automatically the same as `Computer Science`.
- `Civil Engineering` is not automatically the same as `Construction Technology`.

---

## Quality checks before marking a file complete

Before setting `status: complete`, confirm:

- The university name and official website are correct.
- Every listed college/school/faculty has an official source URL.
- Every listed department/programme is visibly supported by an official source.
- No details were guessed or copied from a non-official site.
- Terminology from the official site was preserved.
- The MDX front matter is valid.
- The slug is unique.
- The source register contains all important pages used.
- The `lastChecked` date is correct.
- The file has no placeholder text.

If any check fails, use `partial` or `needs_review`.

---

## Logging format

### `logs/extraction-log.md`

Append an entry after each university:

```md
## YYYY-MM-DD — Official University Name

- Output file: `output/university-slug.mdx`
- Status: complete
- Official website: https://www.example.edu.et/
- Academic units found: 6
- Departments found: 24
- Programmes found: 12
- Notes: No material issues found.
```

### `logs/needs-review.md`

Append an entry whenever human verification is needed:

```md
## Official University Name

- Output file: `output/university-slug.mdx`
- Issue: The university site lists programmes but does not show which college or department owns them.
- Relevant source: https://www.example.edu.et/programmes/
- Recommended human action: Check the latest academic catalogue or contact the university registrar.
```

---

## Working behavior

- Start with the first unprocessed university in `universities.md`.
- Work in batches of five or fewer.
- Do not skip a university silently.
- Do not spend excessive time on one broken website.
- Do not make unrelated changes to project files.
- Do not delete existing output files or logs.
- Do not add database credentials, API keys, or secret values to this repository.
- Do not build the frontend or database integration unless explicitly asked.
- At the end of each batch, provide a concise report with:
  - processed universities;
  - completed files;
  - partial or review-needed files;
  - source/access problems;
  - recommended next action.

## Definition of success

Success is a consistent, source-backed dataset that a student can trust.

A smaller dataset with verified official sources is better than a large dataset containing assumptions or invented information.

---

## Additional safety and consistency rules

### Scope control

- This is a **university academic-directory dataset**, not a general encyclopedia.
- Record only current academic offerings that are supported by an official source.
- Do not add admissions advice, career advice, rankings, opinions, or claims about quality.
- Do not include a programme merely because it appears in a news post about an event, graduation, or past intake.
- Prefer dedicated academic-unit, programme, or catalogue pages over news posts.

### Current versus historical information

- Prefer pages that appear current or have a recent publication/update date.
- If an official page clearly states an item is discontinued, historical, proposed, planned, or "coming soon," do not include it as an active offering.
- If current and older official sources conflict:
  1. prefer the source with the clearer and more recent date;
  2. preserve the conflict in `Data Notes`;
  3. set status to `needs_review` when the conflict affects student decisions.
- Never remove previously collected data solely because a page is temporarily unavailable.

### Duplicate prevention

- Before creating a university file, check whether a matching university already exists in `output/`.
- Before adding a college, department, or programme, check whether it already appears elsewhere in that university's file under a different spelling.
- Keep one canonical item name and list clear spelling variants as aliases only.
- Do not create duplicate records for:
  - `Computer Science Department`
  - `Department of Computer Science`
- If the official site uses both forms, use the clearest official heading and note the variant if helpful.

### Programme ownership

- Do not assume a programme belongs to a department merely because the names look related.
- When programme ownership is not explicitly stated, list it under the academic unit where it was found and add this note:

```md
- Programme-to-department ownership was not explicitly confirmed by the official source.
```

- If a programme is listed only at university level, create a `University-wide Programmes` section rather than guessing its college or department.

### Search-friendly data

The future website will need students to search by both official names and common names.

For each confirmed item, you may add a small alias list only for clear variations:

```md
aliases:
  - "CS"
  - "Computer science"
```

Allowed aliases:

- Capitalization differences
- Singular/plural differences
- Common abbreviation clearly used by the university
- Official alternate names

Not allowed:

- Invented synonyms
- Programme equivalencies
- Translations that are not confirmed
- Claims that one programme is "similar to" another

### Language handling

- Keep the official name exactly as published.
- If the official source provides both Amharic and English names, retain both where practical.
- Do not translate academic names yourself unless the English translation appears on the official site.
- Preserve Ethiopian place names as written by the university.

### Website access and browsing behavior

- Respect website terms, robots.txt instructions, and normal rate limits.
- Visit pages at a measured pace; do not send rapid repeated requests.
- Stay on official university domains and their official subdomains.
- Search engines may be used only to discover official pages, never as a factual source.
- Do not bypass login screens, CAPTCHAs, paywalls, access controls, or anti-bot protections.
- Do not use leaked, cached, or archived unofficial copies as evidence.
- If an academic page uses JavaScript and cannot be read reliably, mark it for review instead of guessing its content.

### Data integrity

- Keep all MDX front matter valid.
- Use ISO date format only: `YYYY-MM-DD`.
- All URLs must start with `https://` where available.
- Remove tracking parameters from source URLs when possible.
- Never leave placeholder values such as `TBD`, `example`, `unknown`, or `lorem ipsum` in a completed file.
- Use `null`, an empty list `[]`, or `Not confirmed` according to the existing template.
- Ensure every source URL is clickable and points to the exact page used.

### Minimum evidence threshold

Do not list an academic item unless at least one official source clearly supports it.

For a university to be `complete`:

- Its academic-unit structure has been checked.
- Each listed unit has an official source.
- The relevant academic pages were reviewed.
- Any major gaps or contradictions are recorded.

If only a homepage or a partial list was found, use `partial`, not `complete`.

### Human-review triggers

Set `status: needs_review` when any of these happen:

- The official site gives contradictory department/programme lists.
- A programme is mentioned but its status is unclear.
- A site lists a college but no departments can be confirmed.
- Academic content is only available in an unreadable scan.
- A university has multiple campuses and the programme location is unclear.
- The source appears older than the current academic structure.
- A university has changed name, merged, split, or has ambiguous branding.
- The site is unavailable, blocked, or incomplete.

### Editing discipline

- Do not change another university's file while researching the current university unless explicitly asked.
- Do not reformat unrelated files.
- Do not delete output, logs, or source information.
- When correcting an existing record, add a brief `Data Notes` explanation with the official source and check date.
- Make small, reviewable changes rather than rewriting all files in one pass.

### Final batch validation

After each batch, check:

- No two output files have the same slug.
- All processed universities have an entry in the extraction log.
- Every `complete` or `partial` file has at least one official source.
- All `needs_review` files have a reason and recommended human action.
- No file includes facts from non-official sources.
- No university was silently skipped.
