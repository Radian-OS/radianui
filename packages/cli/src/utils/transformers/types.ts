import type { SourceFile } from "ts-morph"
import type { RawConfig } from "@/utils/getConfig"
import type { ProjectInfo } from "@/utils/getProjectInfo"

export type TransformContext = {
	sourceFile: SourceFile
	projectInfo: ProjectInfo
	filePath: string
	config: RawConfig
}

export type Transformer = {
	name: string
	enabled?: (context: TransformContext) => boolean
	transform: (
		context: TransformContext
	) => string | void | Promise<string | void>
}
