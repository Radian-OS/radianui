# 🖥️ Radian UI CLI (radianui)

Radian UI CLI helps you scaffold a new project and add production‑ready UI components, blocks, and utilities with minimal setup. It configures Tailwind CSS (v4), generates project configuration, and installs required dependencies for you.

---

## 📦 Quick start

Run directly via npx (no install needed):

```bash
npx radianui@latest init
```

Then follow the prompts to choose framework, src directory, brand color, and font.

---

## 🔧 Commands

### `init`

Initialize a new project or configure an existing one.

```bash

# Create a new Vite React+TS app
npx radianui init my-app --vite

# Create a new Next.js project
npx radianui init --next
```

Notes:

- You cannot pass both `--next` and `--vite` together.
- In an empty directory (no package.json), `init` can scaffold a new project for you.
- In an existing project, `init` writes configuration and required files without re‑scaffolding.

### `add`

Add UI components or blocks to your project. Resolves registry dependencies automatically and downloads any required assets for blocks.

```bash
# Pick from an interactive list
npx radianui add

# Add specific components
npx radianui add button card alert

# Add all UI components
npx radianui add --all

# Overwrite existing files without prompts
npx radianui add button --overwrite
```

Behavior:

- If no project is detected, you’ll be prompted to create one before adding components.
- Files are created under your configured aliases (see `components.json`).
- When adding blocks, required assets are downloaded into `public/` automatically.

---

## 🌐 Documentation

Visit [https://radianui.com/docs/getting-started/cli](https://radianui.com/docs/getting-started/cli) for guides and full CLI reference.

## 📄 License

Licensed under the [MIT License](https://github.com/Radian-os/radianui/blob/main/LICENSE.md).
