import { SourceFile } from "ts-morph"
import { RawConfig } from "@/utils/getConfig"

export function transformImport(sourceFile: SourceFile, config: RawConfig): string {
	if (![".tsx", ".ts", ".jsx", ".js"].includes(sourceFile.getExtension())) {
		return sourceFile.getText()
	}

	const importDeclarations = sourceFile.getImportDeclarations()

	for (const importDeclaration of importDeclarations) {
		const moduleSpecifier = updateImportAliases(importDeclaration.getModuleSpecifierValue(), config)

		importDeclaration.setModuleSpecifier(moduleSpecifier)

		// Replace `import { cn } from "@/lib/utils"`
		if (moduleSpecifier === "@/lib/utils") {
			const namedImports = importDeclaration.getNamedImports()
			const cnImport = namedImports.find((i) => i.getName() === "cn")
			if (cnImport) {
				importDeclaration.setModuleSpecifier(config.aliases.utils)
			}
		}
	}

	return sourceFile.getText()
}

function updateImportAliases(moduleSpecifier: string, config: RawConfig): string {
	if (moduleSpecifier.match(/^@\/registry\/ui/)) {
		return moduleSpecifier.replace(/^@\/registry\/ui/, config.aliases.ui ?? `${config.aliases.components}/ui`)
	}

	if (config.aliases.components && moduleSpecifier.match(/^@\/registry\/components/)) {
		return moduleSpecifier.replace(/^@\/registry\/components/, config.aliases.components)
	}

	if (config.aliases.animated && moduleSpecifier.match(/^@\/registry\/animated/)) {
		return moduleSpecifier.replace(/^@\/registry\/animated/, config.aliases.animated)
	}

	if (config.aliases.lib && moduleSpecifier.match(/^@\/registry\/lib/)) {
		return moduleSpecifier.replace(/^@\/registry\/lib/, config.aliases.lib)
	}

	if (config.aliases.hooks && moduleSpecifier.match(/^@\/registry\/(.+)\/hooks/)) {
		return moduleSpecifier.replace(/^@\/registry\/hooks/, config.aliases.hooks)
	}

	if (config.aliases.components && moduleSpecifier.match(/^.\/components/)) {
		return moduleSpecifier.replace(/^.\/components/, config.aliases.components)
	}

	if (config.aliases.components && moduleSpecifier.match(/^@\/app\/registry\/(.+)\/components/)) {
		return moduleSpecifier.replace(/^@\/app\/registry\/(.+)\/components/, config.aliases.components)
	}

	return moduleSpecifier
}
