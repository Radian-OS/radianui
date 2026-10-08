import Image from "next/image"

const BRAND_ITEMS = [
	{
		id: "stripe",
		name: "Stripe",
		lightSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/colored/finance-payments/wordmark/stripe.svg",
		darkSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/finance-payments/wordmark/stripe.svg",
	},
	{
		id: "openai",
		name: "OpenAI",
		lightSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/colored/ai/wordmark/openai.svg",
		darkSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/ai/wordmark/openai.svg",
	},
	{
		id: "anthropic",
		name: "Anthropic",
		lightSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/colored/ai/wordmark/anthropic.svg",
		darkSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/ai/wordmark/anthropic.svg",
	},
	{
		id: "slack",
		name: "Slack",
		lightSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/colored/productivity-work/wordmark/slack.svg",
		darkSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/productivity-work/wordmark/slack.svg",
	},
	{
		id: "claude",
		name: "Claude",
		lightSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/colored/ai/wordmark/claude.svg",
		darkSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/ai/wordmark/claude.svg",
	},
	{
		id: "resend",
		name: "Resend",
		lightSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/colored/business-marketing/wordmark/resend.svg",
		darkSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/business-marketing/wordmark/resend.svg",
	},
]

export function TrustStrip() {
	return (
		<div className="flex flex-col items-center gap-4">
			<p className="text-fg-tertiary text-[11px] font-medium tracking-[0.22em] uppercase">
				Teams shipping with ReUI
			</p>
			<ul
				className="grid w-full max-w-2xl grid-cols-2 items-center gap-x-4 gap-y-3 opacity-90 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-3.5 lg:grid-cols-6 lg:gap-x-5 lg:gap-y-0"
				aria-label="Customer logos">
				{BRAND_ITEMS.map((item) => (
					<li
						key={item.id}
						aria-label={item.name}
						className="flex h-12 items-center justify-center transition-opacity hover:opacity-100">
						<Image
							src={item.lightSrc}
							alt={item.name}
							width={150}
							height={48}
							className="h-[48px] max-h-[48px] w-auto dark:hidden"
							unoptimized
						/>
						<Image
							src={item.darkSrc}
							alt={item.name}
							width={150}
							height={48}
							className="hidden h-[48px] max-h-[48px] w-auto dark:block"
							unoptimized
						/>
					</li>
				))}
			</ul>
		</div>
	)
}
