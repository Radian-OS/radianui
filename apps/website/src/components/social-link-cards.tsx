import React from "react"
import Link from "next/link"

const socialLinks = [
	{
		name: "Github",
		icon: (
			<svg fill="currentColor" className="fill-fg-secondary size-5" viewBox="0 0 1.2 1.2" xmlns="http://www.w3.org/2000/svg">
				<path d="M0.6 0.112a0.5 0.5 0 0 0 -0.158 0.974c0.025 0.004 0.034 -0.011 0.034 -0.024 0 -0.012 -0.001 -0.051 -0.001 -0.093 -0.126 0.023 -0.158 -0.031 -0.168 -0.059a0.182 0.182 0 0 0 -0.051 -0.071c-0.017 -0.009 -0.043 -0.033 -0.001 -0.033a0.1 0.1 0 0 1 0.077 0.051 0.107 0.107 0 0 0 0.146 0.041 0.105 0.105 0 0 1 0.032 -0.067c-0.111 -0.013 -0.228 -0.056 -0.228 -0.247a0.195 0.195 0 0 1 0.051 -0.134 0.18 0.18 0 0 1 0.005 -0.133s0.042 -0.013 0.138 0.051a0.472 0.472 0 0 1 0.25 0c0.096 -0.065 0.138 -0.051 0.138 -0.051a0.18 0.18 0 0 1 0.005 0.133 0.194 0.194 0 0 1 0.051 0.134c0 0.192 -0.117 0.234 -0.228 0.247a0.119 0.119 0 0 1 0.034 0.093c0 0.067 -0.001 0.121 -0.001 0.138 0 0.013 0.009 0.029 0.034 0.024A0.5 0.5 0 0 0 0.6 0.112" />
			</svg>
		),
		href: "#",
		description: "View our repositories",
	},
	{
		name: "X (formerly Twitter)",
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 21 20" fill="none">
				<path
					d="M15.4594 2.5H18.015L12.4316 8.85383L19 17.5H13.857L9.82887 12.2562L5.2197 17.5H2.66249L8.63446 10.7038L2.33337 2.5H7.60694L11.248 7.29307L15.4594 2.5ZM14.5624 15.9769H15.9785L6.83746 3.94307H5.31782L14.5624 15.9769Z"
					fill="currentColor"
					className="fill-fg-secondary"
				/>
			</svg>
		),
		href: "#",
		description: "Follow us on X",
	},
	{
		name: "Discord",
		icon: (
			<svg className="size-5" viewBox="0 0 1.2 1.2" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M1.016 0.225c-0.077 -0.034 -0.159 -0.06 -0.244 -0.074a0.004 0.004 0 0 0 -0.004 0.002c-0.011 0.018 -0.022 0.043 -0.03 0.061a0.93 0.93 0 0 0 -0.274 0 0.6 0.6 0 0 0 -0.031 -0.061A0.004 0.004 0 0 0 0.428 0.15c-0.086 0.014 -0.168 0.04 -0.244 0.075a0.005 0.005 0 0 0 -0.002 0.001C0.027 0.455 -0.016 0.678 0.005 0.898a0.004 0.004 0 0 0 0.002 0.003 1 1 0 0 0 0.3 0.149 0.004 0.004 0 0 0 0.004 -0.001c0.023 -0.031 0.044 -0.064 0.061 -0.098 0.001 -0.002 0 -0.004 -0.002 -0.005a0.65 0.65 0 0 1 -0.094 -0.044 0.004 0.004 0 0 1 0 -0.006q0.01 -0.007 0.019 -0.014a0.004 0.004 0 0 1 0.004 -0.001c0.196 0.088 0.409 0.088 0.603 0a0.004 0.004 0 0 1 0.004 0q0.009 0.007 0.019 0.014a0.004 0.004 0 0 1 0 0.006q-0.045 0.026 -0.094 0.044a0.004 0.004 0 0 0 -0.002 0.005c0.018 0.034 0.039 0.067 0.061 0.098a0.004 0.004 0 0 0 0.004 0.001 1 1 0 0 0 0.3 -0.149 0.004 0.004 0 0 0 0.002 -0.003c0.025 -0.255 -0.042 -0.476 -0.177 -0.672a0.003 0.003 0 0 0 -0.002 -0.001M0.401 0.764c-0.059 0 -0.108 -0.053 -0.108 -0.119 0 -0.066 0.048 -0.119 0.108 -0.119 0.06 0 0.109 0.054 0.108 0.119 0 0.066 -0.048 0.119 -0.108 0.119m0.399 0c-0.059 0 -0.108 -0.053 -0.108 -0.119 0 -0.066 0.048 -0.119 0.108 -0.119 0.06 0 0.109 0.054 0.108 0.119 0 0.066 -0.047 0.119 -0.108 0.119"
					fill="currentColor"
					className="fill-fg-secondary"
				/>
			</svg>
		),
		href: "https://discord.com",
		description: "Join our community",
	},
]

export default function SocialLinkCards() {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
			{socialLinks.map((link) => {
				return (
					<Link
						href={link.href}
						key={link.name}
						className="hover:bg-elevation-level1 group cursor-pointer rounded-[0.625rem] border p-4 transition-all duration-200 hover:shadow-md">
						<span className="sr-only">{link.description}</span>
						<div className="flex h-full items-center gap-3">
							<div className="flex-shrink-0">
								<span className="">{link.icon}</span>
							</div>
							<div className="flex-1">
								<span className="text-fg text-sm font-medium">{link.name}</span>
							</div>
						</div>
					</Link>
				)
			})}
		</div>
	)
}
