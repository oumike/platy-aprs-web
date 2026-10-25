export const STEPS = [
  {
    title: 'Join the setup network',
    body: <>On first boot the device opens an access point named <span className="kbd">PLATY-APRS-XXXX</span>. The home screen shows its name and a QR code to join it.</>,
  },
  {
    title: 'Open the config page',
    body: <>Browse to <a href="http://192.168.4.1">192.168.4.1</a>. There is no captive portal, so type the address yourself. The page is served by the device, so no internet connection is needed.</>,
  },
  {
    title: 'Set your callsign and Wi-Fi',
    body: <>Enter your callsign and the rest of your settings, add your Wi-Fi network on the <b>Wi-Fi</b> tab, and save. Once it joins, the setup network closes and the page moves to <span className="kbd">platy-aprs.local</span>.</>,
  },
  {
    title: 'Pick a radio link',
    body: <>On the <b>Radio</b> tab, scan for your Bluetooth TNC (put it in pairing mode first) or switch to LoRa. Beacons start going out once a callsign is set and the link is up.</>,
  },
]

export default function Docs({ steps = STEPS, title = 'First-time setup' }) {
  return (
    <section id="docs">
      <div className="container">
        <p className="eyebrow">Getting started</p>
        <h2>{title}</h2>
        <ol className="steps" role="list">
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className="step-n">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
