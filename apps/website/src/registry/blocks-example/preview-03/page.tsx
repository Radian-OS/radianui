"use client"

import { useState } from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import { Badge, BadgeDot } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
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
import {
	Dropdown,
	DropdownCheckboxItem,
	DropdownContent,
	DropdownDivider,
	DropdownItem,
	DropdownLabel,
	DropdownPortal,
	DropdownRadioGroup,
	DropdownRadioItem,
	DropdownShortcut,
	DropdownSub,
	DropdownSubContent,
	DropdownSubTrigger,
	DropdownTrigger,
} from "@/registry/ui/dropdown-menu"
import { Input, InputWrapper } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Progress } from "@/registry/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group"
import { ScrollArea } from "@/registry/ui/scroll-area"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/registry/ui/select"
import { Slider, SliderThumb } from "@/registry/ui/slider"
import { Switch } from "@/registry/ui/switch"
import { TextArea } from "@/registry/ui/text-area"

// ──────────────────────────────────────────────
// Input Showcase
// ──────────────────────────────────────────────
export function InputShowcaseCard() {
	const [showPassword, setShowPassword] = useState(false)
	const [search, setSearch] = useState("")

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base font-semibold">Input</CardTitle>
				<CardDescription>Text input variants and states.</CardDescription>
			</CardHeader>

			<CardContent className="space-y-4">
				{/* Default */}
				<div className="space-y-1.5">
					<Label htmlFor="input-default">Default</Label>
					<Input id="input-default" placeholder="Enter value..." />
				</div>

				{/* With icon prefix */}
				<div className="space-y-1.5">
					<Label htmlFor="input-search">With icon</Label>
					<InputWrapper>
						<IconSlot slot="search" className="text-fg-tertiary h-4 w-4" />
						<Input
							id="input-search"
							placeholder="Search..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</InputWrapper>
				</div>

				{/* Password toggle */}
				<div className="w-full space-y-1.5">
					<Label htmlFor="input-password">Password</Label>
					<InputWrapper className="w-full">
						<IconSlot slot="lock" className="text-fg-tertiary h-4 w-4" />
						<Input
							id="input-password"
							type={showPassword ? "text" : "password"}
							placeholder="••••••••"
						/>
						<button
							type="button"
							onClick={() => setShowPassword((v) => !v)}
							className="text-fg-tertiary hover:text-fg transition-colors">
							{showPassword ? (
								<IconSlot slot="eyeoff" className="h-4 w-4" />
							) : (
								<IconSlot slot="eye" className="h-4 w-4" />
							)}
						</button>
					</InputWrapper>
				</div>

				{/* Error state */}
				<div className="w-full space-y-1.5">
					<Label htmlFor="input-email">Email</Label>
					<InputWrapper className="w-full">
						<IconSlot slot="mail" className="text-fg-tertiary h-4 w-4" />
						<Input
							type="email"
							placeholder="info@radianos.com"
							id="input-email"
						/>
					</InputWrapper>
				</div>

				{/* Disabled */}
				<div className="space-y-1.5">
					<Label htmlFor="input-disabled" className="text-fg-tertiary">
						Disabled
					</Label>
					<Input id="input-disabled" placeholder="Not editable" disabled />
				</div>
			</CardContent>
		</Card>
	)
}

