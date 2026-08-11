---
title: "[2026-02-23] [AI Config Monitor] v1.2.1 릴리즈"
description: "Codex의 프로젝트 MCP 설정을 읽고, --project 를 생략하면 현재 폴더를 프로젝트로 삼습니다."
socialImage: "/static/ai-config-monitor/mcp-servers.jpg"
tags:
  - release
  - tool
  - ai-config-monitor
aliases:
  - "AI Config Monitor 1.2.1"
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

## 🎉 [AI Config Monitor] v1.2.1 릴리즈

> 📅 릴리즈 날짜: 2026-02-23

![MCP 서버 목록 — 아래 두 줄이 프로젝트 스코프로 잡힌 서버](/static/ai-config-monitor/mcp-servers.jpg)

v1.2.1을 공개합니다. Codex의 프로젝트 설정을 읽고 옵션 없이 실행해도 지금 있는 폴더를 봅니다.

## ✨ What's New

### Codex 프로젝트 설정 감지

프로젝트 단위 MCP 설정을 `.mcp.json`에서만 읽었습니다. Codex는 `.codex/mcp.json`에 따로 두는데 그 파일은 보지 않았습니다.

두 파일을 모두 읽습니다. 파일 감시 경로에도 넣었으므로 내용을 고치면 화면에 바로 반영됩니다.

### `--project`를 생략해도 된다

프로젝트 스코프를 보려면 매번 경로를 적어야 했습니다.

생략하면 현재 작업 디렉토리를 프로젝트로 삼습니다. 프로젝트 폴더에서 그냥 실행하면 됩니다.

## 🔧 Improvements

- `uvx`로 띄운 MCP 서버의 프로세스를 찾지 못하던 문제를 다듬었습니다. `uvx blender-mcp`처럼 실행 명령이 한 겹 감싸여 있으면 헬스 체크가 매칭에 실패했습니다

## 🔜 What's Next

이다음 v1.2.2에서 터미널 렌더링을, v1.2.3에서 Codex의 toml 설정 읽기를 고쳤습니다.

## 🚀 Try it

- [GitHub 릴리즈 페이지](https://github.com/4sizn/ai-config-monitor/releases/tag/v1.2.1)
- [저장소](https://github.com/4sizn/ai-config-monitor)
- [프로젝트 페이지](/projects/ai-config-monitor)
