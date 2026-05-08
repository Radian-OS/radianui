"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { IconSlot } from "@/registry/icon-library"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Calendar } from "@/registry/ui/calendar"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/registry/ui/card"
import { Checkbox } from "@/registry/ui/checkbox"
import { Divider } from "@/registry/ui/divider"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Progress } from "@/registry/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group"
import { ScrollArea } from "@/registry/ui/scroll-area"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/ui/select"
import { Slider, SliderThumb } from "@/registry/ui/slider"
import { Switch } from "@/registry/ui/switch"
import { TextArea } from "@/registry/ui/text-area"

// ──────────────────────────────────────────────
// Contribution History (no chart — just summary)
// ──────────────────────────────────────────────
function ContributionHistoryCard() {
	const months = [
		{ label: "Dec", value: 60 },
		{ label: "Jan", value: 80 },
		{ label: "Feb", value: 55 },
		{ label: "Mar", value: 90 },
		{ label: "Apr", value: 45 },
		{ label: "May", value: 100 },
	]

	return (
		<Card className="flex flex-col gap-4">
			<CardHeader className="pb-0">
				<CardTitle className="text-base font-semibold">
					Contribution History
				</CardTitle>
				<CardDescription>Last 6 months of activity</CardDescription>
			</CardHeader>

			<CardContent className="flex h-28 items-end gap-2">
				{months.map((m) => (
					<div
						key={m.label}
						className="flex flex-1 flex-col items-center gap-1">
						<div
							className="bg-foreground/80 w-full rounded-sm"
							style={{ height: `${m.value}%` }}
						/>
						<span className="text-muted-foreground text-[10px]">{m.label}</span>
					</div>
				))}
			</CardContent>

			<Divider />

			<CardContent className="grid grid-cols-2 gap-4 pt-0">
				<div>
					<p className="text-muted-foreground mb-0.5 text-[10px] uppercase tracking-widest">
						Upcoming
					</p>
					<p className="text-sm font-bold">May 25, 2024</p>
					<p className="text-muted-foreground text-xs">$1,000 scheduled</p>
				</div>
				<div>
					<p className="text-muted-foreground mb-0.5 text-[10px] uppercase tracking-widest">
						Auto-Save Plan
					</p>
					<p className="text-sm font-bold">Accelerated</p>
					<p className="text-muted-foreground text-xs">Recurring weekly</p>
				</div>
			</CardContent>

			<CardFooter>
				<Button className="w-full" variant="glossy" size="32">
					View Full Report
				</Button>
			</CardFooter>
		</Card>
	)
}

// ──────────────────────────────────────────────
// Payout Threshold
// ──────────────────────────────────────────────
function PayoutThresholdCard() {
	const [amount, setAmount] = useState([2500])

	return (
		<Card className="relative">
			<button className="text-muted-foreground hover:text-foreground absolute right-4 top-4 transition-colors">
				<IconSlot slot="cross" className="h-4 w-4" />
			</button>

			<CardHeader className="pr-10">
				<CardTitle className="text-base font-semibold">
					Payout Threshold
				</CardTitle>
				<CardDescription>
					Set the minimum balance required before a payout is triggered.
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-5">
				<div className="space-y-1.5">
					<Label htmlFor="currency">Preferred Currency</Label>
					<Select defaultValue="usd">
						<SelectTrigger id="currency">
							<SelectValue placeholder="Select currency" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="usd">USD — United States Dollar</SelectItem>
							<SelectItem value="eur">EUR — Euro</SelectItem>
							<SelectItem value="gbp">GBP — British Pound</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<Label>Minimum Payout Amount</Label>
						<span className="text-2xl font-bold tracking-tight">
							${amount[0].toLocaleString()}.00
						</span>
					</div>
					<Slider
						min={50}
						max={10000}
						step={50}
						value={amount}
						onValueChange={setAmount}
					/>
					<div className="text-muted-foreground flex justify-between text-xs">
						<span>$50 (MIN)</span>
						<span>$10,000 (MAX)</span>
					</div>
				</div>

				<div className="space-y-1.5">
					<Label htmlFor="notes">Notes</Label>
					<TextArea
						id="notes"
						placeholder="Add any notes for this payout configuration..."
						rows={3}
					/>
				</div>
			</CardContent>

			<CardFooter>
				<Button className="w-full">Save Threshold</Button>
			</CardFooter>
		</Card>
	)
}

