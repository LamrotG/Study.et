# Study.et Handbook

# 07_SEO.md

**Version:** 1.0.0  
**Status:** Draft  
**Owner:** Study.et  
**Audience:** Engineers, Product Owners, AI Contributors  
**Related Documents:** 01_PRODUCT.md, 03_ARCHITECTURE.md, 04_CONTENT_SPEC.md, 06_SEARCH_SPEC.md

---

# Purpose

This document defines the Search Engine Optimization (SEO) strategy for Study.et.

SEO is a core product feature.

Students should be able to discover universities through search engines just as easily as they discover them through Study.et itself.

Every page should be optimized to provide useful, trustworthy, and structured information.

---

# SEO Philosophy

Study.et does not optimize for search engines.

Study.et optimizes for students.

When pages genuinely answer student questions with accurate information, search engines naturally reward them.

Therefore:

Student Experience > Search Engine Tricks

---

# Guiding Principles

## Accuracy

Every indexed page should contain verified information.

---

## Clarity

Page titles and descriptions should clearly communicate their content.

---

## Originality

Never duplicate content across pages.

Each university page should provide unique value.

---

## Structure

Search engines understand structured content better than visual presentation.

Semantic HTML and structured metadata are mandatory.

---

# URL Structure

URLs must remain stable.

Examples

```
/
```

```
/directory
```

```
/about
```

```
/universities/addis-ababa-university
```

Future

```
/programs/software-engineering
```

```
/departments/computer-science
```

Avoid

```
?id=15
```

```
?page=4&type=list
```

Readable URLs improve usability and SEO.

---

# Metadata

Every page MUST generate:

- Title
- Description
- Canonical URL
- Open Graph Metadata
- Twitter Card Metadata
- Robots Directives

---

# Title Format

Homepage

```
Study.et — Discover Universities in Ethiopia
```

University

```
Addis Ababa University | Study.et
```

Future Program

```
Software Engineering | Study.et
```

Keep titles concise and descriptive.

---

# Meta Description

Descriptions should summarize the page naturally.

Example

```
Explore Addis Ababa University, including its colleges, departments, location, official website, and academic offerings.
```

Avoid keyword stuffing.

---

# Canonical URLs

Every page should define a canonical URL.

Example

```
https://study.et/universities/addis-ababa-university
```

Duplicate URLs should never compete.

---

# Open Graph

Every page should generate

- Title
- Description
- Cover Image
- URL
- Site Name

This ensures attractive previews when shared on social media.

---

# Structured Data

Use JSON-LD wherever appropriate.

Future entities include:

- CollegeOrUniversity
- EducationalOrganization
- BreadcrumbList
- WebSite
- SearchAction

Structured data helps search engines understand content relationships.

---

# Sitemap

Generate automatically during build.

Include

- Homepage
- About
- Directory
- Every University
- Future Program Pages
- Future Department Pages

Exclude

- Draft Content
- Internal Pages
- Development Routes

---

# Robots.txt

Allow indexing of all public pages.

Disallow

- Admin
- Internal APIs
- Draft content

---

# Internal Linking

Every page should naturally connect to related content.

Examples

University

↓

Departments

↓

Programs

↓

Related Universities

Internal links improve navigation and search engine understanding.

---

# Images

Every image should include:

- Alt Text
- Descriptive Filename
- Appropriate Size
- Modern Format (WebP when possible)

Example

```
addis-ababa-university-logo.webp
```

Avoid

```
image1.png
```

---

# Performance

SEO depends heavily on performance.

Requirements

- Static generation
- Optimized images
- Minimal JavaScript
- Fast Largest Contentful Paint
- Low Layout Shift

---

# Accessibility

Accessibility improves SEO.

Requirements

- Semantic HTML
- Proper heading hierarchy
- Keyboard navigation
- Meaningful alt text
- Visible focus states

---

# Content Quality

Every page should answer real student questions.

Example

Instead of listing departments,

Explain what the university offers.

Provide context where appropriate.

Quality always beats quantity.

---

# Future SEO

Future improvements include:

- Program landing pages
- Department pages
- Career pages
- Regional landing pages
- Comparison pages
- AI-generated FAQs based on verified content
- Multilingual support (English & Amharic)

---

# Analytics

Future analytics should measure:

- Organic traffic
- Search queries
- Popular universities
- Entry pages
- Exit pages

Analytics should improve user experience, not manipulate rankings.

---

# Non-Goals

Study.et will never:

- Use clickbait titles
- Publish duplicate content
- Stuff keywords
- Generate low-quality AI pages
- Hide information for ranking purposes

Trust is more important than traffic.

---

# Implementation Notes

Claude Code MUST:

- Generate metadata automatically from MDX frontmatter.
- Generate structured data for supported page types.
- Produce a sitemap during build.
- Produce a robots.txt file.
- Ensure every public page has a canonical URL.
- Keep metadata generation centralized.

---

# Revision Policy

This is a living document.

Whenever new page types are introduced, this document must be updated before implementation.