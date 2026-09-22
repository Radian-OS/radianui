export type ChannelType =
	| "facebook"
	| "messenger"
	| "email"
	| "whatsapp"
	| "phone"

export interface Message {
	id: string
	sender: string
	isUser: boolean
	content: string
	time: string
	avatarText?: string
	avatarBgClass?: string
	isAgentFin?: boolean
}

export interface Conversation {
	id: string
	name: string
	avatarText: string
	avatarBgClass: string
	preview: string
	time: string
	channel: ChannelType
	status: "open" | "closed" | "snoozed"
	messages: Message[]
}

export interface NavFolder {
	id: string
	label: string
	count?: number
	iconName: string
}
