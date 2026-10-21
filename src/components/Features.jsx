const FEATURES = [
  {
    tag: 'Messaging',
    title: 'Messages that get acked',
    body: 'Send and receive APRS messages from the device or the web page. Outgoing messages retry until acked; incoming ones are acked, de-duplicated, and announced with a beep and a banner. Five quick messages are one keypress away.',
  },
  {
    tag: 'Beacon',
    title: 'GPS beacons with SmartBeaconing',
    body: 'Beacon from GPS with SmartBeaconing or a fixed interval, from a fixed position, or not at all. "Send beacon now" is on the home screen. The GPS sets the clock when there is no NTP.',
  },
  {
    tag: 'Stations',
    title: 'Monitor, stations, favorites',
    body: 'A live packet monitor and a station list with details for everything heard. Star the stations and conversations you care about: favorites sort first and never fall off a full list.',
  },
  {
    tag: 'Maps',
    title: 'OpenStreetMap, cached offline',
    body: 'Stations with a position are drawn on OSM tiles — amber for RF, grey for APRS-IS, blue for weather, purple for objects. Tiles are cached on the SD card, so areas you have viewed keep working off Wi-Fi.',
  },
  {
    tag: 'APRS-IS',
    title: 'iGate and digipeater',
    body: 'On Wi-Fi it logs in to APRS-IS, gates heard RF to the Internet, and can pass messages back to stations heard locally. An optional WIDE1-1 fill-in digipeater suppresses duplicates.',
  },
  {
    tag: 'Config',
    title: 'Set it up from a browser',
    body: 'The device serves its own config page: callsign, Wi-Fi, radio link, beacon, APRS-IS. On first boot it opens a setup access point with a join QR code on screen. An admin password is optional.',
  },
  {
    tag: 'Logging',
    title: 'Packet log on microSD',
    body: 'Every packet heard and sent is appended to a dated log on the SD card in TNC2 format, ready to download or delete from the web page. Message history lives there too.',
  },
  {
    tag: 'Backup',
    title: 'Backups that move between devices',
    body: 'Download a JSON backup, upload one to restore, or keep backups on the SD card. A fresh device that finds backups on its card offers to restore one before anything else.',
  },
]

export default function Features() {
  return (
    <section id="features">
      <div className="container">
        <p className="eyebrow">What it does</p>
        <h2>A stand-alone APRS station</h2>
        <div className="grid feature-grid">
          {FEATURES.map(f => (
            <div className="panel" key={f.title}>
              <span className="tag">{f.tag}</span>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
