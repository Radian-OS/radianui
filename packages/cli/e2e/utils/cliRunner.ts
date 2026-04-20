import { execa } from "execa"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export type CLIResult = {
  stdout: string
  stderr: string
  combined: string
  exitCode: number | null
}

const ANSI_PATTERN = new RegExp(
  "[\\u001B\\u009B][[\\]()#;?]*" +
    "(?:" +
    "(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)" +
    "|" +
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~])" +
    ")",
  "g"
)

export const stripAnsi = (input: string) => input.replace(ANSI_PATTERN, "")

export class CLIRunner {
  readonly cliPath: string

  constructor(cliPath = "../../dist/index.js") {
    this.cliPath = path.resolve(__dirname, cliPath)
  }

  async run(
    args: string[] = [],
    options: {
      cwd?: string
      env?: NodeJS.ProcessEnv
      input?: string | Buffer
      timeout?: number
    } = {}
  ): Promise<CLIResult> {
    const result = await execa("node", [this.cliPath, ...args], {
      reject: false,
      env: { ...process.env, NO_COLOR: "1", FORCE_COLOR: "0", ...options.env },
      cwd: options.cwd,
      input: options.input,
      timeout: options.timeout,
    })

    const stdout = stripAnsi(result.stdout ?? "")
    const stderr = stripAnsi(result.stderr ?? "")

    return {
      stdout,
      stderr,
      combined: `${stdout}\n${stderr}`,
      exitCode: result.exitCode ?? null,
    }
  }
}
