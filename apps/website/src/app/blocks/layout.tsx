export const metadata = {
	robots: {
		index: false,
		follow: true,
	},
}

export default function BlocksLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return <>{children}</>
}
