import Link from "next/link"

export default function Page() {
	const links = [
		{ name: "Sidebar Float Variant", href: "/sidebar-05-float" },
		{ name: "Sidebar Default Variant", href: "/sidebar-05-default" },
		{ name: "Sidebar Inset Variant", href: "/sidebar-05-inset" },
	]

	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-2 p-8">
			<h3 className="heading-3">Sidebar Variants</h3>
			<nav>
				<ul className="space-y-4 text-center">
					{links.map((link) => (
						<li key={link.href}>
							<Link href={link.href} className="text-lg font-medium text-blue-600 transition-colors hover:text-blue-800 hover:underline" target="_blank">
								{link.name}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</div>
	)
}
