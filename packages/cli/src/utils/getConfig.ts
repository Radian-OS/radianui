import { cosmiconfig } from 'cosmiconfig'
import { z } from 'zod'

import { txt } from '@utils/colors'

const explorer = cosmiconfig('components', {
  searchPlaces: ['components.json'],
})

const rawConfigSchema = z.object({
  hasSrcDir: z.boolean(),
  aliases: z.object({
    components: z.string(),
    utils: z.string(),
    ui: z.string(),
    animated: z.string().optional(),
    lib: z.string().optional(),
    hooks: z.string().optional(),
  }),
})

export const configSchema = rawConfigSchema.extend({
  resolvedPaths: z.object({
    cwd: z.string(),
    tailwindConfig: z.string(),
    tailwindCss: z.string(),
    utils: z.string(),
    components: z.string(),
    lib: z.string(),
    hooks: z.string(),
    ui: z.string(),
  }),
})

export type RawConfig = z.infer<typeof rawConfigSchema>
export type Config = z.infer<typeof configSchema>

export async function getConfig(cwd = process.cwd()): Promise<RawConfig> {
  const result = await explorer.search(cwd)

  if (!result) {
    throw new Error(`components.json is missing. Run ${txt.info(`npx radianos init`)} command to initialize project`)
  }

  try {
    return rawConfigSchema.parse(result.config)
  } catch (error) {
    throw new Error(
      `Error loading components.json configuration: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}
