---
title: "Screen Saver Extension"
description: "현재 탭을 전체 화면 스크린세이버로 전환하는 Chrome 확장 프로그램이다."
recordType: code-evidence
sourceScope: repository-history
socialImage: "/static/screen-saver/01-one-click.jpg"
tags: [project, chrome-extension, react]
draft: false
lang: ko
---

> **검토 범위**
> 공개 소스와 변경 이력을 기준으로 정리한다. 사용자의 실제 탭·계정 정보와 스토어 운영 데이터는 포함하지 않는다.

## 프로젝트

Screen Saver Extension은 현재 탭을 전체 화면 스크린세이버로 전환하는 Chrome 확장 프로그램이다. 화면 전환뿐 아니라, 실행하면 안 되는 페이지를 구분하고 탭별 실행 상태와 지속 설정을 나누는 범위가 함께 있다.

## 실행 정책

`entrypoints/background.ts`는 탭 URL을 확인하고 content script를 주입할 수 없는 프로토콜과 도메인을 제한한다. 브라우저 내부 페이지뿐 아니라 웹 스토어와 계정처럼 일반 HTTPS 도메인인 민감한 화면도 정책 범위에 포함된다.

`4917375`에는 새 Chrome Web Store 도메인을 제한 목록에 추가한 변경이 남아 있다. 프로토콜만으로는 충분하지 않은 페이지 판정을 도메인 정책과 함께 다루는 흐름이다.

## 탭 상태와 설정

탭별 활성 상태는 `lib/storage.ts`의 `chrome.storage.session`에 두고, 화면·시계·언어·단축키 설정은 `lib/settingsStorage.ts`의 sync storage에 둔다. 지속해야 하는 사용자 설정과 탭이 닫히면 사라져야 하는 실행 상태를 구분한다.

`85362d2`에는 전역 단축키와 활성 상태 저장 방식을 보정한 변경이 남아 있다.

## 관련 변경

- `85362d2` · 전역 단축키와 활성 상태 개선
- `23f3f01` · 제한 페이지 정책 문서화
- `4917375` · 새 Web Store 도메인 차단
- `c01a9a1` · Web Store 등록용 스크린샷 추가

## 확인 범위

이 기록은 `entrypoints/background.ts`, `lib/storage.ts`, `lib/settingsStorage.ts`, `wxt.config.ts`와 공개 이력에서 확인한 구성이다. 제한 목록의 모든 외부 페이지와 service worker 재시작 상황은 확장 실행 환경에서 추가 확인이 필요하다.

## 관련 기록

- [소스](https://github.com/4sizn/screen-saver-extension)
- [포트폴리오 요약](/projects/screen-saver-extension)
- [스토어 자산 기록](/blog/releases/2026-08-11-screen-saver-extension-store-assets)
- [v1.0.6 릴리즈 노트](/blog/releases/2026-02-04-screen-saver-extension-1.0.6)
