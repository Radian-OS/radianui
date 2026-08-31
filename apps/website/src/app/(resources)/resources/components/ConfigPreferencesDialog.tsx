"use client"

import { useId } from "react"
import {
	Check,
	ChevronDown,
	Code2,
	FileImage,
	Grid2x2,
	Link2,
	RotateCw,
	Sparkles,
} from "lucide-react"
import { Button, IconButton } from "@/registry/ui/button"
import {
	Dialog,
	DialogBody,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/registry/ui/dialog"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuDivider,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import { Switch, SwitchWrapper } from "@/registry/ui/switch"

const COPY_FORMAT_GROUPS = [
	{
		label: "Design",
		options: [
			{ value: "image", label: "Image", icon: FileImage },
			{ value: "editable-bg", label: "SVG", icon: Sparkles },
		],
	},
	{
		label: "Development",
		options: [
			{ value: "url", label: "URL", icon: Link2 },
			{ value: "nextjs-image", label: "Next JS <Image>", icon: Code2 },
			{ value: "html-img", label: "HTML <IMG>", icon: Code2 },
		],
	},
]

const CopyFormatDropdown = ({
	value,
	onChange,
}: {
	value: string
	onChange: (value: string) => void
}) => {
	const activeLabel =
		COPY_FORMAT_GROUPS.flatMap((g) => g.options).find((o) => o.value === value)
			?.label ?? "PNG Image"

	return (
		<DropdownMenu modal={true}>
			<DropdownMenuTrigger asChild>
				<Button
					color="neutral"
					variant="outline"
					className="w-44 justify-between">
					<span className="flex items-center gap-2">
						<FileImage className="text-fg-secondary size-4" />
						{activeLabel}
					</span>
					<ChevronDown className="text-fg-secondary" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="start" className="w-56">
				{COPY_FORMAT_GROUPS.map((group, i) => (
					<div key={group.label}>
						{i > 0 && <DropdownMenuDivider />}
						<DropdownMenuLabel>{group.label}</DropdownMenuLabel>
						{group.options.map(({ value: v, label, icon: Icon }) => (
							<DropdownMenuItem key={v} onClick={() => onChange(v)}>
								<Icon className="text-fg-secondary size-4" />
								<span className="flex-1 text-sm font-medium">{label}</span>
								{value === v && <Check className="size-4" />}
							</DropdownMenuItem>
						))}
					</div>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

// type ColorMode = "static" | "radian"

// const COLOR_MODE_OPTIONS: {
// 	value: ColorMode
// 	title: string
// 	description: string
// 	icon?: typeof Pipette
// 	iconClassName?: string
// 	image?: string
// }[] = [
// 	{
// 		value: "static",
// 		title: "Static Color",
// 		description: "Static background color. Uses hex value for color code",
// 		icon: Pipette,
// 	},
// 	{
// 		value: "radian",
// 		title: "Radian Colors",
// 		description: "Library colors. The code will use colors from Radian library",
// 		image: "/logo.svg",
// 	},
// ]

const ConfigPreferencesDialog = ({
	open,
	onOpenChange,
	copyFormat,
	onCopyFormatChange,
	// colorMode,
	// onColorModeChange,
	showShadow,
	onShowShadowChange,
	onToneChange,
}: {
	open: boolean
	onOpenChange: (open: boolean) => void
	copyFormat: string
	onCopyFormatChange: (value: string) => void
	// colorMode: ColorMode
	// onColorModeChange: (value: ColorMode) => void
	showShadow: boolean
	onShowShadowChange: (value: boolean) => void
	onToneChange: (value: string) => void
}) => {
	const idPrefix = useId()

	const handleReset = () => {
		// onColorModeChange("static")
		onCopyFormatChange("image")
		onShowShadowChange(true)
		onToneChange("pick-color")
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-xl">
				<DialogHeader className="gap-0 space-y-0 pb-4">
					<DialogTitle>Configure Preferences</DialogTitle>
					<DialogDescription>
						Customize your avatar preferences
					</DialogDescription>
				</DialogHeader>

				<DialogBody className="flex flex-col gap-5">
					{/* Colors */}
					{/* <div className="flex flex-col gap-2">
						<span className="text-sm font-medium">Colors</span>
						<RadioGroup
							value={colorMode}
							onValueChange={(v) => onColorModeChange(v as ColorMode)}
							className="grid grid-cols-2 gap-3">
							{COLOR_MODE_OPTIONS.map(
								({
									value,
									title,
									description,
									icon: Icon,
									image,
									iconClassName,
								}) => {
									const selected = colorMode === value
									const inputId = `${idPrefix}-color-${value}`
									return (
										<Label
											key={value}
											htmlFor={inputId}
											className={`relative flex cursor-pointer flex-col items-start gap-2 rounded-xl border p-3 text-left transition-colors ${selected
												? "border-primary-border"
												: "border-border hover:bg-fill1"
												}`}>
											{value === "static" ? (
												<IconButton
													type="button"
													color="neutral"
													variant="outline"
													onClick={(e) => {
														e.preventDefault()
													}}>
													{Icon && <Icon className="size-3.5" />}
												</IconButton>
											) : (
												<span
													className={`flex size-8 items-center justify-center overflow-hidden rounded-lg ${iconClassName ?? ""}`}>
													{image ? (
														<Image
															src={image}
															alt={image}
															width={32}
															height={32}
														/>
													) : Icon ? (
														<Icon className="size-4" />
													) : null}
												</span>
											)}

											<span className="text-sm font-medium">{title}</span>
											<span className="text-fg-secondary text-xs leading-snug">
												{description}
											</span>

											<RadioGroupItem
												id={inputId}
												value={value}
												size="sm"
												className="absolute right-2 top-2"
											/>
										</Label>
									)
								}
							)}
						</RadioGroup>
					</div> */}

					{/* <div className="mx-0 border-b border-dashed" /> */}

					{/* Copy button functionality */}
					<div className="flex items-center justify-between gap-4">
						<div className="flex flex-col gap-0.5">
							<span className="text-sm font-medium">Default Copy Button</span>
							<span className="text-fg-secondary text-xs leading-snug">
								Change the default copy function to your preference
							</span>
						</div>
						<CopyFormatDropdown
							value={copyFormat}
							onChange={onCopyFormatChange}
						/>
					</div>

					<div className="mx-0 border-b border-dashed" />

					{/* Shadow toggle */}
					<div className="flex items-center justify-between gap-4">
						<div className="flex flex-col gap-0.5">
							<span className="text-sm font-medium">Show Shadow</span>
							<span className="text-fg-secondary text-xs leading-snug">
								Toggle the shadow overlay on avatar tiles
							</span>
						</div>
						<SwitchWrapper>
							<Switch
								checked={showShadow}
								onCheckedChange={onShowShadowChange}
							/>
						</SwitchWrapper>
					</div>
				</DialogBody>

				<DialogFooter className="justify-between">
					<Button
						color="neutral"
						variant="outline"
						className="hidden sm:block"
						onClick={handleReset}>
						Reset Config
					</Button>
					<IconButton
						color="neutral"
						variant="outline"
						className="sm:hidden"
						onClick={handleReset}>
						<RotateCw />
					</IconButton>
					<div className="flex items-center gap-2">
						<DialogClose asChild>
							<Button color="neutral" variant="outline">
								Cancel
							</Button>
						</DialogClose>
						<DialogClose asChild>
							<Button color="primary">Save Changes</Button>
						</DialogClose>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default ConfigPreferencesDialog
