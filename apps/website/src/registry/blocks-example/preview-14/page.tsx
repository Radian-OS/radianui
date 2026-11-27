"use client"

import * as React from "react"
import { useState } from "react"
import { flushSync } from "react-dom"
import {
	Code2,
	Copy,
	Folder,
	ListTodo,
	Maximize2,
	Mic,
	Moon,
	Paperclip,
	Presentation,
	Sun,
	Table2,
	Target,
	Terminal,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button, IconButton } from "@/components/ui/button"
import { IconSlot } from "@/registry/icon/icon-library"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/registry/ui/breadcrumb"
import { Card } from "@/registry/ui/card"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/ui/collapsible"
import { Divider } from "@/registry/ui/divider"
import { Drawer, DrawerContent, DrawerTitle } from "@/registry/ui/drawer"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuDivider,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import { Input, InputWrapper } from "@/registry/ui/input"
import { Progress } from "@/registry/ui/progress"
import { ScrollArea, ScrollBar } from "@/registry/ui/scroll-area"
import { Slider, SliderThumb } from "@/registry/ui/slider"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
	useSidebar,
} from "@/registry/ui/sidebar"
import { Tabs, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { TextArea } from "@/registry/ui/text-area"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

// ──────────────────────────────────────────────
// Types & Data
// ──────────────────────────────────────────────

type InspectorTab = "Changes" | "Browser"

interface ChatThreadItem {
	id: string
	title: string
	time: string
	prompt: string
	reply: string
	fileName: string
	fileLang: string
	additions: number
	deletions: number
	codeLines: string[]
}

interface RepoGroup {
	id: string
	name: string
	defaultOpen: boolean
	threads: ChatThreadItem[]
}

interface DiffLine {
	lineNumber: number
	text: string
	added?: boolean
}

interface ChangedFile {
	id: string
	path: string
	delta: string
	status: string
	lines: DiffLine[]
}

const REPO_GROUPS: RepoGroup[] = [
	{
		id: "boardui",
		name: "boardui",
		defaultOpen: false,
		threads: [
			{
				id: "pro-badge-restyle",
				title: "pro badge restyle",
				time: "2h",
				prompt:
					"tighten the Pro Plan badge spacing and align its subtle border token across light and dark themes.",
				reply:
					"Updated the Pro Plan badge variants to inherit semantic surface and border tokens cleanly across both themes:",
				fileName: "badge.tsx",
				fileLang: "TSX",
				additions: 24,
				deletions: 8,
				codeLines: [
					'export const badgeVariants = cva("inline-flex items-center gap-1',
					'  rounded-md border border-border px-2 py-0.5 text-xs font-medium",',
					"  {",
					"    variants: {",
					'      tone: { soft: "bg-fill1 text-fg" },',
					"    },",
					"  }",
					");",
				],
			},
			{
				id: "installation-docs-page",
				title: "installation docs page",
				time: "1d",
				prompt:
					"streamline the CLI quickstart steps and include package manager tabs in the installation docs.",
				reply:
					"Added unified pnpm, npm, and bun command tabs alongside the component registry init snippet:",
				fileName: "installation.mdx",
				fileLang: "MDX",
				additions: 48,
				deletions: 12,
				codeLines: [
					"npx radianui@latest init",
					"npx radianui@latest add button card sidebar tabs",
				],
			},
		],
	},
	{
		id: "vibl-coding-project",
		name: "vibl coding project",
		defaultOpen: true,
		threads: [
			{
				id: "landing-page-design",
				title: "landing page design",
				time: "34m",
				prompt:
					"refine the hero typography scale and balance the feature bento grid padding on mobile viewports.",
				reply:
					"Adjusted the responsive container spacing and balanced the two-column bento alignment for smaller screens:",
				fileName: "hero-section.tsx",
				fileLang: "TSX",
				additions: 42,
				deletions: 11,
				codeLines: [
					'<section className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-12">',
					'  <h1 className="heading-2 text-fg">Ship Agentic Interfaces</h1>',
					'  <p className="text-fg-secondary max-w-2xl text-base">',
					"    Composable primitives built for AI workflows.",
					"  </p>",
					"</section>",
				],
			},
			{
				id: "image-generation",
				title: "image generation",
				time: "now",
				prompt:
					"add aspect ratio presets and a compact prompt seed control to the image studio composer.",
				reply:
					"Added aspect ratio options (1:1, 16:9, 4:5) and seed controls inside the studio toolbar:",
				fileName: "studio-composer.tsx",
				fileLang: "TSX",
				additions: 63,
				deletions: 9,
				codeLines: [
					'const RATIOS = ["1:1", "16:9", "4:5"] as const;',
					"const [ratio, setRatio] = useState<(typeof RATIOS)[number]>('16:9');",
					"const [seed, setSeed] = useState(4092);",
				],
			},
			{
				id: "coding-scenario",
				title: "coding scenario",
				time: "now",
				prompt:
					"update our color tokens for dark mode and add a reusable theme toggle to the registry. run lint and a production build when you're done.",
				reply:
					"Done — the semantic dark-mode tokens and reusable theme toggle are wired. The toggle updates the root theme from one place and persists the selection:",
				fileName: "theme-toggle.tsx",
				fileLang: "TSX",
				additions: 156,
				deletions: 23,
				codeLines: [
					'const nextTheme = theme === "dark" ? "light" : "dark";',
					"",
					"document.documentElement.classList.toggle(",
					'  "dark",',
					'  nextTheme === "dark",',
					");",
					'localStorage.setItem("boardui:theme", nextTheme);',
				],
			},
			{
				id: "mobile-app-vuejs",
				title: "mobile app for vuejs...",
				time: "5h",
				prompt:
					"port the bottom navigation drawer and swipe gestures for mobile breakpoints.",
				reply:
					"Added responsive drawer triggers and compact navigation items tuned for narrow touch viewports:",
				fileName: "mobile-shell.tsx",
				fileLang: "TSX",
				additions: 51,
				deletions: 14,
				codeLines: [
					'<Drawer direction="left">',
					'  <DrawerContent className="p-3">',
					"    <SidebarNavigation />",
					"  </DrawerContent>",
					"</Drawer>",
				],
			},
			{
				id: "code-refactor-dropdown",
				title: "code refactor dropdo...",
				time: "18h",
				prompt:
					"consolidate the branch and workspace dropdowns to reuse shared menu item primitives.",
				reply:
					"Unified both selectors onto the registry DropdownMenu primitives with keyboard navigation:",
				fileName: "branch-picker.tsx",
				fileLang: "TSX",
				additions: 29,
				deletions: 31,
				codeLines: [
					"<DropdownMenu>",
					"  <DropdownMenuTrigger asChild>",
					'    <Button variant="ghost" color="neutral" size="sm">Main</Button>',
					"  </DropdownMenuTrigger>",
					"</DropdownMenu>",
				],
			},
		],
	},
	{
		id: "strider-landing-page-work",
		name: "strider landing page work",
		defaultOpen: false,
		threads: [
			{
				id: "hero-section-animation",
				title: "hero section animation",
				time: "3d",
				prompt:
					"smooth out the staggered entrance choreography using motion/react springs.",
				reply:
					"Replaced static reveal classes with hardware-accelerated Motion transitions:",
				fileName: "hero-motion.tsx",
				fileLang: "TSX",
				additions: 34,
				deletions: 19,
				codeLines: [
					"<motion.div",
					"  initial={{ opacity: 0, y: 12 }}",
					"  animate={{ opacity: 1, y: 0 }}",
					"  transition={{ duration: 0.25 }}",
					"/>",
				],
			},
			{
				id: "pricing-table-copy",
				title: "pricing table copy",
				time: "4d",
				prompt:
					"clarify team seat allowances and annual billing savings on the Pro tier card.",
				reply:
					"Updated tier descriptions and added the annual billing toggle summary:",
				fileName: "pricing-card.tsx",
				fileLang: "TSX",
				additions: 18,
				deletions: 7,
				codeLines: [
					'const PRO_FEATURES = ["Unlimited agents", "Team workspaces", "Priority runs"];',
				],
			},
		],
	},
	{
		id: "pirate-mini-game-ios",
		name: "pirate mini game iOS",
		defaultOpen: false,
		threads: [
			{
				id: "cannon-physics-tuning",
				title: "cannon physics tuning",
				time: "1w",
				prompt:
					"adjust projectile arc damping so medium-range shots feel snappier across wind gusts.",
				reply:
					"Updated gravity scalar and wind drag coefficients in the trajectory solver:",
				fileName: "trajectory.ts",
				fileLang: "TS",
				additions: 15,
				deletions: 6,
				codeLines: [
					"const GRAVITY = 9.81;",
					"const WIND_DRAG = 0.045;",
					"export const stepVelocity = (vy: number, dt: number) => vy - GRAVITY * dt;",
				],
			},
			{
				id: "sprite-sheet-cleanup",
				title: "sprite sheet cleanup",
				time: "2w",
				prompt:
					"remove unused legacy ship frames and align atlas padding to 2px.",
				reply: "Pruned unused frames and regenerated the atlas metadata:",
				fileName: "atlas-config.json",
				fileLang: "JSON",
				additions: 8,
				deletions: 44,
				codeLines: ['{ "padding": 2, "trim": true, "frames": 48 }'],
			},
		],
	},
]

const CHANGED_FILES: ChangedFile[] = [
	{
		id: "button",
		path: "boardui/app/components/button.tsx",
		delta: "+74",
		status: "New",
		lines: [
			{ lineNumber: 1, text: 'import type { Metadata } from "next";' },
			{ lineNumber: 2, text: 'import Link from "next/link";' },
			{ lineNumber: 3, text: "import { ComponentDetail } from" },
			{
				lineNumber: 4,
				text: '  "@/components/application/docs/component-detail";',
			},
			{ lineNumber: 5, text: "import { DashboardShell } from" },
			{
				lineNumber: 6,
				text: '  "@/components/application/dashboard/dashboard-shell";',
			},
			{ lineNumber: 7, text: "" },
			{
				lineNumber: 8,
				text: "export const metadata: Metadata = {",
				added: true,
			},
			{
				lineNumber: 9,
				text: '  title: "Home Dashboard Template — React + Tailwind (Pro)",',
				added: true,
			},
			{ lineNumber: 10, text: "  description:", added: true },
			{
				lineNumber: 11,
				text: '    "Full admin dashboard template for React + Tailwind CSS — sidebar navigation, KPI cards, bar chart, and a customers data table. A BoardUI Pro template.",',
				added: true,
			},
			{ lineNumber: 12, text: "};", added: true },
			{ lineNumber: 13, text: "" },
			{
				lineNumber: 14,
				text: "const PREVIEW_CODE = `import { DashboardShell } from",
			},
			{
				lineNumber: 15,
				text: '  "@/components/application/dashboard/dashboard-shell";',
			},
			{ lineNumber: 16, text: "" },
			{ lineNumber: 17, text: "export default function DashboardPage() {" },
			{
				lineNumber: 18,
				text: "  // Full screen: floating sidebar, header, KPI cards,",
			},
			{
				lineNumber: 19,
				text: "  // earnings bar chart, and the customers data table.",
			},
			{ lineNumber: 20, text: "  return <DashboardShell />;" },
			{ lineNumber: 21, text: "}`;" },
			{ lineNumber: 22, text: "" },
			{
				lineNumber: 23,
				text: "export default function HomeDashboardDetail() {",
			},
			{ lineNumber: 24, text: "  return (" },
			{ lineNumber: 25, text: "    <ComponentDetail" },
			{ lineNumber: 26, text: "      wide" },
			{ lineNumber: 27, text: "      breadcrumb={[" },
			{ lineNumber: 28, text: '        { label: "Board UI", href: "/" },' },
			{
				lineNumber: 29,
				text: '        { label: "Components", href: "/components" },',
			},
			{ lineNumber: 30, text: '        { label: "Home Dashboard" },' },
			{ lineNumber: 31, text: "      ]}" },
		],
	},
	{
		id: "theme-toggle",
		path: "boardui/registry/ui/theme-toggle.tsx",
		delta: "+64",
		status: "Modified",
		lines: [
			{ lineNumber: 1, text: '"use client";' },
			{ lineNumber: 2, text: "" },
			{ lineNumber: 3, text: 'import { useEffect, useState } from "react";' },
			{ lineNumber: 4, text: "", added: true },
			{ lineNumber: 5, text: "export function ThemeToggle() {", added: true },
			{
				lineNumber: 6,
				text: '  const [theme, setTheme] = useState<"light" | "dark">("light");',
				added: true,
			},
			{ lineNumber: 7, text: "" },
			{ lineNumber: 8, text: "  const handleToggle = () => {" },
			{
				lineNumber: 9,
				text: '    const nextTheme = theme === "dark" ? "light" : "dark";',
				added: true,
			},
			{
				lineNumber: 10,
				text: '    document.documentElement.classList.toggle("dark", nextTheme === "dark");',
				added: true,
			},
			{
				lineNumber: 11,
				text: '    localStorage.setItem("boardui:theme", nextTheme);',
				added: true,
			},
			{ lineNumber: 12, text: "    setTheme(nextTheme);" },
			{ lineNumber: 13, text: "  };" },
			{ lineNumber: 14, text: "}" },
		],
	},
	{
		id: "tokens",
		path: "boardui/styles/tokens.css",
		delta: "+18",
		status: "Modified",
		lines: [
			{ lineNumber: 1, text: ":root {" },
			{ lineNumber: 2, text: "  --color-bg: var(--color-elevation-level1);" },
			{ lineNumber: 3, text: "  --color-fg: var(--color-fg);" },
			{ lineNumber: 4, text: "}" },
			{ lineNumber: 5, text: "", added: true },
			{ lineNumber: 6, text: ".dark {", added: true },
			{ lineNumber: 7, text: "  --color-bg: var(--color-bg);", added: true },
			{
				lineNumber: 8,
				text: "  --color-border: var(--color-border);",
				added: true,
			},
			{ lineNumber: 9, text: "}", added: true },
		],
	},
]

const WORKSPACES = [
	{
		id: "mertcan",
		name: "Mertcan Esmergul",
		role: "Personal workspace",
		initials: "ME",
	},
	{
		id: "board-team",
		name: "Board team",
		role: "Pro workspace",
		initials: "BT",
	},
	{
		id: "vibl-studio",
		name: "Vibl Studio",
		role: "Team workspace",
		initials: "VS",
	},
]

const MODELS = ["Composer 2.5", "GPT-5.6 Sol", "Fable 5", "Sonnet 5"] as const
const EFFORT_LEVELS = ["Fastest", "Medium", "Balanced", "High", "Max"] as const
const BRANCHES = ["Main", "feat/dark-tokens", "simran"] as const
const PROJECTS = [
	{ id: "project-sea", prefix: "users/mertcan/", name: "project-sea" },
	{ id: "vibl", prefix: "users/desktop/", name: "vibl" },
	{ id: "boardui", prefix: "users/documents/", name: "boardui" },
] as const

const ADD_MENU_ITEMS = [
	{
		id: "files",
		label: "Files and folders",
		description: null,
		icon: Paperclip,
	},
	{
		id: "goal",
		label: "Goal",
		description: "Set a goal for faster results",
		icon: Target,
	},
	{
		id: "plan",
		label: "Plan mode",
		description: "Manage complex tasks",
		icon: ListTodo,
	},
] as const

const PLUGIN_MENU_ITEMS = [
	{
		id: "documents",
		label: "Documents",
		description: "Create and edit documents",
		slot: "file-text" as const,
		iconClass: "text-fg-secondary",
	},
	{
		id: "spreadsheets",
		label: "Spreadsheets",
		description: "Generate spreadsheets",
		icon: Table2,
		iconClass: "text-info",
	},
	{
		id: "presentations",
		label: "Presentations",
		description: "Create marketing assets",
		icon: Presentation,
		iconClass: "text-primary",
	},
	{
		id: "code-blocks",
		label: "Code blocks",
		description: "Write and edit existing code",
		icon: Code2,
		iconClass: "text-success",
	},
] as const
const MODES = ["Agent", "Plan", "Ask"] as const

// ──────────────────────────────────────────────
// Brand Mark (required inline per SKILL2.md)
// ──────────────────────────────────────────────

const SWITCH_WORKSPACES = [
	{
		id: "radian-ui",
		name: "Radian UI",
		members: "14 members",
		avatar: null,
		fallback: "RU",
	},
	{
		id: "xavion",
		name: "Xavion Inc.",
		members: "51 members",
		avatar: "/media/xavion.png",
		fallback: "XV",
	},
	{
		id: "qubio",
		name: "Qubio Inc.",
		members: "Just you",
		avatar: "/media/qubio.png",
		fallback: "QB",
	},
] as const

const ACCOUNT_MENU_ITEMS: {
	id: string
	label: string
	icon: React.ComponentProps<typeof IconSlot>["slot"]
	shortcut: string | null
}[] = [
	{ id: "profile", label: "View Profile", icon: "user", shortcut: null },
	{ id: "settings", label: "Settings", icon: "setting", shortcut: "⌘+K" },
	{ id: "billing", label: "Billing", icon: "card", shortcut: null },
]

const ORG_MENU_ITEMS: {
	id: string
	label: string
	icon: React.ComponentProps<typeof IconSlot>["slot"]
}[] = [
	{ id: "company", label: "Company Profile", icon: "building" },
	{ id: "team", label: "Team", icon: "users" },
]

function UserAccountMenuContent({
	align = "end",
	side = "right",
	sideOffset = 8,
}: {
	align?: "start" | "center" | "end"
	side?: "top" | "right" | "bottom" | "left"
	sideOffset?: number
}) {
	return (
		<DropdownMenuContent
			align={align}
			side={side}
			sideOffset={sideOffset}
			className="w-60 sm:w-68">
			<div className="flex w-full items-center gap-2.5 p-2">
				<Avatar size="md" rounded="square" className="bg-fill2">
					<AvatarImage
						src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/8.png"
						alt="Mertcan Esmergul"
					/>
					<AvatarFallback className="text-xs">ME</AvatarFallback>
				</Avatar>
				<div className="flex flex-1 flex-col">
					<span className="text-sm font-medium">Mertcan Esmergul</span>
					<span className="text-fg-tertiary text-xs font-normal">
						mertcan@radian.com
					</span>
				</div>
				<Badge color="primary">PRO</Badge>
			</div>
			<DropdownMenuDivider />
			<DropdownMenuLabel className="text-xs uppercase">
				Account
			</DropdownMenuLabel>
			{ACCOUNT_MENU_ITEMS.map(({ id, label, icon, shortcut }) => (
				<DropdownMenuItem key={id} className="text-sm">
					<IconSlot slot={icon} className="size-4" />
					{label}
					{shortcut && (
						<DropdownMenuShortcut>
							<Badge variant="outline" color="neutral" className="text-xs">
								{shortcut}
							</Badge>
						</DropdownMenuShortcut>
					)}
				</DropdownMenuItem>
			))}
			<DropdownMenuDivider />
			<DropdownMenuLabel className="text-xs uppercase">
				Account
			</DropdownMenuLabel>
			{ORG_MENU_ITEMS.map(({ id, label, icon }) => (
				<DropdownMenuItem key={id} className="text-sm">
					<IconSlot slot={icon} className="size-4" />
					{label}
				</DropdownMenuItem>
			))}
			<DropdownMenuDivider />
			<DropdownMenuItem className="text-sm">
				<IconSlot slot="logout" className="size-4" />
				Log out
				<span className="text-fg-tertiary ml-auto text-xs">v2.3.16</span>
			</DropdownMenuItem>
		</DropdownMenuContent>
	)
}

function RadianLogo({ className = "size-7" }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 48 48"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={cn("shrink-0", className)}>
			<path
				d="M35.2 0H12.8C5.73075 0 0 5.73075 0 12.8V35.2C0 42.2692 5.73075 48 12.8 48H35.2C42.2692 48 48 42.2692 48 35.2V12.8C48 5.73075 42.2692 0 35.2 0Z"
				fill="var(--color-primary)"
			/>
			<path
				d="M41.5168 16.9408C41.8032 17.0048 41.7296 17.6544 41.5744 17.9024C41.3024 18.3328 40.3776 18.9408 38.4048 19.928C29.7776 23.9328 21.8896 26.7072 11.0432 29.6032C9.64159 29.9776 8.59999 30.072 7.82399 30.072C7.04799 30.072 5.68639 29.808 6.69119 29.1328C7.69599 28.4576 8.15039 28.192 8.47039 28.0048C12.3664 25.8368 12.1808 24.2832 13.5296 20.3104C15.4896 13.8592 23.1792 10.888 29.1872 13.6656C31.3696 14.64 32.7504 16.3664 35.0944 16.9536C36.4176 17.288 38.3152 17.2592 39.704 17.1136C40.256 17.12 40.968 16.8176 41.5152 16.9408H41.5168ZM20.3728 23.6928C22.7728 22.8336 25.6032 21.8848 27.608 21.1136C28.2272 20.8736 28.8048 20.6944 29.4448 20.3936C29.7264 20.2592 29.992 20.0544 30.28 19.7632C31.176 18.8 28.6704 17.3968 27.9504 17.0112C23.1024 14.4704 17.3808 17.688 16.712 23.0336C16.5936 24.16 17.0208 24.632 18.128 24.3856C18.896 24.2208 19.6832 23.9312 20.3584 23.696L20.3712 23.6912L20.3728 23.6928Z"
				fill="white"
			/>
			<path
				d="M34.6224 25.9056C35.0624 26.824 34.6752 27.968 34.3904 28.896C33.8496 30.4512 32.9232 31.8192 31.7088 32.92C31.1072 33.488 30.464 33.9856 29.7264 34.3792C26.7168 36.0592 22.712 36.0176 19.7424 34.2736C18.5168 33.5456 16.8512 32.4848 17.7968 30.8576C18.1488 30.3328 18.6544 29.7392 19.2912 29.816C19.7344 29.8768 20.112 30.344 20.4672 30.6368C21.3872 31.4272 22.4176 31.896 23.6928 32.136C25.6176 32.4784 27.68 31.9088 29.176 30.664C30.3568 29.6688 31.1504 28.32 31.4176 26.7792C31.5136 26.2496 31.5712 25.4976 32.0176 25.2048C32.7552 24.7424 34.1984 25.112 34.616 25.8928L34.6208 25.9024L34.6224 25.9056Z"
				fill="white"
			/>
		</svg>
	)
}

