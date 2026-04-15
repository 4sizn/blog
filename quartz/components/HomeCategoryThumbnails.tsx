import { byDateAndAlphabetical } from "./PageList"
import { Date as PostDate, getDate } from "./Date"
import style from "./styles/homeCategoryThumbnails.scss"
import { resolveRelative, type FullSlug } from "../util/path"
import type { QuartzComponent, QuartzComponentConstructor } from "./types"
import type { QuartzPluginData } from "../plugins/vfile"

type Category = {
  slug: string
  title: string
  limit: number
}

type PageWithSlug = QuartzPluginData & { slug: string }

const categoryFilters: Category[] = [
  { slug: "dev", title: "DEV", limit: 6 },
  { slug: "log", title: "Log", limit: 6 },
  { slug: "releases", title: "Releases", limit: 6 },
]

const DEFAULT_THUMBNAIL_IMAGE = "/static/blog_thumbnail_default.jpeg"

function normalizeImageUrl(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined
  }

  const image = value.trim()
  if (!image) {
    return undefined
  }

  return image.startsWith("/") || /^https?:\/\//.test(image) ? image : `/${image}`
}

const HomeCategoryThumbnails: QuartzComponent = ({ allFiles, fileData, cfg }) => {
  if (!fileData?.slug) {
    return null
  }

  const currentSlug = fileData.slug as FullSlug

  const dateSortedByFolder = (pages: QuartzPluginData[]) =>
    pages.slice().sort(byDateAndAlphabetical(cfg))

  const groups = categoryFilters
    .map((category) => {
      const prefix = `${category.slug}/`
      const pages = allFiles
        .filter((page): page is PageWithSlug => {
          if (typeof page.slug !== "string") {
            return false
          }
          const slug = page.slug
          if (!slug) {
            return false
          }

          return slug === category.slug || slug.startsWith(prefix)
        })
        .filter((page) => page.frontmatter?.title)

      const sorted = dateSortedByFolder(pages)
      const preview = sorted.slice(0, category.limit)

      return { ...category, pages: preview }
    })
    .filter((group) => group.pages.length > 0)

  if (groups.length === 0) {
    return null
  }

  return (
    <section class="home-category-thumbnails">
      {groups.map((group) => {
        const sectionId = `${group.slug}-section`
        const folderHref = resolveRelative(currentSlug, group.slug as FullSlug)

        return (
          <div class="home-category-block" id={sectionId}>
            <div class="home-category-title-row">
              <h2>{group.title}</h2>
              <a
                href={folderHref}
                class="home-category-more"
                aria-label={`${group.title} 글 더 보기`}
              >
                더 보기
              </a>
            </div>
            <div class="home-category-grid">
              {group.pages.map((page) => {
                const title = page.frontmatter?.title ?? "제목 없음"
                const rawImage = normalizeImageUrl(page.frontmatter?.socialImage)
                const image = rawImage ?? DEFAULT_THUMBNAIL_IMAGE
                const description =
                  (typeof page.frontmatter?.description === "string" &&
                    page.frontmatter.description) ||
                  (typeof page.description === "string" && page.description) ||
                  ""
                const pageDate = getDate(cfg, page)

                return (
                  <a
                    href={resolveRelative(currentSlug, page.slug as FullSlug)}
                    class="home-category-card"
                    title={title}
                  >
                    <article>
                      <div
                        class={`home-category-thumb ${!rawImage ? "home-category-thumb--default" : ""}`}
                        style={{ backgroundImage: `url('${image}')` }}
                      ></div>
                      <div class="home-category-card-content">
                        <p class="home-category-meta">
                          {pageDate && <PostDate date={pageDate} locale={cfg.locale} />}
                        </p>
                        <h3>{title}</h3>
                        {description && <p class="home-category-description">{description}</p>}
                      </div>
                    </article>
                  </a>
                )
              })}
            </div>
          </div>
        )
      })}
    </section>
  )
}

HomeCategoryThumbnails.css = style

export default (() => HomeCategoryThumbnails) satisfies QuartzComponentConstructor
