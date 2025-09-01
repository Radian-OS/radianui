"use client"

import { useMemo, useState } from "react"
import { Check, CopyIcon, EyeIcon, SquareTerminal } from "lucide-react"
import { useTheme } from "next-themes"
import CodeSnippet from "@/components/code-snippet"
import { useCopyPaste } from "@/hooks/use-copy-paste"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type PackageManager = "pnpm" | "npm" | "yarn" | "bun"
type InstallMode = "install" | "execute"

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

const CodeAreaPreview = () => {
	const { theme } = useTheme()
	const code = `react-toastify`
	const mode: InstallMode = "install"
	const pkg: PackageManager[] = ["pnpm", "npm", "yarn", "bun"]

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

	const getImplementationCode = () => {
		return `'use client'

import { useState } from "react"
import { Check, CopyIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useCopyPaste } from "@/hooks/use-copy-paste"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type PackageManager = "pnpm" | "npm" | "yarn" | "bun"

const CodeWithTabsPreview = () => {
  const { theme } = useTheme()
  const code = "react-toastify"
  const pkg: PackageManager[] = ["pnpm", "npm", "yarn", "bun"]
  const [activeTab, setActiveTab] = useState<PackageManager>("pnpm")

  const commands: Record<PackageManager, string> = {
	pnpm: \`pnpm add \${code}\`,
	npm: \`npm install \${code}\`,
	yarn: \`yarn add \${code}\`,
	bun: \`bun add \${code}\`,
  }

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
      className="bg-fill2 gap-2 overflow-hidden rounded-xl p-1.5 w-full"
    >
      <div className="flex justify-between pr-1">
        <TabsList className="bg-transparent">
          {pkg.map((manager) => (
            <TabsTrigger key={manager} value={manager}>
              {manager}
            </TabsTrigger>
          ))}
        </TabsList>
        <Button
          variant="ghost"
          color="neutral"
          size="28"
          iconOnly
          aria-label="Copy command"
          onClick={copy}
        >
          {copied ? <Check size={16} /> : <CopyIcon size={16} />}
        </Button>
      </div>
      {pkg.map((manager) => (
        <TabsContent key={manager} value={manager}>
          <CodeArea
            language="bash"
            theme={theme === "dark" ? "github-dark-high-contrast" : "github-light"}
            code={commands[manager]}
            copyButton={false}
            lineNumbers={false}
            className="border-soft rounded-[10px] border px-4 py-3"
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
					{/* Raw implementation without CommandLineTabs abstraction */}
					<Tabs
						value={activeTab}
						onValueChange={(val) => setActiveTab(val as PackageManager)}
						variant="outline-ghost"
						size="md"
						className="bg-fill2 w-full gap-2 overflow-hidden rounded-xl p-1.5">
						<div className="flex justify-between pr-1">
							<TabsList className="bg-transparent">
								{pkg.map((manager) => (
									<TabsTrigger key={manager} value={manager}>
										{manager}
									</TabsTrigger>
								))}
							</TabsList>
							<Button variant="ghost" color="neutral" size="28" iconOnly aria-label="Copy command" onClick={copy}>
								{copied ? <Check size={16} /> : <CopyIcon size={16} />}
							</Button>
						</div>
						{pkg.map((manager) => (
							<TabsContent key={manager} value={manager} className="p-0">
								<CodeArea
									language="bash"
									theme={theme === "dark" ? "github-dark-high-contrast" : "github-light"}
									code={commands[manager]}
									copyButton={false}
									lineNumbers={false}
									className="border-soft rounded-[10px] border"
								/>
							</TabsContent>
						))}
					</Tabs>
				</div>
			</TabsContent>
			<TabsContent value="code" className="p-0">
				{/* <CodeArea
					language="bash"
					theme={theme === "dark" ? "github-dark-high-contrast" : "github-light"}
					code={getImplementationCode()}
					copyButton={false}
					lineNumbers={false}
					className="border-soft rounded-[10px] border px-4 py-3"
				/> */}
				<CodeSnippet title="code-with-tabs-preview.tsx" code={getImplementationCode()} showLineNumber={false} />
			</TabsContent>
		</Tabs>
	)
}

export default CodeAreaPreview
