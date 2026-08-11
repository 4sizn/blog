import style from "./styles/aboutHero.scss"
import { joinSegments, pathToRoot, type FullSlug } from "../util/path"
import type { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface Options {
  headline: string
  /** 문단 배열. 각각 <p>로 그린다 */
  paragraphs: string[]
  /** 우측 카드에 띄울 이미지 경로. 없으면 이니셜을 대신 그린다 */
  photo?: string
  /** 인물 사진의 대체 텍스트 */
  photoAlt?: string
  /** 이니셜 폴백에 쓸 글자 */
  initial: string
  resumeUrl?: string
  email?: string
  /** 히어로 아래 인용 박스 */
  callout?: string
}

const defaults: Options = {
  headline: "",
  paragraphs: [],
  initial: "4",
}

export default ((opts?: Partial<Options>) => {
  const { headline, paragraphs, photo, photoAlt, initial, resumeUrl, email, callout } = {
    ...defaults,
    ...opts,
  }

  const AboutHero: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
    const baseDir = pathToRoot((fileData.slug ?? "about") as FullSlug)

    return (
      <section class="about-hero">
        <div class="about-hero-copy">
          <h1>{headline}</h1>
          {paragraphs.map((paragraph) => (
            <p>{paragraph}</p>
          ))}

          {callout && (
            <blockquote class="about-callout">
              <p>{callout}</p>
            </blockquote>
          )}
        </div>

        <aside class="about-hero-card">
          {photo ? (
            <img
              class="about-photo"
              src={joinSegments(baseDir, photo.replace(/^\//, ""))}
              alt={photoAlt ?? ""}
              loading="eager"
            />
          ) : (
            <div class="about-photo about-photo--initial" aria-hidden="true">
              {initial}
            </div>
          )}

          <div class="about-hero-actions">
            {resumeUrl && (
              <a class="about-resume" href={resumeUrl} target="_blank" rel="noreferrer">
                이력서 보기 ↗
              </a>
            )}
            {email && (
              <a class="about-email" href={`mailto:${email}`}>
                {email}
              </a>
            )}
          </div>
        </aside>
      </section>
    )
  }

  AboutHero.css = style
  return AboutHero
}) satisfies QuartzComponentConstructor
