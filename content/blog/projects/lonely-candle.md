---
title: "Lonely Candle"
description: "기울기와 입김에 반응하는 촛불 장면을 Godot으로 구성한 모바일 앱이다."
recordType: code-evidence
sourceScope: repository-history
socialImage: "/static/lonely-candle-appicon.jpg"
tags: [project, godot, ios]
draft: false
lang: ko
---

> **검토 범위**
> 로컬 소스, 관련 테스트, Blender 장면, 변경 이력을 기준으로 정리한다. 모든 기기와 입력 환경에서의 감각적 결과는 이 글의 확인 범위 밖이다.

## 프로젝트

Lonely Candle은 기울기, 입김, 재점화에 반응하는 모바일 촛불 장면이다. Blender의 Mantaflow 장면을 런타임에 그대로 가져오는 대신, Godot에서 필요한 형상·상태·입력 반응을 구성한다.

## 장면과 상태

`godot/scripts/main.gd`는 거의 빈 `main.tscn` 위에서 환경, 카메라, 촛불, 불꽃, 연기, 개발 패널을 조립한다. 촛불 재질과 불꽃·연기 재질은 별도의 shader material을 사용하며, 재생 상태는 `LIT`, `OUT`, `RELIGHTING`으로 구분한다.

## 입력 반응

마이크 입력은 원시 바람값과 화면 연출용 smoothing 값을 분리한다. 일정 세기의 바람이 `extinguish_hold` 시간 동안 유지될 때만 소화 상태로 전환되며, 단발성 노이즈가 즉시 상태를 바꾸지 않게 한다.

기울기 입력은 현재 tilt, 속도, 강성·감쇠 상수를 통해 불꽃의 반응에 사용한다. 입력값과 화면 변형을 1:1로 연결하지 않고, 움직임이 따라오는 방식으로 다루는 범위다.

## 관련 변경

- `de5bcf0` · Android versionCode 보정
- `fdac97f` · 버전 단일 원천과 Fastlane 배포 흐름 추가
- `b932928` · 서명·APK 업로드 흐름 보정
- `fd60e6c` / `dfb9263` · 개발자 정보와 설정 팝업 보완

## 확인 범위

이 기록은 `godot/scripts/main.gd`, 관련 테스트, `lonely_candle.blend`, 변경 이력을 기준으로 한다. 실제 기기 마이크 감도와 자이로 반응은 기기 조건에 따라 별도로 확인한다.

## 관련 기록

- [포트폴리오 요약](/projects/lonely-candle)
- [v1.2 릴리즈 노트](/blog/releases/2026-08-05-lonely-candle-1.2)
