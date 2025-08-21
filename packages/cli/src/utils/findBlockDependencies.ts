import { RegistryComponents } from "@/utils/registry"

/**
 * Identifies components that are dependencies of a block from the resolved components.
 *
 * This function is used to avoid prompting overwrite questions for components
 * when a block is added to the project.
 *
 * @param components - The list of resolved components.
 * @returns A set of component names that are dependencies of blocks.
 */
export function findBlockDependencies(components: RegistryComponents): Set<string> {
	const blockComponents = components.filter((component) => component.type === "block")
	const blockDependencies = new Set<string>()

	blockComponents.forEach((block) => {
		if (block.registryDependencies) {
			block.registryDependencies.forEach((dependencyName) => {
				blockDependencies.add(dependencyName)
				collectDependenciesOfDependency(dependencyName, components, blockDependencies)
			})
		}
	})

	return blockDependencies
}

function collectDependenciesOfDependency(componentName: string, components: RegistryComponents, blockDependencies: Set<string>) {
	const component = components.find((c) => c.name === componentName)

	if (component && component.registryDependencies) {
		for (const dependencyName of component.registryDependencies) {
			if (blockDependencies.has(dependencyName)) continue

			blockDependencies.add(dependencyName)
			collectDependenciesOfDependency(dependencyName, components, blockDependencies)
		}
	}
}