// ──────────────────────────────────────────────
// Badge Showcase
// ──────────────────────────────────────────────
export function BadgeShowcaseCard() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base font-semibold">Badge</CardTitle>
				<CardDescription>All variants and semantic colors.</CardDescription>
			</CardHeader>

			<CardContent className="space-y-5">
				{/* Variants */}
				<div className="space-y-2">
					<p className="text-fg-tertiary text-[10px] font-medium uppercase tracking-widest">
						Variants
					</p>
					<div className="flex flex-wrap gap-2">
						<Badge variant="outline">Outline</Badge>
						<Badge variant="soft">Soft</Badge>
						<Badge variant="strong">Strong</Badge>
					</div>
				</div>

				<Divider />

				{/* Semantic colors */}
				<div className="space-y-2">
					<p className="text-fg-tertiary text-[10px] font-medium uppercase tracking-widest">
						Semantic
					</p>
					<div className="flex flex-wrap gap-2">
						<Badge variant="outline" color="success">
							<BadgeDot />
							Active
						</Badge>
						<Badge variant="outline" color="warning">
							<BadgeDot />
							Pending
						</Badge>
						<Badge variant="outline" color="error">
							<BadgeDot />
							Failed
						</Badge>
						<Badge variant="outline" color="info">
							<BadgeDot />
							Info
						</Badge>
						<Badge variant="outline" color="neutral">
							<BadgeDot />
							Archived
						</Badge>
					</div>
				</div>

				<Divider />

				{/* Sizes */}
				<div className="space-y-2">
					<p className="text-fg-tertiary text-[10px] font-medium uppercase tracking-widest">
						In context
					</p>
					<div className="flex items-center gap-3">
						<p className="text-sm font-medium">Invoice #1042</p>
						<Badge variant="soft" size="20">
							Paid
						</Badge>
					</div>
					<div className="flex items-center gap-3">
						<p className="text-sm font-medium">Deploy v2.4.1</p>
						<Badge variant="outline" color="warning" size="20">
							In Progress
						</Badge>
					</div>
					<div className="flex items-center gap-3">
						<p className="text-sm font-medium">Plan: Pro</p>
						<Badge size="20">Upgraded</Badge>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

// ──────────────────────────────────────────────
// Select Showcase
// ──────────────────────────────────────────────
export function SelectShowcaseCard() {
	const [timezone, setTimezone] = useState("")
	const [role, setRole] = useState("")

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base font-semibold">Select</CardTitle>
				<CardDescription>Dropdown selection variants.</CardDescription>
			</CardHeader>

			<CardContent className="space-y-4">
				{/* Basic */}
				<div className="space-y-1.5">
					<Label htmlFor="sel-country">Country</Label>
					<Select>
						<SelectTrigger id="sel-country">
							<SelectValue placeholder="Select a country" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="us">🇺🇸 United States</SelectItem>
							<SelectItem value="gb">🇬🇧 United Kingdom</SelectItem>
							<SelectItem value="de">🇩🇪 Germany</SelectItem>
							<SelectItem value="jp">🇯🇵 Japan</SelectItem>
							<SelectItem value="np">🇳🇵 Nepal</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Grouped */}
				<div className="space-y-1.5">
					<Label htmlFor="sel-tz">Timezone</Label>
					<Select value={timezone} onValueChange={setTimezone}>
						<SelectTrigger id="sel-tz">
							<SelectValue placeholder="Pick a timezone" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Americas</SelectLabel>
								<SelectItem value="est">Eastern Time (ET)</SelectItem>
								<SelectItem value="cst">Central Time (CT)</SelectItem>
								<SelectItem value="pst">Pacific Time (PT)</SelectItem>
							</SelectGroup>
							<SelectGroup>
								<SelectLabel>Europe</SelectLabel>
								<SelectItem value="gmt">GMT / UTC</SelectItem>
								<SelectItem value="cet">Central European (CET)</SelectItem>
							</SelectGroup>
							<SelectGroup>
								<SelectLabel>Asia</SelectLabel>
								<SelectItem value="ist">India Standard (IST)</SelectItem>
								<SelectItem value="jst">Japan Standard (JST)</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					{timezone && (
						<p className="text-fg-tertiary text-xs">
							Selected: {timezone.toUpperCase()}
						</p>
					)}
				</div>

				{/* With role */}
				<div className="space-y-1.5">
					<Label htmlFor="sel-role">User Role</Label>
					<Select value={role} onValueChange={setRole}>
						<SelectTrigger id="sel-role">
							<SelectValue placeholder="Assign a role" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="owner">Owner</SelectItem>
							<SelectItem value="admin">Admin</SelectItem>
							<SelectItem value="editor">Editor</SelectItem>
							<SelectItem value="viewer">Viewer — read only</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Disabled */}
				<div className="space-y-1.5">
					<Label className="text-fg-tertiary">Disabled</Label>
					<Select disabled>
						<SelectTrigger>
							<SelectValue placeholder="Not available" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="x">Option</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</CardContent>
		</Card>
	)
}

