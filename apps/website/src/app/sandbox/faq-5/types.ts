export interface FaqItem {
	id: string
	question: string
	answer: string
}

export interface SupportCardData {
	title: string
	description: string
	buttonText: string
	buttonHref: string
	email: string
}

export interface Faq5Data {
	badge: string
	heading: string
	description: string
	faqItems: FaqItem[]
	support: SupportCardData
}
