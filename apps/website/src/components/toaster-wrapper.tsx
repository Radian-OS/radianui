"use client"

import { useTheme } from "next-themes"
import { Toaster, ToasterProps } from "sonner"
import { useToast } from "@/contexts/toast-context"

export default function ToasterWrapper() {
	const { theme = "system" } = useTheme()
	const { position, isExpandable } = useToast()

	return (
		<Toaster
			expand={isExpandable}
			position={position}
			theme={theme as ToasterProps["theme"]}
		/>
	)
}
