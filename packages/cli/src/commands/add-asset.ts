import { Command } from "commander"
import path from "path"
import prompts from "prompts"
import { z } from "zod"
import { handleError } from "@/utils/handleError"
import { logger } from "@/utils/logger"
import { handlePromptCancel, promptForAssets } from "@/utils/prompts"
import {
    type AssetRegistryType,
    ASSET_REGISTRIES,
    getAssetRegistry,
    type RegistryComponent,
} from "@/utils/registry"
import { spinner } from "@/utils/spinner"
import { preflightAdd } from "@/preflights/preFlightAdd"
import { executeInit, InitOptions } from "./init"
import { getProjectInfo } from "@/utils/getProjectInfo"
import { addComponentsToProject } from "./add"

const addAssetOptionsSchema = z.object({
    assetType: z.string().optional(),
    assets: z.array(z.string()).optional(),
    cwd: z.string(),
    yes: z.boolean(),
    all: z.boolean(),
    overwrite: z.boolean(),
})

export type AddAssetOptions = z.infer<typeof addAssetOptionsSchema>

export const addAsset = new Command()
    .name("add-asset")
    .description("add static assets (flag, logos, icons) to your project")
    .argument(
        "[assetType]",
        "the type of asset (e.g. flag, logo) or asset identifier (e.g. flag:US-24x24)"
    )
    .argument("[assets...]", "the specific asset names or codes to add")
    .option("-a, --all", "install all available assets for the selected type", false)
    .option("-y, --yes", "skip confirmation prompts", false)
    .option(
        "-c, --cwd <cwd>",
        "the working directory. defaults to the current directory",
        process.cwd()
    )
    .option("-o, --overwrite", "overwrite existing files if they exist", false)
    .action(async (rawAssetType, rawAssets, opts) => {
        try {
            let assetType = rawAssetType as string | undefined
            let assets: string[] = Array.isArray(rawAssets) ? rawAssets : []

            if (assetType && assetType.includes(":")) {
                const [prefix, ...rest] = assetType.split(":")
                const assetName = rest.join(":")
                assetType = prefix
                if (assetName) {
                    assets = [assetName, ...assets]
                }
            }

            const options: AddAssetOptions = addAssetOptionsSchema.parse({
                assetType,
                assets: assets.length ? assets : undefined,
                cwd: path.resolve(opts.cwd),
                ...opts,
            })

            const preflight = await preflightAdd(options)

            if (!preflight.config) {
                logger.break()
                logger.info(
                    "The current path does not have a project. You can add components after creating a new project."
                )
                logger.break()

                const initOptions: InitOptions = {
                    cwd: options.cwd,
                    skipPrompts: options.yes,
                    defaultConfigurations: false,
                }

                const { projectName } = await executeInit(initOptions)
                // Update cwd to the new created project path so components will be added there
                options.cwd = path.join(options.cwd, projectName!)
            }

            const projectInfo = await getProjectInfo(options.cwd)

            if (!options.assetType) {
                const { selectedType } = await prompts(
                    {
                        type: "select",
                        name: "selectedType",
                        message: "Which asset type would you like to add?",
                        choices: Object.entries(ASSET_REGISTRIES).map(
                            ([key, config]) => ({
                                title: `${config.label} (${key})`,
                                value: key as AssetRegistryType,
                            })
                        ),
                        initial: 0,
                    },
                    {
                        onCancel: () => handlePromptCancel(),
                    }
                )

                if (!selectedType) {
                    handlePromptCancel()
                }
                options.assetType = selectedType
            }

            const targetAssetType = options.assetType as AssetRegistryType

            let selectedAssets = options.assets
            if (!selectedAssets?.length && !options.all) {
                selectedAssets = await promptForAssets(options, targetAssetType)
                if (!selectedAssets?.length) {
                    logger.warn("No assets selected. Exiting.")
                    process.exit(1)
                }
                options.assets = selectedAssets
            }

            const resolvedComponents = await convertAssetsToRegistryComponents(
                selectedAssets,
                options,
                targetAssetType
            )

            await addComponentsToProject(
                resolvedComponents,
                {
                    ...options,
                    components: selectedAssets,
                },
                projectInfo
            )
        } catch (error) {
            handleError(error)
        }
    })

/**
 * Converts selected asset queries or names to RegistryComponent objects.
 */
export async function convertAssetsToRegistryComponents(
    assetQueries: string[] | undefined,
    options: { all?: boolean },
    assetType: AssetRegistryType
): Promise<RegistryComponent[]> {
    const fetchSpinner = spinner(`Fetching ${assetType} registry...`).start()
    const registry = await getAssetRegistry(assetType)

    if (!registry.length) {
        fetchSpinner.fail(`Failed to fetch assets for "${assetType}".`)
        process.exit(1)
    }
    fetchSpinner.succeed(
        `Fetched ${registry.length} ${assetType} assets from registry`
    )

    if (options.all) {
        return registry
    }

    const { matched, missing } = matchAssets(registry, assetQueries ?? [])

    if (missing.length) {
        logger.warn(
            `The following asset${missing.length > 1 ? "s were" : " was"} not found in the registry:`
        )
        for (const item of missing) {
            logger.info(`  - ${item}`)
        }
    }

    if (!matched.length) {
        logger.error("No valid assets found to install.")
        process.exit(1)
    }

    return matched
}

/**
 * Matches requested asset queries against the registry items.
 */
export function matchAssets(
    registry: RegistryComponent[],
    queries: string[]
): { matched: RegistryComponent[]; missing: string[] } {
    const matched: RegistryComponent[] = []
    const missing: string[] = []

    for (const query of queries) {
        const q = query.toLowerCase().trim()

        const item = registry.find((r) => {
            const rawName = r.name.toLowerCase()
            const unprefixName = rawName.replace(/^[^:]+:/, "")

            // Matches name with or without prefix
            if (rawName === q || unprefixName === q) return true

            // Matches filename with or without extension
            const hasFileMatch = r.files.some((f) => {
                const fname = f.name.toLowerCase()
                return (
                    fname === q ||
                    fname === `${q}.svg` ||
                    fname.replace(/\.svg$/, "") === q
                )
            })
            if (hasFileMatch) return true

            // Matches code prefix (e.g. "US" for "US-24x24")
            if (unprefixName.split("-")[0] === q) return true

            // Matches description
            if (r.description?.toLowerCase() === q) return true

            return false
        })

        if (item && !matched.some((m) => m.name === item.name)) {
            matched.push(item)
        } else if (!item) {
            missing.push(query)
        }
    }

    return { matched, missing }
}


