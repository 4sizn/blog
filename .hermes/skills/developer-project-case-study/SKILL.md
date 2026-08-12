---
name: developer-project-case-study
description: Create or revise a 4sizn Blog `/blog/projects` record. Use for any Toy or Career project detail page, especially when rewriting code-first project descriptions into a product-and-work record in the style of the `리모트미팅` post.
created_by: agent
---

# 4sizn Blog Project Records

`/projects` is a concise portfolio surface. `/blog/projects` is a readable project record. The reference voice and structural baseline is **`리모트미팅`**: short factual introduction, product/service context, clearly grouped work, a restrained outcome or reflection, and related public records.

A project post is not a repository tour, a changelog, or an architecture case study. Technical details only belong when they make a reader understand the product experience or a distinct work decision. File paths, symbols, commit IDs, test names, shell commands, and implementation chronology do not belong in the body merely because they are available.

## 1. Choose the evidence boundary

Set the record type before drafting.

| Record type          | Use when                                                                                            | Primary sources                                                                                        | Public purpose                                                                                                          |
| -------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `career-source`      | A supplied Project Experience/resume record exists                                                  | Supplied record and verified public links                                                              | Preserve the original service, work, outcome, and reflection structure at a public-safe level.                          |
| `self-owned-product` | A Toy/personal project has a product page, store page, release notes, screenshots, or public source | Existing portfolio card, public release/store copy, approved product images, and verified public links | Explain what the product is, what people can do with it, the author’s product/work focus, and its current public scope. |

Do not use `code-evidence` for 4sizn Toy project posts. Public source and Git history are useful to check accuracy, but they are not an editorial outline and must not determine the article’s content or prose.

## 2. Inspect before drafting

1. Read the matching `content/projects/<slug>.md`, the current `content/blog/projects/<slug>.md`, approved images, linked public store/release records, and `/blog/projects/index.md`.
2. Treat the card and public product/release copy as a fact boundary. If source code adds a technical fact that is not needed to explain the product, leave it out.
3. Make a private coverage map: product promise → service/use context → distinct work areas → public result/current scope → related records.
4. Never add internal architecture, performance figures, device-wide guarantees, individual ownership claims, unpublished plans, or a reconstructed development story.
5. Never use private URLs, local paths, raw export identifiers, credentials, internal issue links, participant data, or admin UI images.

## 3. Required shape

### Career record (`career-source`)

Preserve the source record’s real headings and level of detail. The usual form is:

```md
> **기록 범위**
> 공개 가능한 당시 프로젝트 기록과 공개 회고를 바탕으로 정리한다.
> 비공개 소스·내부 문서·운영 데이터·현재 상태는 포함하지 않는다.

## 간략소개

## 서비스

## 업무

### [업무 영역]

## 업무성과

## 회고

## 관련 기록
```

Do not invent a technical narrative where the supplied career record does not support one.

### Toy/personal record (`self-owned-product`)

Use the same reader-facing rhythm as the career reference, adapted to a self-owned product:

```md
> **기록 범위**
> 공개된 프로젝트 소개, 배포/스토어 정보, 승인된 이미지와 관련 공개 기록을 바탕으로 정리한다.
> 비공개 구현·운영 데이터·확인하지 않은 환경은 포함하지 않는다.

## 간략소개

[제품이 무엇인지와 누구의 어떤 순간을 위한 것인지.]

## 서비스

[사람이 실제로 보는 흐름과 주요 기능. 필요한 경우 승인된 제품 이미지를 한 장만 둔다.]

## 작업

### [제품 경험 또는 작업 영역]

- [제품에 드러나는 구체 범위]

## 공개와 현재 범위

[확인 가능한 스토어/릴리즈/공개 상태와 경계. 릴리즈의 상세 변경은 반복하지 않는다.]

## 관련 기록

[포트폴리오 요약, 공개 스토어/소스, 관련 릴리즈.]
```

- A smaller project may combine `서비스`와 `작업`, but do not replace them with `구성`, `아키텍처`, `변경 이력`, `검증 범위`, or `남은 제약` sections.
- Describe visible behaviour and product intent first. Technical product terms are allowed only when they are already part of the public product language and help explain a visible experience (for example, `모션 입력`, `오프라인 동작`, `탭별 설정`).
- Keep version-by-version details in `/blog/releases`; link to them rather than copying a changelog.
- A source link is a related record, not a reason to narrate directories, commits, or tests.

## 4. Title, description, and language

- The title is exactly the project name. No `제작기`, slogan, colon, em dash, or evaluative subtitle.
- The description is one factual sentence describing product context and public scope.
- Write calm explanatory Korean. Prefer present tense and noun phrases; use past tense only for dated public events.
- Use concrete nouns and product actions. Avoid generic phrases such as `기능을 구현했다`, `성능을 개선했다`, `경험을 쌓았다`, or `코드 기반으로 확인했다`.
- Do not force a failure story, a test table, or an implementation timeline.

## 5. Archive wording

`/blog/projects/index.md` must tell readers that records are organized around each product’s context and work, not around source code. For Toy records, describe the record as a public product/service record; for Career records, describe it as an authored experience record.

## 6. Required audit and verification

1. Audit every Toy detail record when this editorial rule changes; do not fix only the initially named post.
2. Confirm every Toy post uses `recordType: self-owned-product` and `sourceScope: public-product-record`.
3. Scan the changed posts for code paths, symbol names, commit hashes, test names, commands, repository-history wording, and forbidden `제작기` labels.
4. Run changed-file Prettier, typecheck, tests, Quartz build, and `git diff --check`.
5. Inspect `/blog/projects` and representative revised posts at desktop and 390px mobile. Verify headings, image rendering, links, and no horizontal overflow.
6. Request an independent content/style/privacy review before calling the rewrite complete.

## Completion report

State the records rewritten, source categories inspected without exposing private identifiers, the style/evidence rule adopted, links or claims intentionally removed, visual/build verification evidence, review outcome, and commit/push/deploy state. Do not call a content rewrite a product release.
