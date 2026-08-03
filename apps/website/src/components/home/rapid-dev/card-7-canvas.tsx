"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export function Card7Canvas() {
	const ref = useRef<HTMLElement>(null)
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const el = ref.current
		if (!el) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true)
					observer.disconnect()
				}
			},
			{ threshold: 0.15 }
		)

		observer.observe(el)
		return () => observer.disconnect()
	}, [])

	return (
		<section
			ref={ref}
			aria-hidden="true"
			data-nosnippet
			aria-label="Card 7 animation canvas"
			className={cn("card-7-canvas select-none", isVisible && "is-visible")}>
			<div className="card-7-terminal-shell">
				<div className="card-7-terminal-window">
					<div className="card-7-titlebar">
						<div className="card-7-window-controls" aria-hidden="true">
							<span className="card-7-control card-7-control-red" />
							<span className="card-7-control card-7-control-yellow" />
							<span className="card-7-control card-7-control-green" />
						</div>
						<h2>My New Application</h2>
					</div>

					<div className="card-7-terminal-body">
						<div className="card-7-terminal-content">
							<div className="card-7-prompt-card card-7-reveal card-7-reveal-1">
								<span className="card-7-prompt-marker">&gt;</span>
								<p className="card-7-prompt-text">
									<span className="card-7-prompt-typed card-7-prompt-line-1">
										Build me a SaaS dashboard using Radian OS. Use
									</span>
									<span className="card-7-prompt-typed card-7-prompt-line-2">
										Radian blocks for navigation, analytic cards, and data
									</span>
									<span className="card-7-prompt-typed card-7-prompt-line-3">
										table
									</span>
								</p>
							</div>

							<div className="card-7-step-list card-7-reveal card-7-reveal-2">
								<p className="card-7-muted-line card-7-thinking-line">
									<span
										className="card-7-spinner card-7-thinking-spinner"
										aria-hidden="true"
									/>
									<span className="card-7-thinking-check" aria-hidden="true">
										{"\u2713"}
									</span>
									<span className="card-7-thinking-text" />
								</p>
								<p>
									<span className="card-7-spark">{"\u2726"}</span>
									Understanding requirements . . .
								</p>
								<p>
									<span className="card-7-spark">{"\u2726"}</span>
									Selecting Radian components . . .
								</p>
								<p>
									<span className="card-7-spark">{"\u2726"}</span>
									Generating project structure . . .
								</p>
								<p className="card-7-narration">
									I&apos;ll initialize a new Next.js project with Radian OS.
								</p>
							</div>

							<div className="card-7-divider card-7-reveal card-7-reveal-3" />

							<div className="card-7-command-block card-7-reveal card-7-reveal-4">
								<p>PS D:\My-Projects</p>
								<p>
									<span>&gt;</span>
									<strong className="card-7-type card-7-type-command">
										$ npx radianui@latest init --next
									</strong>
								</p>
							</div>

							<div className="card-7-divider card-7-reveal card-7-reveal-5" />

							<div className="card-7-install-block card-7-reveal card-7-reveal-6">
								<p className="card-7-primary-line">
									<span
										className="card-7-spinner card-7-spinner-primary"
										aria-hidden="true"
									/>
									<span className="card-7-type card-7-type-init">
										Initializing Radian OS...
									</span>
								</p>
								<dl>
									<div>
										<dt>?</dt>
										<dd>What would you like to name your project?</dd>
									</div>
									<div>
										<dt>&gt;</dt>
										<dd className="card-7-success-text">my-app</dd>
									</div>
									<div>
										<dt>?</dt>
										<dd>Would you like to use a /src directory?</dd>
									</div>
									<div>
										<dt>&gt;</dt>
										<dd className="card-7-success-text">Yes</dd>
									</div>
									<div>
										<dt>?</dt>
										<dd>
											What color would you like to use as your brand color?
										</dd>
									</div>
									<div>
										<dt>&gt;</dt>
										<dd className="card-7-success-text">Dark Orchid</dd>
									</div>
									<div>
										<dt>?</dt>
										<dd>Which font would you like to use?</dd>
									</div>
									<div>
										<dt>&gt;</dt>
										<dd className="card-7-success-text">Inter</dd>
									</div>
								</dl>
							</div>

							<div className="card-7-check-line card-7-reveal card-7-reveal-7">
								<span>{"\u2713"}</span>
								Project Initialized
							</div>

							<p className="card-7-complete-line card-7-reveal card-7-reveal-8">
								{"\u{1F389}"} Radian OS has been successfully set up in your
								project!
							</p>

							<div className="card-7-divider card-7-reveal card-7-reveal-9" />

							<div className="card-7-ai-response card-7-reveal card-7-reveal-10">
								<span className="card-7-ai-spark">{"\u2726"}</span>
								<p className="card-7-ai-lines card-7-ai-lines-1">
									<span className="card-7-ai-typed card-7-ai-1-line-1">
										I&apos;ve initialized your project with Radian OS and
										installed
									</span>
									<span className="card-7-ai-typed card-7-ai-1-line-2">
										the required blocks and components for the dashboard.
									</span>
									<span className="card-7-ai-typed card-7-ai-spaced card-7-ai-1-line-3">
										You can now start the development server. Run the
									</span>
									<span className="card-7-ai-typed card-7-ai-1-line-4">
										following command to start building.
									</span>
								</p>
							</div>

							<div className="card-7-divider card-7-reveal card-7-reveal-11" />

							<div className="card-7-footer-command card-7-reveal card-7-reveal-12">
								<p>Terminal</p>
								<p>PS D:\My-Projects</p>
								<p>
									<span>&gt;</span>
									<span className="card-7-type card-7-type-dev">
										$ npm run dev
									</span>
								</p>
								<p className="card-7-dev-status">
									<span className="card-7-dev-icon" aria-hidden="true">
										<span className="card-7-spinner card-7-dev-spinner" />
										<span className="card-7-dev-check">{"\u2713"}</span>
									</span>
									<span>Starting development server . . .</span>
								</p>
								<p>
									Ready! Open{" "}
									<span className="card-7-warning-text">
										http://localhost:3000
									</span>{" "}
									to view your application
								</p>
							</div>

							<div className="card-7-divider card-7-reveal card-7-reveal-13" />

							<div className="card-7-followup-card card-7-reveal card-7-reveal-13">
								<span className="card-7-prompt-marker">&gt;</span>
								<p className="card-7-followup-type card-7-followup-type-1">
									Can you add the analytics table next?
								</p>
							</div>

							<div className="card-7-ai-response card-7-reveal card-7-reveal-14">
								<span className="card-7-ai-spark">{"\u2726"}</span>
								<p className="card-7-ai-lines card-7-ai-lines-2">
									<span className="card-7-ai-typed card-7-ai-2-line-1">
										Yes. I&apos;ll add a responsive data table with sorting,
									</span>
									<span className="card-7-ai-typed card-7-ai-2-line-2">
										filters, and Radian-styled empty states.
									</span>
								</p>
							</div>

							<div className="card-7-divider card-7-reveal card-7-reveal-15" />

							<div className="card-7-followup-card card-7-reveal card-7-reveal-16">
								<span className="card-7-prompt-marker">&gt;</span>
								<p className="card-7-followup-type card-7-followup-type-2">
									Also include navigation and metric cards.
								</p>
							</div>

							<div className="card-7-ai-response card-7-reveal card-7-reveal-17">
								<span className="card-7-ai-spark">{"\u2726"}</span>
								<p className="card-7-ai-lines card-7-ai-lines-3">
									<span className="card-7-ai-typed card-7-ai-3-line-1">
										Done. I&apos;ll compose the sidebar, revenue metrics,
									</span>
									<span className="card-7-ai-typed card-7-ai-3-line-2">
										recent activity, and table states using Radian components.
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
