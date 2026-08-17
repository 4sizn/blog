---
title: "Remotemeeting [RETROSPECT] 회고 Day2"
description: "Comopnent와 State 간 단일책임원칙"
tags:
  - RemoteMeeting
  - Recoil
  - React.js
  - Retrospect
aliases:
  - "Remotemeeting[RETROSPECT] 회고 Day2"
draft: false
lang: "ko"
enableToc: true
created: "2022-03-09"
updated: "2022-03-09"
---

Jquery -> React화 코드변경을 목적으로 진행해왔던 리뉴얼 v1이 완료가 되었습니다.
사용자 관점에서 다루는 UI와 기능들은 동일하나, 내부적으로 동작하는 코드는 새로 작업을 하였습니다.
이전과 동일한 UI와 기능 구현을 목적으로 해당 작업을 진행해왔기에 Render Optimazation에 대해 기여하지 못한 점이 아쉬워 v2 버전에서 고도화 및 render Optimization을 타겟으로 작업을 진행을 하고 있습니다.

## Fact

- React는 state나 props가 변경이 되면 `Component.render()`가 동작되는 원리로 UI를 그리게 됩니다.
- ISSUE

React devTool나 프로파일링을 진행 하였을 때, 가시적으로 불필요한 렌더링이 진행되고 있다는 점을 발견하였습니다.
아래 코드는 mqtt에서 받은 Message로 해당 Recoil환경의 atom 단위로 State를 다루고 있습니다.

```text
export type Response = {
	reason: CoreTypes.Layout.Reason;
	reasonEndpointID?: string;
	layout: {
		mode: CoreTypes.Layout.LayoutMode;
		layoutOwnerID: string;
		pinOwnerID: string;
		width: number;
		height: number;
		pinArea: {
			area: WindowInfo,
			pin: Pin[];
		};
		useArea: {
			area: WindowInfo,
			numOfRow: number;
			numOfColumn: number;
			userView: WindowInfo;
		}
	};
	order: {
		pin: string[];
		user: string[];
	};
};
```

mqtt에서 받아오는 layout 객체를 기반으로 UI를 업데이트하는게 목적이었음으로, 해당 객체를 atom단위로 관리를 하고 있었습니다.
여기서 문제가 발생하였습니다.

layout/atom 상태가 update 된다면, 해당 상태를 참조하는 Component는 rerendering이 일어나게 됩니다.
mqtt에서 받아오는 직렬화된 layout 객체 데이터의 전체를 atom에서 다루고 있기에, 이에 파생된 selector를 구현해도 rerendering이 발생합니다.

## Feeling

[Server <- > Client] 메시지 통신간 중요하게 생각되는 부분은 **Message Call(메시지 전송횟수) 최적화**라고 생각합니다.
단일 속성의 데이터를 기준으로만 Message 전달이 된다면, 속성 갯수가 많아지는 만큼 Message Call도 늘어나서 서버에 부담이 늘어납니다.

> 예시) 메시지 전송 횟수 = MessageCall x N (reason, reasonEndpointID, mode, layoutOnwerID ..etc)
> 이를 해소하기 위해 서버단에서는 여러 속성(Attribute)을 하나로 모아 집합(Entity) 형식으로 Client에 Message를 전달하게 됩니다.

**허나, React환경의 Client에서 집합형식의 atom을 이용해 컴포넌트를 작성하게 된다면, Message Call 횟수에 따른 Rerendering이 일어나게 됩니다.**

**해결방안**

React 공식 Reference를 참조하여 해답을 빠른 해답을 찾을수 있었습니다.
[1단계: UI를 컴포넌트 계층 구조로 나누기](https://ko.reactjs.org/docs/thinking-in-react.html#step-1-break-the-ui-into-a-component-hierarchy) 부분의 내용을 인용해보자면 다음과 같습니다.

> 어떤 것이 컴포넌트가 되어야 할지 어떻게 알 수 있을까요? 우리가 새로운 함수나 객체를 만들 때처럼 만드시면 됩니다. 한 가지 테크닉은 단일 책임 원칙입니다. 이는 하나의 컴포넌트는 한 가지 일을 하는게 이상적이라는 원칙입니다. 하나의 컴포넌트가 커지게 된다면 이는 보다 작은 하위 컴포넌트로 분리되어야 합니다. 컴포넌트가 데이터 모델의 한 조각을 나타내도록 분리해주세요.

1. **단일책임의 원칙**에 의거해서 서버에서 받았던 집합(Entity)형식의 객체를 단일 속성(Attribute)로 상태로 분리하여 개별 상태로 나누고(new/atom), React Component에서는 단일 속성 상태 === 단일 데이터 모델를 참조하여 컴포넌트를 작성하면 됩니다(ref new/atom).
2. prevState와 nextState의 값이 동일하다면 상태 업데이트를 하지 말아주세요.

*Render Optimization 작업 내용 [After / Before]*

## Finding

React

> 1단계: UI를 컴포넌트 계층 구조로 나누기

API 설계

[https://okky.kr/article/795157?note=2117602](https://okky.kr/article/795157?note=2117602)

데이터베이스 구조 설계

```text
개체의 특성을 나타내는 '속성(Attribute)'
속성들의 집합으로 이루어진 '개체(Entity)'
```

## Future Action

동일한 내용으로 개체 -> 단일 속성으로 상태 분리
