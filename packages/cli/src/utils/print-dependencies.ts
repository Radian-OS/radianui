/**
 * Component Dependency Analysis Script
 *
 * This utility script analyzes and reports the dependency tree for each component
 * in the registry. It provides a comprehensive overview of both internal registry
 * dependencies and external package dependencies for every component.
 *
 * @author Bijay Khapung
 * @since August, 2025
 */
import { getRegistryComponents, resolveComponents } from "@utils/registry"

import components from "../../../../apps/website/src/app/api/components/components.json"

const registryComps = await getRegistryComponents()

for (const component of components) {
	const deps = await resolveComponents(registryComps, [component.name])

	const dependencies = new Set<string>()

	for (const component of deps) {
		if (component.dependencies?.length) {
			component.dependencies.forEach((dep) => dependencies.add(dep))
		}
	}

	const dependencyList = Array.from(dependencies)

	console.log(
		`Name: ${component.name} | Registry Deps: ${deps
			.filter((dep) => dep.name !== component.name)
			.map((dep) => dep.name)
			.join(", ")} | Package Deps: ${dependencyList.join(", ")}`
	)
}
