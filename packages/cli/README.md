# 🖥️ Radian UI CLI (radianui)

Radian UI CLI helps you scaffold a new project and add production ready UI components, blocks, and utilities with minimal setup. It configures Tailwind CSS (v4), generates project configuration, and installs required dependencies for you.

**[Website](https://radianui.com)** • **[Documentation](https://radianui.com/docs/getting-started/introduction)** • **[UI Blocks](https://blocks.radianui.com)** • **[Figma Design System](https://www.figma.com/design/ZB8gTZwafZOYY7rdJjSRz6/%E2%9D%96-Preview-%E2%9D%96-Radian-Design-System-%E2%9D%96-Version-0.3)** • **[GitHub](https://github.com/Radian-os/radianui)**

---

## 📦 Quick start

Run directly via npx (no install needed):

```bash
npx radianui@latest init
```

Then follow the prompts to choose framework, source directory, brand color, font, component style, and icon library. Initialization also installs shared global styles, the color palette, and the emoji flag font.

---

## 🔧 Commands

### `init`

Initialize a new project or configure an existing one.

```bash
# Create a new Vite React+TS app
npx radianui@latest init my-app --vite

# Create a new Next.js project
npx radianui@latest init --next
```

Notes:

- You cannot pass both `--next` and `--vite` together.
- In an empty directory (no package.json), `init` can scaffold a new project for you.
- In an existing project, `init` writes configuration and required files without re‑scaffolding.

### `add`

Add UI components or blocks to your project. Resolves registry dependencies automatically and downloads any required assets for blocks.

```bash
# Pick from an interactive list
npx radianui@latest add

# Add specific components
npx radianui@latest add button card alert

# Add all UI components
npx radianui@latest add --all

# Overwrite existing files without prompts
npx radianui@latest add button --overwrite
```

Behavior:

- If no project is detected, you'll be prompted to create one before adding components.
- Files are created under your configured aliases (see `components.json`).
- When adding blocks, required assets are downloaded into `public/` automatically.

### `add-asset`

Download country flags into your project's public assets directory:

```bash
npx radianui@latest add-asset flag US GB NP
npx radianui@latest add-asset flag --all
```

### `search`

Find components and blocks by name or description:

```bash
npx radianui@latest search dialog
npx radianui@latest search sidebar --filter block --limit 5
```

### `info`

Inspect project configuration and installed components:

```bash
npx radianui@latest info
npx radianui@latest info --json
```

`init` also supports `--preset <code>`, `--style default|sera`, and
`--icon-library lucide|hugeicons`. See the full CLI reference for all options.

---

## 🎨 Design resources

Beyond components, Radian provides free, ready-to-use design assets:

- **[Figma Design System](https://www.figma.com/design/ZB8gTZwafZOYY7rdJjSRz6/%E2%9D%96-Preview-%E2%9D%96-Radian-Design-System-%E2%9D%96-Version-0.3)** — The full component library as an editable Figma file, kept in sync with the code
- **[UI Avatars](https://radianui.com/resources/avatar)** — 216+ free, royalty free avatar illustrations, available as SVG, PNG, HTML embed, or a matching Figma frame
- **[Full resource hub](https://radianui.com/docs/getting-started/resources)** — Browse everything in one place; including the available flags and emoji collections

---

## 🌐 Documentation

Visit [https://radianui.com/docs/getting-started/cli](https://radianui.com/docs/getting-started/cli) for guides and full CLI reference.

## 📄 License

Licensed under the [MIT License](https://github.com/Radian-os/radianui/blob/main/LICENSE.md).
