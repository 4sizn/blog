---
name: developer-project-case-study
description: Create or revise a 4sizn Blog `/blog/projects` record. Use for any project post, career Project Experience migration, self-owned project development record, or project archive/title audit. Preserve the supplied source record's structure and detail; do not force a generic case-study formula.
created_by: agent
---

# Project Records for 4sizn Blog

`/projects` is a concise résumé/portfolio surface. `/blog/projects` is the detailed project record. They do not use one universal article form.

The prior one-size-fits-all “developer case study” model is prohibited. In particular, do **not** force a project into “problem → architecture → two failures → test table → timeline” when the available primary source is a Project Experience record with its own structure.

## 1. First decide the record type

Set the frontmatter fields before drafting:

```yaml
recordType: career-source # or code-evidence
sourceScope: supplied-project-record # or repository-history
```

| Type            | Use when                                                                      | Primary evidence                                                                                                                       | Purpose                                                                                                             |
| --------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `career-source` | A supplied Notion/Resume/Drive Project Experience record exists               | The supplied record's explicit description, period, stack, `간략소개`, `서비스`, `업무`, `업무성과`, `회고`, and verified public links | Preserve the author's project context and work record at its original level of detail, in public-safe Korean.       |
| `code-evidence` | A self-owned project has inspectable source, history, tests, or run artifacts | Repository implementation, tests, commit history, real runtime evidence, and verified release/source links                             | Explain the product and only the implementation decisions and verification that the inspected evidence establishes. |

Never infer undisclosed company architecture, metrics, ownership, customer impact, current operating status, or source-code behavior from a career record. A source record's frontmatter tags are classification metadata only: they may populate public tags, but never establish a responsibility, implementation, feature, outcome, or verification claim in the body.

## 2. Source coverage is a gate, not an afterthought

Before editing a `career-source` post, create a **private** coverage matrix:

```text
original section / sub-item → public destination section → retained detail → omission reason (if any)
```

- Read the full supplied record, including sublists and callouts, before drafting.
- Each meaningful source section must map to a public section. Do not collapse `서비스`, `업무`, `업무성과`, and `회고` into a short “role” paragraph.
- Preserve distinctions in the source. For example: existing-service maintenance versus a separate POC; product version 1 versus version 2; a user-facing surface versus an admin surface.
- Preserve lists of concrete responsibilities when they are public-safe. Group only when grouping does not discard a distinct responsibility.
- Omit only content that is private, unsafe, unverifiable, redundant, or no longer publicly valid. Record the reason privately; never put raw source identifiers or paths into the repository.
- When the record does not support an architecture story, do not invent one merely to make the article feel technical.

For a `code-evidence` post, create a private evidence map instead:

```text
claim → implementation/test/history/runtime evidence → source location → verification actually run
```

Use only the sections supported by that map. A tiny project does not need two “hard problems”; a project without a meaningful test harness must state its verification boundary rather than fabricate one.

## 3. Career source-record shape

The exact source headings control the article. The following is the default mapping, not a replacement outline:

```md
---
title: "[프로젝트명]"
description: "[기간] 동안 [역할/참여 범위]로 참여한 [제품 또는 서비스] 작업 기록"
recordType: career-source
sourceScope: supplied-project-record
tags: [career, project]
draft: true
lang: ko
---

> **기록 범위**
> 공개 가능한 당시 프로젝트 기록을 바탕으로 정리한다.
> 비공개 소스·내부 문서·운영 데이터·현재 상태는 포함하지 않는다.

## 간략소개

[원문의 제품/서비스와 기간. 원문에 있는 배경은 여기서 보존한다.]

## 서비스

[원문의 제품 설명, 버전/사용 흐름/공개 영상 또는 검증된 공개 링크.]

## 업무

### [원문에서 구분한 업무 영역]

- [원문의 구체 작업을 빠뜨리지 않고 정리]

## 업무성과

[원문에 직접 기록된 학습, 범위 확장, 출시 등만. 수치나 외부 효과를 추가하지 않는다.]

## 회고

[원문의 구체적 회고와 당시 제약. 일반론이나 사후 미화를 추가하지 않는다.]

## 관련 기록

[검증된 서비스/공개 영상 또는 공개 안전한 제목·날짜. Raw Notion/Drive URL·ID는 금지.]
```

