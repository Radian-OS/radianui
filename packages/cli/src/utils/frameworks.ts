export type FrameworkName = "manual" | "next-app" | "vite"

export const FRAMEWORKS: Record<FrameworkName, Framework> = {
	manual: {
		name: "manual",
		label: "Manual",
		link: {
			installation: "https://radianos.com/documentation/installation",
			tailwind: "https://tailwindcss.com/docs/guides/manual",
		},
	},
	"next-app": {
		name: "next-app",
		label: "Next.js",
		link: {
			installation: "https://radianos.com/documentation/installation",
			tailwind: "https://tailwindcss.com/docs/guides/nextjs",
		},
	},
	vite: {
		name: "vite",
		label: "Vite",
		link: {
			installation: "https://radianos.com/documentation/installation",
			tailwind: "https://tailwindcss.com/docs/guides/vite",
		},
	},
}

export type Framework = {
	name: FrameworkName
	label: string
	link: {
		installation: string
		tailwind: string
	}
}
