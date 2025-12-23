import { Command } from "commander"
import fs from "fs-extra"
import path from "path"
import { z } from "zod"
import { InitOptions, executeInit } from "@/commands/init"
import { preflightAdd } from "@/preflights/preFlightAdd"
import { createFilePath } from "@/utils/createFilePath"
import { installComponentDependencies } from "@/utils/dependencyInstaller"
import { findBlockDependencies } from "@/utils/findBlockDependencies"
import { RawConfig, getConfig } from "@/utils/getConfig"
import { ProjectInfo, getProjectInfo } from "@/utils/getProjectInfo"
import { handleError } from "@/utils/handleError"
import { logger } from "@/utils/logger"
import { promptForComponents } from "@/utils/prompts"
import { BlockAsset, RegistryComponentFile, type RegistryComponents, getAssets, getRegistryComponents, resolveComponents } from "@/utils/registry"
import { spinner } from "@/utils/spinner"
import { transform } from "@/utils/transformers/transform"

const addOptionsSchema = z.object({
	components: z.array(z.string()).optional(),
	cwd: z.string(),
	yes: z.boolean(),
	all: z.boolean(),
	overwrite: z.boolean(),
})

export type AddOptions = z.infer<typeof addOptionsSchema>

export const add = new Command()
	.name("add")
	.description("add components to ui folder inside the components folder in your project")
	.argument("[components...]", "the components to add.")
	.option("-y, --yes", "skip confirmation prompts.", false)
	.option("-a, --all", "install all available components.", false)
	.option("-c, --cwd <cwd>", "the working directory. defaults to the current directory.", process.cwd())
	.option("-o, --overwrite", "overwrite existing files if they exist.", false)
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
				logger.break()
				logger.info("The current path does not have a project. You can add components are creating a new project.")
				logger.break()

				const initOptions: InitOptions = {
					cwd: options.cwd,
					skipPrompts: options.yes,
					defaultConfigurations: false,
				}

				const { projectName } = await executeInit(initOptions)
				// Update cwd to the new created project path
				options.cwd = path.join(options.cwd, projectName!)
			}

			// If no components were provided, prompt the user to select
			if (!options.components?.length) {
				const selectedComponents = await promptForComponents(options)
				if (!selectedComponents.length) {
					logger.warn("No components selected. Exiting.")
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
	const componentAvailabilitySpinner = spinner("Checking registry").start()

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
 * Adds the resolved components to the project, handling file creation, assets downloading,
 * overwriting, and logging.
 *
 * @param resolvedComponents - The resolved components with their file definitions.
 * @param options - The parsed command options.
 * @param projectInfo - The project information (e.g., whether it has a `src` directory).
 */
async function addComponentsToProject(resolvedComponents: RegistryComponents, options: AddOptions, projectInfo: ProjectInfo): Promise<void> {
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
			const filepath = createFilePath(file, options.cwd, projectInfo.framework.name, config)

			const fileExists = await fs.exists(filepath)

			if (fileExists && !options.overwrite) {
				// Skip asking overwrite questions for components
				// that are dependencies of a block
				const isBlockDependency = blockDependencies.has(component.name) && component.type !== "block"
				if (isBlockDependency) {
					filesSkipped.push(filepath)
					continue
				}

				filesSkipped.push(filepath)
				continue
			}

			await createFile(filepath, projectInfo, file, config)

			if (fileExists) {
				filesUpdated.push(filepath)
			} else {
				filesCreated.push(filepath)
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

	await getAssets(assets, options.cwd)

	filesCreated.sort()
	filesUpdated.sort()
	filesSkipped.sort()

	const hasUpdatedFiles = filesCreated.length || filesUpdated.length
	if (!hasUpdatedFiles && !filesSkipped.length) {
		spinner(`No files updated.`)?.info()
	}

	if (filesCreated.length) {
		spinner(`Created ${filesCreated.length} ${filesCreated.length === 1 ? "file" : "files"}:`)?.succeed()
		for (const file of filesCreated) {
			logger.log(`  - ${file}`)
		}
	}

	if (filesUpdated.length) {
		spinner(`Updated ${filesUpdated.length} ${filesUpdated.length === 1 ? "file" : "files"}:`)?.info()
		for (const file of filesUpdated) {
			logger.log(`  - ${file}`)
		}
	}

	if (filesSkipped.length) {
		spinner(`Skipped ${filesSkipped.length} ${filesSkipped.length === 1 ? "file" : "files"}: (files might be identical,use --overwrite flag to overwrite)`)?.info()
		for (const file of filesSkipped) {
			logger.log(`  - ${file}`)
		}
	}
}

const createFile = async (filePath: string, projectInfo: ProjectInfo, file: RegistryComponentFile, config: RawConfig) => {
	const dirPath = path.dirname(filePath)

	// Create folder path for the component, if it doesn't exist
	if (!(await fs.exists(dirPath))) {
		await fs.mkdir(dirPath, { recursive: true })
	}

	let transformedContent = await transform(projectInfo, filePath, file.content, config)

	await fs.writeFile(filePath, transformedContent)
}
