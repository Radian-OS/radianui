"use client"

export default function Footer() {
	const currentYear = new Date().getFullYear()
	return (
		<footer className="border-stroke-decorative flex h-16 items-center justify-center border-t">
			<div className="text-text-secondary max-w-320 text-sm font-medium">&copy; Copyright Radian OS {currentYear}. All rights reserved.</div>
		</footer>
	)
}
