---
name: radian
description: Comprehensive guide and reference for RadianUI, including the Radian CLI tools (init, add, add-asset, search, info), components.json configuration, 50+ UI components, application blocks, OKLCH design tokens, theme system, and utility.css / globals.css setup for Next.js and Vite.
allowed-tools: Bash(npx radianui@latest *), Bash(pnpm dlx radianui@latest *), Bash(bunx --bun radianui@latest *), Bash(yarn radianui@latest *)
---

# RadianUI

RadianUI is an accessible, customizable component library and design system built with Tailwind CSS v4, OKLCH color palettes, React, and modern TypeScript. It provides a CLI for scaffolding projects, adding components, blocks, and static assets directly to your codebase.

---

## LLMs.txt

The llms.txt for RadianUI is available here: https://radianui.com/llms.txt

## Core Directive: Always Use RadianUI Components Over Bare HTML

**When building or updating user interfaces, forms, dialogs, cards, navigation, or pages, NEVER use bare HTML elements (`<button>`, `<input>`, `<select>`, `<textarea>`, `<dialog>`, `<table>`, etc.).**

Always use RadianUI components:

1. **Check First**: Look in `@/components/ui/` (or your configured `ui` alias in `components.json`) to see if the component is already present.
2. **Auto-Add Missing Components**: If a required RadianUI component is not yet in the project, immediately install it using `npx radianui@latest add <component>`.
3. **Import & Use**: Always import and use the RadianUI component rather than writing native HTML elements.

### HTML Element to RadianUI Component Mapping

| Bare HTML Element (DO NOT USE)         | RadianUI Component (ALWAYS USE)                          | CLI Add Command                                     | Import Path                     |
| :------------------------------------- | :------------------------------------------------------- | :-------------------------------------------------- | :------------------------------ |
| `<button>`                             | `Button`                                                 | `npx radianui@latest add button`                    | `@/components/ui/button`        |
| `<input type="text\|email\|password">` | `Input`                                                  | `npx radianui@latest add input`                     | `@/components/ui/input`         |
| `<textarea>`                           | `Textarea`                                               | `npx radianui@latest add text-area`                 | `@/components/ui/text-area`     |
| `<select>`                             | `Select`, `SelectTrigger`, `SelectContent`, `SelectItem` | `npx radianui@latest add select`                    | `@/components/ui/select`        |
| `<input type="checkbox">`              | `Checkbox`                                               | `npx radianui@latest add checkbox`                  | `@/components/ui/checkbox`      |
| `<input type="radio">`                 | `RadioGroup`, `RadioGroupItem`                           | `npx radianui@latest add radio-group`               | `@/components/ui/radio-group`   |
| `<label>`                              | `Label`                                                  | `npx radianui@latest add label`                     | `@/components/ui/label`         |
| `<dialog>` / modal                     | `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle` | `npx radianui@latest add dialog`                    | `@/components/ui/dialog`        |
| `<table>`, `<tr>`, `<td>`              | `Table`, `TableHeader`, `TableRow`, `TableCell`          | `npx radianui@latest add table`                     | `@/components/ui/table`         |
| card / container `<div>`               | `Card`, `CardHeader`, `CardTitle`, `CardContent`         | `npx radianui@latest add card`                      | `@/components/ui/card`          |
| banner / callout `<div>`               | `Alert`, `AlertTitle`, `AlertDescription`                | `npx radianui@latest add alert`                     | `@/components/ui/alert`         |
| badge / chip / tag                     | `Badge`                                                  | `npx radianui@latest add badge`                     | `@/components/ui/badge`         |
| toggle switch                          | `Switch`                                                 | `npx radianui@latest add switch`                    | `@/components/ui/switch`        |
| avatar / user photo                    | `Avatar`, `AvatarImage`, `AvatarFallback`                | `npx radianui@latest add avatar`                    | `@/components/ui/avatar`        |
| tabs / tab navigation                  | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`         | `npx radianui@latest add tabs`                      | `@/components/ui/tabs`          |
| tooltip                                | `Tooltip`, `TooltipTrigger`, `TooltipContent`            | `npx radianui@latest add tooltip`                   | `@/components/ui/tooltip`       |
| dropdown / menu                        | `DropdownMenu`, `DropdownMenuTrigger`, etc.              | `npx radianui@latest add dropdown-menu`             | `@/components/ui/dropdown-menu` |
| loading / progress                     | `Spinner` / `Skeleton` / `Progress`                      | `npx radianui@latest add spinner skeleton progress` | `@/components/ui/...`           |
| accordion / collapsible                | `Accordion`, `AccordionItem`, `AccordionTrigger`         | `npx radianui@latest add accordion`                 | `@/components/ui/accordion`     |

### Automatic Icon Sizing & Coloring in Button and Badge

**DO NOT pass `size` (e.g. `size={16}`, `size-4`, `w-4 h-4`) or explicit color classes (`text-white`, `text-primary`) to icons rendered inside `Button` or `Badge`.**

Both `Button` and `Badge` already configure icon dimensions via nested SVG selectors (`[&>svg]:size-*`, `[&_svg]:size-*`) matching their `size` variant, and inherit foreground colors automatically via `currentColor`:

```tsx
// ❌ INCORRECT: Redundant size and color overrides
<Button size="36">
  <Plus className="size-4 text-white" />
  <span>Add Item</span>
