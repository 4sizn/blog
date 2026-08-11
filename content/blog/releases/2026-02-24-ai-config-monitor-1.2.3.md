---
title: "[2026-02-24] [AI Config Monitor] v1.2.3 릴리즈"
description: "Codex 설정 중 .codex/config.toml 에 적어둔 MCP 서버를 읽지 못하던 문제를 고쳤습니다."
socialImage: "/static/ai-config-monitor/mcp-servers.jpg"
tags:
  - release
  - tool
  - ai-config-monitor
aliases:
  - "AI Config Monitor 1.2.3"
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

## 🎉 [AI Config Monitor] v1.2.3 릴리즈

> 📅 릴리즈 날짜: 2026-02-24

![MCP 서버 목록 — 프로젝트 설정에서 읽어온 서버가 project 스코프로 표시된다](/static/ai-config-monitor/mcp-servers.jpg)

v1.2.3을 공개합니다. Codex 설정 중 toml 형식으로 된 것을 읽지 못하던 문제를 고쳤습니다.

## 🐛 Bug Fixes

Codex는 프로젝트 MCP 설정을 `.codex/config.toml`의 `mcp_servers` 항목에 두기도 합니다. 수집기가 json만 읽었으므로 toml에 적어둔 서버는 목록에 나타나지 않았습니다.

`.codex/config.toml`을 읽고 파일 감시 경로에도 넣었습니다. 설정을 고치면 모니터에 바로 반영됩니다.

## 🔜 What's Next

이다음 v1.2.4에서 스스로 최신 버전을 받아 설치하는 `update` 명령을 붙였습니다.

## 🚀 Try it

- [GitHub 릴리즈 페이지](https://github.com/4sizn/ai-config-monitor/releases/tag/v1.2.3)
- [저장소](https://github.com/4sizn/ai-config-monitor)
- [프로젝트 페이지](/projects/ai-config-monitor)
