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
		<main className="relative w-full">
			<div className="z-99 absolute left-1/2 top-0 -translate-x-1/2 transform">
				<DesktopThemeToggler />
			</div>
			{children}
		</main>
	)
}
