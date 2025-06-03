"use client"

import React, { useState } from "react"

const GradientColorPicker: React.FC = () => {
	const [color1, setColor1] = useState("#ff0000")
	const [color2, setColor2] = useState("#0000ff")
	const [showPicker, setShowPicker] = useState(false)

	const togglePicker = () => {
		console.log("Clicked")
		setShowPicker((prev) => !prev)
	}
	return (
		<div style={{ position: "relative", display: "inline-block" }}>
			{/* Gradient Preview Box */}
			<div
				onClick={togglePicker}
				style={{
					width: 60,
					height: 30,
					borderRadius: 6,
					border: "1px solid #ccc",
					background: `linear-gradient(to right, ${color1}, ${color2})`,
					cursor: "pointer",
				}}
			/>

			{/* Color Picker Panel */}
			{showPicker && (
				<div
					style={{
						position: "absolute",
						top: "40px",
						left: 0,
						padding: "10px",
						background: "#fff",
						border: "1px solid #ccc",
						borderRadius: "6px",
						boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
						zIndex: 1000,
					}}>
					<div>
						<label>
							Start: <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} />
						</label>
					</div>
					<div style={{ marginTop: "0.5rem" }}>
						<label>
							End: <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} />
						</label>
					</div>
				</div>
			)}
		</div>
	)
}

export default GradientColorPicker
