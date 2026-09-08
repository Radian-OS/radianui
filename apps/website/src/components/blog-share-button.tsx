"use client"

import { useState } from "react"
import { Check, Share2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/registry/ui/button"

export function BlogShareButton({ title }: { title: string }) {
	const [copied, setCopied] = useState(false)

	const handleShare = async () => {
		if (typeof window === "undefined") return
		const url = window.location.href

		if (navigator.share) {
			try {
				await navigator.share({ title, url })
				return
			} catch {
				// User dismissed share sheet or share failed, fallback to copy
			}
		}

		try {
			await navigator.clipboard.writeText(url)
			setCopied(true)
			toast.success("Link copied to clipboard!")
			setTimeout(() => setCopied(false), 2000)
		} catch {
			toast.error("Failed to copy link")
		}
	}

	return (
		<Button variant="ghost" color="neutral" size="28" onClick={handleShare}>
			{copied ? <Check className="size-4" /> : <Share2 className="size-4" />}
			<span>Share</span>
		</Button>
	)
}
