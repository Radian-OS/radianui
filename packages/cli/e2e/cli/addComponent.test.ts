import { CLIRunner } from '../utils/cliRunner'
import { promises as fs } from 'fs'
import fse, { pathExists, remove } from 'fs-extra'
import os from 'os'
import path from 'path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

const cli = new CLIRunner()

describe('add component', () => {
  let tempDir: string
  const projectName = 'next-app-no-src'

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
    'should add button and select with their dependencies on nextjs app router without src',
    { timeout: 120000 },
    async () => {
      const { exitCode, stderr } = await cli.run(['add', 'button', 'select', '-y', '-o'], {
        cwd: tempDir,
      })

      expect(exitCode).toBe(0)

      const buttonPath = path.join(tempDir, '/components/ui/button.tsx')
      const buttonExists = await pathExists(buttonPath)
      expect(buttonExists).toBe(true)

      const selectPath = path.join(tempDir, 'components/ui/select.tsx')
      const selectExists = await pathExists(selectPath)
      expect(selectExists).toBe(true)

      // Dependencies
      const spinnerPath = path.join(tempDir, 'components/ui/spinner.tsx')
      const spinnerExists = await pathExists(spinnerPath)
      expect(spinnerExists).toBe(true)

      const badgePath = path.join(tempDir, 'components/ui/badge.tsx')
      const badgeExists = await pathExists(badgePath)
      expect(badgeExists).toBe(true)

      const dividerPath = path.join(tempDir, 'components/ui/divider.tsx')
      const dividerExists = await pathExists(dividerPath)
      expect(dividerExists).toBe(true)

      const dropdownPath = path.join(tempDir, 'components/ui/dropdown.tsx')
      const dropdownExists = await pathExists(dropdownPath)
      expect(dropdownExists).toBe(true)

      const inputPath = path.join(tempDir, 'components/ui/input.tsx')
      const inputExists = await pathExists(inputPath)
      expect(inputExists).toBe(true)

      const labelPath = path.join(tempDir, 'components/ui/label.tsx')
      const labelExists = await pathExists(labelPath)
      expect(labelExists).toBe(true)
    }
  )
})

describe('add component - incorrect components.json file', () => {
  let tempDir: string
  const projectName = 'next-app-wrong-config'

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

  it('should show invalid components.json error', { timeout: 30000 }, async () => {
    const { exitCode, stderr } = await cli.run(['add', 'button', '-y', '-o'], {
      cwd: tempDir,
    })

    expect(exitCode).toBe(1)
    expect(stderr).toContain('Error loading components.json configuration: Invalid components.json file')
  })
})
