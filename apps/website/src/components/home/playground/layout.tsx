import React from "react"
import { Inter } from "next/font/google"
import { LayoutOption, usePlayground } from "@/contexts/playground"
import {
	Dropdown,
	DropdownContent,
	DropdownPortal,
	DropdownRadioGroup,
	DropdownRadioItem,
	DropdownTrigger,
} from "@/registry/ui/dropdown"

const inter = Inter({ subsets: ["latin"] })

export default function Layout() {
	const { layout, setLayout } = usePlayground()

	return (
		<Dropdown indicatorPosition="right">
			<DropdownTrigger asChild>
				<button
					aria-label="Change Layout"
					className={`${inter.className} hover:bg-fill2 text-fg mr-1 flex h-8 cursor-pointer items-center rounded-md px-2 text-sm font-medium`}>
					Layout
				</button>
			</DropdownTrigger>
			<DropdownPortal>
				<DropdownContent sideOffset={10}>
					<DropdownRadioGroup
						value={layout}
						onValueChange={(value) => setLayout(value as LayoutOption)}>
						<DropdownRadioItem value="signin-1">Sign In 1</DropdownRadioItem>
						<DropdownRadioItem value="signin-2">Sign In 2</DropdownRadioItem>
						<DropdownRadioItem value="signin-3">Sign In 3</DropdownRadioItem>
						<DropdownRadioItem value="signup">Sign Up</DropdownRadioItem>
						<DropdownRadioItem value="hover-card">Hover Card</DropdownRadioItem>
					</DropdownRadioGroup>
				</DropdownContent>
			</DropdownPortal>
		</Dropdown>
	)
}
