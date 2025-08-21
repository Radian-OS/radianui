import { Project } from "ts-morph"
import { RawConfig } from "@/utils/getConfig"
import { ProjectInfo } from "@/utils/getProjectInfo"
import { transformImport } from "@/utils/transformers/transformImport"
import { transformRsc } from "@/utils/transformers/transformRsc"

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
export const transform = async (projectInfo: ProjectInfo, filePath: string, content: string, config: RawConfig): Promise<string> => {
	const sourceFile = project.createSourceFile(filePath, content)

	let transformedContent = transformImport(sourceFile, config)

	// If this is a Vite project, apply RSC transformation
	if (projectInfo.framework.name === "vite") {
		transformedContent = transformRsc({
			sourceFile,
			projectInfo,
		})
	}

	sourceFile.delete()

	return transformedContent
}
