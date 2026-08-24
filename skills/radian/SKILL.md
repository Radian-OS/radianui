---
name: radian
description: Comprehensive guide and reference for RadianUI, including the Radian CLI tools (init, add), components.json configuration, 50+ UI components, animated components, application blocks, OKLCH design tokens, theme system, and globals.css setup for Next.js and Vite.
---

# RadianUI Knowledge Base & Developer Guide

RadianUI is an accessible, customizable component library and design system built with Tailwind CSS v4, OKLCH color palettes, React, and modern TypeScript. It provides a CLI for scaffolding projects and adding components/blocks directly to your codebase.

---

## 1. RadianUI CLI Tooling

The CLI (`radianui`) allows developers to initialize projects, configure themes and aliases, and add components, blocks, or animated widgets directly into their repository.

### Installation & Execution

```bash
# Initialize a new or existing project
npx radianui@latest init [project-name] [options]

# Add components or blocks to an initialized project
npx radianui@latest add [components...] [options]
```

### `init` Command Reference

The `init` command sets up `components.json`, installs core dependencies (`tailwindcss`, `tw-animate-css`, `class-variance-authority`, `clsx`, `tailwind-merge`, icon packages), configures global CSS with OKLCH theme variables, and sets up path aliases.

```bash
Usage: radianui init [options] [project-name]

Arguments:
  project-name                 Name of the project directory (optional for existing projects)

Options:
  --next                       Initialize with Next.js (App Router)
  --vite                       Initialize with Vite + React
  --useSrc                     Use `src/` directory structure (default: true)
  --color <color>              Set brand/primary color (e.g. violet-blue, amber, emerald, red)
  --font <font>                Set default font (e.g. inter, geist, roboto, manrope)
  --style <style>              Set style theme: 'default' | 'sera'
  --preset <code>              Initialize from a preset code
  --icon-library <library>     Icon library: 'lucide' (default) | 'hugeicons'
  -s, --skipPrompts            Skip interactive confirmation prompts
  -d, --defaultConfigurations  Use default configurations without prompting
  -c, --cwd <cwd>              Working directory (default: process.cwd())
  -h, --help                   Display command help
```

### `add` Command Reference

The `add` command downloads component source files, resolves recursive dependencies (e.g., dialog needing button/icon), configures component assets (for blocks), and places files into the paths configured in `components.json`.

```bash
Usage: radianui add [options] [components...]

Arguments:
  components...                Names of components, animated widgets, or blocks to add

Options:
  -y, --yes                    Skip confirmation prompts
  -a, --all                    Install all available registry components
  -o, --overwrite              Overwrite existing files if already present
  -c, --cwd <cwd>              Working directory (default: process.cwd())
  -h, --help                   Display command help
```

**Common CLI Examples:**

```bash
# Initialize Next.js project with custom color
npx radianui@latest init my-app --next --color emerald --font geist

# Add specific UI components
npx radianui@latest add button dialog dropdown-menu card

# Add animated components
npx radianui@latest add border-beam animated-list

# Add blocks (e.g., auth or sidebar)
npx radianui@latest add signin sidebar-floating

# Overwrite existing components during update
npx radianui@latest add button --overwrite
```

---

## 2. Configuration (`components.json`)

The `components.json` file in the root of the project controls how RadianUI CLI resolves paths, aliases, and project settings.

### Schema Structure

```json
{
	"$schema": "https://radianui.com/schema.json",
	"aliases": {
		"components": "@/components",
		"utils": "@/lib/utils",
		"ui": "@/components/ui",
		"animated": "@/components/animated",
		"lib": "@/lib",
		"hooks": "@/hooks"
	},
	"hasSrcDir": true
}
```

### Path Aliases

| Alias Key    | Default Path            | Purpose                                                         |
| :----------- | :---------------------- | :-------------------------------------------------------------- |
| `components` | `@/components`          | Base directory for custom and composite components              |
| `ui`         | `@/components/ui`       | Destination for atomic RadianUI primitives                      |
| `animated`   | `@/components/animated` | Destination for motion & interactive visual components          |
| `utils`      | `@/lib/utils`           | Location of `cn` class merging helper function                  |
| `lib`        | `@/lib`                 | General utility and library code                                |
| `hooks`      | `@/hooks`               | React custom hooks used by components (e.g., `use-media-query`) |

---

## 3. UI Components Library

RadianUI includes 50+ core UI components designed for high accessibility, keyboard navigation, and theme customization.

