---
title: "[2026-02-04] [Screen Saver Extension] v1.0.6 릴리즈"
description: "Chrome Web Store 새 주소와 Google 계정 페이지에서 스크린세이버가 뜨지 않도록 막았습니다."
socialImage: "/static/screen-saver/01-one-click.jpg"
tags:
  - release
  - extension
  - screen-saver-extension
aliases:
  - "Screen Saver Extension 1.0.6"
  - "Screen Saver Extension 릴리즈"
draft: false
lang: ko
enableToc: true
cssclasses:
  - release
  - changelog
created: "2026-02-04"
updated: "2026-08-11"
---

## 🎉 [Screen Saver Extension] v1.0.6 릴리즈

> 📅 릴리즈 날짜: 2026-02-04

![아이콘을 누르면 지금 보고 있는 탭이 전체화면 스크린세이버로 바뀌는 화면 — 이번 버전이 막은 페이지에서는 이 화면이 뜨지 않는다](/static/screen-saver/01-one-click.jpg)

v1.0.6을 공개합니다. 기능 추가는 없고 스크린세이버가 뜨면 안 되는 페이지를 더 막았습니다.

## 🔧 Improvements

Chrome Web Store가 새 주소(`chromewebstore.google.com`)로 옮겨간 뒤에도 확장은 옛 주소만 막고 있었습니다. 새 주소에서 스크린세이버가 켜지면 확장을 설치하려던 사람은 화면이 덮인 채로 당황하게 됩니다. 새 주소를 목록에 넣었습니다.

Google 계정 로그인(`accounts.google.com`)과 계정 관리(`myaccount.google.com`) 페이지도 함께 막았습니다. 로그인 도중 화면이 덮이면 입력하던 것을 잃습니다.

## ⚙️ Under the Hood

`CLAUDE.md`에 "제한된 페이지" 섹션을 만들어 어떤 주소에서 스크린세이버가 동작하지 않는지, 왜 그렇게 했는지를 적어 두었습니다. 프로토콜 단위로 막는 것(`chrome://`, `edge://`, `about:`, `view-source:`)과 도메인 단위로 막는 것을 나눠 정리했습니다.

## 🔜 What's Next

여기까지가 코드 작업의 마지막이었습니다. 이후 반년 동안 남아 있던 일은 Chrome Web Store 등록 자산이었고 2026년 8월에 스크린샷 다섯 장을 만들며 그 일을 마쳤습니다.

## 🚀 Try it

- [GitHub 릴리즈 페이지](https://github.com/4sizn/screen-saver-extension/releases/tag/v1.0.6)
- [저장소](https://github.com/4sizn/screen-saver-extension)
- [스토어 등록 준비 기록](/blog/releases/2026-08-11-screen-saver-extension-store-assets)