// ──────────────────────────────────────────────
// Syntax Highlight Helper (semantic tokens only)
// ──────────────────────────────────────────────

function SyntaxCodeLine({ text }: { text: string }) {
	const tokens = text.split(
		/(\b(?:import|type|from|export|const|default|function|return)\b|"[^"]*"|`[^`]*`|\b(?:Metadata|Link|ComponentDetail|DashboardShell|DashboardPage|HomeDashboardDetail|PREVIEW_CODE|nextTheme|theme|document|localStorage)\b)/g
	)

	return (
		<>
			{tokens.map((token, idx) => {
				if (!token) return null
				if (
					/^(import|type|from|export|const|default|function|return)$/.test(
						token
					)
				) {
					return (
						<span key={idx} className="text-success font-medium">
							{token}
						</span>
					)
				}
				if (
					/^(Metadata|Link|ComponentDetail|DashboardShell|DashboardPage|HomeDashboardDetail|PREVIEW_CODE|nextTheme|theme|document|localStorage)$/.test(
						token
					)
				) {
					return (
						<span key={idx} className="text-info">
							{token}
						</span>
					)
				}
				if (/^(".*"|`.*`)$/.test(token)) {
					return (
						<span key={idx} className="text-fg-secondary">
							{token}
						</span>
					)
				}
				return (
					<span key={idx} className="text-fg">
						{token}
					</span>
				)
			})}
		</>
	)
}

