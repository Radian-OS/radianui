"use client"

import React from "react"
import { motion } from "motion/react"
import { Card, CardContent } from "@/styles/default/ui/card"

export function EditorialPanel() {
	return (
		<motion.section
			data-auth-image
			initial={{ opacity: 0, scale: 0.98 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
			className="hidden min-w-0 items-center justify-center lg:flex lg:justify-end">
			<Card className="bg-bg w-full gap-0 overflow-hidden rounded-[24px] border-0 p-0 shadow-none">
				<CardContent className="p-0">
					{/* Light Mode Reference Image - Abstract Blue/White Glass Flow Ribbon */}
					<img
						src="https://images.unsplash.com/photo-1743657166981-8d8e11d03c3e?auto=format&fit=crop&w=1080&h=1500&q=80"
						alt="Editorial visual abstract glass ribbon"
						aria-hidden="true"
						loading="eager"
						className="h-[24rem] w-full rounded-[24px] object-cover sm:h-[34rem] lg:h-[78svh] lg:max-h-[58rem] xl:h-[82svh] xl:max-h-[62rem] dark:hidden"
					/>
					{/* Dark Mode Reference Image - Sleek Deep Bronze Flow Ribbon */}
					<img
						src="https://images.unsplash.com/photo-1651065567117-ac52c1a62e21?auto=format&fit=crop&w=1080&h=1500&q=80"
						alt="Editorial visual abstract sculpture dark"
						aria-hidden="true"
						loading="eager"
						className="hidden h-[24rem] w-full rounded-[24px] object-cover sm:h-[34rem] lg:h-[78svh] lg:max-h-[58rem] xl:h-[82svh] xl:max-h-[62rem] dark:block"
					/>
				</CardContent>
			</Card>
		</motion.section>
	)
}
