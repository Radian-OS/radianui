import fs from "fs-extra"
import path from "path"
import { AddOptions } from "@/commands/add"
import { getConfig } from "@/utils/getConfig"

export const preflightAdd = async (options: AddOptions) => {
	if (!fs.existsSync(options.cwd) || !fs.existsSync(path.resolve(options.cwd, "package.json"))) {
		return {
			config: null,
		}
	}

	const config = await getConfig(options.cwd)
	return { config }
}
