<!-- TEMPLATE-DOC
릴리즈 노트 골격 v2 (12섹션). 근거: docs/sdlc/requirements.md 부록 A
이 주석 블록은 초안 생성 시 scripts/sync-releases.mjs 가 제거한다.

■ 필수 섹션 4개 — 비울 수 없다
  도입부 · ✨ What's New · 🔜 What's Next · 🚀 Try it
  Hero Image 도 필수다 (FR-10). 어떤 이미지도 사실을 보여주지 못할 때만 생략하고 이유를 기록한다.

■ 선택 섹션 — 내용이 없으면 섹션째 삭제한다. 헤딩만 남기지 않는다
  ⚠️ Breaking Changes (있으면 What's New 위에) · 🎯 What it is (첫 공개 릴리즈만)
  🔧 Improvements · 🐛 Bug Fixes · ⚙️ Under the Hood
  💻 Platforms (앱·데스크톱) · 📜 Version History (버전이 잦은 프로젝트)

■ 금지
  - 커밋 메시지를 그대로 붙여넣지 않는다. feat:/fix:/chore: 프리픽스가 본문에 남으면 실패다
  - 커밋 제목을 ### 기능 제목으로 승격하지 않는다
  - 작성자 섹션을 두지 않는다
  - 본문에 # (h1) 을 쓰지 않는다. frontmatter title 이 h1 으로 렌더된다

■ placeholder 19개
  날짜·이름   {{DATE_PREFIX}} {{DATE}} {{DISPLAY_NAME}} {{TAG_NAME}} {{VERSION}} {{DESCRIPTION}} {{CATEGORY}} {{REPO}}
  링크        {{RELEASE_URL}} {{REPO_URL}}
  섹션        {{BREAKING_SECTION}} {{WHATS_NEW_SECTION}} {{IMPROVEMENTS_SECTION}} {{BUGFIXES_SECTION}} {{UNDER_HOOD_SECTION}}
  사람 몫     {{HERO_TODO}} {{INTRO_TODO}} {{WHATS_NEXT_TODO}}
  근거        {{SOURCE_BODY_COMMENT}}

  치환은 키 길이 내림차순으로 한다 ({{DATE}} 가 {{DATE_PREFIX}} 를 깨뜨리지 않도록).

■ 게시 조건
  draft: true 를 지우기 전에 — TODO( 0건 · 미치환 {{ 0건 · 원문 주석 삭제 · humanize-korean 경유 · 사실 대조
-->
---
title: "[{{DATE_PREFIX}}] [{{DISPLAY_NAME}}] {{TAG_NAME}} 릴리즈"
description: "{{DESCRIPTION}}"
tags:
  - release
  - {{CATEGORY}}
  - {{REPO}}
aliases:
  - "{{DISPLAY_NAME}} {{VERSION}}"
  - "{{DISPLAY_NAME}} 릴리즈"
draft: true
lang: ko
enableToc: true
cssclasses:
  - release
  - changelog
created: "{{DATE}}"
updated: "{{DATE}}"
---

## 🎉 [{{DISPLAY_NAME}}] {{TAG_NAME}} 릴리즈

> 📅 릴리즈 날짜: {{DATE}}

{{HERO_TODO}}

{{INTRO_TODO}}

{{BREAKING_SECTION}}
<!-- 선택: 🎯 What it is — 첫 공개 릴리즈에서만. 제품이 무엇인지 2~3문장 -->

{{WHATS_NEW_SECTION}}

{{IMPROVEMENTS_SECTION}}

{{BUGFIXES_SECTION}}

{{UNDER_HOOD_SECTION}}
<!-- 선택: 💻 Platforms — 지원 OS·최소 버전·배포 상태. 앱·데스크톱 프로젝트만 -->
<!-- 선택: 📜 Version History — 이전 버전 표. 버전이 잦은 프로젝트만 -->

{{WHATS_NEXT_TODO}}

## 🚀 Try it

- [릴리즈 페이지]({{RELEASE_URL}})
- [저장소]({{REPO_URL}})
<!-- 다운로드·스토어·문서 링크가 있으면 여기에 추가한다 -->

{{SOURCE_BODY_COMMENT}}
