import React from "react"

interface StatCardProps {
	value: string
	label: string
}

export function StatCard({ value, label }: StatCardProps) {
	return (
		<div className="flex-1 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
			<span className="text-3xl font-extrabold tracking-tight text-black sm:text-4xl">
				{value}
			</span>
			<p className="text-neutral-text mt-1 text-xs font-semibold sm:text-sm">
				{label}
			</p>
		</div>
	)
}
