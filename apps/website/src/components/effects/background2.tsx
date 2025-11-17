"use client"

import React, { useState } from "react"
import Aurora from "../home/aurora"
import { FlickeringGrid } from "./flickering"

export default function Background2({ children }: { children?: React.ReactNode }) {
	const [speed, setSpeed] = useState(0.3)
	const [blend, setBlend] = useState(1)
	const [amplitude, setAmplitude] = useState(1)
	const [colorStops, setColorStops] = useState(["#6F26E9", "#D730FE", "#853EFE"])

	const updateColor = (index: number, value: string) => {
		const updated = [...colorStops]
		updated[index] = value
		setColorStops(updated)
	}

	return (
		<div className="relative w-full px-4 md:px-5">
			{/* Aurora */}
			<div className="absolute inset-0 top-[380px] z-20 max-h-[960px] overflow-clip">
				<Aurora colorStops={colorStops.map((c) => c + "80")} blend={blend} amplitude={amplitude} speed={speed} />
			</div>

			{/* Neutral background overlay */}
			<div className="from-bg via-bg/0 to-bg bg-linear-to-b absolute inset-0 top-[380px] z-20 h-full max-h-[960px] w-full to-90%" />

			{/* Flickering grid */}
			<FlickeringGrid
				className="absolute inset-0 top-[380px] z-10 max-h-[960px] w-full overflow-hidden"
				squareSize={4}
				gridGap={6}
				color="#6B7280"
				maxOpacity={0.4}
				flickerChance={0.4}
			/>

			<div className="relative z-50 w-full">{children}</div>

			{/* Controls */}
			<div className="relative z-50 mb-6 w-full space-y-4 rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur">
				<div className="flex flex-col gap-2">
					<label>Speed: {speed}</label>
					<input type="range" min={0} max={2} step={0.01} value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} />
				</div>

				<div className="flex flex-col gap-2">
					<label>Blend: {blend}</label>
					<input type="range" min={0} max={2} step={0.01} value={blend} onChange={(e) => setBlend(parseFloat(e.target.value))} />
				</div>

				<div className="flex flex-col gap-2">
					<label>Amplitude: {amplitude}</label>
					<input type="range" min={0} max={3} step={0.01} value={amplitude} onChange={(e) => setAmplitude(parseFloat(e.target.value))} />
				</div>

				<div className="grid grid-cols-3 gap-4">
					{colorStops.map((color, i) => (
						<div key={i} className="flex flex-col gap-2">
							<label>Color {i + 1}</label>
							<input type="color" value={color} onChange={(e) => updateColor(i, e.target.value)} />
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
