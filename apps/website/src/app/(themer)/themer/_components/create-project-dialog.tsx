"use client"

import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { Check, ClipboardCopy, FolderPlus, Plus, Rocket } from "lucide-react"
import { useThemerPreset } from "@/lib/themer-preset"
import { buildRegistryConfig } from "@/registry/config"
import { FONTS } from "@/registry/fonts"
import { PRIMARY_COLORS } from "@/registry/primary-colors"
import { TEMPLATES, Template } from "@/registry/templates"
import { Button } from "@/styles/default/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/styles/default/ui/dialog"
import { Input } from "@/styles/default/ui/input"
import { Label } from "@/styles/default/ui/label"
import { Spinner } from "@/styles/default/ui/spinner"
import { Switch, SwitchWrapper } from "@/styles/default/ui/switch"
import { RADII } from "./radius-pill"
import { TemplateCard } from "./template-card"
import { ThemeSummaryPill } from "./theme-summary-pill"

const PROJECT_NAME_REGEX = /^[a-z0-9][a-z0-9-]*$/

function validateProjectName(name: string): string | null {
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

export function CreateProjectDialog() {
	const [projectName, setProjectName] = useState("")
	const [params, setParams] = useThemerPreset()
	const [touched, setTouched] = useState(false)
	const [copied, setCopied] = useState(false)

	// Vite always uses src dir — force it when template switches to vite
	const isVite = params.template === "vite"
	useEffect(() => {
		if (isVite && !params.useSrcDir) {
			setParams({ useSrcDir: true })
		}
	}, [isVite])

	const error = validateProjectName(projectName)
	const showError = touched && error

	const selectedColor = PRIMARY_COLORS.find(
		(c) => c.value === params.primaryColor
	)
	const selectedHeadingFont = FONTS.find((f) => f.value === params.headingFont)
	const selectedBodyFont = FONTS.find((f) => f.value === params.bodyFont)
	const selectedRadius = RADII.find((r) => r.value === params.radius)

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
			setTouched(false)
			setCopied(false)
			reset()
		}
	}

	const handleCreate = () => {
		setTouched(true)
		if (error) return

		const config = buildRegistryConfig({
			...params,
			name: projectName,
			useSrcDir: isVite ? true : params.useSrcDir,
		})

		mutate(config)
	}

	const command = data?.id
		? `set RADIANUI_WEBSITE_URL=https://tmp.radianos.com&& pnpm dlx radianui@alpha init --preset ${data.id}`
		: ""

	const handleCopy = () => {
		navigator.clipboard.writeText(command)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<Dialog onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button className="w-full">
					<Plus className="size-4" />
					Create Project
				</Button>
			</DialogTrigger>
			<DialogContent className="gap-0 overflow-hidden p-0">
				{data?.id ? (
					<div className="flex flex-col">
						{/* Success header */}
						<div className="bg-success-accent flex flex-col items-center gap-3 px-6 pb-5 pt-8">
							<div className="bg-success flex size-10 items-center justify-center rounded-full">
								<Rocket className="text-fg-inverse size-5" />
							</div>
							<div className="flex flex-col items-center gap-1">
								<h3 className="text-fg text-base font-semibold">
									Project Ready
								</h3>
								<p className="text-fg-secondary text-center text-sm">
									Run this command to get started
								</p>
							</div>
						</div>

						{/* Command block */}
						<div className="flex flex-col gap-4 p-5">
							<div
								className="bg-fill1 border-border hover:border-fg-disabled group relative flex cursor-pointer items-center rounded-lg border p-3 transition-colors"
								onClick={handleCopy}>
								<code className="text-fg flex-1 select-all break-all text-[13px]">
									{command}
								</code>
								<button
									className="text-fg-tertiary hover:text-fg shrink-0 p-1 transition-colors"
									aria-label="Copy command">
									{copied ? (
										<Check className="text-success size-4" />
									) : (
										<ClipboardCopy className="size-4" />
									)}
								</button>
							</div>
							{copied && (
								<p className="text-success text-center text-xs font-medium">
									Copied to clipboard
								</p>
							)}
						</div>
					</div>
				) : (
					<div className="flex flex-col">
						{/* Dialog header with icon */}
						<div className="flex flex-col items-center gap-3 px-6 pb-4 pt-8">
							<div className="bg-primary-accent flex size-10 items-center justify-center rounded-full">
								<FolderPlus className="text-primary size-5" />
							</div>
							<div className="flex flex-col items-center gap-1">
								<DialogTitle className="text-center">
									Create Project
								</DialogTitle>
								<DialogDescription className="text-center">
									Set up a new project with your current theme.
								</DialogDescription>
							</div>
						</div>

						{/* Theme summary */}
						<div className="border-border mx-5 flex flex-wrap gap-1.5 rounded-lg border-t pt-4">
							{selectedColor && (
								<ThemeSummaryPill
									label="Color"
									value={selectedColor.name}
									colorSwatch={selectedColor.cssVars.light["--color-primary"]}
								/>
							)}
							{selectedHeadingFont && (
								<ThemeSummaryPill
									label="Heading"
									value={selectedHeadingFont.name}
								/>
							)}
							{selectedBodyFont && (
								<ThemeSummaryPill label="Body" value={selectedBodyFont.name} />
							)}
							{selectedRadius && (
								<ThemeSummaryPill label="Radius" value={selectedRadius.name} />
							)}
							<ThemeSummaryPill
								label="Src Dir"
								value={params.useSrcDir ? "Yes" : "No"}
							/>
						</div>

						{/* Form */}
						<div className="flex flex-col gap-5 p-5">
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
								<Label>Template</Label>
								<div className="flex gap-2">
									{TEMPLATES.map((t) => (
										<TemplateCard
											key={t}
											template={t}
											isSelected={params.template === t}
											onClick={() => setParams({ template: t as Template })}
										/>
									))}
								</div>
							</div>

							{/* Use src directory */}
							<div className="flex items-center justify-between">
								<div className="flex flex-col gap-0.5">
									<Label>Use src directory</Label>
									<span className="text-fg-tertiary text-xs">
										{isVite
											? "Vite always uses src/"
											: "Place code inside a src/ folder"}
									</span>
								</div>
								<SwitchWrapper>
									<Switch
										size="20"
										checked={isVite ? true : params.useSrcDir}
										disabled={isVite}
										onCheckedChange={(checked) =>
											setParams({ useSrcDir: checked })
										}
									/>
								</SwitchWrapper>
							</div>

							{mutationError && (
								<p className="text-error text-sm">{mutationError.message}</p>
							)}

							<Button
								className="w-full"
								disabled={!!error || isPending}
								onClick={handleCreate}>
								{isPending ? (
									<Spinner size={16} variant="simple" />
								) : (
									<>
										<Rocket className="size-4" />
										Create Project
									</>
								)}
							</Button>
						</div>
					</div>
				)}
			</DialogContent>
		</Dialog>
	)
}
