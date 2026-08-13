"use client"

import React, { useState } from "react"
import { Minus, Plus } from "lucide-react"

export interface FaqItem {
	question: string
	answer: string
}

interface FaqAccordionProps {
	question: string
	answer: string
}

export function FaqAccordion({ question, answer }: FaqAccordionProps) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="border-border bg-elevation-level1 hover:border-fg-tertiary/30 rounded-2xl border transition-all duration-300">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors duration-200"
				aria-expanded={isOpen}>
				<span className="text-fg text-sm font-bold sm:text-base">
					{question}
				</span>
				<div className="bg-fill2 text-fg flex size-6 shrink-0 items-center justify-center rounded-full transition-transform duration-300">
					{isOpen ? (
						<Minus className="animate-in fade-in zoom-in-50 size-3.5 stroke-[3.5]" />
					) : (
						<Plus className="animate-in fade-in zoom-in-50 size-3.5 stroke-[3.5]" />
					)}
				</div>
			</button>
			<div
				className={`grid transition-all duration-300 ease-in-out ${
					isOpen
						? "grid-rows-[1fr] opacity-100"
						: "grid-rows-[0fr] overflow-hidden opacity-0"
				}`}>
				<div className="overflow-hidden">
					<p className="text-fg-secondary px-5 pb-5 text-xs leading-relaxed sm:text-sm">
						{answer}
					</p>
				</div>
			</div>
		</div>
	)
}
