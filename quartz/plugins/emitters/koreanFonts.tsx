import { QuartzEmitterPlugin } from "../types"

// Pretendard는 Inter를 기반으로 만들어진 한글 폰트라 영문 Inter와 획 굵기·넓이가 맞는다.
// dynamic subset이라 브라우저가 실제로 쓰이는 글리프 조각만 받아간다.
const PRETENDARD_HREF =
  "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"

/**
 * 한글 웹폰트를 <head>에 주입한다.
 *
 * quartz.config.ts의 theme.typography는 Google Fonts만 다루는데 Pretendard는 거기 없다.
 * styles/custom.scss에서 `@import url(...)`로 넣는 방법은 쓸 수 없다 — sass가
 * `@use "./base.scss"`를 먼저 펼치는 탓에 @import가 다른 규칙 뒤로 밀리고,
 * CSS 스펙상 그 위치의 @import는 브라우저가 무시한다.
 */
export const KoreanFonts: QuartzEmitterPlugin = () => ({
  name: "KoreanFonts",
  async *emit() {},
  externalResources: () => ({
    additionalHead: [
      <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />,
      <link rel="stylesheet" href={PRETENDARD_HREF} />,
    ],
  }),
})
