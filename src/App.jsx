import { useEffect, useState } from 'react'
import { content, links, repoInfo } from './content.js'
import { useLang, useTheme } from './useSettings.js'
import { GithubIcon, Icon, LinkedinIcon } from './icons.jsx'
import photo from './assets/claudino.webp'
import photoSmall from './assets/claudino-480.webp'
import elevateShot from './assets/elevate.webp'

export default function App() {
  const [lang, toggleLang] = useLang()
  const [theme, toggleTheme] = useTheme()
  const t = content[lang]

  useEffect(() => {
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
  }, [t])

  return (
    <>
      <a className="skip" href="#main">{t.nav.skip}</a>
      <Nav t={t.nav} lang={lang} theme={theme} onLang={toggleLang} onTheme={toggleTheme} />
      <main id="main">
        <Hero t={t.hero} />
        <Projects t={t.projects} />
        <Experience t={t.experience} lang={lang} />
        <Repos t={t.repos} lang={lang} />
        <Contact t={t.contact} />
      </main>
      <footer className="footer">
        <div className="wrap footer-row">
          <span>© {new Date().getFullYear()} Claudino Martins</span>
        </div>
      </footer>
    </>
  )
}

function Nav({ t, lang, theme, onLang, onTheme }) {
  const [open, setOpen] = useState(false)
  const items = [
    ['projects', t.projects],
    ['experience', t.experience],
    ['github', t.github],
    ['contact', t.contact],
  ]

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="nav" data-open={open}>
      <div className="wrap nav-row">
        <a className="brand" href="#top" translate="no">Dino</a>
        <nav id="site-menu" className="nav-links" aria-label="Main">
          {items.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
        <div className="nav-tools">
          <button type="button" className="icon-btn lang-btn" onClick={onLang} aria-label={t.lang}>
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>
          <button
            type="button"
            className="icon-btn theme-btn"
            onClick={onTheme}
            aria-label={theme === 'dark' ? t.theme.toLight : t.theme.toDark}
          >
            <span className="theme-icon" key={theme}>
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
            </span>
          </button>
          <button
            type="button"
            className="icon-btn menu-btn"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? t.menuClose : t.menuOpen}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
    </header>
  )
}

function Hero({ t }) {
  return (
    <section className="hero" id="top" data-enter>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><Icon name="pin" size={16} /> {t.place}</p>
          <h1 translate="no">{t.title}</h1>
          <p className="lead">{t.lead}</p>
          <div className="actions">
            <a className="btn btn-primary" href={links.cv} download>
              <Icon name="download" /> {t.cv}
            </a>
            <a className="btn btn-secondary" href={links.github} target="_blank" rel="noreferrer">
              <GithubIcon size={18} /> {t.github}
            </a>
          </div>
          <a className="now" href="#elevate">
            <span className="now-dot" aria-hidden="true" />
            <span className="now-label mono">{t.now}</span>
            <span className="now-text">{t.nowText}</span>
            <Icon name="arrow" size={16} />
          </a>
        </div>
        <figure className="hero-photo">
          <img
            src={photo}
            srcSet={`${photoSmall} 480w, ${photo} 900w`}
            sizes="(max-width: 820px) 220px, 440px"
            width="900"
            height="1200"
            alt={t.photoAlt}
            fetchPriority="high"
          />
        </figure>
      </div>
    </section>
  )
}

