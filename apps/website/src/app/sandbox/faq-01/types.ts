export interface FaqItem {
	id: string
	question: string
	answer: string
}

export interface StatItem {
	value: string
	label: string
}

export interface Faq03Data {
	badge: string
	title: string
	imageSrc: string
	imageAlt: string
	faqItems: FaqItem[]
	stats: StatItem[]
}
