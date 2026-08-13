---
name: approval-gated-project-posts
description: Use whenever revising or creating a 4sizn Toy/Career project post or a developer project retrospective that must proceed one post at a time through user-supplied sources, approved images and characteristics, generated HTML preview, editorial feedback, and explicit approval before publication. Use even when the user only asks to “write a project post,” “revise a Toy/Career post,” or “turn repository history into a development story.”
created_by: Hermes Agent
---

# Approval-Gated 4sizn Project Posts

A project post is not ready merely because a draft reads well. It needs a clear evidence boundary, material the author approves for publication, an HTML preview the author has actually reviewed, and a final explicit publication decision.

Run **one post at a time**. Do not silently batch-rewrite the archive, publish a draft, or use unapproved images because an earlier post was approved. Each post has its own preparation input, evidence ledger, preview, revision loop, and final approval.

## When to Use

- Creating or revising a Toy Project or Career Project record for `/blog/projects`.
- Creating a source-, documentation-, and Git-history-grounded developer retrospective for `/blog/dev`.
- The user wants to provide sources, images, priorities, corrections, or approval between drafting stages.
- The request mentions a project repository, commit history, AI-assisted development, portfolio article, development story, or proofreading a project post.

Do not use this skill for a short release note, an unrelated technical explainer, or a one-line `/projects` card change without an article.

## The route decides the editorial contract

Confirm the target route during the preparation gate. Do not assume that a source repository turns every project article into a repository walkthrough.

| Target | Editorial contract | Evidence usage |
| --- | --- | --- |
| `/blog/projects/<slug>` — Toy | Public **product/service and work record**. Follow the restrained `리모트미팅` rhythm: product context, visible service flow, grouped work, public/current scope, related records. | Public page, release/store copy, approved images, existing portfolio card, and source only to verify a necessary fact. Do **not** use paths, symbols, commits, test names, or inferred implementation chronology as the article outline. |
| `/blog/projects/<slug>` — Career | Public-safe **experience record**. Preserve supplied source record scope: service context, work areas, outcome/reflection, and public links. | Supplied résumé/Notion/source record is the factual boundary. Never expose internal systems, identifiers, sensitive customer/business data, or inferred details. |
| `/blog/dev/<slug>` | A source-grounded **developer development story / retrospective**. Explain problem → options → developer decision → iteration → verification, including AI’s bounded role when evidenced. | Read repository docs, key code, dependency files, Git history and diffs. Distinguish direct evidence from reasonable inference. |

If the author wants a code/history-centered story **and** a portfolio record, propose two connected posts rather than mixing them:

- `/blog/projects/<slug>` — reader-facing product/work record.
- `/blog/dev/<slug>` — development story, linked from the project record.

## State machine and stop points

Use these named stages in messages and keep the post in its current stage until its exit criterion is met.

```text
0. preparation input → 1. evidence map → 2. story proposal approval
→ 3. draft + local HTML preview → 4. editorial revision loop
→ 5. final publication approval → 6. commit/push only if directed
```

- **Stages 0, 2, 4, and 5 are hard stops.** Ask the author and wait; do not generate the next artifact in the same turn.
- A response such as `ㅇㅇ`, `ㄱㄱ`, `승인`, or an unambiguous equivalent approves the **artifact currently presented only**. It does not grant a blanket approval for other posts or publication.
- `수정`, detailed feedback, a replacement source, or a new image returns the work to the applicable earlier stage.
- A final publication approval means permission to modify the post source and make it buildable. **Commit, push, and deployment remain separate actions** and need explicit direction if not already requested.

## 0. Preparation input — ask first and wait

Before inspecting a repository, drafting prose, selecting images, or changing files, open a short preparation gate. Fill what can be discovered from the request, then ask only for unknown decisions.

Use this exact compact form in Korean:

```md
## [준비 단계 — <프로젝트명>]

- 대상: Toy / Career / 개발기 (`/blog/projects/...` 또는 `/blog/dev/...`)
- 작업: 신규 작성 / 기존 글 퇴고 / 범위 재정리
- 소스: [repo URL·로컬 경로·문서·공개 링크]
- 공개 가능한 근거: [README·Notion/이력서·PRD·릴리즈·스토어·커밋 등]
- 사용할 이미지: [파일 경로/URL] — 각 이미지의 공개 승인 여부와 독자가 봐야 할 점
- 꼭 살릴 특징: [문제·사용자 경험·내 역할·기술 판단·AI 활용 등]
- 제외/비공개: [회사명·고객 정보·화면·수치·표현]
- 글의 독자와 톤: [기본: 채용 담당자와 개발자에게 차분한 한국어]
- 원하는 제목 또는 제목 판단: [값]

위 항목을 보완해 주세요. 특히 **사용할 이미지(최소 2개 권장), 꼭 살릴 특징, 공개하면 안 되는 내용**을 확인한 뒤 분석을 시작합니다.
```

