import { byDateAndAlphabetical } from "./PageList"
import { Date as PostDate, getDate } from "./Date"
import style from "./styles/recentPosts.scss"
import { resolveRelative, type FullSlug } from "../util/path"
import type { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import type { QuartzPluginData } from "../plugins/vfile"

interface Options {
  limit: number
  title?: string
  showMore?: boolean
  /** 여기 나열한 최상위 폴더의 글만 모은다 */
  sections: string[]
}

const defaults: Options = {
  limit: 5,
  title: "Recent Posts",
  showMore: true,
  sections: ["log", "dev", "releases"],
}

export default ((opts?: Partial<Options>) => {
  const { limit, title, showMore, sections } = { ...defaults, ...opts }

  const RecentPosts: QuartzComponent = ({ allFiles, fileData, cfg }: QuartzComponentProps) => {
    const currentSlug = (fileData.slug ?? "index") as FullSlug

    const posts = allFiles
      .filter((page: QuartzPluginData) => {
        const slug = page.slug
        if (typeof slug !== "string") return false
        if (!page.frontmatter?.title) return false
        // 폴더 인덱스는 글이 아니다
        if (slug.endsWith("/index")) return false
        return sections.some((section) => slug.startsWith(`${section}/`))
      })
      .sort(byDateAndAlphabetical(cfg))
      .slice(0, limit)

    if (posts.length === 0) {
      return null
    }

    return (
      <section class="recent-posts">
        <div class="recent-posts-header">
          <h2>{title}</h2>
          {showMore && (
            <a class="recent-posts-more" href={resolveRelative(currentSlug, "blog" as FullSlug)}>
              더 보기
            </a>
          )}
        </div>

        <ul class="recent-posts-list">
          {posts.map((post) => {
            const postDate = getDate(cfg, post)
            const description =
              (typeof post.frontmatter?.description === "string" && post.frontmatter.description) ||
              ""

            return (
              <li>
                <a href={resolveRelative(currentSlug, post.slug as FullSlug)}>
                  <span class="recent-posts-meta">
                    {postDate && <PostDate date={postDate} locale={cfg.locale} />}
                  </span>
                  <span class="recent-posts-title">{String(post.frontmatter?.title)}</span>
                  {description && <span class="recent-posts-description">{description}</span>}
                </a>
              </li>
            )
          })}
        </ul>
      </section>
    )
  }

  RecentPosts.css = style
  return RecentPosts
}) satisfies QuartzComponentConstructor
