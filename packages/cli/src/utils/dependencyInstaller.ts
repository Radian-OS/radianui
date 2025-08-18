import { RegistryComponents } from './registry'
import { execa } from 'execa'

import { AddOptions } from '@commands/add'
import { getDependencyInstaller, getPackageManager } from '@utils/getPackageManager'
import { handleError } from '@utils/handleError'
import { spinner } from '@utils/spinner'

export const installDependencies = async (projectDir: string, dependencies: string[], silent?: boolean) => {
  if (!dependencies.length) return
  const packageManager = await getPackageManager(projectDir, { withFallback: true })
  const dependencyInstaller = await getDependencyInstaller(projectDir)

  if (!dependencyInstaller) {
    handleError('Failed to install dependencies: Dependency installer not found')
  }

  const dependencySpinner = spinner('Installing dependencies', { silent }).start()
  try {
    await execa(packageManager, [dependencyInstaller!, ...dependencies], {
      cwd: projectDir,
    })
    dependencySpinner.succeed()
  } catch (error) {
    dependencySpinner.fail()
    handleError('Failed to install dependencies.')
  }
}

/**
 * Installs the required dependencies for the selected components.
 *
 * @param resolvedComponents - The resolved components with their dependencies.
 * @param options - The parsed command options.
 */
export async function installComponentDependencies(
  resolvedComponents: RegistryComponents,
  options: AddOptions
): Promise<void> {
  const dependencies = new Set<string>()

  for (const component of resolvedComponents) {
    if (component.dependencies?.length) {
      component.dependencies.forEach((dep) => dependencies.add(dep))
    }
  }

  if (!dependencies.size) {
    return
  }

  const dependencyList = Array.from(dependencies)

  await installDependencies(options.cwd, dependencyList)
}
