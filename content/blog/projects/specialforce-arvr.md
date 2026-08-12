---
title: "SpecialForce ARVR 개발 참여 기록 — VR FPS의 행동 상태와 사용자 안내를 함께 설계하기"
description: "Unity 기반 VR 밀리터리 FPS에서 FSM AI·UI·튜토리얼·VR UX와 QA를 맡은 프로젝트 기록"
tags: [project, career, unity, csharp, vr]
draft: false
lang: ko
---

> **근거 범위**: 이 글은 당시 Notion Project Experience에 남긴 서비스 설명·기간·담당 업무·기술 목록과 공개 영상 링크를 바탕으로 작성했다. 원본 게임 소스, 빌드, QA 이슈와 성능 자료는 검토하거나 공개하지 않는다.

## 프로젝트 맥락

SpecialForce ARVR은 국내 FPS 게임 SpecialForce의 후속 VR 밀리터리 FPS 슈팅 게임으로 소개된 프로젝트다. VR 장비가 대중화되기 전, Unity Game Engine을 이용해 가상현실 FPS 경험을 만드는 데 참여했다. 참여 기간은 2017년 3월부터 2017년 9월까지다.

FPS의 적 AI, 플레이어 UI, 튜토리얼은 서로 분리된 화면 요소처럼 보이지만 VR에서는 플레이어가 공간 속에서 행동 상태와 다음 목표를 이해해야 한다. 당시 이력은 FSM 기반 AI와 UI·튜토리얼, VR 환경의 사용자 친화적 UI와 QA를 함께 기록한다.

## 맡은 개발 범위

### Unity 기반 게임 제작

- Unity 기반 VR FPS 게임 제작에 참여했다.
- C#과 3D 렌더링의 기본기를 실제 게임 구현 과정에서 다뤘다.

### FSM 기반 AI

- FSM(Finite State Machine) 기반 AI를 개발했다.
- 오브젝트의 행동 패턴을 FSM mechanism으로 구성하는 업무를 맡았다.

상태 기반 AI에서 중요한 것은 특정 행동 하나보다 행동 전환의 조건과 순서다. 공개 이력에는 개별 상태도나 전환 규칙이 남아 있지 않으므로 구체적인 AI 구조를 재현하지 않고, FSM을 통해 행동 패턴을 구성한 역할까지만 기록한다.

### UI·튜토리얼과 VR UX

- 게임 UI와 튜토리얼을 담당했다.
- VR 환경에서 사용자가 이해할 수 있는 UI를 고려했다.
- Game Quality Assurance를 병행했다.

VR FPS에서는 플레이어가 평면 HUD만 보는 것이 아니라 시선·공간·입력 장치 안에서 정보를 받아들인다. 이력은 AI 구현과 별도로 UI·튜토리얼 및 QA를 담당 범위에 넣어, 행동 설계와 사용자가 그 상태를 이해하는 경험을 함께 다룬 점을 보여준다. 다만 실제 UX 실험, 기기 조건, QA 결과가 공개돼 있지 않아 성능이나 품질 결과를 주장하지 않는다.

## 공개 범위와 링크

- [공개 영상](https://www.youtube.com/watch?v=_NvKY7yhRDY)
- [포트폴리오 요약](/projects/specialforce-arvr)

이 글은 Notion 이력에 기록된 제품 맥락과 역할을 공개 가능한 범위에서 옮긴 문서다. 원본 게임 코드·자산·QA 데이터는 포함하지 않는다.
