# Study.et Handbook

# 02_RULES.md

**Version:** 1.0.0  
**Status:** Draft  
**Owner:** Study.et  
**Audience:** All Contributors (Human & AI)  
**Related Documents:** 00_PROJECT_CHARTER.md, 01_PRODUCT.md, 03_ARCHITECTURE.md

---

# Purpose

This document defines the operating principles of Study.et. It is the constitution of the project and applies to every contributor, whether human or AI.

The goal of these rules is not to restrict creativity but to ensure every decision moves the project toward its North Star: helping students discover and understand higher education opportunities in Ethiopia.

---

# Core Philosophy

Technology exists to serve the product.

The product exists to serve students.

Every technical, design, or content decision MUST ultimately improve the student experience.

---

# Guiding Principles

- Students first.
- Trust over completeness.
- Clarity over cleverness.
- Consistency over novelty.
- Documentation before implementation.
- Build for longevity.
- Prefer reversible decisions.
- Keep the system understandable.

---

# Decision Framework

Before implementing anything, ask:

1. Does this improve the student experience?
2. Does it align with the Product Vision?
3. Does it fit the architecture?
4. Is it maintainable?
5. Can another contributor understand it in six months?

If any answer is "No", reconsider the solution.

---

# Product Rules

- Build features that solve real student problems.
- Avoid feature creep.
- Never build promotional experiences.
- Never rank or recommend universities.
- Keep the experience neutral and trustworthy.
- Discovery always comes before comparison.
- Official sources remain the source of truth.

---

# Engineering Rules

## General

- Use TypeScript strict mode.
- Prefer server rendering and static generation where appropriate.
- Separate business logic from presentation.
- Prefer composition over duplication.
- Avoid premature optimization.

## Code Quality

- Small, focused components.
- Descriptive naming.
- No dead code.
- No unnecessary abstractions.
- Handle loading, empty, and error states.
- Accessibility is mandatory.

## Dependencies

A dependency SHOULD only be introduced if it clearly reduces maintenance or solves a meaningful problem that cannot be addressed by existing project tools.

---

# Architecture Rules

- Content MUST remain independent from application code.
- One university equals one MDX file.
- Routing should be predictable.
- Components should be reusable.
- Architecture changes require documentation.
- Major architectural changes require an ADR.

---

# Content Rules

- Use official university sources whenever possible.
- Never fabricate information.
- Never silently infer missing data.
- Preserve uncertainty honestly.
- Research and published content remain separate.
- Every university page should be independently maintainable.

---

# Design Rules

Study.et should feel like a modern academic library.

Design MUST be:

- Calm
- Neutral
- Accessible
- Content-first

Avoid:

- Heavy gradients
- Decorative animation
- Marketing sections
- Visual clutter

Whitespace and typography should create hierarchy.

---

# Documentation Rules

- Documentation is part of the product.
- Every major decision should be documented.
- Keep handbook files synchronized with implementation.
- Explain why, not only what.
- Record architectural decisions as ADRs.

---

# Git & GitHub Rules

- One feature per branch.
- Small pull requests.
- Meaningful commit messages.
- Review before merge.
- Never mix unrelated changes.
- Keep commit history understandable.

---

# Claude Code Rules

Claude Code MUST:

- Read the handbook before implementation.
- Build only the current roadmap phase.
- Respect the architecture.
- Explain trade-offs.
- Ask before changing project structure.
- Never invent requirements.
- Never rewrite documentation without preserving intent.
- Prefer improving existing systems over replacing them.

---

# Contributor Expectations

Contributors are expected to:

- Respect existing conventions.
- Keep changes focused.
- Improve documentation alongside code.
- Leave the project cleaner than they found it.
- Prioritize maintainability over speed.

---

# Definition of Done

A task is complete only if:

- Product goals are met.
- Code follows the handbook.
- Responsive behavior is verified.
- Accessibility has been considered.
- Documentation is updated where needed.
- No unnecessary technical debt is introduced.

---

# Things We Never Do

Study.et will never:

- Publish unverified information.
- Rank universities.
- Hide official sources.
- Sacrifice usability for aesthetics.
- Couple research with application code.
- Introduce unnecessary complexity.
- Build features without understanding the problem.

---

# Pull Request Checklist

Before merging:

- Does this help students?
- Does it follow the handbook?
- Is the implementation simple?
- Is documentation updated?
- Will another contributor understand it?

---

# Revision Policy

This is a living document. Rules may evolve as Study.et grows, but every change should reinforce the mission, vision, and North Star defined in the Project Charter.
