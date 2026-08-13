import fs from "fs-extra"
import path from "path"
import { type PartialInitConfig } from "@/config/initSchema"
import { txt } from "@/utils/colors"
import { type ProjectInfo, getProjectInfo } from "@/utils/getProjectInfo"
import { spinner } from "@/utils/spinner"

export type DetectResult = PartialInitConfig & {
	projectInfo: ProjectInfo | null
}

/**
 * Inspects the filesystem to detect framework, tailwind, tsconfig, etc.
 * Returns detected values as a partial config.
 */
export async function resolveDetect(
	cwd: string,
	hasPreset: boolean
): Promise<DetectResult> {
	// No package.json → new project, nothing to detect
	if (
		!fs.existsSync(cwd) ||
		!fs.existsSync(path.resolve(cwd, "package.json"))
	) {
		return {
			cwd,
			isExistingProject: false,
			hasComponentsJson: false,
			projectInfo: null,
		}
	}

	const projectInfo = await getProjectInfo(cwd)
	const hasComponentsJson = fs.existsSync(
		path.resolve(cwd, "components.json")
	)

	// Run validation checks
	const errors: string[] = []

	const beforeInitCheckSpinner = spinner("Preflight checks").start()
	if (hasComponentsJson && !hasPreset) {
		beforeInitCheckSpinner.fail()
		errors.push(
			`The ${txt.info("components.json")} file already exists at ${txt.info(cwd)}.` +
				`\n\nTo start over, remove the ${txt.info("components.json")} file and run ${txt.info("init")} command again`
		)
	} else {
		beforeInitCheckSpinner.succeed("Before init checks completed")
	}

	const frameworkSpinner = spinner("Detecting framework").start()
	if (!projectInfo || projectInfo.framework.name === "manual") {
		frameworkSpinner.fail()
		if (projectInfo?.framework.link.installation) {
			errors.push(
				`We could not detect a supported framework at ${txt.info(cwd)}.\n` +
					`Visit ${txt.info(projectInfo.framework.link.installation)} to manually configure your project.\nOnce configured, you can use the cli to add components.`
			)
		}
	} else {
		frameworkSpinner.succeed(
			`Detecting framework. Detected ${txt.info(projectInfo.framework.label)}.`
		)
	}

	const tailwindSpinner = spinner("Verifying tailwind configuration").start()
	if (!projectInfo.tailwindCssFile) {
		tailwindSpinner.fail()
		const tailwindUrl =
			projectInfo.framework.name === "vite"
				? "https://tailwindcss.com/docs/installation"
				: "https://tailwindcss.com/docs/installation/framework-guides/nextjs"
		errors.push(
			`We could not find a Tailwind config at ${txt.info(cwd)}.\n` +
				`Make sure you have a Tailwind installed your project.\n` +
				`Visit ${txt.info(tailwindUrl)} to get started.`
		)
	} else {
		tailwindSpinner.succeed(
			"Verifying tailwind configuration. Found Tailwind configuration."
		)
	}

	const tsConfigSpinner = spinner("Validating import alias").start()
	if (!projectInfo.aliasPrefix) {
		tsConfigSpinner.fail()
		errors.push(
			`No import alias found in your tsconfig.json file.\n` +
				`Visit ${txt.info("https://radianui.com/docs/installation/manual#configure-path-aliases")} to learn how to set an import alias.`
		)
	} else {
		tsConfigSpinner.succeed(
			`Verifying import alias. Found import alias prefix: ${projectInfo.aliasPrefix}`
		)
	}

	if (errors.length > 0) {
		throw new Error(errors.join("\n\n"))
	}

	return {
		cwd,
		isExistingProject: true,
		hasComponentsJson,
		framework: projectInfo.framework.name,
		useSrcDir: projectInfo.hasSrcDir,
		projectInfo,
	}
}
