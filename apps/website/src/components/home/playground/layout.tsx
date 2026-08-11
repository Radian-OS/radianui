import React from "react"
import { Inter } from "next/font/google"
import { LayoutOption, usePlayground } from "@/contexts/playground"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"

const inter = Inter({ subsets: ["latin"] })

export default function Layout() {
	const { layout, setLayout } = usePlayground()

	return (
		<DropdownMenu indicatorPosition="right">
			<DropdownMenuTrigger asChild>
				<button
					aria-label="Change Layout"
					className={`${inter.className} hover:bg-fill2 text-fg mr-1 flex h-8 cursor-pointer items-center rounded-md px-2 text-sm font-medium`}>
					Layout
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuPortal>
				<DropdownMenuContent sideOffset={10}>
					<DropdownMenuRadioGroup
						value={layout}
						onValueChange={(value) => setLayout(value as LayoutOption)}>
						<DropdownMenuRadioItem value="signin-1">
							Sign In 1
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="signin-2">
							Sign In 2
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="signin-3">
							Sign In 3
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="signup">
							Sign Up
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="hover-card">
							Hover Card
						</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenuPortal>
		</DropdownMenu>
	)
}