For each image, require one of: `사용 승인`, `제외`, `검토 필요`. Do not publish an image marked `검토 필요`.

If images are not yet available, continue only after the author chooses one:

1. provide at least two approved images later;
2. use meaningful, clearly marked placeholders in a **non-publishable preview only**;
3. for a project-record route, use fewer images only when the author explicitly accepts that exception.

Exit criterion: the author has supplied or explicitly delegated the source boundary, image decision, key characteristics, prohibited information, and target route.

## 1. Evidence map — investigate, do not invent

Create a private evidence map before proposing prose. Inspect the existing post and project card first, then use the approved sources appropriate to the route.

### Development-story investigation (`/blog/dev`)

Inspect broadly before narrating:

1. README, product/requirements/ADR/design documents, TODO/changelog, and any AI prompts or workflow notes.
2. Directory structure, dependency manifest, and the smallest set of key source files that explain the product boundary or technical decision.
3. `git log` in chronological clusters; inspect diffs around feature additions, reversals, refactors, fixes, or test additions.
4. Existing public deployment/release/screenshots and the author-approved images.

Make an internal table:

| Candidate claim | Source/evidence | Confidence | Publication decision |
| --- | --- | --- | --- |
| Directly observable fact | exact document, code, approved image, or public record | confirmed | usable |
| Change/sequence in history | dated commit/diff cluster | supported | phrase as history evidence |
| Motive, feeling, or causal explanation | author statement only | confirmed only if supplied | ask or qualify |
| Unknown | no usable evidence | unknown | omit |

Never infer a developer’s personal intent or emotional state from a commit alone. Use bounded language such as `공개 변경 이력에서는 …로 바뀐 흐름을 확인할 수 있었다` where needed.

### Project-record investigation (`/blog/projects`)

Use source/history only as a fact check. Build a product coverage map instead:

```text
product promise → actual user flow → author’s visible work areas
→ verified public/current scope → related public records
```

Keep developer-only details out: file paths, symbols, commit hashes, commands, test names, raw Git chronology, console/admin screens, private URLs, and unverified technical claims.

### AI evidence

Mention a particular AI tool, prompt, or workflow only if the author supplied it or publicly accessible evidence supports it. Show AI as an acceleration tool, not an autonomous author:

```text
AI explored / summarized / generated candidates
→ developer compared against project constraints
→ developer chose and implemented a direction
→ observed issue narrowed the next investigation
```

If AI usage cannot be evidenced, omit it rather than inserting generic AI praise.

Exit criterion: every intended claim is marked confirmed, supported-and-qualified, author-supplied, or omitted.

## 2. Story proposal — present choices and wait

Do not write the full draft yet. Present an evidence-bounded story proposal for **one post**:

```md
## [스토리 제안 — <프로젝트명>]

- 추천 제목: …
- 대안 제목: … / …
- 한 문장 독자 약속: …
- 이 글의 중심 이야기 1–3개:
  1. … (근거: …)
  2. … (근거: …)
- 제안 목차:
  - …
  - …
- 이미지 배치:
  - [승인 이미지 A] — [삽입 위치] / 독자가 확인할 내용
  - [승인 이미지 B] — [삽입 위치] / 독자가 확인할 내용
- 제외한 주장 또는 추가 확인이 필요한 부분: …

이 방향으로 초안을 생성할까요? 제목·목차·강조점·이미지 배치를 수정해도 됩니다.
```

For a developer story, make the central thread a real decision or changed understanding—not a changelog. For a project record, make it product/service context and work scope—not a technical architecture report.

Exit criterion: author explicitly approves or corrects the proposed direction.

## 3. Generate one draft and an HTML review artifact

After story approval, generate **only this post’s** Markdown draft. The draft is not publishable yet.

### Voice rules

- Korean prose should feel like a developer looking back on actual work: varied sentence lengths, specific observations, restrained confidence.
- Explain decisions through `problem → candidates → choice → consequence` when evidence permits.
- Avoid generic AI phrases: `구현해보았습니다`, `많은 것을 배웠습니다`, `성공적으로`, empty benefit lists, marketing claims, and artificially symmetrical paragraphs.
- Explain why a selected code excerpt matters; never paste code just to prove code exists.
- Do not add numbers, performance claims, customer outcomes, or personal motives without evidence.

### Images

- Place approved images where they advance the narrative, not in a gallery at the end.
- Use meaningful Korean alt text and a short caption that tells readers what to observe.
- Default target: 2–5 approved images. A user-approved exception must be recorded in the draft notes.
- For a preview placeholder, use `IMAGE_PLACEHOLDER` plus the missing-image note; do not move that draft to the final publication stage until resolved.

### HTML preview

