# Radian UI

Build next generation of world class products and solutions. **Use this to make your product look fabulous**.

![hero](https://github.com/Radian-os/radianui/blob/main/apps/website/public/og/static-og.png)

## Documentation

Visit https://radianui.com/docs/getting-started/introduction to view the documentation.


## Brand logo catalog

The authoritative manifest lives in `radian-resources/packages/brand-logos/manifest.json`, alongside the SVG files. Add and remove brands there.

Logo previews, SVG copies and downloads, and PNG exports load the original SVGs directly from jsDelivr. No local asset mirror, proxy, synchronization commands, or build flags are required.

`brand-logos-catalog.json` contains the category and brand metadata used for routes, search, and counts. It does not contain images. Update this catalog when adding or removing brands from the resources repository.

### Resource image sitemap

`pnpm run generate:image-sitemap` scans available resource pages and public images and writes `public/resources/image-sitemap.xml`. The development and production build commands run it before Next.js starts or compiles. Next.js serves the XML as a public static file; no deployed route scans source directories. The scanner and its tests live in `scripts/`, outside the server source tree, so they do not expand Next.js output-file tracing. Regenerate it after adding images to a running development checkout, or restart the dev server.


Brand-logo tile and hero previews use CSS theme selection with stable server markup. Theme changes do not require a hydration hook or a second render of every tile.
