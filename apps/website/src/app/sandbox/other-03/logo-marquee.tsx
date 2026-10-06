import { LogoIcon } from "./logo-icon"

/**
 * 8 unique abstract geometric logo designs.
 * Each is used as a company partner logo in the marquee grid.
 */
const LOGO_VARIANTS = [
	"asterisk",
	"bowtie",
	"arch",
	"pixels",
	"eye",
	"chevrons",
	"cross",
	"diamond",
] as const

export type LogoVariant = (typeof LOGO_VARIANTS)[number]

/**
 * Row configuration for the marquee.
 * direction: "left" | "right" — scroll direction
 * logos: ordered list of logo variants in the row
 * duration: animation duration in seconds (slower = more chill)
 */
const MARQUEE_ROWS: {
	direction: "left" | "right"
	logos: LogoVariant[]
	duration: number
}[] = [
	{
		direction: "left",
		logos: [
			"chevrons",
			"asterisk",
			"cross",
			"bowtie",
			"arch",
			"pixels",
			"eye",
			"diamond",
		],
		duration: 30,
	},
	{
		direction: "right",
		logos: [
			"eye",
			"arch",
			"chevrons",
			"pixels",
			"bowtie",
			"cross",
			"diamond",
			"asterisk",
		],
		duration: 35,
	},
	{
		direction: "left",
		logos: [
			"pixels",
			"diamond",
			"asterisk",
			"bowtie",
			"arch",
			"eye",
			"cross",
			"chevrons",
		],
		duration: 28,
	},
	{
		direction: "right",
		logos: [
			"cross",
			"eye",
			"arch",
			"asterisk",
			"chevrons",
			"diamond",
			"bowtie",
			"pixels",
		],
		duration: 32,
	},
]

export function LogoMarquee() {
	return (
		<div className="mask-gradient relative flex flex-col gap-3 overflow-hidden py-4">
			{MARQUEE_ROWS.map((row, rowIndex) => (
				<div key={rowIndex} className="flex overflow-hidden" aria-hidden="true">
					<div
						className={`flex shrink-0 gap-3 ${
							row.direction === "left"
								? "animate-marquee-left"
								: "animate-marquee-right"
						}`}
						style={
							{
								"--marquee-duration": `${row.duration}s`,
							} as React.CSSProperties
						}>
						{/* Double the logos for seamless infinite scroll */}
						{[...row.logos, ...row.logos].map((variant, i) => (
							<div
								key={`${variant}-${i}`}
								className="bg-fill2 text-fg hover:bg-fill3 hover:text-fg flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 hover:shadow-md md:h-[84px] md:w-[84px]">
								<LogoIcon
									variant={variant}
									className="h-8 w-8 md:h-10 md:w-10"
								/>
							</div>
						))}
					</div>
					{/* Duplicate track for seamless loop */}
					<div
						className={`flex shrink-0 gap-3 ${
							row.direction === "left"
								? "animate-marquee-left"
								: "animate-marquee-right"
						}`}
						style={
							{
								"--marquee-duration": `${row.duration}s`,
							} as React.CSSProperties
						}>
						{[...row.logos, ...row.logos].map((variant, i) => (
							<div
								key={`dup-${variant}-${i}`}
								className="bg-fill2 text-fg hover:bg-fill3 hover:text-fg flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 hover:shadow-md md:h-[84px] md:w-[84px]">
								<LogoIcon
									variant={variant}
									className="h-8 w-8 md:h-10 md:w-10"
								/>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	)
}
