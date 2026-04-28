import { execSync } from "child_process"

const commands = [
	"contentlayer2 build",
	"pnpm run generate-component-json",
	"pnpm run generate-examples-json",
	"pnpm run generate-example-registry",
	"pnpm run generate-blocks-index",
	"pnpm run generate-styles",
	"pnpm run generate-css",
	"pnpm run generate-styles-json",
	"next build",
]

function main() {
	for (const command of commands) {
		console.log(`\n> Running: ${command}`)
		try {
			execSync(command, { stdio: "inherit" })
		} catch (error) {
			console.error(`\n❌ Command failed: ${command}\n Error: ${error}`)
			process.exit(1)
		}
	}
	console.log("\n✅ All build steps completed successfully!")
}

main()
