---
title: "[2026-02-23] [AI Config Monitor] v1.2.0 릴리즈"
description: "서버가 내려간 것을 놓치지 않도록 깜빡이는 ALERT 배너를 넣고 헬스체크 주기를 30초에서 10초로 줄였습니다."
socialImage: "/static/ai-config-monitor/alert-banner.jpg"
tags:
  - release
  - tool
  - ai-config-monitor
aliases:
  - "AI Config Monitor 1.2.0"
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

## 🎉 [AI Config Monitor] v1.2.0 릴리즈

> 📅 릴리즈 날짜: 2026-02-23

![서버 상태가 바뀌면 화면 위쪽에 뜨는 빨간 ALERT 배너와 헬스 요약](/static/ai-config-monitor/alert-banner.jpg)

v1.2.0을 공개합니다. 모니터를 보고도 서버가 내려간 것을 놓치는 문제에 집중했습니다.

## ✨ What's New

### 깜빡이는 ALERT 배너

상태가 바뀌어도 표 안에서 글자 색만 조용히 달라졌습니다. 화면을 띄워두고 다른 일을 하다 돌아오면 언제 죽었는지 알 수 없었습니다.

서버가 내려가면 화면 위쪽에 배너가 뜨고 빨강과 노랑을 번갈아 깜빡입니다. 눈이 화면 어디에 있어도 걸립니다. 프로젝트 이름은 알림이 켜질 때 무지개색으로 흐릅니다.

### 시작할 때의 상태도 잡는다

그전에는 상태가 바뀌는 순간만 감지했습니다. 모니터를 켰을 때 이미 죽어 있던 서버는 아무 알림도 내지 않았습니다.

시작 직후 STOPPED와 ERROR를 즉시 잡아 알립니다.

### `--interval` 플래그

헬스체크 주기를 직접 정할 수 있습니다. 최소값은 3초입니다.

### 심각도별 알림음

알림을 urgent·warning·info 세 단계로 나눠 벨 패턴을 다르게 했습니다. 소리만 듣고 급한 것인지 구분할 수 있습니다.

## 🔧 Improvements

- 헬스체크 주기를 30초에서 10초로 줄였습니다
- HTTP 타임아웃을 3초에서 2초로 줄였습니다
- Docker 캐시 TTL을 10초에서 5초로 줄였습니다
- 한 번의 체크 사이클 안에서 프로세스 목록을 캐시로 공유해 중복 조회를 없앴습니다

## ⚙️ Under the Hood

9개 파일이 바뀌었고 269줄이 늘고 61줄이 줄었습니다.

## 🔜 What's Next

이다음 v1.2.1에서 Codex 설정을 읽기 시작했고 v1.2.2에서 터미널에 잔상이 남는 문제를 고쳤습니다.

## 🚀 Try it

- [GitHub 릴리즈 페이지](https://github.com/4sizn/ai-config-monitor/releases/tag/v1.2.0)
- [저장소](https://github.com/4sizn/ai-config-monitor)
- [프로젝트 페이지](/projects/ai-config-monitor)
