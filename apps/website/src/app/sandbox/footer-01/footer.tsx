import React from "react"
import { Github, Twitter, Youtube, Linkedin } from "lucide-react"
import data from "./data.json"

export function Footer() {
	return (
		<footer className="border-border bg-bg w-full border-t py-6 sm:py-8">
			<div className="mx-auto flex max-w-screen-xl flex-col-reverse items-start justify-between gap-6 px-5 sm:px-6 lg:flex-row lg:items-center">
				{/* Copyright */}
				<div className="border-border text-fg-secondary w-full border-t pt-4 text-left text-sm sm:border-none sm:pt-0 lg:w-auto">
					{data.copyright}
				</div>

				{/* Navigation Links */}
				<nav className="text-fg-secondary flex flex-col gap-3 text-sm font-medium sm:flex-row sm:items-center sm:gap-6 lg:gap-8">
					{data.navLinks.map((link, index) => (
						<a
							key={index}
							href={link.href}
							className="hover:text-fg transition-colors">
							{link.label}
						</a>
					))}
				</nav>

				{/* Social Media Links */}
				<div className="text-fg-secondary flex items-center gap-4">
					<a
						href="https://github.com/Radian-os"
						aria-label="GitHub"
						target="_blank"
						rel="noreferrer"
						className="hover:text-fg transition-colors">
						<Github className="size-5" />
					</a>
					<a
						href="https://twitter.com"
						aria-label="Twitter"
						target="_blank"
						rel="noreferrer"
						className="hover:text-fg transition-colors">
						<Twitter className="size-5" />
					</a>
					<a
						href="https://youtube.com"
						aria-label="YouTube"
						target="_blank"
						rel="noreferrer"
						className="hover:text-fg transition-colors">
						<Youtube className="size-5" />
					</a>
					<a
						href="https://linkedin.com"
						aria-label="LinkedIn"
						target="_blank"
						rel="noreferrer"
						className="hover:text-fg transition-colors">
						<Linkedin className="size-5" />
					</a>
				</div>
			</div>
		</footer>
	)
}

export default Footer
