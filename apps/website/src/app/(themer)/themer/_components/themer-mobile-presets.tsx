import { type CSSProperties, useState } from "react"
import { useTheme } from "next-themes"
import { ChevronLeft, RotateCcw, Search, Shuffle } from "lucide-react"
import { IconButton } from "@/styles/default/ui/button"
import { Input } from "@/styles/default/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/styles/default/ui/tabs"
import {
	DrawerClose,
	DrawerDescription,
	DrawerTitle,
} from "@/registry/ui/drawer"
import { useThemerStore } from "@/lib/themer-store"
import { PRIMARY_COLORS } from "@/registry/primary-colors"
import { THEMER_PRESET_GROUPS } from "./preset-picker"

type PresetAppearance =
	| { domain: string; logo: string }
	| { colors: readonly [string, string, string, string] }

type Preset = { name: string } & PresetAppearance
type PresetId =
	(typeof THEMER_PRESET_GROUPS)[number]["presets"][number]["value"]

const presetAppearance: Record<PresetId, PresetAppearance> = {
	google: {
		domain: "google.com",
		logo: "technology/icon/google",
	},
	spotify: {
		domain: "spotify.com",
		logo: "entertainment-gaming/icon/spotify",
	},
	notion: {
		domain: "notion.so",
		logo: "productivity-work/icon/notion",
	},
	apple: {
		domain: "apple.com",
		logo: "technology/icon/apple",
	},
	x: {
		domain: "x.com",
		logo: "social-content/icon/x",
	},
	forest: { colors: ["emerald", "green", "amber", "teal"] },
	ocean: { colors: ["blue", "cyan", "teal", "violet-blue"] },
	sunset: { colors: ["orange", "red", "amber", "fuchsia"] },
	midnight: { colors: ["violet-blue", "neutral", "purple", "blue"] },
	desert: { colors: ["amber", "orange", "yellow", "rose"] },
	tundra: { colors: ["light-blue", "cyan", "neutral", "blue"] },
	galaxy: { colors: ["purple", "fuchsia", "violet-blue", "cyan"] },
	volcanic: { colors: ["red", "orange", "amber", "neutral"] },
	coral: { colors: ["rose", "orange", "red", "teal"] },
}

const groups = THEMER_PRESET_GROUPS.map(({ group, presets }) => ({
	label: group,
	presets: presets.map(({ title, value }) => ({
		name: title,
		...presetAppearance[value],
	})),
}))

function PresetIcon({ preset }: { preset: Preset }) {
	if ("domain" in preset) {
		const fallback = `https://www.google.com/s2/favicons?sz=32&domain=${preset.domain}`
		return (
			<img
				alt=""
				width={20}
				height={20}
				className="size-5 object-contain"
				src={
					preset.logo
						? `https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/colored/${preset.logo}.svg`
						: fallback
				}
				onError={(event) => {
					if (event.currentTarget.src !== fallback)
						event.currentTarget.src = fallback
				}}
			/>
		)
	}

	return (
		<span
			aria-hidden="true"
			className="bg-fill1 grid size-5 grid-cols-2 gap-0.5 rounded p-0.5">
			{preset.colors.map((color) => (
				<span
					key={color}
					className="rounded-[2px]"
					style={{
						backgroundColor: PRIMARY_COLORS.find(
							(entry) => entry.value === color
						)?.cssVars.light["--color-primary"],
					}}
				/>
			))}
		</span>
	)
}

export function ThemerMobilePresets() {
	const primaryColor = useThemerStore((state) => state.params.primaryColor)
	const { resolvedTheme } = useTheme()
	const mode = resolvedTheme === "dark" ? "dark" : "light"
	const primary = PRIMARY_COLORS.find((color) => color.value === primaryColor)
	const presetBorder =
		primary?.cssVars[mode]["--color-primary"] ??
		(primaryColor.startsWith("#") ? primaryColor : "var(--color-violet-blue)")
	const [selected, setSelected] = useState("")
	const [searchOpen, setSearchOpen] = useState(false)
	const [query, setQuery] = useState("")

	return (
		<div
			className="flex flex-col gap-4 px-3 pb-[max(12px,env(safe-area-inset-bottom))]"
			style={{ "--preset-border": presetBorder } as CSSProperties}>
			<div className="flex touch-none items-center justify-between">
				<div className="flex items-center gap-2">
					<DrawerClose>
						<IconButton
							size="md"
							variant="ghost"
							color="neutral"
							aria-label="Close preset drawer"
							className="text-fg-secondary">
							<ChevronLeft />
						</IconButton>
					</DrawerClose>
					<DrawerTitle className="text-fg text-base font-medium">
						Preset
					</DrawerTitle>
				</div>
				<DrawerDescription className="sr-only">
					Browse brand and theme presets.
				</DrawerDescription>
				<div className="flex items-center gap-2">
					<IconButton
						size="md"
						variant="ghost"
						color="neutral"
						aria-label="Search presets"
						aria-expanded={searchOpen}
						className="text-fg-secondary"
						onClick={() => {
							setSearchOpen(!searchOpen)
							setQuery("")
						}}>
						<Search />
					</IconButton>
					<IconButton
						size="md"
						variant="ghost"
						color="neutral"
						aria-label="Reset preset colors"
						className="text-fg-secondary"
						disabled>
						<RotateCcw />
					</IconButton>
					<IconButton
						size="md"
						variant="ghost"
						color="neutral"
						aria-label="Shuffle presets"
						className="text-fg-secondary"
						disabled>
						<Shuffle />
					</IconButton>
				</div>
			</div>
			{searchOpen && (
				<Input
					autoFocus
					size="sm"
					aria-label="Search presets"
					placeholder="Search presets"
					value={query}
					onChange={(event) => setQuery(event.target.value)}
				/>
			)}
			{groups.map(({ label, presets }) => {
				const visible = presets.filter((preset) =>
					preset.name.toLowerCase().includes(query.trim().toLowerCase())
				)
				if (!visible.length) return null
				return (
					<section key={label} className="flex flex-col gap-2">
						<h3 className="text-fg-tertiary text-xs font-medium">{label}</h3>
						<Tabs value={selected} onValueChange={setSelected}>
							<TabsList
								aria-label={label}
								variant="ghost"
								className="h-auto! w-full min-w-0 flex-wrap gap-1 overflow-visible p-0">
								{visible.map((preset) => (
									<TabsTrigger
										key={preset.name}
										value={preset.name}
										className="text-fg-secondary data-[state=active]:bg-bg data-[state=active]:text-fg flex h-auto flex-col gap-1 rounded-[10px] border border-transparent px-4 py-2.5 text-xs leading-tight font-medium focus-visible:border-(--preset-border) focus-visible:ring-0 data-[state=active]:rounded-[10px] data-[state=active]:border-(--preset-border)">
										<PresetIcon preset={preset} />
										<span className="text-center">{preset.name}</span>
									</TabsTrigger>
								))}
							</TabsList>
						</Tabs>
					</section>
				)
			})}
		</div>
	)
}
