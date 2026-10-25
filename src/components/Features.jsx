const FEATURES = [
  {
    tag: 'Messaging',
    title: 'APRS messaging',
    body: 'Send and receive APRS messages from the device or the web page. Outgoing messages are retried until they are acked. Incoming messages are acked, de-duplicated, and announced with a beep and a banner. You can save five quick messages and send each with one key.',
  },
  {
    tag: 'Beacon',
    title: 'GPS beacons with SmartBeaconing',
    body: 'Beacon from GPS with SmartBeaconing or a fixed interval, from a fixed position, or not at all. "Send beacon now" is on the home screen. The GPS sets the clock when there is no NTP.',
  },
  {
    tag: 'Stations',
    title: 'Packet monitor and station list',
    body: 'A live packet monitor, and a list of every station heard with its details. Starred stations and conversations sort to the top and are not dropped when the list is full.',
  },
  {
    tag: 'Maps',
    title: 'Offline maps',
    body: 'Stations with a position are shown on OpenStreetMap tiles: amber for RF, grey for APRS-IS, blue for weather, purple for objects. Tiles are cached on the SD card, so areas you have already viewed work without Wi-Fi.',
  },
  {
    tag: 'APRS-IS',
    title: 'iGate and digipeater',
    body: 'On Wi-Fi it logs in to APRS-IS, gates RF traffic to the Internet, and can pass messages back to stations heard on RF. An optional WIDE1-1 fill-in digipeater suppresses duplicates.',
  },
  {
    tag: 'Config',
    title: 'Web configuration',
    body: 'The device serves its own config page: callsign, Wi-Fi, radio link, beacon, APRS-IS. On first boot it opens a setup access point with a join QR code on screen. An admin password is optional.',
  },
  {
    tag: 'Logging',
    title: 'Packet log on microSD',
    body: 'Every packet heard and sent is appended to a dated log on the SD card in TNC2 format. You can download or delete logs from the web page. Message history is stored there too.',
  },
  {
    tag: 'Backup',
    title: 'Backup and restore',
    body: 'Download a JSON backup, upload one to restore, or keep backups on the SD card. On first boot, a new device that finds backups on its card offers to restore one.',
  },
]

export default function Features() {
  return (
    <section id="features">
      <div className="container">
        <p className="eyebrow">Features</p>
        <h2>What it does</h2>
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
