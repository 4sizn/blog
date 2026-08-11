---
title: "Garden Eel Cove 제작기 — 바탕화면을 가리지 않는 인터랙티브 스트립"
description: "데스크톱 하단의 투명 창에서 장어가 반응하면서도 뒤의 작업을 방해하지 않게 만든 기록"
tags: [project, godot, desktop]
draft: false
lang: ko
---

## 문제: 살아 있는 데스크톱 장면은 작업을 막으면 안 된다

Garden Eel Cove는 바탕화면 하단에 상주하는 장면이다. 핵심 난점은 애니메이션이 아니라, 장어·먹이 같은 필요한 지점에서는 입력을 받고 나머지에서는 뒤 창의 클릭을 통과시키는 데 있었다. 이 글은 공개 소스와 Git 이력에 근거한다.

## 구조: 창·상태·장어 렌더를 분리했다

`main.gd`는 사용 가능한 화면 영역을 기준으로 하단 스트립 창을 배치하고, 입력 영역·장어 생성·HUD를 오케스트레이션한다. `eel.gd`는 `HIDDEN`부터 노출·잡힘까지의 상태와 몸통 세그먼트, 렌더 패스를 맡는다. 몸통, 디테일, 외곽선을 별도 `DrawProxy`로 그려 패턴은 몸통 안에만 클리핑한다.

## 가장 어려웠던 반복

### Windows 클릭 통과의 테두리 문제

`6a7fe91` 이전에는 영역 기반 입력 통과를 시도했지만 DPI 합성에서 밝은 경계와 렌더 잘림이 남았다. `main.gd`는 GDScript FFI 대신 작은 PowerShell 감시 프로세스가 `WS_EX_TRANSPARENT` 비트를 25ms 간격으로 토글하도록 바꾼다. 게임은 입력 가능 여부만 상태 파일에 기록하고, Windows 전용 창 스타일 조작은 감시 프로세스로 격리했다.

### 먹이를 향한 몸통 궤적

`eel.gd`의 `compute_reach_curve`는 단순 2차 곡선에서 3차 베지어와 arc-length 샘플링으로 바뀌었다. 출발·접근 제어점을 분리해 머리가 수직으로 꺾여 보이던 문제를 줄이고, 먹이 높이에 따라 접근 각을 달리했다. 이 변경은 `6f90e2d` 이력으로 확인된다.

## 이력에서 확인한 변화

- `4d7eede` — 인터랙션 윤곽 노출 수정
- `6a7fe91` — Windows 클릭 통과 구현 교체
- `6f90e2d` — 먹이 모션을 3차 베지어로 전환
- `90e5ad9` — 릴리즈 자동화 추가

## 검증 범위와 현재 상태

이 글은 `scripts/main.gd`, `scripts/eel.gd`와 공개 이력을 검토해 작성했다. 플랫폼별 배포 및 변경 목록은 [v1.6.0 릴리즈 노트](/blog/releases/2026-07-16-gardeneel-desktop-1.6.0)로 분리한다. [소스](https://github.com/4sizn/gardeneel-desktop)와 [포트폴리오 요약](/projects/garden-eel-cove)을 확인할 수 있다.
