import { siGithub } from 'simple-icons'

// Brand colours that disappear on one of the themes get the theme ink instead.
const inkBrands = new Set(['000000', '181717', '660066'])

export function BrandIcon({ icon, size = 24 }) {
  const fill = inkBrands.has(icon.hex) ? 'currentColor' : `#${icon.hex}`
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
      <path d={icon.path} fill={fill} />
    </svg>
  )
}

export const GithubIcon = (p) => <BrandIcon icon={siGithub} {...p} />

export function LinkedinIcon({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"
      />
    </svg>
  )
}

export function Icon({ name, size = 18 }) {
  const paths = {
    download: 'M12 3v12m0 0 5-5m-5 5-5-5M4 19h16',
    arrow: 'M7 17 17 7m0 0H9m8 0v8',
    mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
    copy: 'M9 9h10v10H9zM5 15V5h10',
    check: 'm5 12 5 5 9-10',
    sun: 'M12 4V2m0 20v-2m8-8h2M2 12h2m13.66-5.66 1.41-1.41M4.93 19.07l1.41-1.41m0-11.32L4.93 4.93m14.14 14.14-1.41-1.41M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z',
    moon: 'M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z',
    menu: 'M4 7h16M4 12h16M4 17h16',
    close: 'M6 6l12 12M18 6 6 18',
    left: 'M15 6l-6 6 6 6',
    right: 'M9 6l6 6-6 6',
    play: 'M8 5v14l11-7z',
    pause: 'M8 5v14M16 5v14',
    pin: 'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  }
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false"
      fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name]} />
    </svg>
  )
}
