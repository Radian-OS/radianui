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
			className="relative mx-auto w-full max-w-[1440px]">
			<div className="border-soft mx-auto flex max-w-360 flex-col overflow-hidden border border-t-0">
				<div className="border-soft flex w-full flex-col gap-12 border-b px-0 sm:px-5 md:px-15 lg:flex-row">
					<div className="flex flex-1 flex-col gap-8 px-5 pt-15 sm:px-0">
						<h2
							id="faq-title"
							className="heading-4 text-fg text-[32px] leading-[40px] font-medium">
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

					<div className="border-soft w-full flex-1 border border-x-0 border-b-0 sm:border-x lg:border-t-0">
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
