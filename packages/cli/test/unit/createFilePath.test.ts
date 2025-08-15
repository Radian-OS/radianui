import path from 'path'
import { cwd } from 'process'
import { describe, expect, it } from 'vitest'

import { createFilePath } from '@utils/createFilePath'
import { RawConfig } from '@utils/getConfig'
import { RegistryComponentFile } from '@utils/registry'

describe('create file path for next-app', () => {
  const config: RawConfig = {
    aliases: {
      components: '@/components',
      utils: '@/lib/utils',
      ui: '@/components/ui',
      animated: '@/components/animated',
      lib: '@/lib',
      hooks: '@/hooks',
    },
    hasSrcDir: true,
  }

  const currentDir = cwd()

  it('should create file path for a ui component when given src config', () => {
    const page: RegistryComponentFile = {
      name: 'page.tsx',
      type: 'page',
      content: '',
      targetDir: 'hero',
    }

    const file: RegistryComponentFile = {
      name: 'select.tsx',
      type: 'ui',
      content: '',
    }

    const filepath = createFilePath(file, currentDir, 'next-app', config)
    const pagepath = createFilePath(page, currentDir, 'next-app', config)

    expect(filepath).toBe(path.join(currentDir, 'src/components/ui/select.tsx'))
    expect(pagepath).toBe(path.join(currentDir, 'src/app/hero/page.tsx'))
  })

  it('should create file path for a ui component when given no src config', () => {
    config.hasSrcDir = false

    const file: RegistryComponentFile = {
      name: 'drag.tsx',
      type: 'animated',
      content: '',
    }

    const filepath = createFilePath(file, currentDir, 'next-app', config)

    expect(filepath).toBe(path.join(currentDir, 'components/animated/drag.tsx'))
  })
})

describe('create file path for next-pages', () => {
  const config: RawConfig = {
    aliases: {
      components: '@/components',
      utils: '@/lib/utils',
      ui: '@/components/ui',
      animated: '@/components/animated',
      lib: '@/lib',
      hooks: '@/hooks',
    },
    hasSrcDir: true,
  }

  const currentDir = cwd()

  it('should create file path for a ui component when given src config', () => {
    const page: RegistryComponentFile = {
      name: 'page.tsx',
      type: 'page',
      content: '',
      targetDir: 'hero',
    }

    const file: RegistryComponentFile = {
      name: 'select.tsx',
      type: 'ui',
      content: '',
    }

    const filepath = createFilePath(file, currentDir, 'next-pages', config)
    const pagepath = createFilePath(page, currentDir, 'next-pages', config)

    expect(filepath).toBe(path.join(currentDir, 'src/components/ui/select.tsx'))
    expect(pagepath).toBe(path.join(currentDir, 'src/pages/hero/index.tsx'))
  })

  it('should create file path for a ui component when given no src config', () => {
    config.hasSrcDir = false

    const file: RegistryComponentFile = {
      name: 'drag.tsx',
      type: 'animated',
      content: '',
    }

    const filepath = createFilePath(file, currentDir, 'next-pages', config)

    expect(filepath).toBe(path.join(currentDir, 'components/animated/drag.tsx'))
  })
})
