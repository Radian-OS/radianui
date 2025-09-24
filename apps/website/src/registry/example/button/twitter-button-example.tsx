import React from "react"
import { Button } from "@/registry/ui/button"

function TwitterButtonExample() {
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<Button color="neutral" variant="outline">
				<svg className="text-fg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M17.7512 3H20.818L14.1179 10.6246L22 21H15.8284L10.9946 14.7074L5.46359 21H2.39494L9.5613 12.8446L2 3H8.32828L12.6976 8.75169L17.7512 3ZM16.6748 19.1723H18.3742L7.4049 4.73169H5.58133L16.6748 19.1723Z"
						fill="currentColor"
					/>
				</svg>
				Continue with X(Twitter)
			</Button>
			<Button color="neutral">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M17.7512 3H20.818L14.1179 10.6246L22 21H15.8284L10.9946 14.7074L5.46359 21H2.39494L9.5613 12.8446L2 3H8.32828L12.6976 8.75169L17.7512 3ZM16.6748 19.1723H18.3742L7.4049 4.73169H5.58133L16.6748 19.1723Z"
						fill="currentColor"
					/>
				</svg>
				Continue with X(Twitter)
			</Button>
		</div>
	)
}

export default TwitterButtonExample
