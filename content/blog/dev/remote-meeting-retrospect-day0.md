---
title: "Remotemeeting [RETROSPECT] 회고 Day0"
description: "서비스 UserList 상태 구조 개선안"
tags:
  - RemoteMeeting
  - React.js
  - Recoil
  - Retrospect
aliases:
  - "Remotemeeting/[RETROSPECT] 회고 Day0"
draft: false
lang: "ko"
enableToc: true
created: "2022-03-07"
updated: "2022-03-07"
---

## Fact

### 개요

Jquery로 운영되었던 Legacy 코드를 React 코드로 전면 개편이 되었습니다. Recoil 기반으로 상태 관리를 다루고 있습니다.

### Problem

서비스 이용시, **사용자와 관련된 메시지**(사용자 진입, 상태 변환, 모드변환, 서버단 주도 하에 발생)를 서버에서 받았을 경우에 서비스가 버벅이거나 비이상적 현상이 가시적으로 확인됩니다. 사용자 정보에 의존하는 컴포넌트에 현재 최적화가 되어있지 않는 상황이며, **특정 유저의 데이터가 업데이트되었을 경우, 전체 유저 상태가 변경되어 불필요한 컴포넌트가 렌더링 이슈가 존재합니다 (1)**.

### Want

상위에 언급했던 **(1)의 내용에 이슈를** 최우선으로 해결해야할 것으로 판단됩니다.
특정 사용자가 업데이트 되었을 경우, 해당 사용자에게만 해당되는 컴포넌트만 렌더링이 되어야 하는 부분을 궁극적인 목표로 작업이 진행되어야 합니다.

## Body (In Recoil)

### [Current 작업된 내용]

- atom으로 UserList를 관리하며 destructring으로 특정 사용자 정보(get, set) 처리.
- atom Effect로 서버단에서 받아오는 UserList로 사용자 정보 immutable update
- 단일 사용자 정보를 다루기 위해 `(selectorFamily || atom[id] 접근)` 작업자마다 별개의 hooks 개발 및 여러부분이 혼재.
- **atom/atom_effect**로 사용자 이벤트를 관리 할 경우, immutable에 의해 이에 파생된 selector에 불필요한 Effect가 전달됩니다. -> 컴포넌트에 여러 부분에 불필요한 Rendering 발생.

### [방안1]

- Recoil 사용자 정보 base를 atomFamily로 관리
- 문제 : **atomFamily/atom_effect**()를 이용할 경우, 룸내 사용자 인원수당 이벤트 생성으로 다수 인원 존재할 경우 메모리 낭비, 기존 Map형식의 UserList 로직 수정 불가피

### [방안2] (채택!)

- 사용자 정보 base를 `[Current 작업]`과 동일하게 atom으로 관리, React Component에 관련된 상태를 `[selectorFamily]`로 관리. 단! atom/atom_effect() 이벤트 핸들러를 다룰때, 변경이 된 특정 사용자 정보만 `[selectorFamily]`에 영향을 주도록 조건 처리
- 관련 회고: [Remotemeeting [RETROSPECT] 회고 Day1](./remote-meeting-retrospect-day1)
