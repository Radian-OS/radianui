export interface TestimonialItem {
	id: string
	quote: string
	author: string
	role: string
	imageSrc: string
	imageAlt: string
}

export interface BrandLogoItem {
	id: string
	name: string
	lightSrc: string
	darkSrc: string
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
	{
		id: "1",
		quote:
			"Shadcn Space replaced messy UI kits and half-baked templates. Today our dashboards look premium, scale beautifully, and our team focuses on real features instead of design debt.",
		author: "Walter Dutcher",
		role: "CEO",
		imageSrc:
			"https://images.shadcnspace.com/assets/profiles/testimonial-user.png",
		imageAlt: "Walter Dutcher",
	},
	{
		id: "2",
		quote:
			"Shadcn Space replaced messy UI kits and half-baked templates. Today our dashboards look premium, scale beautifully, and our team focuses on real features instead of design debt.",
		author: "Errica Mcdowell",
		role: "Marketing Head",
		imageSrc:
			"https://images.shadcnspace.com/assets/profiles/testimonial-user-2.png",
		imageAlt: "Errica Mcdowell",
	},
]

export const BRAND_LOGOS: BrandLogoItem[] = [
	{
		id: "1",
		name: "Logoipsum 1",
		lightSrc:
			"https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-1.svg",
		darkSrc:
			"https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-white-1.svg",
	},
	{
		id: "2",
		name: "Logoipsum 2",
		lightSrc:
			"https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-2.svg",
		darkSrc:
			"https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-white-2.svg",
	},
	{
		id: "3",
		name: "Logoipsum 3",
		lightSrc:
			"https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-3.svg",
		darkSrc:
			"https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-white-3.svg",
	},
	{
		id: "4",
		name: "Logoipsum 4",
		lightSrc:
			"https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-4.svg",
		darkSrc:
			"https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-white-4.svg",
	},
	{
		id: "5",
		name: "Logoipsum 5",
		lightSrc:
			"https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-5.svg",
		darkSrc:
			"https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-white-5.svg",
	},
]
