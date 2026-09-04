"use client"

import { useState } from "react"
import { Settings, Star } from "lucide-react"
import {
	AVATARS,
	copyRandomAvatar,
	getToneStyle,
} from "@/constants/avatar-playground-utils"
import { useAvatarPlayground } from "@/hooks/avatar/use-avatar-playground"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/button"
import { Skeleton } from "@/registry/ui/skeleton"
import { AvatarTile } from "./AvatarTile"
import CategoryFilterDropdown from "./CategoryFilterDropdown"
import ConfigPreferencesDialog from "./ConfigPreferencesDialog"
import { showCopiedToast } from "./CopiedToast"
import FigmaCustomIcon from "./FigmaCustomIcon"
import ToneFilterDropdown from "./ToneFilterDropdown"

const AvatarPlayground = () => {
	const {
		category,
		setCategory,
		tone,
		handleToneChange,
		configOpen,
		setConfigOpen,
		copyFormat,
		setCopyFormat,
		// colorMode,
		// setColorMode,
		showShadow,
		handleShowShadowChange,
		useCompressedAvatars,
		handleUseCompressedAvatarsChange,
		favorites,
		toggleFavorite,
		isBlocked,
		isHydrated,
		sentinelRef,
		bottomSentinelRef,
		resolvedTones,
		displayedAvatars,
	} = useAvatarPlayground()
	const [isCopyingRandom, setIsCopyingRandom] = useState(false)

	return (
		<div className="flex w-full flex-col gap-4 py-2">
			<div ref={sentinelRef} className="pointer-events-none h-px w-full" />
			<div className="bg-bg/95 sticky top-0 z-100 flex w-full items-center justify-between py-3 backdrop-blur-sm">
				<CategoryFilterDropdown
					value={category}
					onChange={setCategory}
					favoriteCount={favorites.size}
				/>

				<div className="flex items-center gap-2">
					<ToneFilterDropdown
						value={tone}
						onChange={handleToneChange}
						// colorMode={colorMode}
					/>

					<IconButton
						color="neutral"
						variant="outline"
						onClick={() => setConfigOpen(true)}>
						<Settings className="text-fg-secondary" />
					</IconButton>

					<IconButton
						type="button"
						color="neutral"
						variant="outline"
						loading={isCopyingRandom}
						disabled={isCopyingRandom}
						onClick={async () => {
							if (isCopyingRandom) return
							setIsCopyingRandom(true)
							try {
								const randomIdx = Math.floor(Math.random() * AVATARS.length)
								const randomTone = resolvedTones[randomIdx]
								const result = await copyRandomAvatar(randomTone, showShadow)
								if (result) {
									showCopiedToast({
										src: result.src,
										index: result.index,
										tone: randomTone,
										showShadow,
										description: "PNG has been copied to your clipboard.",
									})
								}
							} finally {
								setIsCopyingRandom(false)
							}
						}}>
						<FigmaCustomIcon />
					</IconButton>
				</div>
			</div>

			{!isHydrated ? (
				<div
					aria-label="Loading avatars"
					className="grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-7">
					{Array.from({ length: 42 }).map((_, i) => (
						<Skeleton key={i} className="aspect-square w-full rounded-xl" />
					))}
				</div>
			) : displayedAvatars.length === 0 ? (
				<div className="border-soft bg-bg/50 flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
					{category === "favorites" ? (
						<>
							<Star className="text-fg-secondary mb-3 size-10" />
							<p className="text-sm font-medium">No favorite avatars yet</p>
							<p className="text-fg-secondary mt-1 text-xs">
								Click the 3 dots menu on any avatar tile to add it to your
								favorites.
							</p>
						</>
					) : (
						<>
							<p className="text-sm font-medium">No avatars found</p>
							<p className="text-fg-secondary mt-1 text-xs">
								Try selecting a different category.
							</p>
						</>
					)}
				</div>
			) : (
				<ul
					suppressHydrationWarning
					aria-label="Available UI avatar illustrations"
					className={cn(
						"grid list-none grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-6",
						isBlocked && "pointer-events-none"
					)}>
					{displayedAvatars.map(({ src, displaySrc, index }) => {
						const tileTone = resolvedTones[index]
						return (
							<AvatarTile
								key={src}
								src={displaySrc}
								index={index}
								toneStyle={getToneStyle(tileTone)}
								tone={tileTone}
								copyFormat={copyFormat}
								showShadow={showShadow}
								isFavorite={favorites.has(src)}
								onToggleFavorite={() => toggleFavorite(src)}
							/>
						)
					})}
				</ul>
			)}

			<div
				ref={bottomSentinelRef}
				className="pointer-events-none h-px w-full"
			/>

			<ConfigPreferencesDialog
				open={configOpen}
				onOpenChange={setConfigOpen}
				copyFormat={copyFormat}
				onCopyFormatChange={setCopyFormat}
				// colorMode={colorMode}
				// onColorModeChange={setColorMode}
				showShadow={showShadow}
				onShowShadowChange={handleShowShadowChange}
				useCompressedAvatars={useCompressedAvatars}
				onUseCompressedAvatarsChange={handleUseCompressedAvatarsChange}
				onToneChange={handleToneChange}
			/>
		</div>
	)
}

export default AvatarPlayground
