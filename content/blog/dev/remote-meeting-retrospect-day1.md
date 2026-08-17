---
title: "Remotemeeting [RETROSPECT] 회고 Day1"
description: "Recoil_effect onSet 상태 이슈 분석"
tags:
  - RemoteMeeting
  - React.js
  - Recoil
  - Retrospect
aliases:
  - "Remotemeeting/[RETROSPECT] 회고 Day1"
draft: false
lang: "ko"
enableToc: true
created: "2022-03-07"
updated: "2022-03-07"
---

## Fact

서비스 고도화 작업을 진행하는 도중,
Recoil단에 사용되는 atom_effect를 사용하면서 느꼈던 불편한점에 대해 공유하고자 합니다.

```typescript
type AtomEffect<T> = ({
  node: RecoilState<T>, // A reference to the atom itself
  storeID: StoreID, // ID for the <RecoilRoot> or Snapshot store associated with this effect.
  trigger: 'get' | 'set', // The action which triggered initialization of the atom

  // Callbacks to set or reset the value of the atom.
  // This can be called from the atom effect function directly to initialize the
  // initial value of the atom, or asynchronously called later to change it.
  setSelf: (
    | T
    | DefaultValue
    | Promise<T | DefaultValue> // Only allowed for initialization at this time
    | ((T | DefaultValue) => T | DefaultValue),
  ) => void,
  resetSelf: () => void,

  // Subscribe to changes in the atom value.
  // The callback is not called due to changes from this effect's own setSelf().
  onSet: (
    (newValue: T, oldValue: T | DefaultValue, isReset: boolean) => void,
  ) => void,

  // Callbacks to read other atoms/selectors
  getPromise: <S>(RecoilValue<S>) => Promise<S>,
  getLoadable: <S>(RecoilValue<S>) => Loadable<S>,
  getInfo_UNSTABLE: <S>(RecoilValue<S>) => RecoilValueInfo<S>,
}) => void | () => void
```

atomEffect는 상위와 같은 코드를 다루고 있습니다.

**불편한점 1: atom_effect/onSet 함수는 atom_effect의 setself()로 발동되지 않는다.**

```typescript
// The callback is not called due to changes from this effect's own setSelf().
```

atom의 내용이 set에 의해 update되었을 경우, onSet에서 변경된 값을 감지할수 있습니다.
예시로 React Comp기준으로 useRecoilCallback내의 set이나, useSetRecoilState을 이용한다면 onSet에서 변경내용을 감지할 수 있습니다.
허나 atom_effect내 setSelf로 인한 자신의 atom을 변경하고자 하는경우, onSet()을 타지 않더군요;

### 불편한점 2: [A] atom_effect기준 [B] atom의 set할 경우 로직 위반 에러 발생

잘못된예시) `[A]atom_effect`에서 `[Events.Command.StatusChanged]` 이벤트 감지 => 콜백으로 `[B]atom`에 관련된 `Event.emit()`할 경우 로직 위반 에러 발생

> [https://github.com/facebookexperimental/Recoil/issues/1077](https://github.com/facebookexperimental/Recoil/issues/1077)

단, React Comp기준으로 useRecoilCallback내의 set이나, useSetRecoilState로 변경할 경우엔 문제 없음.

## Feeling

[코드 개선안]은 RM/room/private 코드와 동일하게 별도 hooks으로 상태관리를 다루는게 더 용이하다고 봅니다.
추후 마스터에 머지될 개선안 코드는 atomEffect가 제거될 예정입니다.

> [https://gitlab.rsupport.com/web/rm/webfrontend/-/merge_requests/new/diffs?merge_request%5Bsource_branch%5D=improve%2Fhsshin%2Fuserlist&merge_request%5Bsource_project_id%5D=1395&merge_request%5Btarget_branch%5D=master&merge_request%5Btarget_project_id%5D=1395](https://gitlab.rsupport.com/web/rm/webfrontend/-/merge_requests/new/diffs?merge_request%5Bsource_branch%5D=improve%2Fhsshin%2Fuserlist&merge_request%5Bsource_project_id%5D=1395&merge_request%5Btarget_branch%5D=master&merge_request%5Btarget_project_id%5D=1395)
