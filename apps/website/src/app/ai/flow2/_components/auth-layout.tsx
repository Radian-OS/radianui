import Image from "next/image"

export default function AuthLayout({
	children,
	showHeader = false,
	email,
}: {
	children: React.ReactNode
	showHeader?: boolean
	email?: string
}) {
	return (
		<div className="bg-bg flex min-h-svh">
			<div className="relative flex flex-1 flex-col items-center justify-center p-6">
				{showHeader && (
					<div className="absolute left-0 top-0 flex w-full items-center justify-between p-8">
						<Image
							src="https://radianos.com/favicon.ico"
							alt="Radian Logo"
							width={32}
							height={32}
							className="rounded-md"
						/>
						<div className="flex items-center gap-1">
							<button className="text-fg-secondary hover:text-fg flex items-center gap-1 text-sm font-medium transition-colors">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="size-5">
									<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
									<polyline points="16 17 21 12 16 7" />
									<line x1="21" y1="12" x2="9" y2="12" />
								</svg>
								Sign out
							</button>
							{email && (
								<span className="text-fg-tertiary text-sm">({email})</span>
							)}
						</div>
					</div>
				)}
				{children}
				<p className="text-fg-tertiary absolute bottom-8 text-sm">
					Having trouble? Contact our team at{" "}
					<span className="text-primary font-medium">support@radian.os</span>
				</p>
			</div>
			<div className="hidden flex-1 p-6 lg:block">
				<div className="relative h-full w-full overflow-hidden rounded-2xl">
					<Image
						src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1920&q=80"
						alt="Abstract purple gradient background"
						fill
						className="object-cover"
						priority
					/>
				</div>
			</div>
		</div>
	)
}
