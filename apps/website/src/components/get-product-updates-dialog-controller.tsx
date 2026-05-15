"use client"

import { useSearchParams } from "next/navigation"
import { GetProductUpdatesDialog } from "./get-product-updates-dialog"

type GetProductUpdatesDialogControllerProps = {
	subscribeAction: (
		email: string
	) => Promise<{ message: string; status: number }>
}

export function GetProductUpdatesDialogController({
	subscribeAction,
}: GetProductUpdatesDialogControllerProps) {
	const searchParams = useSearchParams()
	const isOpen = searchParams.get("dialog") === "get-product-updates"

	if (!isOpen) return null

	return <GetProductUpdatesDialog subscribeAction={subscribeAction} />
}
