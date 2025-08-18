import { execa } from "execa"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export class CLIRunner {
	cliPath: string

	constructor(cliPath = "../../dist/index.js") {
		this.cliPath = path.resolve(__dirname, cliPath)
	}

	async run(
		args: string[] = [],
		options: {
			cwd?: string
			env?: NodeJS.ProcessEnv
			input?: string | Buffer
		} = {}
	) {
		const result = await execa("node", [this.cliPath, ...args], {
			reject: false,
			...options,
		})

		return {
			stdout: result.stdout,
			stderr: result.stderr,
			exitCode: result.exitCode,
		}
	}
}
