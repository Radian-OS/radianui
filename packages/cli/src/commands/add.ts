import { Command } from 'commander'
import fs from 'fs-extra'
import path from 'path'
import prompts from 'prompts'
import { z } from 'zod'

import { InitOptions, executeInit, init } from '@commands/init'
import { preflightAdd } from '@preflights/preFlightAdd'
import { txt } from '@utils/colors'
import { installComponentDependencies } from '@utils/dependencyInstaller'
import { findBlockDependencies } from '@utils/findBlockDependencies'
import { RawConfig, getConfig } from '@utils/getConfig'
import { ProjectInfo, getProjectInfo } from '@utils/getProjectInfo'
import { handleError } from '@utils/handleError'
import { logger } from '@utils/logger'
import { scaffoldNewProject, setupProjectConfig } from '@utils/project'
import { promptForComponents, promptForNewProject } from '@utils/prompts'
import {
  BlockAsset,
  RegistryComponentFile,
  type RegistryComponents,
  RegistryType,
  getAssets,
  getRegistryComponents,
  resolveComponents,
} from '@utils/registry'
import { spinner } from '@utils/spinner'
import { transform } from '@utils/transformers/transform'

const addOptionsSchema = z.object({
  components: z.array(z.string()).optional(),
  cwd: z.string(),
  yes: z.boolean(),
  all: z.boolean(),
  overwrite: z.boolean(),
  silent: z.boolean(),
})

export type AddOptions = z.infer<typeof addOptionsSchema>

// Define the `add` command with available options
export const add = new Command()
  .name('add')
  .description('Add components to ui folder inside the components folder in your project')
  .argument('[components...]', 'The components to add.')
  .option('-y, --yes', 'Skip confirmation prompts.', false)
  .option('-a, --all', 'Install all available components.', false)
  .option('-c, --cwd <cwd>', 'The working directory. Defaults to the current directory.', process.cwd())
  .option('-o, --overwrite', 'Overwrite existing files if they exist.', false)
  .option('-s, --silent', 'Mute output logs.', false)
  .action(async (components, opts) => {
    try {
      const options: AddOptions = addOptionsSchema.parse({
        components,
        cwd: path.resolve(opts.cwd),
        ...opts,
      })

      const preflight = await preflightAdd(options)

      // No project found. Ask the user to create a project first
      if (!preflight.config) {
        logger.log('The current path does not have a project. You can add components are creating a new project.')

        const initOptions: InitOptions = {
          cwd: options.cwd,
          skipPrompts: false,
          defaultConfigurations: false,
        }
        const projectPrompts = await promptForNewProject(options)

        const { projectPath } = await scaffoldNewProject(initOptions, projectPrompts)

        await setupProjectConfig(projectPath, projectPrompts.framework, projectPrompts.useSrcDir)

        // Update cwd to the new created project path
        options.cwd = projectPath
      }

      // If no components were provided, prompt the user to select
      if (!options.components?.length) {
        const selectedComponents = await promptForComponents(options)
        if (!selectedComponents.length) {
          logger.warn('No components selected. Exiting.')
          process.exit(1)
        }
        options.components = selectedComponents
      }

      const validComponents = await checkComponentsAvailability(options.components)

      const resolvedComponents = await resolveComponents(await getRegistryComponents(), validComponents)

      await addComponentsToProject(resolvedComponents, options, await getProjectInfo(options.cwd))
    } catch (error) {
      handleError(error)
    }
  })

/**
 * Checks if the selected components exist in the registry.
 *
 * @param components - List of component names to validate.
 * @returns A promise resolving to an array of valid component names.
 */
const checkComponentsAvailability = async (components: string[]): Promise<string[]> => {
  const componentAvailabilitySpinner = spinner('Checking registry').start()

  const availableComponents = (await getRegistryComponents()).map((components) => components.name)

  const invalidComponents = components.filter((component) => !availableComponents.includes(component))

  if (invalidComponents.length > 0) {
    componentAvailabilitySpinner.fail(`Checking registry. Not found:`)
    invalidComponents.forEach((component) => logger.info(`- ${component}`))
    process.exit(1)
  }

  componentAvailabilitySpinner.succeed()
  return components
}

/**
 * Resolve the directory of the components based on their type
 * @param type
 * @returns A path where the component should be stored at
 */
const resolveDir = async (type: RegistryType, config: RawConfig): Promise<string> => {
  if (type == 'ui') return config.aliases.ui.replace('@/', '')
  else if (type == 'component') return config.aliases.components.replace('@/', '')
  else if (type == 'animated') return config.aliases.animated?.replace('@/', '') ?? 'components/animated'
  else if (type == 'hook') return config.aliases.hooks?.replace('@/', '') ?? 'hooks'

  return config.aliases.components.replace('@/', '')
}