### Core Primitives & Components

- **Layout & Structure**: `aspect-ratio`, `card`, `divider`, `resizable`, `scroll-area`, `sidebar`, `table`
- **Navigation**: `breadcrumb`, `menubar`, `navigation-menu`, `pagination`, `stepper`, `tabs`
- **Forms & Inputs**:
  - `button`, `checkbox`, `currency-input`, `date-picker`, `file-upload`, `form`
  - `input`, `label`, `otp-field`, `phone-input`, `radio-group`, `select`, `slider`, `switch`, `text-area`, `toggle`, `toggle-group`
- **Overlays & Modals**: `alert-dialog`, `context-menu`, `dialog`, `drawer`, `dropdown-menu`, `hover-card`, `popover`, `tooltip`
- **Feedback & Status**: `alert`, `badge`, `banner`, `empty`, `progress`, `skeleton`, `sonner` (toast notifications), `spinner`
- **Data Display**: `accordion`, `avatar`, `calendar`, `code-area`, `command`

### Component Design Conventions

1. **Class Variance Authority (`cva`)**: Variants (e.g., `size`, `variant`, `intent`) are defined using `cva` for type-safe className composition.
2. **`cn()` Utility**: All components export with support for custom `className` override using `cn(...)` (`clsx` + `tailwind-merge`).
3. **Compound Components**: Complex components expose modular sub-components (e.g., `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`).
4. **Radix / Headless Primitives**: Complex accessible widgets wrap accessible primitive foundations.

---

## 4. Application Blocks

Blocks are pre-built, production-ready full-section layouts and templates with integrated responsive design, state handling, and asset bundling.

### Auth Blocks

- `signin`: Sign-in forms with social OAuth, email validation, remember-me toggles.
- `signup`: Multi-step and single-step registration layouts.
- `reset-email`: Password reset / recovery request pages.
- `new-password`: Password update screen with strength indicator.
- `account-verified`: Success / email confirmed verification screens.
- `email-code`: OTP 6-digit confirmation code verification screen.

### Sidebar Layout Blocks

- `sidebar-floating`: Floating rounded desktop sidebar with collapsible states.
- `sidebar-inset`: Inset dashboard layout with pinned header and sidebar.
- `sidebar-dark`: High-contrast dark sidebar with nested navigation groups.
- `sidebar-offcanvas`: Slide-out mobile and compact tablet drawer sidebar.
- `sidebar-rail`: Slim icon-only rail expanding on hover or click.
- `sidebar-resize`: Draggable resizable width sidebar.
- `sidebar-doc`: Multi-tier documentation sidebar with active link tracking.

### Dashboard Previews (`preview-01` to `preview-04`)

- Complete metric cards, analytics graphs, activity feeds, and data tables.

---

## 5. Design System & Global Styles (`globals.css`)

RadianUI uses **Tailwind CSS v4** with CSS variables and the `@theme` directive. Because design tokens, color palettes, and themes are project-dependent and evolve over time, **never assume or hardcode static color or token names**.

### Discovering Project Design Tokens
Before creating or editing UI components, **always read the project's global stylesheet** (e.g., `app/globals.css`, `src/index.css`, or `utility.css`):
1. **Inspect `@theme` & CSS Variables**: Read the stylesheet to discover currently declared colors, surface tokens, fills, borders, and typography variables.
2. **Use Project-Defined Semantic Classes**: Use Tailwind utility classes that map directly to the CSS variables defined in the project's `@theme` block.
3. **Check Dark Mode Configuration**: Observe the dark mode setup (such as `@custom-variant dark`) and dark mode token mappings in the stylesheet.

---

## 6. Recommended Workflow for Coding with RadianUI

When implementing user interfaces using RadianUI:

1. **Check `components.json`**: Inspect aliases and project configuration to locate where `ui`, `components`, `utils`, `lib`, and `hooks` reside.
2. **Inspect Global Styles**: Read the project's `globals.css` / `utility.css` to verify available theme variables, colors, and typography tokens.
3. **Add Primitives**: Use `npx radianui add <component>` to scaffold required UI components or blocks.
4. **Use Utility Functions**: Combine classNames using `cn(...)` from `@/lib/utils`.
5. **Apply Discovered Semantic Tokens**: Use the semantic utility classes found in the stylesheet rather than ad-hoc arbitrary values to ensure light/dark mode compatibility.

