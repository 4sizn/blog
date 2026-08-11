---
title: "Math.random()은 진짜 랜덤이 아니다: JavaScript의 난수 생성 이해하기"
socialImage: "/static/blog-thumbnails/math-random.jpg"
description: "JavaScript Math.random()의 동작 원리와 한계, 그리고 진정한 무작위를 얻는 방법"
tags:
  - javascript
  - Computer-Science
  - Algorithm
aliases:
  - "난수 생성"
  - "PRNG"
  - "의사 난수"
draft: false
lang: "ko"
enableToc: true
created: "2026-01-11"
updated: "2026-01-11"
---

## 랜덤이란 무엇인가?

우리는 흔히 "랜덤"이라는 단어를 사용합니다. 하지만 컴퓨터에서의 "랜덤"은 우리가 생각하는 진정한 무작위와는 다릅니다.

### 진정한 랜덤 (True Random)

- 예측 불가능
- 패턴이 없음
- 재현 불가능
- 예: 방사성 붕괴, 양자 현상, 주사위 굴리기

### 의사 랜덤 (Pseudo Random)

- 알고리즘으로 생성
- **결정론적** (같은 시드 = 같은 결과)
- 패턴이 존재 (주기가 있음)
- 예: 컴퓨터의 `Math.random()`

## Math.random()의 정체

### 기본 사용법

```javascript
// 0 이상 1 미만의 부동소수점 난수 반환
Math.random() // 0.347281947...

// 정수 뽑기
Math.floor(Math.random() * 10) // 0~9 사이의 정수
Math.floor(Math.random() * 100) // 0~99 사이의 정수

// 범위 지정
function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

randomRange(1, 6) // 1~6 사이 (주사위)
```

### 실제 동작 방식

`Math.random()`은 **PRNG(Pseudorandom Number Generator, 의사 난수 생성기)**를 사용합니다.

```javascript
// 실제로는 이런 알고리즘을 사용 (단순화된 예시)
class SimplePRNG {
  constructor(seed) {
    this.seed = seed
  }

  next() {
    // Linear Congruential Generator (LCG) 알고리즘
    this.seed = (this.seed * 1103515245 + 12345) % 2147483648
    return this.seed / 2147483648
  }
}

const rng = new SimplePRNG(Date.now())
console.log(rng.next()) // 0.347281947...
console.log(rng.next()) // 0.892743561...
```

## Math.random()은 무작위가 아니다?

### 증명 1: 시드 재현성

같은 시드값으로 시작하면 같은 수열이 생성됩니다.

```javascript
// V8 엔진의 내부 구현 (개념적 예시)
let seed = 12345

function predictableRandom() {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff
  return seed / 2147483648
}

// 항상 같은 순서
console.log(predictableRandom()) // 0.347281947...
console.log(predictableRandom()) // 0.892743561...

// 시드를 초기화하면 같은 수열 반복
seed = 12345
console.log(predictableRandom()) // 0.347281947... (동일!)
```

### 증명 2: 주기성

PRNG는 유한한 주기를 가집니다. 충분히 많은 난수를 생성하면 패턴이 반복됩니다.

```javascript
// 간단한 LCG의 주기 문제
class BadRNG {
  constructor(seed) {
    this.seed = seed
    this.history = new Set()
  }

  next() {
    this.seed = (this.seed * 1103515245 + 12345) % 65536

    if (this.history.has(this.seed)) {
      console.log("주기 감지! 같은 값이 반복됩니다.")
    }
    this.history.add(this.seed)

    return this.seed / 65536
  }
}
```

### 증명 3: 통계적 편향

완벽한 PRNG는 통계적으로 균등 분포를 가져야 하지만, 많은 구현들이 미묘한 편향을 가집니다.

```javascript
// 편향 테스트
function testBias(samples = 1000000) {
  const buckets = Array(10).fill(0)

  for (let i = 0; i < samples; i++) {
    const num = Math.floor(Math.random() * 10)
    buckets[num]++
  }

  console.log("분포:", buckets)
  console.log("각 버킷 예상:", samples / 10)

  // 이론적으로는 각 버킷이 100,000개씩
  // 실제로는 약간의 편차 존재
}

testBias()
```

## JavaScript에서 정수 뽑기의 함정

### 흔한 실수

```javascript
// ❌ 나쁜 방법: 편향 발생
Math.round(Math.random() * 10) // 0과 10이 다른 숫자의 절반 확률

// ✅ 올바른 방법
Math.floor(Math.random() * 11) // 0~10 균등 분포
```

### 편향 원인

