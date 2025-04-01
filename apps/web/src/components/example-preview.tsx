import React from "react"

const Preview = ({ component }: { component: React.ReactNode }) => {
	return <div className="h-[600px] p-6">{component}</div>
}

export default Preview
