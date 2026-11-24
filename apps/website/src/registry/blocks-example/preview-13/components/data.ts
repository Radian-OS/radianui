import type {
	MonthSalesData,
	RevenueBarItem,
	StatMetricItem,
	TransactionItem,
} from "./types"

export const STAT_METRICS: StatMetricItem[] = [
	{
		title: "TOTAL REVENUE",
		value: "$20,320",
		change: "+0,94",
		changeText: "last year",
		bars: [50, 75, 55, 70, 95, 55, 55],
	},
	{
		title: "TOTAL ORDERS",
		value: "10,320",
		unit: "Orders",
		change: "+0,94",
		changeText: "last year",
		bars: [45, 65, 50, 80, 100, 60, 50],
	},
	{
		title: "NEW CUSTOMERS",
		value: "4,305",
		unit: "New Users",
		change: "+0,94",
		changeText: "last year",
		bars: [40, 60, 50, 75, 85, 45, 55],
	},
	{
		title: "CONVERSION RATE",
		value: "3.9%",
		change: "+0,94",
		changeText: "last year",
		bars: [35, 55, 45, 70, 90, 50, 45],
	},
]

export const MONTHLY_SALES: MonthSalesData[] = [
	{ month: "JAN", existingBlocks: 2, newBlocks: 4 },
	{ month: "FEB", existingBlocks: 4, newBlocks: 3 },
	{ month: "MAR", existingBlocks: 3, newBlocks: 4 },
	{ month: "APR", existingBlocks: 2, newBlocks: 5 },
	{ month: "MAY", existingBlocks: 4, newBlocks: 4 },
	{
		month: "JUN",
		existingBlocks: 3,
		newBlocks: 6,
		newUsersText: "38k",
		existingUsersText: "18k",
		isHighlighted: true,
	},
	{ month: "JUL", existingBlocks: 4, newBlocks: 3 },
	{ month: "AUG", existingBlocks: 2, newBlocks: 4 },
	{ month: "SEP", existingBlocks: 4, newBlocks: 3 },
	{ month: "OCT", existingBlocks: 3, newBlocks: 5 },
	{ month: "NOV", existingBlocks: 2, newBlocks: 4 },
	{ month: "DEC", existingBlocks: 4, newBlocks: 3 },
]

