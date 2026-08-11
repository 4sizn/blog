# 릴리즈 노트 골격 (12섹션)

근거: `docs/sdlc/requirements.md` 부록 A. 골격을 바꾸려면 그 문서를 먼저 고친다.
템플릿 실물: `content/templates/new_releases.md`

## 섹션 구성

| # | 섹션 | 필수 | 목적 | 비었을 때 |
|---|------|------|------|----------|
| 1 | Hero Image | **필수** | 이번 릴리즈를 한 장으로 | CLI·도구도 터미널을 캡처한다. 어떤 이미지도 사실을 못 보여줄 때만 생략하고 이유를 기록 |
| 2 | 도입부 2~3문장 | **필수** | "vX.Y.Z 을 공개합니다. 이번 버전에서는 ___ 에 집중했습니다." | 쓸 말이 없으면 릴리즈 노트를 쓸 이유부터 다시 본다 |
| 3 | `⚠️ Breaking Changes` | 선택 | 깨지는 것을 **가장 먼저** | 없으면 섹션째 삭제. Under the Hood에 묻지 않는다 |
| 4 | `🎯 What it is` | 선택 | 제품 자체 소개 (첫 공개 릴리즈만) | 두 번째 이후 릴리즈는 생략 |
| 5 | `✨ What's New` | **필수** | 기능별 `###` + 왜/무엇이 + 이미지 | 기능 추가가 없으면 섹션을 생략하고 Improvements로 시작 |
| 6 | `🔧 Improvements` | 선택 | 사용자가 체감하는 작은 개선 | 삭제 |
| 7 | `🐛 Bug Fixes` | 선택 | **증상 기준**으로 쓴다 (커밋 메시지 금지) | 삭제 |
| 8 | `⚙️ Under the Hood` | 선택 | 성능·의존성·내부 구조 | 삭제 |
| 9 | `💻 Platforms` | 선택 | 지원 OS·최소 버전·배포 상태 | 앱·데스크톱만 |
| 10 | `📜 Version History` | 선택 | 이전 버전 표 | 버전이 잦은 프로젝트만 |
| 11 | `🔜 What's Next` | **필수** | 다음 방향 | 미정이면 "미정"이라고 쓴다. 빈 약속을 채우지 않는다 |
| 12 | `🚀 Try it` | **필수** | 다운로드·저장소·문서 링크 | |

섹션 헤딩은 `##`, What's New 하위 기능은 `###`. 작성자 섹션은 두지 않는다.

## What's New 하위 구조 (기능 하나당)

```markdown
### 기능 이름

왜 만들었는지 — 어떤 불편·문제가 있었는지 한두 문장.
무엇이 달라졌는지 — 이전에는 어땠고 지금은 어떤지.

![대체 텍스트](/static/<slug>/xx.jpg)

이제 사용자가 할 수 있는 것.
```

커밋 문장을 `###` 제목으로 올리지 않는다. 초안의 TODO 주석에 담긴 후보는 재료일 뿐이다.

## frontmatter

```yaml
---
title: "[YYYY-MM-DD] [Display Name] vX.Y.Z 릴리즈"
description: "한 문장. 검색 결과·OG 카드에 그대로 쓰인다"
socialImage: "/static/<slug>/hero.jpg"   # Hero Image 가 있으면
tags: [release, <category>, <repo>]
aliases: ["<Display Name> <version>", "<Display Name> 릴리즈"]
draft: true          # 완성 후 이 줄을 삭제해 게시
lang: ko
enableToc: true
cssclasses: [release, changelog]
created: YYYY-MM-DD  # 기존 글을 보정할 때는 원본 그대로 유지
updated: YYYY-MM-DD
---
```

`description` 은 초안에 저장소 설명이 그대로 들어와 있다. **이번 릴리즈 내용으로 반드시 고친다.**

`tags` 의 `<category>` 는 `.github/tracked-repos.json` 의 `category` 를 쓴다 (`extension`·`tool`·`app`·`blog`).

## 파일명

```
content/blog/releases/{YYYY-MM-DD}-{repo}-{version}.md
```

- 날짜는 `published_at` → 태그 커밋 날짜 → 소스 마지막 업데이트 일자 순으로 정한다
- 기존 글을 보정할 때 **파일명을 바꾸지 않는다.** URL이 깨진다

## 마일스톤 변형 (버전 릴리즈가 아닐 때)

스토어 등록 준비처럼 버전이 올라가지 않은 작업도 같은 골격을 쓴다. 다만:

- 제목에 버전을 붙이지 않는다 — `[YYYY-MM-DD] [Display Name] <무엇을 했는지>`
- 도입부에 **"새 버전 릴리즈는 아니다"** 를 명시한다
- `✨ What's New` → 이번에 한 일. `🔜 What's Next` → 남은 일 (체크박스 허용)
- 파일명은 버전 자리에 slug — `{YYYY-MM-DD}-{repo}-{slug}.md`
- **서사 헤딩을 써도 된다.** 마일스톤 글은 "무엇을 했는가"보다 "왜 이제 했는가"가 본문인 경우가 많다.
  `## 🗓️ 반년 동안 멈춰 있던 이유` 처럼 그 글에만 맞는 헤딩이 골격 섹션명보다 잘 읽히면 그것을 쓴다.
  단 필수 넷(도입부·What's New·What's Next·Try it)은 이름을 바꾸지 않는다 — 독자가 글마다 같은 자리에서 찾는다

실제 예: `content/blog/releases/2026-08-11-screen-saver-extension-store-assets.md`

## 기존 글 보정할 때

- `created` 는 원본 그대로 두고 `updated` 만 오늘로 올린다
- 파일명·URL 유지
- 작성자 섹션 삭제, 한국어 헤딩을 영어 헤딩으로 교체
- 중복 나열 제거 (예: v1.0.6 글의 제한 도메인 목록이 두 번 나온다)
- 근거는 GitHub 릴리즈 본문 + git 히스토리로 한정한다. 확인 불가한 항목은 삭제하고 지어내지 않는다