1. Save the draft in the repository’s intended content path as an explicitly non-publishable draft (for example `draft: true` when supported) or render it in a temporary preview path that does not enter the final commit.
2. Run the blog’s real local build or preview workflow.
3. Open the generated route in a browser and inspect it at desktop and 390px mobile.
4. Capture the preview screens. Check title, heading rhythm, image crop/alt context, code blocks if present, links, Korean wrapping, and horizontal overflow.
5. Give the author the local preview URL or generated HTML path and both screenshot artifacts. State that this is a **draft for proofreading, not publication**.

Use this handoff:

```md
## [초안 검토 — <프로젝트명> / v<N>]

- 미리보기: <local URL or HTML path>
- 확인한 화면: desktop / 390px mobile
- 이번 초안에서 확인할 점: [2–4 focused questions]
- 근거 경계: [direct facts / qualified inferences / omitted items]
- 상태: 퇴고 대기 — `승인`, `수정: …`, 또는 교체할 소스·이미지를 보내주세요.
```

Exit criterion: the author can inspect a real rendered HTML artifact and receives a clear request for feedback.

## 4. Editorial revision loop — one version at a time

When feedback arrives:

1. Restate the requested changes in a short checklist and identify any new factual risk.
2. Make the requested revision only; do not opportunistically alter other posts or expand the claim boundary.
3. Rebuild and re-inspect the same route at desktop and 390px mobile.
4. Increment the draft version (`v2`, `v3`, …) and send the same HTML-review handoff.
5. Repeat until the author explicitly approves the rendered draft.

When a feedback request conflicts with evidence or the safety boundary, explain the exact unsupported part and offer source-safe wording instead of silently inventing it.

Exit criterion: author approves the current rendered draft content and image use.

## 5. Final publication approval — ask separately

Before converting a preview into a publishable article, ask this exact question:

```md
## [최종 게시 확인 — <프로젝트명> / v<N>]

현재 HTML 초안과 승인 이미지 기준으로 `<target route>`에 게시 가능한 원고로 전환할까요?

- 게시 원고 반영: 예 / 아니오
- Git 커밋: 별도 지시 필요
- Push·배포: 별도 지시 필요
```

- `예`, `게시 승인`, `ㅇㅇ`, `ㄱㄱ` at this stage authorizes the content source change only.
- Do not commit, push, or claim a live deployment unless the author explicitly requests those actions and they actually succeed.
- If author declines, leave the preview/draft unpublished and report its local location.

## 6. Publish, verify, and report only after approval

After final content approval:

1. Convert/remove the draft status in the intended post only.
2. Run formatting, typecheck, relevant tests, Quartz/static build, and `git diff --check`.
3. Inspect the final built local route again at desktop and 390px mobile; exercise links and inspect images.
4. If directed, commit with the correct repository identity; if separately directed, push and verify the deployment route before claiming it is live.
5. Report in this compact form:

```md
✅ 게시 원고: <route/title>
✅ 승인 근거: v<N> HTML 검토 및 최종 게시 확인
✅ 검증: [actual build/check/desktop/mobile results]
⏳ Git: [uncommitted / commit hash]
⏳ 배포: [not requested / requested result]
next: 다음 포스팅은 새 준비 단계에서 소스·이미지·특징을 입력받아 시작합니다.
```

## Common pitfalls

1. **Generating before the author provides materials.** A route name or repo alone is not preparation approval. Open stage 0 and wait.
2. **Treating `ㅇㅇ` as universal approval.** Tie it to the most recently presented named stage and version only.
3. **Using Git history as a fictional diary.** Commits show changes, not emotions or certain motives. Mark inference as inference or ask.
4. **Making Toy records code-first.** `/blog/projects` is a public product/work record; move the engineering narrative to `/blog/dev`.
5. **Calling any AI use “AI-driven development.”** State only the evidenced task and preserve the developer’s selection and verification role.
6. **Previewing Markdown only.** The author asked to proofread the rendered article: build actual HTML and inspect both desktop and mobile.
7. **Using convenience images.** Never publish screenshots, people, admin views, or private data without project-specific approval.
8. **Publishing during a revision loop.** A clean build does not replace final author approval.
9. **Mixing posts.** Finish, pause, or cancel the current post before opening a separate project’s preparation gate.

## Verification checklist

- [ ] Target is identified as Toy/Career project record or developer story.
- [ ] Stage 0 preparation input was completed for this specific post.
- [ ] Every image is approved, excluded, or held for review; no held image is published.
- [ ] Claims have an evidence map; unknown facts are removed and inferences are qualified.
- [ ] Story proposal was author-approved before the full draft.
- [ ] Each draft version has a real HTML preview inspected at desktop and 390px mobile.
- [ ] Explicit final publication approval exists for the rendered version.
- [ ] Formatting, checks, build, diff check, final route, links, and images were verified.
- [ ] Commit/push/deployment are reported only when separately authorized and actually completed.
