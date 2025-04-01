import React from "react"

interface ColorVariant {
	hex: string
	weight: number
}

interface ColorProps {
	variants?: ColorVariant[]
	name?: string
	defaultWeight?: number
}

const Color = ({
	variants,
	name,
	defaultWeight = 600, // Default to 600 if not specified
}: ColorProps) => {
	const handleColorClick = async (hex: string) => {
		try {
			await navigator.clipboard.writeText(hex)
		} catch (err) {
			console.error("Failed to copy color:", err)
		}
	}

	return (
		<div className="mb-5 flex min-h-24.5 flex-col items-start justify-start gap-2">
			<h1 className="body-base font-semibold">{name}</h1>
			<div className="flex w-full flex-wrap items-center justify-start gap-[7.4px]">
				{variants?.map((variant, index) => (
					<div
						key={index}
						onClick={() => handleColorClick(variant.hex)}
						className="body-xs relative flex cursor-pointer flex-col items-center justify-center transition-all duration-200"
						style={{
							height: "66px",
							width: "66px",
							background: variant.hex,
							borderRadius: "8px",
						}}>
						{variant.weight === defaultWeight && (
							<div
								className="absolute top-2 right-2 h-2 w-2 rounded-full bg-white"
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

export default Color
