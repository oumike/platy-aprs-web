// Site palette. platy-aprs has no theme picker on the device — its LVGL UI
// uses one fixed set of colors (src/ui/ui.cpp) — so the dark palette is those
// colors, and light is a daylight counterpart with the same blue accent.
//
// The keys are the CSS custom properties styles.css (shared with
// camillia-mt-web) is written against; applyTheme() writes them on <html>.

const DARK = {
  bgMain:      '#12161b',
  statusTop:   '#161b21',
  statusBg:    '#1b2027',
  panelBg:     '#1b2027',
  panelAlt:    '#2a313b',
  panelStrong: '#2c3b4d',
  tabActive:   '#3fa7ff',
  tabUnread:   '#ffb300',
  tabIdle:     '#20262e',
  divider:     '#262d36',
  dividerHi:   '#33506e',
  inputBg:     '#2a313b',
  inputTop:    '#232931',
  accent:      '#3fa7ff',
  textMain:    '#f3f6fa',
  textDim:     '#9aa4b2',
  textOnAccent:'#080d14',
  selectBg:    '#2e3f53',
}

const LIGHT = {
  bgMain:      '#f2f5f8',
  statusTop:   '#f8fafc',
  statusBg:    '#e6ebf1',
  panelBg:     '#ffffff',
  panelAlt:    '#e6ebf1',
  panelStrong: '#d6e4f3',
  tabActive:   '#1565c0',
  tabUnread:   '#b07a00',
  tabIdle:     '#dde3ea',
  divider:     '#d3dae2',
  dividerHi:   '#9bbbe0',
  inputBg:     '#e6ebf1',
  inputTop:    '#eef2f6',
  accent:      '#1565c0',
  textMain:    '#1e242c',
  textDim:     '#5e6876',
  textOnAccent:'#ffffff',
  selectBg:    '#d6e4f3',
}

export function applyTheme(rootEl, mode) {
  const palette = mode === 'light' ? LIGHT : DARK
  for (const [key, value] of Object.entries(palette)) {
    rootEl.style.setProperty('--' + key.replace(/[A-Z]/g, ch => '-' + ch.toLowerCase()), value)
  }
  rootEl.dataset.mode = mode === 'light' ? 'light' : 'dark'
}
