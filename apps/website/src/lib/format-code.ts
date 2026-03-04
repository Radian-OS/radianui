export async function formatCode(code: string) {
	code = code
		.replaceAll("@/registry/ui/", "@/components/ui/")
		.replaceAll("@/registry/hooks/", "@/hooks/")

	return code
}