// ──────────────────────────────────────────────
// TextArea Showcase
// ──────────────────────────────────────────────
export function TextAreaShowcaseCard() {
	const [bio, setBio] = useState("")
	const MAX = 160

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base font-semibold">TextArea</CardTitle>
				<CardDescription>Multi-line text input variants.</CardDescription>
			</CardHeader>

			<CardContent className="space-y-4">
				{/* Default */}
				<div className="space-y-1.5">
					<Label htmlFor="ta-default">Notes</Label>
					<TextArea
						id="ta-default"
						placeholder="Write your notes here..."
						rows={3}
					/>
				</div>

				{/* Character count */}
				<div className="space-y-1.5">
					<Label htmlFor="ta-bio">Bio</Label>
					<TextArea
						id="ta-bio"
						placeholder="Tell us about yourself..."
						rows={3}
						maxLength={MAX}
						value={bio}
						onChange={(e) => setBio(e.target.value)}
					/>
					<div className="flex justify-end">
						<span
							className={`text-xs tabular-nums ${
								bio.length > MAX * 0.9
									? bio.length >= MAX
										? "text-error"
										: "text-warning"
									: "text-fg-tertiary"
							}`}>
							{bio.length} / {MAX}
						</span>
					</div>
				</div>

				{/* Error */}
				<div className="space-y-1.5">
					<Label htmlFor="ta-error" className="text-destructive">
						Feedback <span className="font-normal">(required)</span>
					</Label>
					<TextArea
						id="ta-error"
						placeholder="Share your feedback..."
						rows={2}
					/>
					<p className="flex items-center gap-1.5 text-xs">
						<IconSlot slot="alert" className="h-3 w-3" />
						This field is required.
					</p>
				</div>

				{/* Disabled */}
				<div className="space-y-1.5">
					<Label className="text-fg-tertiary">Disabled</Label>
					<TextArea
						disabled
						rows={2}
						defaultValue="This content cannot be edited."
					/>
				</div>
			</CardContent>
		</Card>
	)
}

// ──────────────────────────────────────────────
// Checkbox Showcase
// ──────────────────────────────────────────────
export function CheckboxShowcaseCard() {
	const [agreed, setAgreed] = useState(false)
	const [features, setFeatures] = useState({
		darkMode: true,
		notifications: false,
		analytics: true,
		beta: false,
	})

	const allChecked = Object.values(features).every(Boolean)
	const noneChecked = Object.values(features).every((v) => !v)
	const isIndeterminate = !allChecked && !noneChecked

	const toggleAll = () => {
		const next = !allChecked
		setFeatures(
			Object.fromEntries(
				Object.keys(features).map((k) => [k, next])
			) as typeof features
		)
	}

	const featureLabels: Record<keyof typeof features, string> = {
		darkMode: "Dark mode",
		notifications: "Push notifications",
		analytics: "Usage analytics",
		beta: "Beta features",
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base font-semibold">Checkbox</CardTitle>
				<CardDescription>Selection states and group patterns.</CardDescription>
			</CardHeader>

			<CardContent className="space-y-5">
				{/* Select all with indeterminate */}
				<div className="space-y-2">
					<p className="text-fg-tertiary text-[10px] font-medium uppercase tracking-widest">
						Group with select-all
					</p>
					<div className="divide-y overflow-hidden rounded-md border">
						<label className="hover:bg-fill1/40 flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors">
							<Checkbox
								checked={
									allChecked ? true : isIndeterminate ? "indeterminate" : false
								}
								onCheckedChange={toggleAll}
							/>
							<span className="select-none text-sm font-medium">
								Select all features
							</span>
						</label>
						{(Object.keys(features) as (keyof typeof features)[]).map((key) => (
							<label
								key={key}
								className="hover:bg-fill1/40 flex cursor-pointer items-center gap-3 px-4 py-3 pl-7 transition-colors">
								<Checkbox
									checked={features[key]}
									onCheckedChange={() =>
										setFeatures((prev) => ({ ...prev, [key]: !prev[key] }))
									}
								/>
								<span className="select-none text-sm">
									{featureLabels[key]}
								</span>
							</label>
						))}
					</div>
				</div>

				<Divider />

				{/* Standalone */}
				<div className="space-y-3">
					<p className="text-fg-tertiary text-[10px] font-medium uppercase tracking-widest">
						Standalone
					</p>
					<label className="flex cursor-pointer items-start gap-3">
						<Checkbox
							id="chk-agree"
							className="mt-0.5"
							checked={agreed}
							onCheckedChange={() => setAgreed((v) => !v)}
						/>
						<div>
							<p className="select-none text-sm font-medium leading-tight">
								I agree to the Terms of Service
							</p>
							<p className="text-fg-tertiary mt-0.5 select-none text-xs">
								By checking this box you accept our privacy policy and terms.
							</p>
						</div>
					</label>

					{/* Disabled */}
					<label className="flex cursor-not-allowed items-center gap-3 opacity-50">
						<Checkbox disabled checked />
						<span className="select-none text-sm">Pre-selected (disabled)</span>
					</label>
					<label className="flex cursor-not-allowed items-center gap-3 opacity-50">
						<Checkbox disabled />
						<span className="select-none text-sm">Unavailable option</span>
					</label>
				</div>
			</CardContent>

			<CardFooter>
				<Button size="32" disabled={!agreed} className="w-full">
					Continue
				</Button>
			</CardFooter>
		</Card>
	)
}

