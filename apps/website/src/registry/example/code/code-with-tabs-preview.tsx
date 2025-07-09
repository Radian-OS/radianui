"use client"

import { useMemo, useState } from "react"
import { Check, CopyIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useCopyPaste } from "@/hooks/use-copy-paste"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type PackageManager = "pnpm" | "npm" | "yarn" | "bun"
type InstallMode = "install" | "execute"

interface InstallationTabsProps {
	code: string
	mode?: InstallMode
	pkg?: PackageManager[]
	className?: string
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
	} else {
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

function CommandLineTabs({ code, mode = "install", pkg = ["pnpm", "npm", "yarn", "bun"], className }: InstallationTabsProps) {
	const { theme } = useTheme()
	const [activeTab, setActiveTab] = useState<PackageManager>(pkg[0])

	const commands = useMemo(
		() =>
			pkg.reduce(
				(acc, manager) => ({
					...acc,
					[manager]: getCommand(manager, code, mode),
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
		<Tabs
			value={activeTab}
			onValueChange={(val) => setActiveTab(val as PackageManager)}
			variant="outline-ghost"
			size="md"
			className={cn("bg-fill-level2 gap-2 overflow-hidden rounded-xl p-1.5", className)}>
			<div className="flex justify-between pr-1">
				<TabsList className="bg-transparent">
					{pkg.map((manager) => (
						<TabsTrigger key={manager} value={manager}>
							{manager}
						</TabsTrigger>
					))}
				</TabsList>
				<Button variant="ghost" color="neutral" size="28" isIcon aria-label="Copy command" onClick={copy}>
					{copied ? <Check size={16} /> : <CopyIcon size={16} />}
				</Button>
			</div>
			{pkg.map((manager) => (
				<TabsContent key={manager} value={manager}>
					<CodeArea
						language="bash"
						theme={theme === "dark" ? "github-dark-high-contrast" : "github-light"}
						code={commands[manager]}
						copiable={false}
						showLineNumbers={false}
						className="border-soft rounded-[10px] border px-4 py-3"
					/>
				</TabsContent>
			))}
		</Tabs>
	)
}

const CodeAreaPreview = () => {
	const code = `react-toastify`
	const getImplementationCode = () => {
		return `
<CommandLineTabs
  code="react-toastify"
  mode="install"
  pkg={["pnpm", "npm", "yarn", "bun"]}
  className="w-full"
/>`
	}

	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center">
				<TabsList>
					<TabsTrigger value="preview">Preview</TabsTrigger>
					<TabsTrigger value="code">Code</TabsTrigger>
				</TabsList>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] w-full flex-col items-center justify-center overflow-auto rounded-xl border p-5">
					<CommandLineTabs code={code} mode="install" pkg={["pnpm", "npm", "yarn", "bun"]} className="w-full" />
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea language="tsx" code={getImplementationCode()} className="h-[420px]" theme="github-dark-default" showLineNumbers={false} copiable={true} />
			</TabsContent>
		</Tabs>
	)
}

export default CodeAreaPreview
