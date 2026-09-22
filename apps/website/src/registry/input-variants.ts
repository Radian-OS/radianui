/**
 * Input variant definitions for the themer.
 *
 * Each variant provides CSS overrides for `.cn-input` and `.cn-input-wrapper`
 * that are injected into the project's generated CSS via `buildRegistryConfig`.
 *
 * "bordered" is the default and requires no overrides (it's the base styling
 * already defined in `input.tsx`).
 */

export const INPUT_VARIANTS = [
	{
		value: "bordered",
		name: "Bordered",
		description: "Full border around the input",
		/**
		 * CSS text injected into the themer preview's `<style>` element.
		 * Empty for "bordered" because the default input.tsx styles already
		 * produce a bordered look.
		 */
		previewCss: "",
		/**
		 * CSS declarations merged into the project's generated CSS
		 * (via `buildRegistryConfig` → `css`). Empty for the default variant.
		 */
		projectCss: {} as Record<string, string>,
	},
	{
		value: "filled",
		name: "Filled",
		description: "Filled background, no visible border",
		previewCss: `
.cn-input {
  border-color: transparent !important;
  background-color: var(--color-fill2) !important;
}
.cn-input:focus-visible {
  border-color: var(--color-primary) !important;
}
.cn-input-wrapper {
  border-color: transparent !important;
  background-color: var(--color-fill2) !important;
}
.cn-input-wrapper:has(:focus-visible) {
  border-color: var(--color-primary) !important;
}
`,
		projectCss: {
			".cn-input":
				"border-color: transparent; background-color: var(--color-fill2); &:focus-visible { border-color: var(--color-primary); }",
			".cn-input-wrapper":
				"border-color: transparent; background-color: var(--color-fill2); &:has(:focus-visible) { border-color: var(--color-primary); }",
		},
	},
	{
		value: "underline",
		name: "Underline",
		description: "Bottom border only",
		previewCss: `
.cn-input {
  border-color: transparent !important;
  border-bottom-color: var(--color-border) !important;
  border-radius: 0 !important;
  background-color: transparent !important;
}
.cn-input:focus-visible {
  border-bottom-color: var(--color-primary) !important;
  box-shadow: none !important;
}
.cn-input-wrapper {
  border-color: transparent !important;
  border-bottom-color: var(--color-border) !important;
  border-radius: 0 !important;
  background-color: transparent !important;
}
.cn-input-wrapper:has(:focus-visible) {
  border-bottom-color: var(--color-primary) !important;
  box-shadow: none !important;
}
`,
		projectCss: {
			".cn-input":
				"border-color: transparent; border-bottom-color: var(--color-border); border-radius: 0; background-color: transparent; &:focus-visible { border-bottom-color: var(--color-primary); box-shadow: none; }",
			".cn-input-wrapper":
				"border-color: transparent; border-bottom-color: var(--color-border); border-radius: 0; background-color: transparent; &:has(:focus-visible) { border-bottom-color: var(--color-primary); box-shadow: none; }",
		},
	},
] as const

export type InputVariant = (typeof INPUT_VARIANTS)[number]
export type InputVariantValue = InputVariant["value"]