// ──────────────────────────────────────────────
// Switch Showcase
// ──────────────────────────────────────────────
export function SwitchShowcaseCard() {
	const [settings, setSettings] = useState({
		wifi: true,
		bluetooth: false,
		airplane: false,
		vpn: true,
		hotspot: false,
	})

	const toggle = (key: keyof typeof settings) =>
		setSettings((prev) => ({ ...prev, [key]: !prev[key] }))

	const items: { key: keyof typeof settings; label: string; desc: string }[] = [
		{ key: "wifi", label: "Wi-Fi", desc: "Connect to wireless networks" },
		{ key: "bluetooth", label: "Bluetooth", desc: "Pair with nearby devices" },
		{
			key: "airplane",
			label: "Airplane Mode",
			desc: "Disable all wireless signals",
		},
		{ key: "vpn", label: "VPN", desc: "Secure your internet connection" },
		{
			key: "hotspot",
			label: "Personal Hotspot",
			desc: "Share your connection",
		},
	]

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base font-semibold">Switch</CardTitle>
				<CardDescription>
					Toggle controls with labels and descriptions.
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-5">
				{/* Full list */}
				<div className="divide-y overflow-hidden rounded-md border">
					{items.map((item) => (
						<div
							key={item.key}
							className="hover:bg-fill1/40 flex items-center justify-between gap-4 px-4 py-3 transition-colors">
							<div>
								<p className="text-sm font-medium leading-tight">
									{item.label}
								</p>
								<p className="text-fg-tertiary mt-0.5 text-xs">{item.desc}</p>
							</div>
							<Switch
								checked={settings[item.key]}
								onCheckedChange={() => toggle(item.key)}
							/>
						</div>
					))}
				</div>

				<Divider />

				{/* Inline simple */}
				<div className="space-y-2">
					<p className="text-fg-tertiary text-[10px] font-medium uppercase tracking-widest">
						Inline & disabled
					</p>
					<div className="flex items-center gap-3">
						<Switch id="sw-inline" defaultChecked />
						<Label htmlFor="sw-inline">Enabled by default</Label>
					</div>
					<div className="flex items-center gap-3 opacity-50">
						<Switch id="sw-disabled" disabled />
						<Label htmlFor="sw-disabled" className="cursor-not-allowed">
							Locked setting
						</Label>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

// ──────────────────────────────────────────────
// RadioGroup Showcase
// ──────────────────────────────────────────────
export function RadioGroupShowcaseCard() {
	const [plan, setPlan] = useState("pro")
	const [delivery, setDelivery] = useState("standard")

	const plans = [
		{
			value: "free",
			label: "Free",
			price: "$0/mo",
			desc: "Up to 3 projects, 1 user",
		},
		{
			value: "pro",
			label: "Pro",
			price: "$12/mo",
			desc: "Unlimited projects, 5 users",
		},
		{
			value: "team",
			label: "Team",
			price: "$49/mo",
			desc: "Everything, unlimited users",
		},
	]

	const deliveryOptions = [
		{ value: "standard", label: "Standard — 5–7 days" },
		{ value: "express", label: "Express — 2–3 days" },
		{ value: "overnight", label: "Overnight — next day" },
	]

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base font-semibold">Radio Group</CardTitle>
				<CardDescription>
					Single-selection in different layouts.
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-6">
				{/* Card-style */}
				<div className="space-y-2">
					<p className="text-fg-tertiary text-[10px] font-medium uppercase tracking-widest">
						Card style
					</p>
					<RadioGroup
						value={plan}
						onValueChange={setPlan}
						className="grid grid-cols-3 gap-2">
						{plans.map((p) => (
							<Card
								key={p.value}
								className={`cursor-pointer p-0 transition-colors ${
									plan === p.value
										? "border-primary bg-primary/5"
										: "hover:bg-fill1/40"
								}`}>
								<Label
									htmlFor={`plan-${p.value}`}
									className="flex cursor-pointer flex-col gap-1 px-3 py-3">
									<div className="flex items-center gap-2">
										<RadioGroupItem id={`plan-${p.value}`} value={p.value} />
										<span className="text-sm font-semibold">{p.label}</span>
									</div>
									<p className="pl-6 text-[11px] font-bold">{p.price}</p>
									<p className="text-fg-tertiary pl-6 text-[10px] leading-tight">
										{p.desc}
									</p>
								</Label>
							</Card>
						))}
					</RadioGroup>
				</div>

				<Divider />

				{/* Vertical list */}
				<div className="space-y-2">
					<p className="text-fg-tertiary text-[10px] font-medium uppercase tracking-widest">
						Vertical list
					</p>
					<RadioGroup
						value={delivery}
						onValueChange={setDelivery}
						className="space-y-1">
						{deliveryOptions.map((opt) => (
							<label
								key={opt.value}
								htmlFor={`del-${opt.value}`}
								className="hover:bg-fill1/40 flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 transition-colors">
								<RadioGroupItem id={`del-${opt.value}`} value={opt.value} />
								<span className="select-none text-sm">{opt.label}</span>
							</label>
						))}
					</RadioGroup>
				</div>
			</CardContent>
		</Card>
	)
}

