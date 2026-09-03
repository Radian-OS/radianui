import React from "react"

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="mx-auto mt-10 mb-43 w-full max-w-200 px-5 lg:px-0">
			{children}
		</div>
	)
}

export default layout
