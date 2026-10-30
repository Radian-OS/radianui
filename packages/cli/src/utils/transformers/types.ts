import type { SourceFile } from "ts-morph"
import type { RawConfig } from "@/utils/getConfig"
import type { ProjectInfo } from "@/utils/getProjectInfo"
import type { Preset } from "@/registry/schema"

export type TransformContext = {
	sourceFile: SourceFile
	projectInfo: ProjectInfo
	filePath: string
	config: RawConfig
	componentSettings?: Preset["config"]["config"]["components"]
}

export type Transformer = {
	name: string
	enabled?: (context: TransformContext) => boolean
	transform: (
		context: TransformContext
	) => string | void | Promise<string | void>
}
