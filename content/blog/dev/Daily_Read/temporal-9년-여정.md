---
title: "Temporal: JavaScript의 시간을 다시 설계한 9년"
socialImage: "/static/blog-thumbnails/temporal-js.jpg"
description: "Bloomberg JS Blog의 글을 바탕으로 JavaScript Date의 한계를 정리하고, Temporal API가 왜 필요했는지 핵심 개념을 정리한다."
tags:
  - JavaScript
  - Temporal
  - ECMAScript
  - Standardization
  - Frontend
aliases:
  - "Temporal 개요"
  - "자바스크립트 Date 한계 정리"
  - "ECMAScript Temporal"
draft: false
lang: "ko"
enableToc: true
created: "2026-03-12"
updated: "2026-03-12"
---

## 들어가며

최근에 자주 만나는 질문이 있습니다.

> “`Date`는 왜 이렇게 다루기 어려운가요?”

이 질문은 단순히 문법의 문제가 아닙니다. 문제의 핵심은 **시간 자체의 모델링**에 있습니다. Bloomberg의 글 *Temporal: The 9-Year Journey to Fix Time in JavaScript*를 읽고 정리하면, 기존 `Date`가 왜 오래 전 부터 고치기 어려웠는지와 Temporal이 어떤 방향으로 접근했는지가 꽤 선명해집니다.

## 왜 Date는 지금도 함정이 남아 있을까

JavaScript의 기본 `Date`는 역사적인 배경 때문에 탄생한 API입니다. 10일짜리 시초 코드에 가까운 기원이 강한 영향입니다.

### 1) 가변성은 버그를 만든다

`Date` 객체는 내부 값이 바뀌기 쉬운 구조입니다. 특히 다음처럼 함수로 넘긴 객체를 실수로 변경해 버리는 일이 흔합니다.

```javascript
const date = new Date("2026-03-12T00:00:00.000Z")

function addOneDay(d) {
  d.setDate(d.getDate() + 1) // 원본 Date를 직접 변이
  return d
}

addOneDay(date)
console.log(date.toISOString())
// 2026-03-13T00:00:00.000Z
```

원본이 바뀐다는 건, 불변하지 않은 값에 의존한 코드에서 추적 비용을 크게 증가시킵니다.

### 2) 월 계산은 직관과 다르다

월 단위 연산은 달마다 날 수가 다르기 때문에 `Date`의 단순 계산이 때로는 의도와 다르게 동작합니다.

```javascript
const billingDate = new Date("Sat Jan 31 2026")
billingDate.setMonth(billingDate.getMonth() + 1)

console.log(billingDate.toISOString())
// 기대: 2026-02-28
// 실제: 2026-03-02 (월 말 처리 방식에 따라 결과가 달라짐)
```

### 3) 문자열 파싱은 환경과 버전마다 다르게 반응할 수 있다

과거 표기들은 브라우저 구현 차이로 결과가 일관되지 않던 적이 적지 않습니다.

```javascript
new Date("2026-06-25 15:15:00")
```

같은 문자열이어도 실행 환경에 따라 해석 타이밍과 결과가 달라지는 상황이 실제로 존재했습니다.

## 라이브러리 의존이 불가피해진 이유

`Date`의 한계를 감추기 위해 생태계는 `moment`, `dayjs`, `date-fns`, `luxon` 같은 라이브러리를 써 왔습니다.

장점은 분명했지만, 실무에서 생기는 비용이 있었습니다.

- 각 라이브러리의 기본 동작을 정확히 이해해야 함
- 타임존/캘린더 처리에 대한 일관성 확보 비용 증가
- 번들 크기 증가
- 팀이 서로 다른 라이브러리를 쓰면 유지보수 분산

즉, “편의 API”는 즉시 해결책처럼 보이지만, 장기적으로는 팀 내부 기준의 표준화 이슈가 생기기 쉬웠습니다.

## Temporal이 왜 필요했나

