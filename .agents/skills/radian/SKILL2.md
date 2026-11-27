---
name: skill2
description: Comprehensive guide and reference for RadianUI, including the Radian CLI tools (init, add, add-asset, search, info), components.json configuration, 50+ UI components, application blocks, OKLCH design tokens, theme system, and utility.css / globals.css setup for Next.js and Vite.
allowed-tools: Bash(npx radianui@latest *), Bash(pnpm dlx radianui@latest *), Bash(bunx --bun radianui@latest *), Bash(yarn radianui@latest *)
---

# IMPORTANT
Read the SKILL.md files for the initial rules and instructions. But in this file I will provide you extra blocks generation rules for the themer. 

GENERATE THE BLOCKS CODE IN ONE FILE THAT FOLLOWS THE PREVIEW ARCHITECTURE IN THE THEMER PREVIEW BLOCKS


1. Always use chart from the registry/ui component. Don’t use from recharts library directly. Don’t create charts from scratch using canvas/divs..
2. Use soft or soft alpha color from the variables for border color..
3. Always use tooltip and dropdown to add interactivity to the blocks..
4. Don’t design components or UI from scratch, use the existing components/UI..
5. Find and use components from the ‘@/components/ui’ directory if they are available cause those components changeaccording to the themer presets..
6. Don’t use HTML button use our Button, CompactButton and IconButton, you don’t need to give the icons inside buttons size.They are already handled by the button component..
7. Don’t use icons from ‘lucide-react’, use the IconSlot to make it compatible with themer..
8. Don’t try to use pixels in widths/heights/anything. Only use pixels when absolutely necessary. Otherwise use tailwind steps..
9. Don’t use pixels in fonts until its really needed. Use the tailwind font size classes..
10. Don’t use opacity modfiers as much as possible. Try to use the variables as it is. For example try to avoid ‘bg-fill1/90’, ‘text-fg-tertiary/20’, etc..
11. The code should be usable in both Nextjs/Vite. (No nextjs only or vite only code)..
12. Use our own table component instead of creating from scratch..
13. Don’t put too much padding inside the card header divs. The Card component already provides padding..
14. Put the Logos svg component code inside the preview file code. Don’t import from other places. Particularly the Radian Logo should be color changeable..
15. Don’t import components from ‘/default’ or ‘/sera’, etc. Import from the ‘/registry’ or ‘/components’.
16. You can go to ‘radianui.com/llms.txt’ to study how components can be used.