import React from "react"

const ThemeElevationCard = () => {
	const cards = [
		{ label: "2", color: "bg-yellow-50", offset: 0 },
		{ label: "1", color: "bg-yellow-100", offset: 30 }, // Increased from 6
		{ label: "base", color: "bg-yellow-200", offset: 60 }, // Increased from 12
		{ label: "-1", color: "bg-yellow-300", offset: 90 }, // Increased from 18
	]

	return (
		<div className="bg-fill2 flex h-80 gap-4 rounded-xl p-4">
			<div className="bg-bg relative flex h-full w-1/2 items-center justify-center">
				{cards.map((card, idx) => (
					<div
						key={idx}
						className={`absolute h-20 w-20 border ${card.color} flex items-center justify-center rounded-md`}
						style={{
							top: `calc(50% + ${card.offset}px - 40px)`,
							left: "50%",
							transform: "translateX(-50%) rotate(45deg)",
							zIndex: cards.length - idx,
						}}>
						{card.label}
					</div>
				))}
			</div>
			<div className="flex w-1/2 items-center justify-center bg-green-300">dark</div>
		</div>
	)
}

export default ThemeElevationCard
