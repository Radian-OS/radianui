"use client"

import Link from "next/link"
import { frameworkItems } from "@/config/framework-config"

export default function Installation() {
	return (
		<div className="mt-6 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
			{frameworkItems.map((item) => (
				<Link
					key={item.name}
					href={item.link}
					className="hover:bg-elevation-level1 flex flex-col items-center justify-center gap-2 rounded-[10px] border px-6 py-10 transition-all duration-200 hover:shadow-md">
					<span className="sr-only">{item.name}</span>
					<svg role="img" viewBox={"0 0 40 40"} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="fill-fg-secondary size-10">
						<title>{item.name}</title>
						<path d={`${item.path}`} />
					</svg>
					<p>{item.name}</p>
				</Link>
			))}
		</div>
	)
}
