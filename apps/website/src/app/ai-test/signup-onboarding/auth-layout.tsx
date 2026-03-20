import Image from "next/image"
import { SupportFooter } from "./support-footer"

export function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen w-full">
			<div className="relative hidden w-1/2 lg:block">
				<Image
					src="https://images.unsplash.com/photo-1634017839464-5c339afa560d?w=1920&q=80"
					alt="Purple gradient background"
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-gradient-to-br from-[#0a0020]/80 via-[#1a0050]/60 to-[#623df5]/40" />
			</div>
			<div className="relative flex w-full flex-col items-center justify-center px-6 lg:w-1/2">
				{children}
				<SupportFooter />
			</div>
		</div>
	)
}
