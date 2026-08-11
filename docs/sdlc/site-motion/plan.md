---
title: 4sizn Blog 시각적 모션 개선 프로젝트 계획서
stage: plan
status: approved
created: 2026-08-11
updated: 2026-08-11
approved_by: 4sizn
approved_at: 2026-08-11
repo: 4sizn-blog
branch: main
---

# 4sizn Blog 시각적 모션 개선 프로젝트 계획서

> 근거: `requirements.md` (`status: approved`, 2026-08-11 4sizn 승인)

## 1. 목표 · 완료 정의

**목표**

`blog/index`의 Log, DEV/Daily_Read, Releases 카드 목록에 읽기 흐름을 돕는 짧은 모션을 더한다. 구현은 Quartz의 현재 CSS 중심 구조를 우선 사용하고, 새 런타임 의존성 없이 reduced-motion, 키보드 탐색, 다크/라이트, 모바일을 함께 보장한다.

**Done 정의**

- [ ] `HomeCategoryThumbnails.tsx`가 카테고리 및 카드별 모션 대상에 안정적인 클래스 또는 data attribute를 제공한다.
- [ ] 카테고리 reveal, 카드 hover/focus/active, `더 보기` 링크 피드백이 FR-01~FR-05의 duration·property 기준을 충족한다.
- [ ] `prefers-reduced-motion: reduce`에서 자동 이동/확대/순차 진입이 모두 제거되고 focus/hover의 시각적 대비는 유지된다.
- [ ] `blog/index`의 카테고리 URL, 카드 URL, 라벨, 정적 HTML 링크가 변하지 않는다.
- [ ] Node 22.19.0/npm 10.9.3에서 `npx quartz build`가 통과한다.
- [ ] 다크, 라이트, reduced-motion, 390px 모바일의 실제 브라우저 증거를 캡처·이미지 검증·macOS Preview 표시로 남긴다.

## 2. WBS

| ID   | 작업                                                                                                                                           | 산출물                                                             | 선행       | 담당           | 예상  |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------- | -------------- | ----- |
| W-01 | 현행 모션과 DOM 계약을 기준선으로 기록한다. `fade-up` 적용 대상, `HomeCategoryThumbnails`의 카테고리/카드/링크 구조, 링크 URL을 캡처한다       | `design.md`의 기준선 표 + 브라우저 evidence                        | -          | Hermes         | 0.5h  |
| W-02 | 카테고리와 카드 단위의 식별 가능한 CSS hook을 최소 변경으로 설계한다. SPA 탐색에서도 숨김 상태가 남지 않는 초기/종료 상태를 정한다             | `design.md`의 DOM·상태 계약                                        | W-01       | Hermes         | 0.5h  |
| W-03 | CSS motion token을 한 곳에 정하고, 카테고리 최초 진입 reveal과 500ms 이하 stagger를 구현한다                                                   | `quartz/styles/custom.scss` 또는 역할별 SCSS의 token/selector 변경 | W-02       | Hermes         | 0.75h |
| W-04 | 카드의 hover, focus-visible, active 피드백과 `더 보기` 링크의 방향성 피드백을 구현한다. transform/opacity 외 속성 애니메이션은 사용하지 않는다 | `quartz/components/styles/homeCategoryThumbnails.scss`             | W-02       | Hermes         | 0.75h |
| W-05 | reduced-motion 규칙과 모바일 레이아웃을 구현한다. 자동 reveal·image transform은 정지시키고 색상·outline 기반 상태는 보존한다                   | SCSS media query + 검증용 상태표                                   | W-03, W-04 | Hermes         | 0.5h  |
| W-06 | 정적 출력, URL, 키보드 접근성, SPA back/forward를 실제 브라우저에서 검증한다                                                                   | `implementation.md`의 실행 기록                                    | W-03~W-05  | Hermes         | 0.75h |
| W-07 | 다크/라이트/reduced-motion/390px 모바일의 최종 화면을 캡처하고 이미지 검증 및 Preview 표시를 수행한다                                          | `.mcp/screenshots` 또는 안정적인 스크린샷 경로 + `test-runs/` 기록 | W-06       | Hermes + 4sizn | 0.75h |
| W-08 | build, Lighthouse accessibility, diff review를 실행하고 결과를 독립 review/test 산출물로 정리한다                                              | `reviews/`, `test-plan.md`, `test-runs/`                           | W-06, W-07 | Hermes         | 0.75h |

### 2-1. 선행 관계

```text
W-01 → W-02 → (W-03 + W-04) → W-05 → W-06 → W-07 → W-08
```

- W-03과 W-04는 W-02 이후 병렬 검토 가능하지만 같은 SCSS 파일을 건드릴 수 있으므로 실제 편집은 순차로 한다.
- W-05는 motion 구현 완료 후에만 유효하게 검증할 수 있다.
- W-07의 시각 증거 없이는 W-08에서 완료 판정을 내리지 않는다.

### 2-2. 요구사항 커버리지

