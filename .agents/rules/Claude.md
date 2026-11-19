---
trigger: always_on
---

# CLAUDE.md

IMPORTANT: ALWAYS USE ‘simran’ branch in git/github

## Code Generation Rules

• **Git Branch (CRITICAL)**: Always verify and operate on the `simran` branch in Git / GitHub unless specifically requested otherwise.

• **Forms**: Always use the `<Form>` component (from the project’s `components/ui` folder) instead of the raw HTML `<form>` tag.

• **Form Validation**: Every generated form MUST include validation. Use `zod` for schema definition and `react-hook-form` with `@hookform/resolvers/zod` for integration. Define a Zod schema for all form fields with appropriate rules (e.g. `z.string().min(1, "Required")`, `z.string().email()`, `z.string().min(8)` for passwords). Display inline error messages below each field. Never generate a form without validation.

• **Icons**: Always use icons from `lucide-react`. Never generate inline SVG code. Import the appropriate icon component from `lucide-react` (e.g. `import { Search, Menu, X } from "lucide-react"`).

• **Brand & Company Logos (CRITICAL — RADIAN CDN RULE)**: Never generate inline `<svg>` code or arbitrary third-party SVGs for company logos. Always reference brand logos from the Radian resources CDN:
  - Base pattern: `https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/{theme}/{variant}/{category}/{icon|wordmark}/{name}.svg`
  - Themes: `dark` and `light` (support both with `dark:hidden` for light assets and `hidden dark:block` for dark assets)
  - Variants: `colored` and `neutral`
  - Types:
    - `/icon/{name}.svg`: Icon glyph only
    - `/wordmark/{name}.svg`: Official company wordmark with integrated brand typography and name
  - Examples:
    - Dark Colored Wordmark: `https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/ai/wordmark/claude.svg`
    - Dark Neutral Wordmark: `https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/ai/wordmark/claude.svg`
    - Light Neutral Wordmark: `https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/neutral/ai/wordmark/claude.svg`
  - Fallback: If a brand is not available in the Radian CDN, fall back to Google's favicon service (`https://www.google.com/s2/favicons?sz=32&domain=<domain>`).

• **Images (CRITICAL — PLACEHOLDER RULE)**: Whenever an image is used in the given design (photos, graphics, banners, illustrations, mockups), rather than making whole components or sourcing external images, use the placeholder image `/sandbox/placeholder.svg` (located at `apps/website/public/sandbox/placeholder.svg`). In Next.js projects, always use `<Image>` from `next/image` (e.g. `<Image src="/sandbox/placeholder.svg" alt="Placeholder" width={800} height={500} />`) instead of raw HTML `<img>`. Never use localhost URLs (e.g. `http://localhost:*/assets/*`).

• **Complex Graphics / Mockups (IMPORTANT)**: If the design references a complex graphic, chart, dashboard preview, or similar image asset, do not recreate those complex elements from scratch. Simply insert `/sandbox/placeholder.svg` using Next.js `<Image>` to keep the implementation clean.

• **Links and Link Buttons (CRITICAL — NO UNDERLINE RULE)**: In Next.js projects, always use `<Link>` from `next/link` instead of the raw HTML `<a>` tag for internal navigation. NEVER add `underline` or `hover:underline` classes to `<Link>`, `<a>`, or `<Button asChild><Link>...</Link></Button>` elements. Keep links, button links, card links, and navigation items completely clean with color transitions (e.g. `hover:text-fg` or `hover:text-primary`) rather than text underlines.

• **Responsive Design**: All components must be responsive. Use Tailwind CSS responsive breakpoint prefixes (`sm:`, `md:`, `lg:`, `xl:`) to adapt layouts across screen sizes. Design mobile-first, then layer on styles for larger breakpoints.

• **Headings Typography Utilities**: Always use the corresponding heading utility class defined in global CSS (`heading-1` through `heading-6`) for heading elements. When using heading utilities, **do NOT add extra class names** for font size (`text-*`), line height (`leading-*`), font weight (`font-normal`, `font-semibold`), or letter spacing (`tracking-*`). All typography styles (font family `font-heading`, responsive font size, line height, letter spacing, font weight) are already declared in `globals.css`:
  ```tsx
  <h1 className="heading-1 max-w-4xl text-center font-serif">
    Turn Your AI Product Into a Website That Sells
  </h1>
  ```
  Only include layout (`max-w-*`), alignment (`text-center`), font overrides (`font-serif`), or color classes (`text-white`, `text-fg`).

• **File Separation**: Each component and page must be in its own separate file. Never define multiple components or pages in a single file. Keep one component per file and import as needed.

