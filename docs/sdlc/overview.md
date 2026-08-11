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
| 구현 | implementation.md | draft | 2026-08-11 | **S1~S5 완료 — 20/20**. 글 9건 보정·이미지 6장 |
| 테스트 | — | — | — | 미착수 |
| 배포 | — | — | — | 미착수 |

## 미해결

**진행** — 상류 3단계 승인 완료. 구현 **20/20 완료** (S1~S5).
릴리즈 노트 9건이 새 골격으로 다시 쓰였고, 각 글에 이미지가 붙었다.

**다음 회차에 남은 것**

- **W-09 미완** — 신규 세션에서 skill 발동 3회 테스트 (같은 세션에서는 검증 불가)
- 수동 작성 글 4건은 Out of scope라 작성자 섹션·한국어 헤딩이 남아 골격과 어긋난다 — 별건
- `/sdlc:review`·`/sdlc:test` 미실행 — 필요하면 별도 회차

**보류·별건**

- **`DEPLOY_TOKEN` secret 이 비어 있다.** `blog` 저장소에 등록된 secret이 하나도 없어
  `deploy-main-site.yaml` 이 `exit 1` 로 끝난다 (2026-08-11 로그 확인). 지금은 로컬에서
  `4sizn.github.io` 를 클론해 `public/` 을 갈아끼우는 방식으로 배포한다 — **push 마다 수동 작업이 필요하다**.
  근본 해결은 `4sizn.github.io` 쓰기 권한 PAT 를 만들어 secret 에 등록하는 것이고, 토큰 생성은 사용자만 할 수 있다

**해소됨** (기록용)

- ~~워크플로 경로 불일치~~ → W-05 (`594ca32`)
- ~~placeholder 치환이 정의 순서에 의존~~ → DD-03 적용, 길이 내림차순 + `split/join` (`8351668`)
- ~~릴리즈 동기화 누락 v1.2.1·v1.2.3~~ → W-15로 초안 회수 (`8351668`)
- ~~`CLAUDE.md` 경로 4곳 오류~~ → W-14 (`78a2993`)
- ~~`.gitignore` 가 `.claude/skills/` 전체를 무시해 skill 이 추적되지 않았다~~ → 패턴 축소 (`a700954`)

## 관련 문서

- `requirements.md` — 요구사항 정의서
- 프로젝트 규칙: `../../CLAUDE.md`
- 자동 동기화: `../../scripts/sync-releases.mjs`, `../../.github/workflows/sync-releases.yml`
- 현행 템플릿: `../../content/templates/new_releases.md`
- 기존 릴리즈 노트 11건: `../../content/blog/releases/`
