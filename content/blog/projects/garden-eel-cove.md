---
title: "Garden Eel Cove"
description: "20년 지기 친구가 바탕화면에 두고 싶다던 정원장어"
recordType: self-owned-product
sourceScope: public-product-record
projectCard: true
projectOrder: 1
projectCategory: toy
projectImage: "static/garden-eel/garden-eel-cove-thumbnail.png"
projectStack:
  - Godot
  - Desktop
projectLinks:
  GitHub: "https://github.com/4sizn/gardeneel-desktop"
tags: [project, desktop, godot]
draft: false
lang: ko
---

20년 지기 친구가 어느 날 바탕화면에 둘 만한 걸 만들어 달라고 했다. 딱히 생산적인 앱은 아니고, 그냥 켜 두고 가끔 보면 재밌는 것. 밥도 먹고, 움직이기도 하고, 다마고치처럼 조금은 돌볼 수 있으면 좋겠다고 했다.

나는 그 친구를 Boss라고 불렀다. 이 프로젝트에서는 내가 기획자라기보다 주문을 받아 만드는 쪽에 가까웠다. Boss가 원하는 건 명확했다. 바탕화면 아래에 정원장어가 살고 있으면 좋겠다는 것.

처음에는 “정원장어가 움직인다” 정도로 생각했다. 그런데 이야기를 듣다 보니 단순히 움직이는 캐릭터를 화면에 얹는 것만으로는 부족했다. 밥을 주면 반응해야 했고, 마우스가 가까이 오면 놀라서 숨는 편이 더 재미있어 보였다. 아무 일 없이 켜 두어도, 가끔 고개를 내민 장어를 보면 한 번쯤 웃을 수 있어야 했다.

그래서 만든 것이 Garden Eel Cove다.

## 바탕화면 아래에 장어를 두기

앱을 켜면 화면 하단의 투명한 영역에 정원장어들이 나타난다. 마우스가 가까워지면 구멍으로 숨고, 가만히 두면 다시 고개를 내민다. 트레이 메뉴에서 밥주기를 고른 뒤 먹이를 떨어뜨리면 장어들이 그쪽으로 반응한다.

![모래 위에서 서로 다른 모습으로 몸을 움직이는 Garden Eel Cove의 정원장어들](/static/garden-eel/garden-eel-cove-herd.png)

여러 마리를 넣은 건 정원장어 한 마리만 계속 보고 있으면 금방 심심해질 것 같아서였다. 어떤 장어는 고개를 내밀고 있고, 어떤 장어는 몸을 흔들고 있다. 모래 위에 같은 모습으로 서 있는 캐릭터 몇 개보다, 작은 수조 한쪽을 훔쳐보는 느낌이 나길 바랐다.

Boss가 “밥 먹는 모습도 보고 싶다”고 했던 말은 그대로 남겼다. 밥주기를 누르고 먹이를 떨어뜨리는 건 대단한 조작은 아니다. 그래도 그 짧은 행동이 있어야 그냥 움직이는 배경이 아니라, 내가 한 번쯤 돌봐 본 장어가 된다. 장어를 붙잡아 볼 수 있는 가벼운 상호작용도 같은 이유로 넣었다.

## 계속 켜 둘 수 있어야 했다

이 앱은 화면을 차지하면 안 됐다. 게임처럼 집중해서 할 것도 아니고, 업무 중에 켜 두는 쪽이 더 어울렸기 때문이다. 장어와 먹이가 없는 영역은 클릭해도 뒤쪽의 바탕화면이나 창을 그대로 쓸 수 있게 했다.

그 덕분에 Garden Eel Cove는 컴퓨터를 쓰는 동안 조용히 옆에 있는 앱이 됐다. 일을 하다 잠깐 아래를 보면 장어가 나와 있고, 마우스를 너무 가까이 가져가면 숨는다. 다시 조용해지면 또 나온다. 그 정도면 충분했다.

## 결국 친구에게 보여 주려고 만든 앱

이 프로젝트는 거창한 문제를 해결하려고 시작한 건 아니다. 오래 본 친구가 재미있을 것 같다며 던진 부탁에서 시작했고, 나는 그 말을 듣고 장어가 밥을 먹고 숨고 다시 나오는 작은 바탕화면 풍경을 만들었다.

그래서 Garden Eel Cove에는 Boss의 요구가 그대로 남아 있다. 밥을 먹어야 하고, 움직여야 하고, 다마고치처럼 조금은 손이 가야 한다는 것. 그걸 다 넣고 나니 “바탕화면에서 구경할 수 있는, 그냥 재밌는 것”이라는 처음의 주문에 꽤 가까워졌다.

## 공개

Garden Eel Cove는 v1.6.0으로 공개되어 있다. macOS와 Windows용 설치 파일, 플랫폼별 설치 안내는 [GitHub 릴리즈 페이지](https://github.com/4sizn/gardeneel-desktop/releases/tag/v1.6.0)에서 확인할 수 있다.

- [v1.6.0 릴리즈 노트](/blog/releases/2026-07-16-gardeneel-desktop-1.6.0)
- [소스](https://github.com/4sizn/gardeneel-desktop)