// ──────────────────────────────────────────────
// Slider Showcase
// ──────────────────────────────────────────────
export function SliderShowcaseCard() {
	const [volume, setVolume] = useState([72])
	const [priceRange, setPriceRange] = useState([200, 800])
	const [opacity, setOpacity] = useState([100])

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base font-semibold">Slider</CardTitle>
				<CardDescription>
					Single value, range, and stepped variants.
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-6">
				{/* Single */}
				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<Label>Volume</Label>
						<span className="text-sm font-bold tabular-nums">{volume[0]}%</span>
					</div>
					<Slider
						min={0}
						max={100}
						step={1}
						value={volume}
						onValueChange={setVolume}>
						<SliderThumb />
					</Slider>
					<div className="text-fg-tertiary flex justify-between text-xs">
						<span>Mute</span>
						<span>Max</span>
					</div>
				</div>

				<Divider />

				{/* Range */}
				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<Label>Price Range</Label>
						<span className="text-sm font-bold tabular-nums">
							${priceRange[0]} – ${priceRange[1]}
						</span>
					</div>
					<Slider
						min={0}
						max={1000}
						step={50}
						value={priceRange}
						onValueChange={setPriceRange}>
						<SliderThumb />
						<SliderThumb />
					</Slider>
					<div className="text-fg-tertiary flex justify-between text-xs">
						<span>$0</span>
						<span>$1,000</span>
					</div>
				</div>

				<Divider />

				{/* Stepped */}
				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<Label>Opacity</Label>
						<span className="text-sm font-bold tabular-nums">
							{opacity[0]}%
						</span>
					</div>
					<Slider
						min={0}
						max={100}
						step={25}
						value={opacity}
						onValueChange={setOpacity}>
						<SliderThumb />
					</Slider>
					<div className="text-fg-tertiary flex justify-between text-xs">
						{[0, 25, 50, 75, 100].map((v) => (
							<span key={v}>{v}</span>
						))}
					</div>
				</div>

				<Divider />

				{/* Disabled */}
				<div className="space-y-3 opacity-50">
					<Label className="text-fg-tertiary">Disabled</Label>
					<Slider min={0} max={100} step={1} value={[40]} disabled>
						<SliderThumb />
					</Slider>
				</div>
			</CardContent>
		</Card>
	)
}

