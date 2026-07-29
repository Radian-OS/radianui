"use client"

import { useState } from "react"
import FAQAccordion, { FAQ_CATEGORIES } from "@/components/home/faq-accordion"
import { Button } from "@/registry/ui/button"
import DiagonalDivider from "./SvgDivider"

export default function FAQSection() {
	const [activeCategory, setActiveCategory] = useState<string>("general")

	return (
		<section
			aria-labelledby="faq-title"
			className="max-w-368 relative mx-auto w-full px-4 lg:px-5">
			<div className="border-soft mx-auto flex max-w-[1440px] flex-col overflow-hidden border">
				<div className="md:px-15 flex w-full flex-col gap-12 px-0 sm:px-5 lg:flex-row">
					<div className="pt-15 flex flex-1 flex-col gap-8 px-5 sm:px-0">
						<h2
							id="faq-title"
							className="heading-4 text-fg text-[32px] font-medium leading-[40px]">
							Frequently Asked Questions.
						</h2>
						<div className="flex gap-2.5">
							{FAQ_CATEGORIES.map((cat) => {
								const Icon = cat.icon
								return (
									<Button
										key={cat.value}
										color="neutral"
										className="w-full lg:w-auto"
										variant={activeCategory === cat.value ? "outline" : "soft"}
										onClick={() => setActiveCategory(cat.value)}>
										<Icon size={14} />
										{cat.label}
									</Button>
								)
							})}
						</div>
					</div>

					<div className="border-soft w-full flex-1 border border-b-0 lg:border-t-0">
						<FAQAccordion activeCategory={activeCategory} />
					</div>
				</div>
				<DiagonalDivider className="hidden sm:block" />
				<DiagonalDivider
					className="block sm:hidden"
					height={32}
					viewBox="0 0 1440 32"
				/>
			</div>
		</section>
	)
}
