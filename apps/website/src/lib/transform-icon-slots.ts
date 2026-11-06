import { ICON_SLOT_REPLACEMENTS } from "@/registry/icon/icon-slot"

const slotToLucide = new Map<string, string>(
	ICON_SLOT_REPLACEMENTS.map((item) => [item.slot, item.lucideIcon])
)

/**
 * Transforms code containing <IconSlot ... /> elements into the corresponding
 * Lucide React icon components and updates/removes imports accordingly.
 */
export function transformIconSlots(source: string): string {
	if (!source || !source.includes("<IconSlot")) return source

	const neededLucideIcons = new Set<string>()

	let transformed = source.replace(
		/<IconSlot\b([\s\S]*?)\/?>/g,
		(match, attrs: string) => {
			const slotMatch = attrs.match(/\bslot=["']([^"']+)["']/)
			if (!slotMatch) return match

			const slot = slotMatch[1]
			const lucideIcon = slotToLucide.get(slot)
			if (!lucideIcon) return match

			neededLucideIcons.add(lucideIcon)

			const cleanAttrs = attrs
				.replace(/\bslot=["'][^"']+["']/, "")
				.replace(/\s+/g, " ")
				.trim()

			return `<${lucideIcon}${cleanAttrs ? ` ${cleanAttrs}` : ""} />`
		}
	)

	// Clean up IconSlot from imports if no <IconSlot remains
	if (!transformed.includes("<IconSlot")) {
		transformed = transformed.replace(
			/^import\s+\{([^}]*)\}\s+from\s+["']([^"']*\/icon-library)["'];?\n?/gm,
			(_, imports: string, modulePath: string) => {
				const remainingImports = imports
					.split(",")
					.map((s) => s.trim())
					.filter((s) => s && s !== "IconSlot")

				if (remainingImports.length === 0) return ""
				return `import { ${remainingImports.join(", ")} } from "${modulePath}"\n`
			}
		)
	}

	// Add or merge lucide-react imports
	if (neededLucideIcons.size > 0) {
		const lucideImportPattern =
			/import\s+\{([^}]*)\}\s+from\s+["']lucide-react["'];?/m
		const lucideImportMatch = transformed.match(lucideImportPattern)

		if (lucideImportMatch) {
			const currentImports = lucideImportMatch[1]
				.split(",")
				.map((s) => s.trim())
				.filter(Boolean)
			const merged = Array.from(
				new Set([...currentImports, ...neededLucideIcons])
			)

			transformed = transformed.replace(
				lucideImportPattern,
				`import { ${merged.join(", ")} } from "lucide-react"`
			)
		} else {
			const useClientMatch = transformed.match(
				/^(\s*["']use client["'];?\n\n?)/
			)
			if (useClientMatch) {
				transformed = transformed.replace(
					useClientMatch[0],
					`${useClientMatch[0]}import { ${Array.from(neededLucideIcons).join(", ")} } from "lucide-react"\n`
				)
			} else {
				transformed = `import { ${Array.from(neededLucideIcons).join(", ")} } from "lucide-react"\n${transformed}`
			}
		}
	}

	return transformed
}