function Projects({ t }) {
  return (
    <section className="section" id="projects">
      <div className="wrap">
        <SectionHead title={t.title} sub={t.sub} />
        <div className="project-list">
          {t.items.map((p) => (
            <article className="project" id={p.id} key={p.id}>
              <div className="project-visual">
                {p.id === 'elevate' ? (
                  <a className="browser" href={p.site} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true">
                    <span className="browser-bar"><i /><i /><i /><span className="mono">pei-elevate.github.io</span></span>
                    <img src={elevateShot} width="1200" height="750" alt="" loading="lazy" />
                  </a>
                ) : (
                  <Terminal />
                )}
              </div>
              <div className="project-body">
                <p className="mono tag">{p.tag}</p>
                <h3>{p.name}</h3>
                <p>{p.summary}</p>
                <ul className="features">
                  {p.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <ul className="chips" aria-label="Stack">
                  {p.stack.map((s) => <li key={s}>{s}</li>)}
                </ul>
                <div className="actions project-actions">
                  {p.site && (
                    <a className="btn btn-primary btn-sm" href={p.site} target="_blank" rel="noreferrer">
                      {t.site} <Icon name="arrow" size={16} />
                    </a>
                  )}
                  <a className={`btn btn-sm ${p.site ? 'btn-secondary' : 'btn-primary'}`} href={p.repo} target="_blank" rel="noreferrer">
                    <GithubIcon size={16} /> {t.repo}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// The EasySpot setup flow, as written in the project's README.
function Terminal() {
  const lines = [
    ['$', 'cd projX'],
    ['$', 'make setup'],
    ['#', '.env created from .env.example'],
    ['$', 'make setup'],
    ['#', 'docker compose up -d'],
    ['$', 'make bootstrap'],
    ['#', 'Authentik ready'],
  ]
  return (
    <div className="terminal" aria-hidden="true">
      <div className="terminal-bar"><i /><i /><i /><span className="mono">easyspot — zsh</span></div>
      <pre className="terminal-body mono">
        {lines.map(([p, text], i) => (
          <span key={i} className={p === '#' ? 'out' : 'cmd'} style={{ '--i': i }}>
            {p === '$' && <b>$ </b>}{p === '#' ? `✓ ${text}` : text}{'\n'}
          </span>
        ))}
        <span className="caret" style={{ '--i': lines.length }}>$ <u /></span>
      </pre>
    </div>
  )
}

function Period({ when, now, lang }) {
  const fmt = new Intl.DateTimeFormat(lang === 'pt' ? 'pt-PT' : 'en-GB', { month: 'short', year: 'numeric' })
  const f = (s) => fmt.format(new Date(`${s}-01T12:00:00`))
  return <span className="mono period">{f(when[0])} – {when[1] ? f(when[1]) : now}</span>
}

function Experience({ t, lang }) {
  return (
    <section className="section section-soft" id="experience">
      <div className="wrap">
        <SectionHead title={t.title} />
        <div className="exp-grid">
          {t.groups.map((g) => (
            <div key={g.title}>
              <h3 className="col-title">{g.title}</h3>
              <ol className="timeline">
                {g.orgs.map((o) => (
                  <li key={o.org}>
                    <p className="org">{o.org}</p>
                    {(o.full || o.place) && <p className="org-full">{o.full ?? o.place}</p>}
                    <ul className="roles">
                      {o.roles.map((r) => (
                        <li key={r.role + r.when[0]}>
                          <h4>{r.role}</h4>
                          <Period when={r.when} now={t.now} lang={lang} />
                          {r.text && <p>{r.text}</p>}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const HIDDEN_REPOS = new Set(['myportfolio', 'dino3111', 'projIES_EasySpot'])

function useRepos() {
  const [state, setState] = useState({ status: 'loading', repos: [] })

  useEffect(() => {
    const key = 'repos-v2'
    try {
      const cached = JSON.parse(sessionStorage.getItem(key))
      if (cached) return setState({ status: 'ok', repos: cached })
    } catch {
      // fall through to the network
    }
    const ctrl = new AbortController()
    fetch(`https://api.github.com/users/${links.githubUser}/repos?per_page=100&sort=pushed`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((all) => {
        const visible = all.filter((r) => !HIDDEN_REPOS.has(r.name) && (!r.fork || repoInfo[r.name]))
        const projects = visible.filter((r) => repoInfo[r.name]?.kind === 'project')
        const classes = visible.filter((r) => !repoInfo[r.name])
        const repos = [...projects, ...classes]
          .slice(0, 9)
          .map(({ name, language, html_url }) => ({ name, language, html_url }))
        try { sessionStorage.setItem(key, JSON.stringify(repos)) } catch { /* ignore */ }
        setState({ status: 'ok', repos })
      })
      .catch((e) => e?.name !== 'AbortError' && setState({ status: 'error', repos: [] }))
    return () => ctrl.abort()
  }, [])

  return state
}

function Repos({ t, lang }) {
  const { status, repos } = useRepos()

  return (
    <section className="section" id="github">
      <div className="wrap">
        <SectionHead title={t.title} sub={t.sub} />
        {status === 'loading' && <p className="muted" aria-live="polite">{t.loading}</p>}
        {status === 'error' && <p className="muted">{t.error}</p>}
        {status === 'ok' && (
          <ul className="repo-grid">
            {repos.map((r) => {
              const info = repoInfo[r.name]
              const kind = info?.kind ?? 'class'
              return (
                <li key={r.name}>
                  <a className="repo" data-kind={kind} href={r.html_url} target="_blank" rel="noreferrer">
                    <span className="repo-kind mono">{t.kinds[kind]}</span>
                    <span className="repo-name">{info ? info[lang] : r.name}</span>
                    <span className="repo-meta mono">
                      <span translate="no">{r.name}</span>
                      {r.language && <span>{r.language}</span>}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        )}
        <a className="btn btn-secondary repo-all" href={`${links.github}?tab=repositories`} target="_blank" rel="noreferrer">
          <GithubIcon size={18} /> {t.all}
        </a>
      </div>
    </section>
  )
}

function Contact({ t }) {
  return (
    <section className="section contact" id="contact">
      <div className="wrap contact-inner">
        <h2>{t.title}</h2>
        <a className="contact-email" href={`mailto:${links.email}`}>{links.email}</a>
        <ul className="socials">
          <li>
            <a href={links.github} target="_blank" rel="noreferrer"><GithubIcon size={20} /> GitHub</a>
          </li>
          <li>
            <a href={links.linkedin} target="_blank" rel="noreferrer"><LinkedinIcon /> LinkedIn</a>
          </li>
          <li>
            <a href={links.cv} download><Icon name="download" size={20} /> {t.cv}</a>
          </li>
        </ul>
      </div>
    </section>
  )
}

function SectionHead({ title, sub }) {
  return (
    <div className="section-head">
      <h2>{title}</h2>
      {sub && <p className="muted">{sub}</p>}
    </div>
  )
}
