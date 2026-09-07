import { preconnect } from "react-dom"
import { ResourcePage } from "../../components/ResourcePage"
import FlagsDocs from "../docs/FlagsDocs"
import FlagsHeroActionButtons from "./FlagsHeroActionButtons"
import FlagsPlayground from "./FlagsPlayground"
import type { FlagName } from "./flags-data"
import { FLAG_CDN_ORIGIN } from "./flags-data"

const flagCdnRoot =
	"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/country-flags/src/64px/circle"

const heroFlags = [
	{ name: "Germany", size: "small" },
	{ name: "United States", size: "large" },
	{ name: "Argentina", size: "small" },
] as const

interface FlagsResourcePageProps {
	initialSelectedFlag?: FlagName | null
}

export function FlagsResourcePage({
	initialSelectedFlag = null,
}: FlagsResourcePageProps) {
	preconnect(FLAG_CDN_ORIGIN, { crossOrigin: "anonymous" })

	return (
		<ResourcePage
			badge={{
				count: "250+ Flags",
				label: "Curated Country Flag Collection",
			}}
			heroVisual={
				<div className="flex items-center -space-x-2">
					{heroFlags.map(({ name, size }) => (
						<div
							key={name}
							className={`relative overflow-hidden rounded-full ${
								size === "large" ? "z-10 size-20" : "size-12"
							}`}>
							<img
								src={`${flagCdnRoot}/${encodeURIComponent(name)}.png`}
								alt={`${name} flag`}
								width={64}
								height={64}
								className="size-full object-contain"
							/>
						</div>
					))}
				</div>
			}
			title="Beautiful, Production-Ready Country Flags 🏁"
			description="Access a complete collection of country and regional flags, optimized for Figma, React, and modern web applications."
			actions={<FlagsHeroActionButtons />}
			showcaseLabel="Browse free country flag assets"
			showcase={<FlagsPlayground initialSelectedFlag={initialSelectedFlag} />}
			documentation={<FlagsDocs />}
		/>
	)
}
