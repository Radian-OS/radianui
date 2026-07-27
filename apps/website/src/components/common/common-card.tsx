import React from "react"
import { Calendar } from "@/styles/default/ui/calendar"
import CardFirst from "./card-first"
import CookieCard from "./cookie-card"
import Dropdown from "./dropdown"
import InviteCard from "./invite-card"
import ReportCard from "./report-card"

const CommonCard = () => {
	return (
		<div className="flex flex-col gap-4 rounded-2xl border p-3 sm:flex-row">
			<div className="flex flex-col gap-4">
				<CardFirst />
				<Calendar className="self-center" mode="range" />
				<Dropdown />
			</div>
			<div className="flex w-full flex-col gap-4">
				<ReportCard />
				<InviteCard />
				<CookieCard />
			</div>
		</div>
	)
}

export default CommonCard
