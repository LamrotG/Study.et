# Study.et Handbook

# 10_DECISIONS.md

**Version:** 1.0.0
**Status:** Living Document
**Owner:** Study.et
**Audience:** Product, Engineering, Designers, Contributors

Related Documents

- ADR/
- 00_PROJECT_CHARTER.md
- 01_PRODUCT.md
- 02_RULES.md
- 03_ARCHITECTURE.md

---

# Purpose

This document records the major product, engineering, and architectural decisions made throughout the lifetime of Study.et.

Unlike ADRs, this document is an index.

It provides a chronological overview of the project's evolution while linking to the detailed rationale stored in Architecture Decision Records.

Every significant decision should appear here.

---

# Decision Status

Each decision should have one of the following states.

| Status | Meaning |
|---------|---------|
| Proposed | Under discussion |
| Accepted | Approved and implemented |
| Superseded | Replaced by a newer decision |
| Deprecated | No longer recommended |
| Rejected | Evaluated but intentionally declined |

---

# Product Decisions

---

## DEC-001

**Title**

Study.et focuses on discovery rather than university rankings.

**Status**

Accepted

**Reason**

Students need trustworthy information, not popularity contests.

Related

- 01_PRODUCT.md

---

## DEC-002

**Title**

Official university sources are the source of truth.

**Status**

Accepted

**Reason**

Accuracy builds trust.

Related

- 04_CONTENT_SPEC.md

---

## DEC-003

**Title**

Search is the primary navigation experience.

**Status**

Accepted

Related

- 06_SEARCH_SPEC.md

---

# Architecture Decisions

---

## DEC-004

**Title**

University content is stored as MDX.

**Status**

Accepted

Reason

Supports static generation, Git versioning, easy contributions, and future migration.

Related

- ADR-001
- 03_ARCHITECTURE.md

---

## DEC-005

**Title**

Research remains separate from application content.

**Status**

Accepted

Reason

Prevents incomplete research from reaching production.

Related

- 03_ARCHITECTURE.md
- 04_CONTENT_SPEC.md

---

## DEC-006

**Title**

Static-first architecture.

**Status**

Accepted

Reason

Fast performance and lower operational complexity.

Related

- ADR-002

---

# Design Decisions

---

## DEC-007

Study.et adopts a neutral visual identity.

Reason

Universities already have their own branding.

The platform should remain impartial.

Related

- 05_DESIGN_SYSTEM.md

---

## DEC-008

Typography prioritizes readability over decoration.

Status

Accepted

---

## DEC-009

Whitespace is treated as part of the interface.

Status

Accepted

---

# Search Decisions

---

## DEC-010

Search should understand student intent before university structure.

Status

Accepted

Future phases expand from universities to careers.

Related

- 06_SEARCH_SPEC.md

---

## DEC-011

Popularity is never a ranking signal.

Status

Accepted

Reason

Study.et remains neutral.

---

# SEO Decisions

---

## DEC-012

Metadata is generated automatically.

Status

Accepted

---

## DEC-013

Canonical URLs are mandatory.

Status

Accepted

---

# AI Decisions

---

## DEC-014

AI only answers using verified Study.et content.

Status

Accepted

Reason

Trust is more important than creativity.

---

# Documentation Decisions

---

## DEC-015

Documentation precedes implementation for major architectural work.

Status

Accepted

---

## DEC-016

Every major architectural change requires an ADR.

Status

Accepted

---

# Future Decisions

Reserved for future milestones.

Examples

- Database Migration
- CMS Introduction
- Authentication
- AI Assistant
- Mobile Application

---

# Adding a Decision

When making a significant decision:

1. Create an ADR if necessary.
2. Add an entry to this document.
3. Update any affected handbook documents.
4. Reference the decision in related pull requests.

---

# Revision Policy

This document is a living index.

Entries should never be deleted.

If a decision changes, mark the old decision as **Superseded** and add a new one.

This preserves the historical evolution of Study.et.