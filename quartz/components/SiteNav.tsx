import { resolveRelative, type FullSlug } from "../util/path"
import style from "./styles/siteNav.scss"
import DarkmodeConstructor from "./Darkmode"
import darkmodeStyle from "./styles/darkmode.scss"
// @ts-ignore
import darkmodeScript from "./scripts/darkmode.inline"
import type { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Darkmode = DarkmodeConstructor()

type NavItem = {
  label: string
  target: FullSlug
  // 이 섹션에 속하는지 판정. 글 페이지도 Blog로 잡히게 한다.
  isActive: (slug: string) => boolean
}

// 글은 전부 blog/ 아래에 있고, 태그 인덱스도 Blog 소속으로 본다
const BLOG_SECTIONS = ["blog", "tags"]

const navItems: NavItem[] = [
  {
    label: "Home",
    target: "index" as FullSlug,
    isActive: (slug) => slug === "index",
  },
  {
    label: "About",
    target: "about" as FullSlug,
    isActive: (slug) => slug === "about",
  },
  {
    label: "Project",
    target: "projects" as FullSlug,
    isActive: (slug) => slug === "projects" || slug.startsWith("projects/"),
  },
  {
    label: "Blog",
    target: "blog" as FullSlug,
    isActive: (slug) => BLOG_SECTIONS.some((s) => slug === s || slug.startsWith(`${s}/`)),
  },
]

const SiteNav: QuartzComponent = (props: QuartzComponentProps) => {
  const { fileData, cfg } = props
  const currentSlug = (fileData.slug ?? "index") as FullSlug

  return (
    <nav class="site-nav">
      <div class="site-nav-inner">
        <a class="site-nav-brand" href={resolveRelative(currentSlug, "index" as FullSlug)}>
          {cfg.pageTitle}
        </a>

        <ul class="site-nav-links">
          {navItems.map((item) => (
            <li>
              <a
                href={resolveRelative(currentSlug, item.target)}
                class={item.isActive(currentSlug) ? "active" : ""}
                aria-current={item.isActive(currentSlug) ? "page" : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div class="site-nav-actions">
          <Darkmode {...props} />
        </div>
      </div>
    </nav>
  )
}

// 테마 토글은 네비에만 둔다. Darkmode를 레이아웃에서 뺐으므로 그 CSS·스크립트도
// 여기서 같이 실어야 아이콘 모양과 클릭 동작이 살아남는다.
SiteNav.css = `${style}\n${darkmodeStyle}`
SiteNav.beforeDOMLoaded = darkmodeScript

export default (() => SiteNav) satisfies QuartzComponentConstructor
