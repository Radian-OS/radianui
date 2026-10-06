"use client"

import type { LogoVariant } from "./logo-marquee"

const ICON_MAP: Record<LogoVariant, React.FC<{ className?: string }>> = {
	asterisk: ({ className }) => (
		<div className={className}>
			<svg
				viewBox="0 0 40 40"
				fill="currentColor"
				xmlns="http://www.w3.org/2000/svg">
				<path d="M20 4L23.5 15.5L34 11L25 20L34 29L23.5 24.5L20 36L16.5 24.5L6 29L15 20L6 11L16.5 15.5L20 4Z" />
			</svg>
		</div>
	),
	bowtie: ({ className }) => (
		<div className={className}>
			<svg
				viewBox="0 0 40 40"
				fill="currentColor"
				xmlns="http://www.w3.org/2000/svg">
				<path d="M8 10L18 20L8 30V10Z" />
				<path d="M32 10L22 20L32 30V10Z" />
			</svg>
		</div>
	),
	arch: ({ className }) => (
		<div className={className}>
			<svg
				viewBox="0 0 40 40"
				fill="currentColor"
				xmlns="http://www.w3.org/2000/svg">
				<path d="M8 32V18C8 11.4 13.4 6 20 6C26.6 6 32 11.4 32 18V32H26V18C26 14.7 23.3 12 20 12C16.7 12 14 14.7 14 18V32H8Z" />
			</svg>
		</div>
	),
	pixels: ({ className }) => (
		<div className={className}>
			<svg
				viewBox="0 0 40 40"
				fill="currentColor"
				xmlns="http://www.w3.org/2000/svg">
				<rect x="6" y="6" width="12" height="12" />
				<rect x="22" y="6" width="12" height="12" />
				<rect x="6" y="22" width="12" height="12" />
				<rect x="26" y="26" width="8" height="8" />
			</svg>
		</div>
	),
	eye: ({ className }) => (
		<div className={className}>
			<svg
				viewBox="0 0 40 40"
				fill="currentColor"
				xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="20" r="7" />
				<rect x="24" y="14" width="6" height="12" rx="3" />
			</svg>
		</div>
	),
	chevrons: ({ className }) => (
		<div className={className}>
			<svg
				viewBox="0 0 40 40"
				fill="currentColor"
				xmlns="http://www.w3.org/2000/svg">
				<path d="M6 14L14 20L6 26V14Z" />
				<path d="M14 14L22 20L14 26V14Z" />
				<path d="M24 16L28 20L24 24V16Z" />
				<path d="M30 17L33 20L30 23V17Z" />
			</svg>
		</div>
	),
	cross: ({ className }) => (
		<div className={className}>
			<svg
				viewBox="0 0 40 40"
				fill="currentColor"
				xmlns="http://www.w3.org/2000/svg">
				<path d="M16 6H24V16H34V24H24V34H16V24H6V16H16V6Z" />
			</svg>
		</div>
	),
	diamond: ({ className }) => (
		<div className={className}>
			<svg
				viewBox="0 0 40 40"
				fill="currentColor"
				xmlns="http://www.w3.org/2000/svg">
				<path d="M20 4C23 11 29 17 36 20C29 23 23 29 20 36C17 29 11 23 4 20C11 17 17 11 20 4Z" />
			</svg>
		</div>
	),
}

interface LogoIconProps {
	variant: LogoVariant
	className?: string
}

export function LogoIcon({ variant, className }: LogoIconProps) {
	const Icon = ICON_MAP[variant]
	return <Icon className={className} />
}
