import postcss from "postcss"
import selectorParser, {
	type ClassName,
	type Selector as SelectorNodeRoot,
} from "postcss-selector-parser"
import { z } from "zod"

const CN_PREFIX = "cn-"
const R_PREFIX = "r-"

export const styleMapSchema = z.record(
	z.string().refine((k) => k.startsWith(CN_PREFIX) || k.startsWith(R_PREFIX), {
		message: `Key must start with "${CN_PREFIX}" or "${R_PREFIX}"`,
	}),
	z.string()
)

export type StyleMap = z.infer<typeof styleMapSchema>

/**
 * Parse a CSS string and build a token → Tailwind-classes map.
 *
 * @param input  Raw CSS content.
 * @param prefix Token prefix to collect. Defaults to "cn-".
 *               Pass "r-" to parse radius-*.css files.
 */
export function createStyleMap(input: string, prefix: string = CN_PREFIX) {
	const root = postcss.parse(input)

	const result: Record<string, string> = {}

	root.walkRules((rule) => {
		const selectors = rule.selectors ?? []

		if (selectors.length === 0) {
			return
		}

		const tailwindClasses = extractTailwindClasses(rule)

		if (!tailwindClasses) {
			return
		}

		for (const selector of selectors) {
			const normalizedSelector = normalizeSelector(selector)

			selectorParser((selectorsRoot) => {
				selectorsRoot.each((sel) => {
					const targetClass = findSubjectClass(sel, prefix)

					if (!targetClass) {
						return
					}

					const className = targetClass.value

					result[className] = result[className]
						? `${tailwindClasses} ${result[className]}`
						: tailwindClasses
				})
			}).processSync(normalizedSelector)
		}
	})

	return result
}

/**
 * Merge multiple style maps into one. Later maps win on key conflicts.
 */
export function mergeStyleMaps(...maps: Record<string, string>[]): StyleMap {
	const merged = Object.assign({}, ...maps)
	return styleMapSchema.parse(merged)
}

function normalizeSelector(selector: string) {
	return selector.replace(/\s*&\s*/g, "").trim()
}

function extractTailwindClasses(rule: postcss.Rule) {
	const classes: string[] = []

	for (const node of rule.nodes || []) {
		if (node.type === "atrule" && node.name === "apply") {
			const value = node.params.trim()
			if (value) {
				classes.push(value)
			}
		}
	}

	if (classes.length === 0) {
		return null
	}

	return classes.join(" ")
}

function findSubjectClass(selector: SelectorNodeRoot, prefix: string) {
	const classNodes: ClassName[] = []

	selector.walkClasses((classNode) => {
		if (classNode.value.startsWith(prefix)) {
			classNodes.push(classNode)
		}
	})

	if (classNodes.length === 0) {
		return null
	}

	return classNodes[classNodes.length - 1]
}