// ──────────────────────────────────────────────
// Savings Targets
// ──────────────────────────────────────────────
function SavingsTargetsCard() {
	const targets = [
		{
			label: "Retirement",
			goal: 420000,
			achieved: 273000,
			pct: 65,
		},
		{
			label: "Real Estate",
			goal: 85000,
			achieved: 27200,
			pct: 32,
		},
	]

	return (
		<Card>
			<CardHeader className="flex flex-row items-start justify-between">
				<div>
					<CardTitle className="text-base font-semibold">
						Savings Targets
					</CardTitle>
					<CardDescription>Active milestones for 2024</CardDescription>
				</div>
				<Button size="32" variant="outline">
					New Goal
				</Button>
			</CardHeader>

			<CardContent className="space-y-6">
				{targets.map((t) => (
					<div key={t.label} className="space-y-2">
						<p className="text-muted-foreground text-[10px] font-medium uppercase tracking-widest">
							{t.label}
						</p>
						<p className="text-3xl font-bold tracking-tight">
							${t.goal.toLocaleString()}
						</p>
						<Progress value={t.pct} className="h-1.5" />
						<div className="text-muted-foreground flex justify-between text-xs">
							<span>{t.pct}% achieved</span>
							<span>${t.achieved.toLocaleString()}</span>
						</div>
					</div>
				))}

				<p className="text-muted-foreground border-t pt-4 text-xs">
					You have not met your targets for this year.
				</p>
			</CardContent>
		</Card>
	)
}

// ──────────────────────────────────────────────
// Buy Investment
// ──────────────────────────────────────────────
function BuyInvestmentCard() {
	const [amount, setAmount] = useState("1,000.00")

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base font-semibold">
					Buy Investment
				</CardTitle>
			</CardHeader>

			<CardContent className="space-y-4">
				<div className="space-y-1.5">
					<Label htmlFor="invest-amount">Amount to Invest</Label>
					<div className="relative">
						<span className="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 text-sm">
							$
						</span>
						<Input
							id="invest-amount"
							className="pl-7"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
						/>
					</div>
				</div>

				<div className="space-y-1.5">
					<Label>Order Type</Label>
					<Card className="px-2 py-2">
						<CardContent className="space-y-2 px-1">
							<p className="text-sm font-medium">Market Order</p>
							<p className="text-muted-foreground mt-0.5 text-xs">
								Market orders execute at the current price.
							</p>
						</CardContent>
					</Card>
				</div>

				<div className="grid grid-cols-2 gap-3 text-sm">
					<div>
						<p className="text-muted-foreground mb-0.5 text-xs">
							Estimated Shares
						</p>
						<p className="font-semibold">—</p>
					</div>
					<div>
						<p className="text-muted-foreground mb-0.5 text-xs">Buying Power</p>
						<p className="font-semibold">—</p>
					</div>
				</div>
			</CardContent>

			<CardFooter className="flex-col gap-2">
				<Button className="w-full">Review Order</Button>
				<p className="text-muted-foreground text-center text-[10px]">
					Trades are typically executed within market hours.
				</p>
			</CardFooter>
		</Card>
	)
}

// ──────────────────────────────────────────────
// Distribute Track
// ──────────────────────────────────────────────
function DistributeTrackCard() {
	return (
		<Card className="flex flex-col items-center text-center">
			<CardContent className="flex flex-col items-center gap-3 pb-4 pt-8">
				<div className="border-muted-foreground/40 flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed">
					<IconSlot slot="plus" className="text-muted-foreground h-5 w-5" />
				</div>
				<div>
					<p className="text-sm font-semibold">Distribute Track</p>
					<p className="text-muted-foreground mt-1 text-xs">
						Upload your first master to start reaching listeners on Spotify,
						Apple Music, and more.
					</p>
				</div>
			</CardContent>
			<CardFooter>
				<Button size="32">Create Release</Button>
			</CardFooter>
		</Card>
	)
}

