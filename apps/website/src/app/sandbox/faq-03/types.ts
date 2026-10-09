export interface FaqItem {
	id: string
	question: string
	answer: string
}

export interface FaqHeaderData {
	eyebrow: string
	heading: string
	description: string
}

export interface FaqSectionData {
	header: FaqHeaderData
	items: FaqItem[]
	footerText: string
	footerLinkText: string
	footerLinkHref: string
}
