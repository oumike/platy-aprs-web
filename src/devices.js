// Single source of truth for hardware targets. Used by both the Devices section
// (info display) and the Flasher (manifest selection). `env` is the PlatformIO
// env name in oumike/platy-aprs, which is also the release asset's board name.
import { withBase } from './basePath'

export const DEVICES = [
  {
    env: 'm9',
    buy: { seller: 'Elecrow', href: 'https://www.elecrow.com/thinknode-m9-meshcore-communication-terminal-with-full-keyboard-2-4inch-lcd-esp32-s3-lr1110-gps-2300mah.html' },
    name: 'Elecrow ThinkNode M9',
    chip: 'ESP32-S3',
    desc: 'LR1110 LoRa, 2.4″ 320×240 display, QWERTY keypad with D-pad and Messages/Map keys, GPS, microSD.',
    link: 'https://www.elecrow.com/thinknode-m9-meshcore-communication-terminal-with-full-keyboard-2-4inch-lcd-esp32-s3-lr1110-gps-2300mah.html',
    image: withBase('/devices/m9.jpg'),
  },
  {
    env: 'wio-tracker-l2',
    buy: { seller: 'Seeed Studio', href: 'https://www.seeedstudio.com/Wio-Tracker-L2-Pro-for-Meshtastic-p-0000.html' },
    name: 'Seeed Wio Tracker L2',
    chip: 'ESP32-S3',
    desc: 'SX1262 LoRa, 320×240 touch panel, L76K GPS, SDMMC microSD. BOOT is Back; hold it for Home.',
    link: 'https://www.seeedstudio.com/Wio-Tracker-L2-Pro-for-Meshtastic-p-0000.html',
    image: withBase('/devices/wio-tracker-l2.jpg'),
  },
  {
    env: 'tdeck-plus',
    name: 'LilyGo T-Deck Plus',
    chip: 'ESP32-S3',
    desc: 'SX1262 LoRa, 2.8″ 320×240 touch display, QWERTY keyboard, trackball, L76K GPS, microSD. Not yet tested on hardware.',
    link: 'https://lilygo.cc/products/t-deck-plus-1',
    image: withBase('/devices/tdeck.png'),
  },
  {
    env: 'mesh-deck',
    name: 'Attaky Mesh Deck',
    chip: 'ESP32-S3',
    desc: 'SX1262 LoRa, 2.0″ 320×240 touch display, 48-key keyboard module, D-pad, ATGM336H GPS. No microSD, so no offline map tiles, packet log or SD backups. Newer and less tested than the M9 and Wio.',
    link: 'https://github.com/Attaky-Module',
    // A reset straight out of download mode can hang this board.
    flashNote: 'After flashing, power-cycle the Mesh Deck to boot it; it can hang on the reset that follows the flash.',
  },
]
