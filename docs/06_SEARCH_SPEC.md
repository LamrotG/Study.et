# Study.et Handbook

# 06_SEARCH_SPEC.md

**Version:** 1.0.0  
**Status:** Draft  
**Owner:** Study.et  
**Audience:** Engineers, Designers, Product Owners, AI Contributors  
**Related Documents:** 01_PRODUCT.md, 03_ARCHITECTURE.md, 04_CONTENT_SPEC.md, 07_SEO.md

---

# Purpose

This document defines how search behaves throughout Study.et.

Search is not simply a feature.

Search is the primary way students discover higher education opportunities.

Every search decision should help students answer one question:

> **"Where can I study what I want?"**

---

# North Star

Study.et should allow students to discover educational opportunities using the language they naturally think in.

Students should never be required to understand university structures before finding relevant information.

The search experience should bridge the gap between career goals and academic institutions.

---

# Search Philosophy

The search system follows five principles.

## 1. Discovery First

Search exists to help users discover opportunities they didn't know existed.

---

## 2. Trust Before Completeness

It is better to return fewer verified results than many uncertain ones.

---

## 3. Fast By Default

Search should feel instant.

Static content should produce static search indexes.

---

## 4. Forgiving

The system should tolerate:

- Different capitalization
- Minor spelling mistakes (future)
- Alternate university names
- Common abbreviations

---

## 5. Explain Results

Search should never confuse users.

If results are missing, explain why.

If refinement is needed, guide the user.

---

# Search Evolution

Search will evolve in phases.

---

# Phase 1 — University Discovery

Supported searches:

- University Name
- Alternate Names
- Common Abbreviations
- Region
- City
- Tags

Examples

```
Addis Ababa University

ASTU

Jimma

Hawassa

Private

Engineering
```

---

# Phase 2 — Academic Discovery

Search expands to include

- Colleges
- Schools
- Faculties
- Departments
- Programs

Example

```
Software Engineering

Medicine

Civil Engineering

Law

Business Administration
```

---

# Phase 3 — Career Discovery

Students search naturally.

Example

```
Doctor

Architect

Engineer

Pilot

Teacher
```

Instead of simply searching text,

Study.et understands the intent.

Example

```
Doctor

↓

Medicine

↓

Universities offering Medicine
```

---

# Phase 4 — AI Discovery

Future AI assistant powered entirely by verified Study.et content.

Examples

```
I want to become an architect.

Which universities should I consider?

What subjects are required?

Which universities are in Addis Ababa?
```

The AI should never invent information.

It only answers using verified institutional data.

---

# Search Pipeline

```
User Query
      │
      ▼
Normalize Input
      │
      ▼
Search Index
      │
      ▼
Ranking Engine
      │
      ▼
Apply Filters
      │
      ▼
Display Results
```

---

# Query Normalization

Before searching

Normalize

- Lowercase
- Remove duplicate spaces
- Trim whitespace
- Normalize punctuation

Future

- Spelling correction
- Synonym expansion
- Amharic normalization
- English ↔ Amharic mapping

---

# Search Index

The search index is generated during build.

Sources

```
content/universities/**/*.mdx
```

Never

```
output/
```

Research files are not application content.

---

# Indexed Fields

Every university contributes

## Required

- Name
- Slug
- Alternate Names
- Institution Type
- Region
- City
- Tags

---

## Future

- Colleges
- Schools
- Departments
- Programs
- Admission Requirements
- Social Links

---

# Ranking

Priority

1. Exact Match

```
Jimma University
```

---

2. Prefix Match

```
Jim...
```

---

3. Alternate Name

```
ASTU
```

↓

Adama Science and Technology University

---

4. Tag Match

```
Engineering
```

↓

Universities tagged Engineering

---

5. Partial Match

---

Popularity is never a ranking signal.

Study.et remains neutral.

---

# Filters

Filters refine results.

Supported

- Public
- Private
- Region
- Institution Type
- Academic Field

Future

- Degree Level
- Tuition
- Online Learning
- Language
- Campus Availability

---

# Search Suggestions

When typing

Display suggestions instantly.

Example

```
Add...

↓

Addis Ababa University

Addis Ababa Science & Technology University
```

Suggestions should prioritize exact prefixes.

---

# Empty States

Never display

```
0 Results
```

Instead

Explain.

Example

```
No universities matched "Doctor".

Try

Medicine

Health Sciences

Medical School
```

Always help users recover.

---

# Result Cards

Every result should contain

- Logo
- University Name
- Region
- Institution Type
- Short Description
- Relevant Tags

Optional

- Popular Badge

Never

- Rankings
- Scores
- Advertisements

---

# Performance

Search should feel instant.

Requirements

- Build-time index
- Client-side filtering
- Debounced input
- Small bundle size
- Lazy-loaded index if necessary

---

# Accessibility

Search must support

Keyboard Navigation

```
↑

↓

Enter

Escape
```

Screen Readers

Semantic Labels

Visible Focus

High Contrast

---

# Error Handling

If the index fails

Show

```
Search is temporarily unavailable.
```

Never

Crash.

---

# Analytics (Future)

Collect anonymous metrics only.

Examples

Most searched universities

Most searched programs

Common search failures

These metrics improve search quality.

Never collect personal educational profiles without consent.

---

# Non-Goals

Search will never

- Rank universities
- Recommend universities based on sponsorship
- Invent programs
- Guess missing information
- Hide official sources

---

# Implementation Notes

Claude Code MUST

- Generate the search index from published MDX content.
- Never consume the research `output/` directory directly.
- Keep search logic independent of UI components.
- Design the search API so it can later be backed by a database without changing the UI.
- Build search incrementally according to the roadmap.

---

# Future Evolution

Search is expected to become the core intelligence layer of Study.et.

Future capabilities include

- Semantic Search
- AI Conversations
- Career Guidance
- Personalized Discovery
- Program Comparison
- University Comparison
- Saved Searches
- Recommendation Engine

Every future enhancement must preserve the principles defined in this document.

---

# Revision Policy

This is a living document.

Any significant changes to search behavior, indexing, ranking, or user interaction must be reflected here before implementation.
