"use client"

import React from "react"
import Link from "next/link"
import { Calendar, Mail } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import { Card, CardContent } from "@/styles/default/ui/card"

export function WorkTogetherCard() {
	return (
		<Card className="border-border/80 bg-elevation-level1/20 mt-4 rounded-2xl border p-6 text-center shadow-xs">
			<CardContent className="flex flex-col items-center gap-3.5 p-0">
				<div className="flex items-center gap-2">
					<Calendar className="text-info size-4" />
					<h3 className="heading-6 text-fg">Let&apos;s Work Together</h3>
				</div>
				<p className="text-fg-secondary max-w-md text-xs leading-relaxed sm:text-sm">
					I&apos;m currently open to work and ready to help bring your ideas to
					life.
				</p>
				<div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
					<Button
						type="button"
						variant="outline"
						color="neutral"
						size="36"
						className="rounded-full px-4 text-xs font-medium shadow-xs">
						<Calendar className="mr-1.5 size-3.5" />
						Book a Call
					</Button>
					<Button
						type="button"
						variant="outline"
						color="neutral"
						size="36"
						className="rounded-full px-4 text-xs font-medium shadow-xs"
						asChild>
						<Link href="mailto:imkishor24@gmail.com">
							<Mail className="mr-1.5 size-3.5" />
							Email Me
						</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
