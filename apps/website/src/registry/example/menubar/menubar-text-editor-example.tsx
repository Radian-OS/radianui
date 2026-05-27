"use client"

import { useState } from "react"
import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarGroup,
	MenubarItem,
	MenubarLabel,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from "@/registry/ui/menubar"

export default function MenubarTextEditorExample() {
	const [wordWrap, setWordWrap] = useState(true)
	const [spellCheck, setSpellCheck] = useState(false)
	const [lineNumbers, setLineNumbers] = useState(true)
	const [autoSave, setAutoSave] = useState(true)

	return (
		<Menubar className="w-fit">
			<MenubarMenu>
				<MenubarTrigger>File</MenubarTrigger>
				<MenubarContent className="w-52">
					<MenubarGroup>
						<MenubarItem>
							New File <MenubarShortcut>⌘N</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>
							Open... <MenubarShortcut>⌘O</MenubarShortcut>
						</MenubarItem>
						<MenubarSub>
							<MenubarSubTrigger>Open Recent</MenubarSubTrigger>
							<MenubarSubContent>
								<MenubarGroup>
									<MenubarItem>report-2024.txt</MenubarItem>
									<MenubarItem>notes.md</MenubarItem>
									<MenubarItem>readme.txt</MenubarItem>
								</MenubarGroup>
								<MenubarSeparator />
								<MenubarGroup>
									<MenubarItem>Clear Recent</MenubarItem>
								</MenubarGroup>
							</MenubarSubContent>
						</MenubarSub>
					</MenubarGroup>
					<MenubarSeparator />
					<MenubarGroup>
						<MenubarItem>
							Save <MenubarShortcut>⌘S</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>
							Save As... <MenubarShortcut>⇧⌘S</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>Save All</MenubarItem>
					</MenubarGroup>
					<MenubarSeparator />
					<MenubarGroup>
						<MenubarCheckboxItem
							checked={autoSave}
							onCheckedChange={setAutoSave}>
							Auto Save
						</MenubarCheckboxItem>
					</MenubarGroup>
					<MenubarSeparator />
					<MenubarGroup>
						<MenubarItem>
							Close File <MenubarShortcut>⌘W</MenubarShortcut>
						</MenubarItem>
					</MenubarGroup>
				</MenubarContent>
			</MenubarMenu>

			<MenubarMenu>
				<MenubarTrigger>Edit</MenubarTrigger>
				<MenubarContent className="w-52">
					<MenubarGroup>
						<MenubarItem>
							Undo <MenubarShortcut>⌘Z</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>
							Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
						</MenubarItem>
					</MenubarGroup>
					<MenubarSeparator />
					<MenubarGroup>
						<MenubarItem>
							Cut <MenubarShortcut>⌘X</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>
							Copy <MenubarShortcut>⌘C</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>
							Paste <MenubarShortcut>⌘V</MenubarShortcut>
						</MenubarItem>
					</MenubarGroup>
					<MenubarSeparator />
					<MenubarGroup>
						<MenubarItem>
							Find <MenubarShortcut>⌘F</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>
							Replace <MenubarShortcut>⌘H</MenubarShortcut>
						</MenubarItem>
					</MenubarGroup>
				</MenubarContent>
			</MenubarMenu>

			<MenubarMenu>
				<MenubarTrigger>View</MenubarTrigger>
				<MenubarContent className="w-52">
					<MenubarLabel>Display</MenubarLabel>
					<MenubarGroup>
						<MenubarCheckboxItem
							checked={wordWrap}
							onCheckedChange={setWordWrap}>
							Word Wrap
						</MenubarCheckboxItem>
						<MenubarCheckboxItem
							checked={lineNumbers}
							onCheckedChange={setLineNumbers}>
							Line Numbers
						</MenubarCheckboxItem>
						<MenubarCheckboxItem
							checked={spellCheck}
							onCheckedChange={setSpellCheck}>
							Spell Check
						</MenubarCheckboxItem>
					</MenubarGroup>
					<MenubarSeparator />
					<MenubarGroup>
						<MenubarItem inset>
							Zoom In <MenubarShortcut>⌘+</MenubarShortcut>
						</MenubarItem>
						<MenubarItem inset>
							Zoom Out <MenubarShortcut>⌘-</MenubarShortcut>
						</MenubarItem>
						<MenubarItem inset>
							Reset Zoom <MenubarShortcut>⌘0</MenubarShortcut>
						</MenubarItem>
					</MenubarGroup>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	)
}
