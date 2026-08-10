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
const BLOG_SLUG = "blog/index"
// Blog는 explorer·graph를 그대로 쓰므로 랜딩 목록에 넣지 않는다.
const landingSlugs = ["index", "about", PROJECTS_SLUG]
const isLanding = (page: { fileData: { slug?: string } }) =>
  landingSlugs.includes(page.fileData.slug ?? "")

// explorer는 블로그 글을 훑는 도구다. 글은 전부 blog/ 아래 있으므로 그건 남기고,
// 네비로 가는 페이지(About·Projects)와 태그 인덱스만 목록에서 뺀다.
// sortFn과 마찬가지로 직렬화되어 클라이언트에서 실행되므로 자기 완결형이어야 한다.
const explorerFilterFn = (node: any) => !["tags", "about", "projects"].includes(node.slugSegment)

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
      condition: (page) => page.fileData.slug === BLOG_SLUG,
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
    // 홈과 About은 각자의 히어로가 제목 역할을 하므로 기본 제목 줄을 숨긴다
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => !["index", "about"].includes(page.fileData.slug ?? ""),
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
    Component.ConditionalRender({
      component: Component.AboutHero({
        headline: "신희석입니다. 웹에서 사람과 사람을 잇는 것을 만듭니다.",
        paragraphs: [
          "웹 개발자입니다. React 기반 UI 개발과 실시간 메시지 프로토콜을 이용한 클라이언트 기능 개발을 주로 해왔습니다.",
          "IT 트렌드와 신기술에 관심이 많고, 다가올 미래를 자주 상상하는 편입니다. 다만 기발한 아이디어는 누구나 떠올릴 수 있고, 완성하지 않으면 머릿속에만 떠다니는 무형의 이미지로 남는다고 생각합니다.",
          "그래서 구현하면서 마주치는 문제를 인식하고 해결하며 제 것으로 만들어 왔습니다. 좋은 동료들과 이야기를 나눠가며 좋은 서비스를 만들고 싶습니다.",
        ],
        initial: "4",
        resumeUrl: "https://app.notion.com/p/Resume-e199c36eaf564f718dbb5aa90794daf1",
        email: "4sizn@naver.com",
        callout:
          "함께 만들어보고 싶은 것이 있거나, 그냥 기술 이야기를 나누고 싶으시다면 편하게 연락 주세요.",
      }),
      condition: (page) => page.fileData.slug === "about",
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
        // 테마 토글은 SiteNav에만 둔다 — 사이드바에도 두면 화면에 두 개가 뜬다
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({ sortFn: explorerSortFn, filterFn: explorerFilterFn }),
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
      ],
    }),
    Component.Explorer({ sortFn: explorerSortFn, filterFn: explorerFilterFn }),
  ],
  // Blog 랜딩(blog/index)도 폴더 페이지라 이 레이아웃을 탄다.
  // 글 페이지와 같은 느낌이 나게 그래프를 띄운다.
  right: [Component.Graph()],
}
