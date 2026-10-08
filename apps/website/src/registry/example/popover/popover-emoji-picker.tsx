"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
	Bus,
	Cat,
	Flag,
	Hash,
	History,
	Music,
	Plus,
	Search,
	Shirt,
	Smile,
	Utensils,
	Volleyball,
} from "lucide-react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { toast } from "sonner"
import {
	cacheCopiedEmojiSkinTone,
	emojiSkinToneEvent,
	readEmojiSkinTone,
} from "@/lib/emoji/emoji-skin-tone"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/button"
import { Input, InputWrapper } from "@/registry/ui/input"
import {
	Popover,
	PopoverAnchor,
	PopoverContent,
	PopoverTrigger,
} from "@/registry/ui/popover"
import { ScrollArea } from "@/registry/ui/scroll-area"
import {
	emojis,
	emojiGroups,
	formatEmojiName,
	getEmojiSkinToneVariants,
	skinTones,
	type EmojiData,
} from "@/lib/emoji/emoji-data"
import { getSupportedEmojis } from "@/lib/emoji/emoji-support"

const quick = ["👍", "❤️", "😀", "😢", "🙏", "👎", "😡"]
const icons = [Smile, Shirt, Cat, Utensils, Bus, Volleyball, Music, Hash, Flag]
const storageKey = "radian-emoji-picker-recent"

