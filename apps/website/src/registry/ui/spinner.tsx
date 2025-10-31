import { cn } from "@/lib/utils"

export type SpinnerVariants = "default" | "simple" | "activity" | "wave"

type SpinnerProps = React.SVGProps<SVGSVGElement> & {
	size?: number
	color?: string
	variant?: SpinnerVariants
}

function DefaultSpinner({ size, color, "aria-label": ariaLabel, className, ...props }: SpinnerProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			role="status"
			aria-label={ariaLabel || "Loading"}
			aria-live="polite"
			focusable="false"
			className={cn("origin-center animate-spin", className)}
			{...props}>
			<path
				d="M21.5 12C21.5 9.9938 20.8649 8.03909 19.6857 6.41604C18.5064 4.79299 16.8437 3.58491 14.9357 2.96496C13.0276 2.34501 10.9724 2.34501 9.06434 2.96496C7.15633 3.58491 5.49355 4.79299 4.31434 6.41604"
				stroke={color || "currentColor"}
				strokeWidth="2"
				strokeLinejoin="round"
			/>
		</svg>
	)
}
DefaultSpinner.displayName = "DefaultSpinner"

function SimpleSpinner({ size, color, "aria-label": ariaLabel, className, ...props }: SpinnerProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={cn("origin-center animate-spin", className)}
			role="status"
			aria-label={ariaLabel || "Loading"}
			aria-live="polite"
			focusable="false"
			{...props}>
			<path
				opacity="0.16"
				d="M21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12Z"
				stroke={color || "currentColor"}
				strokeWidth="3"
			/>
			<path
				d="M16.75 20.2272C18.4874 19.2241 19.8627 17.6968 20.6787 15.864C21.4947 14.0312 21.7095 11.9872 21.2924 10.0248C20.8753 8.06248 19.8476 6.28254 18.3567 4.94012C16.8658 3.59771 14.9882 2.76175 12.993 2.55204"
				stroke={color || "currentColor"}
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}
SimpleSpinner.displayName = "SimpleSpinner"

function ActivitySpinner({ size, color, "aria-label": ariaLabel, ...props }: SpinnerProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			role="status"
			aria-label={ariaLabel || "Loading"}
			aria-live="polite"
			focusable="false"
			{...props}>
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
			<path className="spinner-line" d="M12 2V6" stroke={color || "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
			{/* Top-right */}
			<path className="spinner-line" d="M16.1997 7.7999L19.0997 4.8999" stroke={color || "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
			{/* Right */}
			<path className="spinner-line" d="M18 12H22" stroke={color || "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
			{/* Bottom-right */}
			<path className="spinner-line" d="M16.1997 16.2L19.0997 19.1" stroke={color || "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
			{/* Bottom */}
			<path className="spinner-line" d="M12 18V22" stroke={color || "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
			{/* Bottom-left */}
			<path className="spinner-line" d="M4.8999 19.1L7.7999 16.2" stroke={color || "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
			{/* Left */}
			<path className="spinner-line" d="M2 12H6" stroke={color || "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
			{/* Top-left */}
			<path className="spinner-line" d="M4.8999 4.8999L7.7999 7.7999" stroke={color || "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
}
ActivitySpinner.displayName = "ActivitySpinner"

function WaveSpinner({ size, color, "aria-label": ariaLabel, ...props }: SpinnerProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			role="status"
			aria-label={ariaLabel || "Loading"}
			aria-live="polite"
			focusable="false"
			{...props}>
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
				stroke={color || "currentColor"}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
				className="wave-dot2"
				stroke={color || "currentColor"}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
				className="wave-dot1"
				stroke={color || "currentColor"}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}
WaveSpinner.displayName = "WaveSpinner"

function Spinner({ size = 36, color, variant = "default", ...props }: SpinnerProps) {
	const commonProps = {
		size,
		color,
	}

	switch (variant) {
		case "simple":
			return <SimpleSpinner {...commonProps} {...props} />
		case "activity":
			return <ActivitySpinner {...commonProps} {...props} />
		case "wave":
			return <WaveSpinner {...commonProps} {...props} />
		default:
			return <DefaultSpinner {...commonProps} {...props} />
	}
}

export { Spinner }
