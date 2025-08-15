import path from 'path'
import { describe, expect, it } from 'vitest'

import { FRAMEWORKS } from '@utils/frameworks'
import { getProjectInfo } from '@utils/getProjectInfo'

describe('get project info', () => {
  it.each([
    {
      name: 'next-app',
      type: {
        framework: FRAMEWORKS['next-app'],
        hasSrcDir: false,
        isRSC: true,
        isTsx: true,
        tailwindConfigFile: null,
        tailwindCssFile: 'app/globals.css',
        aliasPrefix: '@',
      },
    },
    {
      name: 'vite',
      type: {
        framework: FRAMEWORKS['vite'],
        hasSrcDir: true,
        isRSC: false,
        isTsx: true,
        tailwindConfigFile: null,
        tailwindCssFile: 'src/globals.css',
        aliasPrefix: '@',
      },
    },
  ])('should read project info of $name when given project path', async ({ name, type }) => {
    expect(await getProjectInfo(path.resolve(__dirname, `../fixtures/frameworks/${name}`))).toStrictEqual(type)
  })
})
