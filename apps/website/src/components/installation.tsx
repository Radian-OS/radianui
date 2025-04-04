"use client"

import Link from "next/link"
import { frameworkItems } from "@/config/framework-config"

export default function Installation() {
	return (
		<div>
			<div className="mt-6 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
				{frameworkItems.map((item) => (
					<Link
						key={item.name}
						href={item.link}
						className="hover:bg-bg3 flex flex-col items-center justify-center gap-2 rounded-lg border px-6 py-10">
						<svg
							role="img"
							viewBox={item.name === "Laravel" ? "0 0 62 65" : "0 0 24 24"}
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							className="size-10">
							<title>{item.name}</title>
							<path d={`${item.path}`} />
						</svg>
						<p>{item.name}</p>
					</Link>
				))}
			</div>
		</div>
	)
}
