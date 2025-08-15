import fs from 'fs-extra'
import JSON5 from 'json5'
import path from 'path'

export const updateTsConfigForVite = async (projectPath: string) => {
  const tsConfigPath = path.join(projectPath, 'tsconfig.json')

  const alias = {
    baseUrl: '.',
    paths: {
      '@/*': ['./src/*'],
    },
  }

  try {
    if (await fs.pathExists(tsConfigPath)) {
      const tsConfig = await fs.readJson(tsConfigPath)
      tsConfig.compilerOptions = {
        ...tsConfig.compilerOptions,
        ...alias,
      }
      await fs.writeJson(tsConfigPath, tsConfig, { spaces: 2 })
    }
  } catch (err) {
    throw new Error(`Failed to update tsconfig.json: ${err}`)
  }
}

export const updateTsConfigAppForVite = async (projectPath: string, framework: 'next' | 'vite') => {
  if (framework !== 'vite') return

  const tsConfigPath = path.join(projectPath, 'tsconfig.app.json')

  const newCompilerOptions = {
    baseUrl: '.',
    paths: {
      '@/*': ['./src/*'],
    },
  }

  try {
    if (await fs.pathExists(tsConfigPath)) {
      const raw = await fs.readFile(tsConfigPath, 'utf8')
      const tsConfig = JSON5.parse(raw)

      tsConfig.compilerOptions = {
        ...(tsConfig.compilerOptions || {}),
        ...newCompilerOptions,
        paths: {
          ...(tsConfig.compilerOptions?.paths || {}),
          ...newCompilerOptions.paths,
        },
      }

      await fs.writeJson(tsConfigPath, tsConfig, { spaces: 2 })
    } else {
      throw new Error(`tsconfig.app.json not found at ${tsConfigPath}`)
    }
  } catch (err) {
    throw new Error(`Failed to update tsconfig.app.json: ${err}`)
  }
}
