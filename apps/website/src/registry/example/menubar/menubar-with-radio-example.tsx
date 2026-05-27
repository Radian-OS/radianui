"use client"

import { useState } from "react"
import {
	Menubar,
	MenubarContent,
	MenubarGroup,
	MenubarItem,
	MenubarLabel,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from "@/registry/ui/menubar"

type Theme = "system" | "light" | "dark"
type Language = "en" | "fr" | "de" | "es" | "zh"

export default function MenubarWithRadioExample() {
	const [theme, setTheme] = useState<Theme>("system")
	const [language, setLanguage] = useState<Language>("en")

	const languageLabels: Record<Language, string> = {
		en: "English",
		fr: "French",
		de: "German",
		es: "Spanish",
		zh: "Chinese",
	}

	return (
		<Menubar className="w-full max-w-sm">
			<MenubarMenu>
				<MenubarTrigger>Preferences</MenubarTrigger>
				<MenubarContent className="w-52">
					<MenubarLabel>Theme</MenubarLabel>
					<MenubarRadioGroup
						value={theme}
						onValueChange={(v) => setTheme(v as Theme)}>
						<MenubarGroup>
							<MenubarRadioItem value="system">System</MenubarRadioItem>
							<MenubarRadioItem value="light">Light</MenubarRadioItem>
							<MenubarRadioItem value="dark">Dark</MenubarRadioItem>
						</MenubarGroup>
					</MenubarRadioGroup>
					<MenubarSeparator />
					<MenubarLabel>Language</MenubarLabel>
					<MenubarRadioGroup
						value={language}
						onValueChange={(v) => setLanguage(v as Language)}>
						<MenubarGroup>
							<MenubarRadioItem value="en">English</MenubarRadioItem>
							<MenubarRadioItem value="fr">French</MenubarRadioItem>
							<MenubarRadioItem value="de">German</MenubarRadioItem>
							<MenubarRadioItem value="es">Spanish</MenubarRadioItem>
							<MenubarRadioItem value="zh">Chinese</MenubarRadioItem>
						</MenubarGroup>
					</MenubarRadioGroup>
				</MenubarContent>
			</MenubarMenu>

			<MenubarMenu>
				<MenubarTrigger>Help</MenubarTrigger>
				<MenubarContent className="w-48">
					<MenubarGroup>
						<MenubarItem>
							Documentation <MenubarShortcut>F1</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>Report Issue</MenubarItem>
						<MenubarItem>Release Notes</MenubarItem>
					</MenubarGroup>
					<MenubarSeparator />
					<MenubarGroup>
						<MenubarItem>About</MenubarItem>
					</MenubarGroup>
				</MenubarContent>
			</MenubarMenu>

			<div className="text-fg-secondary ml-auto flex items-center gap-2 px-2 text-xs">
				<span className="capitalize">{theme}</span>
				<span>·</span>
				<span>{languageLabels[language]}</span>
			</div>
		</Menubar>
	)
}
