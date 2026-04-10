import dedent from "dedent"
import deepmerge from "deepmerge"
import fs from "fs-extra"
import path from "path"
import { type IconLibraryName, iconLibraries } from "@/icons/libraries"
import { configWithDefaults } from "@/registry/config"
import { resolveRegistryTree } from "@/registry/resolver"
import { rawConfigSchema } from "@/registry/schema"
import { addComponents } from "@/utils/add-components"
import { resolveConfigPaths } from "@/utils/getConfig"
import { ensureRegistriesInConfig } from "@/utils/registeries"
import { updateCssVars } from "@/utils/updaters/update-css-vars"
import { updateFonts } from "@/utils/updaters/update-font"
import { updateDependencies } from "@/utils/updaters/updateDependencies"
import { createTemplate } from "./create-template"

export const next = createTemplate({
	name: "next",
	title: "Next.js",
	defaultProjectName: "next-app",
	templateDir: "next-app",
	frameworks: ["next-app", "next-pages"],
	create: async () => {
		// Empty for now.
	},
	files: [
		{
			type: "registry:page",
			path: "app/page.tsx",
			target: "app/page.tsx",
			content: dedent`import { ComponentExample } from "@/components/component-example";

export default function Page() {
  return <ComponentExample />;
}
`,
		},
	],
	monorepo: {
		templateDir: "next-monorepo",
		init: async (options) => {
			const packagesUiPath = path.resolve(options.projectPath, "packages/ui")
			const appsWebPath = path.resolve(options.projectPath, "apps/web")

			// Update packages/ui/components.json.
			const packagesUiConfigPath = path.resolve(
				packagesUiPath,
				"components.json"
			)
			let packagesUiConfig = await fs.readJson(packagesUiConfigPath)
			if (options.registryBaseConfig) {
				packagesUiConfig = deepmerge(
					packagesUiConfig,
					options.registryBaseConfig
				)
			}
			packagesUiConfig.tailwind.baseColor = "neutral"
			if (options.rtl) {
				packagesUiConfig.rtl = true
			}
			await fs.writeJson(packagesUiConfigPath, packagesUiConfig, {
				spaces: 2,
			})

			// Update apps/web/components.json.
			const appsWebConfigPath = path.resolve(appsWebPath, "components.json")
			let appsWebConfig = await fs.readJson(appsWebConfigPath)
			if (options.registryBaseConfig) {
				appsWebConfig = deepmerge(appsWebConfig, options.registryBaseConfig)
			}
			appsWebConfig.tailwind.baseColor = "neutral"
			if (options.rtl) {
				appsWebConfig.rtl = true
			}
			await fs.writeJson(appsWebConfigPath, appsWebConfig, { spaces: 2 })

			// Apply preset CSS/style to packages/ui directly.
			const resolvedPackagesUiConfig = await resolveConfigPaths(
				packagesUiPath,
				rawConfigSchema.parse(packagesUiConfig)
			)
			const { config: packagesUiWithRegistries } =
				await ensureRegistriesInConfig(
					options.components,
					resolvedPackagesUiConfig,
					{ silent: true }
				)
			// Skip fonts here — we handle them explicitly below using the apps/web config.
			await addComponents(options.components, packagesUiWithRegistries, {
				overwrite: true,
				silent: options.silent,
				isNewProject: true,
				skipFonts: true,
			})

			const resolvedAppsWebConfig = await resolveConfigPaths(
				appsWebPath,
				rawConfigSchema.parse(appsWebConfig)
			)

			// Handle fonts at the apps/web level.
			const tree = await resolveRegistryTree(
				options.components,
				configWithDefaults(packagesUiWithRegistries)
			)
			if (tree?.fonts?.length) {
				const themeCssVars: Record<string, string> = {}
				for (const font of tree.fonts) {
					themeCssVars[font.font.variable] = `var(${font.font.variable})`
				}

				await updateCssVars({ theme: themeCssVars }, resolvedPackagesUiConfig, {
					silent: options.silent,
					overwriteCssVars: false,
					tailwindVersion: "v4",
				})

				await updateFonts(tree.fonts, resolvedAppsWebConfig, {
					silent: options.silent,
				})
			}

			// Install icon library packages in both workspaces.
			const iconLibrary =
				resolvedPackagesUiConfig.iconLibrary as IconLibraryName
			if (iconLibrary && iconLibrary in iconLibraries) {
				const iconPackages = [...iconLibraries[iconLibrary].packages]
				await updateDependencies(iconPackages, [], resolvedPackagesUiConfig, {
					silent: true,
				})
				await updateDependencies(iconPackages, [], resolvedAppsWebConfig, {
					silent: true,
				})
			}

			return resolvedAppsWebConfig
		},
		files: [
			{
				type: "registry:page",
				path: "app/page.tsx",
				target: "app/page.tsx",
				content: dedent`import { ComponentExample } from "@/components/component-example";

export default function Page() {
  return <ComponentExample />;
}
`,
			},
		],
	},
})
