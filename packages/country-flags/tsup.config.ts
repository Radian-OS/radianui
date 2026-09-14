import { defineConfig } from "tsup"

export default defineConfig({
	clean: true,
	dts: true,
	entry: ["src/index.ts", "src/metadata.ts"],
	external: ["react", "react/jsx-runtime"],
	format: ["esm"],
	minify: true,
	outDir: "dist",
	target: "es2021",
	treeshake: true,
})
