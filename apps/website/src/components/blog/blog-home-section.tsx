"use client"

import { usePathname } from "next/navigation"

export function BlogHomeSection() {
	const pathname = usePathname()
	const isBlogHome = pathname?.replace(/\/$/, "") === "/blog"

	if (!isBlogHome) return null

	return (
		<section className="border-soft border-y">
			<div className="mx-auto w-full max-w-360">
				<div className="border-soft flex h-10 w-full max-w-368 flex-col overflow-x-hidden border border-y-0 p-10" />
			</div>
		</section>
	)
}

// Line 7:
// const isBlogArticle = Boolean(pathname?.startsWith("/blog/") && pathname !== "/blog/")

// Line 9:
// if (!isBlogArticle) return null
