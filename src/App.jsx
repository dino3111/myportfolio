import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { content, links, repos } from './content.js'
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
        <Statement t={t.statement} />
        <Projects t={t.projects} />
        <Experience t={t.experience} lang={lang} />
        <Repos t={t.repos} lang={lang} />
        <Contact t={t.contact} />
      </main>
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
        <a className="brand" href="#top" translate="no">dino</a>
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
  // The photo waits as a faint grey print until it has loaded, then develops (see .hero-photo in CSS).
  const [developed, setDeveloped] = useState(false)
  const imgRef = useRef(null)
  const gridRef = useRef(null)
  const [split, setSplit] = useState(null)

  useEffect(() => {
    if (imgRef.current?.complete) setDeveloped(true)
  }, [])

  // Side by side only: measure how far the photo sits from the middle of the hero, so it can
  // start there and slide back to its place (the split, in CSS).
  useLayoutEffect(() => {
    const grid = gridRef.current
    const fig = grid?.querySelector('.hero-photo')
    if (!fig || !matchMedia('(min-width: 821px)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const g = grid.getBoundingClientRect()
    const f = fig.getBoundingClientRect()
    setSplit(`${Math.round(g.left + g.width / 2 - (f.left + f.width / 2))}px`)
  }, [])

  return (
    <section className="hero" id="top" data-enter data-split={split ? '' : undefined}>
      <div className="wrap hero-grid" ref={gridRef} style={split ? { '--split-x': split } : undefined}>
        <figure className="hero-photo" data-developed={developed}>
          <img
            ref={imgRef}
            src={photo}
            srcSet={`${photoSmall} 600w, ${photo} 900w`}
            sizes="(max-width: 820px) 360px, 460px"
            width="900"
            height="1200"
            alt={t.photoAlt}
            fetchPriority="high"
            onLoad={() => setDeveloped(true)}
          />
        </figure>
        <div className="hero-copy">
          <p className="eyebrow">{t.role}</p>
          <h1 translate="no" aria-label={t.title.replace('\n', ' ')}>
            {t.title.split('\n').map((line, i) => (
              <span className="mask" key={line} aria-hidden="true">
                <span style={{ '--i': i }}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="tagline"><Icon name="pin" size={18} /> {t.tagline}</p>
          <div className="actions">
            <a className="btn btn-primary" href={links.cv} download>
              <Icon name="download" /> {t.cv}
            </a>
            <a className="icon-link" href={links.github} target="_blank" rel="noreferrer" aria-label={t.github} title={t.github}>
              <GithubIcon size={20} />
            </a>
            <a className="icon-link" href={links.linkedin} target="_blank" rel="noreferrer" aria-label={t.linkedin} title={t.linkedin}>
              <LinkedinIcon size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// Taste Skill moment "word-highlight": the statement rests at half ink and turns to ink word by
// word as it crosses the middle of the screen, scrubbed to the scrollbar (it runs back going up).
function Statement({ t }) {
  const ref = useRef(null)
  const [lit, setLit] = useState(Infinity)

  // "<b>word</b>" marks the accent word; everything else is plain words.
  const words = t.text.split(/\s+/).map((w) => {
    const accent = w.includes('<b>')
    return { text: w.replace(/<\/?b>/g, ''), accent }
  })

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const start = innerHeight * 0.85
      const end = innerHeight * 0.45
      const p = Math.min(1, Math.max(0, (start - r.top) / Math.max(1, start - end + r.height)))
      const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 2
      setLit(atBottom ? Infinity : Math.round(p * words.length))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll, { passive: true })
    return () => {
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [words.length])

  return (
    <section className="section statement" aria-labelledby="statement-label">
      <div className="wrap">
        <p className="col-title" id="statement-label">{t.label}</p>
        <p className="statement-text" ref={ref}>
          {words.map((w, i) => (
            <span key={i} className={`sw${i < lit ? ' is-on' : ''}${w.accent ? ' is-accent' : ''}`}>
              {w.text}{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}

function Projects({ t }) {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState('next')
  const count = t.items.length
  const go = (step) => {
    setDir(step > 0 ? 'next' : 'prev')
    setIndex((i) => (i + step + count) % count)
  }
  const onKey = (e) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  return (
    <section className="section" id="projects">
      <div className="wrap">
        <div className="slider-head">
          <SectionHead title={t.title} sub={t.sub} />
          <div className="slider-nav">
            <span className="mono slider-count" aria-live="polite">
              {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
            <button type="button" className="icon-link" onClick={() => go(-1)} aria-label={t.prev}><Icon name="left" size={20} /></button>
            <button type="button" className="icon-link" onClick={() => go(1)} aria-label={t.next}><Icon name="right" size={20} /></button>
          </div>
        </div>
        {/* every slide stays in the DOM in one grid cell, so the box keeps the tallest one's height */}
        <div className="slider" data-dir={dir} onKeyDown={onKey}>
          {t.items.map((p, i) => (
            <article className={`slide${i === index ? ' is-on' : ''}`} id={p.id} key={p.id}
              aria-hidden={i !== index} inert={i !== index}>
              <div className="slide-visual">
                {p.id === 'elevate' ? (
                  <a className="browser" href={p.site} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true">
                    <span className="browser-bar"><i /><i /><i /><span className="mono">pei-elevate.github.io</span></span>
                    <img src={elevateShot} width="1200" height="750" alt="" loading="lazy" />
                  </a>
                ) : (
                  <Terminal />
                )}
              </div>
              <div className="slide-body">
                <p className="mono tag">{p.tag}</p>
                <h3 translate="no">{p.name}</h3>
                <p className="slide-summary">{p.summary}</p>
                <ul className="features">
                  {p.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <div className="actions project-actions">
                  {p.site && (
                    <a className="btn btn-primary" href={p.site} target="_blank" rel="noreferrer">
                      {t.site} <Icon name="arrow" size={16} />
                    </a>
                  )}
                  <a className={`btn ${p.site ? 'btn-secondary' : 'btn-primary'}`} href={p.repo} target="_blank" rel="noreferrer">
                    <GithubIcon size={18} /> {t.repo}
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

function ChapterPanel({ group, index, total, t, lang }) {
  return (
    <div className="chapter-panel">
      <p className="mono chapter-count">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</p>
      {group.orgs.map((o) => (
        <div className="chapter-org" key={o.org}>
          <h4 className="org">{o.org}</h4>
          {(o.full || o.place) && <p className="org-full">{o.full ?? o.place}</p>}
          <ul className="roles">
            {o.roles.map((r) => (
              <li key={r.role + r.when[0]}>
                <div className="role-head">
                  <h5>{r.role}</h5>
                  <Period when={r.when} now={t.now} lang={lang} />
                </div>
                {r.text && <p>{r.text}</p>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

// Taste Skill moment "pinned-chapters": on a wide, tall enough screen the section holds for one
// screen of scroll while its chapters open one at a time and the panel on the right swaps with a
// short crossfade. Elsewhere (phones, short screens, reduced motion) every chapter stands in full.
function useChapters(ref, count) {
  const [live, setLive] = useState(false)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const fits = () =>
      matchMedia('(min-width: 1024px)').matches &&
      innerHeight >= 640 &&
      !matchMedia('(prefers-reduced-motion: reduce)').matches
    const sync = () => setLive(fits())
    sync()
    addEventListener('resize', sync)
    return () => removeEventListener('resize', sync)
  }, [])

  useEffect(() => {
    if (!live) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = ref.current.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)))
      setActive(Math.min(count - 1, Math.floor(p * count)))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    addEventListener('scroll', onScroll, { passive: true })
    return () => { removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [live, count, ref])

  return [live, active]
}

function Experience({ t, lang }) {
  const ref = useRef(null)
  const [live, active] = useChapters(ref, t.groups.length)

  return (
    <section className="section-soft chapters" id="experience" ref={ref} data-live={live}>
      <div className="wrap chapters-stage">
        <div className="chapters-text">
          <h2>{t.title}</h2>
          <ol className="chapters-steps">
            {t.groups.map((g, i) => (
              <li key={g.title} className={`chapter${!live || i === active ? ' is-on' : ''}`}>
                <h3>{g.title}</h3>
                {!live && <ChapterPanel group={g} index={i} total={t.groups.length} t={t} lang={lang} />}
              </li>
            ))}
          </ol>
        </div>
        {live && (
          <div className="chapters-frame">
            {t.groups.map((g, i) => (
              <div key={g.title} className={`chapter-slide${i === active ? ' is-on' : ''}${i < active ? ' is-past' : ''}`}
                aria-hidden={i !== active}>
                <ChapterPanel group={g} index={i} total={t.groups.length} t={t} lang={lang} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function Repos({ t, lang }) {
  return (
    <section className="section" id="github">
      <div className="wrap">
        <SectionHead title={t.title} sub={t.sub} />
        <ul className="repo-grid">
          {repos.map((r) => (
            <li key={r.url}>
              <a className="repo" href={r.url} target="_blank" rel="noreferrer">
                <span className="repo-meta mono">
                  <span className="repo-course">{r.course}</span>
                  <span className="repo-lang"><i aria-hidden="true" />{r.lang}</span>
                </span>
                <span className="repo-name">{r[lang].name}</span>
                <span className="repo-desc">{r[lang].text}</span>
                <span className="repo-link">{t.view} <Icon name="arrow" size={14} /></span>
              </a>
            </li>
          ))}
        </ul>
        <div className="repo-more">
          <p>{t.more}</p>
          <a className="btn btn-secondary" href={`${links.github}?tab=repositories`} target="_blank" rel="noreferrer">
            <GithubIcon size={18} /> {t.all}
          </a>
        </div>
      </div>
    </section>
  )
}

function EmailMarquee() {
  // Two identical halves so translateX(-50%) loops without a seam; only the first is read aloud.
  // Hovering or focusing it pauses the run so the address can be clicked.
  const half = (hidden) => (
    <div className="marquee-half" aria-hidden={hidden || undefined} style={{ display: 'flex' }}>
      {[0, 1, 2].map((i) => (
        <a key={i} className="marquee-item" href={`mailto:${links.email}`} tabIndex={hidden || i > 0 ? -1 : undefined}>
          {links.email}<span className="sep" aria-hidden="true">✳</span>
        </a>
      ))}
    </div>
  )
  return (
    <div className="marquee">
      <div className="marquee-track">
        {half(false)}
        {half(true)}
      </div>
    </div>
  )
}

function Contact({ t }) {
  return (
    <section className="section contact" id="contact">
      <div className="wrap contact-inner">
        <h2>{t.title}</h2>
      </div>
      <EmailMarquee />
      <div className="wrap contact-inner">
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
