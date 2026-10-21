import { useEffect, useState } from 'react'
import { withBase } from '../basePath'
import ModeToggle from './ModeToggle.jsx'
import { CAN_FLASH } from '../platform.js'

// The device navigates by single keypress, so the site does too. `key` is both
// the shortcut and the bracketed letter shown in the link.
const ALL_LINKS = [
  { key: 'l', label: 'inks',    href: '#links' },
  { key: 'd', label: 'evices',  href: '#devices' },
  { key: 'f', label: 'lash',    href: '#flash' },
  { key: 's', label: 'etup',    href: '#docs' },
]

// No flasher on iOS (see platform.js), so no shortcut to it either.
const LINKS = CAN_FLASH ? ALL_LINKS : ALL_LINKS.filter(l => l.href !== '#flash')

const REPO = 'oumike/platy-aprs'
const EXTERNAL = [
  { label: 'Releases', href: `https://github.com/${REPO}/releases` },
  { label: 'GitHub',   href: `https://github.com/${REPO}` },
]

function isTypingTarget(el) {
  if (!el) return false
  if (el.isContentEditable) return true
  return ['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName)
}

export default function Nav({ mode, onModeChange }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = e => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (isTypingTarget(e.target)) return
      if (document.querySelector('[role="dialog"]')) return
      const hit = LINKS.find(l => l.key === e.key.toLowerCase())
      if (!hit) return
      const target = document.querySelector(hit.href)
      if (!target) return
      e.preventDefault()
      setOpen(false)
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <header className="nav">
      <div className="nav-inner">
        <img className="brand-mark" src={withBase('/favicon.svg')} alt="" width="28" height="28" />
        <div className="brands">
          <a href="#top" className="brand" aria-current="page">
            <span><span className="brand-word">Platy</span><span className="brand-dim"> APRS</span></span>
          </a>
        </div>

        <div className="nav-spacer" />

        <nav className={open ? 'nav-links nav-links-open' : 'nav-links'}
             aria-label="Sections">
          <ul role="list">
            {LINKS.map(l => (
              <li key={l.key}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  (<b>{l.key.toUpperCase()}</b>){l.label}
                </a>
              </li>
            ))}
          </ul>
          <ul role="list" className="nav-external">
            {EXTERNAL.map(l => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <ModeToggle mode={mode} locked={false} onChange={onModeChange} size="sm" />

        <button
          type="button"
          className="nav-burger"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(v => !v)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}
