"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { Check, ClipboardCopy, FolderPlus, Rocket } from "lucide-react"
import { usePreferences } from "@/lib/preferences"
import { cn } from "@/lib/utils"
import { useThemerPreset } from "@/lib/themer-preset"
import { buildRegistryConfig } from "@/registry/config"
import { TEMPLATES, type Template } from "@/registry/templates"
import { Button } from "@/styles/default/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/styles/default/ui/dialog"
import { Input } from "@/styles/default/ui/input"
import { Label } from "@/styles/default/ui/label"
import { Switch } from "@/styles/default/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/styles/default/ui/tabs"

const PROJECT_NAME_REGEX = /^[a-z0-9][a-z0-9-]*$/

const PACKAGE_MANAGERS = ["pnpm", "npm", "yarn", "bun"] as const
type PackageManager = (typeof PACKAGE_MANAGERS)[number]

const PM_COMMAND: Record<PackageManager, (id: string) => string> = {
	pnpm: (id) => `pnpm dlx radianui@latest init --preset ${id}`,
	npm: (id) => `npx radianui@latest init --preset ${id}`,
	yarn: (id) => `yarn dlx radianui@latest init --preset ${id}`,
	bun: (id) => `bunx --bun radianui@latest init --preset ${id}`,
}

const TEMPLATES_INFO: Record<Template, { label: string; desc: string }> = {
	next: { label: "Next.js", desc: "Full-stack framework" },
	vite: { label: "Vite", desc: "Fast frontend build" },
}

function validateProjectName(name: string) {
	if (!name) return "Project name is required."
	if (name.length < 2) return "Name must be at least 2 characters."
	if (!PROJECT_NAME_REGEX.test(name))
		return "Use only lowercase letters, numbers, and hyphens. Must start with a letter or number."
	if (name.endsWith("-")) return "Name cannot end with a hyphen."
	return null
}

