"use client"

import React, { useRef, useState } from "react"
import { Ban, Dices, X } from "lucide-react"
import Image from "next/image"
import {
	type ActiveInfo,
	BACKGROUNDS,
	CDN_COLOR_NAMES,
	type ColorMode,
	GRADIENT_IMAGES,
	RADIAN_COLORS,
	type RadianColor,
	SOLID_COLORS,
	type SolidColor,
	type ToneFilterDropdownProps,
	formatColorName,
	getActiveInfo,
} from "@/constants/tone-filter-data"
import { cn } from "@/lib/utils"
import { Button, CompactButton, IconButton } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"

export {
	BACKGROUNDS,
	GRADIENT_IMAGES,
	CDN_COLOR_NAMES,
	RADIAN_COLORS,
	SOLID_COLORS,
	formatColorName,
	getActiveInfo,
}
export type {
	ActiveInfo,
	ColorMode,
	RadianColor,
	SolidColor,
	ToneFilterDropdownProps,
}

function TriggerSwatch({ activeInfo }: { activeInfo: ActiveInfo }) {
	if (activeInfo.type === "radian" && activeInfo.swatch) {
		return (
			<span
				className="border-border size-5 rounded-sm border"
				style={{ backgroundColor: `var(${activeInfo.swatch.variable})` }}
			/>
		)
	}

	if (activeInfo.type === "solid" && activeInfo.swatch) {
		return (
			<span
				className={`border-border size-5 rounded-sm border ${activeInfo.swatch.className}`}
			/>
		)
	}

	if (
		(activeInfo.type === "gradient-img" || activeInfo.type === "background") &&
		activeInfo.swatch
	) {
		return (
			<span className="border-border relative size-5 overflow-hidden rounded-sm border">
				<Image
					src={activeInfo.swatch}
					alt=""
					fill
					sizes="14px"
					className="object-cover"
				/>
			</span>
		)
	}

	if (activeInfo.type === "custom-hex" && activeInfo.swatch) {
		return (
			<span
				className="border-border size-5 rounded-sm border"
				style={{ backgroundColor: activeInfo.swatch }}
			/>
		)
	}

	return (
		<span className="border-border bg-elevation-level2 size-5 rounded-sm border" />
	)
}

