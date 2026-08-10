import style from "./styles/siteFooter.scss"
import { version } from "../../package.json"
import type { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const SiteFooter: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? {}

    return (
      <footer class={`site-footer ${displayClass ?? ""}`}>
        <div class="site-footer-inner">
          <p class="site-footer-built">
            Built with{" "}
            <a href="https://quartz.jzhao.xyz/" target="_blank" rel="noreferrer">
              Quartz v{version}
            </a>
          </p>

          {Object.entries(links).length > 0 && (
            <ul class="site-footer-links">
              {Object.entries(links).map(([text, link]) => (
                <li>
                  <a href={link} target="_blank" rel="noreferrer">
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          )}

          <p class="site-footer-copyright">
            © {year} {cfg.pageTitle}
          </p>
        </div>
      </footer>
    )
  }

  SiteFooter.css = style
  return SiteFooter
}) satisfies QuartzComponentConstructor
