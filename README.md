# platy-aprs-web

Information site and browser-based firmware flasher for
[platy-aprs](https://github.com/oumike/platy-aprs) — APRS client firmware for
ESP32-S3 handhelds (Elecrow ThinkNode M9, Seeed Wio Tracker L2, LilyGo T-Deck
Plus, Attaky Mesh Deck, Elecrow CrowPanel Advance 3.5, LilyGo T-LoRa Pager) that talks KISS over Bluetooth LE to a TNC or radio, or LoRa APRS on the
board's own radio.

Live at <https://platy.sumat.org>. Built the same way as
[camillia-mt-web](https://github.com/oumike/camillia-mt-web): a Vite + React
static site served by nginx in a container, published to GHCR by a manual
release workflow, with an
[esp-web-tools](https://esphome.github.io/esp-web-tools/)-backed flasher that
writes firmware directly from the browser over USB.

## Develop

```bash
npm install
npm run dev
```

Then open <http://localhost:5173>.

## Build

```bash
npm run build       # outputs static files to dist/
npm run preview     # serves the built site on :4173
```

## Run as a container

Releases publish an image to GHCR, so nothing needs building to run the site:

```bash
docker run --rm -p 10081:80 ghcr.io/oumike/platy-aprs-web:latest
```

The image is published for **`linux/amd64` and `linux/arm64`**, so it runs on a
Raspberry Pi as well as an x86 box.

The published image is **baked for the `/platy/` subpath** — Vite rewrites
every asset URL at build time, so this is not runtime-tunable. nginx answers
both `/` and `/platy/`, so <http://localhost:10081/> works.

On the server, with the repo checked out:

```bash
./update-container.sh                 # pull :latest and recreate
./update-container.sh --tag 1.0.1     # roll back to an exact version
```

`update-container.sh --git-pull` refreshes the checkout first, which is only
needed when `docker-compose.yml` or the script itself has changed.

### Building it yourself

`docker-compose.yml` is pull-only on purpose. Local builds use an overlay that
tags the result `platy-aprs-web:local`, so a local build can never overwrite
the published image under the same name:

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

The Dockerfile uses `--platform=$BUILDPLATFORM`, which needs BuildKit
(`docker buildx`). The legacy builder rejects it.

> `nginx.conf` is baked into the image. Editing it on the server has no effect
> — an nginx change needs a commit and a release.

### Reverse proxy at platy.sumat.org

`platy.sumat.org` is a proxy host in Nginx Proxy Manager pointing at the
container on host port **10081** (`http`, forward the whole host). TLS is
terminated there, which the flasher needs (see below).

### OTA proxy at ota.platy.sumat.org

The device has no TLS, so on-device updates go through a second NPM proxy host,
`ota.platy.sumat.org`, pointing at the same container (host port **10081**)
over **plain HTTP — no SSL certificate, no Force SSL**. It mirrors
`ota.camillia.sumat.org`. The container's `nginx.conf` serves:

| Path | Answers with |
|---|---|
| `/firmware/latest` | GitHub's `/repos/oumike/platy-aprs/releases/latest` JSON (stable only; the device reads `tag_name`) |
| `/firmware/<tag>/<asset>` | the release asset, following GitHub's redirect server-side |

For example `http://ota.platy.sumat.org/firmware/v0.2.0/platy-aprs-m9-v0.2.0-app.bin`.
`/firmware/latest` returns GitHub's 404 until platy-aprs has a stable release.

### A note on Web Serial

The in-browser flasher uses the Web Serial API, which only runs in secure
contexts. That means:

- `http://localhost` works (browsers treat localhost as secure).
- Any other host requires HTTPS — terminate TLS at a reverse proxy in front
  of the container.
- Web Serial is only implemented in Chromium-based browsers (Chrome, Edge,
  Opera, Brave) on desktop. Firefox and Safari are not supported. The page
  detects this and offers `.bin` downloads instead.

### Firmware images

The flasher writes the full image (`platy-aprs-<env>-<tag>.bin`, at `0x0`)
that platy-aprs' `scripts/package.sh` produces. The app-only image
(`platy-aprs-<env>-<tag>-app.bin`, at `0x10000`) is offered as a download for
updating without touching settings. Both come through the same-origin
`/firmware/<tag>/<file>` proxy in `nginx.conf` (and `vite.config.js` in dev),
because GitHub's release CDN sends no CORS headers.

Only stable releases are offered; prereleases are filtered out. Until
platy-aprs publishes its first release the flasher says there is nothing to
flash yet.

## Updating the firmware version

`FIRMWARE_VERSION` in [`src/firmware.js`](src/firmware.js) is **not** where the
version list comes from. The flasher fetches every release from the GitHub API
at page load (`releaseCatalog()`); the constant is only the fallback shown when
that call fails — rate limit, offline, API outage.

The release workflow syncs it from `oumike/platy-aprs`'s latest stable release
on every release (or sets it to `null` while there is none). To pin a specific
value instead, set the `firmware_version` input when dispatching the release.

## Releasing

Releases are cut by hand from the Actions tab — never on a push or a tag.

1. **Actions → Release → Run workflow**, from `main`.
2. Leave `version` blank to bump the patch of the latest tag, or type an exact
   `X.Y.Z`. The first release seeds `1.0.0`.
3. Tick `dry_run` to build and smoke-test without publishing anything.

The job, in order: syncs `FIRMWARE_VERSION`, bumps `package.json`, builds and
**smoke-tests the image**, and only then pushes the image, the commit, the tag
and the GitHub Release. `:latest` moves last, so the server can never pull a
version whose release does not exist yet.

Then, on the server:

```bash
./update-container.sh
```

### One-time setup

The first release creates `ghcr.io/oumike/platy-aprs-web` as a **private**
package, and `docker compose pull` will fail with a 401 that reads like a bad
image name. After release `1.0.0`:

- [ ] Package settings → **Change visibility → Public**
- [ ] Confirm **Inherit access from repository** links it to this repo

(Or keep it private and run `docker login ghcr.io` on the server with a
`read:packages` token.)

### Rolling back

```bash
./update-container.sh --tag 1.0.1
```

Every published version stays in GHCR; the prune step only removes dangling
images, so old tags remain as rollback targets.

## Layout

```
src/
  App.jsx            top-level shell + light/dark persistence
  themes.js          palette from the firmware's LVGL colors
  devices.js         hardware target metadata (shared by Devices + Flasher)
  firmware.js        fallback version, asset names, manifest generator
  components/        Hero, Features, Links, Devices, Flasher, Docs, …
public/
  favicon.svg        platypus mark
  devices/           board photos
Dockerfile             node build → nginx serve
nginx.conf             SPA fallback, asset caching, firmware proxy
docker-compose.yml     server: pull the published image (host port 10081)
docker-compose.dev.yml overlay: build locally as platy-aprs-web:local
update-container.sh    server-side deploy (pull → recreate)
.github/workflows/
  build.yml            CI: build site + image, shellcheck, smoke test
  release.yml          manual release: publish to GHCR, tag, create Release
```
