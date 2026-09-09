import { txt } from "@/utils/colors";
import { fuzzySearch } from "@/utils/fuzzySearch";
import { getConfig } from "@/utils/getConfig";
import { handleError } from "@/utils/handleError";
import { logger } from "@/utils/logger";
import { getRegistryComponents } from "@/utils/registry";
import { Command, Option } from "commander";
import z from "zod";

const SEARCH_TYPES = ['ui', 'block']

const searchOptionsSchema = z.object({
    limit: z.coerce.number().default(8),
    filter: z.enum(SEARCH_TYPES).optional()
})

export const search = new Command()
    .name('search')
    .description('Search for components/blocks by name or description')
    .argument('<query>', 'search query')
    .option('-l, --limit <limit>', 'number of results to show', '8')
    .addOption(new Option('--filter <type>', 'filter by type of item').choices(SEARCH_TYPES))
    .action(async (query, opts) => {
        try {
            const options = searchOptionsSchema.parse(opts)
            const config = await getConfig()
            const components = await getRegistryComponents(config)
            const filteredComponents = options.filter
                ? components.filter((c) => c.type === options.filter)
                : components
            const results = fuzzySearch(filteredComponents, query, options.limit)
            if (results.length === 0) {
                logger.info(`No items found matching "${query}"`)
                return
            }

            logger.break()
            logger.info(
                `Found ${txt.bold(results.length)} item${results.length === 1 ? "" : "s"} matching "${txt.cyan(query)}":`
            )
            logger.break()
            logger.log(`${'  Name'.padEnd(22)} ${'Type'.padEnd(10)} Description`)
            for (const { component } of results) {
                const name = txt.bold(component.name.padEnd(22))
                const type = txt.bold(component.type.padEnd(10))
                const desc = txt.dark(component.description)
                logger.log(`  ${name} ${type} ${desc}`)
            }
            logger.break()
            logger.info(
                `Run ${txt.cyan("radianui add <name>")} to install a component.`
            )
        } catch (error) {
            handleError(error)
        }
    })
