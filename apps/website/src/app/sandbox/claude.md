# CLAUDE.md

## Code Generation Rules

- **Figma Designs**: When implementing a Figma design, always create a new dedicated folder for it within the existing project (e.g., a new route folder under `src/app/`). Never add Figma design pages into existing folders.
- **Forms**: Always use the `<Form>` component (from the project's components/ui folder) instead of the raw HTML `<form>` tag.
- **Form Validation**: Every generated form MUST include validation. Use `zod` for schema definition and `react-hook-form` with `@hookform/resolvers/zod` for integration. Define a Zod schema for all form fields with appropriate rules (e.g. `z.string().min(1, "Required")`, `z.string().email()`, `z.string().min(8)` for passwords, etc.). Display inline error messages below each field. Never generate a form without validation.
- **Icons**: Always use icons from `lucide-react`. Never generate inline SVG code. Import the appropriate icon component from `lucide-react` (e.g. `import { Search, Menu, X } from "lucide-react"`).
- **Brand/Logo Icons (IMPORTANT)**: Never generate code with `<svg>` tag. Always use an `<Image>` (Next.js) or `<img>` tag referencing the icon from a public source. Use Google's favicon service (`https://www.google.com/s2/favicons?sz=32&domain=<domain>`) or other public CDN URLs (e.g. `https://authjs.dev/img/providers/<provider>.svg`, `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/<name>/<name>-original.svg`). This rule overrides all other icon rules for brand logos.
- **Images (CRITICAL — PLACEHOLDER RULE)**: Whenever an image is used in the given design (photos, graphics, banners, illustrations, mockups, etc.), rather than making whole components or sourcing external images, just put the placeholder image `/sandbox/placeholder.svg` (located at `apps/website/public/sandbox/placeholder.svg`) simply. In Next.js projects, always use the `<Image>` component from `next/image` (e.g. `<Image src="/sandbox/placeholder.svg" alt="Placeholder" width={800} height={500} />`) instead of the raw HTML `<img>` tag. For non-Next.js projects, use an `<img>` tag. Never use localhost URLs (e.g. `http://localhost:*/assets/*`).
- **Links and Link Buttons (CRITICAL — NO UNDERLINE RULE)**: In Next.js projects, always use the `<Link>` component from `next/link` instead of the raw HTML `<a>` tag for internal navigation. NEVER add `underline` or `hover:underline` to `<Link>`, `<a>`, or `<Button asChild><Link>...</Link></Button>` elements. Keep links, button links, card links, and navigation items completely clean without any text decoration underlines.
- **Responsive Design**: All components must be responsive. Use Tailwind CSS responsive breakpoint prefixes (`sm:`, `md:`, `lg:`, `xl:`) to adapt layouts across screen sizes. Design mobile-first, then layer on styles for larger breakpoints.
- **Headings**: Always use the corresponding heading utility class defined in the global CSS (`heading-1` through `heading-6`) for heading elements. Match the utility to the heading level (e.g. `<h1 className="heading-1">`, `<h2 className="heading-2">`, etc.). When you add heading utilities, **do NOT add other extra class names** for font size (`text-*`), line height (`leading-*`), font weight (`font-normal`, `font-semibold`), or letter spacing (`tracking-*`). All necessary typography styles (font family `font-heading`, responsive font sizes across breakpoints, line heights, letter spacing, and font weight) are already declared in the global CSS (`globals.css`):
  ```css
  /* Heading 1 */
  @utility heading-1 {
  	@apply font-heading text-[2.25rem] font-semibold leading-[2.75rem];
  	letter-spacing: -1px;

  	@media (width >=theme(--breakpoint-sm)) {
  		font-size: 3rem;
  		line-height: 3.5rem;
  	}

  	@media (width >=theme(--breakpoint-lg)) {
  		font-size: 4rem;
  		line-height: 4.5rem;
  	}
  }
  ```
  Only include layout classes (`max-w-*`), alignment (`text-center`), font overrides if specifically needed (`font-serif`), or color classes (`text-white`, `text-fg`). Example: `<h1 className="heading-1 max-w-4xl text-center font-serif">`. Never duplicate sizing or weight classes.
- **File Separation**: Each component and page must be in its own separate file. Never define multiple components or pages in a single file. Keep one component per file and import as needed.
- **Button Colors (CRITICAL — NEVER SKIP)**: Every single `<Button>` component MUST have an explicit `color` prop. No exceptions — this applies to ALL variants including `outline`, `ghost`, `link`, and `solid`. A `<Button>` without a `color` prop is a bug. Inspect the Figma design and pick the correct color. Never default to `primary`. Available colors: `primary`, `neutral`, `error`, `success`, `info`, `warning`. When in doubt, use `neutral` for outline/ghost buttons and `primary` for solid/CTA buttons.
- **Colors (CRITICAL — NEVER SKIP)**: Always use the global CSS color variables defined in the project's global stylesheet (e.g. `globals.css`). Never use hardcoded color values such as raw hex (`#ff0000`), `rgb()`, `hsl()`, or Tailwind arbitrary values (`text-[#abc]`, `bg-[rgb(...)]`). Always reference the project's CSS custom properties (e.g. `var(--color-primary)`, `var(--color-background)`) or their corresponding Tailwind utility classes (e.g. `text-primary`, `bg-background`, `border-muted`). If a color is not available in the global theme, ask before introducing a new one — do not invent custom colors.
- **Complex Graphics/Mockups (IMPORTANT)**: If in the design link/reference there is a complex graphic, mockup, chart, dashboard preview, or similar image asset, do not try to recreate those complex elements or whole components from scratch as code. Instead, rather than making the whole component, simply put the placeholder image `/sandbox/placeholder.svg` (located at `public/sandbox/placeholder.svg`) using Next.js `<Image src="/sandbox/placeholder.svg" alt="..." width={...} height={...} />` to keep the implementation simple and clean.
- **Repetitive Elements**: When multiple similar elements are repeated (e.g. a list of `<SelectItem>`, multiple `<OTPInput />`, repeated `<Card>` components, etc.), always define the data in an array and use `.map()` to render them. Never manually duplicate JSX. For example, use `countries.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)` instead of writing each `<SelectItem>` by hand, or `Array.from({ length: 6 }).map((_, i) => <OTPInput key={i} />)` instead of repeating `<OTPInput />` six times.  
- **Navigation Menu / Navbar (CRITICAL)**: Whenever there is any navbar, always use the registry `NavigationMenu` component located at `apps/website/src/registry/ui/navigation-menu.tsx` (import as `@/registry/ui/navigation-menu`). Do not use raw un-styled navigation lists or uncoordinated custom navbar dropdowns when standard navigation menu functionality is required. Example usage:
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
- **Sidebar Component & Consistency Rule (CRITICAL)**:
  - Whenever implementing a sidebar or sidebar navigation, always use the canonical Radian OS `Sidebar` components (`Sidebar`, `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarGroup`, `SidebarGroupContent`, `SidebarGroupLabel`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `SidebarMenuBadge`) from `@/styles/default/ui/sidebar` (or `@/registry/ui/sidebar` / `@/components/ui/sidebar`).
  - **Never add custom `hover:bg-...` overrides or ad-hoc background classes to `SidebarMenuButton`**. The component's built-in styles already handle hover (`hover:bg-sidebar-accent hover:text-sidebar-accent-fg`) and active states (`isActive` -> `data-[active=true]:bg-sidebar-accent!`). Overriding with classes like `hover:bg-elevation-level1/60` breaks hover functionality because `elevation-level1` is pure white.
  - **Never use `text-fg-muted`**: That token does NOT exist in the design system. Always use `text-sidebar-fg` inside the sidebar, or `text-fg-secondary` / `text-fg-tertiary` for secondary/tertiary text.
  - **Icon Size & Typography Consistency**: Keep icon sizes and typography strictly uniform across all menu items (e.g. `size-4` for icons inside `size="32"` buttons, `size-3.5` for chevrons/actions, `text-sm font-medium` or `text-xs` for text). Never mix arbitrary icon sizes across rows.
  - **Badges/Counts**: Always use `<SidebarMenuBadge>` as a sibling inside `<SidebarMenuItem>` (or inside `<SidebarMenuButton asChild>`) instead of custom `span` elements inside ad-hoc flex divs.
  - Example usage:
    ```tsx
    <SidebarGroup>
      <SidebarGroupLabel className="uppercase">Section Title</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.label}>
            <SidebarMenuButton
              size="32"
              isActive={item.isActive}
              tooltip={item.label}
              onClick={() => setActive(item.id)}>
              <item.icon className="size-4" />
              <span>{item.label}</span>
            </SidebarMenuButton>
            {item.badge && (
              <SidebarMenuBadge variant="outline" color="neutral" className="bg-bg text-fg-tertiary">
                {item.badge}
              </SidebarMenuBadge>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
    ```
- **Card Component Rule (CRITICAL)**:
  - Whenever implementing cards or card containers, always use the canonical Radian OS `Card` components (`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`) from `@/styles/default/ui/card` (or `@/registry/ui/card`).
  - Do NOT build custom raw `<div>` card wrappers when standard Card component functionality is required.
  - When custom padding or banner image flushing is needed (e.g. top banner artwork), override padding/gap cleanly (e.g. `<Card className="p-0 gap-0 overflow-hidden">`) and use `<CardContent>` and `<CardFooter>` for internal spacing.
  - Example usage:
    ```tsx
    import {
    	Card,
    	CardHeader,
    	CardTitle,
    	CardDescription,
    	CardContent,
    	CardFooter,
    } from "@/styles/default/ui/card"

    <Card className="overflow-hidden">
    	<CardContent className="p-6">
    		<CardTitle>Card Title</CardTitle>
    		<CardDescription>Card description text.</CardDescription>
    	</CardContent>
    	<CardFooter className="border-t p-6">
    		Footer content
    	</CardFooter>
    </Card>
    ```
- **Avatar Component Rule (CRITICAL)**:
  - Whenever rendering user avatars, profile pictures, or author thumbnails, always use the canonical Radian OS `Avatar` components (`Avatar`, `AvatarImage`, `AvatarFallback`, `AvatarIndicator`, `AvatarStatus`) from `@/styles/default/ui/avatar` (or `@/registry/ui/avatar`).
  - Never construct custom raw `<div>` or standalone `<img>` tags for user avatars.
  - Always specify standard `size` (`"16"`, `"20"`, `"24"`, `"32"`, `"36"`, `"40"`, `"48"`, `"64"`, `"80"`) and `rounded` (`"circle"` or `"square"`).
  - Always include an `<AvatarFallback>` component (displaying user initials or icon) inside `<Avatar>` for graceful loading and error states.
  - In Next.js environments, use `/sandbox/placeholder.svg` or public image sources for `<AvatarImage src={...} />`.
  - Example usage:
    ```tsx
    import {
    	Avatar,
    	AvatarImage,
    	AvatarFallback,
    } from "@/styles/default/ui/avatar"

    <Avatar size="32" rounded="circle" className="border-border border">
    	<AvatarImage src={author.avatarUrl || "/sandbox/placeholder.svg"} alt={author.name} />
    	<AvatarFallback className="text-xs font-semibold">{initials}</AvatarFallback>
    </Avatar>
    ```

