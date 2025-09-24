import React from "react"
import { ButtonGroup, IconButton } from "@/registry/ui/button"

function ButtonGroupAlignmentAExample() {
	return (
		<div className="flex items-center justify-center">
			<div className="flex flex-col items-center justify-center gap-4">
				<ButtonGroup variant="outline" color="neutral">
					<IconButton>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-text-align-start-icon lucide-text-align-start">
							<path d="M21 5H3" />
							<path d="M15 12H3" />
							<path d="M17 19H3" />
						</svg>
					</IconButton>
					<IconButton>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-text-align-center-icon lucide-text-align-center">
							<path d="M21 5H3" />
							<path d="M17 12H7" />
							<path d="M19 19H5" />
						</svg>
					</IconButton>
					<IconButton>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-text-align-end-icon lucide-text-align-end">
							<path d="M21 5H3" />
							<path d="M21 12H9" />
							<path d="M21 19H7" />
						</svg>
					</IconButton>
					<IconButton>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-text-align-justify-icon lucide-text-align-justify">
							<path d="M3 5h18" />
							<path d="M3 12h18" />
							<path d="M3 19h18" />
						</svg>
					</IconButton>
				</ButtonGroup>
			</div>
		</div>
	)
}

export default ButtonGroupAlignmentAExample
