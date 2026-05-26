"use client"

import React, { useState } from "react"
import { Bell, Globe, Palette } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/registry/ui/accordion"
import { Label } from "@/registry/ui/label"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/ui/select"
import { Switch } from "@/registry/ui/switch"

type Appearance = "system" | "dark" | "light"
type Language = "en" | "es" | "fr" | "de" | "zh"

export default function AccordionWithSubHeader() {
	const [email, setEmail] = useState<boolean>(false)
	const [push, setPush] = useState<boolean>(true)
	const [inApp, setInApp] = useState<boolean>(true)
	const [appearance, setAppearance] = useState<Appearance>("system")
	const [language, setLanguage] = useState<Language>("en")

	return (
		<Accordion
			variant="table"
			type="multiple"
			defaultValue={["appearance"]}
			className="w-full lg:w-3/4">
			<AccordionItem value="notifications">
				<AccordionTrigger>
					<span className="flex gap-2.5">
						<Bell className="text-fg-secondary size-5 self-start" />
						<span className="flex flex-col gap-0.5">
							<span>Notifications</span>
							<span className="text-fg-secondary font-normal">
								Choose how you’d like to stay updated.
							</span>
						</span>
					</span>
				</AccordionTrigger>
				<AccordionContent className="ps-10.5 space-y-3 pb-4">
					<div className="flex items-center gap-2">
						<Switch
							size="20"
							id="email_notification"
							checked={email}
							onCheckedChange={setEmail}
							aria-label="Email notifications"
						/>
						<Label htmlFor="email_notification" className="text-fg">
							Notify me by email
						</Label>
					</div>
					<div className="flex items-center gap-2">
						<Switch
							size="20"
							id="push_notification"
							checked={push}
							onCheckedChange={setPush}
							aria-label="Push notifications"
						/>
						<Label htmlFor="push_notification" className="text-fg">
							Notify me by push notification
						</Label>
					</div>
					<div className="flex items-center gap-2">
						<Switch
							size="20"
							id="in_app_notification"
							checked={inApp}
							onCheckedChange={setInApp}
							aria-label="In-app alerts"
						/>
						<Label htmlFor="in_app_notification" className="text-fg">
							Notify me by in-app notification
						</Label>
					</div>
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value="appearance">
				<AccordionTrigger>
					<span className="flex gap-2.5">
						<Palette className="text-fg-secondary size-5 self-start" />
						<span className="flex flex-col gap-0.5">
							<span>Appearance</span>
							<span className="text-fg-secondary font-normal">
								Select your preferred theme.
							</span>
						</span>
					</span>
				</AccordionTrigger>
				<AccordionContent className="ps-10.5 pb-4">
					<RadioGroup
						size={"sm"}
						value={appearance}
						onValueChange={(value) => setAppearance(value as Appearance)}
						className="flex gap-4">
						{/* System Option */}
						<Label
							htmlFor="system"
							className="flex cursor-pointer flex-col justify-center gap-2">
							<div
								className={cn(
									"border-soft overflow-clip rounded-lg border-2",
									appearance === "system" ? "border-primary-border" : ""
								)}>
								<Image src="/system.png" alt="system" width={75} height={60} />
							</div>
							<div className="flex items-center gap-2">
								<RadioGroupItem id="system" value="system" />
								<Label htmlFor="system">System</Label>
							</div>
						</Label>

						{/* Dark Option */}
						<Label
							htmlFor="dark"
							className="flex cursor-pointer flex-col justify-center gap-2">
							<div
								className={cn(
									"border-soft overflow-clip rounded-lg border-2",
									appearance === "dark" ? "border-primary-border" : ""
								)}>
								<Image src="/dark.png" alt="dark" width={75} height={60} />
							</div>
							<div className="flex items-center gap-2">
								<RadioGroupItem id="dark" value="dark" />
								<Label htmlFor="dark">Dark</Label>
							</div>
						</Label>

						{/* Light Option */}
						<Label
							htmlFor="light"
							className="flex cursor-pointer flex-col justify-center gap-2">
							<div
								className={cn(
									"border-soft overflow-clip rounded-lg border-2",
									appearance === "light" ? "border-primary-border" : ""
								)}>
								<Image src="/light.png" alt="light" width={75} height={60} />
							</div>
							<div className="flex items-center gap-2">
								<RadioGroupItem id="light" value="light" />
								<Label htmlFor="light">Light</Label>
							</div>
						</Label>
					</RadioGroup>
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value="language">
				<AccordionTrigger>
					<span className="flex gap-2.5">
						<Globe className="text-fg-secondary size-5 self-start" />
						<span className="flex flex-col gap-0.5">
							<span>Language</span>
							<span className="text-fg-secondary font-normal">
								Select your preferred language.
							</span>
						</span>
					</span>
				</AccordionTrigger>
				<AccordionContent className="ps-10.5 pb-4">
					<div className="max-w-57.5 w-full">
						<Select
							value={language}
							onValueChange={(value) => setLanguage(value as Language)}>
							<SelectTrigger>
								<SelectValue placeholder="Language" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="en">English (Default)</SelectItem>
								<SelectItem value="es">Spanish</SelectItem>
								<SelectItem value="fr">French</SelectItem>
								<SelectItem value="de">German</SelectItem>
								<SelectItem value="zh">Chinese</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}
