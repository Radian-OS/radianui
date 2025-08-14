"use client"

import { CirclePlay, Menu, X, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Fade } from "@/registry/animated/fade"
import { InfiniteScroll } from "@/registry/animated/infinite-scroll"
import { Draggable } from "@/registry/animated/make-draggable"
import { TextReveal } from "@/registry/animated/text-reveal"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from "@/registry/ui/drawer"

export default function Hero01() {
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
			<Fade delay={0.2}>
				<div className="border-b-border-alpha bg-elevation-level1 border-b">
					<div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
						<div className="flex h-16 items-center justify-between">
							{/* Logo */}
							<div className="flex h-9 flex-shrink-0 items-center gap-2">
								<Link href="/" style={{ fill: "white", color: "white" }}>
									<Image src="/radian.svg" className="dark:hidden" alt="radian-logo" width={112} height={36} />
									<Image src="/radian-dark.svg" alt="radian-logo" className="hidden dark:block" width={112} height={36} />
								</Link>
							</div>

							{/* Navigation */}
							<nav className="text-sm-p hidden items-center gap-10 font-medium md:flex">
								<Link href="#" className="text-fg">
									Features
								</Link>
								<Link href="#" className="text-fg">
									Pricing
								</Link>
								<Link href="#" className="text-fg">
									About
								</Link>
								<Link href="#" className="text-fg">
									Blog
								</Link>
								<Link href="#" className="text-fg">
									Resources
								</Link>
							</nav>

							{/* Auth buttons */}
							<div className="flex items-center gap-2">
								<Button variant="outline" color="neutral" size="36" className="hidden sm:inline">
									Sign in
								</Button>
								<Button size="36">Get Started</Button>
								<Drawer>
									<DrawerTrigger asChild>
										<Button iconOnly className="text-fg-tertiary md:hidden" variant="ghost" size="36">
											<Menu size={20} />
										</Button>
									</DrawerTrigger>
									<DrawerContent>
										<DrawerTitle>
											<DrawerClose>
												<Button iconOnly color="neutral" variant="soft">
													<X className="size-5" />
												</Button>
											</DrawerClose>
										</DrawerTitle>
									</DrawerContent>
								</Drawer>
							</div>
						</div>
					</div>
				</div>
			</Fade>

			<main className="bg-base">
				{/* Hero Section */}
				<Fade>
					<div className="pt-25 relative px-5 sm:px-6 lg:px-8">
						<div className="relative mx-auto flex max-w-5xl flex-col gap-6 text-center">
							<Draggable>
								<Badge className="mb-8 sm:mx-auto" size="28">
									<Image alt="Y Combinator" className="size-5" src="/hero-svg/y-combinator.svg" width={50} height={50} />
									Backed by Y Combinator
									<X size={16} />
								</Badge>
							</Draggable>

							{/* Main heading */}
							<div>
								<h1 className="text-fgheading-1 mb-6 text-left font-bold sm:text-center">Ship next generation of world class products & solutions</h1>

								{/* Description */}
								<p className="max-w-175 text-fg-secondary mx-auto mb-8 text-left text-lg font-normal sm:text-center">
									Radian is a high-quality design and development library that empowers you to build systems capable of scaling efficiently.
								</p>
							</div>

							{/* CTA buttons */}
							<div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
								<Button lead={<Zap size={24} />} size="44" className="w-full sm:w-fit">
									Try for free
								</Button>
								<Button lead={<CirclePlay size={24} />} className="text-fg-secondary w-full sm:w-fit" variant="outline" color="neutral" size="44">
									Watch Demo
								</Button>
							</div>
						</div>
					</div>
				</Fade>

				{/* Company Logos */}
				<section className="px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
					<div className="mx-auto max-w-7xl">
						<InfiniteScroll>
							{companies.map((company, index) => (
								<img alt="Company svg" key={index} src={company.svgUrl} className="h-10 w-auto shrink-0 object-contain" />
							))}
						</InfiniteScroll>
					</div>
				</section>

				{/* Home page content */}
				<section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
					<div className="aspect-[16/9] w-full">
						<div className="bg-fill3 outline-border-alpha/20 h-full w-full rounded-xl outline-8 drop-shadow"></div>
					</div>
				</section>

				<Fade inView>
					<span className="block p-5 text-center text-3xl">Hello page from Radian</span>
				</Fade>

				<div className="h-40"></div>

				<TextReveal>Ready to use pre-built, customizable UI components</TextReveal>
			</main>
		</div>
	)
}
