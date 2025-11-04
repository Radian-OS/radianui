import { Blocks, Braces, CaseLower, CloudCog, Cuboid, FileCode, GalleryVertical, LayoutGrid, Palette, Rocket, SunMoon, SwatchBook, Users } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/registry/ui/badge"

const DATA = [
	{
		icon: SwatchBook,
		title: "Figma variable system",
		description: "Manage consistent design tokens across color, spacing, and typography",
	},
	{
		icon: LayoutGrid,
		title: "Auto layout",
		description: "Create scalable and flexible designs that adapt to any screen size automatically",
	},
	{
		icon: SunMoon,
		title: "Theme Modes",
		description: "Switch effortlessly between light and dark themes, or create custom themes",
	},
	{
		icon: CaseLower,
		title: "Responsive Typography",
		description: "Ensure consistent, legible text across devices with an adaptive type system",
	},
	{
		icon: Palette,
		title: "Color Presets",
		description: "Use predefined color palettes to maintain harmony and visual consistency",
	},
	{
		icon: GalleryVertical,
		title: "Motion Components",
		description: "Bring your interfaces to life with smooth, modern motion and interaction patterns",
	},
	{
		icon: Blocks,
		title: "Composable System",
		description: "Composable components allows you to easily tweak and adjust components",
	},
	{
		icon: FileCode,
		title: "Type safe Components",
		description: "Eliminate code errors with strongly typed UI components for developers",
	},
	{
		icon: Braces,
		title: "Simplified Global CSS",
		description: "Streamline your styles with a minimal global CSS layer for easy customization",
	},
	{
		icon: Users,
		title: "Open Source",
		description: "Being open source allows for teams to access full code and build on top of it",
	},
	{
		icon: Cuboid,
		title: "Growing Block Library",
		description: "Expanding collection of ready-to-use UI blocks to speed up your workflow.",
	},
	{ icon: CloudCog, title: "Minimal Dependencies", description: "Keep your stack lightweight and efficient with components built for minimal setup" },
]

export default function InvertedSection() {
	return (
		<div className="w-full overflow-clip">
			<div className="flex w-full justify-center">
				<Image src="/RadianLogo.svg" width={64} height={64} alt="Logo" />
			</div>
			<div className="bg-black-inverse inverted-shape pb-35 flex w-full flex-col items-center gap-20 pt-40 dark:bg-[#131316]">
				<div className="flex w-full max-w-[977px] flex-col items-center justify-center gap-8">
					<div className="relative flex items-center">
						<Badge size="28" variant="outline" color="neutral" className="border-[#3A2593] bg-[#211452] text-[#ECE8FC]">
							<Rocket />
							Features inside Radian
						</Badge>

						{/* Left line */}
						<svg className="not-xl:hidden absolute -top-36 right-[110%] z-0" width="696" height="1300" viewBox="0 0 696 1300" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M243.5 269.5H203.5C190.245 269.5 179.5 258.755 179.5 245.5V56.443C179.5 49.4919 176.486 42.8822 171.238 38.3239L111 -14" stroke="#1c1d21" />
							<path d="M179.5 91.5V195.5" stroke="#1c1d21" strokeLinecap="round" />
							<path d="M683.5 159.5H283.5C270.245 159.5 259.5 170.245 259.5 183.5V375.5" stroke="#1c1d21" />
							<path d="M 162.5 113.5 H 26.5 C 13.2452 113.5 2.5 124.245 2.5 137.5 V 1300" stroke="#1c1d21" />
							<path
								id="beamPath"
								d="M 162.5 113.5 H 26.5 C 13.2452 113.5 2.5 124.245 2.5 137.5 V 1300"
								fill="none"
								stroke="var(--color-primary)"
								strokeWidth="1"
								strokeLinecap="round"
								className="animate-[var(--animate-beam-flow4)] [stroke-dasharray:50_1000] [stroke-dashoffset:0]"
								pathLength="1000"
							/>
							<path d="M695.5 143.5V175.5" stroke="#1c1d21" />
						</svg>

						{/* Right line */}
						<svg
							className="not-xl:hidden absolute -top-36 left-[110%] z-0 scale-x-[-1]"
							width="696"
							height="1196"
							viewBox="0 0 696 1196"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path d="M243.5 269.5H203.5C190.245 269.5 179.5 258.755 179.5 245.5V56.443C179.5 49.4919 176.486 42.8822 171.238 38.3239L111 -14" stroke="#1c1d21" />
							<path d="M179.5 91.5V195.5" stroke="#1c1d21" strokeLinecap="round" />
							<path d="M683.5 159.5H283.5C270.245 159.5 259.5 170.245 259.5 183.5V375.5" stroke="#1c1d21" />
							<path d="M695.5 143.5V175.5" stroke="#1c1d21" />
							<path d="M 162.5 113.5 H 26.5 C 13.2452 113.5 2.5 124.245 2.5 137.5 V 1300" stroke="#1c1d21" />
							<path
								id="beamPath"
								d="M 162.5 113.5 H 26.5 C 13.2452 113.5 2.5 124.245 2.5 137.5 V 1300"
								fill="none"
								stroke="var(--color-primary)"
								strokeWidth="1"
								strokeLinecap="round"
								className="animate-[var(--animate-beam-flow4)] [stroke-dasharray:50_1000] [stroke-dashoffset:0]"
								pathLength="1000"
							/>
						</svg>
					</div>
					<div className="z-10 flex flex-col items-center gap-4">
						<h2 className="heading-2 to-fg-tertiary bg-gradient-to-b from-white bg-clip-text text-center text-transparent">Features to help you Build Quicker</h2>
						<p className="text-fg-tertiary w-full max-w-[480px] text-center text-base font-normal">
							Extend your Radian experience with more features to help you build better apps and products{" "}
						</p>
					</div>
				</div>

				<div className="z-10 grid w-full max-w-[1340px] grid-cols-4 overflow-clip rounded-3xl border border-[#1c1d21]">
					{DATA.map(({ icon: Icon, title, description }, i) => (
						<div
							key={i}
							className="div-hover group relative flex w-full flex-col gap-6 border-b border-r border-[#1c1d21] px-8 py-10 transition-colors duration-300 [&:nth-child(-n+4)]:border-t-0 [&:nth-child(4n+1)]:border-l-0 [&:nth-child(4n+4)]:border-r-0 [&:nth-child(n+9)]:border-b-0"
							onMouseMove={(e) => {
								const rect = e.currentTarget.getBoundingClientRect()
								const x = e.clientX - rect.left
								const y = e.clientY - rect.top
								e.currentTarget.style.setProperty("--x", `${x}px`)
								e.currentTarget.style.setProperty("--y", `${y}px`)
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.removeProperty("--x")
								e.currentTarget.style.removeProperty("--y")
							}}>
							{/* Styling line for the div */}
							<div className="duration-400 absolute left-0 top-1/2 h-8 w-[1px] -translate-y-1/2 bg-[#545463] transition-all group-hover:top-1/4" />

							<Icon size={24} className="text-[#545463] transition-colors duration-300 group-hover:text-[#C8C8D0]" />
							<div className="flex flex-col gap-2">
								<p className="text-base font-medium text-[#C8C8D0]">{title}</p>
								<p className="text-sm font-normal text-[#868698]">{description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
