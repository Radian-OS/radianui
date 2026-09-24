import { Project } from "ts-morph"
import { RawConfig } from "@/utils/getConfig"
import { ProjectInfo } from "@/utils/getProjectInfo"
import { defaultTransformPipeline } from "@/utils/transformers/pipeline"

const project = new Project({ useInMemoryFileSystem: true })

/**
 * Apply transformations on the content of a component
 * according to the project configuration
 * such as updating import alias, etc.
 * @param projectInfo - Project configuration
 * @param filePath
 * @param content
 * @returns transformed content of the component
 */
export const transform = async (
	projectInfo: ProjectInfo,
	filePath: string,
	content: string,
	config: RawConfig
): Promise<string> => {
	if (!/\.(tsx?|jsx?)$/.test(filePath)) {
		return content
	}

	const sourceFile = project.createSourceFile(filePath, content)

	try {
		return await defaultTransformPipeline({
			sourceFile,
			projectInfo,
			filePath,
			config,
		})
	} finally {
		sourceFile.delete()
	}
}
