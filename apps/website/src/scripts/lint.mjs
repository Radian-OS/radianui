import { LegacyESLint } from "eslint/use-at-your-own-risk"

const eslint = new LegacyESLint({
	cwd: process.cwd(),
	extensions: [".js", ".jsx", ".ts", ".tsx"],
})

const results = await eslint.lintFiles(["."])
const formatter = await eslint.loadFormatter("stylish")
const output = formatter.format(results)

if (output) process.stdout.write(output)

const { errorCount, warningCount } = results.reduce(
	(totals, result) => ({
		errorCount: totals.errorCount + result.errorCount,
		warningCount: totals.warningCount + result.warningCount,
	}),
	{ errorCount: 0, warningCount: 0 }
)

if (warningCount > 0) process.exitCode = 0
if (errorCount > 0) process.exitCode = 1
