---
title: "[2026-02-23] [AI Config Monitor] v1.2.2 릴리즈"
description: "화면에 잔상이 남고 헤더가 겹쳐 보이던 터미널 렌더링 문제를 고쳤습니다."
socialImage: "/static/ai-config-monitor/overview.jpg"
tags:
  - release
  - tool
  - ai-config-monitor
aliases:
  - "AI Config Monitor 1.2.2"
  - "AI Config Monitor 릴리즈"
draft: false
lang: ko
enableToc: true
cssclasses:
  - release
  - changelog
created: "2026-02-23"
updated: "2026-08-11"
---

## 🎉 [AI Config Monitor] v1.2.2 릴리즈

> 📅 릴리즈 날짜: 2026-02-23

![Overview 탭 — 잔상 없이 한 번에 다시 그려진 화면](/static/ai-config-monitor/overview.jpg)

v1.2.2를 공개합니다. 화면에 잔상이 남고 헤더가 두 줄로 겹쳐 보이던 문제를 고쳤습니다.

## 🐛 Bug Fixes

터미널을 다시 그릴 때 이전 프레임의 글자가 남아 헤더가 두 번 찍힌 것처럼 보였습니다. 창 크기를 바꾸거나 탭을 옮길 때 특히 자주 났습니다.

프레임마다 화면을 전체로 지우고 다시 그리도록 바꿨습니다. 대체 화면(alternate screen)에 들어갈 때도 화면을 명시적으로 지우고 커서를 왼쪽 맨 위로 보내 진입 직후의 화면 상태가 매번 같아졌습니다.

## 🔜 What's Next

이다음 v1.2.3에서 Codex의 toml 설정을 읽도록 고쳤고 v1.2.4에서는 스스로 업데이트하는 명령을 붙였습니다.

## 🚀 Try it

- [GitHub 릴리즈 페이지](https://github.com/4sizn/ai-config-monitor/releases/tag/v1.2.2)
- [저장소](https://github.com/4sizn/ai-config-monitor)
- [프로젝트 페이지](/projects/ai-config-monitor)
