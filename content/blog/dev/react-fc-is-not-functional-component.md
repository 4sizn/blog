---
title: "React.FC는 함수형 프로그래밍을 뜻하지 않는다"
description: "React의 function component와 함수형 프로그래밍을 같은 말로 부르지 않아야 하는 이유"
tags:
  - React.js
  - JavaScript
  - Frontend
  - Programming-Paradigm
aliases:
  - "React.FC is not Functional Component"
  - "함수형 컴포넌트"
  - "function component"
draft: false
lang: ko
enableToc: true
created: "2022-04-13"
updated: "2026-08-12"
---

> **마이그레이션 범위**: 2022년 4월 13일 공개한 [원문 Notion 메모](REDACTED-NOTION-SOURCE-URL)를 옮겼다. 원문은 작성 중인 짧은 메모였으므로, 원문에 없는 역사·성능·설계 효과를 새로 주장하지 않고 핵심 결론과 용어의 경계를 정리한다.

## `React.FC`가 가리키는 것

React에서 `React.FC`는 함수로 작성한 컴포넌트의 타입을 표현할 때 쓰는 표기다. 여기서 **function**은 클래스가 아닌 함수 형태로 컴포넌트를 선언했다는 뜻이다.

```tsx
// 함수 형태의 React 컴포넌트
function Greeting() {
  return <p>Hello</p>
}
```

이 선언 방식만으로 그 컴포넌트가 함수형 프로그래밍 패러다임을 따르게 되는 것은 아니다.

## 혼동하기 쉬운 두 표현

### Function component

- React 컴포넌트의 **선언 형태**를 설명한다.
- class component와 대비되는 UI 구현 방식이다.
- 내부에서 상태, effect, mutable 값, 외부 API를 어떻게 다루는지까지 보장하지 않는다.

### Functional programming

- 프로그램을 구성하는 **패러다임**을 설명한다.
- 원문 메모는 함수형 프로그래밍을 “대입문이 없는 프로그래밍”이라는 키워드로 짚으며, React의 함수 모양 컴포넌트와 같은 범주의 말이 아니라고 결론 내렸다.
- 정확한 정의와 실천은 언어·문맥에 따라 더 넓게 논의되지만, 적어도 “함수로 컴포넌트를 작성한다”는 사실 하나만으로 함수형 프로그래밍이라고 부를 수는 없다.

## 왜 이름을 구분해야 하나

두 표현을 섞으면 코드 리뷰나 설계 대화에서 서로 다른 질문을 한 단어로 답하게 된다.

- “이 컴포넌트는 class인가 function인가?”는 React UI의 선언 형태를 묻는다.
- “이 로직은 어떤 상태 변경과 부수 효과를 허용하는가?”는 프로그래밍 모델을 묻는다.

따라서 문서와 대화에서는 **function component**를 우선 사용하고, 함수형 프로그래밍이라는 말은 불변성·상태 변경·부수 효과 같은 패러다임의 논의가 실제로 필요한 곳에 한정하는 편이 명확하다.

## 원문에서 이어 온 결론

원문 메모의 요지는 간단하다. 일반적인 개발 패러다임으로서의 함수형 프로그래밍과 React의 함수 형태 컴포넌트 사이에는 자동적인 등식이 성립하지 않는다. 이름이 비슷하다는 이유로 구현의 성격까지 추론하지 말자는 기록이다.

## 출처

- [React.FC is not Functional Component — Notion 원문, 2022-04-13](REDACTED-NOTION-SOURCE-URL)
- [React RFC #863 — “functional component”를 “function component”로 바꾸자는 제안](https://github.com/reactjs/rfcs/pull/863)
