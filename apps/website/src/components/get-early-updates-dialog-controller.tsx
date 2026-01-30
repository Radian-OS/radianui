"use client"

import { useSearchParams } from "next/navigation"
import { GetEarlyUpdatesDialog } from "./get-early-updates-dialog"

export function GetEarlyUpdatesDialogController() {
	const searchParams = useSearchParams()
	const isOpen = searchParams.get("modal") === "subscribe"

	if (!isOpen) return null

	return <GetEarlyUpdatesDialog />
}
