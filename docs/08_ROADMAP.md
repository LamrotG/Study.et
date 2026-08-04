# Study.et Handbook

# 08_ROADMAP.md

**Version:** 1.0.0  
**Status:** Living Document  
**Owner:** Study.et  
**Audience:** Product, Engineering, Designers, Contributors  
**Related Documents:** All Handbook Documents

---

# Purpose

This document defines the long-term evolution of Study.et.

It serves as the strategic roadmap for the project, ensuring every new feature supports the platform's mission and long-term vision.

The roadmap is intentionally outcome-focused rather than feature-focused.

Study.et is not built by adding random features.

It evolves by solving progressively more important problems for students.

---

# North Star

> Help every student discover the right educational opportunity in Ethiopia through trustworthy, structured, and accessible information.

Every milestone should move the platform closer to this vision.

---

# Product Evolution

Study.et evolves through distinct phases.

Each phase builds upon the previous one without requiring major architectural rewrites.

---

# Phase 1 — University Directory

**Status:** Current

## Goal

Launch the first public version of Study.et with a strong, maintainable foundation.

## Deliverables

- Homepage
- University Directory
- University Detail Pages
- MDX Content System
- Search by University
- Basic Filters
- Responsive Design
- SEO Foundation
- Documentation Handbook

## Success Criteria

- Stable architecture
- Fast page loads
- Accurate university information
- Easy contributor workflow

---

# Phase 2 — Academic Discovery

## Goal

Allow students to search by academic interest rather than institution.

## Deliverables

- Program Pages
- Department Pages
- College Pages
- Search Programs
- Search Departments
- Program Tags
- Related Programs
- Related Universities

## Example

Student searches:

```
Software Engineering
```

Result:

```
Universities offering Software Engineering
```

---

# Phase 3 — Career Discovery

## Goal

Help students who know their career goals but not academic pathways.

## Deliverables

Career pages including:

- Doctor
- Software Engineer
- Architect
- Lawyer
- Civil Engineer
- Pharmacist

Each page explains:

- What the career is
- Required programs
- Universities offering those programs
- Related careers

Example

```
Doctor

↓

Medicine

↓

Universities

↓

Official Information
```

---

# Phase 4 — Intelligent Search

## Goal

Transform search into a discovery engine.

## Features

- Semantic Search
- Synonyms
- Intent Recognition
- Smart Suggestions
- Typo Correction
- Related Searches

Example

```
I want to become a pilot.
```

↓

Suggested academic pathways.

---

# Phase 5 — AI Study Advisor

## Goal

Introduce a trustworthy AI assistant grounded in verified Study.et content.

Unlike general-purpose AI, it answers only from curated institutional data.

Example

```
Which universities offer Architecture in Addis Ababa?
```

or

```
What is the difference between Computer Science and Software Engineering?
```

The assistant should always cite its sources where possible.

---

# Phase 6 — Contributor Platform

## Goal

Allow trusted contributors to improve Study.et.

## Features

- Contributor Dashboard
- Content Review Queue
- Editorial Workflow
- Version History
- Change Approval
- Content Validation

---

# Phase 7 — Admin Platform

## Goal

Reduce manual maintenance.

## Features

- CMS
- Content Editor
- University Manager
- Image Management
- Search Index Rebuild
- Publishing Workflow
- User Roles

---

# Phase 8 — Student Platform

## Long-Term Vision

Study.et becomes a personalized platform.

Potential features include:

- Saved Universities
- Saved Programs
- Compare Universities
- Compare Programs
- Personalized Recommendations
- Scholarship Tracking
- Admission Reminders

These features should only be introduced after the core information platform is mature.

---

# Future Opportunities

The following ideas are intentionally outside the current roadmap but may become future initiatives.

- Multilingual Support (English & Amharic)
- Interactive Campus Maps
- Student Stories
- Graduate Outcomes
- Scholarship Directory
- Exchange Programs
- Research Opportunities
- University Events
- Internship Listings

These ideas should be evaluated against the project's mission before implementation.

---

# Success Metrics

The success of Study.et is not measured by the number of pages or features.

Instead, it should be measured by outcomes such as:

- Students finding relevant universities faster.
- Increased discovery of lesser-known institutions.
- Growth in verified content.
- Faster search experiences.
- High-quality contributor participation.
- Strong organic search visibility.

---

# Guiding Principles

Every roadmap decision should satisfy the following questions:

- Does this help students?
- Does this strengthen trust?
- Does this fit the architecture?
- Can it be maintained long-term?
- Does it move us closer to the North Star?

If the answer is "No" to any of these questions, the feature should be reconsidered.

---

# Things We Will Not Build

Study.et is **not** intended to become:

- A university ranking website.
- A social network.
- A forum.
- A marketing platform.
- A repository of unverified information.

The platform should remain focused on trustworthy educational discovery.

---

# Revision Policy

This roadmap is a living document.

Features may move between phases as priorities evolve, but changes should always preserve the long-term vision of Study.et.

Major roadmap changes should be documented with an ADR when they significantly affect architecture or product direction.