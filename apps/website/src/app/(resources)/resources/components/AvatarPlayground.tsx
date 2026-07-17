"use client"

import { useCallback, useState } from "react"
import { Settings } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { AvatarTile } from "./AvatarTile"
import CategoryFilterDropdown from "./CategoryFilterDropdown"
import ConfigPreferencesDialog from "./ConfigPreferencesDialog"
import FigmaCustomIcon from "./FigmaCustomIcon"
import { BACKGROUNDS } from "./ToneFilterDropdown"
import ToneFilterDropdown from "./ToneFilterDropdown"
import {
	AVATARS,
	CATEGORY_AVATAR_MAP,
	getToneStyle,
	randomHexColor,
} from "./avatar-playground-utils"

const AvatarPlayground = () => {
	const [category, setCategory] = useState("all")
	const [tone, setTone] = useState("neutral")
	const [configOpen, setConfigOpen] = useState(false)
	const [copyFormat, setCopyFormat] = useState("editable-bg")

	const handleToneChange = useCallback((value: string) => {
		if (value === "pick-color") {
			setTone(randomHexColor())
		} else if (value === "pick-gradient") {
			const from = randomHexColor()
			const to = randomHexColor()
			setTone(`grad-custom:${from}:${to}`)
		} else if (value === "pick-background") {
			setTone(BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)])
		} else {
			setTone(value)
		}
	}, [])

	return (
		<div className="flex w-full flex-col gap-4">
			<div className="flex w-full items-center justify-between">
				<CategoryFilterDropdown value={category} onChange={setCategory} />

				<div className="flex items-center gap-2">
					<ToneFilterDropdown value={tone} onChange={handleToneChange} />

					<Button
						color="neutral"
						variant="outline"
						onClick={() => setConfigOpen(true)}>
						<Settings className="text-fg-secondary" />
						<p className="hidden sm:block">Config</p>
					</Button>

					<Button color="neutral" variant="outline">
						<FigmaCustomIcon />
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-7">
				{AVATARS.map((src, index) => {
					const avatarNumber = index + 1
					if (
						category !== "all" &&
						!CATEGORY_AVATAR_MAP[category]?.includes(avatarNumber)
					) {
						return null
					}
					return (
						<AvatarTile
							key={src}
							src={src}
							index={index}
							toneStyle={getToneStyle(tone)}
							tone={tone}
							copyFormat={copyFormat}
							// isImageBackground={tone.startsWith("/blocks/")}
							// isNeutralBackground={tone === "neutral" || tone === "none"}
						/>
					)
				})}
			</div>

			<ConfigPreferencesDialog
				open={configOpen}
				onOpenChange={setConfigOpen}
				copyFormat={copyFormat}
				onCopyFormatChange={setCopyFormat}
			/>
		</div>
	)
}

export default AvatarPlayground
