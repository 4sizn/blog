---
title: 4sizn Blog 시각적 모션 개선 구현 기록
stage: implementation
status: completed
created: 2026-08-11
updated: 2026-08-11
repo: 4sizn-blog
branch: main
work_class: new-function
---

# 4sizn Blog 시각적 모션 개선 구현 기록

> 근거: `design.md` (`status: approved`) + 사용자 4sizn의 2026-08-11 구현 승인

## 1. 착수 게이트 통과 기록

| 단계             | 확인                                                    | 결과                                                                              |
| ---------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------- |
| SDLC 설계 게이트 | `design.md`                                             | `status: approved` 확인                                                           |
| 저장소 규칙      | root `AGENTS.md` / `CLAUDE.md` / `CONTRIBUTING.md` 탐색 | 별도 저장소 지침 파일 없음                                                        |
| 작업 격리        | 현재 `main` 작업 트리                                   | 사용자가 현재 작업 트리에서 승인한 단일 사이트 변경; 브랜치 전환/커밋/푸시 미수행 |
| 범위             | requirements/plan/design                                | `blog/index`만, 새 이미지·새 런타임 의존성·URL 구조 변경 없음                     |
| 사용자 선택      | Discord 승인                                            | “ㅇㅇ 승인”으로 설계 및 구현 진행 승인                                            |

## 2. 구현 단위별 진행

| WBS            | 내용                                                                             | 상태 | 커밋   | 비고                                                   |
| -------------- | -------------------------------------------------------------------------------- | ---- | ------ | ------------------------------------------------------ |
| W-01/W-02      | 기존 Quartz `nav` lifecycle과 component resource 계약 조사, motion DOM hook 추가 | 완료 | 미커밋 | `data-motion-root`, `data-motion`, default-thumb class |
| W-03           | `IntersectionObserver` 기반 최초 viewport reveal 구현                            | 완료 | 미커밋 | 첫 reveal 뒤 `unobserve`, SPA cleanup 등록             |
| W-04           | 카드 hover/focus/active 및 `더 보기 →` 피드백 구현                               | 완료 | 미커밋 | transform/opacity 중심, focus-visible outline 유지     |
| W-05           | reduced-motion/no-JS/mobile fallback 구현                                        | 완료 | 미커밋 | mobile 실제 검증으로 threshold `0.12 → 0.05` 조정      |
| W-06/W-07/W-08 | 테스트·SPA·시각 E2E·build 검증                                                   | 완료 | 미커밋 | 결과는 `test-runs/20260811-site-motion.md`             |

## 3. 변경 파일

| 경로                                                     | 성격 | 요구사항                    |
| -------------------------------------------------------- | ---- | --------------------------- |
| `quartz/components/HomeCategoryThumbnails.tsx`           | 수정 | FR-01, FR-02, FR-03, FR-07  |
| `quartz/components/scripts/homeCategoryMotion.ts`        | 신규 | FR-01, FR-06, NFR-05        |
| `quartz/components/scripts/homeCategoryMotion.inline.ts` | 신규 | FR-01, FR-05, FR-06, NFR-05 |
| `quartz/components/scripts/homeCategoryMotion.test.ts`   | 신규 | FR-01, FR-06                |
| `quartz/components/styles/homeCategoryThumbnails.scss`   | 수정 | FR-02, FR-03, FR-04, FR-06  |
| `quartz/styles/custom.scss`                              | 수정 | FR-05, NFR-01               |

## 4. 설계 대비 변경

| 설계                      | 실제                              | 이유                                                                                                                                                   |
| ------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Observer threshold `0.12` | `0.05`                            | 390px viewport에서 2,308px 높이의 첫 category block이 12% 교차 전까지 숨겨지는 실제 문제를 발견했다. 5%에서 첫 card가 최초 화면에 표시됨을 재검증했다. |
| after-DOM `nav`만 처리    | `nav` + DOMContentLoaded fallback | 초기 문서 로드와 Quartz SPA navigation 모두에서 setup을 보장한다.                                                                                      |

설계서 §9에 threshold 조정 근거를 갱신했다. 범위/아키텍처를 바꾸지 않는 보정이므로 추가 설계 승인은 요구하지 않는다.

## 5. 검증

- `npx tsx --test quartz/components/scripts/homeCategoryMotion.test.ts` → 2/2 PASS
- `npm test` → 71 tests PASS
- `npx tsc --noEmit` → PASS (`npm run check`의 첫 단계)
- scoped `npx prettier --check` → PASS
- `npx quartz build` → 53 input files, 258 emitted files, PASS
- headless Chromium E2E → desktop viewport entry/scroll reveal, hover transform, focus outline, mobile 390px overflow 없음, reduced-motion, no-JS, SPA Home→Back 확인
- `git diff --check` → PASS

## 6. 미해결

- 전체 `npm run check`는 저장소에 이미 존재하는 49개 Prettier warning 때문에 exit 1이다. 이번 변경 범위 파일의 scoped Prettier check는 PASS이며 TypeScript 단계도 PASS했다.
- 커밋, push, 배포는 사용자 요청이 없어 수행하지 않았다.