// ──────────────────────────────────────────────
// Claimable Balance
// ──────────────────────────────────────────────
function ClaimableBalanceCard() {
	return (
		<Card>
			<CardHeader className="pb-2">
				<CardDescription>Claimable Balance</CardDescription>
				<div className="mt-1 flex items-center gap-3">
					<p className="text-4xl font-bold tracking-tight">$0.00</p>
					<Badge
						variant="outline"
						className="gap-1.5 border-yellow-400 bg-yellow-50 text-yellow-600">
						<span className="inline-block h-1.5 w-1.5 rounded-full bg-yellow-400" />
						Pending Setup
					</Badge>
				</div>
			</CardHeader>

			<CardContent className="space-y-2">
				<Divider />
				{[
					{ label: "Net Royalties", value: "$0.00", positive: false },
					{ label: "Processing Fee", value: "-$0.00", positive: false },
				].map((row) => (
					<div key={row.label} className="flex justify-between text-sm">
						<span className="text-muted-foreground">{row.label}</span>
						<span>{row.value}</span>
					</div>
				))}
				<Divider />
				<div className="flex justify-between text-sm font-semibold">
					<span>Total Ready to Claim</span>
					<span>$0.00 USD</span>
				</div>
				<p className="text-muted-foreground pt-2 text-xs">
					Once your bank is connected, balances over $10.00 are automatically
					eligible for monthly payouts.
				</p>
			</CardContent>
		</Card>
	)
}

// ──────────────────────────────────────────────
// Recent Transactions
// ──────────────────────────────────────────────
const transactions = [
	{
		icon: "coffee",
		name: "Blue Bottle Coffee",
		category: "Food & Drink",
		date: "Today, 10:24 AM",
		amount: "-$6.50",
		positive: false,
	},
	{
		icon: "cart",
		name: "Whole Foods Market",
		category: "Groceries",
		date: "Yesterday",
		amount: "-$142.30",
		positive: false,
	},
	{
		icon: "card",
		name: "Stripe Payout",
		category: "Income",
		date: "Oct 12",
		amount: "+$4,200.00",
		positive: true,
	},
	{
		icon: "car",
		name: "Uber Technologies",
		category: "Transport",
		date: "Oct 11",
		amount: "-$24.00",
		positive: false,
	},
	{
		icon: "coffee",
		name: "Netflix Subscription",
		category: "Entertainment",
		date: "Oct 10",
		amount: "-$15.49",
		positive: false,
	},
]

function RecentTransactionsCard() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base font-semibold">
					Recent Transactions
				</CardTitle>
				<CardDescription>Your latest account activity.</CardDescription>
			</CardHeader>

			<CardContent className="p-0">
				<ScrollArea className="h-72">
					<div className="divide-y">
						{transactions.map((tx) => (
							<div key={tx.name} className="flex items-center gap-3 px-6 py-3">
								<div className="bg-muted flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
									<IconSlot
										slot={tx.icon as any}
										className="text-muted-foreground h-4 w-4"
									/>
								</div>
								<div className="min-w-0 flex-1">
									<p className="truncate text-sm font-medium">{tx.name}</p>
									<p className="text-muted-foreground text-xs">{tx.category}</p>
								</div>
								<div className="shrink-0 text-right">
									<p
										className={`text-sm font-semibold ${tx.positive ? "text-emerald-600" : ""}`}>
										{tx.amount}
									</p>
									<p className="text-muted-foreground text-[10px]">{tx.date}</p>
								</div>
							</div>
						))}
					</div>
				</ScrollArea>
			</CardContent>
		</Card>
	)
}

