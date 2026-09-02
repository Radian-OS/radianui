"use client"

import * as React from "react"
import { CloudUpload, X } from "lucide-react"
import { CompactButton } from "@/registry/ui/button"
import { Progress } from "@/registry/ui/progress"

export default function FileUploadProgress() {
	const [progress, setProgress] = React.useState(20)

	React.useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					setTimeout(() => setProgress(0), 1000)
					return 100
				}
				return prev + 1
			})
		}, 80)
		return () => clearInterval(interval)
	}, [])

	const uploaded = ((progress / 100) * 25).toFixed(0)
	const isComplete = progress >= 100

	return (
		<div className="bg-bg border-soft flex w-full max-w-90 flex-col gap-3 rounded-xl border p-2.5">
			<div className="flex items-center gap-3">
				{/* SVG file icon */}
				<svg
					width="36"
					height="36"
					viewBox="0 0 36 36"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M14.0333 4H22.2335L30.8333 12.5951V27.8C30.8333 30.1196 28.9528 32 26.6333 32H14.0333C11.7137 32 9.83325 30.1196 9.83325 27.8V8.2C9.83325 5.8804 11.7137 4 14.0333 4Z"
						fill="#EEEFF1"
					/>
					<path
						d="M22.2336 4L30.8334 12.5951H24.567C23.2783 12.5951 22.2336 11.5504 22.2336 10.2617V4Z"
						fill="#DEE0E3"
					/>
					<rect
						x="4"
						y="17.7249"
						width="18.6667"
						height="10.5"
						rx="2.33333"
						fill="#F53D3D"
					/>
					<path
						d="M6.83538 25.4749V20.3839H8.74447C9.13557 20.3839 9.4637 20.4569 9.72885 20.6027C9.99566 20.7485 10.197 20.949 10.3329 21.2043C10.4704 21.4578 10.5392 21.7462 10.5392 22.0693C10.5392 22.3958 10.4704 22.6858 10.3329 22.9393C10.1953 23.1929 9.99234 23.3926 9.72388 23.5384C9.45541 23.6826 9.1248 23.7547 8.73204 23.7547H7.46677V22.9965H8.60776C8.83645 22.9965 9.02371 22.9567 9.16954 22.8772C9.31538 22.7977 9.4231 22.6883 9.4927 22.5491C9.56396 22.4099 9.59959 22.2499 9.59959 22.0693C9.59959 21.8887 9.56396 21.7296 9.4927 21.592C9.4231 21.4545 9.31455 21.3476 9.16706 21.2714C9.02123 21.1935 8.83313 21.1545 8.60278 21.1545H7.75761V25.4749H6.83538ZM13.0654 25.4749H11.3403V20.3839H13.1002C13.6057 20.3839 14.0398 20.4859 14.4028 20.6897C14.7673 20.8919 15.0474 21.1827 15.243 21.5622C15.4385 21.9417 15.5363 22.3958 15.5363 22.9244C15.5363 23.4547 15.4377 23.9105 15.2405 24.2916C15.0449 24.6728 14.7624 24.9653 14.3928 25.1691C14.0249 25.3729 13.5825 25.4749 13.0654 25.4749ZM12.2625 24.6769H13.0207C13.3753 24.6769 13.6711 24.6123 13.9081 24.483C14.1451 24.3521 14.3232 24.1574 14.4425 23.8989C14.5619 23.6387 14.6215 23.3139 14.6215 22.9244C14.6215 22.535 14.5619 22.2118 14.4425 21.955C14.3232 21.6964 14.1467 21.5034 13.9131 21.3758C13.6811 21.2465 13.3927 21.1819 13.048 21.1819H12.2625V24.6769ZM16.4125 25.4749V20.3839H19.6739V21.157H17.3348V22.5391H19.4502V23.3122H17.3348V25.4749H16.4125Z"
						fill="white"
					/>
				</svg>

				{/* File info */}
				<div className="flex min-w-0 flex-1 flex-col gap-1">
					<span className="text-fg truncate text-sm font-medium">
						Draft_Proposal.pdf
					</span>
					<div className="text-fg-tertiary flex items-center gap-1.5 text-xs font-normal">
						<span>{uploaded} MB / 25 MB</span>
						<span>|</span>
						{!isComplete ? (
							<>
								<CloudUpload className="size-3.5" />
								<span>Uploading...</span>
							</>
						) : (
							<span className="text-success">Complete</span>
						)}
					</div>
				</div>

				{/* Close */}
				<CompactButton
					aria-label="Close Button"
					size="20"
					variant="ghost"
					color="neutral"
					className="self-start">
					<X />
				</CompactButton>
			</div>

			<Progress value={progress} />
		</div>
	)
}
