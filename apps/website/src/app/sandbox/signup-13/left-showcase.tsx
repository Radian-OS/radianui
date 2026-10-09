"use client"

import Image from "next/image"
import Link from "next/link"
import { Shader } from "./shader"

export function LeftShowcase() {
	return (
		<div className="dark hidden shrink-0 overflow-hidden select-none lg:flex lg:w-lg">
			<div className="relative flex size-full flex-col overflow-hidden bg-black p-12 text-white lg:p-16">
				{/* Content Box */}
				<div className="z-10 flex size-full flex-col items-start justify-between">
					<div className="flex w-full flex-1 items-center justify-center">
						<Link
							href="#"
							className="inline-flex shrink-0 transition-transform hover:scale-105"
							aria-label="Home">
							<Image
								src="/logo.svg"
								alt="Radian UI Logo"
								width={42}
								height={42}
								priority
								className="size-14 rounded-xl object-cover shadow-xs"
							/>
						</Link>
					</div>
					<h1 className="heading-4 max-w-sm text-left text-white">
						Welcome Back to Radian
					</h1>
				</div>

				{/* Visual Animation*/}
				<div className="absolute inset-0 z-0 size-full overflow-hidden">
					<Shader />
				</div>
			</div>
		</div>
	)
}