</Button>

<Badge size="24">
  <Check size={14} className="text-emerald" />
  <span>Verified</span>
</Badge>

// ✅ CORRECT: Button and Badge handle icon dimensions and colors automatically
<Button size="36">
  <Plus />
  <span>Add Item</span>
</Button>

<Badge size="24">
  <Check />
  <span>Verified</span>
</Badge>
```

---

## 1. RadianUI CLI Tooling

The CLI (`radianui`) allows developers to initialize projects, add components, blocks, or static assets, search registry items, and inspect project configuration.

### Installation & Execution

```bash
# Initialize a new or existing project
npx radianui@latest init [project-name] [options]

# Add components or blocks
npx radianui@latest add [components...] [options]

# Add static assets (e.g. country flags, logos, icons)
npx radianui@latest add-asset [assetType] [assets...] [options]

# Search registry items (components and blocks)
npx radianui@latest search <query> [options]

# Inspect project information and installed components
npx radianui@latest info [options]
```

### `init` Command Reference

The `init` command sets up `components.json`, installs core dependencies (`tailwindcss`, `tw-animate-css`, `class-variance-authority`, `clsx`, `tailwind-merge`, and icon libraries), configures global CSS with OKLCH theme variables, and configures path aliases.

- **Empty directory**: Scaffolds a new Next.js or Vite React project from scratch.
- **Existing project**: Detects framework and configures RadianUI without re-scaffolding.

```bash
Usage: radianui@latest init [options] [project-name]

Arguments:
  project-name                 Name of the project directory (optional for existing projects)

Options:
  --next                       Initialize with Next.js (App Router)
  --vite                       Initialize with Vite + React
  --useSrc                     Use `src/` directory structure (default: true)
  --color <color>              Set brand/primary color (default: violet-blue)
  --font <font>                Set default typography (default: inter)
  --style <style>              Set component style: 'default' | 'sera' (default: default)
  --icon-library <library>     Set icon library: 'lucide' | 'hugeicons' (default: lucide)
  --preset <code>              Generate project from a preset configuration code
  -s, --skipPrompts            Skip interactive confirmation prompts
  -d, --defaultConfigurations  Use default configurations without prompting
  -c, --cwd <cwd>              Working directory (default: process.cwd())
  -h, --help                   Display command help
```

**Available Colors (17 OKLCH colors):**
`red`, `orange`, `amber`, `yellow`, `neon`, `green`, `emerald`, `teal`, `cyan`, `light-blue`, `blue`, `violet-blue` (default), `purple`, `dark-orchid`, `fuchsia`, `magenta`, `rose`.

**Available Fonts (12 Google Fonts):**
`inter` (default), `roboto`, `geist`, `dm-sans`, `open-sans`, `rubik`, `lato`, `manrope`, `raleway`, `work-sans`, `ibm-plex-sans`, `figtree`.

---

### `add` Command Reference

The `add` command downloads component source files, resolves recursive dependencies (e.g., dialog needing button/icon), downloads required assets (for blocks), and places files into the paths configured in `components.json`.

```bash
Usage: radianui@latest add [options] [components...]

