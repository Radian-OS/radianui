export function formatCode(code: string) {
	code = code
		.replaceAll("@/registry/ui/", "@/components/ui/")
		.replaceAll("@/registry/hooks/", "@/hooks/")
		.replaceAll("@/styles/default", "@/components")
		.replaceAll("@/styles/sera", "@/components")
	return code
}
