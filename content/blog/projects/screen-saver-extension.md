---
title: "Screen Saver Extension 제작기 — 현재 탭을 덮되, 안전한 페이지는 건드리지 않기"
description: "탭별 전체화면 상태·브라우저 저장소·제한 페이지 정책을 분리한 확장 개발 기록"
socialImage: "/static/screen-saver/01-one-click.jpg"
tags: [project, chrome-extension, react]
draft: false
lang: ko
---

## 문제: 한 번의 실행은 쉬워도, 잘못된 페이지에서의 실행은 위험하다

이 확장은 현재 탭을 스크린세이버로 전환한다. 그러나 로그인·계정 관리·웹 스토어에서 화면을 덮으면 사용자는 입력 흐름을 잃을 수 있다. 그래서 기능보다 먼저 실행해도 되는 페이지를 판정하고 탭 상태를 복구하는 경계를 설계했다. 이 글은 공개 소스와 Git 이력에 근거한다.

## 구조: 정책·상태·설정을 각각 저장했다

`entrypoints/background.ts`는 탭 URL을 확인하고 content script를 주입할 수 없는 프로토콜과 도메인을 제한한다. 탭별 활성 상태는 `lib/storage.ts`의 `chrome.storage.session`에 두어 service worker 재시작 뒤에도 복구하고, 화면·시계·언어·단축키는 `lib/settingsStorage.ts`의 sync storage에 분리한다. 사용자가 선택한 지속 설정과 일시적인 탭 실행 상태를 같은 저장소에 섞지 않은 선택이다.

## 반복한 문제

### URL 정책은 프로토콜과 도메인을 함께 다뤄야 했다

`4917375`는 새 Chrome Web Store 도메인을 제한 목록에 추가했다. `chrome://` 같은 프로토콜 차단만으로는 웹 스토어·Google 계정처럼 일반 HTTPS 도메인인 민감한 화면을 막을 수 없었다. 따라서 제한 목록을 두 층으로 나누고, background 단계에서 아이콘과 실행을 비활성화한다.

### 설정이 아닌 실행 상태의 유효 기간

`85362d2`는 전역 단축키와 활성 상태 저장 방식을 보정했다. 화면을 계속 유지해야 하는 값과 탭이 닫히면 사라져야 하는 값을 구분함으로써, 탭 전환·service worker 수명과 상관없이 예측 가능한 종료 흐름을 만들었다.

## 이력에서 확인한 변화

- `85362d2` — 전역 단축키와 활성 상태 개선
- `23f3f01` — 제한 페이지 정책을 문서화
- `4917375` — 새 Web Store 도메인 차단
- `c01a9a1` — Web Store 등록용 스크린샷 추가

## 검증 범위와 현재 상태

이 글은 `entrypoints/background.ts`, `lib/storage.ts`, `lib/settingsStorage.ts`, `wxt.config.ts`와 공개 이력을 검토해 작성했다. 스토어 자산 작업은 [별도 기록](/blog/releases/2026-08-11-screen-saver-extension-store-assets)으로, 릴리즈 변경은 [v1.0.6](/blog/releases/2026-02-04-screen-saver-extension-1.0.6)으로 분리한다. [소스](https://github.com/4sizn/screen-saver-extension)와 [포트폴리오 요약](/projects/screen-saver-extension)을 확인할 수 있다.
