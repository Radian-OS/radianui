import { execa } from "execa"
import prompts from "prompts"
import { RADIANUI_URL } from "@/registry/constants"
import { RegistryItem } from "@/registry/schema"
import { Config } from "@/utils/getConfig"
import { getPackageInfo } from "@/utils/getPackageInfo"
import { getPackageManager } from "@/utils/getPackageManager"
import { logger } from "@/utils/logger"
import { spinner } from "@/utils/spinner"

export async function updateDependencies(
	dependencies: RegistryItem["dependencies"],
	devDependencies: RegistryItem["devDependencies"],
	config: Config,
	options: {
		silent?: boolean
	}
) {
	dependencies = Array.from(new Set(dependencies))
	devDependencies = Array.from(new Set(devDependencies))

	if (!dependencies?.length && !devDependencies?.length) {
		return
	}

	options = {
		silent: false,
		...options,
	}

	const dependenciesSpinner = spinner(`Installing dependencies.`, {
		silent: options.silent,
	})?.start()
	const packageManager = await getUpdateDependenciesPackageManager(config)

	// Offer to use --force or --legacy-peer-deps if using React 19 with npm.
	let flag = ""
	if ((await shouldPromptForNpmFlag(config)) && packageManager === "npm") {
		if (options.silent) {
			flag = "force"
		} else {
			dependenciesSpinner.stopAndPersist()
			logger.warn(
				`\nIt looks like you are using React 19. \nSome packages may fail to install due to peer dependency issues in npm (see ${RADIANUI_URL}/react-19).\n`
			)
			const confirmation = await prompts([
				{
					type: "select",
					name: "flag",
					message: "How would you like to proceed?",
					choices: [
						{ title: "Use --force", value: "force" },
						{ title: "Use --legacy-peer-deps", value: "legacy-peer-deps" },
					],
				},
			])

			if (confirmation) {
				flag = confirmation.flag
			}
		}
	}

	dependenciesSpinner?.start()

	await installWithPackageManager(
		packageManager,
		dependencies,
		devDependencies,
		config.resolvedPaths.cwd,
		flag
	)

	dependenciesSpinner?.succeed()
}

async function shouldPromptForNpmFlag(config: Config) {
	const packageInfo = await getPackageInfo(config.resolvedPaths.cwd, false)

	if (!packageInfo?.dependencies?.react) {
		return false
	}

	const hasReact19 = /^(?:\^|~)?19(?:\.\d+)*(?:-.*)?$/.test(
		packageInfo.dependencies.react
	)
	const hasReactDayPicker8 =
		packageInfo.dependencies["react-day-picker"]?.startsWith("8")

	return hasReact19 && hasReactDayPicker8
}

async function getUpdateDependenciesPackageManager(config: Config) {
	const packageInfo = await getPackageInfo(config.resolvedPaths.cwd, false)
	const expoVersion = packageInfo?.dependencies?.expo

	if (expoVersion) {
		// Ensures package versions match the React Native version.
		// https://docs.expo.dev/more/expo-cli/#install
		return "expo"
	}

	return getPackageManager(config.resolvedPaths.cwd)
}

async function installWithPackageManager(
	packageManager: Awaited<
		ReturnType<typeof getUpdateDependenciesPackageManager>
	>,
	dependencies: string[],
	devDependencies: string[],
	cwd: string,
	flag?: string
) {
	if (packageManager === "npm") {
		return installWithNpm(dependencies, devDependencies, cwd, flag)
	}

	if (packageManager === "deno") {
		return installWithDeno(dependencies, devDependencies, cwd)
	}

	if (packageManager === "expo") {
		return installWithExpo(dependencies, devDependencies, cwd)
	}

	if (dependencies?.length) {
		await execa(packageManager, ["add", ...dependencies], {
			cwd,
		})
	}

	if (devDependencies?.length) {
		await execa(packageManager, ["add", "-D", ...devDependencies], { cwd })
	}
}

async function installWithNpm(
	dependencies: string[],
	devDependencies: string[],
	cwd: string,
	flag?: string
) {
	if (dependencies.length) {
		await execa(
			"npm",
			["install", ...(flag ? [`--${flag}`] : []), ...dependencies],
			{ cwd }
		)
	}

	if (devDependencies.length) {
		await execa(
			"npm",
			["install", ...(flag ? [`--${flag}`] : []), "-D", ...devDependencies],
			{ cwd }
		)
	}
}

async function installWithDeno(
	dependencies: string[],
	devDependencies: string[],
	cwd: string
) {
	if (dependencies?.length) {
		await execa("deno", ["add", ...dependencies.map((dep) => `npm:${dep}`)], {
			cwd,
		})
	}

	if (devDependencies?.length) {
		await execa(
			"deno",
			["add", "-D", ...devDependencies.map((dep) => `npm:${dep}`)],
			{ cwd }
		)
	}
}

async function installWithExpo(
	dependencies: string[],
	devDependencies: string[],
	cwd: string
) {
	if (dependencies.length) {
		await execa("npx", ["expo", "install", ...dependencies], { cwd })
	}

	if (devDependencies.length) {
		await execa("npx", ["expo", "install", "-- -D", ...devDependencies], {
			cwd,
		})
	}
}
