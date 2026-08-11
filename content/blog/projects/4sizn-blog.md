---
title: "4sizn Blog 제작기 — 자동 초안과 사람의 편집을 분리한 개인 문서 시스템"
description: "Quartz 사이트에서 포트폴리오·개발 기록·릴리즈 초안을 한 흐름으로 관리한 기록"
tags: [project, quartz, github-actions]
draft: false
lang: ko
---

## 문제: 자동화가 글을 대신 게시하면 기록의 품질이 무너진다

이 사이트는 개인 프로젝트와 개발 기록을 함께 다룬다. 새 릴리즈를 감지하는 자동화는 필요하지만, 커밋 나열을 곧바로 공개 글로 만들면 맥락이 사라진다. 그래서 자동화는 초안을 만들고, 공개 여부와 글의 결론은 사람이 편집하도록 나눴다.

## 구조: 콘텐츠와 표시 컴포넌트를 분리했다

Quartz의 Markdown 콘텐츠는 `content/`에 두고, `/projects`의 카드 렌더링은 `quartz/components/ProjectGrid.tsx`가 담당한다. 이 컴포넌트는 `projectCategory`, `projectOrder`, `projectStack`, `projectLinks` frontmatter를 읽어 Toy/Career 구분을 유지한다. 카드를 위한 메타데이터와 본문을 한 모델에 두어 별도의 프로젝트 목록을 중복 관리하지 않는 선택이다.

## 반복한 문제

### 포트폴리오와 개발 기록은 역할이 다르다

`/projects`는 빠르게 범위를 훑는 카드 모음이고, `/blog/projects`는 문제·결정·검증을 남기는 제작기 아카이브다. 이번 구조는 두 페이지를 하나로 합치지 않고, 포트폴리오의 각 항목이 상세 제작기로 이어질 수 있도록 분리했다. 게임 릴리즈는 계속 `/blog/releases`에 남는다.

### 자동 생성 글은 사람의 편집 전에는 숨긴다

릴리즈 감지 워크플로는 Markdown 초안을 `draft`로 만들고, Quartz는 공개 콘텐츠만 렌더한다. 자동 수집은 누락을 줄이고, 공개 글은 기술적 맥락과 검증 범위를 사람이 책임지는 경계다.

## 이력에서 확인한 변화

- `8cf484e` — 블로그 카드의 기본 썸네일을 주제별 이미지로 교체
- `0811a3d` — Swing Golf를 Blog Projects로 이관
- `81faeae` — 제작기 템플릿과 관리 스킬 추가

## 검증 범위와 현재 상태

이 글은 `ProjectGrid.tsx`, Markdown frontmatter 구조와 이 저장소의 Git 이력을 검토해 작성했다. 이 사이트는 지금도 [소스](https://github.com/4sizn/blog)에서 확인할 수 있으며, [포트폴리오 요약](/projects/4sizn-blog)과 릴리즈 기록은 별도 경로로 유지한다.
