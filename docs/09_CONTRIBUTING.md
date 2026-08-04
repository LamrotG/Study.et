# Study.et Handbook

# 09_CONTRIBUTING.md

**Version:** 1.0.0  
**Status:** Living Document  
**Owner:** Study.et  
**Audience:** All Contributors (Human & AI)  
**Related Documents:** All Handbook Documents

---

# Welcome

Thank you for contributing to Study.et.

Study.et exists to make higher education information in Ethiopia easier to discover, understand, and trust.

Every contribution—whether it is code, content, documentation, design, or research—should move the project closer to that goal.

This document explains how contributions should be made to ensure the project remains maintainable, consistent, and trustworthy.

---

# Our Philosophy

Study.et is built on a simple belief:

> Build slowly. Build correctly. Build for years.

We value maintainability over speed.

We value clarity over cleverness.

We value students over technology.

---

# Before You Start

Before contributing, read these documents:

```
00_PROJECT_CHARTER.md
01_PRODUCT.md
02_RULES.md
03_ARCHITECTURE.md
```

Understanding the project is more important than writing code.

---

# Types of Contributions

Study.et welcomes contributions in several areas.

## Engineering

- Features
- Bug Fixes
- Performance Improvements
- Accessibility Improvements

---

## Documentation

- Handbook improvements
- Architecture clarification
- Better explanations

---

## Content

- University pages
- Departments
- Programs
- Admissions

---

## Design

- User Experience
- Interface Improvements
- Accessibility

---

## Research

- University verification
- Official sources
- Data validation

---

# Contribution Workflow

```
Understand Problem

↓

Read Handbook

↓

Create Branch

↓

Implement

↓

Test

↓

Update Documentation

↓

Open Pull Request

↓

Review

↓

Merge
```

---

# Branch Naming

Use descriptive names.

Examples

```
feature/search-filters

feature/program-pages

feature/university-card

fix/mobile-navbar

fix/search-index

docs/content-spec

refactor/mdx-loader
```

Avoid

```
new

test

update

feature1

branch2
```

---

# Commit Messages

Follow a consistent style.

Examples

```
feat: add university filters

fix: correct search ranking

docs: update architecture handbook

refactor: simplify MDX parser
```

Commits should describe **why** the change exists.

---

# Pull Requests

Each Pull Request should solve one logical problem.

Do not combine unrelated work.

A Pull Request should include:

- Summary
- Motivation
- Screenshots (if UI)
- Testing Notes
- Documentation Updates

---

# Code Review

Review the solution—not the person.

Ask questions.

Explain suggestions.

Prefer constructive discussion.

---

# Coding Standards

Contributors should follow:

- TypeScript strict mode
- Small reusable components
- Accessible interfaces
- Predictable naming
- Clear folder organization

Follow the Architecture Handbook before introducing new patterns.

---

# Documentation Requirements

Whenever a major architectural or product decision changes:

Update the handbook.

Documentation is part of the implementation.

---

# Adding a New University

Every university should follow the same workflow.

```
Research

↓

Official Sources

↓

Generate MDX

↓

Review

↓

Validate

↓

Move to content/

↓

Build

↓

Publish
```

Never publish directly from research output.

---

# Content Standards

Content must be:

- Accurate
- Neutral
- Verifiable
- Well-structured

Never:

- Invent information
- Guess missing details
- Copy unofficial sources without verification

---

# Design Contributions

Design should always improve comprehension.

Avoid visual complexity.

Prefer consistency.

Every component should follow the Design System.

---

# Accessibility

Every contribution should consider accessibility.

Checklist

- Keyboard Navigation
- Screen Readers
- Focus States
- Color Contrast
- Semantic HTML

Accessibility is required—not optional.

---

# Testing

Before submitting:

Verify

- Desktop
- Tablet
- Mobile

Test

- Navigation
- Search
- Filters
- University Pages
- Responsive Layout

---

# Performance

Contributors should avoid unnecessary JavaScript.

Prefer static rendering.

Optimize images.

Avoid unnecessary dependencies.

Performance is a feature.

---

# Claude Code Contributions

Claude Code should always:

- Read the handbook first.
- Build only the current roadmap phase.
- Explain architectural trade-offs.
- Avoid feature creep.
- Respect the existing project structure.
- Never invent requirements.
- Keep documentation synchronized with implementation.

Claude Code is expected to behave like a senior engineer, not an autocomplete tool.

---

# Definition of Done

A contribution is complete when:

- Product goals are satisfied.
- Architecture rules are respected.
- Documentation is updated.
- Accessibility is verified.
- Responsive behavior is tested.
- Content is accurate.
- The codebase is cleaner than before.

---

# Code of Conduct

Be respectful.

Be curious.

Assume good intent.

Discuss ideas—not individuals.

Constructive feedback makes the project stronger.

---

# Getting Help

If uncertain:

- Read the handbook.
- Review previous ADRs.
- Open a discussion before implementing large changes.

Questions are encouraged.

Assumptions are discouraged.

---

# Final Checklist

Before requesting a review, ask yourself:

- Does this help students?
- Does it follow the handbook?
- Is it maintainable?
- Is it documented?
- Would another contributor understand it?
- Is it ready to live in the project for years?

If the answer is "Yes" to all of these questions, the contribution is ready for review.

---

# Revision Policy

This document is a living guide.

As the contributor community grows, this document should evolve to support new workflows while preserving the principles of Study.et.