• **Button Colors (CRITICAL — NEVER SKIP)**: Every single `<Button>` component MUST have an explicit `color` prop. No exceptions — this applies to ALL variants including `outline`, `ghost`, `link`, and `solid`. A `<Button>` without a `color` prop is a bug. Available colors: `primary`, `neutral`, `error`, `success`, `info`, `warning`. When in doubt, use `color="neutral"` for outline/ghost buttons and `color="primary"` for solid/CTA buttons.

• **Colors & Design System Tokens (CRITICAL — NEVER SKIP)**: Always use the CSS color variables defined in the theme system. Never use hardcoded raw hex (`#ff0000`), `rgb()`, `hsl()`, or Tailwind arbitrary values (`text-[#abc]`). Never use `text-fg-muted`: that token does NOT exist in the design system. Always use `text-fg-secondary` or `text-fg-tertiary` for muted/subdued text.

• **Repetitive Elements**: When multiple similar elements are repeated (e.g. a list of `<SelectItem>`, multiple `<Card>` items), always define the data in an array and use `.map()` to render them. Never manually duplicate JSX.

• **Navigation Menu / Navbar (CRITICAL)**: Whenever implementing a navbar, always use the registry NavigationMenu component located at `apps/website/src/registry/ui/navigation-menu.tsx` (import as `@/registry/ui/navigation-menu`). Do not use raw un-styled navigation lists or uncoordinated custom navbar dropdowns:
  ```tsx
  import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuTrigger,
    NavigationMenuContent,
    navigationMenuTriggerStyle,
  } from "@/registry/ui/navigation-menu"
  ```

• **Sidebar Component & Consistency (CRITICAL)**:
  - Whenever implementing a sidebar or sidebar navigation, always use the canonical Radian OS `Sidebar` components (`Sidebar`, `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarGroup`, `SidebarGroupContent`, `SidebarGroupLabel`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `SidebarMenuBadge`) from `@/styles/default/ui/sidebar` (or `@/registry/ui/sidebar`).
  - **Never add custom `hover:bg-...` overrides to `SidebarMenuButton`**. Built-in styles handle hover (`hover:bg-sidebar-accent hover:text-sidebar-accent-fg`) and active states (`isActive` -> `data-[active=true]:bg-sidebar-accent!`). Overriding with `hover:bg-elevation-level1/60` breaks hover functionality.
  - **Icon Size & Typography**: Keep icon sizes and typography strictly uniform across menu items (e.g. `size-4` for icons inside `size="sm"` buttons, `size-3.5` for chevrons/actions, `text-sm font-medium` or `text-xs` for text).
  - **Badges/Counts**: Always use `<SidebarMenuBadge>` inside `<SidebarMenuItem>` (or inside `<SidebarMenuButton asChild>`).

• **Card Component Rule (CRITICAL)**:
  - Always use canonical Radian OS `Card` components (`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`) from `@/styles/default/ui/card`.
  - Do NOT build custom raw `<div>` card wrappers.
  - When custom padding or banner image flushing is needed, override padding/gap cleanly (e.g. `<Card className="p-0 gap-0 overflow-hidden">`) and use `<CardContent>` and `<CardFooter>` for internal spacing.

• **Avatar Component Rule (CRITICAL)**:
  - Always use canonical Radian OS `Avatar` components (`Avatar`, `AvatarImage`, `AvatarFallback`, `AvatarIndicator`, `AvatarStatus`) from `@/styles/default/ui/avatar`.
  - Standard sizes: `"3xs"`, `"2xs"`, `"xs"`, `"sm"`, `"md"`, `"lg"`, `"xl"`, `"2xl"`, `"3xl"` and `rounded="circle"` or `rounded="square"`.
  - Always include an `<AvatarFallback>` inside `<Avatar>`.
  - **Avatar Image Source**: Always use avatar images from the Radian OS CDN:
    `https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/{number}.png` (e.g. `1.png`, `2.png`, `8.png`). Use varying numbers for multiple avatars.
  - Example usage:
    ```tsx
    import { Avatar, AvatarImage, AvatarFallback } from "@/styles/default/ui/avatar"

    <Avatar size="sm" rounded="circle" className="border-border border">
      <AvatarImage src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/8.png" alt={author.name} />
      <AvatarFallback className="text-xs font-semibold">{initials}</AvatarFallback>
    </Avatar>
    ```

• **Animations (CRITICAL — MOTION ONLY RULE)**:
  - When implementing any animation (marquees, carousels, fades, reveals, hover effects, interactive sliding elements, entrance transitions), **always use `motion/react`** (`motion`, `useAnimationFrame`, `useMotionValue`, `AnimatePresence`).
  - **NEVER use CSS `@keyframes` or CSS utility animations** (`animate-marquee-left`, custom keyframes). Always use `motion/react` for smooth performance, hardware acceleration, pause-on-hover, and seamless infinite looping.
  ```tsx
  import { motion, useAnimationFrame, useMotionValue } from "motion/react"
  ```