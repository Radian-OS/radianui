"use client"

import {
	ArrowUpDown,
	ChevronRight,
	CreditCard,
	Download,
	HelpCircle,
	Home,
	LayoutDashboard,
	Repeat,
	Search,
	Settings,
	UserPlus,
	Wallet,
	X,
} from "lucide-react"
import Image from "next/image"

const sidebarMain = [
	{ label: "Dashboard", icon: LayoutDashboard },
	{ label: "My Cards", icon: CreditCard },
	{ label: "Transfer", icon: Repeat },
	{ label: "Transactions", icon: Wallet, active: true },
	{ label: "Payments", icon: Home },
	{ label: "Exchange", icon: Repeat },
]

const sidebarOther = [
	{ label: "Settings", icon: Settings },
	{ label: "Support", icon: HelpCircle },
]

const transactions = [
	{
		initials: "IR",
		name: "Investment Return",
		amount: "$560.00",
		account: "Checking",
		date: "12 September",
		method: "Wire",
		color: "bg-error-accent text-error-text",
	},
	{
		initials: "JB",
		name: "James Brown",
		amount: "-$35.20",
		account: "Ops Payroll",
		date: "12 September",
		method: "Money Transfer",
		color: "bg-primary-accent text-primary-text",
	},
	{
		initials: "SD",
		name: "Stock Dividend",
		amount: "$1250.00",
		account: "AP",
		date: "12 September",
		method: "ACH",
		color: "bg-success-accent text-success-text",
	},
	{
		initials: "SW",
		name: "Sophia Williams",
		amount: "$420.00",
		account: "Savings",
		date: "12 September",
		method: "Money Transfer",
		color: "bg-warning-accent text-warning-text",
	},
	{
		initials: "FI",
		name: "Freelance Income",
		amount: "$890.00",
		account: "Checking",
		date: "12 September",
		method: "ACH",
		color: "bg-info-accent text-info-text",
	},
	{
		initials: "EW",
		name: "Emma Wright",
		amount: "-$218.00",
		account: "AP",
		date: "12 September",
		method: "Wire",
		color: "bg-primary-accent text-primary-text",
	},
	{
		initials: "UP",
		name: "Utilities Payment",
		amount: "-$83.75",
		account: "Ops Payroll",
		date: "12 September",
		method: "ACH",
		color: "bg-error-accent text-error-text",
	},
	{
		initials: "MJ",
		name: "Matthew Johnson",
		amount: "-$45.00",
		account: "Checking",
		date: "12 September",
		method: "Money Transfer",
		color: "bg-success-accent text-success-text",
	},
]

const tabs = ["All", "Income", "Expenses"]

