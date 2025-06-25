export type SpinnerVariants = "default" | "simple" | "activity" | "wave" | "snake"

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

function ActivitySpinner({ size, color, ...props }: SpinnerProps) {
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

function WaveSpinner({ size, color, ...props }: SpinnerProps) {
	return (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<style>
				{`
				@keyframes wave1 {
					0%, 100% { transform: translateY(0); }
					20% { transform: translateY(-3px); }
					40% { transform: translateY(3px); }
					60%, 80% { transform: translateY(0); }
				}
				
				@keyframes wave2 {
					0%, 20%, 100% { transform: translateY(0); }
					40% { transform: translateY(-3px); }
					60% { transform: translateY(3px); }
					80% { transform: translateY(0); }
				}
				
				@keyframes wave3 {
					0%, 40%, 100% { transform: translateY(0); }
					60% { transform: translateY(-3px); }
					80% { transform: translateY(3px); }
				}

				.wave-dot1 { animation: wave1 1s linear infinite; }
				.wave-dot2 { animation: wave2 1s linear infinite; }
				.wave-dot3 { animation: wave3 1s linear infinite; }
				`}
			</style>
			<path
				d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
				className="wave-dot3"
				stroke={color || "var(--color-text)"}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
				className="wave-dot2"
				stroke={color || "var(--color-text)"}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
				className="wave-dot1"
				stroke={color || "var(--color-text)"}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}

const SnakeSpinner = ({ size, color, className }: SpinnerProps) => {
	const spinnerStyle = {
		width: `${size}px`,
		height: `${size}px`,
		border: `${Math.round(size! * 0.16)}px solid ${color || "var(--color-text"}`,
		animation: "spinner-bulqg1 0.8s infinite linear alternate, spinner-oaa3wk 1.6s infinite linear",
	}

	return (
		<>
			<style>{`
				@keyframes spinner-bulqg1 {
					0% {
						clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
					}
					12.5% {
						clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%);
					}
					25% {
						clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 100%);
					}
					50% {
						clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
					}
					62.5% {
						clip-path: polygon(50% 50%, 100% 0, 100% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
					}
					75% {
						clip-path: polygon(50% 50%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 50% 100%, 0% 100%);
					}
					100% {
						clip-path: polygon(50% 50%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 0% 100%);
					}
				}

				@keyframes spinner-oaa3wk {
					0% {
						transform: scaleY(1) rotate(0deg);
					}
					49.99% {
						transform: scaleY(1) rotate(135deg);
					}
					50% {
						transform: scaleY(-1) rotate(0deg);
					}
					100% {
						transform: scaleY(-1) rotate(-135deg);
					}
				}
			`}</style>

			<div className={`rounded-full ${className}`} style={spinnerStyle} />
		</>
	)
}

function Spinner({ size = 36, color, variant = "default", ...props }: SpinnerProps) {
	if (variant === "default") return <DefaultSpinner size={size} color={color} {...props} />
	else if (variant === "simple") return <SimpleSpinner size={size} color={color} {...props} />
	else if (variant === "activity") return <ActivitySpinner size={size} color={color} {...props} />
	else if (variant === "wave") return <WaveSpinner size={size} color={color} {...props} />
	else if (variant === "snake") return <SnakeSpinner size={size} color={color} {...props} />
}

export { Spinner }
