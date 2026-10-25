import { withBase } from '../basePath'

// Captured off a ThinkNode M9 (320x240, saved at 2x). Our callsign is blurred.
const SHOTS = [
  {
    src: '/screenshots/home.png',
    title: 'Home',
    body: 'Each screen has a one-key shortcut. The status bar shows APRS-IS traffic, the Bluetooth TNC, GPS, Wi-Fi, battery and the time.',
    alt: 'The Platy APRS home menu: Stations, Messages, Monitor, Send beacon now, Map and Status & connection info, under a status bar of connection icons, battery and time.',
  },
  {
    src: '/screenshots/messages.png',
    title: 'Messages',
    body: 'Conversations by station, with the last message under each. Start a new one or open one to read and reply.',
    alt: 'The Messages screen: a New message button above conversations with APRSPH, WXBOT and ANSRVR.',
  },
  {
    src: '/screenshots/monitor.png',
    title: 'Monitor',
    body: 'Every packet heard or sent, live, newest first. IS marks APRS-IS lines (grey) and TX your own (blue); RF lines are untagged.',
    alt: 'The Monitor screen: a scrolling list of raw APRS packets received from APRS-IS.',
  },
]

export default function Screenshots() {
  return (
    <section id="screens" className="band">
      <div className="container">
        <p className="eyebrow">On the device</p>
        <h2>Screenshots</h2>
        <div className="grid shot-grid">
          {SHOTS.map(s => (
            <figure className="shot" key={s.src}>
              <img src={withBase(s.src)} alt={s.alt} width="640" height="480" loading="lazy" />
              <figcaption>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
