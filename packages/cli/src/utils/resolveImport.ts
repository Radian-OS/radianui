import path from "path"
import { type ConfigLoaderSuccessResult, createMatchPath } from "tsconfig-paths"

export async function resolveImport(
	importPath: string,
	config: Pick<ConfigLoaderSuccessResult, "absoluteBaseUrl" | "paths">
) {
	const matched = createMatchPath(config.absoluteBaseUrl, config.paths)(
		importPath,
		undefined,
		() => true,
		[".ts", ".tsx", ".jsx", ".js", ".css"]
	)
	return matched ? path.normalize(matched) : matched
}
