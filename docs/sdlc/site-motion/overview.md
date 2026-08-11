---
title: 4sizn Blog 시각적 모션 개선
stage: overview
status: draft
created: 2026-08-11
updated: 2026-08-11
issue: []
---

# 4sizn Blog 시각적 모션 개선

라이브 블로그 `https://4sizn.github.io/blog/`의 기존 편집형 다크 테마와 정보 구조를 유지하면서, 카테고리 카드와 탐색 흐름에 의미 있는 모션을 더한다. 현재 로드 시 `fade-up` 진입 모션은 있으나, 카드가 한 화면 안에서 반복되고 기본 썸네일이 많이 겹쳐 시각적 리듬과 콘텐츠 간 구분이 약하다. 이 작업은 읽기를 방해하지 않는 짧고 접근 가능한 모션으로 각 콘텐츠 묶음의 위계를 강화한다.

## 기본 정보

| 항목          | 값                                                                 |
| ------------- | ------------------------------------------------------------------ |
| 프로젝트 slug | `site-motion`                                                      |
| 대상 레포     | `4sizn-blog` (`/Users/hsshin-rsupport/Documents/lotus/4sizn-blog`) |
| 대상 화면     | `https://4sizn.github.io/blog/` (`blog/index`)                     |
| 기준 브랜치   | `main`                                                             |
| 관련 이슈     | 없음. 사용자 구두 요청                                             |
| 시작          | 2026-08-11                                                         |
| 목표 완료     | 미정                                                               |

## 설계 읽기

편집형 개인 블로그를 위한 보존형 리디자인이다. 현재 다크 테마와 에메랄드 강조색, 텍스트 중심의 읽기 경험을 유지하며, `DESIGN_VARIANCE 6 / MOTION_INTENSITY 5 / VISUAL_DENSITY 4`를 기준으로 한다.

## 단계 상태판

| 단계     | 산출물                            | status    | updated    | 비고                                                        |
| -------- | --------------------------------- | --------- | ---------- | ----------------------------------------------------------- |
| 요구사항 | requirements.md                   | approved  | 2026-08-11 | 4sizn 승인 완료. `blog/index` 단일 페이지, 이미지 제작 제외 |
| 계획     | plan.md                           | approved  | 2026-08-11 | 4sizn 승인 완료                                             |
| 설계     | design.md                         | approved  | 2026-08-11 | 4sizn 승인 완료                                             |
| 구현     | implementation.md                 | completed | 2026-08-11 | motion 구현 및 TDD 완료                                     |
| 테스트   | test-runs/20260811-site-motion.md | completed | 2026-08-11 | desktop/mobile/reduced/no-JS/SPA E2E 및 Preview 증거 완료   |
| 배포     | -                                 | -         | -          |                                                             |

## 미해결

- 설계상 새 런타임 의존성은 사용하지 않는다. Quartz `nav` 이벤트 + `IntersectionObserver` + CSS로 처리한다.
- `IntersectionObserver`의 첫 `nav` 연결 시점은 구현 단계의 실제 브라우저에서 검증한다.

## 관련 문서

- `requirements.md`
- 기존 레이아웃: `../../../../quartz.layout.ts`
- 대상 컴포넌트: `../../../../quartz/components/HomeCategoryThumbnails.tsx`
- 기존 모션: `../../../../quartz/styles/custom.scss`
