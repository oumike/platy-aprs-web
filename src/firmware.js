import { withBase } from './basePath'

// Configuration for the in-browser flasher. FIRMWARE_VERSION is the fallback
// used if the GitHub API call fails (rate limit, offline, etc.) — the live
// version list is fetched at page load via releaseCatalog(). The release
// workflow rewrites this line; null means platy-aprs had no stable release yet,
// so there is no tag worth guessing at.
export const FIRMWARE_VERSION = 'v0.1.2'
export const REPO = 'oumike/platy-aprs'

// Same-origin proxy path. Vite (dev) and nginx (prod) forward /firmware/<tag>/<file>
// to https://github.com/<repo>/releases/download/<tag>/<file>, adding CORS
// headers so esp-web-tools' fetch() can read the .bin. GitHub release-assets
// CDN itself does not send Access-Control-Allow-Origin.
export const PROXY_BASE = withBase('/firmware')

// Asset names from platy-aprs' scripts/package.sh, which is called with the
// tag (v-prefixed) as its version:
//   platy-aprs-<env>-<tag>.bin      full image, flash at 0x0
//   platy-aprs-<env>-<tag>-app.bin  app only, flash at 0x10000 (keeps settings)
export const PLATY_FIRMWARE = {
  name: 'Platy APRS',
  repo: REPO,
  proxyBase: PROXY_BASE,
  assetName: (env, version) => `platy-aprs-${env}-${version}.bin`,
  appAssetName: (env, version) => `platy-aprs-${env}-${version}-app.bin`,
  fallbackVersion: FIRMWARE_VERSION,
}

export function firmwareUrl(product, env, version, assetName = product.assetName) {
  return `${product.proxyBase}/${version}/${assetName(env, version)}`
}

export function releaseUrl(product, version) {
  return `https://github.com/${product.repo}/releases/tag/${encodeURIComponent(version)}`
}

// esp-web-tools manifest. package.sh writes one merged bin at offset 0x0, so
// the manifest mirrors that with the chip family declared by the device. The
// part URL must be absolute — esp-web-tools calls `new URL(path)` without a
// base — so we resolve against window.location.origin (same-origin proxy).
export function manifestFor(product, device, version) {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  return {
    name: `${product.name} (${device.name})`,
    version,
    new_install_prompt_erase: true,
    builds: [
      {
        chipFamily: device.chip,
        parts: [
          { path: `${origin}${firmwareUrl(product, device.env, version)}`, offset: 0 },
        ],
      },
    ],
  }
}

// Encode the manifest as a data: URL so esp-web-install-button can fetch it
// without any lifecycle (blob URLs can be revoked before the button reads them).
export function manifestDataUrl(product, device, version) {
  const json = JSON.stringify(manifestFor(product, device, version))
  return `data:application/json;charset=utf-8,${encodeURIComponent(json)}`
}

// Fetch all GitHub releases (paginated) and return an ordered catalog:
// [{ tag, assetNames, notes, url, prerelease } ...], newest first. Drafts are
// skipped. An empty list is an answer, not a failure.
export async function releaseCatalog(repo = REPO) {
  const perPage = 100
  const maxPages = 10
  const out = []

  for (let page = 1; page <= maxPages; page += 1) {
    const res = await fetch(
      `https://api.github.com/repos/${repo}/releases?per_page=${perPage}&page=${page}`,
      { headers: { Accept: 'application/vnd.github+json' } }
    )
    if (!res.ok) throw new Error(`GitHub API ${res.status}`)
    const data = await res.json()
    if (!Array.isArray(data)) throw new Error('Unexpected releases response')

    for (const rel of data) {
      if (!rel || rel.draft || !rel.tag_name) continue
      out.push({
        tag: rel.tag_name,
        assetNames: Array.isArray(rel.assets) ? rel.assets.map(a => a?.name).filter(Boolean) : [],
        notes: rel.body ?? '',
        url: rel.html_url ?? '',
        prerelease: !!rel.prerelease,
      })
    }

    if (data.length < perPage) break
  }

  return out
}

// Stable version tags that have a flashable asset for this env, newest first.
// Prereleases are filtered here so there is one place that decides what the
// flasher may install; testers can still fetch those by tag on GitHub.
export function versionsForEnv(product, catalog, env) {
  if (!Array.isArray(catalog)) return []
  return catalog
    .filter(rel => rel && rel.tag && Array.isArray(rel.assetNames) && !rel.prerelease
      && rel.assetNames.includes(product.assetName(env, rel.tag)))
    .map(rel => rel.tag)
}