// ──────────────────────────────────────────────
// Left Sidebar Component
// ──────────────────────────────────────────────

function AgentSidebar({
	activeThreadId,
	onSelectThread,
	onNewAgent,
}: {
	activeThreadId: string
	onSelectThread: (repoName: string, thread: ChatThreadItem) => void
	onNewAgent: () => void
}) {
	const [selectedSwitchWorkspace, setSelectedSwitchWorkspace] =
		useState<string>("radian-ui")
	const [searchQuery, setSearchQuery] = useState("")
	const [themeMode, setThemeMode] = useState<"light" | "dark">("light")
	const { isMobile, setOpen, setOpenMobile } = useSidebar()

	const activeWorkspace = WORKSPACES[0]

	const filteredRepos = React.useMemo(() => {
		const q = searchQuery.trim().toLowerCase()
		if (!q) return REPO_GROUPS
		return REPO_GROUPS.map((repo) => ({
			...repo,
			threads: repo.threads.filter(
				(t) =>
					t.title.toLowerCase().includes(q) ||
					repo.name.toLowerCase().includes(q)
			),
		})).filter((repo) => repo.threads.length > 0)
	}, [searchQuery])

	const closeMobileSidebar = () => {
		if (isMobile) setOpenMobile(false)
	}

	const lastClickRef = React.useRef<{ x: number; y: number } | null>(null)

	const handleThemeChange = (next: "light" | "dark") => {
		const applyTheme = () => {
			setThemeMode(next)
			document.documentElement.classList.toggle("dark", next === "dark")
		}

		const doc = document as Document & {
			startViewTransition?: (cb: () => void) => unknown
		}
		if (!doc.startViewTransition) {
			applyTheme()
			return
		}

		doc.startViewTransition(() => {
			flushSync(() => {
				setThemeMode(next)
			})
			document.documentElement.classList.toggle("dark", next === "dark")
		})
	}

	return (
		<Sidebar
			variant="floating"
			collapsible="offcanvas"
			className="p-2 select-none [&_[data-slot=sidebar-inner]]:p-2.5 [&_[data-slot=sidebar-inner]]:shadow-none"
			style={
				{
					"--sidebar-width": "16.25rem",
					"--color-sidebar": "var(--color-elevation-negative)",
				} as React.CSSProperties
			}>
			{/* Top Account Switcher + Collapse Trigger */}
			<SidebarHeader className="gap-3 p-0">
				<div className="flex items-center justify-between gap-1">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								color="neutral"
								size="sm"
								className="hover:bg-fill2 h-auto min-w-0 flex-1 justify-between gap-2 px-1.5 py-1">
								<span className="flex min-w-0 items-center gap-2">
									<Avatar
										size="md"
										rounded="circle"
										className="bg-fill2 shrink-0">
										<AvatarImage
											src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/8.png"
											alt={activeWorkspace.name}
										/>
										<AvatarFallback className="bg-fill2 text-fg-secondary text-xs font-semibold">
											M
										</AvatarFallback>
									</Avatar>
									<span className="text-fg truncate text-sm font-semibold">
										{activeWorkspace.name}
									</span>
								</span>
								<IconSlot
									slot="chevrons-up-down"
									className="text-fg-tertiary size-4! shrink-0"
								/>
							</Button>
						</DropdownMenuTrigger>
						<UserAccountMenuContent
							align="start"
							side="bottom"
							sideOffset={8}
						/>
					</DropdownMenu>

					<Tooltip>
						<TooltipTrigger asChild>
							<SidebarTrigger className="shrink-0" />
						</TooltipTrigger>
						<TooltipContent side="right" withArrow>
							Toggle sidebar
						</TooltipContent>
					</Tooltip>
				</div>

				{/* Quick Search */}
				<InputWrapper size="sm" className="w-full">
					<IconSlot
						slot="search"
						className="text-fg-tertiary size-4 shrink-0"
					/>
					<Input
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Quick Search"
						aria-label="Quick Search"
					/>
					<Badge color="neutral" size="sm">
						⌘L
					</Badge>
				</InputWrapper>

				{/* Quick Agent Actions */}
				<SidebarMenu className="gap-0.5">
					<SidebarMenuItem>
						<SidebarMenuButton
							size="sm"
							onClick={() => {
								onNewAgent()
								closeMobileSidebar()
							}}>
							<IconSlot slot="plus" className="size-4" />
							<span>New agent</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton size="sm" onClick={closeMobileSidebar}>
							<IconSlot slot="zap" className="size-4" />
							<span>Automations</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton size="sm" onClick={closeMobileSidebar}>
							<IconSlot slot="settings-2" className="size-4" />
							<span>Customize</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			{/* Scrollable Repositories & Threads */}
			<SidebarContent className="px-0 pt-6 pb-6">
				<ScrollArea className="h-full pr-1">
					<SidebarGroup className="gap-3 p-0">
						<SidebarGroupLabel className="text-fg-tertiary px-2 py-1 text-xs font-medium">
							Repositories
						</SidebarGroupLabel>
						<SidebarGroupContent className="flex flex-col gap-0.5">
							{filteredRepos.map((repo) => (
								<Collapsible
									key={repo.id}
									defaultOpen={
										repo.defaultOpen || searchQuery.trim().length > 0
									}>
									<SidebarMenu className="gap-0.5">
										<SidebarMenuItem>
											<CollapsibleTrigger asChild>
												<SidebarMenuButton size="sm">
													<IconSlot slot="archive" className="size-4" />
													<span className="text-fg font-medium">
														{repo.name}
													</span>
												</SidebarMenuButton>
											</CollapsibleTrigger>
											<CollapsibleContent>
												<SidebarMenu className="border-border ml-3.5 gap-0.5 border-l pl-3">
													{repo.threads.map((thread) => {
														const isActive = activeThreadId === thread.id
														return (
															<SidebarMenuItem
																key={thread.id}
																className="relative">
																<span
																	className="bg-border pointer-events-none absolute top-1/2 -left-3 h-px w-2.5"
																	aria-hidden="true"
																/>
																<SidebarMenuButton
																	size="sm"
																	isActive={isActive}
																	onClick={() => {
																		onSelectThread(repo.name, thread)
																		closeMobileSidebar()
																	}}>
																	<span className="min-w-0 flex-1 truncate">
																		{thread.title}
																	</span>
																</SidebarMenuButton>
															</SidebarMenuItem>
														)
													})}
												</SidebarMenu>
											</CollapsibleContent>
										</SidebarMenuItem>
									</SidebarMenu>
								</Collapsible>
							))}
						</SidebarGroupContent>
					</SidebarGroup>
				</ScrollArea>
			</SidebarContent>

			{/* Footer Theme Switch, Links & Workspace Upgrade Card */}
			<SidebarFooter className="gap-2.5 p-0 pt-2">
				<div className="flex items-center px-0.5">
					<Tabs
						value={themeMode}
						onValueChange={(val) => handleThemeChange(val as "light" | "dark")}>
						<TabsList variant="default">
							<TabsTrigger
								value="light"
								aria-label="Light mode"
								className="focus-visible:ring-0 focus-visible:ring-offset-0"
								onClick={(e) => {
									lastClickRef.current = { x: e.clientX, y: e.clientY }
								}}>
								<Sun className="size-4" />
							</TabsTrigger>
							<TabsTrigger
								value="dark"
								aria-label="Dark mode"
								className="focus-visible:ring-0 focus-visible:ring-offset-0"
								onClick={(e) => {
									lastClickRef.current = { x: e.clientX, y: e.clientY }
								}}>
								<Moon className="size-4" />
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>

				<SidebarMenu className="gap-0.5">
					<SidebarMenuItem>
						<SidebarMenuButton size="sm">
							<IconSlot slot="headset" className="size-4" />
							<span>Support</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton size="sm">
							<IconSlot slot="setting" className="size-4" />
							<span>Settings</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>

				<Card className="bg-fill2 flex flex-row items-center justify-between gap-2 border-0 p-2 shadow-none">
					<div className="flex min-w-0 items-center gap-2">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button
									type="button"
									aria-label="Switch workspace"
									className="shrink-0 cursor-pointer rounded-full focus-visible:outline-none">
									<RadianLogo className="size-9 shrink-0" />
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align={isMobile ? "center" : "end"}
								side={isMobile ? "top" : "right"}
								sideOffset={8}
								className="w-60 sm:w-68">
								<DropdownMenuLabel className="text-xs uppercase">
									Switch Workspace
								</DropdownMenuLabel>
								<DropdownMenuRadioGroup
									value={selectedSwitchWorkspace}
									onValueChange={setSelectedSwitchWorkspace}>
									{SWITCH_WORKSPACES.map((workspace) => (
										<DropdownMenuRadioItem
											key={workspace.id}
											value={workspace.id}
											className="data-[state=checked]:bg-fill1-alpha py-2">
											{workspace.avatar ? (
												<Avatar size="sm" rounded="square" className="bg-fill2">
													<AvatarImage
														src={workspace.avatar}
														alt={workspace.name}
													/>
													<AvatarFallback className="text-xs">
														{workspace.fallback}
													</AvatarFallback>
												</Avatar>
											) : (
												<div className="flex size-8 shrink-0 items-center justify-center [&>svg]:size-8!">
													<RadianLogo className="size-8" />
												</div>
											)}
											<div className="flex flex-1 flex-col gap-0.5">
												<span className="text-sm font-medium">
													{workspace.name}
												</span>
												<span className="text-fg-secondary text-xs">
													{workspace.members}
												</span>
											</div>
										</DropdownMenuRadioItem>
									))}
								</DropdownMenuRadioGroup>
								<DropdownMenuDivider />
								<DropdownMenuItem className="text-sm">
									<span className="border-border flex size-4 items-center justify-center rounded-sm border">
										<IconSlot slot="plus" className="size-3" />
									</span>
									Create workspace
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<div className="flex min-w-0 flex-col gap-1">
							<span className="text-fg truncate text-xs leading-none font-semibold">
								Board team
							</span>
							<span className="text-fg-tertiary truncate text-xs leading-none">
								Pro Plan
							</span>
						</div>
					</div>
					<Button variant="outline" color="neutral" size="sm">
						Upgrade
					</Button>
				</Card>
			</SidebarFooter>
		</Sidebar>
	)
}

