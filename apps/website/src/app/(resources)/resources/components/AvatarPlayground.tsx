"use client"

import { useCallback, useMemo, useState } from "react"
import { Settings } from "lucide-react"
import { toast } from "sonner"
import { Button, IconButton } from "@/registry/ui/button"
import { AvatarTile } from "./AvatarTile"
import CategoryFilterDropdown from "./CategoryFilterDropdown"
import ConfigPreferencesDialog from "./ConfigPreferencesDialog"
import FigmaCustomIcon from "./FigmaCustomIcon"
import { BACKGROUNDS } from "./ToneFilterDropdown"
import ToneFilterDropdown from "./ToneFilterDropdown"
import {
	AVATARS,
	CATEGORY_AVATAR_MAP,
	copyRandomAvatar,
	getToneStyle,
	randomSolidMapColor,
} from "./avatar-playground-utils"

const AvatarPlayground = () => {
	type ColorMode = "static" | "radian"

	const [category, setCategory] = useState("all")
	const [tone, setTone] = useState("neutral")
	const [randomTrigger, setRandomTrigger] = useState(0)
	const [configOpen, setConfigOpen] = useState(false)
	const [copyFormat, setCopyFormat] = useState("editable-bg")
	const [colorMode, setColorMode] = useState<ColorMode>("static")

	const handleToneChange = useCallback((value: string) => {
		if (
			value === "pick-color" ||
			value === "pick-gradient" ||
			value === "pick-background"
		) {
			setTone(value)
			setRandomTrigger((prev) => prev + 1)
		} else {
			setTone(value)
		}
	}, [])

	const resolvedTones = useMemo(() => {
		return AVATARS.map(() => {
			if (tone === "pick-color") {
				return randomSolidMapColor()
			}
			if (tone === "pick-gradient") {
				const from = randomSolidMapColor()
				const to = randomSolidMapColor()
				return `grad-custom:${from}:${to}`
			}
			if (tone === "pick-background") {
				return BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)]
			}
			return tone
		})
	}, [tone, randomTrigger])

	return (
		<div className="flex w-full flex-col gap-4">
			<div className="flex w-full items-center justify-between">
				<CategoryFilterDropdown value={category} onChange={setCategory} />

				<div className="flex items-center gap-2">
					<ToneFilterDropdown
						value={tone}
						onChange={handleToneChange}
						colorMode={colorMode}
					/>

					<Button
						color="neutral"
						variant="outline"
						onClick={() => setConfigOpen(true)}>
						<Settings className="text-fg-secondary" />
						<p className="hidden sm:block">Config</p>
					</Button>

					<IconButton
						type="button"
						color="neutral"
						variant="outline"
						onClick={async () => {
							const avatarSrc = await copyRandomAvatar()
							if (avatarSrc) {
								toast.custom(() => (
									<div className="bg-black-inverse text-fg-inverse sm:w-75 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 shadow-[0_16px_24px_-4px_rgba(25,24,27,0.12)]">
										<img
											src={avatarSrc}
											alt=""
											className="size-10 rounded-lg object-cover"
										/>
										<div className="text-fg-inverse space-y-0.5 text-sm">
											<p className="font-semibold">
												Avatar copied to clipboard
											</p>
											<p>Paste in Figma to use</p>
										</div>
									</div>
								))
							}
						}}>
						<FigmaCustomIcon />
					</IconButton>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-7">
				{AVATARS.map((src, index) => {
					const avatarNumber = Number(src.match(/\d+/)?.[0])
					if (
						category !== "all" &&
						!CATEGORY_AVATAR_MAP[category]?.includes(avatarNumber)
					) {
						return null
					}
					const tileTone = resolvedTones[index]
					return (
						<AvatarTile
							key={src}
							src={src}
							index={index}
							toneStyle={getToneStyle(tileTone)}
							tone={tileTone}
							copyFormat={copyFormat}
						/>
					)
				})}
			</div>

			<ConfigPreferencesDialog
				open={configOpen}
				onOpenChange={setConfigOpen}
				copyFormat={copyFormat}
				onCopyFormatChange={setCopyFormat}
				colorMode={colorMode}
				onColorModeChange={setColorMode}
			/>
		</div>
	)
}

export default AvatarPlayground
