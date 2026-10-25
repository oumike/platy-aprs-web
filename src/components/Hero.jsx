import { CAN_FLASH } from '../platform.js'
import { withBase } from '../basePath'
import { DEVICES } from '../devices.js'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">ESP32-S3 · APRS · BLE KISS · LoRa</p>
          <h1>APRS firmware for ESP32-S3 handhelds</h1>
          <p className="lede">
            Platy APRS runs on handheld ESP32-S3 boards. It connects to a
            Bluetooth KISS TNC or radio, or uses the board's own LoRa radio. You
            can beacon, send messages, see stations on a map, and gate to
            APRS-IS from the device or from its web page.
          </p>
          <div className="hero-actions">
            {CAN_FLASH && <a className="btn" href="#flash">Flash from your browser</a>}
            <a className={CAN_FLASH ? 'btn btn-ghost' : 'btn'} href="https://github.com/oumike/platy-aprs"
               target="_blank" rel="noreferrer">View source on GitHub</a>
          </div>
          <p className="hero-spec">{DEVICES.length} boards · BLE TNC or LoRa · iGate · digipeater · offline maps</p>
        </div>

        <figure className="hero-screen">
          <img className="hero-shot" src={withBase('/screenshots/monitor.png')} width="640" height="480"
               alt="The Platy APRS packet monitor on a ThinkNode M9: a live list of APRS packets from APRS-IS." />
          <figcaption>Packet monitor · ThinkNode M9 · 320 × 240</figcaption>
        </figure>
      </div>
    </section>
  )
}
