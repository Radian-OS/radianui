import fs from 'fs-extra'
import { beforeEach } from 'node:test'
import { describe, expect, it, vi } from 'vitest'

import { updateTsConfigForVite } from '@utils/tsConfig'

vi.mock('fs-extra')

describe('update ts config for vite', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('should throw error when tsConfig.json is not found', async () => {
    vi.mocked(fs.pathExists).mockResolvedValue(false as any)

    const projectPath = '/not-real-path'

    await expect(updateTsConfigForVite(projectPath)).rejects.toThrow()
  })

  it('should update config when tsConfig.json is found', async () => {
    vi.mocked(fs.pathExists).mockResolvedValue(true as any)
    vi.mocked(fs.readJson).mockResolvedValue({ compilerOptions: {} })

    const projectPath = '/not-real-path'

    await updateTsConfigForVite(projectPath)

    expect(fs.writeJson).toHaveBeenCalledOnce()
  })
})
