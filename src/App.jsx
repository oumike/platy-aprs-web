import { useEffect, useState } from 'react'
import { applyTheme } from './themes.js'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import Screenshots from './components/Screenshots.jsx'
import Links from './components/Links.jsx'
import Devices from './components/Devices.jsx'
import Flasher from './components/Flasher.jsx'
import Docs from './components/Docs.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import AI from './components/AI.jsx'
import { DEVICES } from './devices.js'
import { PLATY_FIRMWARE } from './firmware.js'
import { CAN_FLASH } from './platform.js'

const STORAGE_KEY = 'platy-mode'

function loadInitial() {
  if (typeof window === 'undefined') return 'dark'
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === 'light' || raw === 'dark') return raw
  } catch {}
  return 'dark'
}

export default function App() {
  const [mode, setMode] = useState(loadInitial)

  useEffect(() => {
    applyTheme(document.documentElement, mode)
    try { localStorage.setItem(STORAGE_KEY, mode) } catch {}
  }, [mode])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav mode={mode} onModeChange={setMode} />
      <main id="main">
        <Hero />
        <Screenshots />
        <Features />
        <Links />
        <Devices
          devices={DEVICES}
          title="Five boards, one firmware"
          intro={CAN_FLASH
            ? 'Each board is its own PlatformIO env in the same source tree. Pick yours in the flasher and it writes the matching image.'
            : 'Each board is its own PlatformIO env in the same source tree. Open this page on a desktop browser to flash one.'}
        />
        {CAN_FLASH && <Flasher product={PLATY_FIRMWARE} devices={DEVICES} />}
        <Docs />
        <AI />
      </main>
      <Footer mark="Platy APRS" repo="oumike/platy-aprs" />
    </>
  )
}
