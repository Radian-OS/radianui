"use client"

import { House, HouseIcon, Puzzle } from "lucide-react"
import Link from "next/link"

import { Breadcrumb, BreadcrumbItem } from "@/registry/ui/breadcrumb"

const BreadcrumbExample = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-4 border p-6">
			<Breadcrumb maxItems={6}>
				<BreadcrumbItem asChild>
					<Link href="#">
						<House />
					</Link>
				</BreadcrumbItem>
				<BreadcrumbItem asChild>
					<Link href="#">
						<HouseIcon />
					</Link>
				</BreadcrumbItem>
				<BreadcrumbItem asChild>
					<Link href="#">
						<Puzzle />
					</Link>
				</BreadcrumbItem>
			</Breadcrumb>
		</div>
	)
}

export default BreadcrumbExample
