---
title: "[2026-07-16] [Garden Eel Cove] v1.6.0 릴리즈"
description: "바탕화면 하단 투명 스트립에 정원장어(garden eel)들이 사는 데스크톱 앱, Garden Eel Cove의 첫 정식 버전 v1.6.0이 출시되었습니다."
tags:
  - release
  - app
  - gardeneel-desktop
aliases:
  - "Garden Eel Cove 1.6.0"
  - "Garden Eel Cove 릴리즈"
draft: false
lang: ko
enableToc: true
cssclasses:
  - release
  - changelog
created: "2026-07-16"
updated: "2026-07-16"
---

## 🎉 [Garden Eel Cove] v1.6.0 릴리즈

> 📅 릴리즈 날짜: 2026-07-16

바탕화면 하단 투명 스트립에 정원장어(garden eel)들이 사는 데스크톱 앱. **첫 정식 릴리즈**입니다.

### ✨ 주요 기능

- 🐟 바탕화면 위 투명 스트립에 사는 정원장어 — 마우스 움직임에 반응해 구멍에서 나오고 숨음
- 🍚 트레이 메뉴에서 **밥주기**, 잡은 장어 수·밥 준 횟수 실시간 확인
- 🖱️ **클릭 통과** — 인터랙션 영역 밖 클릭은 그대로 바탕화면/뒤쪽 창으로 전달
- 🛠️ **개발자 모드** 토글 — 인터랙션 영역 시각화
- ℹ️ 창 제목·트레이 툴팁·설정 정보에 버전 표시

### 🔧 개선사항

- 밥 먹기 모션을 3차 베지어 곡선으로 교체해 더 자연스럽게
- 트레이 아이콘 가독성 개선 — 메뉴바 크기(~18pt)에서도 장어로 인식

### 🐛 버그 수정

- 장어 몸통이 구멍에서 분리되어 떠 보이던 현상 수정
- 마우스 정지 시 장어 노출도가 진동(버벅임)하던 현상 수정
- 해초가 인터랙션 영역 밖에서 잘려 보이던 현상 수정
- **(Windows)** 클릭 통과 방식을 `WS_EX_TRANSPARENT` 감시 프로세스로 교체해 흰 외곽선 근본 제거

### 💻 지원 플랫폼

- **macOS** — universal (Apple Silicon + Intel), macOS 11+
- **Windows 11** — x86_64, 실기 검증 완료

### 📦 설치

- **macOS**: `GardenEelCove.dmg` 마운트 → `Applications`로 드래그.
  첫 실행 시 앱을 **우클릭 → 열기** (adhoc 서명이라 Gatekeeper 경고가 뜹니다)
- **Windows**: `GardenEelCove-windows.zip` 압축 해제 → `GardenEelCove.exe` 실행.
  SmartScreen 경고 시 **추가 정보 → 실행** (미서명)

### 🔗 관련 링크

- [GitHub 릴리즈 페이지](https://github.com/4sizn/gardeneel-desktop/releases/tag/v1.6.0)
- [저장소](https://github.com/4sizn/gardeneel-desktop)
- [이슈 트래커](https://github.com/4sizn/gardeneel-desktop/issues)

### 👥 릴리즈 작성자

- [@4sizn](https://github.com/4sizn)

---

> 이 릴리즈 노트는 GitHub 릴리즈를 기반으로 작성되었습니다.
