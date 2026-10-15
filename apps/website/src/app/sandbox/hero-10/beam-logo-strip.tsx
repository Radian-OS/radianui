import Image from "next/image"

const logos = [
	{
		name: "Claude",
		src: "https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/ai/icon/claude.svg",
	},
	{
		name: "Gemini",
		src: "https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/ai/icon/gemini.svg",
	},
	{
		name: "Hugging Face",
		src: "https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/ai/icon/hugging-face.svg",
	},
	{
		name: "Perplexity",
		src: "https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/ai/icon/perplexity.svg",
	},
	{
		name: "Auth0",
		src: "https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/business-marketing/icon/auth0.svg",
	},
	{
		name: "AWS",
		src: "https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/cloud-devops/icon/aws.svg",
	},
	{
		name: "Cloudflare",
		src: "https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/cloud-devops/icon/cloudflare.svg",
	},
	{
		name: "Kubernetes",
		src: "https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/cloud-devops/icon/kubernetes.svg",
	},
]

export function BeamLogoStrip() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-6 px-4 sm:gap-8 md:gap-10 lg:gap-12">
			{logos.map((logo) => (
				<div
					key={logo.name}
					className="flex items-center gap-2 opacity-75 transition-opacity duration-200 hover:opacity-100">
					<Image
						src={logo.src}
						alt={`${logo.name} logo`}
						width={20}
						height={20}
						className="size-5 object-contain"
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
