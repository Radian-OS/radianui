# Components and Typography Guidelines

## 1. Navigation Menu Component
Whenever implementing a navbar, always use the registry NavigationMenu component located at `apps/website/src/registry/ui/navigation-menu.tsx` (`@/registry/ui/navigation-menu`).
Do not use unstyled navigation markup or ad-hoc nav dropdown implementations when a navigation menu is required.

## 2. Heading Typography Utilities
When using `heading-1`, `heading-2`, `heading-3`, `heading-4`, etc., do not add redundant utility classes for font size, line height, font weight, or letter spacing (`text-*`, `leading-*`, `font-normal`, `font-semibold`, `tracking-*`).
The responsive sizing and typography are already defined in `globals.css` via `@utility heading-*`.
Only include layout, alignment, color, or explicit font family overrides (e.g. `max-w-4xl text-center font-serif text-white`).
