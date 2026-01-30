"use client"

import { useSearchParams } from "next/navigation"
import { GetEarlyUpdatesDialog } from "./get-early-updates-dialog"

export function GetEarlyUpdatesDialogController() {
	const searchParams = useSearchParams()
	const isOpen = searchParams.get("dialog") === "get-early-updates"

	if (!isOpen) return null

	return <GetEarlyUpdatesDialog />
}
