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
| 설계 | design.md | draft | 2026-08-11 | 컴포넌트 9개 · 설계 결정 12건 · 미추적 0건 · 미확인 0건. 승인 대기 |
| 구현 | — | — | — | 설계 승인 대기로 블록 |
| 테스트 | — | — | — | 미착수 |
| 배포 | — | — | — | 미착수 |

## 미해결

- 요구사항 미확인 0건 — 6건 모두 2026-08-11 답변으로 확정 (`requirements.md` 7절 D-01~D-06)
- 릴리즈 노트 골격 확정 — 사용자 제안 + 보완 4종, `requirements.md` 부록 A
- `requirements.md` 승인 완료 (2026-08-11)
- `plan.md` 승인 완료 (2026-08-11)
- `design.md` 승인 대기 (status: draft) — 미확인 0건. 2건 모두 2026-08-11 확정 (DD-11·DD-12)
- 설계에서 발견: `sync-releases.mjs` 의 placeholder 치환이 정의 순서에 의존해 우연히 동작 중이다. 키를 추가하면 깨진다 (DD-03에서 고정)
- 승인 후 범위가 두 번 늘었다: FR-12·FR-13 추가 → 이후 FR-10 필수 승격(이미지). 각 문서 변경 이력 참조
- **모든 릴리즈 노트에 이미지 1장 이상 필수** (FR-10). `ai-config-monitor` 는 이미지 자산이 전무해 터미널 UI를 직접 캡처해야 한다 (W-18, 4h)
- `4sizn-blog` v1.0.0·v1.0.1은 2월 커밋을 재현 빌드해 캡처한다 — 현재 화면을 당시 것으로 쓰지 않는다 (W-19, D-11)
- 문장 작성은 `humanize-korean`(im-not-ai 플러그인 v2.3.0) 경유가 **필수**다. 스킬이 없으면 우회하지 말고 멈춘다 (R-11)
- `humanize-korean` 이 만드는 `_workspace/` 가 저장소를 오염시킬 수 있다 — `.gitignore` 또는 저장소 밖 실행으로 처리 (R-10, W-17)
- 달력 일정 없음 확정 (2026-08-11) — 기준일은 각 대상의 소스 마지막 업데이트 일자 (`plan.md` 3-1)
- 수동 작성 글 4건은 Out of scope라 작성자 섹션·한국어 헤딩이 남는다. 골격과 일시적으로 불일치한다 — 별건으로 판단
- 자동 동기화 워크플로 경로 불일치 — 새 릴리즈가 커밋·푸시에 도달하지 못한다 (FR-06에서 처리)
- 별건: `main` 푸시 배포가 `DEPLOY_TOKEN` 없이 실패하는 문제는 이 프로젝트 범위 밖

## 관련 문서

- `requirements.md` — 요구사항 정의서
- 프로젝트 규칙: `../../CLAUDE.md`
- 자동 동기화: `../../scripts/sync-releases.mjs`, `../../.github/workflows/sync-releases.yml`
- 현행 템플릿: `../../content/templates/new_releases.md`
- 기존 릴리즈 노트 11건: `../../content/blog/releases/`