Temporal은 단일 API 교체가 아니라, **시간 모델의 재설계**에 더 가깝습니다.

### 핵심 원칙

1. **불변성(Immutability)**

   기존처럼 객체가 뒤섞여 바뀌는 것을 줄이고, 값이 바뀌지 않는 상태로 다루도록 설계 방향을 잡습니다.

2. **명시적 타임존(Explicit Time Zone)**

   실행 환경의 로컬 타임존에만 의존하지 않고, 필요한 문맥에서 타임존을 명시적으로 다룹니다.

3. **명확한 타입 계층화**

   `Temporal.ZonedDateTime`, `Temporal.Instant`, `Temporal.PlainDate`, `Temporal.PlainTime`처럼 용도가 분리됩니다.

4. **달력/표기 체계 지원**

   로케일/캘린더가 서로 다를 때도 계산 규칙을 명확히 다룰 수 있는 방향으로 전개됩니다.

## 우리가 실무에서 얻는 이점

Temporal을 도입하면 아래의 실무 이슈가 줄어듭니다.

- DST(서머타임) 경계에서의 모호한 시간 계산
- 같은 타임스탬프를 서로 다른 지역에서 재해석할 때 발생하는 오차
- 기간 계산/날짜 덧셈에서의 경계 조건 처리 누락
- 비즈니스 규칙과 무관하게 환경 의존적으로 처리되는 시간 동작

특히 금융, 예약, 물류, 이벤트 기반 시스템처럼 **“정확한 시간 의미”가 핵심인 도메인**에서는 큰 효과가 있습니다.

## 아직 모든 환경이 완성은 아니지만

Temporal은 Stage 4에 도달했지만, 실제 도입은 아래처럼 단계적으로 보는 게 현실적입니다.

### 바로 전환이 쉬운 경우

- 새로운 기능에서 처음부터 Temporal 우선 설계가 가능한 영역
- 내부 라이브러리의 시간 유틸 계층을 새로 설계할 때
- 서드파티 API와 직렬화/역직렬화 경계가 명확한 서비스

### 리스크가 큰 기존 도메인

- Date와 결합된 매우 오래된 코드베이스
- 외부 JS 생태계(브라우저/라이브러리)와의 호환성 의존도가 높은 화면 영역
- 번들 정책이 엄격한 레거시 환경

이럴 때는 “일괄 교체”가 아니라 **시간 API 경계를 격리하는 계층화 전략**이 더 안전합니다.

## 읽고 정리한 핵심 체크리스트

- Date를 그대로 쓰되, 팀 규칙으로 반드시 래퍼 계층을 두는가?
- 타임존이 들어가는 로직은 유틸에서 통합 관리되는가?
- DST/달력 변경 규칙을 비즈니스 규칙으로 코드에 명시했는가?
- 시간 객체를 mutate 없이 다루는지 코드 리뷰에서 검증하는가?

나는 이 4가지를 확인하지 않으면 “시간 관련 버그”를 끝까지 통제하기 어렵다고 봅니다.

## 결론

`Temporal`은 단순한 API 추가가 아니라, **시간을 어떻게 사고할지**에 대한 기준을 바꿉니다.

`Date`가 살아온 방식은 역사적으로 이해할 수 있지만, 시스템이 성장하는 지금은 더 이상 그 모델이 충분하지 않습니다.

Bloomberg 팀의 글은 이런 메시지를 분명히 남깁니다.

> 시간을 다루는 코드는 단순히 값을 저장하는 코드가 아니라, **비즈니스 신뢰를 저장하는 코드**이다.

향후에 작업할 코드에서 시간 계산이 나오면, “그냥 `Date`로 처리해도 될까?”가 아니라 “이 값의 의미는 무엇인가?”를 먼저 묻는 습관을 가지는 게 중요합니다.

## 참고 자료

- 원문: https://bloomberg.github.io/js-blog/post/temporal/
- ECMAScript Temporal Proposal: https://tc39.es/proposal-temporal/
- MDN Temporal: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Temporal
