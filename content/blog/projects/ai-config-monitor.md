---
title: "AI Config Monitor"
description: "여러 AI 도구의 MCP 설정과 상태를 수집해 터미널 대시보드로 표시하는 CLI다."
recordType: code-evidence
sourceScope: repository-history
socialImage: "/static/ai-config-monitor/update-check.jpg"
tags: [project, cli, typescript]
draft: false
lang: ko
---

> **검토 범위**
> 공개 저장소의 CLI 구성, 수집기, 갱신 기능과 변경 이력을 기준으로 정리한다. 특정 사용자 환경의 설정 내용과 수집 결과는 포함하지 않는다.

## 프로젝트

AI Config Monitor는 여러 AI 도구에 흩어진 MCP 설정을 수집하고, 터미널에서 서버·skills·hooks·plugins 상태를 확인하는 CLI다. 도구마다 설정 파일의 위치와 형식이 다른 환경을 한 화면에서 살피는 데 초점을 둔다.

## 구성

`src/app.ts`는 Claude Desktop, Docker, Cursor, VS Code, Gemini, 프로젝트 MCP 설정을 수집하는 흐름을 가진다. 수집 결과는 서버·skills·hooks·plugins 상태로 정리되며, 패널 렌더링과 파일 감시는 이 상태를 사용한다.

수집기, health check, notifier, watcher, renderer, update 기능은 서로 다른 역할로 나뉜다. 특정 도구의 설정을 읽는 일과 현재 상태를 표시하는 일을 같은 모듈에 묶지 않는 구조다.

## 상태 확인과 갱신

변경 이력에는 health check와 화면 알림 갱신, Codex TOML 파싱 보정, self-update 흐름이 남아 있다. `ai-monitor update`는 최신 버전 확인과 업데이트 흐름을 CLI에서 다루는 범위다.

- `215c6be` · 초기 CLI 공개
- `7d9a155` · health check와 화면 알림 갱신
- `6b876eb` · Codex TOML 파싱 보정
- `69b7e16` · self-update 흐름 추가

## 확인 범위

이 기록은 공개 저장소의 구성과 변경 이력을 정리한 것이다. 특정 도구의 설정 파일 형식, 네트워크 실패 처리, 화면 갱신 조건은 각 버전의 코드와 문서를 추가로 확인해야 한다.

## 관련 기록

- [소스](https://github.com/4sizn/ai-config-monitor)
- [포트폴리오 요약](/projects/ai-config-monitor)
- [v1.2.4 릴리즈 노트](/blog/releases/2026-02-24-ai-config-monitor-1.2.4)