export const CHART_GRID_COLUMNS: {
	month: string
	existing: number
	newUsers: number
}[] = [
	// JAN (5 cols)
	{ month: "JAN", existing: 1, newUsers: 3 },
	{ month: "JAN", existing: 2, newUsers: 4 },
	{ month: "JAN", existing: 3, newUsers: 4 },
	{ month: "JAN", existing: 2, newUsers: 5 },
	{ month: "JAN", existing: 5, newUsers: 4 },
	// FEB (5 cols) - peak up to 7
	{ month: "FEB", existing: 7, newUsers: 4 },
	{ month: "FEB", existing: 5, newUsers: 5 },
	{ month: "FEB", existing: 6, newUsers: 4 },
	{ month: "FEB", existing: 3, newUsers: 5 },
	{ month: "FEB", existing: 1, newUsers: 4 },
	// MAR (5 cols) - peak up to 6
	{ month: "MAR", existing: 5, newUsers: 5 },
	{ month: "MAR", existing: 3, newUsers: 4 },
	{ month: "MAR", existing: 4, newUsers: 5 },
	{ month: "MAR", existing: 6, newUsers: 6 },
	{ month: "MAR", existing: 4, newUsers: 5 },
	// APR (5 cols) - peak up to 8
	{ month: "APR", existing: 3, newUsers: 5 },
	{ month: "APR", existing: 1, newUsers: 5 },
	{ month: "APR", existing: 3, newUsers: 6 },
	{ month: "APR", existing: 8, newUsers: 7 },
	{ month: "APR", existing: 5, newUsers: 8 },
	// MAY (5 cols)
	{ month: "MAY", existing: 3, newUsers: 9 },
	{ month: "MAY", existing: 2, newUsers: 8 },
	{ month: "MAY", existing: 1, newUsers: 7 },
	{ month: "MAY", existing: 2, newUsers: 6 },
	{ month: "MAY", existing: 3, newUsers: 5 },
	// JUN (5 cols) - target tooltip at col 27
	{ month: "JUN", existing: 6, newUsers: 8 },
	{ month: "JUN", existing: 4, newUsers: 10 },
	{ month: "JUN", existing: 4, newUsers: 12 },
	{ month: "JUN", existing: 5, newUsers: 9 },
	{ month: "JUN", existing: 3, newUsers: 7 },
	// JUL (5 cols) - peak up to 8
	{ month: "JUL", existing: 1, newUsers: 6 },
	{ month: "JUL", existing: 2, newUsers: 6 },
	{ month: "JUL", existing: 8, newUsers: 7 },
	{ month: "JUL", existing: 5, newUsers: 5 },
	{ month: "JUL", existing: 2, newUsers: 4 },
	// AUG (5 cols)
	{ month: "AUG", existing: 2, newUsers: 4 },
	{ month: "AUG", existing: 1, newUsers: 3 },
	{ month: "AUG", existing: 1, newUsers: 3 },
	{ month: "AUG", existing: 3, newUsers: 4 },
	{ month: "AUG", existing: 4, newUsers: 5 },
	// SEP (5 cols) - peak up to 7
	{ month: "SEP", existing: 7, newUsers: 5 },
	{ month: "SEP", existing: 3, newUsers: 4 },
	{ month: "SEP", existing: 3, newUsers: 4 },
	{ month: "SEP", existing: 2, newUsers: 3 },
	{ month: "SEP", existing: 1, newUsers: 3 },
	// OCT (5 cols) - peak up to 8
	{ month: "OCT", existing: 2, newUsers: 3 },
	{ month: "OCT", existing: 8, newUsers: 4 },
	{ month: "OCT", existing: 3, newUsers: 5 },
	{ month: "OCT", existing: 4, newUsers: 5 },
	{ month: "OCT", existing: 5, newUsers: 5 },
	// NOV (4 cols)
	{ month: "NOV", existing: 3, newUsers: 4 },
	{ month: "NOV", existing: 1, newUsers: 3 },
	{ month: "NOV", existing: 2, newUsers: 3 },
	{ month: "NOV", existing: 2, newUsers: 3 },
	// DEC (4 cols) - peak up to 6
	{ month: "DEC", existing: 4, newUsers: 4 },
	{ month: "DEC", existing: 6, newUsers: 5 },
	{ month: "DEC", existing: 3, newUsers: 3 },
	{ month: "DEC", existing: 1, newUsers: 2 },
]

export const REVENUE_BARS: RevenueBarItem[] = [
	{ id: "b-1", orange: 43, grey: 20 },
	{ id: "b-2", orange: 57, grey: 20 },
	{ id: "b-3", orange: 32, grey: 20 },
	{ id: "b-4", orange: 68, grey: 19 },
	{ id: "b-5", orange: 45, grey: 23 },
	{ id: "b-6", orange: 32, grey: 15 },
	{ id: "b-7", orange: 48, grey: 14 },
	{ id: "b-8", orange: 29, grey: 18 },
	{ id: "b-9", orange: 64, grey: 17 },
	{ id: "b-10", orange: 36, grey: 20 },
	{ id: "b-11", orange: 53, grey: 20 },
	{ id: "b-12", orange: 36, grey: 26 },
	{ id: "b-13", orange: 36, grey: 16 },
]

export const RECENT_TRANSACTIONS: TransactionItem[] = [
	{
		id: "#04910",
		customer: "Ryan Korsgaard",
		product: "Ergo Office Chair",
		status: "Success",
		qty: 12,
		unitPrice: "$3,450",
		totalRevenue: "$41,400",
	},
	{
		id: "#04911",
		customer: "Madelyn Lubin",
		product: "Sunset Desk 02",
		status: "Success",
		qty: 20,
		unitPrice: "$2,980",
		totalRevenue: "$89,200",
	},
	{
		id: "#04912",
		customer: "Abram Bergson",
		product: "Eco Bookshelf",
		status: "Pending",
		qty: 22,
		unitPrice: "$1,750",
		totalRevenue: "$75,900",
	},
	{
		id: "#04913",
		customer: "Phillip Mango",
		product: "Green Leaf Desk",
		status: "Refunded",
		qty: 24,
		unitPrice: "$1,950",
		totalRevenue: "$19,500",
	},
]
