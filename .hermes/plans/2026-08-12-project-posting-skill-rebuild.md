# Project-posting Skill Rebuild Plan

**Goal:** Replace the failed “uniform developer case study” approach with a source-structure-first project-record system, then rewrite the Projects archive titles and posts so each item preserves the available original record without fabricated narrative.

**Context:** The current project-post skill forces a problem → decision → iteration → verification shape. That compresses the supplied Project Experience records and produces generic engineering slogans. It also encouraged formulaic Korean past-tense reporting and subtitle patterns such as `제품명 제작기 — …하기`.

## Approved problem statement

1. When an original Project Experience record exists, its own information architecture is primary:
   - 간략소개
   - 서비스
   - 업무
   - 업무성과
   - 회고
   - verified public links and public-safe assets
2. A post is not required to invent a “central engineering problem,” two failures, a timeline, tests, or architecture sections when the available record does not support them.
3. `/blog/projects` titles must be the project name only. Do not append `제작기`, `개발 참여 기록`, an em dash subtitle, or a slogan.
4. Descriptions may say what the product is and what the record contains; they must not be slogan-like, imperative, or an inferred technical claim.
5. Prefer neutral factual Korean. Avoid repeatedly ending bullet items and paragraphs with `~했다`, `~했습니다`, `~하였다` when a source-faithful noun phrase, scoped label, or concise present-tense statement communicates the fact better.

## Scope

### Skill and template

- Replace `.hermes/skills/developer-project-case-study/SKILL.md`.
- Replace `.hermes/skills/developer-project-case-study/templates/project-case-study.md`.
- Make the skill select one of two writing modes:
  1. **Source-record mode** — supplied Notion/Resume/Drive project material controls headings and depth. Do not force case-study anatomy.
  2. **Evidence-led build record mode** — for a self-owned project with inspectable repository/history/test evidence. Use engineering narrative only where evidence supports it.
- Add a required source-coverage matrix held privately: source heading → destination heading → retained details → omission reason.
- Require a title audit: exact project title only, no em-dash subtitle, no `제작기` or `개발 참여 기록` suffix.
- Require a style audit: eliminate repetitive past-tense action-report prose; retain only source-required past tense.
- Preserve public-safety rules: no raw Notion/Drive identifiers, internal URLs, private source paths, people/participant imagery, admin/editor screenshots, or unverified impact claims.

### Posts

Rewrite every `content/blog/projects/*.md` except `index.md`.

- Career posts must follow the supplied Project Experience structure as closely as public-safe evidence permits.
  - RemoteMeeting: product/service, legacy-to-renewal scope, concrete Video/MediaStream/user mapping work, outcomes/retrospective boundaries.
  - RemoteSeminar: webinar context, service capabilities, detailed work list, limited source-supported outcomes/reflection.
  - Mobizen: version 1 maintenance and version 2 party POC as separate service sections, then work/outcomes/reflection.
  - SpecialForce ARVR: concise introduction, service context, tasks, outcomes; preserve the approved cover.
- Toy/self-owned posts must use repository/history evidence but do not fabricate a company-project record. They should use product context, implementation record, release/verification evidence, and current links only where those sections are genuinely supported.
- Remove all slogan subtitles from frontmatter titles and replace descriptions with product-context summaries.
- Update `content/blog/projects/index.md` so its lists show title-only labels.

## Non-goals

- Do not change `/projects` card routes, sorting, or layout.
- Do not add unverified metrics, implementation ownership, code excerpts, or history claims.
- Do not restore excluded source images or raw source identifiers.
- Do not change release-note content.

## Acceptance criteria

1. Every project post title is exactly its project name.
2. No project title contains `—`, `제작기`, or `개발 참여 기록`.
3. Career post headings cover every applicable public-safe source section from the original record; a private coverage matrix documents omissions.
4. Toy posts use only verified repository/history/runtime evidence and are not forced to imitate Notion career entries.
5. The new skill/template makes source structure mandatory when supplied and forbids generic case-study scaffolding in its absence.
6. The archive index uses plain project titles.
7. Content has no raw source URL/page identifier/private path leak.
8. Targeted formatting, tests, TypeScript, Quartz build, diff scan, independent review, and desktop/390px production verification pass.

## Rollback

Each rewrite is reviewable in a dedicated commit. Revert the content/skill commit to restore the previous published archive; no schema or runtime dependency changes are involved.

## Execution order

1. Build a private source coverage matrix for the four career records and repo-evidence map for seven self-owned posts.
2. Replace the skill and template before rewriting content.
3. Rewrite frontmatter titles/descriptions and the category index.
4. Rewrite career posts from source sections, then self-owned posts from inspected evidence.
5. Run source-leak, title-style, and content-coverage checks.
6. Run canonical tests/build and visual verification.
7. Conduct independent source/style/privacy review, remediate findings, then request release confirmation before push/deploy.
