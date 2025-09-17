import React from "react"
import { Calendar } from "@/registry/ui/calendar"
import CardFirst from "./card-first"
import CookieCard from "./cookie-card"
import Dropdown from "./dropdown"
import InviteCard from "./invite-card"
import ReportCard from "./report-card"

const CommonCard = () => {
	return (
		<>
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
		</>
	)
}

export default CommonCard
