import { navigationItems } from "@/config/navigation-config"

export function getFlatSidebar() {
	return navigationItems.flatMap((section) => section.items)
}

export function getPrevNext(currentPath: string) {
	const flatItems = getFlatSidebar()
	const index = flatItems.findIndex((item) => item.url === currentPath)

	const prev = index > 0 ? flatItems[index - 1] : null
	const next = index < flatItems.length - 1 ? flatItems[index + 1] : null

	return { prev, next }
}
