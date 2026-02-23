---
title: "[2026-02-23] [AI Config Monitor] v1.2.0 릴리즈"
description: "AI Config Monitor의 새로운 버전 v1.2.0이 출시되었습니다."
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
updated: "2026-02-23"
---

## 🎉 [AI Config Monitor] v1.2.0 릴리즈

> 📅 릴리즈 날짜: 2026-02-23

### 📝 기타 변경사항

- **깜빡이는 ALERT 배너** — 서버 다운 시 `bgRed`/`bgYellow` 교차 배너 표시
- **레인보우 PROJECT 애니메이션** — 알림 활성화 시 무지개색으로 프로젝트명 표시
- **초기 상태 감지** — 시작 시 STOPPED/ERROR 상태를 즉시 감지 (전환 시점뿐 아니라)
- **`--interval` CLI 플래그** — 헬스체크 주기 설정 가능 (최소 3초)
- **심각도별 알림 벨 패턴** — urgent / warning / info 단계별 알림음
- 헬스체크 주기 단축: 30초 → 10초 (설정 가능)
- HTTP 타임아웃 단축: 3초 → 2초
- Docker 캐시 TTL 단축: 10초 → 5초
- 체크 사이클 내 프로세스 목록 캐시 공유
- 9개 파일 변경, +269 / -61 줄
- 모든 패널에 스코프 시스템 추가 (`global` / `project` / `project.local`)
- 초광폭 터미널(≥140) 지원 — MCP 패널에 COMMAND 컬럼 추가
- Skills 패널에 MODIFIED/SOURCE 컬럼 추가 (넓은 화면)
- Overview 패널 2단 레이아웃 지원
- ANSI 인식 문자열 잘림 버그 수정 (`truncateAnsi`/`fitWidth`)

### 🔗 관련 링크

- [GitHub 릴리즈 페이지](https://github.com/4sizn/ai-config-monitor/releases/tag/v1.2.0)
- [저장소](https://github.com/4sizn/ai-config-monitor)
- [이슈 트래커](https://github.com/4sizn/ai-config-monitor/issues)

### 👥 릴리즈 작성자

- [@4sizn](https://github.com/4sizn)

---

> 이 릴리즈 노트는 자동으로 생성되었습니다.
