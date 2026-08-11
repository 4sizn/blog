---
title: "[2026-08-11] [Screen Saver Extension] Chrome Web Store 등록 준비"
description: "Screen Saver Extension v1.0.6의 Chrome Web Store 제출 자산을 준비했습니다. 등록용 스크린샷 5장과 권한 정당화 문서를 정리했습니다."
socialImage: "/static/screen-saver/01-one-click.jpg"
tags:
  - release
  - extension
  - screen-saver-extension
aliases:
  - "Screen Saver Extension 스토어 등록 준비"
  - "Screen Saver Extension 웹스토어 스크린샷"
draft: false
lang: ko
enableToc: true
cssclasses:
  - release
  - changelog
created: "2026-08-11"
updated: "2026-08-11"
---

## 📦 [Screen Saver Extension] Chrome Web Store 등록 준비

> 📅 작업 날짜: 2026-08-10 · 현재 버전: v1.0.6 (2026-02-04)

새 버전 릴리즈는 아닙니다. 확장 코드는 v1.0.6 그대로이고, **Chrome Web Store 제출에 필요한 자산**을 준비했습니다.
등록용 스크린샷 5장을 만들고, 이미 써 둔 권한 정당화 문서를 정리했습니다.

## 🗓️ 반년 동안 멈춰 있던 이유

마지막 코드 커밋은 2월 4일 v1.0.6이었습니다. 기능은 그때 이미 다 붙어 있었습니다.
원클릭 활성화, 기본 이미지 15장, 커스텀 이미지 업로드, Cover/Contain 표시 모드, 디지털 시계, 단축키, 4개 언어.
그런데도 스토어에는 올라가지 않았습니다.

남아 있던 건 코드가 아니라 **스토어 등록 자산**이었습니다. 스크린샷 다섯 장, 그리고 그걸 만들 마음.
기능 하나 추가하는 것보다 이게 더 미뤄졌다는 게 좀 웃깁니다.

## ✨ What's New

**원클릭 활성화** — 아이콘 한 번에 지금 보고 있는 탭이 전체화면으로 바뀝니다.

![원클릭으로 전체 탭 스크린세이버가 켜지는 화면](/static/screen-saver/01-one-click.jpg)

**기본 이미지 15장** — Unsplash 자연 사진을 번들로 넣어두고 켤 때마다 무작위로 고릅니다.

![기본 내장된 자연 이미지 15장을 소개하는 화면](/static/screen-saver/02-nature-library.jpg)

**내 이미지** — 업로드하면 1920x1080, 500KB 정도로 압축됩니다. 활성/비활성과 순서를 직접 정할 수 있고,
커스텀 이미지가 기본 이미지보다 먼저 나옵니다.

![커스텀 이미지 업로드와 순서 지정을 보여주는 화면](/static/screen-saver/03-custom-images.jpg)

**표시 방식과 시계** — 화면을 꽉 채우는 Cover와 비율을 지키는 Contain 중에 고르고,
디지털 시계는 원하는 시간대로 표시할 수 있습니다.

![Cover/Contain 표시 모드와 디지털 시계를 보여주는 화면](/static/screen-saver/04-display-clock.jpg)

**통제권** — ESC 또는 직접 지정한 키로 끄고, 영어·한국어·일본어·독일어를 지원하고,
탭마다 켜짐/꺼짐이 따로 관리되고, 추적이나 분석은 넣지 않았습니다.

![종료 키, 4개 언어, 탭별 상태, 무추적을 정리한 화면](/static/screen-saver/05-controls-privacy.jpg)

## 🧰 스크린샷을 코드로 만들기

이미지 편집기에서 손으로 만들면 문구 하나 고칠 때마다 다시 배치해야 합니다.
그래서 스크린샷 자체를 따로 프로젝트로 만들었습니다. Next.js 에디터를 하나 띄우고, 화면 구성을 JSON에 담았습니다.

```json
{
  "id": "screen-saver-hero",
  "layout": "hero",
  "label": { "en": "ONE-CLICK ACTIVATION" },
  "headline": { "en": "One click.\nA full-tab screen saver." },
  "screenshot": "/screenshots/chrome/desktop/en/nature-01.jpg"
}
```

레이아웃은 다섯 장이 각각 다릅니다. 히어로, 브라우저 창이 아래로 걸리는 것, 두 창이 겹치는 것,
위에 걸리는 것, 창 없이 텍스트만. 같은 구도가 다섯 번 반복되면 스토어 페이지를 넘겨볼 이유가 없어지니까요.

이 JSON을 git으로 추적하니 부수 효과가 하나 생겼습니다. 다음 버전 스크린샷을 만들 때
빈 화면에서 시작하지 않아도 됩니다. 문구만 고치고 다시 export하면 됩니다.

## ⚙️ Under the Hood

export한 PNG 다섯 장이 4.6MB였습니다. 그림 자체는 그라디언트 배경에 창 하나뿐인데 용량이 이상하게 컸습니다.
확인해 보니 `html-to-image`로 뽑은 PNG가 전부 RGBA였습니다. 투명한 픽셀이 하나도 없는데
채널은 네 개, 즉 픽셀마다 의미 없는 알파 값을 하나씩 더 들고 있었던 겁니다.

배경을 불투명하게 굽고(flatten) RGB로 다시 저장했더니 2.6MB가 됐습니다. 43% 줄었습니다.
크기는 스토어 규격인 1280x800 그대로입니다.

| 스크린샷 | flatten 전 | flatten 후 |
|----------|-----------|-----------|
| 01 one-click | 891KB | 487KB |
| 02 nature-library | 1057KB | 656KB |
| 03 custom-images | 993KB | 569KB |
| 04 display-clock | 1181KB | 717KB |
| 05 controls-privacy | 569KB | 235KB |

투명 배경이 필요한 자산이 아니라면 export 단계에서 배경색을 지정해 굽는 게 낫습니다.
스토어에 올라가는 스크린샷은 투명일 이유가 애초에 없습니다.

## 📄 제출 문서

심사에 필요한 답변은 레포에 영어·한국어로 정리해 뒀습니다.

- 단일 목적 설명 — 브라우저에서 원클릭 스크린세이버를 제공하는 단일 목적
- 원격 코드 미사용 — 모든 코드가 확장 패키지에 번들, 외부 스크립트 로드 없음
- 권한별 정당화 — `activeTab`, `notifications`, `storage`, `tabs`, `unlimitedStorage`
- 호스트 권한 정당화 — 번들된 기본 이미지 15장을 모든 탭에서 불러오기 위한 `web_accessible_resources`

## 🔜 What's Next

- [ ] Chrome Web Store 개발자 대시보드에 제출
- [ ] 심사 통과 후 스토어 링크를 프로젝트 페이지와 README에 반영

정리해 보면 이번 작업에서 시간을 쓴 곳은 확장 코드가 아니라 "확장을 설명하는 것"이었습니다.
기능을 다섯 문장으로 줄이고, 그중 무엇을 첫 장에 둘지 고르는 일. 심사용 자료라기보다
내가 만든 것이 무엇인지 다시 확인하는 작업에 가까웠습니다.

## 🚀 Try it

- [저장소](https://github.com/4sizn/screen-saver-extension)
- [v1.0.6 릴리즈 노트](/blog/releases/2026-02-04-screen-saver-extension-1.0.6)
- [프로젝트 페이지](/projects/screen-saver-extension)

