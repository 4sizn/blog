import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// sortFn은 toString()으로 직렬화되어 클라이언트에서 실행되므로
// 외부 변수 참조 없이 자기 완결형이어야 함
const explorerSortFn = (a: any, b: any) => {
  const order: Record<string, number> = { log: 0, dev: 1, releases: 2 }
  // 폴더 우선, 폴더끼리는 지정 순서
  if (a.isFolder && !b.isFolder) return -1
  if (!a.isFolder && b.isFolder) return 1
  if (a.isFolder && b.isFolder) {
    const oa = order[a.slugSegment] ?? 99
    const ob = order[b.slugSegment] ?? 99
    if (oa !== ob) return oa - ob
    return a.displayName.localeCompare(b.displayName, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  }
  // 파일끼리는 날짜 최신순, 날짜 없으면 뒤로
  const da = a.data?.date ? new Date(a.data.date).getTime() : 0
  const db = b.data?.date ? new Date(b.data.date).getTime() : 0
  if (da !== db) return db - da
  return a.displayName.localeCompare(b.displayName, undefined, {
    numeric: true,
    sensitivity: "base",
  })
}

// 사이드바 없이 풀폭으로 그리는 포트폴리오형 페이지들. styles/custom.scss가
// 같은 목록을 data-slug로 참조하므로 한쪽만 고치면 어긋난다.
// content/projects/index.md 의 슬러그는 "projects"가 아니라 "projects/index"다.
const PROJECTS_SLUG = "projects/index"
const landingSlugs = ["index", PROJECTS_SLUG, "blog"]
const isLanding = (page: { fileData: { slug?: string } }) =>
  landingSlugs.includes(page.fileData.slug ?? "")

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  // SiteNav는 position: fixed라 렌더 위치와 무관하게 화면 상단 전체를 차지한다
  header: [Component.SiteNav()],
  // 본문 뒤에 붙는 섹션들. afterBody는 PageLayout이 아니라 SharedLayout에만 있어서
  // 페이지 구분은 ConditionalRender로 한다.
  afterBody: [
    Component.ConditionalRender({
      component: Component.ProjectGrid({
        title: "Featured Projects",
        featuredOnly: true,
        limit: 3,
        showMore: true,
      }),
      condition: (page) => page.fileData.slug === "index",
    }),
    Component.ConditionalRender({
      component: Component.RecentPosts({ limit: 5 }),
      condition: (page) => page.fileData.slug === "index",
    }),
    Component.ConditionalRender({
      component: Component.ContributionGraph(),
      condition: (page) => page.fileData.slug === "index",
    }),
    Component.ConditionalRender({
      component: Component.ProjectGrid(),
      condition: (page) => page.fileData.slug === PROJECTS_SLUG,
    }),
    Component.ConditionalRender({
      component: Component.HomeCategoryThumbnails(),
      condition: (page) => page.fileData.slug === "blog",
    }),
  ],
  footer: Component.SiteFooter({
    links: {
      GitHub: "https://github.com/4sizn",
      LinkedIn: "https://www.linkedin.com/in/4sizn",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => !isLanding(page),
    }),
    // 홈은 Hero가 제목 역할을 하므로 기본 제목 줄을 숨긴다
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => !isLanding(page),
    }),
    Component.ConditionalRender({
      component: Component.TagList(),
      condition: (page) => !isLanding(page),
    }),
    Component.ConditionalRender({
      component: Component.Hero({
        headline: "만들고, 배우고, 기록합니다",
        description:
          "데스크톱 앱과 iOS 게임, 크롬 확장을 직접 만들어 배포합니다. 개발하며 배운 것과 읽고 남긴 것을 이곳에 씁니다.",
        links: [
          { label: "GitHub", href: "https://github.com/4sizn", icon: "github" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/4sizn", icon: "linkedin" },
          { label: "Email", href: "mailto:4sizn@naver.com", icon: "mail" },
        ],
      }),
      condition: (page) => page.fileData.slug === "index",
    }),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({ sortFn: explorerSortFn }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
// Project 페이지가 폴더 인덱스라 이 레이아웃을 탄다 — 랜딩 조건을 여기에도 걸어야 한다.
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => !isLanding(page),
    }),
    Component.ArticleTitle(),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => !isLanding(page),
    }),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({ sortFn: explorerSortFn }),
  ],
  right: [],
}
