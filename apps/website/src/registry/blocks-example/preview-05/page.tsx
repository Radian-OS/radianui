"use client"

import { Button } from "@/registry/ui/button"
import { Badge } from "@/registry/ui/badge"
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/registry/ui/card"
import { IconSlot } from "@/registry/icon/icon-library"
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuLink,
	navigationMenuTriggerStyle,
} from "@/registry/ui/navigation-menu"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"

export default function LandingPage() {
	return (
		<div data-themer-id="auto-div-1" className="font-body min-h-screen w-full">
			{/* HEADER */}
			<header
				data-themer-id="header"
				className="bg-bg border-border sticky top-0 z-50 flex h-16 items-center justify-between border-b px-6">
				<div data-themer-id="auto-div-2" className="flex items-center gap-6">
					<div data-themer-id="auto-div-3" className="flex items-center gap-2">
						<div
							data-themer-id="auto-div-4"
							className="bg-primary text-primary-fg flex size-8 items-center justify-center rounded-lg">
							<IconSlot
								data-themer-id="auto-iconslot-5"
								slot="archive"
								className="size-4"
							/>
						</div>
						<span
							data-themer-id="auto-span-6"
							className="text-fg font-semibold tracking-tight">
							AcmePhone
						</span>
					</div>
					<div data-themer-id="auto-div-7" className="hidden md:block">
						<NavigationMenu data-themer-id="auto-navigationmenu-8">
							<NavigationMenuList data-themer-id="auto-navigationmenulist-9">
								<NavigationMenuItem data-themer-id="auto-navigationmenuitem-10">
									<NavigationMenuLink
										data-themer-id="auto-navigationmenulink-11"
										className={navigationMenuTriggerStyle()}>
										Product
									</NavigationMenuLink>
								</NavigationMenuItem>
								<NavigationMenuItem data-themer-id="auto-navigationmenuitem-12">
									<NavigationMenuLink
										data-themer-id="auto-navigationmenulink-13"
										className={navigationMenuTriggerStyle()}>
										Solutions
									</NavigationMenuLink>
								</NavigationMenuItem>
								<NavigationMenuItem data-themer-id="auto-navigationmenuitem-14">
									<NavigationMenuLink
										data-themer-id="auto-navigationmenulink-15"
										className={navigationMenuTriggerStyle()}>
										Resources
									</NavigationMenuLink>
								</NavigationMenuItem>
								<NavigationMenuItem data-themer-id="auto-navigationmenuitem-16">
									<NavigationMenuLink
										data-themer-id="auto-navigationmenulink-17"
										className={navigationMenuTriggerStyle()}>
										Pricing
									</NavigationMenuLink>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					</div>
				</div>
				<div data-themer-id="auto-div-18" className="flex items-center gap-3">
					<Button
						data-themer-id="auto-button-19"
						variant="ghost"
						className="hidden sm:inline-flex">
						Log in
					</Button>
					<Button data-themer-id="auto-button-20">Get started</Button>
				</div>
			</header>

			{/* HERO SECTION */}
			<section
				data-themer-id="hero-section"
				className="bg-bg flex flex-col items-center px-6 py-24 text-center">
				<Badge
					data-themer-id="auto-badge-21"
					variant="outline"
					color="primary"
					className="mb-6 rounded-full px-4 py-1.5">
					New: AI Call Summaries{" "}
					<IconSlot
						data-themer-id="auto-iconslot-22"
						slot="archive"
						className="ml-2 size-3"
					/>
				</Badge>
				<h1
					data-themer-id="auto-h1-23"
					className="heading-1 text-fg mx-auto max-w-4xl tracking-tight">
					The business phone system for teams
				</h1>
				<p
					data-themer-id="auto-p-24"
					className="text-fg-secondary mx-auto mt-6 max-w-2xl text-lg leading-relaxed">
					Connect with your customers and collaborate with your team, all from
					one powerful app.
				</p>
				<div
					data-themer-id="auto-div-25"
					className="mt-8 flex flex-wrap items-center justify-center gap-4">
					<Button data-themer-id="auto-button-26" size="40" className="px-8">
						Start free trial
					</Button>
					<Button
						data-themer-id="auto-button-27"
						size="40"
						variant="outline"
						className="px-8">
						<IconSlot
							data-themer-id="auto-iconslot-28"
							slot="archive"
							className="mr-2 size-4"
						/>{" "}
						Watch demo
					</Button>
				</div>

				{/* Huge Placeholder Dashboard Graphic */}
				<div data-themer-id="auto-div-29" className="mt-16 w-full max-w-5xl">
					<div
						data-themer-id="auto-div-30"
						className="bg-elevation-level1 border-border shadow-soft-2xl flex aspect-[16/9] w-full flex-col rounded-xl border p-4">
						<div
							data-themer-id="auto-div-31"
							className="mb-4 flex items-center gap-2 border-b pb-4">
							<div
								data-themer-id="auto-div-32"
								className="bg-error size-3 rounded-full"
							/>
							<div
								data-themer-id="auto-div-33"
								className="bg-warning size-3 rounded-full"
							/>
							<div
								data-themer-id="auto-div-34"
								className="bg-success size-3 rounded-full"
							/>
						</div>
						<div
							data-themer-id="auto-div-35"
							className="border-border bg-elevation-level2 flex flex-1 items-center justify-center rounded-lg border-2 border-dashed">
							<span data-themer-id="auto-span-36" className="text-fg-tertiary">
								Dashboard UI Placeholder
							</span>
						</div>
					</div>
				</div>
			</section>

			{/* LOGO CLOUD */}
			<section
				data-themer-id="logo-cloud"
				className="bg-bg border-border border-y px-6 py-12">
				<p
					data-themer-id="auto-p-37"
					className="text-fg-tertiary mb-8 text-center text-xs font-semibold tracking-widest uppercase">
					Trusted by over 10,000 teams globally
				</p>
				<div
					data-themer-id="auto-div-38"
					className="flex flex-wrap justify-center gap-12 opacity-50">
					{["stripe", "github", "figma", "vercel", "slack"].map((logo) => (
						<div
							data-themer-id="auto-div-39"
							key={logo}
							className="flex items-center gap-2">
							<IconSlot
								data-themer-id="auto-iconslot-40"
								slot="archive"
								className="text-fg size-6"
							/>
							<span
								data-themer-id="auto-span-41"
								className="text-fg font-bold uppercase">
								{logo}
							</span>
						</div>
					))}
				</div>
			</section>

			{/* FEATURE SECTION 1: Connect with customers */}
			<section
				data-themer-id="feature-section-connect"
				className="bg-primary/5 px-6 py-24">
				<div data-themer-id="auto-div-42" className="mx-auto max-w-6xl">
					<div data-themer-id="auto-div-43" className="mb-16 text-center">
						<h2 data-themer-id="auto-h2-44" className="heading-2 text-fg">
							Connect with customers effortlessly
						</h2>
						<p
							data-themer-id="auto-p-45"
							className="text-fg-secondary mx-auto mt-4 max-w-2xl text-lg">
							Everything you need to handle inbound and outbound communication
							in a single workflow.
						</p>
					</div>

					<div
						data-themer-id="auto-div-46"
						className="grid items-center gap-16 md:grid-cols-2">
						<div data-themer-id="auto-div-47" className="space-y-6">
							<h3 data-themer-id="auto-h3-48" className="heading-4 text-fg">
								All your channels in one inbox
							</h3>
							<p
								data-themer-id="auto-p-49"
								className="text-fg-secondary leading-relaxed">
								Voice, SMS, and WhatsApp messages flow directly into a shared
								inbox. Never miss a customer query again and respond faster than
								ever.
							</p>
							<ul data-themer-id="auto-ul-50" className="space-y-3">
								{[
									"Unified communication",
									"Shared numbers",
									"Team routing",
								].map((item) => (
									<li
										data-themer-id="auto-li-51"
										key={item}
										className="flex items-center gap-3">
										<IconSlot
											data-themer-id="auto-iconslot-52"
											slot="archive"
											className="text-primary size-5"
										/>
										<span
											data-themer-id="auto-span-53"
											className="text-fg font-medium">
											{item}
										</span>
									</li>
								))}
							</ul>
							<Button
								data-themer-id="auto-button-54"
								variant="outline"
								className="mt-4">
								Learn more
							</Button>
						</div>
						<div
							data-themer-id="auto-div-55"
							className="bg-elevation-level1 shadow-soft-xl border-border flex h-80 items-center justify-center rounded-xl border p-6">
							<span data-themer-id="auto-span-56" className="text-fg-tertiary">
								Inbox UI Placeholder
							</span>
						</div>
					</div>
				</div>
			</section>

			{/* FEATURE SECTION 2: AI (Dark Mode) */}
			<section
				data-themer-id="feature-section-ai"
				className="bg-fill4 px-6 py-24 text-white">
				<div data-themer-id="auto-div-57" className="mx-auto max-w-6xl">
					<div data-themer-id="auto-div-58" className="mb-16 text-center">
						<IconSlot
							data-themer-id="auto-iconslot-59"
							slot="archive"
							className="text-primary mx-auto mb-4 size-10"
						/>
						<h2 data-themer-id="auto-h2-60" className="heading-2 text-white">
							Save time with AI
						</h2>
						<p
							data-themer-id="auto-p-61"
							className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
							Let artificial intelligence handle the busywork so your team can
							focus on closing deals and supporting customers.
						</p>
					</div>

					<div
						data-themer-id="auto-div-62"
						className="grid gap-6 md:grid-cols-2">
						{/* Card 1 */}
						<Card
							data-themer-id="auto-card-63"
							className="bg-fill4 border-white/10 text-white shadow-none">
							<CardHeader data-themer-id="auto-cardheader-64">
								<IconSlot
									data-themer-id="auto-iconslot-65"
									slot="archive"
									className="text-primary mb-4 size-6"
								/>
								<CardTitle
									data-themer-id="auto-cardtitle-66"
									className="text-white">
									Auto-summaries
								</CardTitle>
								<CardDescription
									data-themer-id="auto-carddescription-67"
									className="text-white/60">
									Get instant AI-generated summaries of every call pushed
									directly to your CRM.
								</CardDescription>
							</CardHeader>
							<CardContent data-themer-id="auto-cardcontent-68">
								<div
									data-themer-id="auto-div-69"
									className="rounded-lg border border-white/10 bg-white/5 p-4 font-mono text-xs text-white/80">
									"Customer agreed to Q3 upgrade plan. Sent contract via email."
								</div>
							</CardContent>
						</Card>

						{/* Card 2 */}
						<Card
							data-themer-id="auto-card-70"
							className="bg-fill4 border-white/10 text-white shadow-none">
							<CardHeader data-themer-id="auto-cardheader-71">
								<IconSlot
									data-themer-id="auto-iconslot-72"
									slot="archive"
									className="text-primary mb-4 size-6"
								/>
								<CardTitle
									data-themer-id="auto-cardtitle-73"
									className="text-white">
									Live Transcriptions
								</CardTitle>
								<CardDescription
									data-themer-id="auto-carddescription-74"
									className="text-white/60">
									Read what your customers are saying in real-time with
									ultra-fast transcription.
								</CardDescription>
							</CardHeader>
							<CardContent data-themer-id="auto-cardcontent-75">
								<div
									data-themer-id="auto-div-76"
									className="space-y-2 rounded-lg border border-white/10 bg-white/5 p-4">
									<div data-themer-id="auto-div-77" className="flex gap-2">
										<Avatar
											data-themer-id="auto-avatar-78"
											size="20"
											rounded="circle">
											<AvatarFallback
												data-themer-id="auto-avatarfallback-79"
												className="bg-primary/20 text-[10px] text-white">
												C
											</AvatarFallback>
										</Avatar>
										<div
											data-themer-id="auto-div-80"
											className="rounded-lg bg-white/10 px-3 py-1.5 text-xs">
											How much does it cost?
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Testimonial */}
					<div
						data-themer-id="auto-div-81"
						className="mt-16 flex flex-col items-center text-center">
						<Avatar
							data-themer-id="auto-avatar-82"
							size="48"
							rounded="circle"
							className="mb-4 border-2 border-white/20">
							<AvatarFallback
								data-themer-id="auto-avatarfallback-83"
								className="bg-white/10">
								JD
							</AvatarFallback>
						</Avatar>
						<p
							data-themer-id="auto-p-84"
							className="max-w-3xl text-xl leading-snug font-medium">
							"The AI summaries have saved our sales team roughly 15 hours a
							week in manual data entry. It's completely changed how we work."
						</p>
						<p
							data-themer-id="auto-p-85"
							className="mt-4 text-sm font-semibold tracking-wider text-white/50 uppercase">
							Sarah Jenkins, VP Sales
						</p>
					</div>
				</div>
			</section>

			{/* FEATURE SECTION 3: Aligned (Yellow/Offwhite bg) */}
			<section
				data-themer-id="feature-section-aligned"
				className="bg-warning/10 px-6 py-24">
				<div data-themer-id="auto-div-86" className="mx-auto max-w-6xl">
					<div data-themer-id="auto-div-87" className="mb-16 text-center">
						<h2 data-themer-id="auto-h2-88" className="heading-2 text-fg">
							Keep your team aligned
						</h2>
						<p
							data-themer-id="auto-p-89"
							className="text-fg-secondary mx-auto mt-4 max-w-2xl text-lg">
							Internal notes, mentions, and seamless transfers make
							collaboration invisible to the customer.
						</p>
					</div>

					<Card
						data-themer-id="auto-card-90"
						className="bg-elevation-level1 shadow-soft-lg mb-6 overflow-hidden border-none">
						<div data-themer-id="auto-div-91" className="grid md:grid-cols-2">
							<div
								data-themer-id="auto-div-92"
								className="flex flex-col justify-center p-10">
								<h3
									data-themer-id="auto-h3-93"
									className="heading-3 text-fg mb-4">
									Internal Mentions
								</h3>
								<p
									data-themer-id="auto-p-94"
									className="text-fg-secondary mb-6 leading-relaxed">
									Tag teammates directly on active calls or SMS threads to get
									quick answers without ever putting the customer on hold.
								</p>
								<Button data-themer-id="auto-button-95" className="w-max">
									Explore collaboration
								</Button>
							</div>
							<div
								data-themer-id="auto-div-96"
								className="bg-warning/20 flex items-center justify-center p-10">
								<div
									data-themer-id="auto-div-97"
									className="bg-elevation-level1 shadow-soft-md border-border w-full space-y-3 rounded-xl border p-4">
									<div
										data-themer-id="auto-div-98"
										className="flex items-center gap-2">
										<Avatar
											data-themer-id="auto-avatar-99"
											size="24"
											rounded="circle">
											<AvatarFallback data-themer-id="auto-avatarfallback-100">
												T
											</AvatarFallback>
										</Avatar>
										<span
											data-themer-id="auto-span-101"
											className="text-sm font-medium">
											@alex can you approve this discount?
										</span>
									</div>
									<div
										data-themer-id="auto-div-102"
										className="text-success bg-success/10 flex w-max items-center gap-2 rounded-md p-2">
										<IconSlot
											data-themer-id="auto-iconslot-103"
											slot="archive"
											className="size-4"
										/>
										<span
											data-themer-id="auto-span-104"
											className="text-sm font-medium">
											Approved by Alex
										</span>
									</div>
								</div>
							</div>
						</div>
					</Card>

					<div
						data-themer-id="auto-div-105"
						className="grid gap-6 md:grid-cols-3">
						{/* Grid Cards */}
						<Card
							data-themer-id="auto-card-106"
							className="bg-elevation-level1 border-none shadow-sm">
							<CardHeader data-themer-id="auto-cardheader-107">
								<IconSlot
									data-themer-id="auto-iconslot-108"
									slot="archive"
									className="text-warning mb-2 size-5"
								/>
								<CardTitle
									data-themer-id="auto-cardtitle-109"
									className="text-base">
									Warm Transfers
								</CardTitle>
								<CardDescription data-themer-id="auto-carddescription-110">
									Brief your colleague before handing off the call to ensure a
									smooth transition.
								</CardDescription>
							</CardHeader>
						</Card>
						<Card
							data-themer-id="auto-card-111"
							className="bg-elevation-level1 border-none shadow-sm">
							<CardHeader data-themer-id="auto-cardheader-112">
								<IconSlot
									data-themer-id="auto-iconslot-113"
									slot="archive"
									className="text-warning mb-2 size-5"
								/>
								<CardTitle
									data-themer-id="auto-cardtitle-114"
									className="text-base">
									Shared Contacts
								</CardTitle>
								<CardDescription data-themer-id="auto-carddescription-115">
									A single source of truth for all your customer contact details
									and history.
								</CardDescription>
							</CardHeader>
						</Card>
						<Card
							data-themer-id="auto-card-116"
							className="bg-elevation-level1 border-none shadow-sm">
							<CardHeader data-themer-id="auto-cardheader-117">
								<IconSlot
									data-themer-id="auto-iconslot-118"
									slot="archive"
									className="text-warning mb-2 size-5"
								/>
								<CardTitle
									data-themer-id="auto-cardtitle-119"
									className="text-base">
									Internal Chat
								</CardTitle>
								<CardDescription data-themer-id="auto-carddescription-120">
									Direct messaging and group channels built right alongside your
									phone.
								</CardDescription>
							</CardHeader>
						</Card>
					</div>
				</div>
			</section>

			{/* INTEGRATIONS SECTION */}
			<section
				data-themer-id="feature-section-automate"
				className="bg-fill1 border-border border-y px-6 py-24">
				<div
					data-themer-id="auto-div-121"
					className="mx-auto max-w-6xl text-center">
					<h2 data-themer-id="auto-h2-122" className="heading-2 text-fg mb-4">
						Automate your workflows
					</h2>
					<p
						data-themer-id="auto-p-123"
						className="text-fg-secondary mx-auto mb-16 max-w-2xl text-lg">
						Connect your phone system directly to the tools you already use
						every day.
					</p>

					<div
						data-themer-id="auto-div-124"
						className="bg-elevation-level1 shadow-soft-xl border-border mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-6 rounded-2xl border p-12">
						<IconSlot
							data-themer-id="auto-iconslot-125"
							slot="archive"
							className="text-fg size-12"
						/>
						<div
							data-themer-id="auto-div-126"
							className="bg-border h-0.5 w-12 border-dashed"
						/>
						<div
							data-themer-id="auto-div-127"
							className="bg-primary text-primary-fg flex size-16 scale-110 transform items-center justify-center rounded-2xl shadow-lg">
							<IconSlot
								data-themer-id="auto-iconslot-128"
								slot="archive"
								className="size-8"
							/>
						</div>
						<div
							data-themer-id="auto-div-129"
							className="bg-border h-0.5 w-12 border-dashed"
						/>
						<IconSlot
							data-themer-id="auto-iconslot-130"
							slot="archive"
							className="text-fg size-12"
						/>
					</div>

					<div
						data-themer-id="auto-div-131"
						className="mt-8 flex justify-center gap-4">
						<Button
							data-themer-id="auto-button-132"
							variant="outline"
							className="bg-elevation-level1">
							View all 50+ integrations
						</Button>
					</div>
				</div>
			</section>

			{/* CONFIGURATION SECTION (Green bg) */}
			<section
				data-themer-id="feature-section-configure"
				className="bg-success/10 px-6 py-24">
				<div
					data-themer-id="auto-div-133"
					className="mx-auto max-w-6xl text-center">
					<h2 data-themer-id="auto-h2-134" className="heading-2 text-fg mb-4">
						Configure numbers to fit your needs
					</h2>
					<p
						data-themer-id="auto-p-135"
						className="text-fg-secondary mx-auto mb-16 max-w-2xl text-lg">
						Local, toll-free, and international numbers available instantly.
						Build complex IVR trees visually.
					</p>

					<div
						data-themer-id="auto-div-136"
						className="grid gap-6 text-left md:grid-cols-2">
						<Card
							data-themer-id="auto-card-137"
							className="bg-elevation-level1 flex h-64 flex-col justify-between border-none p-6 shadow-sm">
							<div data-themer-id="auto-div-138">
								<h3
									data-themer-id="auto-h3-139"
									className="mb-2 text-lg font-semibold">
									Visual IVR Builder
								</h3>
								<p
									data-themer-id="auto-p-140"
									className="text-fg-secondary text-sm">
									Drag and drop routing rules to direct callers to the right
									team instantly.
								</p>
							</div>
							<div
								data-themer-id="auto-div-141"
								className="bg-success/20 border-success/30 flex h-24 items-center justify-center rounded-lg border">
								<span
									data-themer-id="auto-span-142"
									className="text-success text-xs font-semibold">
									Flowchart UI Placeholder
								</span>
							</div>
						</Card>
						<Card
							data-themer-id="auto-card-143"
							className="bg-elevation-level1 flex h-64 flex-col justify-between border-none p-6 shadow-sm">
							<div data-themer-id="auto-div-144">
								<h3
									data-themer-id="auto-h3-145"
									className="mb-2 text-lg font-semibold">
									Business Hours
								</h3>
								<p
									data-themer-id="auto-p-146"
									className="text-fg-secondary text-sm">
									Set custom schedules to automatically route calls to voicemail
									when you're closed.
								</p>
							</div>
							<div
								data-themer-id="auto-div-147"
								className="bg-success/20 border-success/30 flex h-24 items-center justify-center rounded-lg border">
								<span
									data-themer-id="auto-span-148"
									className="text-success text-xs font-semibold">
									Schedule UI Placeholder
								</span>
							</div>
						</Card>
					</div>
				</div>
			</section>

			{/* AWARDS SECTION (Black) */}
			<section data-themer-id="awards-section" className="bg-fill4 px-6 py-16">
				<div
					data-themer-id="auto-div-149"
					className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-10 md:flex-row">
					<div data-themer-id="auto-div-150">
						<h2
							data-themer-id="auto-h2-151"
							className="heading-3 mb-2 text-white">
							Rated #1 business phone
						</h2>
						<p data-themer-id="auto-p-152" className="text-white/70">
							Consistently recognized by G2 and Capterra as the leader in VoIP.
						</p>
					</div>
					<div data-themer-id="auto-div-153" className="flex gap-4">
						<div
							data-themer-id="auto-div-154"
							className="flex size-20 flex-col items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white">
							<IconSlot
								data-themer-id="auto-iconslot-155"
								slot="archive"
								className="text-warning mb-1 size-6"
							/>
							<span
								data-themer-id="auto-span-156"
								className="text-[10px] font-bold tracking-widest uppercase">
								Leader
							</span>
							<span
								data-themer-id="auto-span-157"
								className="text-[10px] opacity-70">
								2024
							</span>
						</div>
						<div
							data-themer-id="auto-div-158"
							className="flex size-20 flex-col items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white">
							<IconSlot
								data-themer-id="auto-iconslot-159"
								slot="archive"
								className="text-warning mb-1 size-6"
							/>
							<span
								data-themer-id="auto-span-160"
								className="text-[10px] font-bold tracking-widest uppercase">
								Easiest
							</span>
							<span
								data-themer-id="auto-span-161"
								className="text-[10px] opacity-70">
								Setup
							</span>
						</div>
					</div>
				</div>
			</section>

			{/* FINAL CTA (Purple) */}
			<section
				data-themer-id="final-cta"
				className="bg-primary/20 overflow-hidden px-6 py-24 text-center">
				<div data-themer-id="auto-div-162" className="mx-auto max-w-3xl">
					<h2 data-themer-id="auto-h2-163" className="heading-2 text-fg mb-6">
						Ready to improve your team's communication?
					</h2>
					<div
						data-themer-id="auto-div-164"
						className="mb-12 flex justify-center gap-4">
						<Button
							data-themer-id="auto-button-165"
							size="40"
							className="px-8 shadow-xl">
							Get started for free
						</Button>
						<Button
							data-themer-id="auto-button-166"
							size="40"
							variant="outline"
							className="bg-elevation-level1 px-8">
							Talk to sales
						</Button>
					</div>

					{/* Laptop mockup placeholder */}
					<div
						data-themer-id="auto-div-167"
						className="bg-elevation-level1 shadow-soft-2xl border-border mx-auto flex h-64 max-w-2xl translate-y-10 items-center justify-center rounded-t-3xl border-x border-t">
						<span data-themer-id="auto-span-168" className="text-fg-tertiary">
							App Interface Placeholder
						</span>
					</div>
				</div>
			</section>

			{/* FOOTER */}
			<footer
				data-themer-id="footer"
				className="bg-bg border-border border-t px-6 py-16">
				<div
					data-themer-id="auto-div-169"
					className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
					<div
						data-themer-id="auto-div-170"
						className="col-span-2 lg:col-span-2">
						<div
							data-themer-id="auto-div-171"
							className="mb-4 flex items-center gap-2">
							<div
								data-themer-id="auto-div-172"
								className="bg-primary text-primary-fg flex size-6 items-center justify-center rounded-md">
								<IconSlot
									data-themer-id="auto-iconslot-173"
									slot="archive"
									className="size-3"
								/>
							</div>
							<span
								data-themer-id="auto-span-174"
								className="text-fg font-semibold tracking-tight">
								AcmePhone
							</span>
						</div>
						<p
							data-themer-id="auto-p-175"
							className="text-fg-secondary max-w-xs text-sm">
							The modern business phone system designed to help teams connect
							with customers effortlessly.
						</p>
					</div>
					<div data-themer-id="auto-div-176">
						<h4
							data-themer-id="auto-h4-177"
							className="text-fg mb-4 font-semibold">
							Product
						</h4>
						<ul
							data-themer-id="auto-ul-178"
							className="text-fg-secondary space-y-2 text-sm">
							<li data-themer-id="auto-li-179">
								<a
									data-themer-id="auto-a-180"
									href="#"
									className="hover:text-primary transition-colors">
									Features
								</a>
							</li>
							<li data-themer-id="auto-li-181">
								<a
									data-themer-id="auto-a-182"
									href="#"
									className="hover:text-primary transition-colors">
									Integrations
								</a>
							</li>
							<li data-themer-id="auto-li-183">
								<a
									data-themer-id="auto-a-184"
									href="#"
									className="hover:text-primary transition-colors">
									Pricing
								</a>
							</li>
							<li data-themer-id="auto-li-185">
								<a
									data-themer-id="auto-a-186"
									href="#"
									className="hover:text-primary transition-colors">
									Changelog
								</a>
							</li>
						</ul>
					</div>
					<div data-themer-id="auto-div-187">
						<h4
							data-themer-id="auto-h4-188"
							className="text-fg mb-4 font-semibold">
							Resources
						</h4>
						<ul
							data-themer-id="auto-ul-189"
							className="text-fg-secondary space-y-2 text-sm">
							<li data-themer-id="auto-li-190">
								<a
									data-themer-id="auto-a-191"
									href="#"
									className="hover:text-primary transition-colors">
									Help Center
								</a>
							</li>
							<li data-themer-id="auto-li-192">
								<a
									data-themer-id="auto-a-193"
									href="#"
									className="hover:text-primary transition-colors">
									API Docs
								</a>
							</li>
							<li data-themer-id="auto-li-194">
								<a
									data-themer-id="auto-a-195"
									href="#"
									className="hover:text-primary transition-colors">
									Community
								</a>
							</li>
							<li data-themer-id="auto-li-196">
								<a
									data-themer-id="auto-a-197"
									href="#"
									className="hover:text-primary transition-colors">
									Blog
								</a>
							</li>
						</ul>
					</div>
					<div data-themer-id="auto-div-198">
						<h4
							data-themer-id="auto-h4-199"
							className="text-fg mb-4 font-semibold">
							Company
						</h4>
						<ul
							data-themer-id="auto-ul-200"
							className="text-fg-secondary space-y-2 text-sm">
							<li data-themer-id="auto-li-201">
								<a
									data-themer-id="auto-a-202"
									href="#"
									className="hover:text-primary transition-colors">
									About Us
								</a>
							</li>
							<li data-themer-id="auto-li-203">
								<a
									data-themer-id="auto-a-204"
									href="#"
									className="hover:text-primary transition-colors">
									Careers
								</a>
							</li>
							<li data-themer-id="auto-li-205">
								<a
									data-themer-id="auto-a-206"
									href="#"
									className="hover:text-primary transition-colors">
									Contact
								</a>
							</li>
							<li data-themer-id="auto-li-207">
								<a
									data-themer-id="auto-a-208"
									href="#"
									className="hover:text-primary transition-colors">
									Legal
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div
					data-themer-id="auto-div-209"
					className="border-border text-fg-tertiary mx-auto mt-16 flex max-w-6xl flex-col items-center justify-between gap-4 border-t pt-8 text-sm md:flex-row">
					<p data-themer-id="auto-p-210">
						© 2026 AcmePhone, Inc. All rights reserved.
					</p>
					<div data-themer-id="auto-div-211" className="flex gap-4">
						<IconSlot
							data-themer-id="auto-iconslot-212"
							slot="archive"
							className="hover:text-fg size-4 cursor-pointer transition-colors"
						/>
						<IconSlot
							data-themer-id="auto-iconslot-213"
							slot="archive"
							className="hover:text-fg size-4 cursor-pointer transition-colors"
						/>
					</div>
				</div>
			</footer>
		</div>
	)
}
