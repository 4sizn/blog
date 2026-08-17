---
title: "Remotemeeting [RETROSPECT] 회고 Day5"
description: "React custom Hooks 모르고 쓰면 ‘독!’"
tags:
  - Recoil
  - state
  - React.js
  - Retrospect
aliases:
  - "Remotemeeting[RETROSPECT] 회고 Day5"
draft: false
lang: "ko"
enableToc: true
created: "2022-03-14"
updated: "2022-03-14"
---

[Remotemeeting [RETROSPECT] 회고 Day2](./remote-meeting-retrospect-day2)의 작업 연장선으로, React기반 프로젝트의 render 최적화 작업을 담당하고 있습니다.

## ISSUE

**[Environment]**

React의 컴포넌트가 Rendering 이 되는 조건은 다음과 같습니다.

1. A 컴포넌트의 State와 Props값이 update 되었을 때.
2. Parent of A의 컴포넌트가 rerendering이 되었을 때.

**[Issue Happen]**

A 컴포넌트에 State나 Props의 변경사항이 없어도, rerendering 되는 문제가 발생하였습니다.
위 이슈를 해결하기 위해 컴포넌트의 rerendering이 되는 조건을 분석해보았습니다.
허나, 쉽게 파악이 되지 않아 A component에서 호출했던 **custom hook**을 들어다 보기 시작했습니다.

단일 책임 원칙에 준하는 A컴포넌트와 달리, 호출된 hooks의 내부 코드는 전역상태에 의존을 하고 있어 "단일 책임 원칙"에 위배가 되어 리렌더링이 발생한 이슈였습니다.

## Feeling

**Custom Hooks의 사용목적**

React Reference의 Custom Hooks의 내용을 인용해보자면 다음과 같습니다.

> 오로지 공통의 코드를 뽑아내 새로운 함수로 만든 것뿐입니다. **사용자 정의 Hook은 React의 특별한 기능이라기보다 기본적으로 Hook의 디자인을 따르는 관습입니다.**

코드 재사용과 코드 경량화, 가독성 문제를 직면할때 쯤이면 custom Hook에 구미가 당겨올겁니다.
단일 모델 기준으로 컴포넌트를 구성 잘 했더라면, custom hook으로 코드를 분리해도 정상작동이 되겠지만, 이후 타 작업자간 협업으로 인한 custom hook의 수정으로 단일 책임 원칙이 위배가 된 케이스 였습니다.
custom hook을 별도 파일로 관리가 되는 시점부터 주 컴포넌트와 hooks와의 거리가 상대적으로 멀어짐으로 rerendering이 어디서 발생하는지 파악하는데 많은 시간을 소모하였습니다.

**[Solution]**

custom Hook 전역 상태 참조에 대한 코드를 단일 모델 형식으로 수정하여 해결하였습니다.

![PIP 화면 채팅기능 render 최적화 [After / Before]](/static/remote-meeting-retrospect/chat-render-optimization.gif)

![최적화 작업 반영 피드백](/static/remote-meeting-retrospect/optimization-feedback.png)
