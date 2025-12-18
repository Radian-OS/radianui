import React from "react"
import { Skeleton } from "@/registry/ui/skeleton"
import { Spinner } from "@/registry/ui/spinner"

export function CliCard() {
	return (
		<div className="relative">
			<div className="bg-elevation-negative border-soft w-90 rounded-xl border px-1.5 py-2">
				<div className="flex h-full flex-col gap-2">
					<div className="flex px-2 pt-1">
						<div className="flex h-[8px] items-center gap-1.5">
							<span className="bg-fill4 size-1.5 rounded-full" />
							<span className="bg-fill4 size-1.5 rounded-full" />
							<span className="bg-fill4 size-1.5 rounded-full" />
						</div>
					</div>
					<div className="border-soft bg-elevation-level1 flex h-full w-full gap-3 rounded-lg border p-4">
						<Spinner variant="activity" className="text-primary size-5" />
						<p className="text-fg-secondary text-[13px] font-normal" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
							npx radianui@latest init --next
						</p>
					</div>
				</div>
			</div>
			<div className="bg-elevation-negative border-soft w-91 absolute right-[-6rem] top-40 rounded-xl border px-1.5 py-2">
				<div className="flex h-full flex-col gap-2">
					<div className="flex items-center gap-3 px-2 pt-1">
						<div className="flex items-center gap-1.5">
							<span className="bg-fill4 size-1.5 rounded-full" />
							<span className="bg-fill4 size-1.5 rounded-full" />
							<span className="bg-fill4 size-1.5 rounded-full" />
						</div>
						<p className="text-fg-secondary text-[13px] font-normal" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
							Installation
						</p>
					</div>
					<div className="border-soft bg-elevation-level1 flex h-full w-full flex-col rounded-lg border p-4">
						<p className="text-fg-secondary text-[13px] font-normal" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
							√ No package.json found at C:\Users\Radi
						</p>
						<p className="text-fg-secondary text-[13px] font-normal" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
							√ What would you like to name your proje
						</p>
						<p className="text-fg-secondary text-[13px] font-normal" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
							√ Would you like to use /src directory?
						</p>
						<div className="flex flex-col gap-2 pt-2">
							<Skeleton className="w-70 h-3 rounded-lg" />
							<Skeleton className="h-3 w-20 rounded-lg" />
							<Skeleton className="h-3 w-60 rounded-lg" />
							<Skeleton className="h-3 w-60 rounded-lg" />
							<Skeleton className="h-3 w-40 rounded-lg" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
