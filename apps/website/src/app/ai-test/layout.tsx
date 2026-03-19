import { DesktopThemeToggler } from "@/components/theme-toggler"

export const metadata = {
	robots: {
		index: false,
		follow: true,
	},
}

export default function BlocksLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<DesktopThemeToggler />
			{children}
		</>
	)
}
