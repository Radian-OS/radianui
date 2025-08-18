import path from 'path'
import { expect, test } from 'vitest'

import { getPackageManager } from '@utils/getPackageManager'

test('get package manager', async () => {
  expect(await getPackageManager(path.resolve(__dirname, '../fixtures/projects/project-yarn'))).toBe('yarn')

  expect(await getPackageManager(path.resolve(__dirname, '../fixtures/projects/project-npm'))).toBe('npm')

  expect(await getPackageManager(path.resolve(__dirname, '../fixtures/projects/project-pnpm'))).toBe('pnpm')

  expect(await getPackageManager(path.resolve(__dirname, '../fixtures/projects/project-bun'))).toBe('bun')

  expect(await getPackageManager(path.resolve(__dirname, '../fixtures/projects/project-bun-lock'))).toBe('bun')
})