Arguments:
  components...                Names of components or blocks to add

Options:
  -y, --yes                    Skip confirmation prompts
  -a, --all                    Install all available registry components
  -o, --overwrite              Overwrite existing files if already present
  -c, --cwd <cwd>              Working directory (default: process.cwd())
  -h, --help                   Display command help
```

- If no components are specified, an interactive multi-select menu appears.
- If run in a folder without a project, it prompts to run `init` first.

---

### `add-asset` Command Reference

The `add-asset` (alias `asset`) command downloads static registry assets (such as country flags, brand logos, or file icons) directly into your project's static asset directory (e.g. `public/assets/flags/`):

```bash
Usage: radianui@latest add-asset [options] [assetType] [assets...]

Arguments:
  assetType                    Type of asset (e.g. 'flag') or identifier ('flag:US')
  assets...                    Specific asset names, country codes, or identifiers to add

Options:
  -a, --all                    Install all available assets for the selected type
  -y, --yes                    Skip confirmation prompts
  -o, --overwrite              Overwrite existing files if they exist
  -c, --cwd <cwd>              Working directory (default: process.cwd())
  -h, --help                   Display command help
```

**Examples:**
```bash
# Add specific country flags
npx radianui@latest add-asset flag US GB NP

# Add using prefix syntax
npx radianui@latest add-asset flag:US

# Download all flags
npx radianui@latest add-asset flag --all

# Interactive prompt to choose asset type and items
npx radianui@latest add-asset
```

---

### `search` Command Reference

The `search` command performs fuzzy searching across all components and blocks by name and description:

```bash
Usage: radianui@latest search [options] <query>

Arguments:
  query                        Search term or keyword

Options:
  -l, --limit <limit>          Number of results to show (default: 8)
  --filter <type>              Filter by type: 'ui' | 'block'
  -h, --help                   Display command help
```

**Examples:**
```bash
# Search across all components and blocks
npx radianui@latest search modal

# Search only full-section blocks
npx radianui@latest search sidebar --filter block

# Limit results
npx radianui@latest search input --limit 5
```

---

### `info` Command Reference

The `info` command inspects the current project and outputs details about the framework, package manager, Tailwind version, style, icon library, configured aliases, and all currently installed RadianUI components:

```bash
Usage: radianui@latest info [options]

Options:
  --json                       Output project information as JSON
  -c, --cwd <cwd>              Working directory (default: process.cwd())
  -h, --help                   Display command help
