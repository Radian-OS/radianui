import Image from "next/image"

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="bg-fill1 flex min-h-screen items-center justify-center px-5 py-10">
			<div className="border-soft bg-bg flex w-full max-w-[1600px] overflow-hidden rounded-3xl border">
				<div className="hidden flex-1 p-6 lg:block">
					<div className="relative h-full min-h-[752px] overflow-hidden rounded-xl">
						<Image
							src="/media/background-2.jpg"
							alt="Decorative gradient"
							fill
							className="object-cover"
							priority
						/>
					</div>
				</div>
				<div className="flex flex-1 items-center justify-center p-6">
					<div className="w-full max-w-[400px]">{children}</div>
				</div>
			</div>
		</div>
	)
}
