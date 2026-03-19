import Link from "next/link"

export function SupportFooter() {
	return (
		<p className="text-fg-tertiary absolute bottom-8 text-sm tracking-[-0.14px]">
			Having trouble? Contact our team at{" "}
			<Link
				href="mailto:support@radian.os"
				className="text-primary font-medium">
				support@radian.os
			</Link>
		</p>
	)
}
