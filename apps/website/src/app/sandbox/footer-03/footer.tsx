import React from "react"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/styles/default/ui/accordion"
import data from "./data.json"

export function Footer() {
	return (
		<footer className="border-border bg-bg w-full border-t py-10 sm:py-12">
			<div className="mx-auto flex max-w-screen-xl flex-col gap-10 px-5 sm:px-6">
				{/* Top Sections: Desktop 5-Columns Grid */}
				<div className="hidden w-full grid-cols-2 gap-8 sm:grid-cols-3 lg:grid lg:grid-cols-5">
					{data.sections.map((section, idx) => (
						<div key={idx} className="flex flex-col gap-4">
							<h3 className="text-fg text-sm font-semibold">{section.title}</h3>
							<ul className="text-fg-secondary flex flex-col gap-3 text-sm">
								{section.links.map((link, linkIdx) => (
									<li key={linkIdx}>
										<a
											href={link.href}
											className="hover:text-fg transition-colors">
											{link.label}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Mobile Accordion */}
				<div className="w-full lg:hidden">
					<Accordion
						type="single"
						collapsible
						variant="open"
						size="sm"
						indicator="chevron"
						className="w-full">
						{data.sections.map((section, idx) => (
							<AccordionItem
								key={idx}
								value={`item-${idx}`}
								className="border-border border-b py-1">
								<AccordionTrigger className="text-fg text-sm font-medium hover:no-underline">
									{section.title}
								</AccordionTrigger>
								<AccordionContent className="pt-1 pb-3">
									<ul className="text-fg-secondary flex flex-col gap-2.5 text-sm">
										{section.links.map((link, linkIdx) => (
											<li key={linkIdx}>
												<a
													href={link.href}
													className="hover:text-fg transition-colors">
													{link.label}
												</a>
											</li>
										))}
									</ul>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>

				{/* Bottom Bar */}
				<div className="border-border text-fg-secondary flex flex-col-reverse items-center justify-between gap-4 border-t pt-6 text-sm sm:flex-row">
					<p>{data.copyright}</p>
					<div className="flex items-center gap-4">
						{data.socialLinks.map((link) => (
							<a
								key={link.label}
								href={link.href}
								aria-label={link.label}
								target="_blank"
								rel="noreferrer"
								className="transition-opacity hover:opacity-80">
								<img
									src={link.iconUrl}
									alt={link.label}
									className="size-5 dark:hidden"
								/>
								<img
									src={link.iconDarkUrl}
									alt={link.label}
									className="hidden size-5 dark:block"
								/>
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
