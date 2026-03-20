import Image from "next/image"
import Link from "next/link"

export default function SetupLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="bg-bg relative flex min-h-svh flex-col items-center justify-center px-5 py-10">
			<header className="border-border absolute left-0 top-0 flex h-24 w-full items-center border-b px-6">
				<Link href="/" className="flex items-center gap-2.5">
					<Image
						src="https://radianos.com/favicon.ico"
						alt="Radian"
						width={32}
						height={32}
						className="rounded-md"
					/>
					<span className="font-heading text-fg text-lg font-semibold">
						Radian
					</span>
				</Link>
			</header>

			<div className="flex flex-1 items-center justify-center pt-24">
				{children}
			</div>

			<p className="text-fg-tertiary mt-auto pt-10 text-sm">
				Having trouble? Contact our team at{" "}
				<span className="text-primary font-medium">support@radian.os</span>
			</p>
		</div>
	)
}
