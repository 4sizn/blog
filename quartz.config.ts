import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "4sizn blog",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "4sizn.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Space Grotesk",
        body: "Inter",
        code: "JetBrains Mono",
      },
      // zinc 스케일 + 민트 액센트. 한글 폴백은 styles/custom.scss 참고
      //
      // 색 값은 전부 배경 대비 4.5:1(WCAG AA 본문) 이상으로 잡는다. gray는
      // 카드 설명·날짜·네비 비활성 링크처럼 실제로 읽는 텍스트에 쓰이므로
      // "흐린 장식"이 아니라 "읽히는 보조 텍스트"로 취급해야 한다.
      // 순백·순흑 대신 액센트(에메랄드) 쪽으로 아주 살짝 틴트해 화면이
      // 합성물처럼 보이지 않게 한다.
      colors: {
        lightMode: {
          light: "#fbfcfb", // 배경
          lightgray: "#e3e6e4", // 테두리·구분선
          gray: "#71717a", // 보조 텍스트 — 4.7:1
          darkgray: "#3f3f46", // 본문 — 10.2:1
          dark: "#0a0f0d", // 제목 — 18.8:1
          // 민트(#33e092)는 밝은 배경에서 1.9:1이라 링크로 쓸 수 없다.
          // emerald-700까지 낮춰야 본문 크기에서 4.5:1을 넘는다 — 5.3:1
          secondary: "#047857",
          tertiary: "#34d399",
          highlight: "rgba(4, 120, 87, 0.09)",
          textHighlight: "#04785744",
        },
        darkMode: {
          light: "#16191a", // 배경
          lightgray: "#252829", // 테두리·구분선
          gray: "#8b8f94", // 보조 텍스트 — 5.4:1
          darkgray: "#a1a1aa", // 본문 — 6.9:1
          dark: "#f4f6f5", // 제목 — 16.3:1
          secondary: "#33e092", // 10.3:1
          tertiary: "#6ee7b7",
          highlight: "rgba(51, 224, 146, 0.1)",
          textHighlight: "#33e09244",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.KoreanFonts(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
