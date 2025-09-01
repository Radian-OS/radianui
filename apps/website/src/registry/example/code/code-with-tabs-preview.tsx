"use client"

import { EyeIcon, SquareTerminal } from "lucide-react"
import { useTheme } from "next-themes"
import CodeSnippet from "@/components/code-snippet"
import { CodeArea } from "@/registry/ui/code-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type PackageManager = "pnpm" | "npm" | "yarn" | "bun"

const CodeAreaPreview = () => {
	const { theme } = useTheme()

	const commands: Record<PackageManager, string> = {
		pnpm: `pnpm add sonner`,
		npm: `npm install sonner`,
		yarn: `yarn add sonner`,
		bun: `bun add sonner`,
	}

	const getImplementationCode = () => {
		return `'use client'

import { EyeIcon, SquareTerminal } from "lucide-react"
import { useTheme } from "next-themes"
import { CodeArea } from "@/registry/ui/code-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type PackageManager = "pnpm" | "npm" | "yarn" | "bun"

const CodeWithTabsPreview = () => {
  const { theme } = useTheme()

  const commands: Record<PackageManager, string> = {
	pnpm: 'pnpm add sonner',
	npm: 'npm install sonner',
	yarn: 'yarn add sonner',
	bun: 'bun add sonner',
  }

  return (
    <Tabs defaultValue="pnpm" variant="outline-ghost" className="bg-fill2 gap-2 overflow-hidden rounded-xl p-1.5 w-full">
		<TabsList>
			{Object.keys(commands).map((pkgManager) => (
				<TabsTrigger value={pkgManager} key={pkgManager}>{pkgManager}</TabsTrigger>
			))}
		</TabsList>
		{Object.entries(commands).map(([pkgManager, code]) => (
			<TabsContent value={pkgManager} key={pkgManager}>
				<CodeArea
					language="bash"
					theme={theme === "dark" ? "github-dark-high-contrast" : "github-light"}
					code={code}
					className="border-soft rounded-[10px] border"
					copyButton={true}
				/>
			</TabsContent>
		))}
    </Tabs>
  )
}

export default CodeWithTabsPreview
`
	}

	return (
		<Tabs className="mt-3" defaultValue="preview" variant="outline-ghost">
			<div className="flex items-center">
				<TabsList>
					<TabsTrigger value="preview" icon={<EyeIcon />}>
						Preview
					</TabsTrigger>
					<TabsTrigger value="code" icon={<SquareTerminal />}>
						Code
					</TabsTrigger>
				</TabsList>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] w-full flex-col items-center justify-center overflow-auto rounded-xl border p-5">
					<Tabs defaultValue="pnpm" className="bg-fill2 w-full gap-2 overflow-hidden rounded-xl p-1.5" variant="outline-ghost">
						<TabsList className="bg-transparent">
							{Object.keys(commands).map((pkgManager) => (
								<TabsTrigger key={pkgManager} value={pkgManager}>
									{pkgManager}
								</TabsTrigger>
							))}
						</TabsList>
						{Object.entries(commands).map(([pkgManager, code]) => (
							<TabsContent value={pkgManager} key={pkgManager}>
								<CodeArea
									language="bash"
									theme={theme === "dark" ? "github-dark-high-contrast" : "github-light"}
									code={code}
									className="border-soft rounded-[10px] border"
									copyButton={true}
								/>
							</TabsContent>
						))}
					</Tabs>
				</div>
			</TabsContent>
			<TabsContent value="code" className="p-0">
				<CodeSnippet title="code-with-tabs-preview.tsx" code={getImplementationCode()} showLineNumber={false} />
			</TabsContent>
		</Tabs>
	)
}

export default CodeAreaPreview
