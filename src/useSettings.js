import { useEffect, useState } from 'react'

function read(key) {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // private mode or blocked storage: the setting just won't persist
  }
}

export function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || 'light',
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#ffffff')
  }, [theme])

  // Applies the theme to <html> right away (not in an effect), so a view transition
  // can snapshot the new state inside its update callback.
  const apply = () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    write('theme', next)
    setTheme(next)
  }

  const toggle = (event) => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduce) return apply()

    const r = event?.currentTarget?.getBoundingClientRect()
    const x = r ? r.left + r.width / 2 : innerWidth / 2
    const y = r ? r.top + r.height / 2 : 0
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

    const transition = document.startViewTransition(apply)
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(.65,0,.35,1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
  }

  return [theme, toggle]
}

export function useLang() {
  const [lang, setLang] = useState(() => {
    const saved = read('lang')
    if (saved === 'pt' || saved === 'en') return saved
    return navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en'
  })

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-PT' : 'en'
  }, [lang])

  const toggle = () =>
    setLang((l) => {
      const next = l === 'pt' ? 'en' : 'pt'
      write('lang', next)
      return next
    })

  return [lang, toggle]
}
