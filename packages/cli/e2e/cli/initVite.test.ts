import { CLIRunner } from "../utils/cliRunner"
import { promises as fs } from "fs"
import { pathExists, remove } from "fs-extra"
import os from "os"
import path from "path"
import { afterEach, beforeEach, describe, expect, it } from "vitest"

const cli = new CLIRunner()

describe("init new vite project", () => {
	let tempDir: string

	beforeEach(async () => {
		tempDir = await fs.mkdtemp(path.join(os.tmpdir(), `cli-e2e-${Date.now()}`))
	})

	afterEach(async () => {
		const entries = await fs.readdir(tempDir)
		await Promise.all(entries.filter((entry) => entry !== "node_modules").map((entry) => fs.rm(path.join(tempDir, entry), { recursive: true, force: true })))
	})

	it(
		"should initialize new vite project",
		{
			timeout: 120000, // 2 min
		},
		async () => {
			const projectName = "new-vite"

			const { exitCode, stderr } = await cli.run(["init", projectName, "--vite", "--useSrc", "-s", "--color=amber", "--font=inter"], {
				cwd: tempDir,
			})

			if (exitCode !== 0) {
				console.error(stderr)
			}

			expect(exitCode).toBe(0)

			const componentsJsonPath = path.join(tempDir, projectName, "components.json")
			const componentsJsonExists = await pathExists(componentsJsonPath)
			expect(componentsJsonExists).toBe(true)

			const srcDirPath = path.join(tempDir, projectName, "src")
			const srcDirExists = await pathExists(srcDirPath)
			expect(srcDirExists).toBe(true)

			const indexCssPath = path.join(tempDir, projectName, "src/index.css")
			const indexCssExists = await pathExists(indexCssPath)
			expect(indexCssExists).toBe(true)
		}
	)
})