```javascript
// round를 사용하면
// 0: [0, 0.5)    -> 50% 확률
// 1: [0.5, 1.5)  -> 100% 확률
// ...
// 10: [9.5, 10)  -> 50% 확률

// floor를 사용하면
// 0: [0, 1)      -> 100% 확률
// 1: [1, 2)      -> 100% 확률
// ...
// 10: [10, 11)   -> 100% 확률
```

## 더 나은 난수 생성 방법

### 1. Web Crypto API (권장)

진정한 난수에 가까운 **암호학적으로 안전한 난수**를 생성합니다.

```javascript
// crypto.getRandomValues()
const array = new Uint32Array(1)
crypto.getRandomValues(array)
const randomNumber = array[0] / (0xffffffff + 1)

console.log(randomNumber) // 진짜 랜덤에 가까움

// 헬퍼 함수
function cryptoRandom() {
  const array = new Uint32Array(1)
  crypto.getRandomValues(array)
  return array[0] / (0xffffffff + 1)
}

function cryptoRandomInt(min, max) {
  const range = max - min + 1
  const bytesNeeded = Math.ceil(Math.log2(range) / 8)
  const maxValue = Math.pow(256, bytesNeeded)
  const randomBytes = new Uint8Array(bytesNeeded)

  let randomValue
  do {
    crypto.getRandomValues(randomBytes)
    randomValue = 0
    for (let i = 0; i < bytesNeeded; i++) {
      randomValue = (randomValue << 8) + randomBytes[i]
    }
  } while (randomValue >= maxValue - (maxValue % range))

  return min + (randomValue % range)
}

console.log(cryptoRandomInt(1, 6)) // 진짜 랜덤 주사위
```

### 2. Node.js crypto 모듈

```javascript
const crypto = require("crypto")

// 진정한 난수
function secureRandom() {
  return crypto.randomInt(0, Number.MAX_SAFE_INTEGER) / Number.MAX_SAFE_INTEGER
}

// 범위 지정
function secureRandomInt(min, max) {
  return crypto.randomInt(min, max + 1)
}

console.log(secureRandomInt(1, 6))
```

### 3. 외부 엔트로피 사용

```javascript
// 사용자 입력, 시스템 이벤트 등을 조합
class EntropyPool {
  constructor() {
    this.pool = []
  }

  addEntropy(value) {
    this.pool.push(value)
  }

  generate() {
    // 여러 소스의 엔트로피 혼합
    const mouseMovement = Math.random()
    const timestamp = Date.now()
    const performance = performance.now()

    const combined = mouseMovement + timestamp + performance
    return combined % 1
  }
}
```

## 언제 어떤 것을 사용할까?

### Math.random()을 사용해도 되는 경우

✅ 게임의 시각적 효과
✅ UI 애니메이션의 랜덤 딜레이
✅ 낮은 보안 요구사항의 일반 애플리케이션

```javascript
// 괜찮은 사용 예
function randomParticlePosition() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
  }
}
```

### crypto를 사용해야 하는 경우

🔒 보안 토큰 생성
🔒 비밀번호 생성
🔒 암호화 키
🔒 세션 ID
🔒 무결성이 중요한 랜덤 선택

```javascript
// 반드시 crypto 사용
function generateSecureToken(length = 32) {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
}

const token = generateSecureToken()
console.log(token) // "a3f5c7e9d2b4f8a1c5e7d9f3b2a4c6e8..."
```

## 결론

### 핵심 정리

1. **Math.random()은 의사 난수**: 진정한 무작위가 아니라 알고리즘으로 생성
2. **결정론적**: 같은 시드면 같은 수열
3. **주기성 존재**: 충분히 많이 생성하면 패턴 반복
4. **용도에 따른 선택**:
   - 일반적인 용도 → `Math.random()`
   - 보안이 중요한 경우 → `crypto.getRandomValues()`

### 실전 가이드

```javascript
// 일반 용도
const x = Math.random()
const dice = Math.floor(Math.random() * 6) + 1

// 보안 용도
const token = crypto.getRandomValues(new Uint8Array(32))
const secureId = [...token].map((b) => b.toString(16).padStart(2, "0")).join("")
```

**진정한 무작위를 만들어 보자**는 컴퓨터 과학의 오랜 과제입니다. 완벽한 해답은 아직 없지만, 우리는 용도에 맞는 최선의 방법을 선택할 수 있습니다.

---

## 참고 자료

- [How does JavaScript's Math.random() generate random numbers?](https://hackernoon.com/how-does-javascripts-math-random-generate-random-numbers-ef0de6a20131)
- MDN: Math.random()
- MDN: Crypto.getRandomValues()
- PRNG 알고리즘: Linear Congruential Generator (LCG)
