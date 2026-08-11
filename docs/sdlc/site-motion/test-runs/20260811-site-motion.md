---
title: 4sizn Blog 시각적 모션 E2E 실행 기록
stage: test
status: completed
created: 2026-08-11
updated: 2026-08-11
---

# 4sizn Blog 시각적 모션 E2E 실행 기록

## 실행 환경

- Local URL: `http://localhost:8080/blog/`
- Node: `v22.19.0`, npm `10.9.3`
- Quartz: `v4.5.2`
- Browser: Playwright Chromium (desktop 1280×900, mobile 390×844)

## 결과

| 검증                | 결과 | 실제 관찰                                                                                  |
| ------------------- | ---- | ------------------------------------------------------------------------------------------ |
| 단위 테스트         | PASS | reduced-motion은 observer를 만들지 않고 모두 reveal; intersecting block만 reveal/unobserve |
| 전체 테스트         | PASS | `npm test`: 71 passed, 0 failed                                                            |
| Desktop 최초 진입   | PASS | 첫 block `is-revealed`, 하단 block은 viewport 대기                                         |
| Desktop 하단 스크롤 | PASS | 3개 block 모두 `is-revealed`, opacity 1, transform none                                    |
| Hover               | PASS | 첫 card computed transform이 translateY 방향으로 변함                                      |
| Keyboard focus      | PASS | `더 보기` link의 computed outline style `solid`                                            |
| Mobile 390px        | PASS | 첫 Log block reveal, horizontal overflow false, card/더 보기 표시                          |
| reduced-motion      | PASS | `data-home-motion=reduced`; 3개 block 모두 opacity 1/transform none                        |
| no-JS               | PASS | `data-home-motion` 미부여; 3개 block opacity 1                                             |
| SPA Home → Back     | PASS | `/` 이동 후 `/blog/` 복귀, motion root ready, 18 cards 존재                                |
| Static build        | PASS | 53 input files, 258 emitted files                                                          |

## 시각 증거

| 요구사항                         | 파일                                             | 자체 눈검증                                                          |
| -------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------- |
| Desktop 카드/hover/focus/더 보기 | `.mcp/screenshots/site-motion-desktop-ready.png` | 정상 card border·grid·이미지·텍스트, clipping/overlap 없음           |
| Mobile 390px + 최초 reveal       | `.mcp/screenshots/site-motion-mobile.png`        | Log 제목, 더 보기 arrow, 첫 card가 intro 아래 표시되고 overflow 없음 |

두 PNG는 macOS Preview로 열어 사용자 확인용으로 표시했다.

## 알려진 상태

- 전체 `npm run check`는 기존 저장소의 49개 Prettier warning으로 실패한다. 이번 변경 파일만 대상으로 한 Prettier check는 PASS했다.
- 실사이트 배포는 수행하지 않았다.
