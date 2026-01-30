"use client"

import { useSearchParams } from "next/navigation"
import { GetProductUpdatesDialog } from "./get-product-updates-dialog"

export function GetProductUpdatesDialogController() {
	const searchParams = useSearchParams()
	const isOpen = searchParams.get("dialog") === "get-product-updates"

	if (!isOpen) return null

	return <GetProductUpdatesDialog />
}
