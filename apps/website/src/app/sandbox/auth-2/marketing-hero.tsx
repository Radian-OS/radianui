export function MarketingHero() {
	return (
		<div className="flex max-w-xl flex-col gap-7 sm:gap-8">
			{/* Pill badge with guaranteed visible solid dot matching reference screenshot */}
			<div className="border-border bg-bg/90 text-fg-secondary inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5 backdrop-blur-sm select-none">
				<span
					className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-black dark:bg-white"
					aria-hidden="true"
				/>
				<span className="text-fg-secondary text-[13px] leading-none font-normal">
					Global product teams ship on ReUI
				</span>
			</div>

			{/* Title with exact 56px desktop size and new Cyan -> Blue -> Indigo gradient on product */}
			<h1 className="text-fg text-4xl leading-[1.05] font-semibold tracking-[-0.02em] text-balance sm:text-5xl lg:text-[56px]">
				The UI layer to <br className="hidden sm:inline" />
				grow your{" "}
				<span className="bg-gradient-to-r from-[#06b6d4] via-[#3b82f6] to-[#6366f1] bg-clip-text text-transparent">
					product
				</span>
				.
			</h1>

			{/* Description text with exact 18px sizing */}
			<p className="text-fg-secondary max-w-xl text-[18px] leading-relaxed text-pretty">
				A premium block library built on shadcn. Auth, billing, dashboards, and
				settings. Production-ready the day you clone it.
			</p>
		</div>
	)
}
