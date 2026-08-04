# Study.et Handbook

# 01_PRODUCT.md

**Version:** 1.0.0  
**Status:** Living Document  
**Owner:** Study.et  
**Audience:** All contributors (Human & AI)


---

# Purpose

This document defines the product vision, goals, principles, and long-term direction of Study.et.

It answers one fundamental question:

> **What are we building, who are we building it for, and why does it matter?**

This document intentionally avoids implementation details. Technology choices, architecture, and engineering practices are documented elsewhere in the Study.et Handbook.

---

# Mission

Study.et exists to make discovering higher education opportunities in Ethiopia simple, trustworthy, and accessible.

By organizing verified information from official university sources into one modern, searchable platform, Study.et helps students make informed educational decisions with confidence.

---

# Vision

To become Ethiopia's most trusted higher education platform, empowering students to confidently explore universities, academic programs, and future career opportunities through accurate information and thoughtful technology.

Study.et should become the first place students visit when planning their academic future.

---

# Why Study.et Exists

Students rarely begin their university journey knowing the name of the institution they want to attend.

Instead, they begin with questions like:

- I want to become a doctor.
- I want to study software engineering.
- I want to become an architect.
- Which university should I apply to?
- What options do I have?

Unfortunately, the information needed to answer those questions is spread across dozens of university websites, each with different structures, terminology, and levels of detail.

Finding reliable information often requires visiting many websites, comparing inconsistent information, and understanding academic structures that are unfamiliar to students.

Study.et exists to remove that friction.

Rather than replacing official university websites, Study.et organizes verified information into one consistent, student-first experience that helps users discover opportunities before visiting official sources.

---

# The Problem

## Current Reality

Higher education information in Ethiopia is decentralized.

Every university maintains its own website.

While those websites contain valuable information, they differ significantly in:

- Navigation
- Structure
- Terminology
- Information quality
- Ease of use

Students are expected to understand these differences before they can even begin comparing universities.

That expectation creates unnecessary confusion.

---

# The Opportunity

Study.et creates a unified discovery experience.

Instead of asking students to understand university structures first, the platform organizes information around the questions students naturally ask.

Examples include:

- What universities exist?
- What can I study?
- Which universities offer this program?
- Where is this university located?
- What colleges and departments does it have?

The platform transforms fragmented information into a coherent knowledge system.

---

# Product Beliefs

The following beliefs guide every product decision.

## Students think about careers before universities.

Students usually know what they want to become before they know where they want to study.

The product should support that natural thought process.

---

## Discovery comes before comparison.

Students cannot compare universities they have not yet discovered.

Helping students discover opportunities is the platform's first responsibility.

---

## Trust matters more than quantity.

Publishing fewer pages with verified information is better than publishing many pages with uncertain information.

Accuracy always comes before completeness.

---

## Simplicity creates confidence.

Complex educational systems should be explained—not exposed.

Study.et should reduce complexity instead of transferring it to students.

---

## Official sources remain the source of truth.

Study.et organizes information.

It does not replace universities.

Users should always be able to continue to official university resources for authoritative details.

---

# Target Audience

## Primary Audience

### Grade 12 Students

Students preparing to apply for higher education in Ethiopia.

Needs:

- Discover universities
- Explore opportunities
- Understand academic offerings
- Make informed decisions

---

## Secondary Audience

### Parents

Helping students evaluate educational opportunities.

### Teachers & Counselors

Supporting students through career and university planning.

### International Students

Exploring higher education opportunities within Ethiopia.

### Researchers

Looking for structured information about Ethiopian universities.

---

# User Personas

## Hana — Grade 12 Student

"I want to become a doctor."

Hana knows her career goal but has no idea which universities offer medicine.

Study.et should help her discover possible universities and understand the next steps.

---

## Samuel — Future Engineer

Samuel searches for software engineering opportunities.

Rather than searching university websites individually, he wants one place where he can explore institutions offering his field of interest.

---

## Sara — International Student

Sara wants to study in Ethiopia.

She needs trustworthy information presented consistently in English.

Study.et becomes her entry point into Ethiopian higher education.

---

# User Journey

## Discover

The student arrives at Study.et.

They immediately understand what the platform offers.

---

## Search

The student searches for:

- University
- Program
- Department
- Career

Examples:

- doctor
- software engineering
- architecture
- Jimma University

---

## Explore

The student views:

- University overview
- Colleges
- Schools
- Departments
- Programs (where available)
- Contact information
- Official website

---

## Continue

When ready, the student continues to the official university website for admissions or further details.

Study.et supports discovery—it does not replace official processes.

---

# Product Principles

## Student First

Every feature should make life easier for students.

---

## Trust Through Accuracy

Verified information is always preferred over assumptions.

---

## Neutrality

Study.et should never rank universities or present promotional content.

Information should remain factual and balanced.

---

## Clarity

Reduce cognitive load.

Help students understand complex information.

---

## Longevity

Every product decision should support future growth without requiring major redesigns.

---

# Current Milestone

The first public release focuses on university discovery.

It includes:

- Homepage
- University Directory
- Search
- Popular Universities
- Filters
- University Detail Pages
- MDX-powered content
- Responsive design
- SEO foundation

The first release prioritizes quality over quantity.

Launching with a small number of well-researched universities is preferable to launching with incomplete information.

---

# Out of Scope

The following are intentionally excluded from the first release:

- User accounts
- Reviews
- University rankings
- Discussion forums
- Scholarship search
- AI assistant
- Admin dashboard
- Contributor portal

These features are planned for future milestones.

---

# Long-Term Product Direction

Study.et is intentionally designed to evolve beyond a university directory.

Future milestones include:

## Program Discovery

Students search directly for academic programs.

---

## Department Pages

Dedicated pages describing departments and related opportunities.

---

## Career Exploration

Students begin with careers rather than institutions.

The platform connects careers to academic pathways.

---

## AI Assistant

An AI assistant grounded entirely in Study.et's verified knowledge base.

Rather than answering from the open internet, it responds using curated institutional information.

---

## Contributor Workflow

Trusted contributors help improve and maintain university content.

---

## Administrative CMS

An editorial platform for managing content without modifying application code.

---

# Success Criteria

Study.et succeeds when students can confidently answer the following questions within minutes:

- What universities exist?
- What can I study?
- Where can I study it?
- Which universities offer my interests?
- Where can I find official information?

Success is measured by clarity, confidence, and trust—not by feature count.

---

# Non-Goals

Study.et is not:

- A university ranking platform
- A social network
- A review website
- A marketing platform
- A replacement for official university websites

Its purpose is discovery through trustworthy information.

---

# Relationship to the Handbook

This document defines **what** Study.et is.

The remaining handbook documents explain:

- **00_PROJECT_CHARTER.md** — Why the project exists.
- **02_RULES.md** — Engineering and contribution standards.
- **03_ARCHITECTURE.md** — Technical design.
- **08_ROADMAP.md** — Planned evolution.
- **ADR/** — Major architectural decisions.

Together, these documents form the Study.et Handbook.

---

# Revision Policy

This is a living document.

As the platform evolves, this document should be updated whenever the product vision, principles, or long-term direction changes.

Minor feature additions should not require updates unless they affect the core philosophy of Study.et.