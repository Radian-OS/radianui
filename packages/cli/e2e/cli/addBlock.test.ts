import { CLIRunner } from '../utils/cliRunner'
import { promises as fs } from 'fs'
import fse, { pathExists } from 'fs-extra'
import os from 'os'
import path from 'path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

const cli = new CLIRunner()

describe('add block', () => {
  let tempDir: string
  const projectName = 'next-pages-src'

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), `cli-block-fixture-${Date.now()}`))

    const fixtureDir = path.join(__dirname, `../fixtures/radian-projects/${projectName}`)

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

  it(
    'should add hero-01 block to the correct path on nextjs page router with src',
    {
      timeout: 120000,
    },
    async () => {
      const { exitCode, stderr } = await cli.run(['add', 'hero-01', '-y', '-o'], {
        cwd: tempDir,
      })

      expect(exitCode).toBe(0)

      const heroPagePath = path.join(tempDir, 'src/pages/hero/index.tsx')
      const heroPageExists = await pathExists(heroPagePath)
      expect(heroPageExists).toBe(true)

      const companyLogoPagePath = path.join(tempDir, 'src/components/company-logos.tsx')
      const companyLogoPageExists = await pathExists(companyLogoPagePath)
      expect(companyLogoPageExists).toBe(true)
    }
  )
})
