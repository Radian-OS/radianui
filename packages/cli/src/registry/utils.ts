import path from "path"
import { z } from "zod"
import { registryItemSchema } from "@/registry/schema"
import { Config } from "@/utils/getConfig"

type RegistryItemFile = NonNullable<
	z.infer<typeof registryItemSchema>["files"]
>[number]

/**
 * Deduplicates registry files by their resolved target path.
 * Later files override earlier ones for the same target.
 */
export async function deduplicateFilesByTarget(
	fileSets: RegistryItemFile[][],
	config: Config
) {
	const fileMap = new Map<string, RegistryItemFile>()

	for (const files of fileSets) {
		for (const file of files) {
			const target = file.target ?? file.path
			if (target) {
				fileMap.set(target, file)
			}
		}
	}

	return Array.from(fileMap.values())
}

export function isUrl(str: string) {
	try {
		new URL(str)
		return true
	} catch {
		return false
	}
}

export function isLocalFile(str: string) {
	return (
		str.startsWith("/") ||
		str.startsWith("./") ||
		str.startsWith("../") ||
		path.isAbsolute(str)
	)
}
