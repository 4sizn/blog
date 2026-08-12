import style from "./styles/projectGrid.scss"
import { resolveRelative, pathToRoot, joinSegments, type FullSlug } from "../util/path"
import { projectDetailSlug } from "../util/projectLinks"
import type { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import type { QuartzPluginData } from "../plugins/vfile"

interface Options {
  /** 몇 개까지 보여줄지. 생략하면 전부 */
  limit?: number
  /** 섹션 제목. 생략하면 제목 줄을 그리지 않는다 */
  title?: string
  /** 제목 우측 "더 보기" 링크를 붙일지 */
  showMore?: boolean
  /** featured: true 인 것만 고를지 */
  featuredOnly?: boolean
  /** 프로젝트 성격으로 목록을 나눌지 */
  category?: string
}

const PROJECT_ROOT = "projects"

type ProjectPage = QuartzPluginData & { slug: string }

function isProject(page: QuartzPluginData): page is ProjectPage {
  const slug = page.slug
  if (typeof slug !== "string") return false
  // projects/index 는 페이지 본문이지 카드가 아니다
  return slug.startsWith(`${PROJECT_ROOT}/`) && slug !== `${PROJECT_ROOT}/index`
}

function orderOf(page: QuartzPluginData): number {
  const order = page.frontmatter?.projectOrder
  return typeof order === "number" ? order : 999
}

/** 아이콘이 없는 프로젝트는 제목 첫 글자로 대신한다 */
function initialOf(title: string): string {
  const trimmed = title.trim()
  return trimmed.length > 0 ? trimmed[0].toUpperCase() : "?"
}

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((v): v is string => typeof v === "string")
  }
  return typeof value === "string" ? [value] : []
}

function toLinkMap(value: unknown): Record<string, string> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return {}
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).filter(
      (entry): entry is [string, string] => typeof entry[1] === "string",
    ),
  )
}

export default ((opts?: Options) => {
  const ProjectGrid: QuartzComponent = ({ allFiles, fileData }: QuartzComponentProps) => {
    const currentSlug = (fileData.slug ?? "index") as FullSlug
    const baseDir = pathToRoot(currentSlug)
    const availableSlugs = new Set(
      allFiles.flatMap((page) => (typeof page.slug === "string" ? [page.slug] : [])),
    )

    let projects = allFiles.filter(isProject).filter((p) => p.frontmatter?.title)

    if (opts?.featuredOnly) {
      projects = projects.filter((p) => p.frontmatter?.featured === true)
    }

    if (opts?.category) {
      projects = projects.filter((p) => p.frontmatter?.projectCategory === opts.category)
    }

    projects.sort((a, b) => orderOf(a) - orderOf(b))

    if (typeof opts?.limit === "number") {
      projects = projects.slice(0, opts.limit)
    }

    if (projects.length === 0) {
      return null
    }

    return (
      <section class="project-grid-section">
        {opts?.title && (
          <div class="project-grid-header">
            <h2>{opts.title}</h2>
            {opts.showMore && (
              <a
                class="project-grid-more"
                href={resolveRelative(currentSlug, PROJECT_ROOT as FullSlug)}
              >
                더 보기
              </a>
            )}
          </div>
        )}

        <div class="project-grid">
          {projects.map((project) => {
            const title = String(project.frontmatter?.title)
            const description =
              (typeof project.frontmatter?.description === "string" &&
                project.frontmatter.description) ||
              ""
            const icon = project.frontmatter?.projectIcon
            const image = project.frontmatter?.projectImage
            const stack = toStringArray(project.frontmatter?.projectStack)
            const links = toLinkMap(project.frontmatter?.projectLinks)
            const targetSlug = projectDetailSlug(
              project.slug,
              project.frontmatter?.projectCategory,
              availableSlugs,
            )

            return (
              <article class="project-card">
                <a
                  class="project-card-main"
                  href={resolveRelative(currentSlug, targetSlug as FullSlug)}
                >
                  {typeof image === "string" && image ? (
                    <img
                      class="project-image"
                      src={joinSegments(baseDir, image.replace(/^\//, ""))}
                      alt={`${title} 화면`}
                      loading="lazy"
                    />
                  ) : typeof icon === "string" && icon ? (
                    <img
                      class="project-icon"
                      src={joinSegments(baseDir, icon.replace(/^\//, ""))}
                      alt=""
                      loading="lazy"
                    />
                  ) : (
                    <span class="project-icon project-icon--initial" aria-hidden="true">
                      {initialOf(title)}
                    </span>
                  )}

                  <div class="project-card-body">
                    <h3>{title}</h3>
                    {description && <p class="project-card-description">{description}</p>}
                    {stack.length > 0 && (
                      <ul class="project-stack">
                        {stack.map((tech) => (
                          <li>{tech}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </a>

                {Object.entries(links).length > 0 && (
                  <ul class="project-links">
                    {Object.entries(links).map(([label, href]) => (
                      <li>
                        <a href={href} target="_blank" rel="noreferrer">
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            )
          })}
        </div>
      </section>
    )
  }

  ProjectGrid.css = style
  return ProjectGrid
}) satisfies QuartzComponentConstructor
