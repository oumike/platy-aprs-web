// The RF link is one or the other, never both; the device switches between
// them from its Radio link screen or the web Radio tab.
const LINKS = [
  {
    tag: 'Bluetooth',
    title: 'KISS over BLE to your radio',
    body: <>Scan, pick the radio, and it connects and reconnects on its own. Works with the Mobilinkd TNC3/TNC4, the BTECH/Vero VR-N76 and VR-N7600, and any BLE KISS device — the service UUIDs are configurable and default to the common <span className="kbd">00000001-ba2a-…</span> service.</>,
  },
  {
    tag: 'LoRa',
    title: 'LoRa APRS on the built-in radio',
    body: <>Uses the board's own SX1262 or LR1110 with the usual LoRa APRS framing, so it talks to existing LoRa APRS iGates and trackers. Defaults to 433.775 MHz, SF12, 125 kHz, CR 4/5; frequency, spreading factor, bandwidth, coding rate and power are all adjustable.</>,
  },
]

export default function Links() {
  return (
    <section id="links" className="band">
      <div className="container">
        <p className="eyebrow">Radio link</p>
        <h2>Two ways onto the air</h2>
        <p className="measure">
          Transmitting on either needs an amateur radio licence. Stick to the
          band your board's antenna and RF path were built for.
        </p>
        <div className="grid feature-grid">
          {LINKS.map(l => (
            <div className="panel" key={l.title}>
              <span className="tag">{l.tag}</span>
              <h3>{l.title}</h3>
              <p>{l.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
