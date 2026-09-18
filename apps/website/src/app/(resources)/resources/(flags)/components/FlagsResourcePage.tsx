import { preconnect } from "react-dom"
import PackageManagerTabs, {
	type Commands,
} from "@/components/package-manager-tabs"
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

const flagPackageCommands: Commands = {
	pnpm: "pnpm add @radianui/flags",
	npm: "npm install @radianui/flags",
	yarn: "yarn add @radianui/flags",
	bun: "bun add @radianui/flags",
}

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
			actions={
				<div className="flex w-full max-w-170 flex-col items-center gap-6">
					<div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
						<FlagsHeroActionButtons />
					</div>
					<div className="flex w-full flex-col gap-2 text-left">
						<p className="text-fg-secondary text-xs font-medium">
							Install the flag package
						</p>
						<PackageManagerTabs commands={flagPackageCommands} withIcon />
					</div>
				</div>
			}
			showcaseLabel="Browse free country flag assets"
			showcase={<FlagsPlayground initialSelectedFlag={initialSelectedFlag} />}
			documentation={<FlagsDocs />}
		/>
	)
}
