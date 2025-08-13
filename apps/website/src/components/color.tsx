import React from "react"

type ColorVariant = {
	hex: string
	weight: number
}

type ColorProps = {
	variants?: ColorVariant[]
	name?: string
	defaultWeight?: number
}

export default function Color({ variants, name, defaultWeight = 600 }: ColorProps) {
	return (
		<div className="min-h-24.5 mb-5 flex flex-col items-start justify-start gap-2">
			<span className="text-fgfont-semibold">{name}</span>
			<div className="gap-1.75 flex w-full flex-wrap items-center justify-start">
				{variants?.map((variant, index) => (
					<div
						key={index}
						className={`size-16.5 relative flex cursor-pointer flex-col items-center justify-center rounded-lg text-xs transition-all duration-200`}
						style={{ background: variant.hex }}>
						{variant.weight === defaultWeight && (
							<div
								className="absolute right-2 top-2 h-2 w-2 rounded-full bg-white"
								style={{
									boxShadow: index >= 5 ? "0 0 3px rgba(0,0,0,0.3)" : "none",
								}}
							/>
						)}
						<span className={index >= 5 ? "text-white" : "text-black"}>{variant.weight}</span>
						<span className={index >= 5 ? "text-white" : "text-black"}>{variant.hex}</span>
					</div>
				))}
			</div>
		</div>
	)
}
