import React from "react"
import Link from "next/link"
import { navLinks } from "@/components/navbar/nav-links"
import { Button } from "@/styles/default/ui/button"

export function DesktopNavigation() {
	return (
		<section className="hidden flex-1 items-center xl:flex">
			<ul className="text-fg1 flex items-center gap-1 text-sm font-medium">
				{navLinks.map((item) => (
					<li key={item.name}>
						<Button variant={"ghost"} color={"neutral"} asChild>
							<Link
								href={item.link}
								target={item.isExternal ? "_blank" : "_self"}>
								{item.name}
							</Link>
						</Button>
					</li>
				))}
			</ul>
		</section>
	)
}
