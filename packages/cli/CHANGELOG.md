# radianui

## 0.4.0

### Minor Changes

- 1304630: Add `search` command to find components and blocks by name or description with fuzzy matching and type filtering
- 2ff2d28: Add `info` command to display RadianUI project configuration and diagnostics:

  - Detect and display `utility.css` (`utilityCssFile`) in `getProjectInfo` and `info` output
  - Include `llms.txt` documentation link and full `components.json` configuration details
  - Update unit and integration tests for `getProjectInfo` and `info`

- fbd3a9e: Add `add-asset` command to install static registry assets:

  - Add `add-asset` (alias `asset`) command to download static assets (such as country flags) directly into projects
  - Support interactive asset selection prompt and registry type selection
  - Add flexible asset matching by ISO code, name, filename, and description
  - Add support for `--all`, `--overwrite`, and `--cwd` flags
  - Support static asset file placement via `file.targetDir` (e.g. `public/assets/...`)
  - Bypass AST / `ts-morph` transformation for static files like `.svg`
  - Add unit and integration tests for `addAsset` command and file creation

### Patch Changes

- 55ed295: Remove unused dependencies (@clack/prompts, kleur, node-fetch, deepmerge, json5) to optimize CLI install size and speed

## 0.3.8

### Patch Changes

- e3781a9: Include cn utils dependencies in install list

## 0.3.7

### Patch Changes

- 8c22041: Pin zod version and add logic to create cn utils file for existing projects

## 0.3.6

### Patch Changes

- Update readme.md
- 7a0673d: Add `preInstall` hook and upgrade template's packages versions

## 0.3.5

### Patch Changes

- 8001aef: Move `tsup` and `type-fest` to `devDependencies`

## 0.3.4

### Patch Changes

- aaf7495: Add `preInstall` hook and upgrade template's packages versions

## 0.3.3

### Patch Changes

- Update registry url

## 0.3.2

### Patch Changes

- fix font CSS variables not updated during `init`

## 0.3.0

### Minor Changes

- 93e7b21: Removed asking icon and styles questions temporarily

### Patch Changes

- 721ea79: CLI now handles the useSrcDir configuration option
- ac4b002: CLI handles adding style based components
- 085515f: Let users choose icon library
- 6c4ecb2: Add support for initializing projects using preset codes — fetches design system configuration (colors, fonts, radius, utilities) from the RadianUI API and generates the corresponding theme CSS.
- Let users initialize project with selected theme

## 0.2.2-alpha.5

### Patch Changes

- Removed asking icon and styles questions temporarily

## 0.2.2-alpha.4

### Patch Changes

- Let users choose icon library

## 0.2.2-alpha.3

### Patch Changes

- Let users initialize project with selected theme

## 0.2.2-alpha.2

### Patch Changes

- CLI handles adding style based components

## 0.2.2-alpha.1

### Patch Changes

- CLI now handles the useSrcDir configuration option

## 0.2.2-alpha.0

### Patch Changes

- Add support for initializing projects using preset codes — fetches design system configuration (colors, fonts, radius, utilities) from the RadianUI API and generates the corresponding theme CSS.

## 0.2.0

### Minor Changes

- - Initialize with theme-provider by default

## 0.1.4

### Patch Changes

- Update CSS file

## 0.1.3

### Patch Changes

- global.css template updated

## 0.1.2

### Patch Changes

- Default body font inter and heading font to geist

## 0.1.1

### Patch Changes

- Added font selection and brand-color configuration options

- Improved compatibility with existing Vite and Next.js projects

- Enhanced block-adding logic so variants (e.g., signin-01, signin-02) no longer overwrite each other but register as distinct blocks

## 0.1.0

### Minor Changes

- 1587b6d: This is the very first release of radianui.

## 0.1.0-alpha.0

### Minor Changes

- This is the very first alpha release of radianui.
