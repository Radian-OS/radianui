# Radian UI

Build next generation of world class products and solutions. **Use this to make your product look fabulous**.

![hero](https://github.com/Radian-os/radianui/blob/main/apps/website/public/og/static-og.png)

## Documentation

Visit https://radianui.com/docs/getting-started/introduction to view the documentation.


## Brand logo catalog

The authoritative manifest lives in `radian-resources/packages/brand-logos/manifest.json`, alongside the SVG files. Add and remove brands there.

The website imports `brand-logos-manifest.generated.json`, a checked-in, generated snapshot for offline development and synchronous rendering. Do not edit that snapshot by hand. Routes, search, counts, and the image sitemap all use it.

Production builds run `pnpm run sync:brand-logos` before generating pages. Sync downloads the upstream manifest, validates its structure and unique IDs, derives counts from its brand lists, and updates the snapshot atomically. A download or validation failure stops the build rather than publishing a stale catalog.

From this directory, refresh a development checkout with:

```sh
pnpm run sync:brand-logos
```

To preview unpublished changes from a local resources checkout:

```sh
pnpm run sync:brand-logos /absolute/path/to/radian-resources/packages/brand-logos/manifest.json
```

Commit the generated snapshot when refreshing it. Upstream asset additions become public after a sync-enabled website build and deployment; local development uses the snapshot until you sync again.


### Local logo images

The grid and logo dialogs display static SVGs from `public/_brand-assets/<revision>/`. These generated files come from the resources repo and are ignored by Git; upstream CDN links remain available for users to copy.

Production builds sync the manifest and SVG files before `next build` by default, for every branch and deployment environment, including Docker builds. Set `SYNC_BRAND_LOGOS=false` (or Docker `--build-arg SYNC_BRAND_LOGOS=false`) only when deliberately omitting the brand-logo feature. Downloads use a pinned upstream commit, bounded concurrency, timeouts, and skip files already available for that revision. Development checks the local files before starting Next.js and prepares them if missing.

To prepare assets from the local resources checkout after syncing its manifest:

```sh
pnpm run sync:brand-logo-assets /absolute/path/to/radian-resources/packages/brand-logos/manifest.json
```

Commit `brand-logo-assets-version.generated.json` with the generated catalog. Deployment must include the generated `public` directory, as with other Next.js static assets.


### Resource image sitemap

`pnpm run generate:image-sitemap` scans available resource pages and public images and writes `public/resources/image-sitemap.xml`. The development and production build commands run it before Next.js starts or compiles. Next.js serves the XML as a public static file; no deployed route scans source directories. The scanner and its tests live in `scripts/`, outside the server source tree, so they do not expand Next.js output-file tracing. Regenerate it after adding images to a running development checkout, or restart the dev server.


Logo asset generation defaults to enabled in the build script and Dockerfile. Deployment workflows inherit this default without branch-specific settings. Turbo caches the generated public assets and version files together with `.next`; restoring a build must restore both.

Brand-logo tile and hero previews use CSS theme selection with stable server markup. Theme changes do not require a hydration hook or a second render of every tile. The use-case carousel loads near the viewport and pauses when it leaves that area.

If the brand-logo page is absent from a release branch, the build automatically skips both logo sync steps, even with the default Docker setting. No logo manifest or assets are needed in that case. When the page is present, its required sync scripts must be present too; incomplete feature deployments fail explicitly.
