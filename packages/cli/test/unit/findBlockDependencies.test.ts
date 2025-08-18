import { describe, expect, it } from 'vitest'

import { findBlockDependencies } from '@utils/findBlockDependencies'
import { RegistryComponents } from '@utils/registry'

describe('find block dependencies', () => {
  it('should return set of dependencies of blocks when given correct input', () => {
    const components: RegistryComponents = [
      {
        name: 'signin-01',
        type: 'block',
        files: [
          {
            dir: '/app/registry/view-blocks/signin-01',
            targetDir: 'signin',
            content: '',
            name: 'page.tsx',
            type: 'page',
          },
        ],
        registryDependencies: ['button', 'input'],
      },
      {
        name: 'button',
        files: [
          {
            name: 'button.tsx',
            content: '',
            type: 'ui',
          },
        ],
        registryDependencies: ['spinner'],
        type: 'ui',
      },
      {
        name: 'input',
        files: [
          {
            name: 'input.tsx',
            content: '',
            type: 'ui',
          },
        ],
        type: 'ui',
      },
      {
        name: 'select',
        files: [{ name: 'select.tsx', content: '', type: 'ui' }],
        type: 'ui',
      },
    ]

    const result = findBlockDependencies(components)
    expect(result).toEqual(new Set(['button', 'input', 'spinner']))
  })

  it('should return empty set when no blocks exist', () => {
    const components: RegistryComponents = [
      { name: 'button', type: 'ui', files: [{ name: 'button.tsx', content: '', type: 'ui' }] },
    ]

    const result = findBlockDependencies(components)
    expect(result).toEqual(new Set())
  })

  it('should handle circular dependencies without infinite loop', () => {
    const components: RegistryComponents = [
      { name: 'hero-01', type: 'block', registryDependencies: ['button'], files: [] },
      { name: 'button', type: 'ui', registryDependencies: ['input'], files: [] },
      { name: 'input', type: 'ui', registryDependencies: ['button'], files: [] },
    ]

    const result = findBlockDependencies(components)
    expect(result).toEqual(new Set(['button', 'input']))
  })
})