// ──────────────────────────────────────────────
// Risk Allocation
// ──────────────────────────────────────────────
function RiskAllocationCard() {
	const [risk, setRisk] = useState([40])

	const level =
		risk[0] <= 25
			? {
					label: "Conservative",
					color: "text-blue-600",
					bg: "bg-blue-50 border-blue-200",
				}
			: risk[0] <= 50
				? {
						label: "Moderate",
						color: "text-emerald-600",
						bg: "bg-emerald-50 border-emerald-200",
					}
				: risk[0] <= 75
					? {
							label: "Aggressive",
							color: "text-orange-600",
							bg: "bg-orange-50 border-orange-200",
						}
					: {
							label: "Very Aggressive",
							color: "text-red-600",
							bg: "bg-red-50 border-red-200",
						}

	const stocks = risk[0]
	const bonds = Math.round((100 - risk[0]) * 0.6)
	const cash = 100 - stocks - bonds

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base font-semibold">
					Risk Allocation
				</CardTitle>
				<CardDescription>Adjust your portfolio risk tolerance.</CardDescription>
			</CardHeader>

			<CardContent className="space-y-5">
				<div className="flex items-center justify-between">
					<span className="text-muted-foreground text-sm">Risk Level</span>
					<Badge
						variant="outline"
						className={`${level.bg} ${level.color} border font-medium`}>
						{level.label}
					</Badge>
				</div>

				<div className="space-y-3">
					<Slider
						min={0}
						max={100}
						step={1}
						value={risk}
						onValueChange={setRisk}>
						<SliderThumb />
					</Slider>
					<div className="text-muted-foreground flex justify-between text-xs">
						<span>Low Risk</span>
						<span className="text-foreground font-semibold">{risk[0]}%</span>
						<span>High Risk</span>
					</div>
				</div>

				<Divider />

				<div className="space-y-2.5">
					<p className="text-muted-foreground text-xs font-medium uppercase tracking-widest">
						Suggested Allocation
					</p>
					{[
						{ label: "Stocks / Equities", value: stocks, barColor: "bg-fg" },
						{
							label: "Bonds / Fixed Income",
							value: bonds,
							barColor: "bg-fg/40",
						},
						{ label: "Cash / Equivalents", value: cash, barColor: "bg-fg/15" },
					].map((item) => (
						<div key={item.label} className="space-y-1">
							<div className="flex justify-between text-xs">
								<span className="text-muted-foreground">{item.label}</span>
								<span className="font-semibold">{item.value}%</span>
							</div>
							<div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
								<div
									className={`h-full rounded-full ${item.barColor} transition-all duration-300`}
									style={{ width: `${item.value}%` }}
								/>
							</div>
						</div>
					))}
				</div>
			</CardContent>

			<CardFooter>
				<Button className="w-full" variant="glossy" size="32">
					Apply Allocation
				</Button>
			</CardFooter>
		</Card>
	)
}

type AlertKey = "payouts" | "savings" | "investments" | "security" | "marketing"
type AlertState = Record<AlertKey, boolean>
type Frequency = "instant" | "daily" | "weekly"
type NotificationItem = { key: AlertKey; label: string; desc: string }
type FrequencyOption = { value: Frequency; label: string; desc: string }

