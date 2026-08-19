"use client"

import { useRef } from "react"
import type { CSSProperties } from "react"

const STAGE_WIDTH = 1440
const STAGE_HEIGHT = 800
const IMAGE_SCALE = 0.75
const ASSET_BASE = "/newhome/card-6-assets"

const imageColumns = [
	{ width: 550, tiles: ["01", "02"] },
	{ width: 320, tiles: ["03", "04", "05"] },
	{ width: 280, tiles: ["06", "07"] },
	{ width: 460, tiles: ["08"] },
	{ width: 520, tiles: ["09", "10", "11"] },
	{ width: 316, tiles: ["12", "13", "14"] },
	{ width: 320, tiles: ["15", "16", "17"] },
	{ width: 500, tiles: ["18", "19"] },
	{ width: 520, tiles: ["20", "21"] },
	{ width: 520, tiles: ["22", "23"] },
] as const

const tileDimensions: Record<string, { width: number; height: number }> = {
	"01": { width: 550, height: 580 },
	"02": { width: 550, height: 706 },
	"03": { width: 320, height: 370 },
	"04": { width: 320, height: 474 },
	"05": { width: 320, height: 400 },
	"06": { width: 280, height: 919 },
	"07": { width: 280, height: 384 },
	"08": { width: 460, height: 1024 },
	"09": { width: 536, height: 656 },
	"10": { width: 520, height: 372 },
	"11": { width: 520, height: 436 },
	"12": { width: 316, height: 190 },
	"13": { width: 316, height: 448 },
	"14": { width: 316, height: 485 },
	"15": { width: 336, height: 396 },
	"16": { width: 320, height: 492 },
	"17": { width: 320, height: 241 },
	"18": { width: 500, height: 670 },
	"19": { width: 500, height: 650 },
	"20": { width: 520, height: 616 },
	"21": { width: 520, height: 410 },
	"22": { width: 520, height: 484 },
	"23": { width: 520, height: 938 },
}

type ColumnStyle = CSSProperties & {
	"--column-width": string
}

type TileStyle = CSSProperties & {
	"--tile-enter-delay": string
}

function ImageColumnSet({ copyIndex }: { copyIndex: number }) {
	return (
		<div className="flex w-max shrink-0 items-start gap-3">
			{imageColumns.map((column, columnIndex) => (
				<div
					key={`${copyIndex}-${columnIndex}`}
					className="flex min-w-0 shrink-0 basis-[var(--column-width)] flex-col items-start gap-3 overflow-hidden"
					style={
						{
							"--column-width": `${Math.round(column.width * IMAGE_SCALE)}px`,
							width: "var(--column-width)",
						} as ColumnStyle
					}>
					{column.tiles.map((tileId, tileIndex) => (
						<img
							key={`${copyIndex}-${tileId}`}
							alt=""
							aria-hidden="true"
							width={tileDimensions[tileId].width}
							height={tileDimensions[tileId].height}
							loading="lazy"
							decoding="async"
							className="card-6-reference-tile pointer-events-none block h-auto w-full select-none object-contain"
							draggable={false}
							src={`${ASSET_BASE}/${tileId}.png`}
							style={
								{
									"--tile-enter-delay": `${columnIndex * 90 + tileIndex * 70}ms`,
								} as TileStyle
							}
						/>
					))}
				</div>
			))}
		</div>
	)
}

function ImageTrack() {
	return (
		<div className="card-6-reference-track flex w-max gap-3 will-change-transform">
			<ImageColumnSet copyIndex={0} />
			<ImageColumnSet copyIndex={1} />
		</div>
	)
}

function Card6Canvas() {
	const canvasRef = useRef<HTMLElement>(null)

	const setMarqueeSpeed = (rate: number) => {
		const tracks =
			canvasRef.current?.querySelectorAll<HTMLElement>(
				".card-6-reference-track"
			) ?? []

		tracks.forEach((track) => {
			track.getAnimations().forEach((animation) => {
				animation.updatePlaybackRate(rate)
			})
		})
	}

	return (
		<section
			ref={canvasRef}
			aria-label="Scrolling interface inspiration gallery"
			className="bg-fill2 text-fg relative h-[800px] w-[1440px] shrink-0 select-none overflow-hidden"
			onPointerCancel={() => setMarqueeSpeed(1)}
			onPointerDown={() => setMarqueeSpeed(2.55)}
			onPointerEnter={() => setMarqueeSpeed(0.72)}
			onPointerLeave={() => setMarqueeSpeed(1)}
			onPointerUp={() => setMarqueeSpeed(0.72)}>
			<div
				aria-hidden="true"
				className="bg-fill2 absolute -inset-x-[720px] -inset-y-[520px] grid origin-center rotate-[-40deg] skew-x-[8deg] skew-y-[-4deg] scale-[1.12] select-none grid-rows-[1fr_1px_1fr] overflow-hidden">
				<div className="bg-elevation-negative relative flex items-end overflow-hidden p-[18px]">
					<div className="absolute bottom-[18px] right-[18px] w-max origin-center rotate-180">
						<ImageTrack />
					</div>
				</div>
				<div className="bg-soft-alpha relative" />
				<div className="bg-fill1 relative flex items-start overflow-hidden p-[18px]">
					<ImageTrack />
				</div>
			</div>
			<div className="from-bg pointer-events-none absolute inset-x-0 top-0 z-20 h-2/5 bg-gradient-to-b to-transparent" />
		</section>
	)
}

export function Card6Animation() {
	return (
		<svg
			aria-hidden="true"
			data-nosnippet
			id="design-at-scale-animation"
			aria-label="Scrolling interface inspiration gallery"
			className="block aspect-[9/5] h-auto w-full max-w-[1440px] overflow-hidden"
			preserveAspectRatio="xMidYMid meet"
			role="group"
			viewBox={`0 0 ${STAGE_WIDTH} ${STAGE_HEIGHT}`}>
			<foreignObject height={STAGE_HEIGHT} width={STAGE_WIDTH}>
				<Card6Canvas />
			</foreignObject>
			<rect
				fill="var(--color-bg)"
				height="4"
				pointerEvents="none"
				width={STAGE_WIDTH}
				x="0"
				y="0"
			/>
			<rect
				fill="var(--color-bg)"
				height={STAGE_HEIGHT}
				pointerEvents="none"
				width="4"
				x="0"
				y="0"
			/>
			<rect
				fill="var(--color-bg)"
				height={STAGE_HEIGHT}
				pointerEvents="none"
				width="4"
				x={STAGE_WIDTH - 4}
				y="0"
			/>
		</svg>
	)
}
