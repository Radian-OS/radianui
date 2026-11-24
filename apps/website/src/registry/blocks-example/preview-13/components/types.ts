export type TransactionStatus = "Success" | "Pending" | "Refunded"

export interface TransactionItem {
	id: string
	customer: string
	product: string
	status: TransactionStatus
	qty: number
	unitPrice: string
	totalRevenue: string
}

export interface StatMetricItem {
	title: string
	value: string
	unit?: string
	change: string
	changeText: string
	bars: number[]
}

export interface MonthSalesData {
	month: string
	existingBlocks: number
	newBlocks: number
	newUsersText?: string
	existingUsersText?: string
	isHighlighted?: boolean
}

export interface GridColumnData {
	id: number
	month: string
	existingCount: number
	newCount: number
	isPeak?: boolean
}

export interface RevenueBarItem {
	id: string
	orange: number
	grey: number
}
