import { transformButtonCode } from "./transform-button"

export interface RegistryFile {
	name: string
	content: string
	type: string
}

export interface RegistryItem {
	name: string
	description?: string
	dependencies?: string[]
	registryDependencies?: string[]
	files: RegistryFile[]
	type: string
}

export type ComponentTransformer<T = unknown> = (
	sourceCode: string,
	config: T
) => string

export const COMPONENT_TRANSFORMERS: Record<
	string,
	ComponentTransformer<any>
> = {
	button: transformButtonCode,
}
