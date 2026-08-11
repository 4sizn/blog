---
title: 블로그 릴리즈 노트 골격 + 작성 skill
stage: overview
status: draft
created: 2026-08-11
updated: 2026-08-11
issue: []
---

# 블로그 릴리즈 노트 골격 + 작성 skill

4sizn 블로그의 릴리즈 노트는 지금 두 갈래로 만들어진다. GitHub 릴리즈를 긁어 커밋 메시지를 나열하는
자동 경로와, 사람이 처음부터 쓰는 수동 경로다. 두 결과물의 품질 격차가 크고, 수동 글끼리도 섹션 구성이
매번 다르다. 이 프로젝트는 **모든 릴리즈 노트가 공유하는 골격(템플릿)** 을 정의하고, 그 골격대로 쓰게 하는
**skill** 을 만들어 두 경로를 하나의 통로로 합친다.

## 기본 정보

| 항목 | 값 |
|------|-----|
| 프로젝트 slug | `blog-release-note` |
| 대상 저장소 | `4sizn-blog` (`/Users/hsshin-rsupport/Documents/lotus/4sizn-blog`) |
| 기준 브랜치 | `main` |
| 관련 이슈 | 없음 (이슈 트래커 미사용, 사용자 구두 요청) |
| 시작 | 2026-08-11 |
| 목표 완료 | 미정 |

## 단계 상태판

| 단계 | 산출물 | status | updated | 비고 |
|------|--------|--------|---------|------|
| 요구사항 | requirements.md | approved | 2026-08-11 | 4sizn 승인. 골격은 부록 A |
| 계획 | plan.md | approved | 2026-08-11 | 4sizn 승인. WBS 20건 · 리스크 14건 · 미커버 0건 · 29h |
| 설계 | design.md | approved | 2026-08-11 | 4sizn 승인. 컴포넌트 9개 · 설계 결정 12건 · 미추적 0건 |
| 구현 | implementation.md | draft | 2026-08-11 | S1·S2 완료 — 7/20. 다음 S3 (skill) |
| 테스트 | — | — | — | 미착수 |
| 배포 | — | — | — | 미착수 |

## 미해결

**진행** — 상류 3단계 승인 완료. 구현 S1·S2 끝, WBS 7/20. 다음은 S3 (skill 작성).

**남은 일에 딸린 위험**

- 초안 2건(`ai-config-monitor` v1.2.1·v1.2.3)이 `draft: true` 로 대기 중이다. W-16에서 완성한다.
  방치되면 영구 미게시가 된다 (R-03)
- 문장 작성은 `humanize-korean`(im-not-ai 플러그인 v2.3.0) 경유가 **필수**다. 스킬이 없으면 우회하지 말고 멈춘다 (R-11)
- `humanize-korean` 이 만드는 `_workspace/` 가 저장소를 오염시킬 수 있다 — `.gitignore` 처리 (R-10, W-17)
- **모든 릴리즈 노트에 이미지 1장 이상 필수** (FR-10). `ai-config-monitor` 는 이미지 자산이 전무해
  터미널 UI를 직접 캡처해야 한다 (W-18, 4h)
- `4sizn-blog` v1.0.0·v1.0.1은 2월 커밋을 재현 빌드해 캡처한다 — 현재 화면을 당시 것으로 쓰지 않는다 (W-19, D-11)
- 초안의 `description` 은 저장소 설명이 그대로 들어간다. 릴리즈별로 사람이 고쳐야 한다 (W-08에 넣을 항목)

**보류·별건**

- 커밋 8건이 `main` 에 쌓여 있고 **push 하지 않았다** — 사용자 지시로 구현 완료 후 한 번에
- 수동 작성 글 4건은 Out of scope라 작성자 섹션·한국어 헤딩이 남는다. 골격과 일시적 불일치 — 별건
- `main` 푸시 배포가 `DEPLOY_TOKEN` 없이 실패하는 문제는 이 프로젝트 범위 밖

**해소됨** (기록용)

- ~~워크플로 경로 불일치~~ → W-05 (`594ca32`)
- ~~placeholder 치환이 정의 순서에 의존~~ → DD-03 적용, 길이 내림차순 + `split/join` (`8351668`)
- ~~릴리즈 동기화 누락 v1.2.1·v1.2.3~~ → W-15로 초안 회수 (`8351668`)
- ~~`CLAUDE.md` 경로 4곳 오류~~ → W-14 (`78a2993`)

## 관련 문서

- `requirements.md` — 요구사항 정의서
- 프로젝트 규칙: `../../CLAUDE.md`
- 자동 동기화: `../../scripts/sync-releases.mjs`, `../../.github/workflows/sync-releases.yml`
- 현행 템플릿: `../../content/templates/new_releases.md`
- 기존 릴리즈 노트 11건: `../../content/blog/releases/`
