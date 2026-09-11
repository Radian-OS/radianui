import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface BlogExampleCardProps {
	title: string
	description: string
	href?: string
	logo?:
		| "radian"
		| "untitledui"
		| "untitled-ui"
		| "relume"
		| "shadcn"
		| "google"
		| "material"
		| "ibm"
		| "apple"
		| "atlassian"
		| string
	logoNode?: React.ReactNode
	className?: string
}

function DefaultLogo({ name }: { name?: string }) {
	switch (name?.toLowerCase()) {
		case "radian":
			return (
				<div className="flex items-center gap-2">
					<div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-linear-to-b from-[#623DF5] to-[#9981F8] text-white shadow-xs">
						<svg width="15" height="15" viewBox="0 0 28 28" fill="none">
							<path
								d="M20.1964 15.1116C20.4531 15.6473 20.2272 16.3147 20.0611 16.856C19.7456 17.7632 19.2052 18.5612 18.4968 19.2033C18.1459 19.5347 17.7707 19.8249 17.3404 20.0545C15.5848 21.0345 13.2487 21.0103 11.5164 19.9929C10.8015 19.5683 9.82987 18.9495 10.3815 18.0003C10.5868 17.6941 10.8817 17.3479 11.2532 17.3927C11.5117 17.4281 11.732 17.7007 11.9392 17.8715C12.4759 18.3325 13.0769 18.606 13.8208 18.746C14.9436 18.9457 16.1467 18.6135 17.0193 17.8873C17.7081 17.3068 18.1711 16.52 18.3269 15.6212C18.3829 15.3123 18.4165 14.8736 18.6769 14.7028C19.1072 14.4331 19.9491 14.6487 20.1927 15.1041L20.1955 15.1097L20.1964 15.1116Z"
								fill="white"
							/>
							<path
								d="M24.2181 9.8821C24.3852 9.91944 24.3423 10.2984 24.2517 10.443C24.0931 10.6941 23.5536 11.0488 22.4028 11.6246C17.3703 13.9608 12.7689 15.5792 6.44187 17.2685C5.62427 17.4869 5.01667 17.542 4.564 17.542C4.11134 17.542 3.31707 17.388 3.9032 16.9941C4.48934 16.6002 4.7544 16.4453 4.94107 16.3361C7.21374 15.0714 7.10547 14.1652 7.89227 11.8477C9.0356 8.0845 13.5212 6.3513 17.0259 7.97157C18.2989 8.53997 19.1044 9.54704 20.4717 9.88957C21.2436 10.0846 22.3505 10.0678 23.1607 9.9829C23.4827 9.98664 23.898 9.81024 24.2172 9.8821H24.2181ZM11.8841 13.8208C13.2841 13.3196 14.9352 12.7661 16.1047 12.3162C16.4659 12.1762 16.8028 12.0717 17.1761 11.8962C17.3404 11.8178 17.4953 11.6984 17.6633 11.5285C18.186 10.9666 16.7244 10.1481 16.3044 9.92317C13.4764 8.44104 10.1388 10.318 9.74867 13.4362C9.6796 14.0933 9.9288 14.3686 10.5747 14.2249C11.0227 14.1288 11.4819 13.9598 11.8757 13.8226L11.8832 13.8198L11.8841 13.8208Z"
								fill="white"
							/>
						</svg>
					</div>
					<span className="text-fg text-sm font-semibold tracking-tight">
						Radian
					</span>
				</div>
			)
		case "untitledui":
		case "untitled-ui":
			return (
				<div className="flex items-center gap-2">
					<div className="relative flex size-5 shrink-0 items-center justify-center rounded-full bg-linear-to-tr from-[#6172F3] via-[#8098F9] to-[#E31B54] shadow-xs">
						<div className="size-1.5 rounded-full bg-white/70" />
					</div>
					<span className="text-fg text-sm font-semibold tracking-tight">
						Untitled UI
					</span>
				</div>
			)
		case "relume":
			return (
				<div className="flex items-center gap-2">
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						className="shrink-0">
						<path d="M12 2L20.66 7V17L12 22L3.34 17V7L12 2Z" fill="#18181B" />
						<path d="M12 2L20.66 7L12 12L3.34 7L12 2Z" fill="#F04438" />
						<path d="M12 12L20.66 7V17L12 22V12Z" fill="#D92D20" />
						<path d="M12 12L3.34 7V17L12 22V12Z" fill="#18181B" />
					</svg>
					<span className="text-fg text-sm font-semibold tracking-tight">
						Relume
					</span>
				</div>
			)
		case "shadcn":
			return (
				<div className="flex items-center gap-2">
					<svg
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="text-fg shrink-0">
						<path d="M16 4L4 16" />
						<path d="M14 20h6" />
					</svg>
					<span className="text-fg text-sm font-semibold tracking-tight">
						shadcn/ui
					</span>
				</div>
			)
		case "google":
		case "material":
			return (
				<div className="flex items-center">
					<span className="text-lg font-medium tracking-tight select-none">
						<span className="text-[#4285F4]">G</span>
						<span className="text-[#EA4335]">o</span>
						<span className="text-[#FBBC05]">o</span>
						<span className="text-[#4285F4]">g</span>
						<span className="text-[#34A853]">l</span>
						<span className="text-[#EA4335]">e</span>
					</span>
				</div>
			)
		case "ibm":
			return (
				<div className="flex items-center">
					<svg
						width="58"
						height="24"
						viewBox="0 0 24 24"
						className="fill-current text-[#0F62FE]">
						<path d="M23.544 15.993q.059 0 .06-.053v-.036q-.001-.052-.06-.052h-.09v.14zm-.09.262h-.121v-.498h.225c.112 0 .169.066.169.157c0 .079-.036.129-.09.15l.111.19h-.133l-.092-.17h-.07zm.434-.222v-.062c0-.2-.157-.357-.363-.357a.355.355 0 0 0-.363.357v.062c0 .2.156.358.363.358a.355.355 0 0 0 .363-.358m-.838-.03c0-.28.212-.492.475-.492c.264 0 .475.213.475.491a.477.477 0 0 1-.475.491a.477.477 0 0 1-.475-.49M16.21 8.13l-.216-.624h-3.56v.624zm.413 1.19l-.216-.623h-3.973v.624zm2.65 7.147h3.107v-.624h-3.108zm0-1.192h3.107v-.623h-3.108zm0-1.19h1.864v-.624h-1.865zm0-1.191h1.864v-.624h-1.865zm0-1.191h1.864v-.624h-3.555l-.175.504l-.175-.504h-3.555v.624h1.865v-.574l.2.574h3.33l.2-.574zm1.864-1.815h-3.142l-.217.624h3.359zm-7.46 3.006h1.865v-.624h-1.865zm0 1.19h1.865v-.623h-1.865zm-1.243 1.191h3.108v-.623h-3.108zm0 1.192h3.108v-.624h-3.108zm6.386-8.961l-.216.624h3.776v-.624zm-.629 1.815h4.19v-.624h-3.974zm-4.514 1.19h3.359l-.216-.623h-3.143zm2.482 2.383h2.496l.218-.624h-2.932zm.417 1.19h1.662l.218-.623h-2.098zm.416 1.191h.83l.218-.623h-1.266zm.414 1.192l.217-.624h-.432zm-12.433-.006l4.578.006c.622 0 1.18-.237 1.602-.624h-6.18zm4.86-3v.624h2.092q-.002-.325-.083-.624zm-3.616.624h1.865v-.624H6.217zm3.617-3.573h2.008q.081-.3.083-.624H9.834zm-3.617 0h1.865v-.624H6.217zM9.55 7.507H4.973v.624h6.18a2.36 2.36 0 0 0-1.602-.624zm2.056 1.191H4.973v.624h6.884a2.4 2.4 0 0 0-.25-.624zm-5.39 2.382v.624h4.87c.207-.176.382-.387.519-.624zm4.87 1.191h-4.87v.624h5.389a2.4 2.4 0 0 0-.519-.624m-6.114 3.006h6.634c.11-.193.196-.402.25-.624H4.973z" />
					</svg>
				</div>
			)
		case "apple":
			return (
				<div className="flex items-center gap-1.5">
					<svg
						width="16"
						height="18"
						viewBox="0 0 19 22"
						fill="currentColor"
						className="text-fg shrink-0">
						<path d="M15.2338 11.4865C15.2447 10.6586 15.4699 9.84681 15.8886 9.12672C16.3072 8.40664 16.9056 7.80163 17.628 7.36799C17.1691 6.72804 16.5636 6.20139 15.8597 5.82987C15.1558 5.45835 14.3728 5.25218 13.573 5.22775C11.8669 5.05291 10.2129 6.22446 9.34349 6.22446C8.45726 6.22446 7.11869 5.24511 5.67725 5.27406C4.74489 5.30347 3.83624 5.56817 3.03982 6.04236C2.2434 6.51656 1.58638 7.18408 1.13277 7.97988C-0.832126 11.3012 0.633512 16.1825 2.51575 18.8673C3.45748 20.1819 4.55808 21.6504 5.99822 21.5983C7.40747 21.5413 7.9338 20.721 9.63488 20.721C11.3202 20.721 11.814 21.5983 13.2833 21.5652C14.7955 21.5413 15.7483 20.2447 16.657 18.9176C17.3336 17.9809 17.8543 16.9456 18.1997 15.8501C17.3212 15.4874 16.5714 14.8801 16.044 14.1041C15.5166 13.3282 15.2348 12.4178 15.2338 11.4865Z" />
						<path d="M12.4586 3.46242C13.2832 2.49608 13.6894 1.25402 13.591 0C12.3313 0.129167 11.1678 0.716936 10.3321 1.64619C9.92353 2.10016 9.61061 2.6283 9.41122 3.20041C9.21184 3.77251 9.1299 4.37738 9.1701 4.98042C9.80016 4.98675 10.4235 4.85343 10.9931 4.59048C11.5627 4.32754 12.0638 3.94183 12.4586 3.46242Z" />
					</svg>
					<span className="text-fg text-sm font-semibold tracking-tight">
						Apple
					</span>
				</div>
			)
		case "atlassian":
			return (
				<div className="flex items-center gap-1.5">
					<svg
						fill="#0052CC"
						role="img"
						viewBox="0 0 24 24"
						className="size-4 shrink-0">
						<path d="M7.12 11.084a.683.683 0 00-1.16.126L.075 22.974a.703.703 0 00.63 1.018h8.19a.678.678 0 00.63-.39c1.767-3.65.696-9.203-2.406-12.52zM11.434.386a15.515 15.515 0 00-.906 15.317l3.95 7.9a.703.703 0 00.628.388h8.19a.703.703 0 00.63-1.017L12.63.38a.664.664 0 00-1.196.006z" />
					</svg>
					<span className="text-xs font-bold tracking-wider text-[#0052CC]">
						ATLASSIAN
					</span>
				</div>
			)
		default:
			return (
				<div className="flex items-center gap-2">
					<div className="bg-fill3 text-fg-secondary flex size-5 items-center justify-center rounded text-xs font-semibold">
						{name?.charAt(0)?.toUpperCase() || "•"}
					</div>
					<span className="text-fg text-sm font-semibold tracking-tight">
						{name}
					</span>
				</div>
			)
	}
}

export function BlogExampleCard({
	title,
	description,
	href,
	logo,
	logoNode,
	className,
}: BlogExampleCardProps) {
	const content = (
		<div
			className={cn(
				"group border-border/70 bg-fill1/40 hover:bg-fill1/70 hover:border-border relative flex flex-col items-start gap-4 rounded-2xl border p-4 transition-all duration-200 hover:shadow-2xs sm:flex-row sm:items-center sm:gap-6 sm:p-5",
				href && "cursor-pointer",
				className
			)}>
			{/* Logo Box Container */}
			<div className="border-border/80 bg-bg flex h-[72px] w-[136px] shrink-0 items-center justify-center rounded-xl border px-3 py-2 shadow-2xs transition-transform duration-200 group-hover:scale-[1.02] sm:w-[148px]">
				{logoNode ? logoNode : <DefaultLogo name={logo} />}
			</div>

			{/* Text Content */}
			<div className="min-w-0 flex-1">
				<h3 className="text-fg group-hover:text-primary text-base font-semibold tracking-tight transition-colors sm:text-[17px]">
					{title}
				</h3>
				<p className="text-fg-secondary mt-1 text-sm leading-relaxed">
					{description}
				</p>
			</div>
		</div>
	)

	if (href) {
		const isExternal = href.startsWith("http")
		if (isExternal) {
			return (
				<a
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					className="block no-underline">
					{content}
				</a>
			)
		}
		return (
			<Link href={href} className="block no-underline">
				{content}
			</Link>
		)
	}

	return content
}

export function BlogExampleCardGroup({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) {
	return (
		<div className={cn("my-6 flex flex-col gap-4", className)}>{children}</div>
	)
}
