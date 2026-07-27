import React from "react"
import Image from "next/image"
import { Badge, BadgeDot } from "@/registry/ui/badge"

const RapidDev = () => {
	return (
		<div className="mx-auto flex max-w-[1440px] flex-col">
			<div className="px-15 py-30 flex flex-col gap-6">
				<Badge color="primary" size="28" variant="soft">
					<BadgeDot className="bg-primary" />
					Rapid Development
				</Badge>
				<div className="w-[1012px]">
					<h2 className="heading-3">
						Everything you need to ship polished interfaces
					</h2>
					<h2 className="heading-3 text-fg-secondary">
						Production ready React components,{" "}
						<span className="bg-[linear-gradient(90deg,var(--primary-border,#9981F8)_72.12%,var(--utility-Fuchsia-border,#F881F8)_88.94%)] bg-clip-text text-transparent">
							Figma UI Kit
						</span>
						, and reusable UI blocks.
					</h2>
				</div>
			</div>

			<div className="border-soft flex overflow-hidden border">
				<div className="flex-2 border-soft border-r">
					<div className="px-15 flex w-[520px] flex-col py-20">
						<h3 className="heading-5 text-[18px]">
							Production-Ready Figma UI Kit.
						</h3>
						<p className="heading-5 text-fg-secondary text-[18px]">
							Get access to over 2000+ Components, 1000+ assets all built using
							smart auto layout and figma slots
						</p>
					</div>
					<div className="relative h-[430px] overflow-hidden">
						<div className="absolute bottom-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-150">
							<Image
								width={800}
								height={1000}
								alt=""
								src="/newHome/OverviewContainer.png"
							/>
						</div>
					</div>
				</div>
				<div className="flex-1">
					<div className="px-15 flex w-[520px] flex-col py-20">
						<h3 className="heading-5 text-[18px]">
							A Complete Library of UI Primitives.
						</h3>
						<p className="heading-5 text-fg-secondary text-[18px]">
							Pre-styled 50+ React components built with Tailwind CSS to copy
							and paste
						</p>
					</div>
					<div className="relative h-[430px]">
						<div className="absolute bottom-[-3rem] right-0">
							<Image
								width={450}
								height={600}
								alt=""
								src="/newHome/UIPreview.png"
							/>
						</div>
					</div>
				</div>
			</div>

			<svg
				width="100%"
				height="48"
				viewBox="0 0 1440 48"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink">
				<rect width="100%" height="48" fill="url(#pattern0_2797_43017)" />
				<defs>
					<pattern
						id="pattern0_2797_43017"
						patternUnits="userSpaceOnUse"
						patternTransform="matrix(8.60365 0 0 12.2873 -0.819336 -0.573559)"
						preserveAspectRatio="none"
						viewBox="-0.819336 -0.573559 8.60365 12.2873"
						width="1"
						height="1">
						<use
							xlinkHref="#pattern0_2797_43017_inner"
							transform="translate(-8.60365 -12.2873)"
						/>
						<use
							xlinkHref="#pattern0_2797_43017_inner"
							transform="translate(0 -12.2873)"
						/>
						<use
							xlinkHref="#pattern0_2797_43017_inner"
							transform="translate(-8.60365 0)"
						/>
						<g id="pattern0_2797_43017_inner">
							<line
								opacity="0.8"
								x1="-0.409576"
								y1="12.0005"
								x2="8.19407"
								y2="-0.286788"
								stroke="#E9EAEC"
							/>
						</g>
					</pattern>
				</defs>
			</svg>

			<div className="bg-fill1 border-soft flex border">
				<div className="border-soft flex-1 border-r">
					<div className="px-15 flex w-[520px] flex-col py-20">
						<h3 className="heading-5 text-[18px]">
							Customize without compromise
						</h3>
						<p className="heading-5 text-fg-secondary text-[18px]">
							The Radian library extends the primitive component with meaningful
							properties for easier customization
						</p>
					</div>
					<div className="relative h-[430px] overflow-hidden">
						<div className="scale-120 absolute bottom-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
							<Image
								width={600}
								height={800}
								alt=""
								src="/newHome/credit.png"
							/>
						</div>
					</div>
				</div>
				<div className="flex-1">
					<div className="px-15 flex w-[520px] flex-col py-20">
						<h3 className="heading-5 text-[18px]">Built for the AI era</h3>
						<p className="heading-5 text-fg-secondary text-[18px]">
							Give your AI coding assistant a prompt and let it build with
							Radian&apos;s components, blocks, and design system
						</p>
					</div>

					<div className="relative h-[430px] overflow-hidden">
						<div className="absolute bottom-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
							<Image width={400} height={800} alt="" src="/newHome/app.png" />
						</div>
					</div>
				</div>
			</div>

			<div>
				<div className="px-15 py-25 flex justify-between">
					<h3 className="heading-5 w-[612px]">
						Seamless Design-to-Code Sync.
						<span className="text-fg-secondary">
							Variables and tokens in Figma Design File and Code use the same
							semantic for smooth development experience
						</span>
					</h3>

					<p className="">Designer . Developer</p>
				</div>
				<div className="bg-fill1 relative h-[720px] overflow-hidden">
					<div className="absolute bottom-[-7rem] left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150">
						<Image
							width={1120}
							height={768}
							alt=""
							src="/newHome/content.png"
						/>
					</div>
				</div>
			</div>

			<svg
				width="1440"
				height="48"
				viewBox="0 0 1440 48"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink">
				<rect width="1440" height="48" fill="url(#pattern0_2797_43017)" />
				<defs>
					<pattern
						id="pattern0_2797_43017"
						patternUnits="userSpaceOnUse"
						patternTransform="matrix(8.60365 0 0 12.2873 -0.819336 -0.573559)"
						preserveAspectRatio="none"
						viewBox="-0.819336 -0.573559 8.60365 12.2873"
						width="1"
						height="1">
						<use
							xlinkHref="#pattern0_2797_43017_inner"
							transform="translate(-8.60365 -12.2873)"
						/>
						<use
							xlinkHref="#pattern0_2797_43017_inner"
							transform="translate(0 -12.2873)"
						/>
						<use
							xlinkHref="#pattern0_2797_43017_inner"
							transform="translate(-8.60365 0)"
						/>
						<g id="pattern0_2797_43017_inner">
							<line
								opacity="0.8"
								x1="-0.409576"
								y1="12.0005"
								x2="8.19407"
								y2="-0.286788"
								stroke="#E9EAEC"
							/>
						</g>
					</pattern>
				</defs>
			</svg>

			<div className="border-soft flex border">
				<div className="border-soft flex-1 overflow-hidden border-r">
					<div className="px-15 flex w-[520px] flex-col py-20">
						<h3 className="heading-5 text-[18px]">
							Scalable Variable-first design system
						</h3>
						<p className="heading-5 text-fg-secondary text-[18px]">
							Fully designed for dark modes, typography, color, spacings & more
						</p>
					</div>
					<div className="relative h-[430px]">
						<div className="scale-120 absolute bottom-[-9rem] left-1/2 -translate-x-1/2 -translate-y-1/2">
							<Image
								width={600}
								height={800}
								alt=""
								src="/newHome/sidebar.png"
							/>
						</div>
					</div>
				</div>
				<div className="flex-2">
					<div className="px-15 flex w-[520px] flex-col py-20">
						<h3 className="heading-5 text-[18px]">
							Copy-Paste Landing Page Blocks
						</h3>
						<p className="heading-5 text-fg-secondary text-[18px]">
							Growing Library of Pre-made responsive sections designed to snap
							together into full pages
						</p>
					</div>
					<div className="relative h-[430px] overflow-hidden">
						<Image
							width={300}
							height={700}
							alt=""
							src="/newHome/vertical.png"
							className="absolute bottom-[-10rem] right-10"
						/>
						<Image
							width={600}
							height={1000}
							alt=""
							src="/newHome/Container.png"
							className="-translate-y-50 absolute left-1/2 top-1/2 z-10 -translate-x-1/2"
						/>
					</div>
				</div>
			</div>

			<svg
				width="1440"
				height="48"
				viewBox="0 0 1440 48"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink">
				<rect width="1440" height="48" fill="url(#pattern0_2797_43017)" />
				<defs>
					<pattern
						id="pattern0_2797_43017"
						patternUnits="userSpaceOnUse"
						patternTransform="matrix(8.60365 0 0 12.2873 -0.819336 -0.573559)"
						preserveAspectRatio="none"
						viewBox="-0.819336 -0.573559 8.60365 12.2873"
						width="1"
						height="1">
						<use
							xlinkHref="#pattern0_2797_43017_inner"
							transform="translate(-8.60365 -12.2873)"
						/>
						<use
							xlinkHref="#pattern0_2797_43017_inner"
							transform="translate(0 -12.2873)"
						/>
						<use
							xlinkHref="#pattern0_2797_43017_inner"
							transform="translate(-8.60365 0)"
						/>
						<g id="pattern0_2797_43017_inner">
							<line
								opacity="0.8"
								x1="-0.409576"
								y1="12.0005"
								x2="8.19407"
								y2="-0.286788"
								stroke="#E9EAEC"
							/>
						</g>
					</pattern>
				</defs>
			</svg>
		</div>
	)
}

export default RapidDev
