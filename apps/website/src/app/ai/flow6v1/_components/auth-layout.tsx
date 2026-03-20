import Image from "next/image"

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="bg-elevation-negative flex min-h-svh items-center justify-center p-5">
			<div className="border-soft bg-bg flex w-full max-w-[1600px] overflow-hidden rounded-3xl border">
				<div className="hidden flex-1 p-6 lg:block">
					<div className="relative h-full w-full overflow-hidden rounded-xl">
						<Image
							src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1920&q=80"
							alt="Abstract purple gradient background"
							fill
							className="object-cover"
							priority
						/>
					</div>
				</div>
				<div className="flex flex-1 items-center justify-center p-6">
					{children}
				</div>
			</div>
		</div>
	)
}