// ──────────────────────────────────────────────
// Notification Preferences
// ──────────────────────────────────────────────
function NotificationPreferencesCard() {
	const [alerts, setAlerts] = useState<AlertState>({
		payouts: true,
		savings: true,
		investments: false,
		security: true,
		marketing: false,
	})

	const [frequency, setFrequency] = useState<Frequency>("daily")

	const toggleAlert = (key: keyof typeof alerts) =>
		setAlerts((prev) => ({ ...prev, [key]: !prev[key] }))

	const notificationItems: NotificationItem[] = [
		{
			key: "payouts",
			label: "Payout Confirmations",
			desc: "When a payout is processed to your bank",
		},
		{
			key: "savings",
			label: "Savings Milestones",
			desc: "When you hit a savings target",
		},
		{
			key: "investments",
			label: "Investment Activity",
			desc: "Order fills, price alerts, dividends",
		},
		{
			key: "security",
			label: "Security Alerts",
			desc: "Login attempts and account changes",
		},
		{
			key: "marketing",
			label: "Tips & Promotions",
			desc: "Product updates and offers",
		},
	]

	const frequencies: FrequencyOption[] = [
		{ value: "instant", label: "Instant", desc: "As events happen" },
		{ value: "daily", label: "Daily", desc: "One digest per day" },
		{ value: "weekly", label: "Weekly", desc: "One digest per week" },
	]

	return (
		<Card className="col-span-1 sm:col-span-2">
			<CardHeader>
				<CardTitle className="text-base font-semibold">
					Notification Preferences
				</CardTitle>
				<CardDescription>
					Choose what you hear about and how often.
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-6">
				{/* Checkboxes */}
				<div className="space-y-1.5">
					<p className="text-muted-foreground mb-3 text-xs font-medium uppercase tracking-widest">
						Alert Types
					</p>
					<Card className="gap-0 divide-y overflow-hidden py-1">
						{notificationItems.map((item) => (
							<label
								key={item.key}
								htmlFor={`chk-${item.key}`}
								className="hover:bg-muted/40 flex cursor-pointer items-start gap-3 px-4 py-3 transition-colors">
								<Checkbox
									id={`chk-${item.key}`}
									checked={alerts[item.key]}
									onCheckedChange={() => toggleAlert(item.key)}
									className="mt-0.5 shrink-0"
								/>
								<div className="min-w-0">
									<p className="select-none text-sm font-medium leading-tight">
										{item.label}
									</p>
									<p className="text-muted-foreground mt-0.5 select-none text-xs">
										{item.desc}
									</p>
								</div>
								{alerts[item.key] && (
									<Badge
										variant="soft"
										className="ml-auto shrink-0 text-[10px]">
										On
									</Badge>
								)}
							</label>
						))}
					</Card>
				</div>

				<Divider />

				{/* Radio Group */}
				<div className="space-y-3">
					<p className="text-muted-foreground text-xs font-medium uppercase tracking-widest">
						Delivery Frequency
					</p>
					<RadioGroup
						value={frequency}
						onValueChange={(value) => setFrequency(value as Frequency)}
						className="grid grid-cols-3 gap-3">
						{frequencies.map((f) => (
							<Card
								key={f.value}
								className={cn(
									"p-0",
									frequency === f.value
										? "border-primary bg-primary/5"
										: "border-border hover:bg-muted/40"
								)}>
								<Label
									htmlFor={`freq-${f.value}`}
									className={`flex cursor-pointer flex-col gap-1 px-4 py-3 transition-colors`}>
									<div className="flex items-center gap-2">
										<RadioGroupItem id={`freq-${f.value}`} value={f.value} />
										<span className="select-none text-sm font-medium">
											{f.label}
										</span>
									</div>
									<p className="text-muted-foreground select-none pl-6 text-xs">
										{f.desc}
									</p>
								</Label>
							</Card>
						))}
					</RadioGroup>
				</div>
			</CardContent>

			<CardFooter className="justify-end gap-2">
				<Button variant="smooth" size="32">
					Reset to Defaults
				</Button>
				<Button variant="smooth" size="32">
					Save Preferences
				</Button>
			</CardFooter>
		</Card>
	)
}

// ──────────────────────────────────────────────
// Privacy & Security Settings
// ──────────────────────────────────────────────
type SwitchSetting = {
	key: string
	label: string
	desc: string
	category: string
}
type SettingsState = Record<string, boolean>

function PrivacySettingsCard() {
	const settings: SwitchSetting[] = [
		{
			key: "2fa",
			category: "Security",
			label: "Two-Factor Authentication",
			desc: "Require a code in addition to your password",
		},
		{
			key: "biometric",
			category: "Security",
			label: "Biometric Login",
			desc: "Use Face ID or fingerprint to sign in",
		},
		{
			key: "sessionAlert",
			category: "Security",
			label: "New Session Alerts",
			desc: "Notify me when a new device logs in",
		},
		{
			key: "publicProfile",
			category: "Privacy",
			label: "Public Profile",
			desc: "Let others find your account by name",
		},
		{
			key: "analytics",
			category: "Privacy",
			label: "Usage Analytics",
			desc: "Share anonymised usage data to improve the app",
		},
		{
			key: "adPersonal",
			category: "Privacy",
			label: "Personalised Ads",
			desc: "Allow ads tailored to your activity",
		},
	]

	const [values, setValues] = useState<SettingsState>({
		"2fa": true,
		biometric: false,
		sessionAlert: true,
		publicProfile: false,
		analytics: true,
		adPersonal: false,
	})

	const toggle = (key: string) =>
		setValues((prev) => ({ ...prev, [key]: !prev[key] }))

	const grouped = settings.reduce<Record<string, SwitchSetting[]>>((acc, s) => {
		;(acc[s.category] ??= []).push(s)
		return acc
	}, {})

	const activeCount = Object.values(values).filter(Boolean).length

	return (
		<Card>
			<CardHeader className="flex flex-row items-start justify-between gap-4">
				<div>
					<CardTitle className="text-base font-semibold">
						Privacy & Security
					</CardTitle>
					<CardDescription>
						Manage access controls and data sharing.
					</CardDescription>
				</div>
				<Badge variant="outline" className="mt-0.5 shrink-0">
					{activeCount} / {settings.length} on
				</Badge>
			</CardHeader>

			<CardContent className="space-y-6">
				{Object.entries(grouped).map(([category, items]) => (
					<div key={category} className="space-y-1">
						<p className="text-muted-foreground mb-3 text-[10px] font-medium uppercase tracking-widest">
							{category}
						</p>
						<div className="divide-y overflow-hidden rounded-md border">
							{items.map((item) => (
								<div
									key={item.key}
									className="hover:bg-muted/40 flex items-center justify-between gap-4 px-4 py-3 transition-colors">
									<div className="min-w-0">
										<p className="text-sm font-medium leading-tight">
											{item.label}
										</p>
										<p className="text-muted-foreground mt-0.5 text-xs">
											{item.desc}
										</p>
									</div>
									<Switch
										id={`sw-${item.key}`}
										checked={values[item.key]}
										onCheckedChange={() => toggle(item.key)}
										className="shrink-0"
									/>
								</div>
							))}
						</div>
					</div>
				))}
			</CardContent>

			<CardFooter className="justify-end gap-2">
				<Button
					variant="outline"
					size="32"
					onClick={() =>
						setValues(Object.fromEntries(settings.map((s) => [s.key, false])))
					}>
					Disable All
				</Button>
				<Button size="32">Save Settings</Button>
			</CardFooter>
		</Card>
	)
}

