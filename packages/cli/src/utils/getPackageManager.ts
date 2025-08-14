import fs from 'fs-extra'
import { type AgentName, detect, getUserAgent } from 'package-manager-detector'
import path from 'path'

export const getPackageManager = async (
  projectPath: string,
  { withFallback }: { withFallback?: boolean } = { withFallback: false }
): Promise<AgentName> => {
  const resolvedPath = path.resolve(projectPath)

  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`The path "${resolvedPath}" does not exist.`)
  }

  const hasPackageJson = fs.existsSync(path.join(resolvedPath, 'package.json'))

  if (!hasPackageJson && withFallback) {
    return getFallbackPackageManager()
  }

  const detectedPackageManager = await detect({ cwd: resolvedPath })

  switch (detectedPackageManager?.name) {
    case 'npm':
    case 'pnpm':
    case 'bun':
    case 'yarn':
      return detectedPackageManager.name
    default:
      return withFallback ? getFallbackPackageManager() : 'npm'
  }
}

function getFallbackPackageManager(): AgentName {
  const userAgent = getUserAgent() || ''

  if (userAgent.startsWith('pnpm')) return 'pnpm'
  if (userAgent.startsWith('yarn')) return 'yarn'
  if (userAgent.startsWith('bun')) return 'bun'

  return 'npm'
}

export const getPackageRunner = async (projectPath: string) => {
  const packageManager = await getPackageManager(projectPath)

  if (!packageManager) return null

  switch (packageManager) {
    case 'npm':
      return 'npx'
    case 'pnpm':
      return 'pnpm dlx'
    case 'bun':
      return 'bunx'
    case 'yarn':
      return 'yarn dlx'
    default:
      return null
  }
}

export const getDependencyInstaller = async (projectPath: string) => {
  const packageManager = await getPackageManager(projectPath)

  if (!packageManager) return null

  switch (packageManager) {
    case 'npm':
      return 'install'
    case 'pnpm':
      return 'install'
    case 'bun':
      return 'add'
    case 'yarn':
      return 'add'
    default:
      return null
  }
}
