import fs from 'fs-extra'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { replaceViteAppTsxAndRemoveCss } from '@utils/viteConfig'

vi.mock('fs-extra')

describe('replace vite app tsx and remove css', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('should write app template when App.tsx is present', async () => {
    vi.mocked(fs.pathExists).mockResolvedValue(false as any)
    await replaceViteAppTsxAndRemoveCss('test-dir')

    expect(fs.ensureFile).toHaveBeenCalled()
    expect(fs.writeFile).toHaveBeenCalled()
    expect(fs.remove).not.toHaveBeenCalled()
  })

  it('should remove css file when it is present', async () => {
    vi.mocked(fs.pathExists).mockResolvedValue(true as any)
    await replaceViteAppTsxAndRemoveCss('test-dir')

    expect(fs.remove).toHaveBeenCalled()
  })
})