// ──────────────────────────────────────────────
// Progress Showcase
// ──────────────────────────────────────────────
export function ProgressShowcaseCard() {
	const tasks = [
		{ label: "Design", value: 100 },
		{ label: "Development", value: 68 },
		{ label: "QA Testing", value: 35 },
		{ label: "Deployment", value: 10 },
	]

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base font-semibold">Progress</CardTitle>
				<CardDescription>Determinate and styled progress bars.</CardDescription>
			</CardHeader>

			<CardContent className="space-y-6">
				{/* Default */}
				<div className="space-y-2">
					<p className="text-fg-tertiary text-[10px] font-medium uppercase tracking-widest">
						Default
					</p>
					<div className="space-y-1.5">
						<div className="flex justify-between text-xs">
							<span className="text-fg-tertiary">Overall completion</span>
							<span className="font-semibold">53%</span>
						</div>
						<Progress value={53} />
					</div>
				</div>

				<Divider />

				{/* Colored per task */}
				<div className="space-y-3">
					<p className="text-fg-tertiary text-[10px] font-medium uppercase tracking-widest">
						Task breakdown
					</p>
					{tasks.map((t) => (
						<div key={t.label} className="space-y-1.5">
							<div className="flex justify-between text-xs">
								<span className="text-fg-tertiary">{t.label}</span>
								<span className="font-semibold">{t.value}%</span>
							</div>
							<Progress value={t.value} className="h-1.5" />
						</div>
					))}
				</div>

				<Divider />

				{/* Sizes */}
				<div className="space-y-3">
					<p className="text-fg-tertiary text-[10px] font-medium uppercase tracking-widest">
						Sizes
					</p>
					<Progress value={60} className="h-1" />
					<Progress value={60} className="h-2" />
					<Progress value={60} className="h-3" />
					<Progress value={60} className="h-4" />
				</div>

				<Divider />

				{/* Empty and full */}
				<div className="space-y-2">
					<p className="text-fg-tertiary text-[10px] font-medium uppercase tracking-widest">
						Edge cases
					</p>
					<div className="flex items-center gap-3">
						<Progress value={0} className="flex-1" />
						<span className="text-fg-tertiary w-8 text-right text-xs">0%</span>
					</div>
					<div className="flex items-center gap-3">
						<Progress value={100} className="flex-1" />
						<span className="w-8 text-right text-xs font-semibold">100%</span>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

// ──────────────────────────────────────────────
// ScrollArea Showcase
// ──────────────────────────────────────────────
const SCROLL_ITEMS = Array.from({ length: 20 }, (_, i) => ({
	id: i + 1,
	title: `Item #${i + 1}`,
	desc: ["Approved", "Pending", "Rejected", "In Review"][i % 4],
	amount: `$${((i + 1) * 137.5).toLocaleString()}`,
}))

const statusColor: Record<string, string> = {
	Approved: "text-success",
	Pending: "text-warning",
	Rejected: "text-error",
	"In Review": "text-info",
}

export function ScrollAreaShowcaseCard() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base font-semibold">Scroll Area</CardTitle>
				<CardDescription>
					Vertical and horizontal scroll containers.
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-5">
				{/* Vertical */}
				<div className="space-y-2">
					<p className="text-fg-tertiary text-[10px] font-medium uppercase tracking-widest">
						Vertical — 20 items
					</p>
					<ScrollArea className="h-52 rounded-md border">
						<div className="divide-y">
							{SCROLL_ITEMS.map((item) => (
								<div
									key={item.id}
									className="flex items-center justify-between px-4 py-2.5">
									<div>
										<p className="text-sm font-medium">{item.title}</p>
										<p
											className={`text-xs font-medium ${statusColor[item.desc]}`}>
											{item.desc}
										</p>
									</div>
									<span className="text-sm font-semibold tabular-nums">
										{item.amount}
									</span>
								</div>
							))}
						</div>
					</ScrollArea>
				</div>

				<Divider />

				{/* Horizontal */}
				<div className="space-y-2">
					<p className="text-fg-tertiary text-[10px] font-medium uppercase tracking-widest">
						Horizontal — wide content
					</p>
					<ScrollArea className="rounded-md border">
						<div className="flex gap-3 p-3" style={{ width: "max-content" }}>
							{[
								"Jan",
								"Feb",
								"Mar",
								"Apr",
								"May",
								"Jun",
								"Jul",
								"Aug",
								"Sep",
								"Oct",
								"Nov",
								"Dec",
							].map((month, i) => (
								<div
									key={month}
									className="bg-fill1 flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-lg">
									<span className="text-fg-tertiary text-xs">{month}</span>
									<span className="text-lg font-bold">{(i + 1) * 8}%</span>
								</div>
							))}
						</div>
					</ScrollArea>
				</div>
			</CardContent>
		</Card>
	)
}

