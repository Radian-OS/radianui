import { Badge } from "@/styles/default/ui/badge"
import { useState } from "react"
import { Switch } from "@/styles/default/ui/switch"
import { Button } from "@/styles/default/ui/button"
import { Check, CheckCircle, ChevronDown, ChevronUp } from "lucide-react"

function Pricing2() {
	const [isBilledMonthly, setIsBilledMonthly] = useState(false)

	const [isFree, setIsFree] = useState(true)
	const [isBasic, setIsBasic] = useState(false)
	const [isBusiness, setIsBusiness] = useState(false)
	const [isEnterpise, setIsEnterprise] = useState(false)

	const [isViewFeatureList, setIsViewFeatureList] = useState<boolean>(false)

	const handleFreeClick = () => {
		setIsFree(true)
		setIsBasic(false)
		setIsBusiness(false)
		setIsEnterprise(false)
	}

	const handleBasicClick = () => {
		setIsFree(false)
		setIsBasic(true)
		setIsBusiness(false)
		setIsEnterprise(false)
	}

	const handleBusinessClick = () => {
		setIsFree(false)
		setIsBasic(false)
		setIsBusiness(true)
		setIsEnterprise(false)
	}
	const handleEnterpriseClick = () => {
		setIsFree(false)
		setIsBasic(false)
		setIsBusiness(false)
		setIsEnterprise(true)
	}

	const handleFeatureListToggle = () => {
		setIsViewFeatureList(!isViewFeatureList)
	}

	return (
		<div className="mx-auto flex max-w-screen-xl flex-col space-y-8 px-5 py-8 md:px-6 md:py-[3.75rem]">
			<div className="space-y-6 text-center">
				<div className="space-y-3 md:px-[1.5625rem]">
					<Badge
						variant={"outline"}
						className="bg-background w-fit rounded-full px-3 py-1">
						<span className="text-foreground text-sm font-medium capitalize">
							Pricing
						</span>
					</Badge>
					<h1 className="text-foreground text-center text-[2rem] leading-[2.6rem] font-semibold md:text-[2.25rem] md:leading-[2.75rem] lg:text-[3rem] lg:leading-[3.75rem]">
						Find best plan for your project
					</h1>
				</div>
				<div>
					<p className="text-foreground text-base font-normal">
						Start building for free and expedite your dreams into reality
					</p>
				</div>
			</div>

			<div className="mx-auto flex items-center space-x-2">
				<p className="text-sm">Billed monthly</p>
				<Switch
					checked={isBilledMonthly}
					onCheckedChange={() => setIsBilledMonthly(!isBilledMonthly)}
				/>
				<p className="text-sm">Billed annually</p>
			</div>

			<div className="bg-background sticky top-[4.5rem] z-10 -mx-5 flex border md:-mx-6 lg:hidden">
				<div className="w-1/4 border-r text-center" onClick={handleFreeClick}>
					<div
						className={`px-[0.625rem] py-3 ${isFree ? "border-b-2 border-black" : ""}`}>
						Free
					</div>
				</div>

				<div className="w-1/4 border-r text-center" onClick={handleBasicClick}>
					<div
						className={`px-[0.625rem] py-3 ${isBasic ? "border-b-2 border-black" : ""}`}>
						Basic
					</div>
				</div>

				<div
					className="w-1/4 border-r text-center"
					onClick={handleBusinessClick}>
					<div
						className={`px-[0.625rem] py-3 ${isBusiness ? "border-b-2 border-black" : ""} `}>
						Business
					</div>
				</div>

				<div className="w-1/4 text-center" onClick={handleEnterpriseClick}>
					<div
						className={`px-[0.625rem] py-3 ${isEnterpise ? "border-b-2 border-black" : ""}`}>
						Enterprise
					</div>
				</div>
			</div>

			<div className="space-y-5 lg:hidden lg:space-y-0 lg:space-x-5 lg:px-6">
				{isFree && (
					<div className="rounded-xl border lg:w-1/4">
						<div className="space-y-4 p-5">
							<div className="space-y-[0.125rem]">
								<h1 className="text-[1.25rem] leading-[1.875rem] font-semibold">
									Free
								</h1>{" "}
								<p className="text-sm font-normal"> Great for solo founders</p>
							</div>
							<div className="relative flex space-x-2">
								<div className="">
									<h1 className="text-[2.25rem] leading-[2.75rem] font-semibold">
										$0
									</h1>
								</div>
								<div className="py-1">
									<p className="absolute bottom-1 text-sm font-normal">
										{isBilledMonthly ? "per year" : "per month"}
									</p>
								</div>
							</div>
							<Button className="order-1 w-full">Start for Free</Button>
						</div>
						<div className="border-t p-5">
							<div className="space-y-4">
								<div>
									<h1 className="text-sm font-medium">Get started with</h1>
								</div>
								<div className="space-y-2">
									<div className="flex items-center space-x-2">
										<Check className="h-4 w-4" />
										<p className="text-sm font-normal">Unlimited members</p>
									</div>
									<div className="flex items-center space-x-2">
										<Check className="h-4 w-4" />
										<p className="text-sm font-normal">
											All interface components
										</p>
									</div>
									<div className="flex items-center space-x-2">
										<Check className="h-4 w-4" />
										<p className="text-sm font-normal">Full user support</p>
									</div>
									<div className="flex items-center space-x-2">
										<Check className="h-4 w-4" />
										<p className="text-sm font-normal">2 admins</p>
									</div>
									<div className="flex items-center space-x-2">
										<Check className="h-4 w-4" />
										<p className="text-sm font-normal">Free</p>
									</div>
									<div className="flex items-center space-x-2">
										<Check className="h-4 w-4" />
										<p className="text-sm font-normal">Free</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				{isBasic && (
					<div className="rounded-xl border lg:w-1/4">
						<div className="space-y-4 p-5">
							<div className="space-y-[0.125rem]">
								<div className="flex space-x-2">
									<h1 className="text-[1.25rem] leading-[1.875rem] font-semibold">
										Basic
									</h1>{" "}
									<Badge
										variant={"outline"}
										className="bg-background w-fit rounded-full px-[0.625rem] py-[0.125rem]">
										<span className="text-foreground text-sm font-medium capitalize">
											Popular
										</span>
									</Badge>{" "}
								</div>
								<p className="text-sm font-normal"> Great for small teams</p>
							</div>
							<div className="relative flex space-x-2">
								<div>
									<h1 className="text-[2.25rem] leading-[2.75rem] font-semibold">
										{isBilledMonthly ? "$10" : "$15"}
									</h1>
								</div>
								<div className="py-1">
									<p className="absolute bottom-1 text-sm font-normal">
										{isBilledMonthly ? "per year" : "per month"}
									</p>
								</div>
							</div>
							<Button className="order-1 w-full">Get Started</Button>
						</div>
						<div className="border-t p-5">
							<div className="space-y-4">
								<div>
									<h1 className="text-sm font-medium">Get started with</h1>
								</div>
								<div className="space-y-2">
									<div className="flex items-center space-x-2">
										<Check className="h-4 w-4" />
										<p className="text-sm font-normal">Unlimited members</p>
									</div>
									<div className="flex items-center space-x-2">
										<Check className="h-4 w-4" />
										<p className="text-sm font-normal">
											All interface components
										</p>
									</div>
									<div className="flex items-center space-x-2">
										<Check className="h-4 w-4" />
										<p className="text-sm font-normal">Full user support</p>
									</div>
									<div className="flex items-center space-x-2">
										<Check className="h-4 w-4" />
										<p className="text-sm font-normal">4 admins</p>
									</div>
									<div className="flex items-center space-x-2">
										<Check className="h-4 w-4" />
										<p className="text-sm font-normal">Free</p>
									</div>
									<div className="flex items-center space-x-2">
										<Check className="h-4 w-4" />
										<p className="text-sm font-normal">Free</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				{isBusiness && (
					<div className="rounded-xl border lg:w-1/4">
						<div className="space-y-4 p-5">
							<div className="space-y-[0.125rem]">
								<h1 className="text-[1.25rem] leading-[1.875rem] font-semibold">
									Business
								</h1>{" "}
								<p className="text-sm font-normal">
									{" "}
									Great for business and large teams
								</p>
							</div>
							<div className="relative flex space-x-2">
								<div>
									<h1 className="text-[2.25rem] leading-[2.75rem] font-semibold">
										{isBilledMonthly ? "$15" : "$20"}
									</h1>
								</div>
								<div className="py-1">
									<p className="absolute bottom-1 text-sm font-normal">
										{isBilledMonthly ? "per year" : "per month"}
									</p>
								</div>
							</div>
							<Button className="order-1 w-full">Start for Free</Button>
						</div>
						<div className="border-t p-5">
							<div className="space-y-4">
								<div>
									<h1 className="text-sm font-medium">Get started with</h1>
								</div>
								<div className="space-y-2">
									<div className="flex items-center space-x-2">
										<Check className="h-4 w-4" />
										<p className="text-sm font-normal">Unlimited members</p>
									</div>
									<div className="flex items-center space-x-2">
										<Check className="h-4 w-4" />
										<p className="text-sm font-normal">
											All interface components
										</p>
									</div>
									<div className="flex items-center space-x-2">
										<Check className="h-4 w-4" />
										<p className="text-sm font-normal">Full user support</p>
									</div>
									<div className="flex items-center space-x-2">
										<Check className="h-4 w-4" />
										<p className="text-sm font-normal">8 admins</p>
									</div>
									<div className="flex items-center space-x-2">
										<Check className="h-4 w-4" />
										<p className="text-sm font-normal">Free</p>
									</div>
									<div className="flex items-center space-x-2">
										<Check className="h-4 w-4" />
										<p className="text-sm font-normal">Free</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				{isEnterpise && (
					<div className="rounded-xl border lg:w-1/4">
						<div className="space-y-4 p-5">
							<div className="space-y-[0.125rem]">
								<h1 className="text-[1.25rem] leading-[1.875rem] font-semibold">
									Enterprise
								</h1>{" "}
								<p className="text-sm font-normal">
									{" "}
									Customer tailored enterprise grade
								</p>
							</div>
							<div className="flex space-x-2">
								<div>
									<h1 className="text-[2rem] leading-[2.6rem] font-semibold">
										Custom
									</h1>
								</div>
							</div>

							<Button className="order-1 w-full" variant={"outline"}>
								Contact us
							</Button>
						</div>
						<div className="border-t p-5">
							<div className="space-y-4">
								<div>
									<h1 className="text-sm font-medium">Get started with</h1>
								</div>
								<div className="space-y-2">
									<div className="flex items-center space-x-2">
										<Check className="h-4 w-4" />
										<p className="text-sm font-normal">Unlimited members</p>
									</div>
									<div className="flex items-center space-x-2">
										<Check className="h-4 w-4" />
										<p className="text-sm font-normal">
											All interface components
										</p>
									</div>
									<div className="flex items-center space-x-2">
										<Check className="h-4 w-4" />
										<p className="text-sm font-normal">Full user support</p>
									</div>
									<div className="flex items-center space-x-2">
										<Check className="h-4 w-4" />
										<p className="text-sm font-normal">Unlimited admins</p>
									</div>
									<div className="flex items-center space-x-2">
										<Check className="h-4 w-4" />
										<p className="text-sm font-normal">Free</p>
									</div>
									<div className="flex items-center space-x-2">
										<Check className="h-4 w-4" />
										<p className="text-sm font-normal">Free</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>

			<div className="hidden space-y-5 lg:flex lg:space-y-0 lg:space-x-5">
				<div className="rounded-xl border lg:w-1/4">
					<div className="space-y-4 p-5">
						<div className="space-y-[0.125rem]">
							<h1 className="text-[1.25rem] leading-[1.875rem] font-semibold">
								Free
							</h1>{" "}
							<p className="text-sm font-normal"> Great for solo founders</p>
						</div>
						<div className="relative flex space-x-2">
							<div>
								<h1 className="text-[2.25rem] leading-[2.75rem] font-semibold">
									$0
								</h1>
							</div>
							<div className="py-1">
								<p className="absolute bottom-1 text-sm font-normal">
									{isBilledMonthly ? "per year" : "per month"}
								</p>
							</div>
						</div>
						<Button className="order-1 w-full">Start for Free</Button>
					</div>
					<div className="border-t p-5">
						<div className="space-y-4">
							<div>
								<h1 className="text-sm font-medium">Get started with</h1>
							</div>
							<div className="space-y-2">
								<div className="flex items-center space-x-2">
									<Check className="h-4 w-4" />
									<p className="text-sm font-normal">Unlimited members</p>
								</div>
								<div className="flex items-center space-x-2">
									<Check className="h-4 w-4" />
									<p className="text-sm font-normal">
										All interface components
									</p>
								</div>
								<div className="flex items-center space-x-2">
									<Check className="h-4 w-4" />
									<p className="text-sm font-normal">Full user support</p>
								</div>
								<div className="flex items-center space-x-2">
									<Check className="h-4 w-4" />
									<p className="text-sm font-normal">2 admins</p>
								</div>
								<div className="flex items-center space-x-2">
									<Check className="h-4 w-4" />
									<p className="text-sm font-normal">Free</p>
								</div>
								<div className="flex items-center space-x-2">
									<Check className="h-4 w-4" />
									<p className="text-sm font-normal">Free</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="rounded-xl border lg:w-1/4">
					<div className="space-y-4 p-5">
						<div className="space-y-[0.125rem]">
							<div className="flex space-x-2">
								<h1 className="text-[1.25rem] leading-[1.875rem] font-semibold">
									Basic
								</h1>{" "}
								<Badge
									variant={"outline"}
									className="bg-background w-fit rounded-full px-[0.625rem] py-[0.125rem]">
									<span className="text-foreground text-sm font-medium capitalize">
										Popular
									</span>
								</Badge>{" "}
							</div>
							<p className="text-sm font-normal"> Great for small teams</p>
						</div>
						<div className="relative flex space-x-2">
							<div>
								<h1 className="text-[2.25rem] leading-[2.75rem] font-semibold">
									{isBilledMonthly ? "$10" : "$15"}
								</h1>
							</div>
							<div className="py-1">
								<p className="absolute bottom-1 text-sm font-normal">
									{isBilledMonthly ? "per year" : "per month"}
								</p>
							</div>
						</div>
						<Button className="order-1 w-full">Get Started</Button>
					</div>
					<div className="border-t p-5">
						<div className="space-y-4">
							<div>
								<h1 className="text-sm font-medium">Get started with</h1>
							</div>
							<div className="space-y-2">
								<div className="flex items-center space-x-2">
									<Check className="h-4 w-4" />
									<p className="text-sm font-normal">Unlimited members</p>
								</div>
								<div className="flex items-center space-x-2">
									<Check className="h-4 w-4" />
									<p className="text-sm font-normal">
										All interface components
									</p>
								</div>
								<div className="flex items-center space-x-2">
									<Check className="h-4 w-4" />
									<p className="text-sm font-normal">Full user support</p>
								</div>
								<div className="flex items-center space-x-2">
									<Check className="h-4 w-4" />
									<p className="text-sm font-normal">4 admins</p>
								</div>
								<div className="flex items-center space-x-2">
									<Check className="h-4 w-4" />
									<p className="text-sm font-normal">Free</p>
								</div>
								<div className="flex items-center space-x-2">
									<Check className="h-4 w-4" />
									<p className="text-sm font-normal">Free</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="rounded-xl border lg:w-1/4">
					<div className="space-y-4 p-5">
						<div className="space-y-[0.125rem]">
							<h1 className="text-[1.25rem] leading-[1.875rem] font-semibold">
								Business
							</h1>{" "}
							<p className="text-sm font-normal">
								{" "}
								Great for business and large teams
							</p>
						</div>
						<div className="relative flex space-x-2">
							<div>
								<h1 className="text-[2.25rem] leading-[2.75rem] font-semibold">
									{isBilledMonthly ? "$15" : "$20"}
								</h1>
							</div>
							<div className="py-1">
								<p className="absolute bottom-1 text-sm font-normal">
									{isBilledMonthly ? "per year" : "per month"}
								</p>
							</div>
						</div>
						<Button className="order-1 w-full">Start for Free</Button>
					</div>
					<div className="border-t p-5">
						<div className="space-y-4">
							<div>
								<h1 className="text-sm font-medium">Get started with</h1>
							</div>
							<div className="space-y-2">
								<div className="flex items-center space-x-2">
									<Check className="h-4 w-4" />
									<p className="text-sm font-normal">Unlimited members</p>
								</div>
								<div className="flex items-center space-x-2">
									<Check className="h-4 w-4" />
									<p className="text-sm font-normal">
										All interface components
									</p>
								</div>
								<div className="flex items-center space-x-2">
									<Check className="h-4 w-4" />
									<p className="text-sm font-normal">Full user support</p>
								</div>
								<div className="flex items-center space-x-2">
									<Check className="h-4 w-4" />
									<p className="text-sm font-normal">8 admins</p>
								</div>
								<div className="flex items-center space-x-2">
									<Check className="h-4 w-4" />
									<p className="text-sm font-normal">Free</p>
								</div>
								<div className="flex items-center space-x-2">
									<Check className="h-4 w-4" />
									<p className="text-sm font-normal">Free</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="rounded-xl border lg:w-1/4">
					<div className="space-y-4 p-5">
						<div className="space-y-[0.125rem]">
							<h1 className="text-[1.25rem] leading-[1.875rem] font-semibold">
								Enterprise
							</h1>{" "}
							<p className="text-sm font-normal">
								{" "}
								Customer tailored enterprise grade
							</p>
						</div>
						<div className="flex space-x-2">
							<div>
								<h1 className="text-[2rem] leading-[2.6rem] font-semibold">
									Custom
								</h1>
							</div>
						</div>

						<Button className="order-1 w-full" variant={"outline"}>
							Contact us
						</Button>
					</div>
					<div className="border-t p-5">
						<div className="space-y-4">
							<div>
								<h1 className="text-sm font-medium">Get started with</h1>
							</div>
							<div className="space-y-2">
								<div className="flex items-center space-x-2">
									<Check className="h-4 w-4" />
									<p className="text-sm font-normal">Unlimited members</p>
								</div>
								<div className="flex items-center space-x-2">
									<Check className="h-4 w-4" />
									<p className="text-sm font-normal">
										All interface components
									</p>
								</div>
								<div className="flex items-center space-x-2">
									<Check className="h-4 w-4" />
									<p className="text-sm font-normal">Full user support</p>
								</div>
								<div className="flex items-center space-x-2">
									<Check className="h-4 w-4" />
									<p className="text-sm font-normal">Unlimited admins</p>
								</div>
								<div className="flex items-center space-x-2">
									<Check className="h-4 w-4" />
									<p className="text-sm font-normal">Free</p>
								</div>
								<div className="flex items-center space-x-2">
									<Check className="h-4 w-4" />
									<p className="text-sm font-normal">Free</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Button
				className="mx-auto w-fit gap-1 px-[0.875rem] py-[0.625rem]"
				variant={"outline"}

				onClick={handleFeatureListToggle}>
				View full Features List{" "}
				{isViewFeatureList ? <ChevronDown /> : <ChevronUp />}
			</Button>

			{/* Pricing Details for small screen devices */}
			{isFree && (
				<div className={`lg:hidden ${isViewFeatureList ? "block" : "hidden"}`}>
					<div>
						<div className="border-b py-4">
							<h2 className="text-base font-semibold">Core Features</h2>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Ready-to-use UI Components
							</h4>
							<h4 className="text-sm font-medium">Limited Access</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Customizable Themes</h4>
							<h4 className="text-sm font-medium">Basic</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Integration with React</h4>
							<h4 className="text-sm font-medium">
								<CheckCircle className="text-green-600" />
							</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Integration with TypeScript
							</h4>
							<h4 className="text-sm font-medium">
								<CheckCircle className="text-green-600" />
							</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Integration with Tailwind CSS
							</h4>
							<h4 className="text-sm font-medium">
								<CheckCircle className="text-green-600" />
							</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Integration with shadcn/ui
							</h4>
							<h4 className="text-sm font-medium">
								<CheckCircle className="text-green-600" />
							</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Code Snippet Library</h4>
							<h4 className="text-sm font-medium">Limited Access</h4>
						</div>
					</div>

					<div>
						<div className="border-b py-4">
							<h2 className="text-base font-semibold">Collaboration Tools</h2>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Team Members</h4>
							<h4 className="text-sm font-medium">Limited Access</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Shared Design Libraries</h4>
							<h4 className="text-sm font-medium">Basic</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Component Version Control</h4>
							<h4 className="text-sm font-medium">
								<CheckCircle className="text-green-600" />
							</h4>
						</div>
					</div>

					<div>
						<div className="border-b py-4">
							<h2 className="text-base font-semibold">Support & Maintenance</h2>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Documentation Access</h4>
							<h4 className="text-sm font-medium">Limited Access</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Email Support</h4>
							<h4 className="text-sm font-medium">Basic</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Custom Component Requests</h4>
							<h4 className="text-sm font-medium">
								<CheckCircle className="text-green-600" />
							</h4>
						</div>
					</div>

					<div>
						<div className="border-b py-4">
							<h2 className="text-base font-semibold">
								Performance & Scalability
							</h2>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Component Load Optimization
							</h4>
							<h4 className="text-sm font-medium">Basic</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Scalability for Large Projects
							</h4>
							<h4 className="text-sm font-medium">-</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Custom Hosting Integration
							</h4>
							<h4 className="text-sm font-medium">-</h4>
						</div>
					</div>

					<div>
						<div className="border-b py-4">
							<h2 className="text-base font-semibold">Security & Compliance</h2>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Best Security</h4>
							<h4 className="text-sm font-medium">
								<CheckCircle className="text-green-600" />
							</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Role-Based Access Control</h4>
							<h4 className="text-sm font-medium">-</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Compliance with Industry Standards
							</h4>
							<h4 className="text-sm font-medium">
								<CheckCircle className="text-green-600" />
							</h4>
						</div>
					</div>
				</div>
			)}

			{isBasic && (
				<div className="lg:hidden">
					<div>
						<div className="border-b py-4">
							<h2 className="text-base font-semibold">Core Features</h2>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Ready-to-use UI Components
							</h4>
							<h4 className="text-sm font-medium">Full Access</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Customizable Themes</h4>
							<h4 className="text-sm font-medium">Standard</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Integration with React</h4>
							<h4 className="text-sm font-medium">
								<CheckCircle className="text-green-600" />
							</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Integration with TypeScript
							</h4>
							<h4 className="text-sm font-medium">
								<CheckCircle className="text-green-600" />
							</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Integration with Tailwind CSS
							</h4>
							<h4 className="text-sm font-medium">
								<CheckCircle className="text-green-600" />
							</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Integration with shadcn/ui
							</h4>
							<h4 className="text-sm font-medium">
								<CheckCircle className="text-green-600" />
							</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Code Snippet Library</h4>
							<h4 className="text-sm font-medium">Standard</h4>
						</div>
					</div>

					<div>
						<div className="border-b py-4">
							<h2 className="text-base font-semibold">Collaboration Tools</h2>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Team Members</h4>
							<h4 className="text-sm font-medium">5 members</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Shared Design Libraries</h4>
							<h4 className="text-sm font-medium">
								<CheckCircle className="text-green-600" />
							</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Component Version Control</h4>
							<h4 className="text-sm font-medium">Basic</h4>
						</div>
					</div>

					<div>
						<div className="border-b py-4">
							<h2 className="text-base font-semibold">Support & Maintenance</h2>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Documentation Access</h4>
							<h4 className="text-sm font-medium">Standard</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Email Support</h4>
							<h4 className="text-sm font-medium">Standard Support</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Custom Component Requests</h4>
							<h4 className="text-sm font-medium">Limited</h4>
						</div>
					</div>

					<div>
						<div className="border-b py-4">
							<h2 className="text-base font-semibold">
								Performance & Scalability
							</h2>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Component Load Optimization
							</h4>
							<h4 className="text-sm font-medium">Standard</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Scalability for Large Projects
							</h4>
							<h4 className="text-sm font-medium">Basic</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Custom Hosting Integration
							</h4>
							<h4 className="text-sm font-medium">-</h4>
						</div>
					</div>

					<div>
						<div className="border-b py-4">
							<h2 className="text-base font-semibold">Security & Compliance</h2>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Best Security</h4>
							<h4 className="text-sm font-medium">
								<CheckCircle className="text-green-600" />
							</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Role-Based Access Control</h4>
							<h4 className="text-sm font-medium">Basic</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Compliance with Industry Standards
							</h4>
							<h4 className="text-sm font-medium">
								<CheckCircle className="text-green-600" />
							</h4>
						</div>
					</div>
				</div>
			)}

			{isBusiness && (
				<div className="lg:hidden">
					<div>
						<div className="border-b py-4">
							<h2 className="text-base font-semibold">Core Features</h2>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Ready-to-use UI Components
							</h4>
							<h4 className="text-sm font-medium">Full Access</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Customizable Themes</h4>
							<h4 className="text-sm font-medium">Advanced</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Integration with React</h4>
							<h4 className="text-sm font-medium">
								<CheckCircle className="text-green-600" />
							</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Integration with TypeScript
							</h4>
							<h4 className="text-sm font-medium">
								<CheckCircle className="text-green-600" />
							</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Integration with Tailwind CSS
							</h4>
							<h4 className="text-sm font-medium">
								<CheckCircle className="text-green-600" />
							</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Integration with shadcn/ui
							</h4>
							<h4 className="text-sm font-medium">
								<CheckCircle className="text-green-600" />
							</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Code Snippet Library</h4>
							<h4 className="text-sm font-medium">Advanced</h4>
						</div>
					</div>

					<div>
						<div className="border-b py-4">
							<h2 className="text-base font-semibold">Collaboration Tools</h2>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Team Members</h4>
							<h4 className="text-sm font-medium">10 members</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Shared Design Libraries</h4>
							<h4 className="text-sm font-medium">
								<CheckCircle className="text-green-600" />
							</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Component Version Control</h4>
							<h4 className="text-sm font-medium">Advanced</h4>
						</div>
					</div>

					<div>
						<div className="border-b py-4">
							<h2 className="text-base font-semibold">Support & Maintenance</h2>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Documentation Access</h4>
							<h4 className="text-sm font-medium">Advanced</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Email Support</h4>
							<h4 className="text-sm font-medium">24/7 Support</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Custom Component Requests</h4>
							<h4 className="text-sm font-medium">Standard</h4>
						</div>
					</div>

					<div>
						<div className="border-b py-4">
							<h2 className="text-base font-semibold">
								Performance & Scalability
							</h2>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Component Load Optimization
							</h4>
							<h4 className="text-sm font-medium">Advanced</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Scalability for Large Projects
							</h4>
							<h4 className="text-sm font-medium">Advanced</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Custom Hosting Integration
							</h4>
							<h4 className="text-sm font-medium">Standard</h4>
						</div>
					</div>

					<div>
						<div className="border-b py-4">
							<h2 className="text-base font-semibold">Security & Compliance</h2>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Best Security</h4>
							<h4 className="text-sm font-medium">
								<CheckCircle className="text-green-600" />
							</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Role-Based Access Control</h4>
							<h4 className="text-sm font-medium">Advanced</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Compliance with Industry Standards
							</h4>
							<h4 className="text-sm font-medium">
								<CheckCircle className="text-green-600" />
							</h4>
						</div>
					</div>
				</div>
			)}

			{isEnterpise && (
				<div className="lg:hidden">
					<div>
						<div className="border-b py-4">
							<h2 className="text-base font-semibold">Core Features</h2>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Ready-to-use UI Components
							</h4>
							<h4 className="text-sm font-medium">Customizable Access</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Customizable Themes</h4>
							<h4 className="text-sm font-medium">Full Customization</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Integration with React</h4>
							<h4 className="text-sm font-medium">
								<CheckCircle className="text-green-600" />
							</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Integration with TypeScript
							</h4>
							<h4 className="text-sm font-medium">
								<CheckCircle className="text-green-600" />
							</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Integration with Tailwind CSS
							</h4>
							<h4 className="text-sm font-medium">
								<CheckCircle className="text-green-600" />
							</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Integration with shadcn/ui
							</h4>
							<h4 className="text-sm font-medium">
								<CheckCircle className="text-green-600" />
							</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Code Snippet Library</h4>
							<h4 className="text-sm font-medium">Full Access</h4>
						</div>
					</div>

					<div>
						<div className="border-b py-4">
							<h2 className="text-base font-semibold">Collaboration Tools</h2>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Team Members</h4>
							<h4 className="text-sm font-medium">Custom</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Shared Design Libraries</h4>
							<h4 className="text-sm font-medium">
								<CheckCircle className="text-green-600" />
							</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Component Version Control</h4>
							<h4 className="text-sm font-medium">Advanced</h4>
						</div>
					</div>

					<div>
						<div className="border-b py-4">
							<h2 className="text-base font-semibold">Support & Maintenance</h2>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Documentation Access</h4>
							<h4 className="text-sm font-medium">Priority Support</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Email Support</h4>
							<h4 className="text-sm font-medium">Dedicated Support</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Custom Component Requests</h4>
							<h4 className="text-sm font-medium">Full Access</h4>
						</div>
					</div>

					<div>
						<div className="border-b py-4">
							<h2 className="text-base font-semibold">
								Performance & Scalability
							</h2>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Component Load Optimization
							</h4>
							<h4 className="text-sm font-medium">Custom Optimization</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Scalability for Large Projects
							</h4>
							<h4 className="text-sm font-medium">Full Scalability</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Custom Hosting Integration
							</h4>
							<h4 className="text-sm font-medium">Full Customization</h4>
						</div>
					</div>

					<div>
						<div className="border-b py-4">
							<h2 className="text-base font-semibold">Security & Compliance</h2>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Best Security</h4>
							<h4 className="text-sm font-medium">Custom Security</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">Role-Based Access Control</h4>
							<h4 className="text-sm font-medium">Custom</h4>
						</div>
						<div className="flex justify-between space-x-4 border-b py-4">
							<h4 className="text-sm font-medium">
								Compliance with Industry Standards
							</h4>
							<h4 className="text-right text-sm font-medium">
								Custom Compliance
							</h4>
						</div>
					</div>
				</div>
			)}

			{/* Pricing Details for large screen device */}
			<div className={`hidden ${isViewFeatureList ? "lg:block" : "lg:hidden"}`}>
				<div className="bg-background sticky top-10">
					<div className="grid grid-cols-[1.64fr_1fr_1fr_1fr_1fr] gap-8 border-b py-6">
						<div className="relative">
							<h2 className="absolute bottom-4 text-lg font-semibold">
								Features
							</h2>
						</div>
						<h4 className="text-sm font-medium">
							<div className="space-y-2">
								<div>
									<h1 className="text-lg font-semibold">Free</h1>
									<div className="flex space-x-2">
										<p className="text-base font-semibold">$0</p>
										<p className="text-base font-normal">
											{isBilledMonthly ? "per year" : "per month"}
										</p>
									</div>
								</div>
								<Button className="w-full px-[0.875rem] py-[0.625rem]">
									Start for Free
								</Button>
							</div>
						</h4>
						<h4 className="text-sm font-medium">
							<div className="space-y-2">
								<div>
									<div className="flex space-x-2">
										<h1 className="text-lg font-semibold">Basic</h1>
										<Badge
											variant={"outline"}
											className="bg-background w-fit rounded-full px-[0.625rem]">
											<span className="text-foreground text-sm font-medium capitalize">
												Popular
											</span>
										</Badge>{" "}
									</div>
									<div className="flex space-x-2">
										<p className="text-base font-semibold">
											{isBilledMonthly ? "$15" : "$10"}
										</p>
										<p className="text-base font-normal">
											{isBilledMonthly ? "per year" : "per month"}
										</p>
									</div>
								</div>
								<Button className="w-full px-[0.875rem] py-[0.625rem]">
									Get Started
								</Button>
							</div>
						</h4>
						<h4 className="text-sm font-medium">
							<div className="space-y-2">
								<div>
									<h1 className="text-lg font-semibold">Business</h1>
									<div className="flex space-x-2">
										<p className="text-base font-semibold">
											{isBilledMonthly ? "$15" : "$20"}
										</p>
										<p className="text-base font-normal">
											{isBilledMonthly ? "per year" : "per month"}
										</p>
									</div>
								</div>
								<Button className="w-full px-[0.875rem] py-[0.625rem]">
									Get Started
								</Button>
							</div>
						</h4>
						<h4 className="text-sm font-medium">
							<div className="space-y-2">
								<div>
									<h1 className="text-lg font-semibold">Enterprise</h1>
									<div className="flex space-x-2">
										<p className="text-base font-medium">Custom</p>
									</div>
								</div>
								<Button
									className="w-full px-[0.875rem] py-[0.625rem]"
									variant={"outline"}>
									Contact us
								</Button>
							</div>
						</h4>
					</div>
				</div>

				<div className="text-foreground">
					<div className="border-b py-4">
						<h2 className="text-base font-semibold">Core Features</h2>
					</div>
					<div className="grid grid-cols-[1.64fr_1fr_1fr_1fr_1fr] gap-8 border-b py-4">
						<h4 className="text-sm font-medium">Ready-to-use UI Components</h4>
						<h4 className="text-sm font-medium">Limited Access</h4>
						<h4 className="text-sm font-medium">Full Access</h4>
						<h4 className="text-sm font-medium">Full Access</h4>
						<h4 className="text-sm font-medium">Customizable Access</h4>
					</div>
					<div className="grid grid-cols-[1.64fr_1fr_1fr_1fr_1fr] gap-8 border-b py-4">
						<h4 className="text-sm font-medium">Customizable Themes</h4>
						<h4 className="text-sm font-medium">Basic</h4>
						<h4 className="text-sm font-medium">Standard</h4>
						<h4 className="text-sm font-medium">Advanced</h4>
						<h4 className="text-sm font-medium">Full Customization</h4>
					</div>
					<div className="grid grid-cols-[1.64fr_1fr_1fr_1fr_1fr] gap-8 border-b py-4">
						<h4 className="text-sm font-medium">Integration with React</h4>
						<h4 className="text-sm font-medium">
							<CheckCircle className="text-green-600" />
						</h4>
						<h4 className="text-sm font-medium">
							<CheckCircle className="text-green-600" />
						</h4>
						<h4 className="text-sm font-medium">
							<CheckCircle className="text-green-600" />
						</h4>
						<h4 className="text-sm font-medium">
							<CheckCircle className="text-green-600" />
						</h4>
					</div>
					<div className="grid grid-cols-[1.64fr_1fr_1fr_1fr_1fr] gap-8 border-b py-4">
						<h4 className="text-sm font-medium">Integration with TypeScript</h4>
						<h4 className="text-sm font-medium">
							<CheckCircle className="text-green-600" />
						</h4>
						<h4 className="text-sm font-medium">
							<CheckCircle className="text-green-600" />
						</h4>
						<h4 className="text-sm font-medium">
							<CheckCircle className="text-green-600" />
						</h4>
						<h4 className="text-sm font-medium">
							<CheckCircle className="text-green-600" />
						</h4>
					</div>
					<div className="grid grid-cols-[1.64fr_1fr_1fr_1fr_1fr] gap-8 border-b py-4">
						<h4 className="text-sm font-medium">
							Integration with Tailwind CSS
						</h4>
						<h4 className="text-sm font-medium">
							<CheckCircle className="text-green-600" />
						</h4>
						<h4 className="text-sm font-medium">
							<CheckCircle className="text-green-600" />
						</h4>
						<h4 className="text-sm font-medium">
							<CheckCircle className="text-green-600" />
						</h4>
						<h4 className="text-sm font-medium">
							<CheckCircle className="text-green-600" />
						</h4>
					</div>
					<div className="grid grid-cols-[1.64fr_1fr_1fr_1fr_1fr] gap-8 border-b py-4">
						<h4 className="text-sm font-medium">Integration with shadcn/ui</h4>
						<h4 className="text-sm font-medium">
							<CheckCircle className="text-green-600" />
						</h4>
						<h4 className="text-sm font-medium">
							<CheckCircle className="text-green-600" />
						</h4>
						<h4 className="text-sm font-medium">
							<CheckCircle className="text-green-600" />
						</h4>
						<h4 className="text-sm font-medium">
							<CheckCircle className="text-green-600" />
						</h4>
					</div>
					<div className="grid grid-cols-[1.64fr_1fr_1fr_1fr_1fr] gap-8 border-b py-4">
						<h4 className="text-sm font-medium">Code Snippet Library</h4>
						<h4 className="text-sm font-medium">Basic</h4>
						<h4 className="text-sm font-medium">Standard</h4>
						<h4 className="text-sm font-medium">Advanced</h4>
						<h4 className="text-sm font-medium">Full Access</h4>
					</div>
				</div>

				<div className="">
					<div className="border-b py-4">
						<h2 className="text-base font-semibold">Support & Maintenance</h2>
					</div>
					<div className="grid grid-cols-[1.64fr_1fr_1fr_1fr_1fr] gap-8 border-b py-4">
						<h4 className="text-sm font-medium">Documentation Access</h4>
						<h4 className="text-sm font-medium">Basic</h4>
						<h4 className="text-sm font-medium">Standard</h4>
						<h4 className="text-sm font-medium">Advanced</h4>
						<h4 className="text-sm font-medium">Priority Support</h4>
					</div>
					<div className="grid grid-cols-[1.64fr_1fr_1fr_1fr_1fr] gap-8 border-b py-4">
						<h4 className="text-sm font-medium">Email Support</h4>
						<h4 className="text-sm font-medium">Communnity Only</h4>
						<h4 className="text-sm font-medium">Standard Support</h4>
						<h4 className="text-sm font-medium">24/7 Support</h4>
						<h4 className="text-sm font-medium">Dedicated Support</h4>
					</div>
					<div className="grid grid-cols-[1.64fr_1fr_1fr_1fr_1fr] gap-8 border-b py-4">
						<h4 className="text-sm font-medium">Custom Component Requests</h4>
						<h4 className="text-sm font-medium">-</h4>
						<h4 className="text-sm font-medium">Limited</h4>
						<h4 className="text-sm font-medium">Standard</h4>
						<h4 className="text-sm font-medium">Full Access</h4>
					</div>
				</div>

				<div className="">
					<div className="border-b py-4">
						<h2 className="text-base font-semibold">
							Performance & Scalability
						</h2>
					</div>
					<div className="grid grid-cols-[1.64fr_1fr_1fr_1fr_1fr] gap-8 border-b py-4">
						<h4 className="text-sm font-medium">Component Load Optimization</h4>
						<h4 className="text-sm font-medium">Basic</h4>
						<h4 className="text-sm font-medium">Standard</h4>
						<h4 className="text-sm font-medium">Advanced</h4>
						<h4 className="text-sm font-medium">Custom Optimization</h4>
					</div>
					<div className="grid grid-cols-[1.64fr_1fr_1fr_1fr_1fr] gap-8 border-b py-4">
						<h4 className="text-sm font-medium">
							Scalability for Large Projects
						</h4>
						<h4 className="text-sm font-medium">-</h4>
						<h4 className="text-sm font-medium">Basic</h4>
						<h4 className="text-sm font-medium">Advanced</h4>
						<h4 className="text-sm font-medium">Full Scalability</h4>
					</div>
					<div className="grid grid-cols-[1.64fr_1fr_1fr_1fr_1fr] gap-8 border-b py-4">
						<h4 className="text-sm font-medium">Custom Hosting Integration</h4>
						<h4 className="text-sm font-medium">-</h4>
						<h4 className="text-sm font-medium">-</h4>
						<h4 className="text-sm font-medium">Standard</h4>
						<h4 className="text-sm font-medium">Full Customization</h4>
					</div>
				</div>

				<div className="">
					<div className="border-b py-4">
						<h2 className="text-base font-semibold">Security & Compliance</h2>
					</div>
					<div className="grid grid-cols-[1.64fr_1fr_1fr_1fr_1fr] gap-8 border-b py-4">
						<h4 className="text-sm font-medium">Basic Security</h4>
						<h4 className="text-sm font-medium">
							<CheckCircle className="text-green-600" />
						</h4>
						<h4 className="text-sm font-medium">
							<CheckCircle className="text-green-600" />
						</h4>
						<h4 className="text-sm font-medium">
							<CheckCircle className="text-green-600" />
						</h4>
						<h4 className="text-sm font-medium">Custom Security</h4>
					</div>
					<div className="grid grid-cols-[1.64fr_1fr_1fr_1fr_1fr] gap-8 border-b py-4">
						<h4 className="text-sm font-medium">Role-Based Access Contol</h4>
						<h4 className="text-sm font-medium">-</h4>
						<h4 className="text-sm font-medium">Basic</h4>
						<h4 className="text-sm font-medium">Advanced</h4>
						<h4 className="text-sm font-medium">Custom</h4>
					</div>
					<div className="grid grid-cols-[1.64fr_1fr_1fr_1fr_1fr] gap-8 border-b py-4">
						<h4 className="text-sm font-medium">
							Compliance with industry Standards
						</h4>
						<h4 className="text-sm font-medium">
							<CheckCircle className="text-green-600" />
						</h4>
						<h4 className="text-sm font-medium">
							<CheckCircle className="text-green-600" />
						</h4>
						<h4 className="text-sm font-medium">
							<CheckCircle className="text-green-600" />
						</h4>
						<h4 className="text-sm font-medium">Custom Compliance</h4>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Pricing2
