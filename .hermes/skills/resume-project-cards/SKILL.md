---
name: resume-project-cards
description: Create, revise, or audit the /projects portfolio cards and their linked /blog/projects production notes for 4sizn Blog. Use whenever a project card, Toy Projects, Career Projects, résumé/Project Experience context, card thumbnail, or portfolio-to-case-study mapping is requested. Keep cards résumé-like and evidence-scoped while letting /blog/projects contain the long-form engineering narrative; reuse existing repository assets rather than inventing visuals.
created_by: agent
---

# Résumé Project Cards

`/projects` is a concise portfolio/résumé surface. `/blog/projects` is the linked development record. They complement each other but should not collapse into the same page type.

## Source hierarchy

1. When a Drive export is supplied, inspect the exported Resume HTML/CSV and its `Resume/Project Experience` entries first. This is the primary source for project name, description, tags, exact start/end dates, and verified public link.
2. Inspect a directly supplied public résumé/Notion page next when available. Treat either source as evidence, not as a template to copy.
3. Inspect the existing `content/projects/<slug>.md`, the matching `content/blog/projects/<slug>.md`, and repository assets before editing.
4. Resolve conflicts in favor of the most recently supplied export for its explicit structured fields. Do not retain an older inferred or previously copied date.
5. For career work without source access, preserve the author’s published scope and do not infer company metrics, architecture, or present operational state.
6. For personal projects, use source/test/history evidence for the blog post, while keeping the portfolio card brief and outcome-oriented.

## Card contract

Each `content/projects/<slug>.md` should have:

- `title`, `projectOrder`, `projectCategory` (`toy` or `career`), `projectStack`, and `draft`.
- A one-line `description` that names the product/domain and the primary contribution or engineering transition.
- A compact résumé body with explicit **기간**, **역할/기여**, and (only when supported) **핵심 결과/문제**.
- `projectImage` pointing to an existing local asset whenever an appropriate existing screenshot/cover/app icon exists. Do not generate decorative replacement images merely to fill a card.
- `projectLinks` only for verified public destinations (App Store, GitHub, or service). No fabricated URLs.

Suggested body shape:

```md
## 기간

YYYY.MM – YYYY.MM

## 역할 및 기여

- Product/context + owned scope.
- A concrete implementation or problem boundary.

## 핵심 문제 또는 결과

- Evidence-supported outcome, limitation, or decision.
```

## Portfolio vs. case-study boundary

- `/projects`: recruiter-readable context; product, period, role, technologies, and scoped contribution. Keep it skimmable.
- `/blog/projects`: developer production story; problem → decision → iteration → verification, sourced from implementation/history/public retrospective evidence.
- For Toy cards, link the main card to its matching `/blog/projects/<slug>` only when the article exists; otherwise retain its `/projects/<slug>` detail route.
- For Career cards, retain the `/projects/<slug>` résumé detail route unless an explicitly approved case-study route is available.

## Asset rules

1. Search `quartz/static/` first and reuse existing app icons, store screenshots, and article imagery.
2. Prefer `projectImage` for an editorial card thumbnail; use `projectIcon` as the compact fallback/identity mark.
3. Give meaningful alt text when the image communicates product context; empty alt is appropriate only for an adjacent decorative logo/icon.
4. Verify desktop and 390px mobile cropping, contrast, loading, and horizontal overflow with a real screenshot.

## Notion-derived context

Public résumé evidence indicates each experience should preserve: project/service name, timeframe, stack, short service description, owned work, and cautiously stated outcomes. The RemoteMeeting page additionally supplies a model: service context, renewal transition, role, and retrospective links.

Do not copy Notion prose wholesale. Synthesize only the information needed for a résumé card and attribute/public-link any longer retrospective in the related blog article when appropriate.

## Verification

1. Ensure each visible card has correct title, category, sort order, thumbnail/icon behavior, and internal target.
2. Exercise the actual card click. For Toy Projects, verify matching `/blog/projects/<slug>` resolution.
3. Run Prettier, TypeScript, Quartz build, `git diff --check`, and the project test suite.
4. Capture desktop and 390px `/projects` screenshots; inspect card hierarchy, image crop, text legibility, no overlap, and no horizontal overflow.
5. Do not claim a résumé item is complete until its content is grounded in the inspected source and its target route is live.
