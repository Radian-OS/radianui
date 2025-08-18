import fs from 'fs-extra'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { updateViteConfig } from '@utils/viteConfig'

vi.mock('fs-extra')

describe('update vite config', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should write config when config file path exists', async () => {
    vi.mocked(fs.pathExists).mockResolvedValue(true as any)

    await updateViteConfig('test/path')

    expect(vi.mocked(fs.pathExists)).toHaveResolvedWith(true)
    expect(vi.mocked(fs.writeFile)).toHaveBeenCalledOnce()
  })

  it('should not write config when config file path does not exist', async () => {
    vi.mocked(fs.pathExists).mockResolvedValue(false as any)

    await updateViteConfig('test/path')

    expect(vi.mocked(fs.pathExists)).toHaveResolvedWith(false)
    expect(vi.mocked(fs.writeFile)).not.toHaveBeenCalled()
  })
})