export function BeamDashboard() {
	return (
		<div className="bg-bg flex min-h-[480px] sm:min-h-[540px]">
			{/* Sidebar */}
			<div className="border-border bg-bg hidden w-[220px] shrink-0 flex-col border-r p-4 md:flex">
				{/* Brand */}
				<div className="mb-6 flex items-center gap-2.5 px-2">
					<div className="bg-primary flex size-8 items-center justify-center rounded-lg">
						<Image
							src="https://www.google.com/s2/favicons?sz=32&domain=beam.app"
							alt="Beam logo"
							width={16}
							height={16}
							className="brightness-200"
							unoptimized
						/>
					</div>
					<div className="flex flex-col">
						<span className="text-fg text-sm font-bold">Beam</span>
						<span className="text-fg-tertiary text-[10px]">
							Finance & Banking
						</span>
					</div>
				</div>

				{/* Main Navigation */}
				<div className="mb-6">
					<p className="text-fg-tertiary mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider">
						Main
					</p>
					<nav className="flex flex-col gap-0.5">
						{sidebarMain.map((item) => (
							<div
								key={item.label}
								className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors ${
									item.active
										? "bg-primary-accent text-primary-text"
										: "text-fg-secondary hover:bg-fill2"
								}`}>
								<item.icon className="size-3.5" />
								<span className="flex-1">{item.label}</span>
								{item.active && (
									<ChevronRight className="text-primary-text size-3" />
								)}
							</div>
						))}
					</nav>
				</div>

				{/* Others */}
				<div>
					<p className="text-fg-tertiary mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider">
						Others
					</p>
					<nav className="flex flex-col gap-0.5">
						{sidebarOther.map((item) => (
							<div
								key={item.label}
								className="text-fg-secondary hover:bg-fill2 flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors">
								<item.icon className="size-3.5" />
								<span>{item.label}</span>
							</div>
						))}
					</nav>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex flex-1 flex-col overflow-hidden">
				{/* Transactions Header */}
				<div className="border-border flex items-center justify-between border-b px-4 py-3 sm:px-6">
					<div>
						<h2 className="heading-6 text-fg">Transactions</h2>
						<p className="text-fg-tertiary mt-0.5 text-[11px]">
							Track your financial transactions to stay in control of your
							income and expenses.
						</p>
					</div>
					<div className="hidden items-center gap-2 sm:flex">
						<button className="border-border bg-bg text-fg-secondary hover:bg-fill1 flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-medium transition-colors">
							<Download className="size-3" />
							Export
						</button>
						<button className="bg-primary text-primary-fg hover:bg-primary-hover flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-medium transition-colors">
							<UserPlus className="size-3" />
							Add Team Member
						</button>
					</div>
				</div>

				{/* Tabs & Search */}
				<div className="border-border flex items-center justify-between border-b px-4 py-2.5 sm:px-6">
					<div className="flex items-center gap-1">
						{tabs.map((tab, i) => (
							<button
								key={tab}
								className={`rounded-lg px-3 py-1.5 text-[11px] font-medium transition-colors ${
									i === 0
										? "bg-fg text-bg"
										: "text-fg-tertiary hover:bg-fill2 hover:text-fg"
								}`}>
								{tab}
							</button>
						))}
					</div>
					<div className="border-border bg-bg flex items-center gap-1.5 rounded-lg border px-3 py-1.5">
						<Search className="text-fg-tertiary size-3" />
						<span className="text-fg-tertiary text-[11px]">Search...</span>
					</div>
				</div>

				{/* Table */}
				<div className="flex-1 overflow-auto">
					{/* Table Header */}
					<div className="border-border text-fg-tertiary grid grid-cols-[1fr_1fr_1fr_1fr_1fr_auto] items-center gap-2 border-b px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider sm:px-6">
						<div className="flex items-center gap-1">
							To / From <ArrowUpDown className="size-2.5" />
						</div>
						<div className="flex items-center gap-1">
							Amount <ArrowUpDown className="size-2.5" />
						</div>
						<div className="flex items-center gap-1">
							Account <ArrowUpDown className="size-2.5" />
						</div>
						<div className="flex items-center gap-1">
							Date & Time <ArrowUpDown className="size-2.5" />
						</div>
						<div className="flex items-center gap-1">
							Payment Method <ArrowUpDown className="size-2.5" />
						</div>
						<div className="w-6" />
					</div>

					{/* Table Rows */}
					{transactions.map((tx) => (
						<div
							key={tx.name}
							className="border-border/50 hover:bg-fill1 grid grid-cols-[1fr_1fr_1fr_1fr_1fr_auto] items-center gap-2 border-b px-4 py-2.5 text-xs transition-colors sm:px-6">
							<div className="flex items-center gap-2.5">
								<div className="flex items-center gap-2">
									<input
										type="checkbox"
										className="border-border accent-primary size-3.5 rounded"
										readOnly
									/>
									<div
										className={`flex size-7 shrink-0 items-center justify-center rounded-md text-[10px] font-bold ${tx.color}`}>
										{tx.initials}
									</div>
								</div>
								<span className="text-fg truncate font-medium">{tx.name}</span>
							</div>
							<span className="text-fg-secondary">{tx.amount}</span>
							<span className="text-fg-secondary">{tx.account}</span>
							<span className="text-fg-secondary">{tx.date}</span>
							<div className="flex items-center gap-1.5">
								<Wallet className="text-fg-tertiary size-3" />
								<span className="text-fg-secondary">{tx.method}</span>
							</div>
							<button className="text-fg-tertiary hover:text-fg transition-colors">
								<X className="size-3.5" />
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
