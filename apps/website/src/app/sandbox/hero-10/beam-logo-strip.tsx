import Image from "next/image"

const logos = [
	{ name: "Coda", domain: "coda.io" },
	{ name: "Dokey", domain: "dokey.io" },
	{ name: "Webflow", domain: "webflow.com" },
	{ name: "GitLab", domain: "gitlab.com" },
	{ name: "Clearbit", domain: "clearbit.com" },
	{ name: "Stripe", domain: "stripe.com" },
	{ name: "Slack", domain: "slack.com" },
]

export function BeamLogoStrip() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-6 px-4 sm:gap-8 md:gap-10 lg:gap-12">
			{logos.map((logo) => (
				<div
					key={logo.name}
					className="flex items-center gap-2 opacity-50 transition-opacity hover:opacity-80">
					<Image
						src={`https://www.google.com/s2/favicons?sz=32&domain=${logo.domain}`}
						alt={`${logo.name} logo`}
						width={20}
						height={20}
						className="grayscale"
						unoptimized
					/>
					<span className="text-fg-tertiary text-xs font-semibold sm:text-sm">
						{logo.name}
					</span>
				</div>
			))}
		</div>
	)
}
