"use client"

import { useTheme } from "next-themes"
import { CodeArea } from "@/registry/ui/code-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type PackageManager = "pnpm" | "npm" | "yarn" | "bun"

const CodeWithTabsPreview = () => {
	const { theme } = useTheme()

	const commands: Record<PackageManager, string> = {
		pnpm: "pnpm add sonner",
		npm: "npm install sonner",
		yarn: "yarn add sonner",
		bun: "bun add sonner",
	}

	return (
		<Tabs
			defaultValue="pnpm"
			className="bg-fill2 w-full gap-2 overflow-hidden rounded-xl p-1.5">
			<TabsList>
				{Object.keys(commands).map((pkgManager) => (
					<TabsTrigger value={pkgManager} key={pkgManager}>
						{pkgManager}
					</TabsTrigger>
				))}
			</TabsList>
			{Object.entries(commands).map(([pkgManager, code]) => (
				<TabsContent value={pkgManager} key={pkgManager}>
					<CodeArea
						language="bash"
						theme={
							theme === "dark" ? "github-dark-high-contrast" : "github-light"
						}
						code={code}
						className="border-soft rounded-[10px] border"
					/>
				</TabsContent>
			))}
		</Tabs>
	)
}

export default CodeWithTabsPreview
