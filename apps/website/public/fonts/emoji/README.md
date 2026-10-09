# Emoji vector export assets

- `Noto-COLRv1.ttf`: Google Noto Emoji v2.051, downloaded from https://github.com/googlefonts/noto-emoji/blob/v2.051/fonts/Noto-COLRv1.ttf. SIL Open Font License 1.1; see `OFL.txt`.
- `harfbuzz/`: unmodified browser ESM runtime and WASM from harfbuzzjs 1.6.3. MIT license; see `harfbuzz/LICENSE`.

These files are loaded on demand for SVG export. HarfBuzz shapes full emoji sequences and walks the font's COLRv1 paint graph. The exporter writes original outlines, clips, gradients and masks into a 512×512 SVG; no bitmap or text glyph is embedded.

Exports use Noto artwork, which can differ from native emoji displayed on the page. SVG importers may interpret masks and soft-light blending differently. A smiley SVG has been verified by pasting into Figma; other emoji and importer combinations may vary.
