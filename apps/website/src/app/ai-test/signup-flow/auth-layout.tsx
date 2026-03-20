import Image from "next/image"
import { SupportFooter } from "./support-footer"

interface AuthLayoutProps {
	children: React.ReactNode
	showHeader?: boolean
	header?: React.ReactNode
}

export function AuthLayout({ children, showHeader, header }: AuthLayoutProps) {
	return (
		<div className="bg-bg flex min-h-screen w-full">
			<div className="relative flex flex-1 flex-col items-center justify-center p-6">
				{showHeader && header && (
					<div className="absolute left-0 top-0 flex w-full items-center justify-between p-8">
						{header}
					</div>
				)}
				{children}
				<div className="absolute bottom-6 left-0 w-full px-6 md:bottom-10 md:px-[296px]">
					<SupportFooter />
				</div>
			</div>
			<div className="hidden flex-1 p-6 lg:flex">
				<div className="relative h-full w-full overflow-hidden rounded-2xl">
					<Image
						src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920&q=80"
						alt="Abstract gradient background"
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-gradient-to-br from-black/60 via-purple-900/40 to-purple-600/60" />
				</div>
			</div>
		</div>
	)
}
