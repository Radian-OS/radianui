import React from "react"
import Link from "next/link"
import { navLinks } from "@/components/navbar/nav-links"
import { Button } from "@/registry/ui/button"

export function DesktopNavigation() {
	return (
		<section className="hidden flex-1 items-center xl:flex">
			<ul className="text-fg1 flex items-center gap-1 text-sm font-medium">
				{navLinks.map((item) => (
					<li key={item.name}>
						<Link href={item.link} tabIndex={-1}>
							<Button variant={"ghost"} color={"neutral"}>
								{item.name}
							</Button>
						</Link>
					</li>
				))}
			</ul>
		</section>
	)
}
