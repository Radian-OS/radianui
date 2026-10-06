"use client"

import React from "react"
import Image from "next/image"

export function AboutSection() {
	return (
		<section
			id="about"
			className="border-border bg-elevation-level1/50 -mx-4 w-screen border-y px-4 py-20 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
			<div className="mx-auto flex max-w-5xl flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
				{/* Left: Portrait Photo */}
				<div className="flex w-full items-center justify-center lg:w-5/12">
					<div className="border-border bg-card relative overflow-hidden rounded-2xl border shadow-2xl">
						<Image
							src="/sandbox/placeholder.svg"
							alt="Williams Samuel"
							width={420}
							height={500}
							className="h-auto w-full max-w-sm object-cover"
						/>
					</div>
				</div>

				{/* Right: Bio Information */}
				<div className="flex flex-1 flex-col items-start gap-6">
					<span className="text-success font-mono text-xs font-bold tracking-widest uppercase">
						WHO IS WILLIAMS SAMUEL?
					</span>

					<h2 className="heading-2 text-fg">A Bit About Me</h2>

					<div className="text-fg-secondary flex flex-col gap-4 text-sm leading-relaxed sm:text-base">
						<p>
							I&apos;m passionate about deciphering challenging problems and
							creating exceptional digital experience.
						</p>
						<p>
							As I&apos;ve grown as a developer, I&apos;ve contributed to
							projects and worked with other developers to create working
							applications and have written code that are maintainable and easy
							to understand.
						</p>
						<p>
							Through my studies, I&apos;ve gained a solid understanding of web
							development concepts, and have dedicated a lot of time to apply
							these concepts to real-world scenarios and applications.
						</p>
						<p>
							When I&apos;m not trying to build, learning, exploring and
							thinking about how to make things better 🤓, you can catch me
							watching football matches ⚽.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