// ──────────────────────────────────────────────
// Schedule Card (shadcn Calendar)
// ──────────────────────────────────────────────
function ScheduleCard() {
	const [date] = useState<Date | undefined>(new Date())

	const events: Record<string, { name: string; color: string }[]> = {
		[new Date().toDateString()]: [
			{ name: "Payout Scheduled", color: "bg-violet-500" },
		],
		[new Date(new Date().setDate(new Date().getDate() + 3)).toDateString()]: [
			{ name: "Savings Review", color: "bg-emerald-500" },
		],
		[new Date(new Date().setDate(new Date().getDate() + 7)).toDateString()]: [
			{ name: "Portfolio Rebalance", color: "bg-amber-500" },
		],
	}

	const selectedEvents = date ? (events[date.toDateString()] ?? []) : []

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base font-semibold">Schedule</CardTitle>
				<CardDescription>Upcoming financial events</CardDescription>
			</CardHeader>

			<CardContent className="flex flex-col items-center gap-4 p-0 pb-4">
				<Calendar
					mode="range"
					modifiers={{
						hasEvent: Object.keys(events).map((d) => new Date(d)),
					}}
				/>

				<div className="w-full space-y-1 px-6">
					<p className="text-muted-foreground mb-2 text-[10px] font-medium uppercase tracking-widest">
						{date
							? date.toLocaleDateString("default", {
									weekday: "long",
									month: "long",
									day: "numeric",
								})
							: "Select a date"}
					</p>
					{selectedEvents.length > 0 ? (
						selectedEvents.map((ev) => (
							<div key={ev.name} className="flex items-center gap-2.5 py-1.5">
								<span className={`h-2 w-2 shrink-0 rounded-full ${ev.color}`} />
								<p className="text-sm font-medium">{ev.name}</p>
							</div>
						))
					) : (
						<p className="text-muted-foreground text-sm">
							No events scheduled.
						</p>
					)}
				</div>
			</CardContent>

			<CardFooter>
				<Button className="w-full" size="32" variant="outline">
					Add Event
				</Button>
			</CardFooter>
		</Card>
	)
}

// ──────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────
export default function DashboardPage() {
	return (
		<div className="bg-muted/30 min-h-screen p-6">
			<div className="mx-auto max-w-6xl space-y-6">
				<h1 className="text-2xl font-bold tracking-tight">
					Financial Dashboard
				</h1>

				{/* Row 1 */}
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<BuyInvestmentCard />
					<PayoutThresholdCard />
					<SavingsTargetsCard />
				</div>

				{/* Row 2 */}
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<DistributeTrackCard />
					<ClaimableBalanceCard />
					<RecentTransactionsCard />
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<NotificationPreferencesCard />
					<RiskAllocationCard />
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<ContributionHistoryCard />
					<ScheduleCard />
					<PrivacySettingsCard />
				</div>
			</div>
		</div>
	)
}