// ──────────────────────────────────────────────
// Right Changes / Browser Inspector Panel
// ──────────────────────────────────────────────

function InspectorPanelContent({
	inspectorTab,
	onTabChange,
	selectedFileId,
	onSelectFileId,
}: {
	inspectorTab: InspectorTab
	onTabChange: (tab: InspectorTab) => void
	selectedFileId: string
	onSelectFileId: (id: string) => void
}) {
	const [isExpanded, setIsExpanded] = useState(false)
	const activeFile =
		CHANGED_FILES.find((f) => f.id === selectedFileId) ?? CHANGED_FILES[0]

	return (
		<div className="flex h-full min-h-0 flex-col gap-3">
			{/* Inspector Top Tabs Bar */}
			<div className="px-3 pt-2">
				<div className="flex h-[30px] w-full shrink-0 items-center justify-between">
					<div className="flex items-center gap-1">
						<Button
							variant={inspectorTab === "Changes" ? "soft" : "ghost"}
							color={inspectorTab === "Changes" ? "primary" : "neutral"}
							onClick={() => onTabChange("Changes")}>
							<IconSlot slot="repeat" />
							<span>Changes</span>
						</Button>
						<Button
							variant={inspectorTab === "Browser" ? "soft" : "ghost"}
							color={inspectorTab === "Browser" ? "primary" : "neutral"}
							onClick={() => onTabChange("Browser")}>
							<IconSlot slot="globe" />
							<span>Browser</span>
						</Button>
					</div>

					<div className="flex items-center gap-1">
						<Tooltip>
							<TooltipTrigger asChild>
								<IconButton
									variant="ghost"
									color="neutral"
									size="xs"
									aria-label="Open terminal">
									<Terminal className="size-4" />
								</IconButton>
							</TooltipTrigger>
							<TooltipContent withArrow>Console output</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<IconButton
									variant="ghost"
									color="neutral"
									size="xs"
									onClick={() => setIsExpanded((prev) => !prev)}
									aria-label="Toggle expand view">
									<Maximize2 className="size-4" />
								</IconButton>
							</TooltipTrigger>
							<TooltipContent withArrow>
								{isExpanded ? "Restore panel" : "Expand view"}
							</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<IconButton
									variant="ghost"
									color="neutral"
									size="xs"
									aria-label="Toggle inspector">
									<IconSlot slot="left-panel" className="size-4" />
								</IconButton>
							</TooltipTrigger>
							<TooltipContent withArrow>Toggle inspector</TooltipContent>
						</Tooltip>
					</div>
				</div>
			</div>

			<AnimatePresence mode="wait">
				{inspectorTab === "Changes" ? (
					<motion.div
						key="Changes"
						initial={{ opacity: 0, y: 6 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -6 }}
						transition={{ duration: 0.16 }}
						className="flex min-h-0 flex-1 flex-col gap-3">
						{/* Unified Uncommitted & File Switcher Stack */}
						<div className="px-3">
							<div className="border-border bg-elevation-level1 flex h-[41px] w-full items-center justify-between rounded-t-xl border-x border-t px-2.5 pt-1.5 pb-3.5">
								<div className="flex items-center gap-2 text-xs">
									<span className="text-fg font-medium">
										12 Uncommitted changes
									</span>
									<span className="text-success font-medium tabular-nums">
										+156
									</span>
									<span className="text-error font-medium tabular-nums">
										-23
									</span>
								</div>
								<Tooltip>
									<TooltipTrigger asChild>
										<IconButton
											variant="ghost"
											color="neutral"
											size="xs"
											aria-label="Refresh uncommitted changes">
											<IconSlot slot="arrow-left" />
										</IconButton>
									</TooltipTrigger>
									<TooltipContent withArrow>Sync working tree</TooltipContent>
								</Tooltip>
							</div>

							<div className="border-border bg-fill1 relative z-10 -mt-[7px] flex h-7 w-full items-center justify-between gap-2 rounded-xl border py-1 pr-[5px] pl-1.5">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="ghost"
											color="neutral"
											size="xs"
											className="h-auto min-w-0 flex-1 justify-start gap-2 p-0">
											<IconSlot slot="shapes" />
											<span className="text-fg truncate font-mono text-xs font-medium">
												{activeFile.path}
											</span>
											<span className="text-success text-xs font-medium tabular-nums">
												{activeFile.delta}
											</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="start" className="w-72">
										<DropdownMenuLabel className="text-xs uppercase">
											Changed Files
										</DropdownMenuLabel>
										<DropdownMenuRadioGroup
											value={selectedFileId}
											onValueChange={onSelectFileId}>
											{CHANGED_FILES.map((file) => (
												<DropdownMenuRadioItem key={file.id} value={file.id}>
													<div className="flex min-w-0 flex-1 items-center justify-between gap-2">
														<span className="truncate font-mono text-xs">
															{file.path}
														</span>
														<span className="text-success shrink-0 text-xs tabular-nums">
															{file.delta}
														</span>
													</div>
												</DropdownMenuRadioItem>
											))}
										</DropdownMenuRadioGroup>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>

						{/* Scrollable Syntax Diff Viewer */}
						<ScrollArea className="min-h-0 flex-1">
							<AnimatePresence mode="wait">
								<motion.div
									key={activeFile.id}
									initial={{ opacity: 0, y: 4 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -4 }}
									transition={{ duration: 0.14 }}
									className="py-2 font-mono text-xs leading-6">
									{activeFile.lines.map((line) => (
										<div
											key={line.lineNumber}
											className="flex items-start gap-3 px-3 break-words whitespace-pre-wrap">
											<span className="text-fg-tertiary w-5 shrink-0 text-right tabular-nums select-none">
												{line.lineNumber}
											</span>
											<span className="min-w-0 flex-1">
												<SyntaxCodeLine text={line.text} />
											</span>
										</div>
									))}
								</motion.div>
							</AnimatePresence>
						</ScrollArea>
					</motion.div>
				) : (
					<motion.div
						key="Browser"
						initial={{ opacity: 0, y: 6 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -6 }}
						transition={{ duration: 0.16 }}
						className="flex min-h-0 flex-1 flex-col px-3 pb-3">
						<Card className="bg-fill1 flex min-h-0 flex-1 items-center justify-center border-0 p-6 shadow-none">
							<span className="text-fg-tertiary text-sm">Browser preview</span>
						</Card>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

const THINKING_STEPS = [
	"Read project files",
	"Update and install light mode tokens",
	"Implement dark mode tokens",
	"Add reusable registered theme toggle",
] as const

function AgentThinkingBlock({
	elapsedSeconds,
	activeStepIndex,
	showSteps = true,
}: {
	elapsedSeconds: number
	activeStepIndex: number
	showSteps?: boolean
}) {
	const [minimized, setMinimized] = useState(false)
	const remainingSteps = Math.max(1, 5 - activeStepIndex)

	return (
		<motion.div
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -6 }}
			transition={{ duration: 0.22 }}
			className="flex flex-col gap-3">
			<Card className="border-border bg-elevation-level1 w-[339px] max-w-full gap-2 border px-2.5 pt-2 pb-2.5 shadow-xs">
				<div className="flex items-center justify-between gap-2 pr-0.5 pl-[9px]">
					<div className="flex items-center gap-2">
						<motion.span
							animate={{ rotate: 360 }}
							transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
							className="border-border border-t-fg-secondary inline-block size-4 rounded-full border-2"
						/>
						<span className="text-fg-secondary text-sm font-medium">
							{remainingSteps} steps left
						</span>
					</div>

					<IconButton
						variant="soft"
						color="neutral"
						size="xs"
						onClick={() => setMinimized((prev) => !prev)}
						aria-label={minimized ? "Expand steps" : "Minimize steps"}>
						<IconSlot slot={minimized ? "plus" : "minus"} />
					</IconButton>
				</div>

				<AnimatePresence initial={false}>
					{!minimized && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.18 }}
							className="flex flex-col gap-1 overflow-hidden">
							{THINKING_STEPS.map((step, idx) => {
								const isDone = idx < activeStepIndex
								const isCurrent = idx === activeStepIndex
								const isBlurred =
									idx === THINKING_STEPS.length - 1 && !isCurrent && !isDone

								return (
									<motion.div
										key={step}
										initial={{ opacity: 0, y: 4 }}
										animate={{
											opacity: showSteps ? (isBlurred ? 0.55 : 1) : 0,
											y: showSteps ? 0 : 4,
										}}
										transition={{
											duration: 0.22,
											delay: showSteps ? idx * 0.08 : 0,
										}}
										className={cn(
											"relative flex h-8 items-center gap-2 rounded-lg pr-[13px] pl-[9px] text-sm transition-all",
											isBlurred && "blur-[1px]"
										)}>
										{isCurrent && (
											<motion.div
												layoutId="thinking-active-step"
												transition={{
													type: "spring",
													stiffness: 380,
													damping: 32,
												}}
												className="border-border bg-elevation-level1 pointer-events-none absolute inset-0 rounded-lg border shadow-2xs"
											/>
										)}
										<span className="relative z-10 inline-flex items-center">
											{isDone ? (
												<span className="bg-fill2 text-fg-tertiary inline-flex size-4 shrink-0 items-center justify-center rounded-full">
													<IconSlot slot="check" className="size-3" />
												</span>
											) : isCurrent ? (
												<motion.span
													animate={{ rotate: 360 }}
													transition={{
														repeat: Infinity,
														duration: 1,
														ease: "linear",
													}}
													className="border-border border-t-fg-secondary inline-block size-4 shrink-0 rounded-full border-2"
												/>
											) : (
												<span className="border-border inline-block size-4 shrink-0 rounded-full border border-dashed" />
											)}
										</span>
										<span
											className={cn(
												"relative z-10",
												isCurrent
													? "text-fg font-medium"
													: isDone
														? "text-fg-tertiary line-through"
														: "text-fg-secondary"
											)}>
											{step}
										</span>
									</motion.div>
								)
							})}
						</motion.div>
					)}
				</AnimatePresence>
			</Card>

			{/* Shimmering Thinking Status Line */}
			<div className="flex items-center gap-2 px-1 text-sm">
				<motion.span
					animate={{ rotate: [0, 180, 360] }}
					transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
					className="text-fg-tertiary inline-flex items-center">
					<IconSlot slot="repeat" className="size-4" />
				</motion.span>
				<motion.span
					animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
					transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
					style={{
						backgroundImage:
							"linear-gradient(90deg, var(--color-fg-tertiary) 0%, var(--color-fg) 50%, var(--color-fg-tertiary) 100%)",
						backgroundSize: "200% 100%",
						backgroundClip: "text",
						WebkitBackgroundClip: "text",
						color: "transparent",
					}}
					className="font-medium">
					Thinking
				</motion.span>
				<span className="text-fg-tertiary font-mono text-xs tabular-nums">
					{elapsedSeconds.toFixed(1)}s
				</span>
			</div>
		</motion.div>
	)
}

