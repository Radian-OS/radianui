import React, { useState } from "react"
import { Calendar } from "@/registry/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"
import CardFirst from "./card-first"
import CookieCard from "./cookie-card"
import Dropdown from "./dropdown"
import InviteCard from "./invite-card"
import ReportCard from "./report-card"

const ColorPlayground = () => {
	const [color, setColor] = useState("purple")

	return (
		<div className="flex flex-col gap-4">
			<Select value={color} onValueChange={(values) => setColor(values as string)}>
				<SelectTrigger className="w-fit">
					<span className={`border-border inline-block h-4 w-4 rounded-sm border bg-${color}`}></span> <SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="primary">Violet Blue</SelectItem>
					<SelectItem value="success">Emerald</SelectItem>
					<SelectItem value="error">Red</SelectItem>
					<SelectItem value="warning">Amber</SelectItem>
					<SelectItem value="info">Light Blue</SelectItem>
				</SelectContent>
			</Select>
			<div className={`bg-elevation-negative flex gap-4 color-${color} border-soft rounded-2xl border p-3`}>
				<div className="flex flex-col gap-4">
					<CardFirst />
					<Calendar mode="range" />
					<Dropdown />
				</div>
				<div className="flex w-full flex-col gap-4">
					<ReportCard />
					<InviteCard />
					<CookieCard />
				</div>
			</div>
		</div>
	)
}

export default ColorPlayground
