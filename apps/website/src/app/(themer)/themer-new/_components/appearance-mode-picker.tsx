import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/styles/default/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"

export default function AppearanceModePicker() {
	const [mounted, setMounted] = useState(false)
	const { resolvedTheme, setTheme } = useTheme()

	useEffect(() => {
		setMounted(true)
	}, [])

	const currentMode = mounted && resolvedTheme === "dark" ? "Dark" : "Light"

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className="bg-fill1-alpha w-full justify-between text-[13px]"
					variant="soft"
					color="neutral">
					<span>Default Mode</span>{" "}
					<span className="text-fg-tertiary font-medium">{currentMode}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				side="right"
				align="end"
				sideOffset={20}
				className="min-w-[280px] shadow-sm">
				<DropdownMenuLabel className="text-fg-tertiary">
					Appearance Mode
				</DropdownMenuLabel>
				<DropdownMenuRadioGroup
					value={mounted && resolvedTheme ? resolvedTheme : "light"}
					onValueChange={(val) => setTheme(val)}>
					<DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
