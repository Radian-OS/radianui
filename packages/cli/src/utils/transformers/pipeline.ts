import { Project } from "ts-morph"
import { transformImportTransformer } from "@/utils/transformers/transformImport"
import { transformRscTransformer } from "@/utils/transformers/transformRsc"
import type { TransformContext, Transformer } from "@/utils/transformers/types"
import { transformIconTransformer } from "./transformIcon"

export const createTransformPipeline = (transformers: Transformer[]) => {
	const project = new Project({ useInMemoryFileSystem: true })

	return async (context: TransformContext): Promise<string> => {
		let transformedContent = context.sourceFile.getFullText()

		// Create a single temporary file for this specific pipeline run
		const tempFile = project.createSourceFile(
			context.filePath,
			transformedContent,
			{ overwrite: true }
		)

		try {
			for (const transformer of transformers) {
				if (transformer.enabled && !transformer.enabled(context)) {
					continue
				}

				// Update the temp file with the latest content
				tempFile.replaceWithText(transformedContent)

				const result = await transformer.transform({
					...context,
					sourceFile: tempFile,
				})

				if (result) {
					transformedContent = result
				}
			}
		} finally {
			// Always clean up, even if a transformer fails
			tempFile.delete()
		}

		return transformedContent
	}
}

export const defaultTransformers: Transformer[] = [
	transformImportTransformer,
	transformRscTransformer,
	transformIconTransformer,
]

export const defaultTransformPipeline =
	createTransformPipeline(defaultTransformers)
