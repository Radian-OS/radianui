import Link from "next/link"
import { cn } from "@/lib/utils"

export function EmojiFlagGuidance({ compact = false }: { compact?: boolean }) {
	return (
		<section
			className="flex flex-col gap-3"
			aria-label="Flag emoji and flag graphics">
			<h2
				className={cn(
					compact ? "text-fg-secondary text-xs" : "text-lg font-semibold"
				)}>
				Need a country flag graphic?
			</h2>
			<p className={cn("text-fg-secondary", compact && "text-[13px]")}>
				Flag emojis are Unicode text, useful in messages and captions. Their
				appearance depends on the device and emoji font. For country selectors,
				websites, or designs that need consistent artwork, browse our{" "}
				<Link
					href="/resources/flags"
					className="text-primary-text font-medium underline underline-offset-4">
					country flag SVG and PNG collection
				</Link>
				.
			</p>
			<p
				className={cn(
					"text-fg-secondary",
					compact ? "text-[13px]" : "text-sm"
				)}>
				The flags resource includes flat and rounded graphics with selectable
				PNG sizes. Not every flag emoji represents a country; symbols such as
				the chequered or rainbow flag may not have a matching country asset.
			</p>
		</section>
	)
}