/**
 * Adds the resolved components to the project, handling file creation, assets downloading,
 * overwriting, and logging.
 *
 * @param resolvedComponents - The resolved components with their file definitions.
 * @param options - The parsed command options.
 * @param projectInfo - The project information (e.g., whether it has a `src` directory).
 */
async function addComponentsToProject(
  resolvedComponents: RegistryComponents,
  options: AddOptions,
  projectInfo: ProjectInfo
): Promise<void> {
  const hasSrcDir = projectInfo.hasSrcDir

  await installComponentDependencies(resolvedComponents, options)

  const filesCreated: string[] = []
  const filesUpdated: string[] = []
  const filesSkipped: string[] = []

  // Store the assets to be downloaded
  const assets: BlockAsset[] = []

  const blockDependencies = findBlockDependencies(resolvedComponents)

  const config = await getConfig(options.cwd)

  for (const component of resolvedComponents) {
    // Add files related to the component
    for (const file of component.files) {
      // A block's page always has a targetDir, so resolve to it
      let filePath: string

      switch (projectInfo.framework.name) {
        case 'next-app': {
          const resolvedDir = file.type === 'page' ? `app/${file.targetDir}` : await resolveDir(file.type, config)
          filePath = path.join(
            options.cwd,
            hasSrcDir ? 'src' : '',
            resolvedDir,
            file.type === 'page' ? 'page.tsx' : file.name
          )
          break
        }
        case 'next-pages': {
          const resolvedDir = file.type === 'page' ? `pages/${file.targetDir}` : await resolveDir(file.type, config)
          filePath = path.join(
            options.cwd,
            hasSrcDir ? 'src' : '',
            resolvedDir,
            file.type === 'page' ? 'index.tsx' : file.name
          )
          break
        }
        case 'vite': {
          const resolvedDir = file.type === 'page' ? `${file.targetDir}` : await resolveDir(file.type, config)
          filePath = path.join(options.cwd, hasSrcDir ? 'src' : '', resolvedDir, file.name)
          break
        }
        default:
          throw new Error('Framework not supported')
      }

      const fileExists = await fs.exists(filePath)

      if (fileExists && !options.overwrite) {
        // Skip asking overwrite questions for components
        // that are dependencies of a block
        const isBlockDependency = blockDependencies.has(component.name) && component.type !== 'block'
        if (isBlockDependency) {
          filesSkipped.push(filePath)
          continue
        }

        const { overwrite } = await prompts({
          type: 'confirm',
          name: 'overwrite',
          message: `Component ${txt.info(file.name)} already exists. Would you like to overwrite?`,
          initial: false,
        })

        if (!overwrite) {
          filesSkipped.push(filePath)
          continue
        }
      }

      await createFile(filePath, projectInfo, file, config)

      if (fileExists) {
        filesUpdated.push(filePath)
      } else {
        filesCreated.push(filePath)
      }
    }

    // Add the assets needed by the component
    // specifically needed when adding blocks
    if (component.assetsDirectory) {
      assets.push({
        componentName: component.name,
        assetsDirectory: component.assetsDirectory,
      })
    }
  }

  await getAssets(assets)

  if (!options.silent) {
    if (filesCreated.length > 0) {
      logger.break()
      logger.info(`Created ${filesCreated.length} file(s):`)
      filesCreated.forEach((file) => logger.log(`  - ${file}`))
    }
    if (filesUpdated.length > 0) {
      logger.break()
      logger.info(`Updated ${filesUpdated.length} file(s):`)
      filesUpdated.forEach((file) => logger.log(`  - ${file}`))
    }
    if (filesSkipped.length > 0) {
      logger.break()
      logger.info(`Skipped ${filesSkipped.length} file(s):`)
      filesSkipped.forEach((file) => logger.log(`  - ${file}`))
    }
  }
}

const createFile = async (
  filePath: string,
  projectInfo: ProjectInfo,
  file: RegistryComponentFile,
  config: RawConfig
) => {
  const dirPath = path.dirname(filePath)

  // Create folder path for the component, if it doesn't exist
  if (!(await fs.exists(dirPath))) {
    await fs.mkdir(dirPath, { recursive: true })
  }

  let transformedContent = await transform(projectInfo, filePath, file.content, config)

  await fs.writeFile(filePath, transformedContent)
}
