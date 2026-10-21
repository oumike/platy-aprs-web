import { CAN_FLASH } from '../platform.js'

// Drawn, not captured: there is no screenshot off the hardware yet. The rows
// use the monitor's real line format and colors (amber RF, grey APRS-IS, blue
// sent). Callsigns are made up.
const ROWS = [
  { t: '21:51', cls: 'lcd-rf', text: 'W8ABC-10>APDR16,WIDE2-1:=4239.50N/08310.20W-' },
  { t: '21:52', cls: 'lcd-is', text: 'KC8GHI-13>APRS,TCPIP*:@215200z4231.40N/08317.60W_270/004g009t048' },
  { t: '21:52', cls: 'lcd-rf', text: 'N8JKL>APOT30,WIDE2-1:!4244.02N/08255.71W#PHG2360' },
  { t: '21:53', cls: 'lcd-tx', text: 'MYCALL-7>APZRHN,WIDE1-1:!4237.60N/08303.40W[' },
  { t: '21:53', cls: 'lcd-rf', text: 'KD8MNO-9>APAT51,WIDE1-1:`o0Ul!Zk/`"4E}_%' },
  { t: '21:54', cls: 'lcd-rf', text: 'N0CALL-9>APLRG1,WIDE1-1:!4237.12N/08304.55W>' },
  { t: '21:54', cls: 'lcd-is', text: 'KD8XYZ>APRS,TCPIP*:@215400z4236.00N/08301.00W_' },
  { t: '21:55', cls: 'lcd-tx', text: 'MYCALL-7>APZRHN,WIDE1-1::N0CALL-9 :73, see you there{12' },
  { t: '21:55', cls: 'lcd-rf', text: 'N0CALL-9>APLRG1::MYCALL-7 :ack12' },
  { t: '21:56', cls: 'lcd-rf', text: 'W8ABC-10>APDR16,WIDE2-1:=4239.50N/08310.20W-' },
  { t: '21:57', cls: 'lcd-is', text: 'K8DEF>APN391,qAR,W8ABC:;LECTURE *152000z4240.' },
  { t: '21:57', cls: 'lcd-tx', text: 'MYCALL-7>APZRHN,WIDE1-1:!4237.80N/08303.10W[' },
]

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">ESP32-S3 · APRS · BLE KISS · LoRa</p>
          <h1>APRS in your pocket, no phone required</h1>
          <p className="lede">
            platy-aprs is APRS client firmware for handheld ESP32-S3 boards. Pair
            it with a Bluetooth KISS TNC or radio, or use the board's own LoRa
            radio — then beacon, message, map stations, and gate to APRS-IS,
            all from the device or its built-in web page.
          </p>
          <div className="hero-actions">
            {CAN_FLASH && <a className="btn" href="#flash">Flash from your browser</a>}
            <a className={CAN_FLASH ? 'btn btn-ghost' : 'btn'} href="https://github.com/oumike/platy-aprs"
               target="_blank" rel="noreferrer">View source on GitHub</a>
          </div>
          <p className="hero-spec">3 boards · BLE TNC or LoRa · iGate · digipeater · offline maps</p>
        </div>

        <figure className="hero-screen">
          <div className="lcd" role="img"
               aria-label="The platy-aprs packet monitor: a list of timestamped APRS packets, heard over RF, from APRS-IS, and sent by this station.">
            <div className="lcd-bar" aria-hidden="true">
              <span>MYCALL-7</span>
              <span><b>BLE</b> · GPS · 21:57</span>
            </div>
            <ul className="lcd-rows" aria-hidden="true">
              {ROWS.map((r, i) => (
                <li key={i} className={r.cls}><time>{r.t}</time>{r.text}</li>
              ))}
            </ul>
            <div className="lcd-keys" aria-hidden="true">
              <b>Back</b> close · <b>Home</b> home · <b>Msg</b> messages · <b>Map</b> map
            </div>
          </div>
          <figcaption>Packet monitor · 320 × 240 · illustration</figcaption>
        </figure>
      </div>
    </section>
  )
}
