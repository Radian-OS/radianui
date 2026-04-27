export function formatCode(code: string) {
	code = code
		.replaceAll("@/registry/ui/", "@/components/ui/")
		.replaceAll("@/registry/hooks/", "@/hooks/")
		.replaceAll("@/styles/default", "@/components")

	return code
}
