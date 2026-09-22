"use client"

import React, { useState } from "react"
import { X } from "lucide-react"
import { IconButton } from "@/styles/default/ui/button"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/styles/default/ui/select"
import { Switch } from "@/styles/default/ui/switch"
import { SettingsBanner } from "./settings-banner"
import type {
	AccentColor,
	AppearanceMode,
	ContrastMode,
	LanguageOption,
} from "./types"

interface SettingsGeneralProps {
	onClose?: () => void
}

const ACCENT_COLORS: Record<AccentColor, { label: string; dotClass: string }> =
	{
		default: { label: "Default", dotClass: "bg-zinc-400" },
		blue: { label: "Blue", dotClass: "bg-blue-500" },
		green: { label: "Green", dotClass: "bg-emerald-500" },
		purple: { label: "Purple", dotClass: "bg-purple-500" },
		orange: { label: "Orange", dotClass: "bg-orange-500" },
	}

export function SettingsGeneral({ onClose }: SettingsGeneralProps) {
	const [showBanner, setShowBanner] = useState(true)
	const [appearance, setAppearance] = useState<AppearanceMode>("system")
	const [contrast, setContrast] = useState<ContrastMode>("system")
	const [accentColor, setAccentColor] = useState<AccentColor>("default")
	const [language, setLanguage] = useState<LanguageOption>("auto")
	const [dictationEnabled, setDictationEnabled] = useState(true)

	return (
		<div className="bg-card flex flex-1 flex-col overflow-y-auto">
			{/* Top Header */}
			<div className="border-border/40 flex items-center justify-between border-b px-6 py-4">
				<h2 className="heading-4 text-foreground">General</h2>
				<IconButton
					variant="ghost"
					color="neutral"
					size="32"
					aria-label="Close settings dialog"
					onClick={onClose}>
					<X className="text-fg-secondary size-4" />
				</IconButton>
			</div>

			{/* Content Area */}
			<div className="flex flex-col gap-6 p-6">
				{/* MFA Callout Banner */}
				{showBanner && (
					<SettingsBanner onDismiss={() => setShowBanner(false)} />
				)}

				{/* Setting Rows */}
				<div className="divide-border/40 divide-y">
					{/* Appearance */}
					<div className="flex items-center justify-between py-3.5 first:pt-0">
						<span className="text-fg text-sm font-medium">Appearance</span>
						<Select
							value={appearance}
							onValueChange={(val) => setAppearance(val as AppearanceMode)}>
							<SelectTrigger size="32" className="w-[140px]">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="system">System</SelectItem>
								<SelectItem value="dark">Dark</SelectItem>
								<SelectItem value="light">Light</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Contrast */}
					<div className="flex items-center justify-between py-3.5">
						<span className="text-fg text-sm font-medium">Contrast</span>
						<Select
							value={contrast}
							onValueChange={(val) => setContrast(val as ContrastMode)}>
							<SelectTrigger size="32" className="w-[140px]">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="system">System</SelectItem>
								<SelectItem value="default">Default</SelectItem>
								<SelectItem value="high">High</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Accent color */}
					<div className="flex items-center justify-between py-3.5">
						<span className="text-fg text-sm font-medium">Accent color</span>
						<Select
							value={accentColor}
							onValueChange={(val) => setAccentColor(val as AccentColor)}>
							<SelectTrigger size="32" className="w-[140px]">
								<div className="flex items-center gap-2">
									<span
										className={`size-2.5 shrink-0 rounded-full ${ACCENT_COLORS[accentColor].dotClass}`}
									/>
									<SelectValue />
								</div>
							</SelectTrigger>
							<SelectContent>
								{Object.entries(ACCENT_COLORS).map(([key, item]) => (
									<SelectItem key={key} value={key}>
										<div className="flex items-center gap-2">
											<span
												className={`size-2.5 shrink-0 rounded-full ${item.dotClass}`}
											/>
											<span>{item.label}</span>
										</div>
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* Language */}
					<div className="flex items-center justify-between py-3.5">
						<span className="text-fg text-sm font-medium">Language</span>
						<Select
							value={language}
							onValueChange={(val) => setLanguage(val as LanguageOption)}>
							<SelectTrigger size="32" className="w-[140px]">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="auto">Auto-detect</SelectItem>
								<SelectItem value="en">English (US)</SelectItem>
								<SelectItem value="es">Español</SelectItem>
								<SelectItem value="fr">Français</SelectItem>
								<SelectItem value="de">Deutsch</SelectItem>
								<SelectItem value="ja">日本語</SelectItem>
								<SelectItem value="zh">中文</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Enable Dictation */}
					<div className="flex items-center justify-between py-3.5">
						<div className="flex flex-col gap-0.5 pr-4">
							<span className="text-fg text-sm font-medium">
								Enable Dictation
							</span>
							<p className="text-fg-secondary text-xs">
								Use dictation in the chat composer.
							</p>
						</div>
						<Switch
							size="24"
							shape="pill"
							checked={dictationEnabled}
							onCheckedChange={setDictationEnabled}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
