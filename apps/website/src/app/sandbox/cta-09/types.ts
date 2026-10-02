export interface ServiceItem {
	id: string
	title: string
	imageSrc: string
	alt: string
}

export interface Cta09Button {
	text: string
	href: string
}

export interface Cta09Data {
	heading: string
	description: string
	primaryButton: Cta09Button
	secondaryButton: Cta09Button
	services: ServiceItem[]
}
