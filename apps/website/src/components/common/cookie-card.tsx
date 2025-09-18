import React from "react"
import { Button } from "@/registry/ui/button"
import { Switch } from "@/registry/ui/switch"

const CookieCard = () => {
	return (
		<div className="bg-bg border-border flex h-full w-full flex-col justify-between gap-4 rounded-2xl border p-5 sm:gap-0">
			<span>
				<p className="text-fg text-base font-medium">Cookie Settings</p>
				<p className="text-fg-secondary text-sm font-normal">Manage your cookie settings here.</p>
			</span>
			<span className="flex items-center justify-between">
				<span>
					<p className="text-fg text-base font-medium">Strictly Necessary</p>
					<p className="text-fg-secondary text-sm font-normal">These cookies are necessary for website functionality.</p>
				</span>
				<Switch defaultChecked size="24" />
			</span>
			<span className="flex items-center justify-between">
				<span>
					<p className="text-fg text-base font-medium">Functional Cookies</p>
					<p className="text-fg-secondary text-sm font-normal">These cookies enable personalized features on the site.</p>
				</span>
				<Switch defaultChecked size="24" />
			</span>
			<Button className="w-full" variant="outline" color="primary">
				Save preferences
			</Button>
		</div>
	)
}

export default CookieCard
