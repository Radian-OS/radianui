// "use client"

// import { useState } from "react"
// import { Minus, Plus } from "lucide-react"
// import { Button, IconButton } from "@/registry/ui/button"
// import { Input } from "@/registry/ui/input"
// import { Slider, SliderThumb } from "@/registry/ui/slider"
// import { Avatar, AvatarFallback, AvatarImage, AvatarStatus } from "./avatar"
// // import {
// // 	Avatar as A,
// // 	AvatarFallback as AF,
// // 	AvatarImage as AI,
// // 	AvatarStatus as AS,
// // } from "./avatara"

// const SAMPLES = [
// 	{ id: "img", src: "https://i.pravatar.cc/150?img=67", fallback: "YB" },

// 	{ id: "mk", src: undefined, fallback: "MK" },
// ]

// const SAMPLES1 = [
// 	{ id: "img", src: "https://i.pravatar.cc/150?img=67", fallback: "YB" },

// 	{ id: "mk", src: undefined, fallback: "MK" },
// ]

// type Rounded = "circle" | "square"
// type StatusVariant = "online" | "offline" | "busy" | "away"

// const ROUNDED_OPTIONS: Rounded[] = ["circle", "square"]
// const STATUS_OPTIONS: Array<StatusVariant | "none"> = [
// 	"none",
// 	"online",
// 	"offline",
// 	"busy",
// 	"away",
// ]

// function getFontSize(size: number): number {
// 	return Math.round(Math.max(size * 0.32))
// }
// function getSquareRadius(size: number): number {
// 	return Math.round(size * 0.17)
// }
// function getDot2Size(size: number): number {
// 	return Math.round(size * 0.2)
// }
// function getDot16Size(size: number): number {
// 	return Math.round(size * 0.16)
// }
// function getBorderWidth(size: number): number {
// 	return Math.max(1, Math.round(size * 0.05))
// }

// type ScalingRow = {
// 	label: string
// 	ratio: number
// 	unit: string
// 	value: (size: number) => number
// }

// const SCALING_ROWS16: ScalingRow[] = [
// 	{ label: "fontSize", ratio: 0.32, unit: "px", value: getFontSize },
// 	{ label: "borderRadius", ratio: 0.17, unit: "px", value: getSquareRadius },
// 	{ label: "dotSize", ratio: 0.16, unit: "px", value: getDot16Size },
// 	{ label: "borderWidth", ratio: 0.05, unit: "px", value: getBorderWidth },
// ]

// const SCALING_ROWS2: ScalingRow[] = [
// 	{ label: "fontSize", ratio: 0.32, unit: "px", value: getFontSize },
// 	{ label: "borderRadius", ratio: 0.17, unit: "px", value: getSquareRadius },
// 	{ label: "dotSize", ratio: 0.2, unit: "px", value: getDot2Size },
// 	{ label: "borderWidth", ratio: 0.05, unit: "px", value: getBorderWidth },
// ]

// export default function AvatarPlayground() {
// 	const [size, setSize] = useState(40)
// 	const [inputVal, setInputVal] = useState("40")
// 	const [rounded, setRounded] = useState<Rounded>("circle")
// 	const [status, setStatus] = useState<StatusVariant | "none">("none")

// 	function applySize(val: number) {
// 		const clamped = Math.min(Math.max(val))
// 		setSize(clamped)
// 		setInputVal(String(clamped))
// 	}

// 	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
// 		setInputVal(e.target.value)
// 	}

// 	function handleInputCommit() {
// 		const parsed = parseInt(inputVal, 10)
// 		if (!isNaN(parsed)) {
// 			applySize(parsed)
// 		} else {
// 			setInputVal(String(size))
// 		}
// 	}

// 	return (
// 		<div className="bg-background min-h-screen p-8">
// 			<Avatar size={40} className="size-5" rounded="circle">
// 				<AvatarImage src="https://i.pravatar.cc/150?img=67" />
// 				<AvatarFallback className="rounded-none size-5">YB</AvatarFallback>
// 				<AvatarStatus className=" top-0 right-0" variant="online" />
// 			</Avatar>

// 		</div>
// 	)
// }