// ──────────────────────────────────────────────
// Divider Showcase
// ──────────────────────────────────────────────
export function DividerShowcaseCard() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base font-semibold">Divider</CardTitle>
				<CardDescription>Horizontal separators in context.</CardDescription>
			</CardHeader>

			<CardContent className="space-y-6">
				{/* Plain */}
				<div className="space-y-2">
					<p className="text-fg-tertiary text-[10px] font-medium uppercase tracking-widest">
						Plain
					</p>
					<div className="space-y-3">
						<p className="text-sm">Section above</p>
						<Divider />
						<p className="text-sm">Section below</p>
					</div>
				</div>

				{/* With label */}
				<div className="space-y-2">
					<p className="text-fg-tertiary text-[10px] font-medium uppercase tracking-widest">
						With label
					</p>
					<div className="space-y-3">
						<p className="text-sm">Primary login</p>
						<div className="relative flex items-center">
							<Divider className="flex-1" />
							<span className="text-fg-tertiary bg-card mx-3 shrink-0 text-xs">
								or
							</span>
							<Divider className="flex-1" />
						</div>
						<Button variant="outline" className="w-full" size="32">
							Continue with Google
						</Button>
					</div>
				</div>

				{/* In a summary breakdown */}
				<div className="space-y-2">
					<p className="text-fg-tertiary text-[10px] font-medium uppercase tracking-widest">
						Order summary
					</p>
					<div className="space-y-2 text-sm">
						<div className="flex justify-between">
							<span className="text-fg-tertiary">Subtotal</span>
							<span>$240.00</span>
						</div>
						<div className="flex justify-between">
							<span className="text-fg-tertiary">Shipping</span>
							<span>$12.00</span>
						</div>
						<div className="flex justify-between">
							<span className="text-fg-tertiary">Tax</span>
							<span>$19.20</span>
						</div>
						<Divider />
						<div className="flex justify-between font-semibold">
							<span>Total</span>
							<span>$271.20</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

