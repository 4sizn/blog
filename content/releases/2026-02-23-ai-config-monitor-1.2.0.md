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

### ✨ 새로운 기능

- **깜빡이는 ALERT 배너**: 서버 다운 시 `bgRed`/`bgYellow` 교차 배너 표시
- **레인보우 PROJECT 애니메이션**: 알림 활성화 시 프로젝트명을 무지개색으로 강조
- **초기 상태 감지 강화**: 시작 직후 STOPPED/ERROR 상태를 즉시 감지
- **`--interval` CLI 플래그**: 헬스체크 주기를 실행 시점에 설정 가능 (최소 3초)
- **심각도별 알림 벨 패턴**: `urgent` / `warning` / `info` 단계별 사운드 분리

### 🔧 개선사항

- 헬스체크 기본 주기 단축: `30초 → 10초` (옵션으로 조정 가능)
- HTTP 타임아웃 단축: `3초 → 2초`
- Docker 캐시 TTL 단축: `10초 → 5초`
- 체크 사이클 내 프로세스 목록 캐시 공유로 조회 성능 개선
- 모든 패널에 스코프 시스템 추가: `global` / `project` / `project.local`
- 초광폭 터미널(`>=140`)에서 MCP 패널 `COMMAND` 컬럼 노출
- 넓은 화면에서 Skills 패널 `MODIFIED` / `SOURCE` 컬럼 노출
- Overview 패널 2단 레이아웃 지원

### 🐛 버그 수정

- ANSI 인식 문자열 잘림 버그 수정 (`truncateAnsi` / `fitWidth`)

### 📝 기타 변경사항

- 코드 변경 규모: 9개 파일 변경, `+269 / -61`

### 🔗 관련 링크

- [GitHub 릴리즈 페이지](https://github.com/4sizn/ai-config-monitor/releases/tag/v1.2.0)
- [저장소](https://github.com/4sizn/ai-config-monitor)
- [이슈 트래커](https://github.com/4sizn/ai-config-monitor/issues)

### 👥 릴리즈 작성자

- [@4sizn](https://github.com/4sizn)

---

> 이 릴리즈 노트는 자동으로 생성되었습니다.
