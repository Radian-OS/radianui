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
			heroVisual={null}
			title="Country Flag Icons for React & Figma"
			description="Explore a complete collection of country and regional flag icons for Figma, React, and web projects. Use scalable SVG flags or install the package via npm."
			actions={<FlagsHeroActionButtons />}
			heroAside={
				<div className="flex w-full flex-col gap-2 text-left">
					<p className="text-fg-secondary text-xs font-medium">
						Add all flags to your project
					</p>
					<PackageManagerTabs commands={flagPackageCommands} withIcon />
				</div>
			}
			showcaseLabel="Browse free country flag assets"
			showcase={<FlagsPlayground initialSelectedFlag={initialSelectedFlag} />}
			documentation={<FlagsDocs />}
		/>
	)
}
