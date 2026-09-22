export interface Order {
	id: string
	date: string
	status: "Paid" | "Pending" | "Failed"
	customer: {
		name: string
		avatarUrl: string
	}
	purchased: string
	revenue: string
}

export interface OrderMetric {
	label: string
	value: string
	change: string
	changeType: "positive" | "negative" | "warning"
	period: string
}

export const ORDER_METRICS: OrderMetric[] = [
	{
		label: "Total Orders",
		value: "1,248",
		change: "-12",
		changeType: "negative",
		period: "vs this week",
	},
	{
		label: "Total Revenue",
		value: "$48,294",
		change: "+8%",
		changeType: "positive",
		period: "vs last week",
	},
	{
		label: "Average Order Value",
		value: "$86.45",
		change: "-2%",
		changeType: "negative",
		period: "this week",
	},
	{
		label: "Pending Orders",
		value: "28",
		change: "Requires attention",
		changeType: "warning",
		period: "",
	},
]

export const SAMPLE_ORDERS: Order[] = [
	{
		id: "#ORD-98745",
		date: "29 Oct, 15:05",
		status: "Paid",
		customer: {
			name: "Sophia Williams",
			avatarUrl:
				"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
		},
		purchased: "Apple Watch S5 GPS 40mm White",
		revenue: "$399.99",
	},
	{
		id: "#ORD-28745",
		date: "28 Oct, 16:15",
		status: "Paid",
		customer: {
			name: "Laura Perez",
			avatarUrl:
				"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop",
		},
		purchased: "MacBook Pro M1 256GB Silvere",
		revenue: "$1,299.99",
	},
	{
		id: "#ORD-56745",
		date: "27 Oct, 17:30",
		status: "Paid",
		customer: {
			name: "Lena Müller",
			avatarUrl:
				"https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop",
		},
		purchased: "iMac M1 24-inch Purple",
		revenue: "$1,299.99",
	},
	{
		id: "#ORD-46345",
		date: "27 Oct, 01:10",
		status: "Paid",
		customer: {
			name: "Natalia Nowak",
			avatarUrl:
				"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop",
		},
		purchased: "AirPods Max Green",
		revenue: "$549.99",
	},
	{
		id: "#ORD-45248",
		date: "25 Oct, 23:57",
		status: "Paid",
		customer: {
			name: "Wei Chen",
			avatarUrl:
				"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
		},
		purchased: "HomePod Mini Orange",
		revenue: "$99.99",
	},
	{
		id: "#ORD-21325",
		date: "24 Oct, 23:39",
		status: "Paid",
		customer: {
			name: "Emma Wright",
			avatarUrl:
				"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
		},
		purchased: "Apple Studio Display Standard Glass",
		revenue: "$1,599.99",
	},
	{
		id: "#ORD-73456",
		date: "27 Oct, 02:09",
		status: "Paid",
		customer: {
			name: "Ravi Patel",
			avatarUrl:
				"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
		},
		purchased: "Apple AirPods Pro 2nd Gen",
		revenue: "$249.99",
	},
	{
		id: "#ORD-21352",
		date: "26 Oct, 03:42",
		status: "Paid",
		customer: {
			name: "Nuray Aksoy",
			avatarUrl:
				"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop",
		},
		purchased: "iPad 10th Gen 64GB Wi-Fi Space Gray",
		revenue: "$449.99",
	},
]
