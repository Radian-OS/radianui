import { CLIRunner } from '../utils/cliRunner'
import { promises as fs } from 'fs'
import fse, { pathExists, readFile, remove } from 'fs-extra'
import os from 'os'
import path from 'path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

const cli = new CLIRunner()

describe(
  'init in existing vite project with src',
  {
    timeout: 60000, // 1 min
  },
  () => {
    let tempDir: string
    const projectName = 'vite-project'

    beforeEach(async () => {
      tempDir = await fs.mkdtemp(path.join(os.tmpdir(), `cli-fixture-${Date.now()}`))

      const fixtureDir = path.join(__dirname, `../fixtures/${projectName}`)

      await fse.copy(fixtureDir, tempDir)
    })

    afterEach(async () => {
      // Clean up the temp directory
      const entries = await fs.readdir(tempDir)
      await Promise.all(
        entries
          .filter((entry) => entry !== 'node_modules')
          .map((entry) => fs.rm(path.join(tempDir, entry), { recursive: true, force: true }))
      )
    })

    it('should create configs, set alias and global css file', async () => {
      const defaultComponentsJson = `{
        "$schema": "https://radianos.com/schema.json",
        "aliases": {
          "components": "@/components",
          "utils": "@/lib/utils",
          "ui": "@/components/ui",
          "animated": "@/components/animated",
          "lib": "@/lib",
          "hooks": "@/hooks"
        },
        "hasSrcDir": true
      }`

      const { exitCode, stderr } = await cli.run(['init'], {
        cwd: tempDir,
      })

      if (exitCode !== 0) {
        console.error(stderr)
      }

      expect(exitCode).toBe(0)

      const componentsJsonPath = path.join(tempDir, 'components.json')
      const componentsJsonExists = await pathExists(componentsJsonPath)
      expect(componentsJsonExists).toBe(true)

      const componentsJson = await readFile(componentsJsonPath, 'utf-8')
      expect(JSON.parse(componentsJson)).toEqual(JSON.parse(defaultComponentsJson))

      const srcDirPath = path.join(tempDir, 'src')
      const srcDirExists = await pathExists(srcDirPath)
      expect(srcDirExists).toBe(true)

      const globalCssPath = path.join(tempDir, 'src/index.css')
      const globalCssExists = await pathExists(globalCssPath)
      expect(globalCssExists).toBe(true)
    })
  }
)