```

**Agent Tip:** Run `npx radianui@latest info --json` to quickly inspect which RadianUI components, framework, and styles are installed in a repository before creating or modifying UI files.

---

## 2. Configuration (`components.json`)

The `components.json` file in the project root controls how RadianUI CLI resolves paths, aliases, and project settings.

### Schema Structure

```json
{
	"$schema": "https://radianui.com/schema.json",
	"style": "default",
	"iconLibrary": "lucide",
	"hasSrcDir": true,
	"aliases": {
		"components": "@/components",
		"utils": "@/lib/utils",
		"ui": "@/components/ui",
		"lib": "@/lib",
		"hooks": "@/hooks"
	}
}
```

### Configuration Fields

| Field         | Type     | Choices / Format       | Description                                        |
| :------------ | :------- | :--------------------- | :------------------------------------------------- |
| `style`       | string   | `"default"` \| `"sera"`| Visual styling and design aesthetic                |
| `iconLibrary` | string   | `"lucide"` \| `"hugeicons"` | Icon set used across components               |
| `hasSrcDir`   | boolean  | `true` \| `false`      | Whether the project uses a `src/` directory        |
| `aliases`     | object   | Key-value map          | Path aliases mapped in `tsconfig.json`             |

### Path Aliases

| Alias Key    | Default Path      | Purpose                                            |
| :----------- | :---------------- | :------------------------------------------------- |
| `components` | `@/components`    | Base directory for custom and composite components |
| `ui`         | `@/components/ui` | Destination for atomic RadianUI primitives         |
| `utils`      | `@/lib/utils`     | Location of `cn` class merging helper function     |
| `lib`        | `@/lib`           | General utility and library code                   |
| `hooks`      | `@/hooks`         | React custom hooks used by components              |

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
5. **Icon Handling in `Button` & `Badge`**: Never specify `size` or color on icons inside `Button` and `Badge`. The container styles automatically scale SVGs (`[&>svg]:size-*`, `[&_svg]:size-*`) and set the proper contrast colors.

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

---

## 5. Design System & Radian OKLCH Color Palette (`utility.css` & `globals.css`)

### STRICT RULE: DO NOT USE TAILWIND DEFAULT COLORS

**Never use default Tailwind numbered color classes** (e.g. `bg-red-500`, `text-blue-600`, `bg-emerald-400`, `text-slate-500`, `border-zinc-200`, `bg-gray-100`, etc.). RadianUI defines its own dedicated, fine-tuned OKLCH color palette in `utility.css` and semantic design tokens in `globals.css`.

| NEVER Use (Default Tailwind Colors)  | ALWAYS Use (Radian's Color Palette)       |
| :----------------------------------- | :---------------------------------------- |
| `bg-red-500`, `bg-red-600`           | `bg-red`, `hover:bg-red-hover`            |
| `bg-red-50`, `bg-red-100`            | `bg-red-accent`                           |
| `text-red-600`, `text-red-700`       | `text-red-text`                           |
| `text-white` (on colored button)     | `text-red-fg` / `text-primary-fg`         |
| `border-red-300`, `border-red-500`   | `border-red-border`                       |
| `ring-red-400`, `focus:ring-red-500` | `focus:ring-red-focus`                    |
| `bg-emerald-500`, `bg-green-600`     | `bg-emerald`, `bg-success`                |
| `bg-blue-600`, `text-blue-500`       | `bg-blue`, `text-blue-text`, `bg-primary` |
| `bg-zinc-900`, `bg-gray-900`         | `bg-surface`, `bg-neutral`                |
| `text-zinc-500`, `text-gray-400`     | `text-muted`, `text-neutral-text`         |
| `border-zinc-200`, `border-gray-200` | `border-border`, `border-neutral-border`  |

### Discovering Color Tokens from CSS Files

**Always inspect the project's CSS files (`utility.css` and `globals.css`)** to discover available Radian OKLCH colors, token variants (such as base, `-accent`, `-focus`, `-border`, `-hover`, `-text`, `-fg`), and semantic variables:

- **`utility.css`**: Contains Radian's custom OKLCH color palette definitions, utility classes, and light/dark modes.
- **`globals.css`**: Contains the `@theme` definitions, semantic aliases (e.g., `primary`, `success`, `error`, `warning`, `info`), and surface/background design tokens.

---

## 6. Recommended Workflow for Coding with RadianUI

When implementing user interfaces using RadianUI:

1. **Check `components.json` or run `npx radianui info`**: Inspect aliases, style, icon library, and installed components.
2. **Prioritize RadianUI Components**: When building UI features, **always use RadianUI components instead of bare HTML elements** (`<button>`, `<input>`, `<select>`, `<textarea>`, `<dialog>`, `<table>`, etc.). If a component is missing, run `npx radianui@latest add <component>`.
3. **Use `add-asset` for Static Assets**: If flags or static SVGs are required, download them via `npx radianui@latest add-asset flag <ISO-CODE>`.
4. **Inspect Global Styles (`utility.css` & `globals.css`)**: Verify the declared OKLCH color variables and semantic tokens.
5. **Strictly Use Radian's Color Palette**: NEVER use default Tailwind colors (`-50`, `-100`, `-500`, `-900`). Always use Radian's tokenized classes (`bg-primary`, `bg-red-accent`, `text-red-text`, `text-success-fg`, `border-border`, etc.).
6. **Use Utility Functions**: Combine classNames using `cn(...)` from `@/lib/utils`.
7. **Do Not Style Icons in `Button` & `Badge`**: Never pass explicit size or color classes to icons inside `Button` or `Badge`; those components handle icon sizing and colors automatically.
8. **Ensure Dark Mode Compatibility**: Radian's OKLCH color tokens and semantic variables automatically handle dark mode transitions under `.dark`.
