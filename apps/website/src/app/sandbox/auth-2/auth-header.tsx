import Link from "next/link"
import { AuthLogo } from "./auth-logo"

export function AuthHeader() {
	return (
		<header className="flex items-center justify-between">
			<AuthLogo />
			<p className="text-fg-secondary text-[14px] leading-normal font-normal">
				Already on ReUI?{" "}
				<Link
					href="#"
					className="text-fg hover:text-primary inline border-0 bg-transparent p-0 font-semibold shadow-none transition-colors outline-none">
					Sign in
				</Link>
			</p>
		</header>
	)
}
