import { describe, expect, it } from 'vitest'

import { RegistryComponents, resolveComponents } from '@utils/registry'

describe('resolve components', () => {
  it('should return list of components when given component names', async () => {
    const registryComponents: RegistryComponents = [
      {
        name: 'modal',
        files: [],
        dependencies: ['@radix-ui/react-dialog'],
        registryDependencies: ['button', 'divider'],
        type: 'ui',
      },

      {
        name: 'button',
        files: [],
        dependencies: ['@radix-ui/react-slot'],
        registryDependencies: ['spinner'],
        type: 'ui',
      },
      { name: 'spinner', files: [], type: 'ui' },
      { name: 'divider', files: [], type: 'ui' },
      { name: 'banner', files: [], type: 'ui' },
    ]
    const componentNames = ['modal', 'spinner']

    const resolvedComponents = await resolveComponents(registryComponents, componentNames)

    const correctOutput = [
      {
        name: 'modal',
        files: [],
        dependencies: ['@radix-ui/react-dialog'],
        registryDependencies: ['button', 'divider'],
        type: 'ui',
      },
      {
        name: 'button',
        files: [],
        dependencies: ['@radix-ui/react-slot'],
        registryDependencies: ['spinner'],
        type: 'ui',
      },
      { name: 'spinner', files: [], type: 'ui' },
      { name: 'divider', files: [], type: 'ui' },
    ]
    expect(resolvedComponents).toEqual(correctOutput)
  })
})
