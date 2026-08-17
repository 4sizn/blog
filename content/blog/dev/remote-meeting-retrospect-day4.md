---
title: "Remotemeeting [RETROSPECT] 회고 Day4"
description: "React Dependency 이슈 해결책"
tags:
  - Recoil
  - state
  - React.js
  - Retrospect
aliases:
  - "Remotemeeting[RETROSPECT] 회고 Day4"
draft: false
lang: "ko"
enableToc: true
created: "2022-03-10"
updated: "2022-03-10"
---

## ISSUE

### 이슈내용

- 컴포넌트 내, 핸들러 작성시 잘못된 dependecy 인한 state missmatch

**Environment**

1. ComponentA 기준, core module의 Event를 subscribe하는 eventListener 코드 존재.

```typescript
// 예제 코드
function ComponentA() {
  /*
   * @param {string} eventName
   * @param {function} callback
   * @param [React.DependencyList] dependencies
   */
  useEventHandler("Events.Command.A", handler, [])
}
```

**ISSUE**

핸들러 내부 코드는 외부 상태에 의존하는데 잘못된 dependency 기재로 stateA의 sync Miss Match가 발생

```typescript
// 잘못된 코드
function ComponentA() {
	const [b, setB] = useRecoilState(withB);
	const [a, setA] = useRecoilState(withA);
	const handler = (data) => {
		if(!_.isEqual(data, a)){
			setState(data);
		}
	}

	useEventHandler('Events.Command.A', handler, [b]); // issue 잘못된 dependecy 기재
}

// useEventHandler는 b 상태에만 의존됨에 오직 b상태만 sync 보장.
// 우리가 요구하는 a 상태는 missMatch가 발생할 여지가 생김.
```

### Solution

solution 1 : Component의 dependency를 주지 않고, 전적으로 Component Rendering에 의존
-> rerendering마다 handler를 생성함으로 비효율적으로 추천하지 않음.

solution 2 : 제공된 useEventHandler 함수의 올바른 dependency a 인자값 추가

solution 3 : recoil 내장 함수의 useRecoilCallback을 사용한다.

- 3.1 : solution 2와 동일하게 useRecoilCallback내 올바른 dependency a 인자값 추가
- 3.2 : useRecoilCallback내 파라미터를 살펴보면, set과 snapShot을 제공한다. 위 함수를 이용해 함수 호출 시점의 동기화 작업이 가능하다.

```typescript
// 3.2 정상 동작
function ComponentA() {
//	const [b, setB] = useRecoilState(withB);
//	const [a, setA] = useRecoilState(withA);
	const handler = useRecoilCallback(({set, snapshot}) => async (data) => {
		const a = await snapshot.getPromise(setA);

		if(!_.isEqual(data, a)){
//			setState(data);
			set(setA, data);
		}
	})

	useEventHandler('Events.Command.A', handler);
}
```

이점: callback 함수 내에서 state와 updater() 제공함으로 함수 밖에서 useRecoilState()를 변수들을 참조 안해도됨(dependency).

## Feeling

React 내 발생하는 상태 이슈를 파악하고, 이를 해결할 수 있는 방안을 나열하였으며 효과적인 해결책을 찾아내었다.
