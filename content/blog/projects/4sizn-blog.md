---
title: "4sizn Blog"
description: "Quartz 기반 개인 블로그로, Markdown 콘텐츠·프로젝트 카드·릴리즈 초안을 관리한다."
recordType: code-evidence
sourceScope: repository-history
tags: [project, quartz, github-actions]
draft: false
lang: ko
---

> **검토 범위**
> 이 저장소의 Markdown 콘텐츠 구조, Quartz 컴포넌트, 릴리즈 동기화 스크립트와 변경 이력을 기준으로 정리한다.

## 프로젝트

4sizn Blog는 Quartz 기반 개인 블로그다. 콘텐츠는 Markdown으로 관리하고, `/projects`에는 포트폴리오 카드를, `/blog/projects`에는 프로젝트별 기록을, `/blog/releases`에는 버전별 변경을 둔다.

## 콘텐츠와 프로젝트 카드

`content/`는 블로그 본문과 프로젝트 메타데이터를 함께 관리한다. `/projects` 카드 렌더링은 `quartz/components/ProjectGrid.tsx`가 담당하며, frontmatter의 `projectCategory`, `projectOrder`, `projectStack`, `projectLinks`를 읽어 Toy와 Career 항목을 구분한다.

카드용 메타데이터와 본문을 같은 콘텐츠 모델에 두어 별도의 프로젝트 목록을 중복 관리하지 않는다. `/projects`는 이력서형 요약을, `/blog/projects`는 근거 범위가 다른 상세 기록을 제공한다.

## 릴리즈 초안 흐름

릴리즈 동기화 스크립트는 새 릴리즈를 Markdown 초안으로 만들고, 초안은 `draft: true` 상태로 남는다. 자동 수집은 초안 생성까지 담당하며, 공개 여부와 글의 맥락은 편집 단계에서 결정한다.

## 관련 변경

- `8cf484e` · 프로젝트 카드 기본 썸네일 교체
- `0811a3d` · Swing Golf의 Blog Projects 경로 이관
- `81faeae` · 초기 프로젝트 글 템플릿과 관리 스킬 추가

## 관련 기록

- [소스](https://github.com/4sizn/blog)
- [포트폴리오 요약](/projects/4sizn-blog)
- [Releases](/blog/releases)
