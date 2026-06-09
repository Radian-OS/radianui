"use client"

import { Download, Lock, Plus, RotateCw } from "lucide-react"
import { ProgressCircle } from "@/registry/ui/progress"
import { Skeleton } from "@/registry/ui/skeleton"

function Sidebar() {
	return (
		<aside className="border-soft flex w-32 shrink-0 flex-col gap-2.5 border-l p-3">
			{Array.from({ length: 4 }).map((_, i) => (
				<Skeleton key={i} className="h-16 w-full rounded-md" />
			))}
		</aside>
	)
}

type UsageCardProps = {
	value: number
	label?: string
}

function UsageCard({ value, label = "Usage" }: UsageCardProps) {
	return (
		<div className="border-soft bg-bg flex items-center gap-3 rounded-lg border p-3">
			<div className="flex flex-1 flex-col gap-2">
				<Skeleton className="h-2.5 w-full rounded" />
				<Skeleton className="h-2.5 w-4/5 rounded" />
				<Skeleton className="h-2.5 w-3/5 rounded" />
				<Skeleton className="h-2.5 w-3/4 rounded" />
			</div>

			<ProgressCircle
				value={value}
				size={88}
				strokeWidth={8}
				indicatorClassName="text-primary transition-all duration-[1200ms] ease-in-out"
				trackClassName="text-fill3">
				<div className="flex flex-col items-center leading-none">
					<span className="text-text1 text-[13px] font-medium">{value}%</span>
					<span className="text-text2 mt-0.5 text-[10px]">{label}</span>
				</div>
			</ProgressCircle>
		</div>
	)
}

function SkeletonCard() {
	return (
		<div className="border-soft bg-bg flex flex-col gap-2 rounded-lg border p-3">
			<Skeleton className="h-28 w-full rounded-md" />
		</div>
	)
}

function BrowserChrome({ children }: { children: React.ReactNode }) {
	return (
		<div className="border-soft bg-bg overflow-hidden rounded-xl border">
			{/* Title bar */}
			<div className="border-soft bg-bg px-4.5 flex items-center justify-between gap-2 border-b py-3">
				<div className="flex gap-1.5">
					<div className="bg-error h-3 w-3 rounded-full" />
					<div className="bg-warning h-3 w-3 rounded-full" />
					<div className="bg-success h-3 w-3 rounded-full" />
				</div>
				<div className="bg-fill2 flex w-fit items-center justify-center gap-2 rounded-md px-2">
					<Lock className="text-fg-tertiary size-3" />

					<div className="text-fg-secondary px-10 py-1 text-[13px]">
						https://radianos.com
					</div>
					<RotateCw className="text-fg-tertiary size-3.5" />
				</div>
				<div className="flex items-center gap-2">
					<Download className="text-fg-tertiary size-4" />
					<Plus className="text-fg-tertiary size-4" />
				</div>
			</div>
			{children}
		</div>
	)
}

type DashboardPageProps = {
	usageValue?: number
}

export default function DashboardPage({ usageValue = 50 }: DashboardPageProps) {
	return (
		<BrowserChrome>
			<div className="bg-bg w-210 flex">
				<main className="flex flex-1 flex-col gap-3 p-3">
					{/* Hero skeleton */}
					<Skeleton className="h-44 w-full rounded-lg" />

					{/* Bottom row: 3 equal columns */}
					<div className="grid grid-cols-3 gap-3">
						<UsageCard value={usageValue} label="Usage" />
						<SkeletonCard />
						<SkeletonCard />
					</div>
				</main>
				<Sidebar />
			</div>
		</BrowserChrome>
	)
}
