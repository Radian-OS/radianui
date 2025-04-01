"use client"

const Footer = () => {
	const currentYear = new Date().getFullYear()
	return (
		<div className="border-stroke-decorative flex h-16 items-center justify-center border-t">
			<div className="text-fg2 max-w-[1280px] text-sm font-medium">&copy; Copyright Radian OS {currentYear}. All rights reserved.</div>
		</div>
	)
}
export default Footer
