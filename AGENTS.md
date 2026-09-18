# Repository Development Rules & Guidelines

## 1. Navigation Menu Component Rule
- **Rule**: Whenever there is any navbar, always use the registry NavigationMenu component located at `apps/website/src/registry/ui/navigation-menu.tsx` (import as `@/registry/ui/navigation-menu`).
- **Do not** build raw un-styled navigation lists or uncoordinated custom navbar dropdowns when standard navigation menu functionality is required.
- **Example Usage**:
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

## 2. Heading Typography Utilities Rule
- **Rule**: When using heading utility classes (`heading-1`, `heading-2`, `heading-3`, `heading-4`, `heading-5`, `heading-6`), **do NOT add extra or redundant class names** for font size (`text-*`), line height (`leading-*`), font weight (`font-normal`, `font-semibold`), or letter spacing (`tracking-*`).
- All necessary typography styles (font family `font-heading`, responsive font size, responsive line height, letter spacing, and font weight) are already declared in `src/css/globals.css`:
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
- **Example of Correct Usage**:
  ```tsx
  <h1 className="heading-1 max-w-4xl text-center font-serif">
    Turn Your AI Product Into a Website That Sells
  </h1>
  ```
  Only include layout classes (`max-w-*`), alignment (`text-center`), font overrides if specifically needed (`font-serif`), or color classes (`text-white`, `text-fg`). Never duplicate sizing or weight classes.

## 3. Sidebar Component & Consistency Rule
- **Rule**: Whenever implementing a sidebar or sidebar navigation, always use the canonical Radian OS `Sidebar` components (`Sidebar`, `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarGroup`, `SidebarGroupContent`, `SidebarGroupLabel`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `SidebarMenuBadge`) from `@/styles/default/ui/sidebar` (or `@/registry/ui/sidebar` / `@/components/ui/sidebar`).
- **Do not add custom `hover:bg-...` overrides or ad-hoc background classes to `SidebarMenuButton`**. The component's built-in styles already handle hover (`hover:bg-sidebar-accent hover:text-sidebar-accent-fg`) and active states (`isActive` -> `data-[active=true]:bg-sidebar-accent!`). Overriding with classes like `hover:bg-elevation-level1/60` breaks hover functionality because `elevation-level1` is pure white.
- **Never use `text-fg-muted`**: That token does NOT exist in the design system. Always use `text-sidebar-fg` inside the sidebar, or `text-fg-secondary` / `text-fg-tertiary` for secondary/tertiary text.
- **Icon Size & Typography Consistency**: Keep icon sizes and typography strictly uniform across all menu items (e.g. `size-4` for icons inside `size="32"` buttons, `size-3.5` for chevrons/actions, `text-sm font-medium` or `text-xs` for text). Never mix arbitrary icon sizes across rows.
- **Badges/Counts**: Always use `<SidebarMenuBadge>` as a sibling inside `<SidebarMenuItem>` (or inside `<SidebarMenuButton asChild>`) instead of custom `span` elements inside ad-hoc flex divs.
