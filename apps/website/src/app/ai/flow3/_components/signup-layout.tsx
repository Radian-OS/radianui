import Image from "next/image"

export default function SignupLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="bg-bg flex min-h-svh w-full">
			<div className="hidden flex-1 lg:block">
				<div className="relative h-full w-full">
					<Image
						src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1920&q=80"
						alt="Abstract purple gradient background"
						fill
						className="object-cover"
						priority
					/>
				</div>
			</div>
			<div className="relative flex flex-1 flex-col items-center justify-center p-6">
				{children}
				<p className="text-fg-tertiary absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm">
					Having trouble? Contact our team at{" "}
					<span className="text-primary font-medium">support@radian.os</span>
				</p>
			</div>
		</div>
	)
}
