import fs from "fs-extra"
import path from "path"
import { type InitOptions } from "@/commands/init"
import { txt } from "@/utils/colors"
import { type ProjectInfo, getProjectInfo } from "@/utils/getProjectInfo"
import { spinner } from "@/utils/spinner"

/**
 * Runs preflight checks before project initialization.
 * - Ensures valid project structure.
 * - Prevents overwriting existing `components.json`.
 * - Detects framework and verifies Tailwind setup.
 * - Checks TypeScript import alias configuration.
 */
export const preFlightInit = async (options: InitOptions): Promise<{ projectInfo: ProjectInfo | null; hasComponentsJson: boolean }> => {
	// Check for empty project. We assume if no package.json exists, the project is empty.
	if (!fs.existsSync(options.cwd) || !fs.existsSync(path.resolve(options.cwd, "package.json"))) {
		return { projectInfo: null, hasComponentsJson: false }
	}

	const projectInfo = await getProjectInfo(options.cwd)

	const errors: string[] = []
	const hasComponentsJson = fs.existsSync(path.resolve(options.cwd, "components.json"))

	const beforeInitCheckSpinner = spinner("Preflight checks").start()

	if (hasComponentsJson && !options.presetCode) {
		beforeInitCheckSpinner.fail()
		errors.push(`The ${txt.info("components.json")} file already exists at ${txt.info(options.cwd)}.
        \nTo start over, remove the ${txt.info("components.json")} file and run ${txt.info("init")} command again`)
	} else {
		beforeInitCheckSpinner.succeed("Before init checks completed")
	}

	const frameworkSpinner = spinner("Detecting framework").start()

	if (!projectInfo || projectInfo?.framework.name === "manual") {
		frameworkSpinner?.fail()
		if (projectInfo?.framework.link.installation) {
			errors.push(
				`We could not detect a supported framework at ${txt.info(options.cwd)}.\n` +
					`Visit ${txt.info(projectInfo?.framework.link.installation)} to manually configure your project.\nOnce configured, you can use the cli to add components.`
			)
		}
	} else {
		frameworkSpinner?.succeed(`Detecting framework. Detected ${txt.info(projectInfo.framework.label)}.`)
	}

	const tailwindSpinner = spinner("Verifying tailwind configuration").start()

	if (!projectInfo.tailwindCssFile) {
		tailwindSpinner?.fail()
		if (projectInfo.framework.name === "vite") {
			errors.push(
				`We could not find a Tailwind config at ${txt.info(options.cwd)}.\n` +
					`Make sure you have a Tailwind installed your project.\n` +
					`Visit ${txt.info("https://tailwindcss.com/docs/installation")} to get started.`
			)
		} else {
			// For NextJS projects
			errors.push(
				`We could not find a Tailwind config at ${txt.info(options.cwd)}.\n` +
					`Make sure you have a Tailwind installed your project.\n` +
					`Visit ${txt.info("https://tailwindcss.com/docs/installation/framework-guides/nextjs")} to get started.`
			)
		}
	} else {
		tailwindSpinner?.succeed(`Verifying tailwind configuration. Found Tailwind configuration.`)
	}

	const tsConfigSpinner = spinner("Validating import alias").start()
	if (!projectInfo.aliasPrefix) {
		tsConfigSpinner?.fail()
		errors.push(
			`No import alias found in your tsconfig.json file.\n` +
				`Visit ${txt.info("https://radianos.com/docs/installation/manual#configure-path-aliases")} to learn how to set an import alias.`
		)
	} else {
		tsConfigSpinner?.succeed(`Verifying import alias. Found import alias prefix: ${projectInfo.aliasPrefix}`)
	}

	if (errors.length > 0) {
		throw new Error(errors.join("\n\n"))
	}

	return { projectInfo, hasComponentsJson }
}
