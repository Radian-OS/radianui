#!/usr/bin/env node
import { Command } from "commander"
import { add } from "@/commands/add.js"
import { init } from "@/commands/init.js"
import { displayGradientString } from "@/utils/gradientString"
import { handleError } from "@/utils/handleError"
import packageJson from "../package.json"
import { info } from "./commands/info"
import { search } from "./commands/search"

process.on("uncaughtException", handleError)
process.on("unhandledRejection", handleError)
process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

async function main() {
	const program = new Command().name(packageJson.name).description(packageJson.description).version(packageJson.version, "-v, --version", "display the version number")

	if (!process.argv.includes("--json")) {
		displayGradientString(`RadianUI v${packageJson.version}`)
	}

	program.addCommand(init)

	program.addCommand(add)

	program.addCommand(search)

	program.addCommand(info)

	program.parse()
}

main()
