// app/page.tsx
"use client"

import { CirclePlay, Menu, X, Zap } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Drawer, DrawerClose, DrawerTitle } from "@/registry/ui/drawer"

// app/page.tsx

// app/page.tsx

// app/page.tsx

// app/page.tsx

// app/page.tsx

export default function Home() {
	const companies = [
		{ svgUrl: "/hero-svg/zenith.svg" },
		{ svgUrl: "/hero-svg/stellar.svg" },
		{ svgUrl: "/hero-svg/vortex.svg" },
		{ svgUrl: "/hero-svg/enigma.svg" },
		{ svgUrl: "/hero-svg/spectrum.svg" },
		{ svgUrl: "/hero-svg/zenith.svg" },
		{ svgUrl: "/hero-svg/quantum.svg" },
		{ svgUrl: "/hero-svg/vortex.svg" },
		{ svgUrl: "/hero-svg/stellar.svg" },
		{ svgUrl: "/hero-svg/enigma.svg" },
	]

	return (
		<div className="min-h-screen">
			{/* Header */}
			<header className="border-b-border-alpha bg-bg-level1 border-b">
				<div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
					<div className="flex h-16 items-center justify-between">
						{/* Logo */}
						<div className="flex h-9 flex-shrink-0 items-center gap-2">
							<Link href="/" style={{ fill: "white", color: "white" }}>
								<img src="/radian.svg" className="dark:hidden" alt="radian-logo" width={112} height={36} />
								<img src="/radian-dark.svg" alt="radian-logo" className="hidden dark:block" width={112} height={36} />
							</Link>
						</div>

						{/* Navigation */}
						<nav className="text-sm-p hidden items-center gap-10 font-medium md:flex">
							<a href="#" className="text-text">
								Features
							</a>
							<a href="#" className="text-text">
								Pricing
							</a>
							<a href="#" className="text-text">
								About
							</a>
							<a href="#" className="text-text">
								Blog
							</a>
							<a href="#" className="text-text">
								Resources
							</a>
						</nav>

						{/* Auth buttons */}
						<div className="flex items-center gap-2">
							<Button variant="neutral-outline" size="36" className="hidden sm:inline">
								Sign in
							</Button>
							<Button size="36">Get Started</Button>
							<Drawer
								trigger={
									<Button isIcon className="text-text-tertiary md:hidden" variant="ghost" size="36">
										<Menu size={20} />
									</Button>
								}>
								<DrawerTitle>
									<DrawerClose>
										<Button isIcon variant="neutral-soft">
											<X className="size-5" />
										</Button>
									</DrawerClose>
								</DrawerTitle>
							</Drawer>
						</div>
					</div>
				</div>
			</header>

			<main className="bg-bg-base">
				{/* Hero Section */}
				<section className="pt-25 relative px-5 sm:px-6 lg:px-8">
					<div className="relative mx-auto flex max-w-5xl flex-col gap-6 text-center">
						<Badge className="mb-8 sm:mx-auto" size="28" closable>
							<img src="/hero-svg/y-combinator.svg" />
							Backed by Y Combinator
						</Badge>

						{/* Main heading */}
						<div>
							<h1 className="text-text heading-1 mb-6 text-left font-bold sm:text-center">
								Ship next generation of world
								<br />
								class products & solutions
							</h1>

							{/* Description */}
							<p className="text-text-secondary mb-8 text-left text-lg font-normal sm:text-center">
								Radian is a high-quality design and development library that empowers
								<br />
								you to build systems capable of scaling efficiently.
							</p>
						</div>

						{/* CTA buttons */}
						<div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
							<Button lead={<Zap size={24} />} size="44" className="w-full sm:w-fit">
								Try for free
							</Button>
							<Button lead={<CirclePlay size={24} />} className="text-text-secondary w-full sm:w-fit" variant="neutral-outline" size="44">
								Watch Demo
							</Button>
						</div>
					</div>
				</section>

				{/* Company Logos */}
				<section className="px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
					<div className="mx-auto max-w-7xl">
						<div className="overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
							<motion.div
								animate={{ x: ["0%", "-50%"] }}
								transition={{
									repeat: Infinity,
									repeatType: "loop",
									duration: 18,
									ease: "linear",
								}}
								className="flex w-max gap-3">
								{[...companies, ...companies].map((company, index) => (
									<img key={index} src={company.svgUrl} alt="" className="h-10 w-auto shrink-0 object-contain" />
								))}
							</motion.div>
						</div>
					</div>
				</section>

				{/* Home page content */}
				<section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
					<div className="bg-fill-level3 outline-border-alpha/20 h-40 w-full rounded-xl outline-8 drop-shadow"></div>
				</section>
			</main>
		</div>
	)
}