// ──────────────────────────────────────────────
// Dropdown Showcase
// ──────────────────────────────────────────────
export function DropdownShowcaseCard() {
	const [theme, setTheme] = useState("system")
	const [showToolbar, setShowToolbar] = useState(true)

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base font-semibold">Dropdown Menu</CardTitle>
				<CardDescription>
					Complex menus with checkboxes, radios, and submenus.
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-6">
				<div className="flex justify-center py-6">
					<Dropdown>
						<DropdownTrigger asChild>
							<Button variant="smooth">
								Open Menu <IconSlot slot="setting" className="ml-2 h-4 w-4" />
							</Button>
						</DropdownTrigger>
						<DropdownContent className="w-80">
							<DropdownLabel>My Account</DropdownLabel>
							<DropdownItem>
								<IconSlot slot="user" className="mr-2 h-4 w-4" />
								<span>Profile</span>
								<DropdownShortcut>⇧⌘P</DropdownShortcut>
							</DropdownItem>
							<DropdownItem>
								<IconSlot slot="mail" className="mr-2 h-4 w-4" />
								<span>Billing</span>
								<DropdownShortcut>⌘B</DropdownShortcut>
							</DropdownItem>
							<DropdownItem>
								<IconSlot slot="setting" className="mr-2 h-4 w-4" />
								<span>Settings</span>
								<DropdownShortcut>⌘S</DropdownShortcut>
							</DropdownItem>

							<DropdownDivider />

							<DropdownSub>
								<DropdownSubTrigger>
									<IconSlot slot="user" className="mr-2 h-4 w-4" />
									<span>Invite users</span>
								</DropdownSubTrigger>
								<DropdownPortal>
									<DropdownSubContent>
										<DropdownItem>
											<IconSlot slot="mail" className="mr-2 h-4 w-4" />
											<span>Email</span>
										</DropdownItem>
										<DropdownItem>
											<IconSlot slot="mail" className="mr-2 h-4 w-4" />
											<span>Message</span>
										</DropdownItem>
										<DropdownDivider />
										<DropdownItem>
											<IconSlot slot="plus" className="mr-2 h-4 w-4" />
											<span>More...</span>
										</DropdownItem>
									</DropdownSubContent>
								</DropdownPortal>
							</DropdownSub>

							<DropdownDivider />

							<DropdownLabel>Appearance</DropdownLabel>
							<DropdownRadioGroup value={theme} onValueChange={setTheme}>
								<DropdownRadioItem value="light">Light</DropdownRadioItem>
								<DropdownRadioItem value="dark">Dark</DropdownRadioItem>
								<DropdownRadioItem value="system">System</DropdownRadioItem>
							</DropdownRadioGroup>

							<DropdownDivider />

							<DropdownCheckboxItem
								checked={showToolbar}
								onCheckedChange={setShowToolbar}>
								Show Toolbar
							</DropdownCheckboxItem>

							<DropdownDivider />

							<DropdownItem className="text-error">
								<IconSlot slot="logout" className="mr-2 h-4 w-4" />
								<span>Log out</span>
								<DropdownShortcut>⇧⌘Q</DropdownShortcut>
							</DropdownItem>
						</DropdownContent>
					</Dropdown>
				</div>
			</CardContent>
		</Card>
	)
}

// ──────────────────────────────────────────────
// Page — all showcases
// ──────────────────────────────────────────────
export default function ShowcasePage() {
	return (
		<div className="bg-elevation-negative min-h-screen p-6">
			<div className="mx-auto max-w-6xl space-y-6">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">
						Component Showcase
					</h1>
					<p className="text-fg-tertiary mt-1 text-sm">
						All missing components — each in a dedicated card.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<InputShowcaseCard />
					<BadgeShowcaseCard />
					<SelectShowcaseCard />
					<TextAreaShowcaseCard />
					<CheckboxShowcaseCard />
					<SwitchShowcaseCard />
					<RadioGroupShowcaseCard />
					<SliderShowcaseCard />
					<ProgressShowcaseCard />
					<ScrollAreaShowcaseCard />
					<DividerShowcaseCard />
					<DropdownShowcaseCard />
				</div>
			</div>
		</div>
	)
}
