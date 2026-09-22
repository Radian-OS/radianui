export interface NavItem {
	id: string
	label: string
	icon: string
}

export type AppearanceMode = "system" | "dark" | "light"
export type ContrastMode = "system" | "default" | "high"
export type AccentColor = "default" | "blue" | "green" | "purple" | "orange"
export type LanguageOption = "auto" | "en" | "es" | "fr" | "de" | "ja" | "zh"

export interface GeneralSettingsState {
	appearance: AppearanceMode
	contrast: ContrastMode
	accentColor: AccentColor
	language: LanguageOption
	dictationEnabled: boolean
	showMfaBanner: boolean
}

export const SETTINGS_NAV_ITEMS: { id: string; label: string }[] = [
	{ id: "general", label: "General" },
	{ id: "notifications", label: "Notifications" },
	{ id: "personalization", label: "Personalization" },
	{ id: "plugins", label: "Plugins" },
	{ id: "voice", label: "Voice" },
	{ id: "billing", label: "Billing" },
	{ id: "usage", label: "Usage" },
	{ id: "analytics", label: "Analytics" },
	{ id: "data-controls", label: "Data controls" },
	{ id: "storage", label: "Storage" },
	{ id: "safety-wellbeing", label: "Safety & wellbeing" },
	{ id: "security-login", label: "Security and login" },
	{ id: "parental-controls", label: "Parental controls" },
	{ id: "account", label: "Account" },
]