- The source does not need every heading. Keep only headings that exist or are necessary to retain an explicit source fact.
- Original Day/date records may become subsections, but their chronology and technical conclusion must remain visible.
- Use a short disclosure boundary, not a defensive paragraph after every fact.
- Do not call a career record `제작기` or `개발 참여 기록` in its title.

## 4. Self-owned code-evidence shape

Use the inspected product's actual evidence to choose headings. Start with product context, then retain the implementation details that make this project distinct.

```md
---
title: "[프로젝트명]"
description: "[제품/사용자 맥락]과 [확인 가능한 구현·검증 범위]를 정리한 개발 기록"
recordType: code-evidence
sourceScope: repository-history
tags: [project]
draft: true
lang: ko
---

> **검토 범위**
> 공개 저장소의 구현, 변경 이력, 테스트 또는 실행 결과를 기준으로 정리한다.
> 확인하지 않은 환경·사용자 지표·성능 수치는 주장하지 않는다.

## 프로젝트

[제품이 무엇이며 누구의 어떤 상황을 다루는지]

## 구현 기록

### [실제 구현 영역]

[구조·책임·선택과 그 근거. 경로/심볼은 독자의 이해에 도움이 될 때만 사용한다.]

## 변경과 확인

[실제 이력에서 확인되는 변화, 테스트·실행·배포 확인. 항목 수를 강제하지 않는다.]

## 현재 범위

[현재 링크, 확인한 한계, 다음 확인이 필요한 범위]
```

- Repository paths, commits, tests, and commands are evidence—not decorative scaffolding. Include them only when they explain a project-specific decision.
- Separate release notes from the record. Link them rather than restating changelog bullet points.
- Do not turn every self-owned post into the same “failure narrative.”

## 5. Title, description, and language gates

### Title

- The title is **exactly the project name**.
- Prohibited: `제작기`, `개발 참여 기록`, em dashes, colons followed by a slogan, “~하기” slogan subtitles, or evaluative copy.
- Examples:
  - Allowed: `Swing Golf`, `리모트미팅`, `SpecialForce ARVR`
  - Prohibited: `Swing Golf 제작기 — 신체 모션을 재현 가능한 게임 입력으로 바꾸기`

### Description

- One factual sentence: what the product is, the period/role for career work or implementation/verification scope for self-owned work.
- No campaign copy, abstract slogans, unsupported evaluation, fabricated metrics, or vague success language.

### Prose

- Write explanatory Korean in present tense and noun phrases by default.
  - Prefer: `입력 이벤트는 상태 전이 계층에서 처리한다.`
  - Avoid: `입력 이벤트를 상태 전이 계층에서 처리했다.`
- Use past tense only when the date itself matters: a release, a historical change, or the source’s contemporaneous reflection.
- Do not repeat `했다`, `했습니다`, or `하였다` as a list-writing crutch.
- Headings name a product area, task, constraint, or decision. They are not advertising slogans.
- Do not replace detailed source content with generic sentences such as “기능을 구현했다”, “성능을 개선했다”, or “경험을 쌓았다.” State the concrete source-supported scope instead.

## 6. Public-safety boundary

Never publish or commit:

- Notion/Drive export URLs, page IDs, raw archive identifiers, or private local paths;
- company source, internal issue links, internal operations data, unverified public endpoints, or credentials;
- participant names/faces, chats, documents, account information, or admin/editor/broadcast UI captures;
- unsupported metrics, individual ownership claims, or reconstructed internal architecture.

Only use a supplied image after a project-attribution and public-safety review. Keep approved images local under `quartz/static/`, use meaningful Korean alt text, and retain rejection reasons only in private review material.

## 7. Required audit and verification

1. Read `content/projects/<slug>.md`, matching `content/blog/projects/<slug>.md`, and its primary evidence before editing.
2. For every archive-wide change, audit all titles, descriptions, and `content/blog/projects/index.md` labels.
3. Check source coverage for `career-source` records and evidence mapping for `code-evidence` records.
4. Scan the public change and reachable publication history for private identifier leaks.
5. Run changed-file Prettier, tests, TypeScript, Quartz build, and `git diff --check`.
6. Inspect `/blog/projects` and representative posts on desktop and 390px mobile. Verify title-only archive labels, text hierarchy, images, and horizontal overflow.
7. Request independent source/style/privacy review before declaring the rewrite complete.

## Completion report

State: record types used; sources inspected without exposing private identifiers; source sections retained; intentionally omitted unsafe material; title/style audit result; verification evidence; review result; and commit/push/deploy status. Do not call work complete before the independent review is resolved.
