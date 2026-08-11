---
title: "[2026-02-23] [AI Config Monitor] v1.2.1 릴리즈"
description: "AI 설정 모니터링 도구"
tags:
  - release
  - tool
  - ai-config-monitor
aliases:
  - "AI Config Monitor 1.2.1"
  - "AI Config Monitor 릴리즈"
draft: true
lang: ko
enableToc: true
cssclasses:
  - release
  - changelog
created: "2026-02-23"
updated: "2026-02-23"
---

## 🎉 [AI Config Monitor] v1.2.1 릴리즈

> 📅 릴리즈 날짜: 2026-02-23

<!-- TODO(hero): 이번 릴리즈를 한 장으로 보여주는 이미지. 확보 방법은 skill 의 references/images.md -->

<!-- TODO(intro): "v1.2.1 을 공개합니다. 이번 버전에서는 ___ 에 집중했습니다." 2~3문장으로 쓴다 -->

<!-- 선택: 🎯 What it is — 첫 공개 릴리즈에서만. 제품이 무엇인지 2~3문장 -->

## ✨ What's New

<!-- TODO(whats-new): 기능마다 ### 제목을 달고 "왜 만들었는지 / 무엇이 달라졌는지"를 쓴다.
     각 기능에 이미지를 붙인다. 아래 후보를 그대로 목록으로 두면 안 된다.
       (릴리즈 본문에서 뽑을 항목이 없었다. 커밋 로그를 직접 확인한다)
-->

## 🔧 Improvements

- Add project MCP detection for Codex config (.codex/mcp.json) in addition to .mcp.json
- Default project scope to current working directory when --project is omitted
- Improve process health matching for uvx-launched MCP servers (e.g. uvx blender-mcp)
- Watch .codex/mcp.json for live reload in file watcher paths

<!-- 선택: 💻 Platforms — 지원 OS·최소 버전·배포 상태. 앱·데스크톱 프로젝트만 -->
<!-- 선택: 📜 Version History — 이전 버전 표. 버전이 잦은 프로젝트만 -->

<!-- TODO(next): ## 🔜 What's Next 섹션을 만들고 다음 방향을 쓴다. 미정이면 "미정"이라고 쓴다 -->

## 🚀 Try it

- [릴리즈 페이지](https://github.com/4sizn/ai-config-monitor/releases/tag/v1.2.1)
- [저장소](https://github.com/4sizn/ai-config-monitor)
<!-- 다운로드·스토어·문서 링크가 있으면 여기에 추가한다 -->

<!-- SOURCE(원본 릴리즈 본문 — 다듬을 때 근거로 쓰고 게시 전 삭제한다)
## Whats Changed
- Add project MCP detection for Codex config (.codex/mcp.json) in addition to .mcp.json
- Default project scope to current working directory when --project is omitted
- Improve process health matching for uvx-launched MCP servers (e.g. uvx blender-mcp)
- Watch .codex/mcp.json for live reload in file watcher paths

## Verification
- bun run build passed
- Confirmed parser detects Blender MCP from /Users/hsshin-rsupport/Documents/lotus/blender-test/.codex/mcp.json
-->
