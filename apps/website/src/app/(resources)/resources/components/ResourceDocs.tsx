import type { ReactNode } from "react"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/registry/ui/accordion"

export interface ResourceDocPoint {
	title: string
	description: string
}

export interface ResourceFaqItem {
	question: string
	answer: string
}

export function ResourceDocs({
	label,
	children,
}: {
	label: string
	children: ReactNode
}) {
	return (
		<article
			aria-label={label}
			className="border-soft from-fill1 to-bg flex flex-col gap-10 border-b bg-linear-to-b px-5 py-8 sm:gap-20 sm:px-6 sm:py-20 md:gap-25 md:py-30">
			{children}
		</article>
	)
}

interface ResourceTextSectionProps {
	id: string
	eyebrow: string
	title: string
	children: ReactNode
	points?: ResourceDocPoint[]
	after?: ReactNode
	visual?: ReactNode
	wide?: boolean
}

export function ResourceTextSection({
	id,
	eyebrow,
	title,
	children,
	points,
	after,
	visual,
	wide = false,
}: ResourceTextSectionProps) {
	return (
		<section
			aria-labelledby={id}
			className="flex w-full flex-col gap-8 md:gap-16">
			<div
				className={
					wide
						? "flex w-full flex-col gap-6"
						: "mx-auto flex w-full flex-col gap-6 lg:w-200"
				}>
				<div className="flex flex-col gap-4">
					<p className="text-primary-text text-sm font-medium">{eyebrow}</p>
					<h2 id={id} className="heading-4">
						{title}
					</h2>
					<div className="flex flex-col gap-8">{children}</div>
					{points?.length ? (
						<ul className="flex list-disc flex-col gap-4 pl-5">
							{points.map((point) => (
								<li key={point.title}>
									<span className="font-semibold">{point.title}</span> -{" "}
									{point.description}
								</li>
							))}
						</ul>
					) : null}
					{after}
				</div>
			</div>
			{visual}
		</section>
	)
}

export function ResourceFaq({
	id,
	items,
}: {
	id: string
	items: ResourceFaqItem[]
}) {
	return (
		<section
			aria-labelledby={id}
			className="mx-auto flex w-full flex-col gap-6 lg:w-200">
			<div className="flex flex-col gap-8 md:gap-16">
				<div className="flex flex-col items-center gap-4">
					<p className="text-primary-text text-center text-sm font-medium">
						FAQ
					</p>
					<h2 id={id} className="heading-4 text-center">
						Frequently Asked Questions
					</h2>
					<p className="text-fg-secondary text-center text-base font-normal md:w-[590px]">
						Everything you need to know before adding these assets to your
						design or application.
					</p>
				</div>
				<Accordion
					type="single"
					indicator="plus-minus"
					className="w-full"
					collapsible>
					{items.map((item, index) => (
						<AccordionItem value={`${index + 1}`} key={item.question}>
							<AccordionTrigger className="data-[state=closed]:bg-fill1 data-[state=open]:bg-bg">
								{item.question}
							</AccordionTrigger>
							<AccordionContent className="group-data-[state=closed]:bg-fill1 group-data-[state=open]:bg-bg">
								{item.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	)
}
