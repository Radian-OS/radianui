import { preconnect } from "react-dom"
import PackageManagerTabs, {
	type Commands,
} from "@/components/package-manager-tabs"
import { ResourcePage } from "../../components/ResourcePage"
import FlagsDocs from "../docs/FlagsDocs"
import FlagsHeroActionButtons from "./FlagsHeroActionButtons"
import FlagsPlayground from "./FlagsPlayground"
import type { FlagName } from "./flags-data"
import { FLAG_CDN_ORIGIN, getFlagDisplayName } from "./flags-data"

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

	const selectedFlagName = initialSelectedFlag
		? getFlagDisplayName(initialSelectedFlag)
		: null
	const title = selectedFlagName
		? `${selectedFlagName} Flag – SVG & PNG Download`
		: "All Country Flags for React and Figma"
	const description = selectedFlagName
		? `Download the ${selectedFlagName} flag as a flat or rounded SVG or PNG icon for React, Figma, and other design tools.`
		: "Browse 250+ country flags of the world with names and ISO codes. Install the npm package for React, or download flag icons as SVG and PNG images for Figma and any design tool."

	return (
		<ResourcePage
			badge={{
				count: "250+ Flags",
				label: "Flags of the World Collection",
				href: "/docs/getting-started/changelog",
			}}
			showHeroBeams={false}
			heroVisual={null}
			title={title}
			description={description}
			actions={<FlagsHeroActionButtons />}
			heroAside={
				<div className="flex w-full flex-col gap-2 text-left">
					<p className="text-fg-secondary text-xs font-medium">
						Install the country flags package for React
					</p>
					<PackageManagerTabs commands={flagPackageCommands} withIcon />
				</div>
			}
			showcaseLabel="All Country Flags with Names"
			showcaseClassName="!mt-0"
			showcase={<FlagsPlayground initialSelectedFlag={initialSelectedFlag} />}
			documentation={<FlagsDocs />}
		/>
	)
}
