---
title: "[2026-02-24] [AI Config Monitor] v1.2.4 릴리즈"
description: "ai-monitor update 로 새 버전을 확인하고 그 자리에서 설치할 수 있게 했습니다."
socialImage: "/static/ai-config-monitor/update-check.jpg"
tags:
  - release
  - tool
  - ai-config-monitor
aliases:
  - "AI Config Monitor 1.2.4"
  - "AI Config Monitor 릴리즈"
draft: false
lang: ko
enableToc: true
cssclasses:
  - release
  - changelog
created: "2026-02-24"
updated: "2026-08-11"
---

## 🎉 [AI Config Monitor] v1.2.4 릴리즈

> 📅 릴리즈 날짜: 2026-02-24

![ai-monitor update --check 출력 — 현재 버전과 최신 버전, 업데이트 명령](/static/ai-config-monitor/update-check.jpg)

v1.2.4를 공개합니다. 새 버전이 나왔는지 확인하고 그 자리에서 올리는 명령이 생겼습니다.

## ✨ What's New

### `ai-monitor update`

새 버전을 냈어도 쓰는 사람은 알 방법이 없었습니다. 패키지 이름을 기억해 직접 다시 설치해야 했습니다.

`update` 명령으로 최신 버전을 받아 설치합니다. 확인만 하고 싶으면 `--check`, 이미 최신인데도 다시 깔려면 `--force`, 다른 스크립트에서 결과를 읽으려면 `--json`을 붙입니다.

## 🔧 Improvements

- 버전 문자열을 패키지 메타데이터에서 읽도록 바꿔 `--version` 출력과 도움말에 적힌 버전이 어긋나지 않게 했습니다

## ⚙️ Under the Hood

README에 `update` 사용법을 적었습니다.

## 🔜 What's Next

여기까지가 마지막 릴리즈입니다. 소스는 2026-02-24 이후 바뀌지 않았습니다.

## 🚀 Try it

- [GitHub 릴리즈 페이지](https://github.com/4sizn/ai-config-monitor/releases/tag/v1.2.4)
- [저장소](https://github.com/4sizn/ai-config-monitor)
- [프로젝트 페이지](/projects/ai-config-monitor)
