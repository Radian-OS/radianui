import Link from "next/link"

export default function SupportFooter() {
	return (
		<p className="text-fg-tertiary text-sm">
			<span>Having trouble? Contact our team at</span>{" "}
			<Link
				href="mailto:support@radian.os"
				className="text-primary-text font-medium">
				support@radian.os
			</Link>
		</p>
	)
}
