import { sideBarItems } from "@/config/sidebar-config"

export function getFlatSidebar() {
	return sideBarItems.flatMap((section) => section.items)
}

export function getPrevNext(currentPath: string) {
	const flatItems = getFlatSidebar()
	const index = flatItems.findIndex((item) => item.link === currentPath)

	const prev = index > 0 ? flatItems[index - 1] : null
	const next = index < flatItems.length - 1 ? flatItems[index + 1] : null

	return { prev, next }
}
