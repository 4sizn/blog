---
title: "AI Config Monitor 제작기 — 서로 다른 AI 설정을 하나의 점검 화면으로 모으기"
description: "도구마다 흩어진 MCP·skills·hooks 설정을 수집·감시하고, CLI에서 읽을 수 있는 상태로 만든 기록"
socialImage: "/static/ai-config-monitor/update-check.jpg"
tags: [project, cli, typescript]
draft: false
lang: ko
---

## 문제: 설정 파일은 늘어나는데 상태를 보는 곳은 없었다

AI 도구별 설정은 서로 다른 경로·형식으로 분산된다. 이 프로젝트는 각 파일을 한 포맷으로 수집하고, 터미널에서 지금의 구성과 변화를 점검하는 데 초점을 맞췄다. 이 글은 공개 저장소의 소스와 Git 이력에 근거한다.

## 구조: 수집·상태·표시를 분리했다

`src/app.ts`는 Claude Desktop, Docker, Cursor, VS Code, Gemini와 프로젝트 MCP를 병렬 수집한다. 수집 결과는 `servers`, `skills`, `hooks`, `plugins`라는 앱 상태로 모으고, 패널 렌더러와 파일 감시기는 그 상태를 소비한다. 특정 도구의 파서가 실패해도 전체 화면이 무너지지 않도록 수집 단계는 예외를 흡수하고 다음 갱신을 기다린다.

## 반복한 문제

### 설정을 보여주는 것과 계속 맞는 것을 분리

초기 수집만으로는 실행 중 바뀌는 설정을 반영할 수 없다. `FileWatcher`, `HealthChecker`, `Notifier`를 독립 구성요소로 두고, 앱은 갱신 결과를 화면 상태에 반영한다. 렌더 루프는 `dirty` 상태일 때만 다시 그려 터미널 화면 갱신을 필요한 경우로 제한한다.

### 업데이트를 설치 명령에만 의존하지 않기

`69b7e16`은 `ai-monitor update`를 추가했다. `src/update/updater.ts`는 npm registry의 최신 태그를 제한 시간과 재시도로 확인하고, `--check`·`--force`에 따라 다른 종료 코드와 구조화된 결과를 돌려준다. 설치 가능 여부, 네트워크 실패, 최신 상태를 구분해 자동화가 결과를 해석할 수 있게 했다.

## 이력에서 확인한 변화

- `215c6be` — 초기 CLI 공개
- `7d9a155` — health check와 화면 알림의 갱신
- `6b876eb` — Codex TOML 파싱 보정
- `69b7e16` — self-update 흐름 추가

## 검증 범위와 현재 상태

이 기록은 공개 저장소의 `src/app.ts`, `src/update/updater.ts`, collector 모듈과 위 이력을 검토해 작성했다. 제품 릴리즈 상세는 [v1.2.4 릴리즈 노트](/blog/releases/2026-02-24-ai-config-monitor-1.2.4)로 분리한다. [소스](https://github.com/4sizn/ai-config-monitor)와 [포트폴리오 요약](/projects/ai-config-monitor)에서 프로젝트를 확인할 수 있다.
