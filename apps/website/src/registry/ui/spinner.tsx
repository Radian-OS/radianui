export type SpinnerVariants = "default" | "simple" | "spinner" | "wave"

type SpinnerProps = React.SVGProps<SVGSVGElement> & {
	size?: number
	color?: string
	variant?: SpinnerVariants
}

function DefaultSpinner({ size, color, ...props }: SpinnerProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" {...props} className="animate-spin">
			<path
				d="M11.75 21.5C13.7562 21.5 15.7109 20.8649 17.334 19.6857C18.957 18.5064 20.1651 16.8437 20.785 14.9357C21.405 13.0276 21.405 10.9724 20.785 9.06434C20.1651 7.15633 18.957 5.49355 17.334 4.31434"
				stroke={color || "var(--color-text)"}
				strokeWidth={2}
				strokeLinejoin="round"
			/>
		</svg>
	)
}

function SimpleSpinner({ size, color, ...props }: SpinnerProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className="animate-spin" {...props}>
			<circle opacity={0.16} cx={12} cy={12} r={9.5} stroke="var(--color-text-secondary)" strokeWidth={3} />
			<path
				d="M3.52276 16.75C4.52586 18.4874 6.05324 19.8627 7.886 20.6787C9.71876 21.4947 11.7628 21.7095 13.7252 21.2924C15.6875 20.8753 17.4675 19.8476 18.8099 18.3567C20.1523 16.8658 20.9883 14.9882 21.198 12.993"
				stroke={color || "var(--color-text)"}
				strokeWidth={3}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}

function SpinnerSpinner({ size, color, ...props }: SpinnerProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
			<style>
				{`
					.spinner-line {
						animation: spinner-fade 1.2s linear infinite;
					}
					.spinner-line:nth-child(2) { animation-delay: 0s; }
					.spinner-line:nth-child(3) { animation-delay: -1.05s; }
					.spinner-line:nth-child(4) { animation-delay: -0.9s; }
					.spinner-line:nth-child(5) { animation-delay: -0.75s; }
					.spinner-line:nth-child(6) { animation-delay: -0.6s; }
					.spinner-line:nth-child(7) { animation-delay: -0.45s; }
					.spinner-line:nth-child(8) { animation-delay: -0.3s; }
					.spinner-line:nth-child(9) { animation-delay: -0.15s; }
					
					@keyframes spinner-fade {
						0%, 12.5% { opacity: 0.9; }
						100% { opacity: 0.125; }
					}
				`}
			</style>
			{/* Top */}
			<path className="spinner-line" d="M12 2V6" stroke={color || "var(--color-text)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
			{/* Top-right */}
			<path className="spinner-line" d="M16.1997 7.7999L19.0997 4.8999" stroke={color || "var(--color-text)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
			{/* Right */}
			<path className="spinner-line" d="M18 12H22" stroke={color || "var(--color-text)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
			{/* Bottom-right */}
			<path className="spinner-line" d="M16.1997 16.2L19.0997 19.1" stroke={color || "var(--color-text)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
			{/* Bottom */}
			<path className="spinner-line" d="M12 18V22" stroke={color || "var(--color-text)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
			{/* Bottom-left */}
			<path className="spinner-line" d="M4.8999 19.1L7.7999 16.2" stroke={color || "var(--color-text)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
			{/* Left */}
			<path className="spinner-line" d="M2 12H6" stroke={color || "var(--color-text)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
			{/* Top-left */}
			<path className="spinner-line" d="M4.8999 4.8999L7.7999 7.7999" stroke={color || "var(--color-text)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
}

function Spinner({ size = 36, color, variant = "default", ...props }: SpinnerProps) {
	if (variant === "default") return <DefaultSpinner size={size} color={color} {...props} />
	else if (variant === "simple") return <SimpleSpinner size={size} color={color} {...props} />
	else if (variant === "spinner") return <SpinnerSpinner size={size} color={color} {...props} />
}

export { Spinner }
