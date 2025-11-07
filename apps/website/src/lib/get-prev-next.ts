import { type NavigationItem, navigationItems } from "@/config/navigation-config"

export function getAllNavigationItems() {
	const flattenItems = (items: NavigationItem[]): NavigationItem[] => {
		const result: NavigationItem[] = []

		for (const item of items) {
			// Add the parent item first
			result.push(item)

			// If the item has subitems, add them after the parent
			if (item.subItems && item.subItems.length > 0) {
				result.push(...item.subItems)
			}
		}

		return result
	}

	return navigationItems.flatMap((section) => flattenItems(section.items))
}

export function getPrevNext(currentPath: string) {
	const flatItems = getAllNavigationItems()
	const index = flatItems.findIndex((item) => item.url === currentPath)

	const prev = index > 0 ? flatItems[index - 1] : null
	const next = index < flatItems.length - 1 ? flatItems[index + 1] : null

	return { prev, next }
}
