import { JsxAttribute, SourceFile, StringLiteral, SyntaxKind } from "ts-morph"
import { IconLibrary } from "@/registry/constants"
import { RawConfig } from "../getConfig"
import { fetchIconMappings } from "../registry"
import type { Transformer } from "./types"

export interface IconMapping {
	slot: string
	lucideIcon: string
	hugeiconsIcon: string
}

interface LibraryConfig {
	/** Render a resolved icon name + passthrough props into a JSX string */
	renderJsx: (iconName: string, props: string) => string
	/** Return all import lines needed (called once after all icons are collected) */
	buildImports: (iconNames: string[]) => string[]
}

const LIBRARY_CONFIG: Record<IconLibrary, LibraryConfig> = {
	lucide: {
		renderJsx: (iconName, props) =>
			props ? `<${iconName} ${props} />` : `<${iconName} />`,

		buildImports: (iconNames) => [
			`import { ${iconNames.join(", ")} } from "lucide-react"`,
		],
	},

	hugeicons: {
		// Icon definitions are passed as the `icon` prop to the shared wrapper
		renderJsx: (iconName, props) =>
			props
				? `<HugeiconsIcon icon={${iconName}} ${props} />`
				: `<HugeiconsIcon icon={${iconName}} />`,

		// Two imports: wrapper component + icon definition objects
		buildImports: (iconNames) => [
			`import { HugeiconsIcon } from "@hugeicons/react"`,
			`import { ${iconNames.join(", ")} } from "@hugeicons/core-free-icons"`,
		],
	},
}

const MAPPING_KEYS = {
	lucide: "lucideIcon",
	hugeicons: "hugeiconsIcon",
}

export const transformIconTransformer: Transformer = {
	name: "transform-icon",
	transform: ({ sourceFile, config }) => transformIcon(sourceFile, config),
}

export const transformIcon = async (
	sourceFile: SourceFile,
	config: RawConfig
): Promise<string> => {
	const library = config.iconLibrary as IconLibrary
	const libraryConfig = LIBRARY_CONFIG[library]

	if (!libraryConfig) return sourceFile.getFullText()

	const iconMappings = await fetchIconMappings()

	const mappingKey = MAPPING_KEYS[library]

	const slotToIcon = new Map<string, string>(
		iconMappings.map((m) => [m.slot, m[mappingKey]])
	)

	// Preserves insertion order for stable import output
	const usedIcons = new Set<string>()

	// Replace every <IconSlot slot="…" …props />
	//
	// Snapshot first — replacing nodes shifts positions, so we must not
	// iterate a live descendant list while mutating.
	const iconSlotElements = sourceFile
		.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement)
		.filter((el) => el.getTagNameNode().getText() === "IconSlot")

	for (const element of iconSlotElements) {
		const slotAttr = element.getAttribute("slot") as JsxAttribute | undefined
		const slotValue = (
			slotAttr?.getInitializer() as StringLiteral | undefined
		)?.getLiteralValue()

		if (!slotValue) continue

		const iconName = slotToIcon.get(slotValue)
		if (!iconName) continue

		usedIcons.add(iconName)

		// All props except `slot` are passed through verbatim
		const passthroughProps = element
			.getAttributes()
			.filter(
				(attr) =>
					!(
						attr instanceof JsxAttribute &&
						attr.getNameNode().getText() === "slot"
					)
			)
			.map((attr) => attr.getText())
			.join(" ")

		element.replaceWithText(libraryConfig.renderJsx(iconName, passthroughProps))
	}

	if (usedIcons.size === 0) return sourceFile.getFullText()

	// Swap out the IconSlot import declaration
	const newImports = libraryConfig.buildImports([...usedIcons]).join("\n")

	const iconSlotImport = sourceFile.getImportDeclaration((decl) =>
		decl.getNamedImports().some((named) => named.getName() === "IconSlot")
	)

	if (iconSlotImport) {
		iconSlotImport.replaceWithText(newImports)
	} else {
		sourceFile.insertText(0, newImports + "\n")
	}

	return sourceFile.getFullText()
}
