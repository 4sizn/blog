import { QuartzConfig } from "./quartz/cfg";
import * as Plugin from "./quartz/plugins";

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
		baseUrl: "4sizn.github.io/blog",
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
			colors: {
				lightMode: {
					light: "#ffffff",
					lightgray: "#e4e4e7",
					gray: "#a1a1aa",
					darkgray: "#3f3f46",
					dark: "#000000",
					// 민트(#33e092)는 흰 배경에서 대비비 1.9:1이라 링크로 쓸 수 없어
					// 라이트 모드만 emerald-600으로 낮춤
					secondary: "#059669",
					tertiary: "#34d399",
					highlight: "rgba(5, 150, 105, 0.1)",
					textHighlight: "#05966944",
				},
				darkMode: {
					light: "#18181b",
					lightgray: "#27272a",
					gray: "#52525b",
					darkgray: "#a1a1aa",
					dark: "#ffffff",
					secondary: "#33e092",
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
};

export default config;