export function ToneFilterDropdown({
	value,
	onChange,
	colorMode = "static",
}: ToneFilterDropdownProps) {
	const [open, setOpen] = useState(false)
	const colorInputRef = useRef<HTMLInputElement>(null)
	const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
	const pendingColorRef = useRef<string | null>(null)
	const isColorPickerActiveRef = useRef(false)

	const activeInfo = getActiveInfo(value)

	const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedColor = e.target.value
		pendingColorRef.current = selectedColor

		if (debounceTimerRef.current) {
			clearTimeout(debounceTimerRef.current)
		}

		debounceTimerRef.current = setTimeout(() => {
			React.startTransition(() => {
				onChange(selectedColor)
			})
			pendingColorRef.current = null
			debounceTimerRef.current = null
		}, 80)
	}

	const handleCustomColorCommit = () => {
		if (pendingColorRef.current) {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current)
				debounceTimerRef.current = null
			}
			const finalColor = pendingColorRef.current
			pendingColorRef.current = null
			React.startTransition(() => {
				onChange(finalColor)
			})
		}
	}

	return (
		<DropdownMenu
			open={open}
			onOpenChange={(nextOpen) => {
				if (!nextOpen && isColorPickerActiveRef.current) return
				setOpen(nextOpen)
			}}
			indicatorPosition="right">
			<DropdownMenuTrigger asChild>
				<Button
					color="neutral"
					variant="outline"
					className="justify-start px-2 md:w-42">
					<TriggerSwatch activeInfo={activeInfo} />
					<p className="hidden sm:block">{activeInfo.label}</p>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align="center"
				className="rounded-xl p-0"
				onInteractOutside={(e) => {
					if (isColorPickerActiveRef.current) {
						e.preventDefault()
					}
				}}
				onFocusOutside={(e) => {
					if (isColorPickerActiveRef.current) {
						e.preventDefault()
					}
				}}>
				{/* <ScrollArea className="h-105"> */}
				{/* Header */}
				<div className="flex items-center justify-between px-4 py-3">
					<span className="text-sm font-semibold">Change Background</span>
					<CompactButton
						onClick={() => setOpen(false)}
						color="neutral"
						size="20"
						variant="soft">
						<X />
					</CompactButton>
				</div>
				<Divider className="p-0" />

				<div className="flex flex-col">
					{/* Colors */}
					<div className="flex flex-col gap-2.5 px-4 py-3">
						<DropdownMenuLabel className="px-0 text-xs">
							{colorMode === "radian" ? "Radian Colors" : "Colors"}
						</DropdownMenuLabel>
						<div className="grid grid-cols-9 gap-2">
							{/* Clear / None Button */}
							<IconButton
								type="button"
								onClick={() => onChange("none")}
								color="neutral"
								size="28"
								variant="outline"
								title="Clear Background"
								aria-label="Clear Background">
								<Ban />
							</IconButton>

							{/* Random Color Button */}
							<IconButton
								type="button"
								onClick={() => onChange("pick-color")}
								color="neutral"
								size="28"
								variant="outline"
								title="Random Color"
								aria-label="Random Color"
								className={
									value === "pick-color"
										? "ring-primary ring-2 ring-offset-2"
										: ""
								}>
								<Dices />
							</IconButton>

							{colorMode === "radian"
								? RADIAN_COLORS.map((c) => (
										<button
											key={c.id}
											type="button"
											onClick={() => onChange(c.id)}
											title={c.label}
											aria-label={c.label}
											style={{ backgroundColor: `var(${c.variable})` }}
											className={`size-7 cursor-pointer rounded-lg transition-transform active:scale-95 ${
												c.label === "Neutral" ? "border-alpha border" : ""
											} ${
												value === c.id
													? "ring-primary ring-2 ring-offset-2"
													: ""
											}`}
										/>
									))
								: SOLID_COLORS.map((c) => (
										<button
											key={c.id}
											type="button"
											onClick={() => onChange(c.id)}
											title={formatColorName(c.id)}
											aria-label={formatColorName(c.id)}
											className={cn(
												"border-soft size-7 cursor-pointer rounded-lg border transition-transform active:scale-95",
												c.className,
												// c.id === "Cool-Gray/L100%" && "border-soft border",
												value === c.id &&
													"ring-primary ring-offset-elevation-level2 ring-2 ring-offset-2"
											)}
										/>
									))}

							{/* Custom Color Picker */}
							<label
								title="Custom Color"
								aria-label="Custom Color Picker"
								style={{
									background:
										"conic-gradient(from 180deg, #f87171, #fbbf24, #a3e635, #34d399, #38bdf8, #818cf8, #e879f9, #f87171)",
								}}
								className={cn(
									"border-border relative size-7 cursor-pointer overflow-hidden rounded-lg border transition-transform active:scale-95",
									activeInfo.type === "custom-hex" &&
										"ring-primary ring-offset-elevation-level2 ring-2 ring-offset-2"
								)}>
								<input
									ref={colorInputRef}
									type="color"
									className="absolute inset-0 size-full cursor-pointer opacity-0"
									value={value.startsWith("#") ? value : "#ffffff"}
									onFocus={() => {
										isColorPickerActiveRef.current = true
									}}
									onClick={() => {
										isColorPickerActiveRef.current = true
									}}
									onChange={handleCustomColorChange}
									onBlur={() => {
										handleCustomColorCommit()
										setTimeout(() => {
											isColorPickerActiveRef.current = false
										}, 500)
									}}
								/>
							</label>
						</div>
					</div>

					{/* <DropdownMenuDivider className="mx-0" /> */}

					{/* Gradients */}
					{/* <div className="flex flex-col gap-2.5 px-4 py-3">
							<DropdownMenuLabel className="px-0 text-xs">
								Gradients
							</DropdownMenuLabel>
							<div className="grid grid-cols-9 gap-2">
								{GRADIENT_IMAGES.map((src, idx) => {
									const colorName = getCdnColorDisplayName(CDN_COLOR_NAMES[idx])
									return (
										<button
											key={src}
											type="button"
											onClick={() => onChange(src)}
											title={`Gradient ${colorName}`}
											aria-label={`Gradient ${colorName}`}
											className={`relative size-7 cursor-pointer overflow-hidden rounded-lg transition-transform active:scale-95 ${
												value === src ? "ring-primary ring-2 ring-offset-2" : ""
											}`}>
											<Image
												src={src}
												alt={`Gradient ${colorName}`}
												fill
												sizes="80px"
												className="object-cover"
											/>
										</button>
									)
								})}
								<IconButton
									type="button"
									onClick={() => onChange("pick-gradient")}
									color="neutral"
									size="28"
									variant="outline"
									title="Random Gradient"
									aria-label="Random Gradient"
									className={
										value === "pick-gradient"
											? "ring-primary ring-2 ring-offset-2"
											: ""
									}>
									<Dices />
								</IconButton>
							</div>
						</div>

						<DropdownMenuDivider className="mx-0" />
 */}
					{/* Background Images */}
					{/* <div className="flex flex-col gap-2.5 px-4 py-3">
							<DropdownMenuLabel className="px-0 text-xs">
								Background
							</DropdownMenuLabel>
							<div className="grid grid-cols-4 gap-2">
								<AspectRatio
									ratio={4 / 3}
									onClick={() => onChange("pick-background")}
									className={`bg-fill1 flex cursor-pointer items-center justify-center rounded-lg transition-transform active:scale-95 ${value === "pick-background"
											? "ring-primary ring-2 ring-offset-2"
											: ""
										}`}
									title="Random Background">
									<Dices className="text-fg-secondary size-4" />
								</AspectRatio>
								{BACKGROUNDS.map((src, idx) => {
									const colorName = getCdnColorDisplayName(CDN_COLOR_NAMES[idx])
									return (
										<AspectRatio
											ratio={4 / 3}
											key={src}
											onClick={() => onChange(src)}
											className={`relative cursor-pointer overflow-hidden rounded-lg transition-transform active:scale-95 ${value === src ? "ring-primary ring-2 ring-offset-2" : ""
												}`}
											title={`Background ${colorName}`}>
											<Image
												src={src}
												alt={`Background ${colorName}`}
												fill
												sizes="80px"
												className="object-cover"
											/>
										</AspectRatio>
									)
								})}
							</div>
						</div> */}
				</div>
				{/* </ScrollArea> */}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default ToneFilterDropdown
