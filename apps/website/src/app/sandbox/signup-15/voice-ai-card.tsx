"use client"

import React, { useState } from "react"
import { Copy, Music, Play, Radio, Upload } from "lucide-react"

export function VoiceAiCard() {
	const [activeTab, setActiveTab] = useState<"tts" | "upload">("tts")
	const [activeCategory, setActiveCategory] = useState<string>("youtube")

	return (
		<div className="w-full rounded-2xl border border-white/90 bg-white/85 p-4.5 shadow-[0_16px_36px_rgba(0,0,0,0.07),0_2px_8px_rgba(0,0,0,0.03)] backdrop-blur-md sm:p-5">
			{/* Top Tabs: Text to Speech & Upload File */}
			<div className="flex items-center gap-2">
				<button
					type="button"
					onClick={() => setActiveTab("tts")}
					className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-semibold transition-all ${
						activeTab === "tts"
							? "border border-blue-200/60 bg-white text-neutral-900 shadow-[0_3px_10px_rgba(37,99,235,0.12)]"
							: "text-neutral-500 hover:text-neutral-900"
					}`}>
					<Copy className="size-3 text-neutral-800" />
					<span>Text to Speech</span>
				</button>

				<button
					type="button"
					onClick={() => setActiveTab("upload")}
					className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-medium transition-all ${
						activeTab === "upload"
							? "border border-neutral-200/80 bg-white text-neutral-900 shadow-xs"
							: "text-neutral-400 hover:text-neutral-700"
					}`}>
					<Upload className="size-3 stroke-[2]" />
					<span>Upload File</span>
				</button>
			</div>

			{/* Description Paragraph */}
			<p className="my-3.5 text-[11.5px] leading-[1.55] text-neutral-600 sm:text-xs">
				Unlock the power of intelligent voice technology through interactive
				learning projects. Learn the core AI skills behind speech recognition,
				natural language, smart voice experiences.
			</p>

			{/* Bottom Category Badges / Pills */}
			<div className="flex items-center gap-2 pt-0.5">
				<button
					type="button"
					onClick={() => setActiveCategory("youtube")}
					className={`flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10.5px] font-medium transition-all ${
						activeCategory === "youtube"
							? "border border-neutral-200/80 bg-white text-neutral-900 shadow-xs"
							: "text-neutral-500 hover:text-neutral-900"
					}`}>
					<Play className="size-2.5 fill-current text-neutral-800" />
					<span>YouTube</span>
				</button>

				<button
					type="button"
					onClick={() => setActiveCategory("narration")}
					className={`flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10.5px] font-medium transition-all ${
						activeCategory === "narration"
							? "border border-neutral-200/80 bg-white text-neutral-900 shadow-xs"
							: "text-neutral-500 hover:text-neutral-900"
					}`}>
					<Music className="size-2.5 stroke-[2] text-neutral-500" />
					<span>Narration</span>
				</button>

				<button
					type="button"
					onClick={() => setActiveCategory("ad")}
					className={`flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1 text-[10.5px] font-medium transition-all ${
						activeCategory === "ad"
							? "border border-neutral-200/80 bg-white text-neutral-900 shadow-xs"
							: "text-neutral-500 hover:text-neutral-900"
					}`}>
					<span className="rounded border border-neutral-400 px-0.5 text-[8px] font-bold text-neutral-600">
						Ad
					</span>
					<span>Advertisement</span>
				</button>

				<button
					type="button"
					onClick={() => setActiveCategory("podcast")}
					className={`flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10.5px] font-medium transition-all ${
						activeCategory === "podcast"
							? "border border-neutral-200/80 bg-white text-neutral-900 shadow-xs"
							: "text-neutral-500 hover:text-neutral-900"
					}`}>
					<Radio className="size-2.5 stroke-[2] text-neutral-500" />
					<span>Podcast</span>
				</button>
			</div>
		</div>
	)
}