async function saveConfig(config: ReturnType<typeof buildRegistryConfig>) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BLOCKS_URL}/api/config`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(config),
	})

	if (!res.ok) {
		throw new Error(`Failed to save config (${res.status})`)
	}

	return res.json() as Promise<{ id: string }>
}

export function CreateProjectDialog({
	children,
}: {
	children: React.ReactNode
}) {
	const [projectName, setProjectName] = useState("")
	const [params] = useThemerPreset()
	const [selectedTemplate, setSelectedTemplate] = useState<Template>(
		params.template ?? "next"
	)
	const [useSrcDir, setUseSrcDir] = useState(params.useSrcDir ?? true)
	const { packageManager, setPackageManager } = usePreferences()
	const [touched, setTouched] = useState(false)
	const [copied, setCopied] = useState(false)

	const error = validateProjectName(projectName)
	const showError = touched && error

	const {
		mutate,
		data,
		isPending,
		error: mutationError,
		reset,
	} = useMutation({
		mutationFn: saveConfig,
	})

	const handleOpenChange = (open: boolean) => {
		if (open) {
			setProjectName("")
			setSelectedTemplate(params.template ?? "next")
			setUseSrcDir(params.useSrcDir ?? true)
			setTouched(false)
			setCopied(false)
			reset()
		}
	}

	const handleCreate = () => {
		setTouched(true)
		if (error) return

		const isVite = selectedTemplate === "vite"
		const config = buildRegistryConfig({
			...params,
			name: projectName,
			template: selectedTemplate,
			useSrcDir: isVite ? true : useSrcDir,
		})

		mutate(config)
	}

	const command = data?.id ? PM_COMMAND[packageManager](data.id) : ""

	const handleCopy = () => {
		if (!command) return
		navigator.clipboard.writeText(command)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<Dialog onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="max-w-[460px] gap-5 p-6" closeButton="visible">
				<DialogHeader className="gap-1 text-left">
					<div className="flex items-center gap-2">
						<div className="bg-primary-accent flex size-8 items-center justify-center rounded-lg">
							<FolderPlus className="text-primary size-4" />
						</div>
						<DialogTitle>Create Project</DialogTitle>
					</div>
					<DialogDescription>
						Set up your project name and framework template.
					</DialogDescription>
				</DialogHeader>

				<form
					onSubmit={(e) => {
						e.preventDefault()
						handleCreate()
					}}
					className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<Label htmlFor="project-name">Project Name</Label>
						<Input
							id="project-name"
							placeholder="my-project"
							value={projectName}
							onChange={(e) => setProjectName(e.target.value)}
							onBlur={() => setTouched(true)}
							aria-invalid={!!showError}
						/>
						{showError && <p className="text-error text-xs">{error}</p>}
					</div>

					<div className="flex flex-col gap-2">
						<Label>Framework</Label>
						<div className="grid grid-cols-2 gap-2.5">
							{TEMPLATES.map((t) => {
								const isSelected = selectedTemplate === t
								return (
									<button
										key={t}
										type="button"
										onClick={() => setSelectedTemplate(t)}
										className={cn(
											"border-border bg-fill1 relative flex flex-col items-start gap-1 rounded-xl border-2 p-3 text-left transition-colors hover:cursor-pointer",
											isSelected
												? "border-primary bg-primary-accent"
												: "hover:border-fg-disabled"
										)}>
										{isSelected && (
											<span className="bg-primary absolute top-2.5 right-2.5 flex size-4 items-center justify-center rounded-full">
												<Check
													className="text-fg-inverse size-2.5"
													strokeWidth={3}
												/>
											</span>
										)}
										<span
											className={cn(
												"text-sm font-semibold",
												isSelected ? "text-primary-text" : "text-fg"
											)}>
											{TEMPLATES_INFO[t].label}
										</span>
										<span className="text-fg-tertiary text-xs">
											{TEMPLATES_INFO[t].desc}
										</span>
									</button>
								)
							})}
						</div>
					</div>

					<div className="flex items-center justify-between">
						<div className="flex flex-col gap-0.5">
							<Label htmlFor="use-src-dir" className="cursor-pointer">
								Use src directory
							</Label>
							<span className="text-fg-tertiary text-xs">
								{selectedTemplate === "vite"
									? "Vite always uses src/"
									: "Place code inside a src/ folder"}
							</span>
						</div>
						<Switch
							id="use-src-dir"
							size="sm"
							checked={selectedTemplate === "vite" ? true : useSrcDir}
							disabled={selectedTemplate === "vite"}
							onCheckedChange={setUseSrcDir}
						/>
					</div>

					{mutationError && (
						<p className="text-error text-sm">
							{mutationError.message || "Failed to save preset"}
						</p>
					)}

					<Button
						type="submit"
						className="w-full"
						disabled={!!error || isPending}
						loading={isPending}>
						{!isPending && <Rocket className="size-4" />}
						{isPending ? "Creating Project..." : "Create Project"}
					</Button>

					{data?.id && (
						<div className="border-border flex flex-col gap-2.5 border-t pt-4">
							<div className="flex items-center justify-between">
								<p className="text-fg-secondary text-xs">
									Run this command to get started:
								</p>
							</div>

							<Tabs
								value={packageManager}
								onValueChange={(val) =>
									setPackageManager(val as PackageManager)
								}>
								<TabsList width="full">
									{PACKAGE_MANAGERS.map((pm) => (
										<TabsTrigger key={pm} value={pm}>
											{pm}
										</TabsTrigger>
									))}
								</TabsList>
							</Tabs>

							<button
								type="button"
								onClick={handleCopy}
								className="bg-fill1 border-border hover:border-fg-disabled group flex w-full items-center justify-between rounded-lg border p-3 text-left transition-colors hover:cursor-pointer"
								aria-label="Copy command">
								<code className="text-fg flex-1 text-[13px] break-all select-all">
									{command}
								</code>
								<span className="text-fg-tertiary group-hover:text-fg shrink-0 p-1 transition-colors">
									{copied ? (
										<Check className="text-success size-4" />
									) : (
										<ClipboardCopy className="size-4" />
									)}
								</span>
							</button>
						</div>
					)}
				</form>
			</DialogContent>
		</Dialog>
	)
}
