import path from "node:path"
import { Node, SyntaxKind } from "ts-morph"
import {
	componentSettingsDefinitions,
	type ComponentSettingsDefinition,
} from "./component-settings"
import type { TransformContext, Transformer } from "./types"

// One source-editing implementation for every registered component.
export function createComponentSettingsTransformer(
	definitions: readonly ComponentSettingsDefinition[]
): Transformer {
	const findDefinition = (context: TransformContext) =>
		definitions.find(
			(definition) =>
				definition.fileNames.includes(path.basename(context.filePath)) &&
				context.componentSettings?.[definition.key] !== undefined
		)
	return {
		name: "component-settings",
		enabled: (context) => Boolean(findDefinition(context)),
		transform: (context) => {
			const definition = findDefinition(context)
			if (!definition) return
			const result = definition.defaultsSchema.safeParse(
				context.componentSettings?.[definition.key]
			)
			if (!result.success) {
				const fields = result.error.issues
					.map((issue) => issue.path.join("."))
					.join(", ")
				throw new Error(
					`Invalid ${definition.label} settings in preset (${fields})`
				)
			}
			const defaults = Object.entries(result.data).filter(
				([, value]) => value !== undefined
			)
			if (!defaults.length) return
			const declaration = context.sourceFile.getVariableDeclaration(
				definition.defaultsVariable
			)
			const initializer = declaration?.getInitializerIfKind(
				SyntaxKind.ObjectLiteralExpression
			)
			if (!initializer)
				throw new Error(
					`This ${definition.label} registry is outdated. Use a registry containing the ${definition.defaultsVariable} defaults object before installing this preset.`
				)
			for (const [key, value] of defaults) {
				const property = initializer.getProperty(key)
				if (property && !Node.isPropertyAssignment(property))
					throw new Error(
						`Unsupported ${definition.label} default property: ${key}`
					)
				const serialized = JSON.stringify(value)
				if (serialized === undefined)
					throw new Error(`Invalid ${definition.label} default value: ${key}`)
				if (property && Node.isPropertyAssignment(property))
					property.setInitializer(serialized)
				else
					initializer.addPropertyAssignment({
						name: key,
						initializer: serialized,
					})
			}
			return context.sourceFile.getFullText()
		},
	}
}

export const transformComponentSettingsTransformer =
	createComponentSettingsTransformer(componentSettingsDefinitions)
