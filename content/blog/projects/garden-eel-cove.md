---
title: "Garden Eel Cove"
description: "바탕화면 하단의 투명 창에서 정원장어와 상호작용하는 데스크톱 앱이다."
recordType: code-evidence
sourceScope: repository-history
tags: [project, godot, desktop]
draft: false
lang: ko
---

> **검토 범위**
> 공개 소스와 변경 이력을 기준으로 정리한다. 운영체제·DPI 조합별 동작과 배포 환경 전체는 이 글에서 재현하지 않는다.

## 프로젝트

Garden Eel Cove는 바탕화면 하단에 자리 잡는 인터랙티브 데스크톱 장면이다. 장어와 먹이가 있는 영역에서는 상호작용하고, 그 밖의 영역에서는 뒤의 작업 창을 방해하지 않는 창 동작이 제품 범위에 포함된다.

## 창과 장면 구성

`scripts/main.gd`는 사용 가능한 화면 영역을 기준으로 하단 스트립 창을 배치하고 입력 영역, 장어 생성, HUD를 조합한다. `scripts/eel.gd`는 장어의 노출·잡힘 상태, 몸통 세그먼트, 렌더 패스를 맡는다. 몸통·디테일·외곽선은 분리된 `DrawProxy`로 그리며, 패턴은 몸통 내부에만 표시한다.

## 입력 통과와 이동 경로

변경 이력에는 영역 기반 입력 통과 이후 DPI 합성에서 보인 테두리와 렌더 잘림을 다룬 기록이 있다. 이후 Windows 창 스타일 조작은 PowerShell 감시 프로세스로 분리하고, 게임은 입력 가능 상태만 기록하는 흐름으로 구성한다.

장어가 먹이에 접근하는 경로는 단순 2차 곡선에서 3차 베지어와 arc-length 샘플링으로 바뀐다. 출발·접근 제어점을 분리하고 먹이 높이에 따라 접근 각을 다루는 변경이다.

- `4d7eede` · 인터랙션 윤곽 노출 수정
- `6a7fe91` · Windows 클릭 통과 구현 교체
- `6f90e2d` · 먹이 모션을 3차 베지어로 전환
- `90e5ad9` · 릴리즈 자동화 추가

## 확인 범위

이 기록은 `scripts/main.gd`, `scripts/eel.gd`와 공개 이력에서 확인한 구성이다. Windows 전용 창 스타일 동작과 다양한 DPI 환경의 결과는 각 환경에서 별도로 확인해야 한다.

## 관련 기록

- [소스](https://github.com/4sizn/gardeneel-desktop)
- [포트폴리오 요약](/projects/garden-eel-cove)
- [v1.6.0 릴리즈 노트](/blog/releases/2026-07-16-gardeneel-desktop-1.6.0)
