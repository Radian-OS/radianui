import fs from 'fs-extra'
import JSON5 from 'json5'
import { beforeEach } from 'node:test'
import { describe, expect, it, vi } from 'vitest'

import { updateTsConfigAppForVite } from '@utils/tsConfig'

vi.mock('fs-extra')
vi.mock('json5')

describe('update ts config for vite', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('should throw error when tsConfig.app.json is not found', async () => {
    vi.mocked(fs.pathExists).mockResolvedValue(false as any)

    const projectPath = '/not-real-path'

    await expect(updateTsConfigAppForVite(projectPath, 'vite')).rejects.toThrow()
  })

  it('should update config when tsConfig.app.json is found', async () => {
    vi.mocked(fs.pathExists).mockResolvedValue(true as any)
    vi.mocked(fs.readFile).mockResolvedValue('{}' as any)
    vi.mocked(JSON5.parse).mockReturnValue({ compilerOptions: {} })

    const projectPath = '/not-real-path'

    await updateTsConfigAppForVite(projectPath, 'vite')

    expect(fs.writeJson).toHaveBeenCalledOnce()
  })
})
