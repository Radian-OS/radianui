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

Commit the generated snapshot when refreshing it. Upstream asset additions become public on the next website build and deployment; local development uses the snapshot until you sync again.
