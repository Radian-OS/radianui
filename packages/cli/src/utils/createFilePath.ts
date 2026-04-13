import path from "path"
import { FrameworkName } from "@/utils/frameworks"
import { RawConfig } from "@/utils/getConfig"
import { RegistryComponentFile } from "@/utils/registry"

/**
 * Constructs the full file path for a new file based on the framework,
 * file type, and project configuration.
 *
 * @param file
 * @param cwd
 * @param frameworkName
 * @param config
 * @returns
 */
export const createFilePath = (
	file: RegistryComponentFile,
	cwd: string,
	frameworkName: FrameworkName,
	config: RawConfig
) => {
	let dir: string
	let filename: string

	switch (frameworkName) {
		case "next-app": {
			dir =
				file.type === "page"
					? path.join("app", `${file.targetDir}`)
					: path.join(...config.aliases[file.type].split("/").slice(1))
			filename = file.type === "page" ? "page.tsx" : file.name
			break
		}
		case "vite": {
			dir =
				file.type === "page"
					? `${file.targetDir}`
					: path.join(...config.aliases[file.type].split("/").slice(1))
			filename = file.name
			break
		}
		default:
			throw new Error("Framework not supported")
	}

	return path.join(cwd, config.hasSrcDir ? "src" : "", dir, filename)
}