export default function PopoverEmojiPicker({
	onCopied,
}: { onCopied?: (value: string) => void } = {}) {
	const [open, setOpen] = useState(false)
	const [search, setSearch] = useState("")
	const [recent, setRecent] = useState<string[]>([])
	const [supported, setSupported] = useState<EmojiData[] | null>(null)
	const [tone, setTone] = useState(-1)
	const [preview, setPreview] = useState<EmojiData | null>(null)
	const [category, setCategory] = useState(emojiGroups[0].slug)
	const [viewport, setViewport] = useState<HTMLElement | null>(null)
	const attachScrollArea = useCallback((node: HTMLDivElement | null) => {
		setViewport(
			node?.querySelector<HTMLElement>('[data-slot="scroll-area-viewport"]') ??
				null
		)
	}, [])
	useEffect(() => {
		let current = true
		getSupportedEmojis().then((items) => {
			if (current) setSupported(items)
		})
		try {
			const saved: unknown = JSON.parse(
				localStorage.getItem(storageKey) ?? "null"
			)
			if (
				Array.isArray(saved) &&
				saved.every((item) => typeof item === "string")
			)
				setRecent(
					[...new Set(saved)]
						.filter((value) => emojis.some((item) => item.emoji === value))
						.slice(0, 16)
				)
		} catch {
			/* Storage is optional. */
		}
		return () => {
			current = false
		}
	}, [])
	useEffect(() => {
		setTone(readEmojiSkinTone())
		const syncTone = (event: Event) =>
			setTone((event as CustomEvent<number>).detail)
		const syncStorage = () => setTone(readEmojiSkinTone())
		window.addEventListener(emojiSkinToneEvent, syncTone)
		window.addEventListener("storage", syncStorage)
		return () => {
			window.removeEventListener(emojiSkinToneEvent, syncTone)
			window.removeEventListener("storage", syncStorage)
		}
	}, [])
	const available = supported ?? emojis
	const byEmoji = useMemo(
		() => new Map(available.map((item) => [item.emoji, item])),
		[available]
	)
	const frequent = useMemo(
		() =>
			recent.flatMap((value) => {
				const item = byEmoji.get(value)
				return item ? [item] : []
			}),
		[recent, byEmoji]
	)
	const groups = useMemo(() => {
		const query = search.trim().toLowerCase().replaceAll("_", " ")
		return emojiGroups
			.map((group) => ({
				...group,
				emojis: (supported ?? group.emojis).filter(
					(item) =>
						item.group === group.name &&
						(!query ||
							`${item.name} ${item.group}`.toLowerCase().includes(query))
				),
			}))
			.filter((group) => group.emojis.length)
	}, [search, supported])
	function glyph(item: EmojiData) {
		return tone < 0
			? item.emoji
			: (getEmojiSkinToneVariants(item)[tone]?.emoji ?? item.emoji)
	}
	async function copy(item: EmojiData) {
		const value = glyph(item)
		try {
			await navigator.clipboard.writeText(value)
			cacheCopiedEmojiSkinTone(value)
			const next = [
				item.emoji,
				...recent.filter((emoji) => emoji !== item.emoji),
			].slice(0, 16)
			setRecent(next)
			try {
				localStorage.setItem(storageKey, JSON.stringify(next))
			} catch {
				/* Storage is optional. */
			}
			if (onCopied) onCopied(value)
			else toast.success(`${value} copied to clipboard`)

			setOpen(false)
		} catch {
			toast.error("Could not copy emoji")
		}
	}
	const rows = useMemo(() => {
		const sections = [
			...(!search.trim() && frequent.length > 0
				? [{ slug: "frequent", name: "Frequently Used", emojis: frequent }]
				: []),
			...groups,
		]
		return sections.flatMap((group) => [
			{ key: group.slug, label: group.name, items: [] as EmojiData[] },
			...Array.from(
				{ length: Math.ceil(group.emojis.length / 8) },
				(_, index) => ({
					key: `${group.slug}-${index}`,
					label: "",
					items: group.emojis.slice(index * 8, index * 8 + 8),
				})
			),
		])
	}, [groups, frequent, search])
	const virtualizer = useVirtualizer({
		count: rows.length,
		getScrollElement: () => viewport,
		initialRect: { width: 336, height: 288 },
		estimateSize: () => 40,
		getItemKey: (index) => rows[index].key,
		overscan: 3,
		enabled: open,
	})
	useEffect(() => {
		if (open && viewport) {
			virtualizer.scrollToOffset(0)
			setCategory(frequent.length ? "frequent" : emojiGroups[0].slug)
		}
	}, [search, open, viewport, virtualizer, frequent.length])
	const [pendingCategory, setPendingCategory] = useState<string | null>(null)
	useEffect(() => {
		if (!pendingCategory || search) return
		const index = rows.findIndex((row) => row.key === pendingCategory)
		if (index >= 0) virtualizer.scrollToIndex(index, { align: "start" })
		setPendingCategory(null)
	}, [pendingCategory, search, rows, virtualizer])
	function jump(slug: string) {
		setSearch("")
		setCategory(slug)
		setPendingCategory(slug)
	}
	function emojiButton(item: EmojiData) {
		return (
			<IconButton
				key={item.slug}
				variant="ghost"
				color="neutral"
				size="40"
				className="w-full rounded-lg"
				aria-label={`Copy ${item.name}`}
				title={formatEmojiName(item.name)}
				onMouseEnter={() => setPreview(item)}
				onFocus={() => setPreview(item)}
				onClick={() => void copy(item)}>
				<span
					className={cn("font-emoji", "text-[28px] leading-none")}
					aria-hidden="true">
					{glyph(item)}
				</span>
			</IconButton>
		)
	}
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverAnchor asChild>
				<div className="bg-elevation-level1/65 border-alpha flex h-12 max-w-full items-center gap-0.5 rounded-full border px-1.5 shadow-xs backdrop-blur-md">
					{quick.map((value) => {
						const item = byEmoji.get(value)
						return item ? (
							<IconButton
								key={value}
								variant="ghost"
								color="neutral"
								size="36"
								className="group rounded-full"
								aria-label={`Copy ${item.name}`}
								onClick={() => void copy(item)}>
								<span
									className={cn(
										"font-emoji",
										"text-2xl transition-transform duration-200 ease-out group-hover:scale-125 group-focus-visible:scale-125 motion-reduce:transition-none"
									)}
									aria-hidden="true">
									{glyph(item)}
								</span>
							</IconButton>
						) : null
					})}

					<PopoverTrigger asChild>
						<IconButton
							variant="ghost"
							color="neutral"
							size="36"
							className="text-fg-tertiary rounded-full"
							aria-label="Open emoji picker">
							<Plus />
						</IconButton>
					</PopoverTrigger>
				</div>
			</PopoverAnchor>
			<PopoverContent
				align="center"
				sideOffset={12}
				aria-label="Emoji picker"
				className="flex max-h-[var(--radix-popover-content-available-height)] w-90 max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl p-0">
				<div className="flex shrink-0 items-center gap-2 p-3">
					<InputWrapper
						size="32"
						className="bg-fill1-alpha min-w-0 flex-1 border-transparent has-[:focus-visible]:border-transparent has-[:focus-visible]:ring-0">
						<Search />
						<Input
							aria-label="Search emojis"
							placeholder="Search"
							value={search}
							onChange={(event) => setSearch(event.target.value)}
						/>
					</InputWrapper>
					<IconButton
						variant="ghost"
						color="neutral"
						size="32"
						onClick={() =>
							setTone((current) => (current === 4 ? -1 : current + 1))
						}
						aria-label={`Skin tone: ${tone < 0 ? "Default" : skinTones[tone]?.label}. Click to change.`}>
						<span className={cn("font-emoji", "text-xl")} aria-hidden="true">
							{tone < 0 ? "✋" : `✋${skinTones[tone]?.modifier}`}
						</span>
					</IconButton>
				</div>
				<nav
					aria-label="Emoji categories"
					className="flex shrink-0 justify-between gap-0.5 px-3 pb-2">
					{frequent.length > 0 && (
						<IconButton
							size="28"
							variant="ghost"
							color="neutral"
							aria-label="Frequently used"
							aria-pressed={category === "frequent"}
							className={cn(
								"text-fg-tertiary",
								category === "frequent" && "bg-fill2!"
							)}
							onClick={() => jump("frequent")}>
							<History />
						</IconButton>
					)}
					{emojiGroups.map((group, index) => {
						const Icon = icons[index] ?? Smile
						return (
							<IconButton
								key={group.slug}
								size="28"
								variant="ghost"
								color="neutral"
								aria-label={group.name}
								title={group.name}
								aria-pressed={category === group.slug}
								className={cn(
									"text-fg-tertiary",
									category === group.slug && "bg-fill2!"
								)}
								onClick={() => jump(group.slug)}>
								<Icon />
							</IconButton>
						)
					})}
				</nav>
				<ScrollArea ref={attachScrollArea} className="h-72 min-h-0 shrink">
					<div
						className="relative mx-3"
						style={{ height: virtualizer.getTotalSize() }}>
						{virtualizer.getVirtualItems().map((row) => {
							const data = rows[row.index]
							return (
								<div
									key={row.key}
									className="absolute top-0 left-0 w-full"
									style={{
										height: row.size,
										transform: `translateY(${row.start}px)`,
									}}>
									{data.label ? (
										<h3 className="text-fg-secondary flex h-10 items-center px-1 text-sm font-semibold">
											{data.label}
										</h3>
									) : (
										<div className="grid grid-cols-8">
											{data.items.map(emojiButton)}
										</div>
									)}
								</div>
							)
						})}
					</div>
					{!groups.length && (
						<p className="text-fg-tertiary py-8 text-center text-sm">
							No emojis found. Try another search.
						</p>
					)}
				</ScrollArea>
				<div className="border-alpha flex min-h-18 shrink-0 items-center gap-3 border-t px-4 py-3">
					<span className={cn("font-emoji", "text-4xl")} aria-hidden="true">
						{preview ? glyph(preview) : "😊"}
					</span>
					<div className="min-w-0">
						<p className="truncate text-sm font-medium">
							{preview ? formatEmojiName(preview.name) : "What's Your Mood?"}
						</p>
						<p className="text-fg-tertiary text-xs">Choose an emoji to copy</p>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}