| 요구사항              | WBS                    | 요구사항             | WBS              |
| --------------------- | ---------------------- | -------------------- | ---------------- |
| FR-01 카테고리 reveal | W-01, W-02, W-03, W-06 | FR-05 모션 언어      | W-01, W-03, W-05 |
| FR-02 카드 피드백     | W-02, W-04, W-06       | FR-06 reduced-motion | W-05, W-06, W-07 |
| FR-03 더 보기 링크    | W-02, W-04, W-06       | FR-07 URL/SEO 보존   | W-01, W-06, W-08 |
| FR-04 반복 썸네일     | W-01, W-04, W-07       | FR-08 시각 E2E       | W-07, W-08       |
| NFR-01 성능           | W-03, W-04, W-08       | NFR-04 시각 품질     | W-06, W-07       |
| NFR-02 접근성         | W-04, W-05, W-06, W-08 | NFR-05 SPA 안정성    | W-02, W-06       |
| NFR-03 호환성         | W-05, W-07             |                      |                  |

**미커버 요구사항: 0건**

## 3. 일정

일정은 사용자 승인 이후의 구현 세션 단위로 잡는다. 각 세션에 검증과 기록 시간을 포함한다.

| 세션               | 포함 WBS         | 예상  | 산출물                                                 | 종료 판정                                               |
| ------------------ | ---------------- | ----- | ------------------------------------------------------ | ------------------------------------------------------- |
| S1 - 기준선과 설계 | W-01, W-02       | 1h    | `design.md`                                            | motion 대상/상태/DOM 계약과 보존 URL이 명시됨           |
| S2 - 구현          | W-03, W-04, W-05 | 2h    | SCSS 및 필요한 최소 컴포넌트 변경, `implementation.md` | desktop/mobile/reduced-motion에서 모션이 각 역할을 수행 |
| S3 - 검증과 증거   | W-06, W-07, W-08 | 2.25h | test/review 문서, 스크린샷, Preview 표시               | 빌드·a11y·SPA E2E·다크/라이트/reduced-motion 증거 확보  |

**총 예상: 5.25시간**

## 4. 리스크

| ID   | 리스크                                                                             | 영향 | 발생 가능성 | 대응                                                                                               | 트리거                                                              |
| ---- | ---------------------------------------------------------------------------------- | ---- | ----------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| R-01 | Quartz SPA 탐색 후 reveal class가 재적용되어 카드가 반복 점멸하거나 숨은 채 남는다 | 상   | 중          | 문서 로드와 SPA navigation을 분리해 검증하고, CSS 초기 상태가 영구 숨김을 만들지 않도록 설계한다   | 글 방문 후 back에서 카드 opacity 또는 transform이 복구되지 않음     |
| R-02 | 키보드 focus와 마우스 hover의 효과가 달라 접근성/일관성이 깨진다                   | 중   | 중          | 공통 selector와 `:focus-visible`을 함께 정의하고 Tab E2E를 실행한다                                | Tab 이동에서 카드 또는 더 보기 링크의 경계가 보이지 않음            |
| R-03 | reduced-motion에서 CSS animation의 시작 상태가 남아 콘텐츠가 사라진다              | 상   | 중          | reduce media query에 animation과 transform/opacity 종료 상태를 명시한다                            | reduce emulation에서 카드가 투명하거나 이동된 채 표시됨             |
| R-04 | 카드 이미지 확대가 반복 기본 썸네일을 더 눈에 띄게 만들어 읽기를 방해한다          | 중   | 중          | 기본 이미지와 실제 socialImage 카드를 함께 눈검증하고 scale을 낮추거나 기본 이미지 효과를 분리한다 | 한 화면에 같은 기본 이미지가 2장 이상 과도하게 움직여 시선이 분산됨 |
| R-05 | CSS 변경이 다크/라이트 대비 또는 390px 카드 레이아웃을 훼손한다                    | 중   | 중          | 두 테마와 mobile viewport를 모두 캡처하고 Lighthouse/accessibility로 확인한다                      | 제목 잘림, 대비 부족, 가로 overflow가 확인됨                        |
| R-06 | 빌드가 잘못된 Node/npm 선택으로 실패한다                                           | 중   | 상          | 명령마다 Node v22.19.0/npm 10.9.3 경로를 명시한다                                                  | `npm EBADENGINE` 또는 Node 22 미만 출력                             |

## 5. 자원 · 의존

| 항목          | 내용                                                          | 확보 여부 |
| ------------- | ------------------------------------------------------------- | --------- |
| 인력          | 4sizn 승인/눈검증, Hermes 구현·검증                           | 확보      |
| 코드 기반     | Quartz v4.5.2, Preact, 기존 SCSS 모션                         | 확보      |
| 브라우저      | Chrome DevTools, 테마/viewport/reduced-motion emulation       | 확보      |
| Node 도구체인 | `~/.nvm/versions/node/v22.19.0/bin`의 Node 22.19.0/npm 10.9.3 | 확보      |
| 외부 런타임   | 없음. 새 Motion/GSAP 패키지는 범위 밖                         | 불필요    |

## 6. Redmine 일감 매핑

해당 없음. 이 저장소는 이 작업에 Redmine/Jira/GitHub Issue를 사용하지 않는다. WBS는 본 문서와 이후 `implementation.md`로 추적한다.

## 7. 승인

- [x] WBS가 요구사항을 빠짐없이 덮는가
- [x] 각 작업의 완료 판정이 가능한가
- [x] 일정에 검증·리뷰 시간이 포함되었는가
- [x] `blog/index` 단일 페이지 및 이미지 제작 제외 범위가 유지되는가

**2026-08-11 4sizn 승인 완료** (`status: approved`). 다음 단계는 `/sdlc:design`.
