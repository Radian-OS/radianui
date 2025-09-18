import React from "react"
import { Calendar } from "@/registry/ui/calendar"
import CardFirst from "./card-first"
import CookieCard from "./cookie-card"
import Dropdown from "./dropdown"
import InviteCard from "./invite-card"
import ReportCard from "./report-card"

const CommonCard = () => {
	return (
		<div className="flex flex-wrap gap-6 sm:flex-nowrap">
			{/* Left column */}
			<div className="flex w-full flex-col gap-4 md:w-1/2">
				<CardFirst />
				<Calendar className="w-fit sm:w-full" mode="range" />
				<Dropdown />
			</div>

			{/* Right column */}
			<div className="flex w-full flex-col gap-4 md:w-1/2">
				<ReportCard />
				<InviteCard />
				<CookieCard />
			</div>
		</div>
	)
}

export default CommonCard
