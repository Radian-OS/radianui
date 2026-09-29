---
"radianui": minor
---

Add `add-asset` command to install static registry assets:

- Add `add-asset` (alias `asset`) command to download static assets (such as country flags) directly into projects
- Support interactive asset selection prompt and registry type selection
- Add flexible asset matching by ISO code, name, filename, and description
- Add support for `--all`, `--overwrite`, and `--cwd` flags
- Support static asset file placement via `file.targetDir` (e.g. `public/assets/...`)
- Bypass AST / `ts-morph` transformation for static files like `.svg`
- Add unit and integration tests for `addAsset` command and file creation
