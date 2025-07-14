import { useMemo, useState } from "react"
import { Check, CopyIcon } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import { useCopyPaste } from "@/hooks/use-copy-paste"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type PackageManager = "pnpm" | "npm" | "yarn" | "bun"
export type InstallMode = "install" | "execute"

export interface InstallationTabsProps {
	code: string
	mode?: InstallMode
	pkg?: PackageManager[]
	className?: string
	icon?: boolean
}

const getCommand = (manager: PackageManager, code: string, mode: InstallMode) => {
	if (mode === "install") {
		switch (manager) {
			case "pnpm":
				return `pnpm add ${code}`
			case "npm":
				return `npm install ${code}`
			case "yarn":
				return `yarn add ${code}`
			case "bun":
				return `bun add ${code}`
		}
	} else if (mode === "execute") {
		switch (manager) {
			case "pnpm":
				return `pnpm dlx ${code}`
			case "npm":
				return `npx ${code}`
			case "yarn":
				return `yarn dlx ${code}`
			case "bun":
				return `bunx ${code}`
		}
	}
	return `${manager} ${code}`
}

// Icon component mapping - you can replace these with your actual icon components
const PackageManagerIcon = ({ manager }: { manager: PackageManager }) => {
	// Replace these with your actual icon components
	switch (manager) {
		case "pnpm":
			return <PnpmIcon />
		case "npm":
			return <NpmIcon />
		case "yarn":
			return <YarnIcon />
		case "bun":
			return <BunIcon />
		default:
			return null
	}
}

// Placeholder components - replace these with your actual icon components
const PnpmIcon = () => <Image className="h-5 w-5" src="/icons/pnpm.webp" width={500} alt="pnpm-icon" height={500} />
const NpmIcon = () => <Image className="h-5 w-5" src="/icons/npm.webp" width={500} alt="npm" height={500} />
const YarnIcon = () => <Image className="h-5 w-5" src="/icons/yarn.png" width={500} alt="yarn" height={500} />
const BunIcon = () => <Image className="h-5 w-5" src="/icons/bun.svg" width={500} alt="bun" height={500} />

export default function CommandLineTabs({ code, mode = "install", pkg = ["pnpm", "npm", "yarn", "bun"], className, icon = false }: InstallationTabsProps) {
	const { theme } = useTheme()
	const [activeTab, setActiveTab] = useState<PackageManager>(pkg[0])

	// Memoize commands for each manager
	const commands = useMemo(
		() =>
			pkg.reduce(
				(acc, manager) => ({
					...acc,
					[manager]: getCommand(manager as PackageManager, code, mode),
				}),
				{} as Record<PackageManager, string>
			),
		[pkg, code, mode]
	)

	const { copied, copy } = useCopyPaste({
		code: commands[activeTab],
		eventName: "block_cli_copy",
		title: "Package Manager Command",
		category: "CLI",
	})

	return (
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		<Tabs
			value={activeTab}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			onValueChange={setActiveTab as any}
			variant="outline-ghost"
			size="md"
			className={cn("bg-fill-level2 gap-2 overflow-hidden rounded-xl p-1.5", className)}>
			<div className="flex justify-between pr-1">
				<TabsList className="bg-transparent">
					{pkg.map((manager) => (
						<TabsTrigger key={manager} value={manager} className={icon ? "gap-1" : ""}>
							{icon && <PackageManagerIcon manager={manager} />}
							{manager}
						</TabsTrigger>
					))}
				</TabsList>
				<Button variant="ghost" color="neutral" size={"28"} isIcon aria-label="Copy command" onClick={copy}>
					{copied ? <Check /> : <CopyIcon />}
				</Button>
			</div>
			{pkg.map((manager) => (
				<TabsContent key={manager} value={manager}>
					<CodeArea
						language="bash"
						theme={theme === "dark" ? "github-dark-high-contrast" : "github-light"}
						code={commands[manager as PackageManager]}
						copiable={false}
						showLineNumbers={false}
						className={cn("border-soft rounded-[10px] border px-4 py-3", className)}
					/>
				</TabsContent>
			))}
		</Tabs>
	)
}
