---
title: "Lonely Candle 제작기 — Blender의 촛불 룩을 모바일 상호작용으로 옮기기"
description: "Mantaflow 기반 레퍼런스를 Godot의 절차적 장면과 마이크·자이로 입력으로 다시 구성한 기록"
socialImage: "/static/lonely-candle-appicon.jpg"
tags: [project, godot, ios]
draft: false
lang: ko
---

## 문제: 오프라인 모바일에서 촛불의 반응을 만들어야 했다

Lonely Candle은 렌더된 영상이 아니라 기울기·입김·재점화에 반응하는 장면을 목표로 한다. Blender의 Mantaflow 장면을 그대로 런타임에 가져오는 대신, Godot에서 필요한 형상과 상태를 절차적으로 구성했다. 이 글은 로컬 소스와 Git 이력에 근거한다.

## 구조: 하나의 루트 노드가 장면을 조립한다

`godot/scripts/main.gd`는 거의 빈 `main.tscn` 대신 `Node3D`에서 환경, 카메라, 촛불, 불꽃, 연기, 개발 패널을 코드로 조립한다. Blender의 좌표·치수는 상수로 옮기고, 촛불 재질과 불꽃·연기 재질은 개별 shader material로 분리했다. 재생 중 상태는 `LIT`, `OUT`, `RELIGHTING`으로 구분한다.

## 반복한 문제

### 실제 기기의 마이크 입력은 곧바로 연출값이 아니다

`mic_gain` 주석은 실기에서 기본 감도가 과도했음을 남긴다. 코드가 원시 바람값과 시각용 smoothing 값을 분리한 이유다. 일정 세기의 바람이 `extinguish_hold` 시간 유지될 때만 소화하고, 단발성 노이즈가 곧바로 상태를 바꾸지 않게 했다.

### 기울기와 세계 수직의 충돌

불꽃은 휴대폰과 함께 회전하면 촛불처럼 보이지 않는다. 코드에는 현재 tilt와 속도, 강성·감쇠 상수가 따로 있어 자이로 입력을 즉시 회전으로 쓰는 대신 스프링처럼 따라가도록 구성한 흔적이 있다. 감각적인 움직임을 위해 입력과 화면 변형을 1:1로 연결하지 않은 선택이다.

## 이력에서 확인한 변화

- `de5bcf0` — Android versionCode 보정
- `fdac97f` — 버전 SSOT와 Fastlane 배포 흐름 추가
- `b932928` — 서명·APK 혼동을 실제 업로드에서 보정
- `fd60e6c` / `dfb9263` — 개발자 정보와 설정 팝업 보완

## 검증 범위와 현재 상태

이 글은 `godot/scripts/main.gd`, 관련 테스트 파일, `lonely_candle.blend`와 위 이력을 검토해 작성했다. 앱 소개와 릴리즈 변경은 [v1.2 릴리즈 노트](/blog/releases/2026-08-05-lonely-candle-1.2)로 분리한다. [포트폴리오 요약](/projects/lonely-candle)과 App Store에서 현재 배포 상태를 확인할 수 있다.
