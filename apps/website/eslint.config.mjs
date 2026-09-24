import nextVitals from "eslint-config-next/core-web-vitals"
import tseslint from "typescript-eslint"

const eslintConfig = tseslint.config(
	// Remove the @typescript-eslint plugin from next/typescript to prevent
	// duplicate registration with tseslint.configs.recommended.
	...nextVitals.map((config) =>
		config.name === "next/typescript" ? { ...config, plugins: {} } : config
	),
	...tseslint.configs.recommended,
	{
		ignores: [
			"node_modules/**",
			".next/**",
			"out/**",
			"build/**",
			"next-env.d.ts",
			".source/**",
			"**/__index__.tsx",
			"**/__components__/**",
		],
	},
	{
		rules: {
			"react-hooks/incompatible-library": "off",
			"react-hooks/purity": "off",
			"@next/next/no-html-link-for-pages": "off",
			"@next/next/no-img-element": "off",
			"@typescript-eslint/no-unused-vars": "off",
			"react-hooks/set-state-in-effect": "off",
			// "@typescript-eslint/consistent-type-imports": [
			// 	"error",
			// 	{
			// 		prefer: "type-imports",
			// 		fixStyle: "inline-type-imports",
			// 	},
			// ],
			"react-hooks/refs": "off",
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/ban-ts-comment": "off",
			"react-hooks/static-components": "off",
		},
	},
	{
		settings: {
			react: {
				version: "19",
			},
		},
	}
)

export default eslintConfig
