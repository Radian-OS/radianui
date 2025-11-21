#!/usr/bin/env node
import { Command } from "commander"
import { add } from "@/commands/add.js"
import { init } from "@/commands/init.js"
import { displayGradientString } from "@/utils/gradientString"
import { handleError } from "@/utils/handleError"
import packageJson from "../package.json"
import { spinner } from "./utils/spinner"

process.on("uncaughtException", handleError)
process.on("unhandledRejection", handleError)
process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

async function main() {
	const program = new Command().name(packageJson.name).description(packageJson.description).version(packageJson.version, "-v, --version", "display the version number")

	displayGradientString(`RadianUI v${packageJson.version}`)

	program.addCommand(init)

	program.addCommand(add)

	program.parse()
}

main()
