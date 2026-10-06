"use client"

import React from "react"
import { Check, Circle, CircleDot } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import { cn } from "@/lib/utils"
import type { ChecklistStep, StepStatus } from "./types"

interface ChecklistStepItemProps {
	step: ChecklistStep
	status: StepStatus
	onSelectStep: (id: string) => void
	onResume?: () => void
}

export function ChecklistStepItem({
	step,
	status,
	onSelectStep,
	onResume,
}: ChecklistStepItemProps) {
	const isCompleted = status === "completed"
	const isActive = status === "active"

	const renderIcon = () => {
		if (isCompleted) {
			return (
				<div className="bg-fg text-fg-inverse flex size-5.5 shrink-0 items-center justify-center rounded-full shadow-xs">
					<Check className="size-3.5 stroke-[3]" />
				</div>
			)
		}
		if (isActive) {
			return (
				<div className="text-fg flex size-5.5 shrink-0 items-center justify-center">
					<CircleDot className="size-5.5 stroke-[2.2]" />
				</div>
			)
		}
		return (
			<div className="text-fg-tertiary flex size-5.5 shrink-0 items-center justify-center">
				<Circle className="size-5.5 stroke-[1.8]" />
			</div>
		)
	}

	return (
		<div
			onClick={() => onSelectStep(step.id)}
			className={cn(
				"group flex w-full cursor-pointer items-center justify-between transition-all duration-200",
				isActive
					? "border-border/90 bg-elevation-level1/40 rounded-xl border p-3.5 shadow-xs"
					: "hover:bg-elevation-level1/20 rounded-lg p-2.5"
			)}>
			<div className="flex items-center gap-3.5">
				{renderIcon()}
				<div className="flex flex-col text-left">
					<span
						className={cn(
							"text-sm font-semibold transition-colors",
							isActive || isCompleted
								? "text-fg"
								: "text-fg-secondary group-hover:text-fg"
						)}>
						{step.title}
					</span>
					<span className="text-fg-secondary text-xs">{step.description}</span>
				</div>
			</div>

			{isActive && (
				<Button
					type="button"
					variant="strong"
					color="neutral"
					size="28"
					className="h-7 shrink-0 rounded-lg px-3 text-xs font-semibold shadow-xs"
					onClick={(e) => {
						e.stopPropagation()
						onResume?.()
					}}>
					{step.actionText || "Resume"}
				</Button>
			)}
		</div>
	)
}