// ──────────────────────────────────────────────
// Main Preview 14 Page
// ──────────────────────────────────────────────

export default function Preview14Page() {
	const [sidebarOpen, setSidebarOpen] = useState(true)
	const [activeRepoName, setActiveRepoName] = useState("vibl coding project")
	const [activeThread, setActiveThread] = useState<ChatThreadItem>(
		REPO_GROUPS[1].threads[2]
	)
	const [customMessages, setCustomMessages] = useState<
		{ id: string; role: "user" | "assistant"; text: string }[]
	>([])
	const [composerValue, setComposerValue] = useState("")
	const [selectedModel, setSelectedModel] =
		useState<(typeof MODELS)[number]>("Fable 5")
	const [effortLevel, setEffortLevel] = useState<number[]>([1])
	const [selectedBranch, setSelectedBranch] =
		useState<(typeof BRANCHES)[number]>("Main")
	const [selectedProject, setSelectedProject] =
		useState<(typeof PROJECTS)[number]["id"]>("project-sea")
	const [selectedMode, setSelectedMode] =
		useState<(typeof MODES)[number]>("Agent")
	const [copiedCode, setCopiedCode] = useState(false)
	const [reaction, setReaction] = useState<"up" | "down" | null>(null)
	const [inspectorTab, setInspectorTab] = useState<InspectorTab>("Changes")
	const [selectedFileId, setSelectedFileId] = useState("button")
	const [mobileInspectorOpen, setMobileInspectorOpen] = useState(false)
	const [isThinking, setIsThinking] = useState(false)
	const [thinkingPhase, setThinkingPhase] = useState<
		"prompt" | "card" | "steps" | "done"
	>("prompt")
	const [thinkingElapsed, setThinkingElapsed] = useState(0)
	const [thinkingStep, setThinkingStep] = useState(0)

	React.useEffect(() => {
		const mql = window.matchMedia("(min-width: 1024px)")
		setSidebarOpen(mql.matches)
		const onChange = (e: MediaQueryListEvent) => setSidebarOpen(e.matches)
		mql.addEventListener("change", onChange)
		return () => mql.removeEventListener("change", onChange)
	}, [])

	const handleSelectThread = (repoName: string, thread: ChatThreadItem) => {
		setActiveRepoName(repoName)
		setActiveThread(thread)
		setCustomMessages([])
		setIsThinking(false)
		setThinkingPhase("done")
		setReaction(null)
		setCopiedCode(false)
	}

	const handleNewAgent = () => {
		setActiveRepoName("vibl coding project")
		setActiveThread({
			id: "new-agent",
			title: "new agent session",
			time: "now",
			prompt: "inspect the registry components and summarize open UI tasks.",
			reply:
				"Ready — I checked your workspace tokens and UI primitives. Ask me to scaffold a component, refactor tokens, or inspect diffs.",
			fileName: "workspace.ts",
			fileLang: "TS",
			additions: 12,
			deletions: 0,
			codeLines: ['export const status = "ready";'],
		})
		setCustomMessages([])
		setIsThinking(false)
		setThinkingPhase("done")
		setReaction(null)
	}

	const triggerThinkingCycle = React.useCallback(
		(onDone?: () => void, initialDelay = 0) => {
			let elapsedTimer: number | undefined
			if (initialDelay === 0) {
				setIsThinking(true)
				setThinkingPhase("card")
				setThinkingElapsed(0.1)
				setThinkingStep(0)
			} else {
				setIsThinking(false)
				setThinkingPhase("prompt")
				setThinkingElapsed(0)
				setThinkingStep(0)
			}

			const startCard = window.setTimeout(() => {
				setIsThinking(true)
				setThinkingPhase("card")
				setThinkingElapsed(0.1)
				elapsedTimer = window.setInterval(() => {
					setThinkingElapsed((prev) => Number((prev + 0.1).toFixed(1)))
				}, 100)
			}, initialDelay)

			const showSteps = window.setTimeout(
				() => setThinkingPhase("steps"),
				initialDelay + 450
			)
			const step1 = window.setTimeout(
				() => setThinkingStep(1),
				initialDelay + 1450
			)
			const step2 = window.setTimeout(
				() => setThinkingStep(2),
				initialDelay + 2450
			)
			const step3 = window.setTimeout(
				() => setThinkingStep(3),
				initialDelay + 3450
			)
			const finish = window.setTimeout(() => {
				if (elapsedTimer !== undefined) window.clearInterval(elapsedTimer)
				setIsThinking(false)
				setThinkingPhase("done")
				onDone?.()
			}, initialDelay + 4450)

			return () => {
				if (elapsedTimer !== undefined) window.clearInterval(elapsedTimer)
				window.clearTimeout(startCard)
				window.clearTimeout(showSteps)
				window.clearTimeout(step1)
				window.clearTimeout(step2)
				window.clearTimeout(step3)
				window.clearTimeout(finish)
			}
		},
		[]
	)

	React.useEffect(() => {
		return triggerThinkingCycle(undefined, 350)
	}, [triggerThinkingCycle])

	const handleSendMessage = () => {
		const trimmed = composerValue.trim()
		if (!trimmed || isThinking) return
		const msgId = `msg-${Date.now()}`
		setCustomMessages((prev) => [
			...prev,
			{ id: `${msgId}-user`, role: "user", text: trimmed },
		])
		setComposerValue("")
		triggerThinkingCycle(() => {
			setCustomMessages((prev) => [
				...prev,
				{
					id: `${msgId}-assistant`,
					role: "assistant",
					text: `Done — updated ${selectedProject} (${selectedBranch}) using ${selectedModel}. All lint and production checks passed.`,
				},
			])
		})
	}

	const handleCopyCode = () => {
		const content = activeThread.codeLines.join("\n")
		navigator.clipboard?.writeText(content).catch(() => {})
		setCopiedCode(true)
		setTimeout(() => setCopiedCode(false), 1800)
	}

	return (
		<div className="text-fg font-body bg-bg h-dvh w-full max-w-dvw overflow-hidden">
			<style>{`
				@keyframes theme-reveal-circle {
					from { clip-path: circle(0px at 0% 100%); }
					to { clip-path: circle(150vmax at 0% 100%); }
				}
				::view-transition-old(root),
				::view-transition-new(root) {
					animation: none;
					mix-blend-mode: normal;
				}
				::view-transition-old(root) { z-index: 1; }
				::view-transition-new(root) {
					z-index: 9999;
					animation: theme-reveal-circle 550ms cubic-bezier(0.22, 1, 0.36, 1) both;
				}
			`}</style>
			<SidebarProvider
				open={true}
				onOpenChange={() => {}}
				defaultWidth="16.25rem"
				className="flex h-dvh w-full max-w-full overflow-hidden bg-transparent">
				{/* Left Agent Sidebar */}
				<AgentSidebar
					activeThreadId={activeThread.id}
					onSelectThread={handleSelectThread}
					onNewAgent={handleNewAgent}
				/>

				{/* Main Workspace Split Container */}
				<SidebarInset className="bg-bg flex h-dvh min-w-0 flex-1 flex-row gap-2 overflow-hidden py-2 pr-2 pl-2 lg:pl-0">
					{/* Center Chat Panel */}
					<Card className="border-border/60 bg-elevation-negative flex min-w-0 flex-1 flex-col gap-0 overflow-hidden border p-0 shadow-none">
						{/* Chat Header Bar */}
						<header className="flex w-full min-w-0 shrink-0 items-center justify-between gap-2 px-4 pt-4">
							<div className="flex min-w-0 items-center gap-2">
								<SidebarTrigger className="shrink-0 lg:hidden" />
								<Breadcrumb className="min-w-0">
									<BreadcrumbList className="flex-nowrap whitespace-nowrap">
										<BreadcrumbItem className="hidden sm:inline-flex">
											<IconSlot
												slot="archive"
												className="text-fg-tertiary size-4"
											/>
											<BreadcrumbLink href="#">{activeRepoName}</BreadcrumbLink>
										</BreadcrumbItem>
										<BreadcrumbSeparator className="hidden sm:inline-flex" />
										<BreadcrumbItem className="min-w-0">
											<BreadcrumbPage className="truncate font-medium">
												{activeThread.title}
											</BreadcrumbPage>
										</BreadcrumbItem>
									</BreadcrumbList>
								</Breadcrumb>
							</div>

							<div className="flex shrink-0 items-center gap-1">
								<Button
									variant="soft"
									color="primary"
									className="lg:hidden"
									onClick={() => setMobileInspectorOpen(true)}>
									<IconSlot slot="file-code" />
									<span>Changes</span>
								</Button>

								<Tooltip>
									<TooltipTrigger asChild>
										<IconButton
											variant="ghost"
											color="neutral"
											size="xs"
											aria-label="Share session">
											<IconSlot slot="upload" />
										</IconButton>
									</TooltipTrigger>
									<TooltipContent withArrow>Share session</TooltipContent>
								</Tooltip>

								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<IconButton
											variant="ghost"
											color="neutral"
											size="xs"
											aria-label="Session options">
											<IconSlot slot="threeDot" />
										</IconButton>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="center" className="w-44">
										<DropdownMenuItem onClick={handleNewAgent}>
											<IconSlot slot="plus" />
											New session
										</DropdownMenuItem>
										<DropdownMenuItem onClick={handleCopyCode}>
											<IconSlot slot="clipboard-check" />
											Copy code patch
										</DropdownMenuItem>
										<DropdownMenuDivider />
										<DropdownMenuItem>
											<IconSlot slot="pin" />
											Pin thread
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</header>

						{/* Scrollable Conversation Area (bottom-aligned above composer without clipping top) */}
						<div className="min-h-0 flex-1 [scrollbar-width:none] overflow-y-auto [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
							<div className="flex min-h-full w-full flex-col gap-3 px-3 pt-4 pb-2 sm:px-5">
								<div className="mt-auto flex w-full flex-col gap-3">
									{/* User Prompt Card (Right Aligned) */}
									<AnimatePresence mode="wait">
										<motion.div
											key={activeThread.id}
											initial={{ opacity: 0, y: 8 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -4 }}
											transition={{ duration: 0.18 }}
											className="flex justify-end">
											<Card className="border-border bg-elevation-level1 ms-auto me-0 w-fit max-w-[85%] border px-3 py-[11px] text-sm leading-relaxed shadow-xs sm:max-w-[70%] lg:-me-1.5 lg:max-w-[calc(50%+6px)]">
												<span className="text-fg">{activeThread.prompt}</span>
											</Card>
										</motion.div>
									</AnimatePresence>

									{/* Assistant Reply & File Card (or Initial Thinking State) */}
									<AnimatePresence mode="wait">
										{thinkingPhase === "prompt" &&
										customMessages.length === 0 ? null : isThinking &&
										  customMessages.length === 0 ? (
											<AgentThinkingBlock
												key="initial-thinking"
												elapsedSeconds={thinkingElapsed}
												activeStepIndex={thinkingStep}
												showSteps={thinkingPhase === "steps"}
											/>
										) : (
											<motion.div
												key={activeThread.id}
												initial={{ opacity: 0, y: 8 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -4 }}
												transition={{ duration: 0.2 }}
												className="flex flex-col gap-2">
												<p className="text-fg text-sm leading-relaxed">
													{activeThread.reply}
												</p>

												<Card className="border-border bg-elevation-level1 w-full min-w-0 gap-0 overflow-hidden border p-0 shadow-xs">
													{/* File Card Header */}
													<div className="border-border flex h-9 items-center justify-between gap-3 border-b px-2.5">
														<div className="flex min-w-0 items-center gap-2">
															<Badge color="primary" size="sm">
																{activeThread.fileLang}
															</Badge>
															<span className="text-fg truncate font-mono text-xs font-medium">
																{activeThread.fileName}
															</span>
														</div>

														<div className="flex shrink-0 items-center gap-2">
															<span className="text-success text-xs font-medium tabular-nums">
																+{activeThread.additions}
															</span>
															<span className="text-error text-xs font-medium tabular-nums">
																-{activeThread.deletions}
															</span>
															<Tooltip>
																<TooltipTrigger asChild>
																	<IconButton
																		variant="ghost"
																		color="neutral"
																		size="xs"
																		onClick={handleCopyCode}
																		aria-label="Copy snippet">
																		<AnimatePresence mode="wait">
																			<motion.span
																				key={copiedCode ? "check" : "copy"}
																				initial={{ opacity: 0, scale: 0.75 }}
																				animate={{ opacity: 1, scale: 1 }}
																				exit={{ opacity: 0, scale: 0.75 }}
																				transition={{ duration: 0.14 }}
																				className="inline-flex">
																				{copiedCode ? (
																					<IconSlot
																						slot="check"
																						className="size-3.5"
																					/>
																				) : (
																					<Copy className="size-3.5" />
																				)}
																			</motion.span>
																		</AnimatePresence>
																	</IconButton>
																</TooltipTrigger>
																<TooltipContent withArrow>
																	{copiedCode ? "Copied" : "Copy code"}
																</TooltipContent>
															</Tooltip>
														</div>
													</div>

													{/* Numbered Code Block */}
													<ScrollArea className="w-full">
														<div className="px-3 py-2.5 font-mono text-xs leading-4.5">
															{activeThread.codeLines.map((line, index) => (
																<div
																	key={index}
																	className="flex items-start gap-4 whitespace-pre">
																	<span className="text-fg-tertiary w-4 shrink-0 text-right tabular-nums select-none">
																		{index + 1}
																	</span>
																	<span>
																		{line ? (
																			<SyntaxCodeLine text={line} />
																		) : (
																			" "
																		)}
																	</span>
																</div>
															))}
														</div>
														<ScrollBar orientation="horizontal" />
													</ScrollArea>
												</Card>

												{/* Message Feedback Actions */}
												<div className="flex items-center gap-1.5">
													<Tooltip>
														<TooltipTrigger asChild>
															<IconButton
																variant="soft"
																size="xs"
																color={
																	reaction === "up" ? "primary" : "neutral"
																}
																onClick={() =>
																	setReaction((prev) =>
																		prev === "up" ? null : "up"
																	)
																}
																aria-label="Helpful response">
																<IconSlot slot="thumbs-up" />
															</IconButton>
														</TooltipTrigger>
														<TooltipContent withArrow>Helpful</TooltipContent>
													</Tooltip>

													<Tooltip>
														<TooltipTrigger asChild>
															<IconButton
																variant="soft"
																size="xs"
																color={
																	reaction === "down" ? "error" : "neutral"
																}
																onClick={() =>
																	setReaction((prev) =>
																		prev === "down" ? null : "down"
																	)
																}
																aria-label="Needs work">
																<IconSlot slot="thumbs-down" />
															</IconButton>
														</TooltipTrigger>
														<TooltipContent withArrow>
															Needs work
														</TooltipContent>
													</Tooltip>

													<Tooltip>
														<TooltipTrigger asChild>
															<IconButton
																variant="soft"
																size="xs"
																color="neutral"
																onClick={handleCopyCode}
																aria-label="Copy response">
																<IconSlot
																	slot={
																		copiedCode ? "check" : "clipboard-check"
																	}
																/>
															</IconButton>
														</TooltipTrigger>
														<TooltipContent withArrow>Copy code</TooltipContent>
													</Tooltip>

													<Tooltip>
														<TooltipTrigger asChild>
															<IconButton
																variant="soft"
																size="xs"
																color="neutral"
																onClick={() => triggerThinkingCycle()}
																aria-label="Replay agent thinking">
																<IconSlot slot="repeat" />
															</IconButton>
														</TooltipTrigger>
														<TooltipContent withArrow>
															Replay thinking
														</TooltipContent>
													</Tooltip>
												</div>
											</motion.div>
										)}
									</AnimatePresence>

									{/* Appended Interactive Messages */}
									{customMessages.map((msg) => (
										<motion.div
											key={msg.id}
											initial={{ opacity: 0, y: 6 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.18 }}
											className={cn(
												"flex",
												msg.role === "user" ? "justify-end" : "justify-start"
											)}>
											{msg.role === "user" ? (
												<Card className="border-border bg-elevation-level1 max-w-lg border px-4 py-3 text-sm shadow-xs">
													<span className="text-fg">{msg.text}</span>
												</Card>
											) : (
												<p className="text-fg text-sm leading-relaxed">
													{msg.text}
												</p>
											)}
										</motion.div>
									))}

									{/* Animated Thinking & Steps Card for Follow-up Messages */}
									<AnimatePresence>
										{isThinking && customMessages.length > 0 && (
											<AgentThinkingBlock
												elapsedSeconds={thinkingElapsed}
												activeStepIndex={thinkingStep}
												showSteps={thinkingPhase === "steps"}
											/>
										)}
									</AnimatePresence>
								</div>
							</div>
						</div>

						{/* Bottom Composer & Repo Status Strip */}
						<div className="w-full shrink-0 px-3 pt-1 pb-3 sm:px-5">
							<Card className="border-border bg-elevation-level1 relative gap-2 overflow-hidden border p-1.5 shadow-none">
								<AnimatePresence>
									{isThinking && (
										<motion.svg
											key="composer-border"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0, transition: { duration: 0.15 } }}
											transition={{ duration: 0.2 }}
											className="pointer-events-none absolute inset-0 z-20 size-full"
											aria-hidden="true">
											<defs>
												<linearGradient
													id="composer-border-gradient"
													x1="0%"
													y1="0%"
													x2="100%"
													y2="100%">
													<stop
														offset="0%"
														stopColor="var(--color-info-border)"
														stopOpacity="0.95"
													/>
													<stop
														offset="50%"
														stopColor="var(--color-info)"
														stopOpacity="0.45"
													/>
													<stop
														offset="100%"
														stopColor="var(--color-error-border)"
														stopOpacity="0.85"
													/>
												</linearGradient>
											</defs>
											<motion.rect
												x="0"
												y="0"
												width="100%"
												height="100%"
												rx="12"
												fill="none"
												stroke="url(#composer-border-gradient)"
												strokeWidth="12"
												strokeLinecap="round"
												pathLength={100}
												strokeDasharray="36 64"
												initial={{ strokeDashoffset: 0 }}
												animate={{ strokeDashoffset: -100 }}
												transition={{
													repeat: Infinity,
													duration: 2.4,
													ease: "linear",
												}}
												style={{ filter: "blur(8px)", opacity: 0.45 }}
											/>
											<motion.rect
												x="0"
												y="0"
												width="100%"
												height="100%"
												rx="12"
												fill="none"
												stroke="url(#composer-border-gradient)"
												strokeWidth="1.25"
												strokeLinecap="round"
												pathLength={100}
												strokeDasharray="36 64"
												initial={{ strokeDashoffset: 0 }}
												animate={{ strokeDashoffset: -100 }}
												transition={{
													repeat: Infinity,
													duration: 2.4,
													ease: "linear",
												}}
											/>
										</motion.svg>
									)}
								</AnimatePresence>
								<AnimatePresence>
									{isThinking && (
										<motion.div
											key="composer-aurora"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0, transition: { duration: 0.15 } }}
											transition={{ duration: 0.2 }}
											className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
											<motion.div
												animate={{
													opacity: [0.7, 1, 0.7],
													x: ["-6%", "10%", "-6%"],
												}}
												transition={{
													opacity: {
														repeat: Infinity,
														duration: 2.6,
														ease: "easeInOut",
													},
													x: {
														repeat: Infinity,
														duration: 2.6,
														ease: "easeInOut",
													},
												}}
												style={{
													background:
														"linear-gradient(90deg, var(--color-info-accent) 0%, var(--color-info-focus) 45%, var(--color-error-accent) 82%, transparent 100%)",
													maskImage:
														"radial-gradient(ellipse 90% 105% at 18% 95%, black 0%, transparent 75%)",
													WebkitMaskImage:
														"radial-gradient(ellipse 90% 105% at 18% 95%, black 0%, transparent 75%)",
												}}
												className="absolute inset-y-0 left-0 w-3/4 blur-md"
											/>
										</motion.div>
									)}
								</AnimatePresence>
								<div className="relative z-10 flex flex-wrap items-center gap-2 sm:flex-nowrap">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<IconButton
												variant="soft"
												color="neutral"
												aria-label="Attach context">
												<IconSlot slot="plus" />
											</IconButton>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="start" className="w-72 p-1.5">
											<DropdownMenuLabel className="text-fg-tertiary text-xs">
												Add
											</DropdownMenuLabel>
											{ADD_MENU_ITEMS.map((item) => {
												const ItemIcon = item.icon
												return (
													<DropdownMenuItem key={item.id} className="gap-2">
														<ItemIcon className="text-fg-secondary size-4 shrink-0" />
														<span className="truncate">
															<span className="text-fg font-medium">
																{item.label}
															</span>
															{item.description && (
																<span className="text-fg-tertiary ml-1.5 text-xs">
																	{item.description}
																</span>
															)}
														</span>
													</DropdownMenuItem>
												)
											})}
											<DropdownMenuDivider />
											<DropdownMenuLabel className="text-fg-tertiary text-xs">
												Plugins
											</DropdownMenuLabel>
											{PLUGIN_MENU_ITEMS.map((item) => {
												return (
													<DropdownMenuItem key={item.id} className="gap-2">
														{"slot" in item ? (
															<IconSlot
																slot={item.slot}
																className={cn(
																	"size-4 shrink-0",
																	item.iconClass
																)}
															/>
														) : (
															<item.icon
																className={cn(
																	"size-4 shrink-0",
																	item.iconClass
																)}
															/>
														)}
														<span className="truncate">
															<span className="text-fg font-medium">
																{item.label}
															</span>
															<span className="text-fg-tertiary ml-1.5 text-xs">
																{item.description}
															</span>
														</span>
													</DropdownMenuItem>
												)
											})}
										</DropdownMenuContent>
									</DropdownMenu>

									<TextArea
										rows={1}
										resizable={false}
										value={composerValue}
										onChange={(e) => setComposerValue(e.target.value)}
										onKeyDown={(e) => {
											if (e.key === "Enter" && !e.shiftKey) {
												e.preventDefault()
												handleSendMessage()
											}
										}}
										placeholder="Ask me anything"
										className="min-h-8 min-w-[120px] flex-1 border-0 bg-transparent px-1 py-1.5 shadow-none focus:ring-0"
									/>

									<div className="ml-auto flex shrink-0 items-center gap-1">
										<DropdownMenu indicatorPosition="right">
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" color="neutral" size="sm">
													<span>{selectedModel}</span>
													<IconSlot slot="down" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent
												align="center"
												className="w-60 p-1.5">
												<DropdownMenuLabel className="text-fg-tertiary text-xs">
													Models
												</DropdownMenuLabel>
												<DropdownMenuRadioGroup
													value={selectedModel}
													onValueChange={(val) =>
														setSelectedModel(val as (typeof MODELS)[number])
													}>
													{MODELS.map((model) => (
														<DropdownMenuRadioItem key={model} value={model}>
															{model}
														</DropdownMenuRadioItem>
													))}
												</DropdownMenuRadioGroup>
												<DropdownMenuDivider />
												<div className="flex flex-col gap-2 px-2 py-1.5">
													<div className="flex items-center gap-1.5 text-xs">
														<span className="text-fg-tertiary">Effort</span>
														<span className="text-fg font-medium">
															{EFFORT_LEVELS[effortLevel[0] ?? 1]}
														</span>
													</div>
													<div className="text-fg-tertiary flex items-center justify-between text-xs">
														<span>Faster</span>
														<span>Smarter</span>
													</div>
													<Slider
														min={0}
														max={EFFORT_LEVELS.length - 1}
														step={1}
														value={effortLevel}
														onValueChange={setEffortLevel}
														aria-label="Model effort">
														<SliderThumb />
													</Slider>
												</div>
											</DropdownMenuContent>
										</DropdownMenu>

										<Tooltip>
											<TooltipTrigger asChild>
												<IconButton
													variant="soft"
													color="neutral"
													aria-label="Voice input">
													<Mic className="size-4" />
												</IconButton>
											</TooltipTrigger>
											<TooltipContent withArrow>Voice input</TooltipContent>
										</Tooltip>

										<IconButton
											color="primary"
											onClick={handleSendMessage}
											aria-label="Send message">
											<IconSlot slot="up" />
										</IconButton>
									</div>
								</div>
							</Card>

							{/* Git Branch, Project, Mode & Context Progress */}
							<div className="flex flex-wrap items-center justify-between gap-2 px-1 pt-2">
								<div className="flex items-center gap-1">
									<Button variant="ghost" color="neutral" size="xs">
										<IconSlot slot="git-branch" />
										<span>{selectedBranch}</span>
									</Button>

									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" color="neutral" size="xs">
												<IconSlot slot="archive" />
												<span>{selectedProject}</span>
												<IconSlot slot="down" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="start" className="w-64 p-1.5">
											<DropdownMenuLabel className="text-fg-tertiary text-xs">
												Local Folders
											</DropdownMenuLabel>
											<DropdownMenuRadioGroup
												value={selectedProject}
												onValueChange={(val) =>
													setSelectedProject(
														val as (typeof PROJECTS)[number]["id"]
													)
												}>
												{PROJECTS.map((project) => (
													<DropdownMenuRadioItem
														key={project.id}
														value={project.id}
														className="gap-2">
														<Folder className="text-fg-tertiary size-4 shrink-0" />
														<span className="truncate">
															<span className="text-fg-tertiary">
																{project.prefix}
															</span>
															<span className="text-fg font-medium">
																{project.name}
															</span>
														</span>
													</DropdownMenuRadioItem>
												))}
											</DropdownMenuRadioGroup>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>

								<div className="flex items-center gap-2">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" color="neutral" size="xs">
												<IconSlot slot="repeat" />
												<span>{selectedMode}</span>
												<IconSlot slot="down" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end" className="w-36">
											<DropdownMenuRadioGroup
												value={selectedMode}
												onValueChange={(val) =>
													setSelectedMode(val as (typeof MODES)[number])
												}>
												{MODES.map((mode) => (
													<DropdownMenuRadioItem key={mode} value={mode}>
														{mode}
													</DropdownMenuRadioItem>
												))}
											</DropdownMenuRadioGroup>
										</DropdownMenuContent>
									</DropdownMenu>

									<Tooltip>
										<TooltipTrigger asChild>
											<Badge color="neutral" className="gap-1.5 tabular-nums">
												<Progress value={57} className="w-6" />
												<span>57%</span>
											</Badge>
										</TooltipTrigger>
										<TooltipContent withArrow>
											Context window usage: 57%
										</TooltipContent>
									</Tooltip>
								</div>
							</div>
						</div>
					</Card>

					{/* Right Inspector Panel (Desktop lg+) */}
					<aside className="bg-bg hidden shrink-0 flex-col overflow-hidden lg:flex lg:w-[340px] xl:w-[434px]">
						<InspectorPanelContent
							inspectorTab={inspectorTab}
							onTabChange={setInspectorTab}
							selectedFileId={selectedFileId}
							onSelectFileId={setSelectedFileId}
						/>
					</aside>
				</SidebarInset>
			</SidebarProvider>

			{/* Mobile / Tablet Inspector Drawer (< xl) */}
			<Drawer
				open={mobileInspectorOpen}
				onOpenChange={setMobileInspectorOpen}
				direction="right"
				handle={false}>
				<DrawerContent className="bg-elevation-level1 w-full max-w-md p-0">
					<DrawerTitle className="hidden">Changes and Browser</DrawerTitle>
					<InspectorPanelContent
						inspectorTab={inspectorTab}
						onTabChange={setInspectorTab}
						selectedFileId={selectedFileId}
						onSelectFileId={setSelectedFileId}
					/>
				</DrawerContent>
			</Drawer>
		</div>
	)
}
