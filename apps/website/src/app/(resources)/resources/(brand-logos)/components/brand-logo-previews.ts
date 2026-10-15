export const brandLogoCover = {
	light: "/brand-logos/cover/light.png",
	dark: "/brand-logos/cover/dark.png",
	alt: "Brand logos in social profiles, sign-in buttons, and workspace integrations",
} as const

const descriptions = [
	"Workspace integrations with Figma and GitHub logos",
	"Sign-in form with Google and GitHub buttons",
	"Workspace sidebar with Notion, Figma, and Gmail icons",
	"YouTube, Linear, and Cursor integration cards",
	"Pinterest profile card with its brand logo",
	"Command menu with Figma, VS Code, and Airtable icons",
	"Service picker with Vercel, GitHub, and VS Code logos",
	"Landing page with Zoom, Linear, Asana, Notion, Cursor, and Vercel wordmarks",
] as const

export const brandLogoUseCasePreviews = descriptions.map((alt, index) => ({
	light: `/brand-logos/scroll-section/${index + 1}.png`,
	dark: `/brand-logos/scroll-section/${index + 1}-dark.png`,
	alt,
}))
