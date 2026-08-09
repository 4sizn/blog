import style from "./styles/hero.scss"
import type { QuartzComponent, QuartzComponentConstructor } from "./types"

type SocialLink = {
  label: string
  href: string
  icon: "github" | "linkedin" | "mail" | "rss" | "link"
}

interface Options {
  headline: string
  description: string
  links: SocialLink[]
}

const defaults: Options = {
  headline: "개발자, 만드는 사람",
  description: "웹과 데스크톱, 모바일을 오가며 필요한 것을 직접 만듭니다.",
  links: [],
}

// 24x24 viewBox, currentColor 사용
const icons: Record<SocialLink["icon"], string> = {
  github:
    "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z",
  linkedin:
    "M4.98 3.5C4.98 4.881 3.87 6 2.5 6S.02 4.881.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.02h4.52V23H.24zM8.34 8.02h4.33v2.05h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.01 5.42 6.93V23h-4.51v-6.44c0-1.54-.03-3.51-2.14-3.51-2.14 0-2.47 1.67-2.47 3.4V23H8.34z",
  mail: "M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5zm2.2-.5 7.05 5.64a1.2 1.2 0 0 0 1.5 0L19.8 5z",
  rss: "M4 11a9 9 0 0 1 9 9h-2.5A6.5 6.5 0 0 0 4 13.5zm0-7a16 16 0 0 1 16 16h-2.5A13.5 13.5 0 0 0 4 6.5zM6 17.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z",
  link: "M10.6 13.4a1 1 0 0 1 0-1.4l1.4-1.4a3 3 0 1 1 4.2 4.2l-1.1 1.1-1.4-1.4 1.1-1.1a1 1 0 0 0-1.4-1.4L12 13.4a1 1 0 0 1-1.4 0zm2.8-2.8a1 1 0 0 1 0 1.4L12 13.4a3 3 0 1 1-4.2-4.2l1.1-1.1 1.4 1.4-1.1 1.1a1 1 0 0 0 1.4 1.4L12 10.6a1 1 0 0 1 1.4 0z",
}

function SocialIcon({ name }: { name: SocialLink["icon"] }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d={icons[name]} />
    </svg>
  )
}

export default ((opts?: Partial<Options>) => {
  const { headline, description, links } = { ...defaults, ...opts }

  const Hero: QuartzComponent = () => (
    <section class="hero">
      <div class="hero-copy">
        <h1 class="hero-headline">{headline}</h1>
        <p class="hero-description">{description}</p>

        {links.length > 0 && (
          <ul class="hero-links">
            {links.map((link) => (
              <li>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  <SocialIcon name={link.icon} />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* victoreke의 아이소메트릭 큐브 자리. 순수 CSS/SVG로 가볍게 둔다. */}
      <div class="hero-art" aria-hidden="true">
        <svg viewBox="0 0 200 160" width="100%" height="100%">
          <g fill="none" stroke="currentColor" stroke-width="1" stroke-linejoin="round">
            <path d="M100 20 140 42 140 86 100 108 60 86 60 42Z" />
            <path d="M100 20 100 64 140 86M100 64 60 86" />
            <path d="M40 70 70 86 70 118 40 134 10 118 10 86Z" opacity="0.55" />
            <path d="M160 70 190 86 190 118 160 134 130 118 130 86Z" opacity="0.55" />
          </g>
          <g fill="currentColor">
            <circle cx="100" cy="20" r="2.5" />
            <circle cx="140" cy="42" r="2" />
            <circle cx="60" cy="86" r="2" />
            <circle cx="10" cy="86" r="1.8" opacity="0.6" />
            <circle cx="190" cy="118" r="1.8" opacity="0.6" />
          </g>
        </svg>
      </div>
    </section>
  )

  Hero.css = style
  return Hero
}) satisfies QuartzComponentConstructor
