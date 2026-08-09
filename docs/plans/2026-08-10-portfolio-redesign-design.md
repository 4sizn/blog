---
title: "포트폴리오 사이트 확장 설계"
date: 2026-08-10
status: approved
---

# 포트폴리오 사이트 확장 설계

블로그 전용이던 사이트를 Home / Project / Blog 세 섹션의 포트폴리오 사이트로 확장한다.
[victoreke.com](https://victoreke.com/)의 톤을 참고하되, Blog는 기존 Quartz v4 기능을 그대로 유지한다.

## 배경

현재 사이트는 Quartz v4 기본 구조 위에 홈 카테고리 썸네일 하나만 얹은 블로그다.
프로젝트를 보여줄 자리가 없고, 첫 화면이 곧 글 목록이라 "누가 만들었고 무엇을 만들었는지"가 드러나지 않는다.

## 결정 사항

| 항목 | 결정 | 근거 |
| --- | --- | --- |
| 아키텍처 | Quartz 단일 빌드 안에서 전부 구현 | 빌드·배포가 하나로 유지되고 SPA 전환·검색이 세 섹션에 모두 적용된다 |
| Blog 룩 | 색·폰트는 전체 통일, 기능은 그대로 | 세 섹션이 한 사이트로 보이면서 explorer·search·graph는 손대지 않는다 |
| 헤딩 폰트 | Space Grotesk | victoreke의 Incognito는 배포 불가. 기하학적 인상이 가장 가깝고 한글과 섞어도 위화감이 적다 |
| 한글 폰트 | Pretendard | Inter 기반이라 영문과 획 굵기·넓이가 거의 일치한다 |
| Blog 진입 | `/blog` 랜딩 신규 생성 | 홈을 포트폴리오 히어로로 비우고 글 목록을 분리한다 |
| Project 소스 | `content/projects/*.md` frontmatter | 프로젝트별 상세 페이지로 확장하기 쉽다 |
| 잔디 | 빌드 타임 fetch → JSON 임베드 | 최종 사이트가 정적으로 유지되고 연도 탭을 재현할 수 있다 |

## URL 구조

```
/                → Home     히어로 + 프로젝트 하이라이트 + 최근 글 + 잔디
/projects        → Project  카드 그리드
/blog            → Blog 랜딩 카테고리 썸네일 (현재 홈에 있는 것을 이동)
/log/*           → 글 페이지 기존 Quartz 레이아웃 그대로
/dev/*
/releases/*
```

## 컴포넌트

`quartz/components/` 아래에 신규 Preact 컴포넌트를 추가한다.

| 컴포넌트 | 역할 |
| --- | --- |
| `SiteNav` | 상단 고정 네비 — 로고, Home/Project/Blog, 테마 토글 |
| `Hero` | 큰 헤딩, 소개 문단, 소셜 배지 |
| `ProjectGrid` | `content/projects/*.md` frontmatter → 카드 그리드 |
| `ContributionGraph` | 잔디 + 연도 탭 |
| `RecentPosts` | 최근 글 카드 리스트 |
| `SiteFooter` | Built with + 카피라이트 |

기존 `HomeCategoryThumbnails`는 삭제하지 않고 `/blog` 랜딩으로 옮겨 재사용한다.

## 레이아웃 분기

`quartz.layout.ts`에서 이미 쓰고 있는 `ConditionalRender` 패턴을 확장한다.
Home·Project·Blog 랜딩에서는 좌측 explorer와 우측 graph·TOC를 숨기고 풀폭으로 두고,
글 페이지에서는 현재 레이아웃을 그대로 유지한다.

## 데이터 흐름

```
content/projects/*.md ──frontmatter──→ ProjectGrid
contentIndex.json ────────────────────→ RecentPosts, HomeCategoryThumbnails
scripts/fetch-contributions.mjs ──→ quartz/static/contributions.json ──→ ContributionGraph
```

잔디 데이터는 `github-contributions-api.jogruber.de`에서 받는다. 토큰이 필요 없고 연도별 조회를 지원한다.
fetch가 실패하면 기존 JSON을 그대로 두고 빌드를 계속한다 — 네트워크 때문에 배포가 막히지 않게 한다.
갱신은 `sync-releases.yml`과 같은 방식으로 GitHub Actions 스케줄에 얹는다.

## 디자인 토큰

Quartz의 색 토큰 9개에 victoreke의 zinc + 민트 팔레트를 매핑한다.

| 토큰 | 역할 | 다크 | 라이트 |
| --- | --- | --- | --- |
| `light` | 페이지 배경 | `#18181b` | `#ffffff` |
| `lightgray` | 보더·구분선 | `#27272a` | `#e4e4e7` |
| `gray` | 흐린 텍스트·메타 | `#52525b` | `#a1a1aa` |
| `darkgray` | 본문 텍스트 | `#a1a1aa` | `#3f3f46` |
| `dark` | 헤딩·강조 | `#ffffff` | `#000000` |
| `secondary` | 링크·액센트 | `#33e092` | `#059669` |
| `tertiary` | 호버 | `#6ee7b7` | `#34d399` |
| `highlight` | 내부링크 배경 | `rgba(51,224,146,.10)` | `rgba(5,150,105,.10)` |

라이트 모드 액센트만 `emerald-600`으로 낮췄다. 민트 `#33e092`는 흰 배경에서 대비비가 1.9:1이라 본문 링크로 쓸 수 없다.
다크 모드의 `#33e092` on `#18181b`는 약 10:1로 충분하다.

## 함께 고치는 것

- **`baseUrl`**: `quartz.jzhao.xyz` → `4sizn.github.io/blog`. 현재 RSS·사이트맵·OG 이미지 URL이 모두 남의 도메인을 가리킨다.
- **썸네일 상대경로 404**: SPA로 하위 경로에 갔다 오면 `./static/...`이 `/log/static/...`으로 해석돼 깨진다. 카드 컴포넌트를 새로 만들며 경로 계산을 `resolveRelative`로 통일한다.

## 검증

빌드 → 로컬 서버 → 세 페이지 각각 다크·라이트 스크린샷 → 기존 블로그 기능(검색·explorer·그래프·백링크) 동작 확인.

## 리스크

Quartz 내부 파일 수정이 늘어 upstream 머지 부담이 커진다.
신규 코드는 가능한 한 새 파일로 격리하고, 기존 파일 수정은 `quartz.layout.ts`·`components/index.ts`·`quartz.config.ts` 세 곳으로 제한한다.
