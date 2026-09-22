"use client"

import { cn } from "@/lib/utils"
import { IconSlot } from "@/registry/icon/icon-library"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/registry/ui/card"
import { Input } from "@/registry/ui/input"
import { Progress } from "@/registry/ui/progress"

export default function AnalyticsDashboard() {
	return (
		<div className="bg-bg font-body min-h-screen w-full">
			{/* Navbar */}
			<header className="border-border bg-elevation-level1 flex h-16 items-center justify-between border-b px-6">
				<div className="flex items-center gap-6">
					<div className="flex items-center gap-2">
						<div className="bg-primary text-primary-fg flex size-8 items-center justify-center rounded-lg">
							<IconSlot slot="bar-chart" className="size-4" />
						</div>
						<span className="text-fg font-semibold">Pulse Analytics</span>
					</div>
					<nav className="hidden items-center gap-4 text-sm font-medium md:flex">
						<a href="#" className="text-fg transition-colors">
							Overview
						</a>
						<a
							href="#"
							className="text-fg-tertiary hover:text-fg transition-colors">
							Customers
						</a>
						<a
							href="#"
							className="text-fg-tertiary hover:text-fg transition-colors">
							Products
						</a>
						<a
							href="#"
							className="text-fg-tertiary hover:text-fg transition-colors">
							Settings
						</a>
					</nav>
				</div>
				<div className="flex items-center gap-4">
					<div className="relative hidden sm:block">
						<IconSlot
							slot="search"
							className="text-fg-tertiary absolute top-1/2 left-3 size-4 -translate-y-1/2"
						/>
						<Input placeholder="Search..." className="w-64 pl-9" />
					</div>
					<Button variant="ghost" size="40" className="w-10 px-0">
						<IconSlot slot="bell" className="text-fg size-5" />
					</Button>
					<div className="bg-elevation-level2 border-border flex size-8 items-center justify-center rounded-full border">
						<IconSlot slot="user" className="text-fg size-4" />
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="mx-auto max-w-6xl p-6">
				<div className="mb-8 flex items-center justify-between">
					<div>
						<h1 className="text-fg text-2xl font-bold tracking-tight">
							Dashboard
						</h1>
						<p className="text-fg-tertiary text-sm">
							Welcome back. Here&apos;s what&apos;s happening today.
						</p>
					</div>
					<div className="flex gap-3">
						<Button variant="outline">Download Report</Button>
						<Button className="bg-secondary hover:bg-secondary/90 border-none text-[var(--color-secondary-fg)] ring-0">
							<IconSlot slot="plus" className="mr-2 size-4" />
							New Campaign
						</Button>
					</div>
				</div>

				<div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
					{/* Primary Metric 1 */}
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Revenue
							</CardTitle>
							<IconSlot slot="info" className="text-primary size-4" />
						</CardHeader>
						<CardContent>
							<div className="text-fg text-2xl font-bold">$45,231.89</div>
							<p className="text-fg-tertiary text-xs">+20.1% from last month</p>
						</CardContent>
					</Card>

					{/* Primary Metric 2 */}
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Active Users
							</CardTitle>
							<IconSlot slot="users" className="text-primary size-4" />
						</CardHeader>
						<CardContent>
							<div className="text-fg text-2xl font-bold">+2350</div>
							<p className="text-fg-tertiary text-xs">
								+180.1% from last month
							</p>
						</CardContent>
					</Card>

					{/* Highlight Metric (Secondary) */}
					<Card className="bg-secondary border-none text-[var(--color-secondary-fg)]">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium opacity-90">
								Conversion Rate
							</CardTitle>
							<IconSlot slot="check" className="size-4 opacity-90" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">12.4%</div>
							<p className="text-xs opacity-80">+4.3% from last week</p>
						</CardContent>
					</Card>
				</div>

				<div className="grid grid-cols-1 gap-6 lg:grid-cols-7">
					{/* Activity Chart (Mocked) */}
					<Card className="lg:col-span-4">
						<CardHeader>
							<CardTitle>Activity Overview</CardTitle>
							<CardDescription>
								Comparing organic vs paid traffic sources.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex h-[250px] w-full items-end gap-2 pt-4">
								{/* Mock Bars */}
								{[40, 60, 30, 80, 50, 90, 70].map((val, i) => (
									<div
										key={i}
										className="flex h-full flex-1 flex-col items-center justify-end gap-1">
										<div className="flex h-full w-full items-end justify-center gap-1">
											{/* Primary Bar */}
											<div
												className="bg-primary w-1/2 rounded-sm transition-all"
												style={{ height: `${val}%` }}
											/>
											{/* Secondary Bar */}
											<div
												className="bg-secondary w-1/2 rounded-sm transition-all"
												style={{ height: `${val > 40 ? val - 20 : val + 10}%` }}
											/>
										</div>
										<span className="text-fg-tertiary mt-2 text-xs">
											{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
										</span>
									</div>
								))}
							</div>
							<div className="mt-6 flex items-center justify-center gap-6">
								<div className="flex items-center gap-2">
									<div className="bg-primary size-3 rounded-full" />
									<span className="text-fg-tertiary text-sm">
										Organic (Primary)
									</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="bg-secondary size-3 rounded-full" />
									<span className="text-fg-tertiary text-sm">
										Paid (Secondary)
									</span>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Recent Sales List */}
					<Card className="lg:col-span-3">
						<CardHeader>
							<CardTitle>Recent Sales</CardTitle>
							<CardDescription>You made 265 sales this month.</CardDescription>
						</CardHeader>
						<CardContent className="flex flex-col gap-6">
							{[
								{
									name: "Olivia Martin",
									email: "olivia.martin@email.com",
									amount: "+$1,999.00",
									status: "Completed",
								},
								{
									name: "Jackson Lee",
									email: "jackson.lee@email.com",
									amount: "+$39.00",
									status: "Processing",
								},
								{
									name: "Isabella Nguyen",
									email: "isabella.nguyen@email.com",
									amount: "+$299.00",
									status: "Completed",
								},
								{
									name: "William Kim",
									email: "will@email.com",
									amount: "+$99.00",
									status: "Completed",
								},
							].map((sale, i) => (
								<div key={i} className="flex items-center justify-between">
									<div className="flex items-center gap-4">
										<div className="bg-elevation-level2 border-border flex size-10 items-center justify-center rounded-full border">
											<span className="text-fg font-medium">
												{sale.name.substring(0, 2).toUpperCase()}
											</span>
										</div>
										<div>
											<p className="text-fg text-sm leading-none font-medium">
												{sale.name}
											</p>
											<p className="text-fg-tertiary mt-1 text-sm">
												{sale.email}
											</p>
										</div>
									</div>
									<div className="flex flex-col items-end gap-1">
										<div className="text-fg font-medium">{sale.amount}</div>
										{sale.status === "Processing" ? (
											<Badge className="bg-secondary/20 text-secondary hover:bg-secondary/30 border-none px-2 py-0">
												{sale.status}
											</Badge>
										) : (
											<Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none px-2 py-0">
												{sale.status}
											</Badge>
										)}
									</div>
								</div>
							))}
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	)
}
