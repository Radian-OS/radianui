export const UTILS = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs.filter(Boolean)));
}
`

export const COMPONENTS_JSON_CONFIG = `{
  "$schema": "https://radianos.com/schema.json",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "animated": "@/components/animated",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "hasSrcDir": true
}`

export const TAILWIND_CONFIG_WITH_VARIABLES = `import type { Config } from "tailwindcss";
export default {
	darkMode: ["class"],
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
    	'./components/**/*.{js,ts,jsx,tsx,mdx}',
    	'./app/**/*.{js,ts,jsx,tsx,mdx}',
    	'./src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	safelist: ["font-heading", "font-body", "heading-1", "heading-2", "heading-3", "heading-4", "heading-5", "heading-6", "body-lg", "body-base", "body-sm", "body-xs"],
	theme: {
		extend: {
			colors: {
				bg1: "hsl(var(--bg1))",
				bg2: "hsl(var(--bg2))",
				bg3: "hsl(var(--bg3))",
				bg4: "hsl(var(--bg4))",
				fg1: "hsl(var(--fg1))",
				fg2: "hsl(var(--fg2))",
				fg3: "hsl(var(--fg3))",
				information: "hsl(var(--information))",
				success: "hsl(var(--success))",
				error: "hsl(var(--error))",
				warning: "hsl(var(--warning))",
				white: "hsl(var(--static-white))",
				black: "hsl(var(--static-black))",
				primary: "hsl(var(--primary))",
				border: {
					DEFAULT: "hsl(var(--border))",
					secondary: "hsl(var(--border-secondary))",
					information: "hsl(var(--border-information))",
					success: "hsl(var(--border-success))",
					error: "hsl(var(--border-error))",
					warning: "hsl(var(--border-warning))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
} satisfies Config;`

export const GLOBAL_CSS = `@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
	:root {
		--primary: 258 70% 50%;
		--bg1: 0 0% 100%;
		--bg2: 0 0% 98%;
		--bg3: 0 0% 95%;
		--bg4: 0 0% 92%;
		--fg1: 240 10% 10%;
		--fg2: 240 4% 35%;
		--fg3: 240 4% 60%;
		--border: 240 2% 90%;
		--border-secondary: 240 4% 80%;
		--radius: 0.5rem;
		--static-white: 0 0% 100%;
		--static-black: 240 10% 10%;
		--information: 210 100% 50%;
		--success: 135 50% 44%;
		--error: 0 100% 60%;
		--warning: 35 100% 50%;

		/* shadcn */
		--card: 0 0% 100%;
		--card-foreground: 0 0% 3.9%;
		--popover: 0 0% 100%;
		--popover-foreground: 0 0% 3.9%;
		--muted: 0 0% 96.1%;
		--muted-foreground: 0 0% 45.1%;
		--accent: 0 0% 96.1%;
		--accent-foreground: 0 0% 9%;
		--destructive: 0 84.2% 60.2%;
		--destructive-foreground: 0 0% 98%;
		--input: 0 0% 89.8%;
		--ring: 0 0% 3.9%;
		--chart-1: 12 76% 61%;
		--chart-2: 173 58% 39%;
		--chart-3: 197 37% 24%;
		--chart-4: 43 74% 66%;
		--chart-5: 27 87% 67%;
	}

	.dark {
		--primary: 258 80% 52%;
		--bg1: 240 9% 2%;
		--bg2: 240 7% 8%;
		--bg3: 240 8% 12%;
		--bg4: 240 6% 16%;
		--fg1: 0 0% 100%;
		--fg2: 240 4% 60%;
		--fg3: 240 4% 40%;
		--border: 240 4% 15%;
		--border-secondary: 240 3% 30%;
		--information: 210 100% 50%;
		--success: 135 50% 44%;
		--error: 0 100% 60%;
		--warning: 35 100% 50%;
		--radius: 0.5rem;
		--static-white: 0 0% 100%;
		--static-black: 240 10% 10%;
		--information: 210 100% 52%;
		--success: 135 60% 46%;
		--error: 0 100% 62%;
		--warning: 35 100% 52%;
	}


}

@layer base {
	* {
		@apply border-border;
		scrollbar-width: thin;
		scrollbar-color: hsl(var(--border)) transparent;
		scroll-behavior: smooth;
	}

	html {
		font-family: "Inter", system-ui, sans-serif;
	}

	body {
		@apply bg-[hsl(var(--bg1))] text-[hsl(var(--fg1))];
	}

	code[data-line-numbers] {
		counter-reset: line;
	}

	code[data-line-numbers]>[data-line]::before {
		counter-increment: line;
		content: counter(line);

		/* Other styling */
		display: inline-block;
		width: 0.75rem;
		margin-right: 2rem;
		text-align: right;
		color: gray;
	}

	code[data-line-numbers-max-digits="2"]>[data-line]::before {
		width: 1.25rem;
	}

	code[data-line-numbers-max-digits="3"]>[data-line]::before {
		width: 1.75rem;
	}

	code[data-line-numbers-max-digits="4"]>[data-line]::before {
		width: 2.25rem;
	}
}

@layer utilities {

	/* Base typography classes for headings and body */
	.font-heading {
		font-family: "Inter Display", system-ui, sans-serif;
	}

	.font-body {
		font-family: "Inter", system-ui, sans-serif;
	}

	/* Heading styles */
	.heading-1 {
		@apply font-heading text-[2.5rem] font-bold leading-[2.75rem];

		@screen sm {
			font-size: 3rem;
			line-height: 3.5rem;
		}

		@screen lg {
			font-size: 4rem;
			line-height: 4.5rem;
		}
	}

	.heading-2 {
		@apply font-heading text-[2rem] font-bold leading-[2.5rem];

		@screen sm {
			font-size: 2.5rem;
			line-height: 3rem;
		}

		@screen lg {
			font-size: 3rem;
			line-height: 3.5rem;
		}
	}

	.heading-3 {
		@apply font-heading text-[1.5rem] font-bold leading-[2rem];

		@screen sm {
			font-size: 2rem;
			line-height: 2.5rem;
		}

		@screen lg {
			font-size: 2.5rem;
			line-height: 3rem;
		}
	}

	.heading-4 {
		@apply font-heading text-[1.25rem] font-bold leading-[1.75rem];

		@screen sm {
			font-size: 1.5rem;
			line-height: 2rem;
		}

		@screen lg {
			font-size: 2rem;
			line-height: 2.5rem;
		}
	}

	.heading-5 {
		@apply font-heading text-[1.125rem] font-bold leading-[1.75rem];

		@screen sm {
			font-size: 1.125rem;
			line-height: 1.75rem;
		}

		@screen lg {
			font-size: 1.5rem;
			line-height: 2rem;
		}
	}

	.heading-6 {
		@apply font-heading text-[1rem] font-bold leading-[1.5rem];

		@screen sm {
			font-size: 1.125rem;
			line-height: 1.75rem;
		}

		@screen lg {
			font-size: 1.25rem;
			line-height: 1.75rem;
		}
	}

	/* Body text styles */
	.body-lg {
		@apply font-body text-[1.125rem] leading-[1.75rem];
	}

	.body-base {
		@apply font-body text-[1rem] leading-[1.5rem];
	}

	.body-sm {
		@apply font-body text-[0.875rem] leading-[1.25rem];
	}

	.body-xs {
		@apply font-body text-[0.75rem] leading-[1rem];
	}

	/* Custom scrollbar styling. */
	::-webkit-scrollbar {
		width: 6px;
	}

	::-webkit-scrollbar-track {
		background: transparent;
	}

	::-webkit-scrollbar-thumb {
		background: hsl(var(--border));
		border-radius: 5px;
	}

	::-webkit-scrollbar-thumb:hover {
		background: hsl(var(--border-secondary));
	}

	.no-scrollbar {
		-ms-overflow-style: none;
		/* IE and Edge */
		scrollbar-width: none;
		/* Firefox */
	}

	.no-scrollbar::-webkit-scrollbar {
		display: none;
		/* Chrome, Safari and Opera */
	}

	/* Chrome & other browser puts a background color on autofill inputs,
	 this removes it */
	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	input:-webkit-autofill:active {
		-webkit-background-clip: text;
		-webkit-text-fill-color: inherit;
		transition: background-color 5000s ease-in-out 0s;
		box-shadow: inset 0 0 20px 20px transparent;
	}

	/* Hide the number stepper for input[type="number"] */
	input[type="number"].hide-stepper::-webkit-outer-spin-button,
	input[type="number"].hide-stepper::-webkit-inner-spin-button,
	input[type="number"].hide-stepper {
		-webkit-appearance: none;
		margin: 0;
		-moz-appearance: textfield !important;
	}
}
`
export const GLOBAL_CSS_V4 = `@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme static {
	/* Border radius variables */
	--radius-radius-none: 0px;
	--radius-radius-xs: 2px;
	--radius-radius-sm: 4px;
	--radius-radius-md: 6px;
	--radius-radius-lg: 8px;
	--radius-radius-xl: 12px;
	--radius-radius-2xl: 16px;

	/* primary */
	--color-primary: hsl(250, 80%, 60%);
	--color-primary-accent: hsl(230, 100%, 96%);
	--color-primary-focus: hsl(234, 100%, 94%);
	--color-primary-stroke: hsl(246, 89%, 67%);
	--color-primary-hover: hsl(246, 89%, 67%);
	--color-primary-text: hsl(252, 62%, 51%);

	/* information */
	--color-info: hsl(210, 100%, 50%);
	--color-info-accent: hsl(197, 100%, 96%);
	--color-info-focus: hsl(196, 100%, 85%);
	--color-info-stroke: hsl(196, 100%, 64%);
	--color-info-hover: hsl(206, 100%, 51%);
	--color-info-text: hsl(210, 100%, 50%);

	/* success */
	--color-success: hsl(135, 56%, 29%);
	--color-success-accent: hsl(136, 65%, 96%);
	--color-success-focus: hsl(134, 68%, 93%);
	--color-success-stroke: hsl(135, 60%, 40%);
	--color-success-hover: hsl(135, 60%, 40%);
	--color-success-text: hsl(136, 48%, 20%);

	/* error */
	--color-error: hsl(0, 80%, 55%);
	--color-error-accent: hsl(0, 100%, 96%);
	--color-error-focus: hsl(0, 100%, 94%);
	--color-error-stroke: hsl(0, 93%, 60%);
	--color-error-hover: hsl(0, 93%, 60%);
	--color-error-text: hsl(0, 81%, 42%);

	/* warning */
	--color-warning: hsl(29, 96%, 37%);
	--color-warning-accent: hsl(51, 100%, 94%);
	--color-warning-focus: hsl(52, 100%, 88%);
	--color-warning-stroke: hsl(35, 100%, 45%);
	--color-warning-hover: hsl(35, 100%, 45%);
	--color-warning-text: hsl(26, 88%, 31%);

	/* background */
	--color-bg-level0: hsl(230, 6%, 96%);
	--color-bg-base: hsl(0, 0%, 100%);
	--color-bg-level1: hsl(0, 0%, 100%);
	--color-bg-level2: hsl(0, 0%, 100%);

	--color-text: hsl(230, 6%, 4%);
	--color-text-secondary: hsl(230, 6%, 36%);
	--color-text-tertiary: hsl(230, 6%, 60%);
	--color-text-disabled: hsl(230, 6%, 80%);
	--color-text-inverse: hsl(0, 0%, 100%);

	/* stroke */
	--color-border: hsl(230, 6%, 88%);
	--color-soft: hsl(230, 6%, 92%);
	--color-soft-alpha: color-mix(in srgb, hsl(240, 5%, 4%), transparent 92%);
	--color-border-alpha: color-mix(in srgb, hsl(240, 5%, 4%), transparent 88%);
	/* 2% opacity */
	/* fill */
	--color-fill-level1: hsl(230, 6%, 98%);
	--color-fill-level2: hsl(230, 6%, 96%);
	--color-fill-level3: hsl(230, 6%, 88%);
	--color-fill-level4: hsl(230, 6%, 84%);

	/* fill-inverse */
	--color-inverse-fill-level1: color-mix(in srgb, hsl(0, 0%, 100%), transparent 98%);
	/* 2% opacity */
	--color-inverse-fill-level2: color-mix(in srgb, hsl(0, 0%, 100%), transparent 96%);
	/* 4% opacity */
	--color-inverse-fill-level3: color-mix(in srgb, hsl(0, 0%, 100%), transparent 92%);
	/* 8% opacity */
	--color-inverse-fill-level4: color-mix(in srgb, hsl(0, 0%, 100%), transparent 84%);
	/* 16% opacity */

	/* static */
	--color-static-white: hsl(0, 0%, 100%);
	--color-static-black: hsl(230, 6%, 4%);

	/* inverse */
	--color-inverse-black: hsl(230, 6%, 4%);
	--color-inverse-white: hsl(0, 0%, 100%);

	/* Breakpoints */
	--breakpoint-laptop: 90rem;

	/* Font families */
	--heading-font: "Inter Display", system-ui, sans-serif;
	--body-font: "Inter", system-ui, sans-serif;
}

.dark {
	/* primary */
	--color-primary: hsl(246, 89%, 67%);
	--color-primary-accent: hsl(252, 51%, 20%);
	--color-primary-accent-secondary: hsl(249, 51%, 30%);
	--color-primary-focus: hsl(249, 51%, 30%);
	--color-primary-stroke: hsl(251, 58%, 41%);
	--color-primary-hover: hsl(241, 95%, 74%);
	--color-primary-text: hsl(241, 95%, 74%);

	/* information */
	--color-info: hsl(206, 100%, 51%);
	--color-info-accent: hsl(212, 74%, 21%);
	--color-info-accent-secondary: hsl(210, 85%, 30%);
	--color-info-focus: hsl(210, 85%, 30%);
	--color-info-stroke: hsl(212, 92%, 40%);
	--color-info-hover: hsl(201, 100%, 56%);
	--color-info-text: hsl(196, 100%, 64%);

	/* success */
	--color-success: hsl(135, 56%, 29%);
	--color-success-accent: hsl(138, 65%, 10%);
	--color-success-accent-secondary: hsl(136, 48%, 20%);
	--color-success-focus: hsl(136, 48%, 20%);
	--color-success-stroke: hsl(136, 50%, 24%);
	--color-success-hover: hsl(135, 55%, 45%);
	--color-success-text: hsl(134, 54%, 58%);

	/* error */
	--color-error: hsl(0, 80%, 55%);
	--color-error-accent: hsl(0, 82%, 15%);
	--color-error-accent-secondary: hsl(0, 69%, 30%);
	--color-error-focus: hsl(0, 69%, 30%);
	--color-error-stroke: hsl(0, 78%, 35%);
	--color-error-hover: hsl(0, 100%, 71%);
	--color-error-text: hsl(0, 100%, 71%);

	/* warning */
	--color-warning: hsl(29, 96%, 37%);
	--color-warning-accent: hsl(23, 97%, 14%);
	--color-warning-accent-secondary: hsl(25, 82%, 26%);
	--color-warning-focus: hsl(25, 82%, 26%);
	--color-warning-stroke: hsl(26, 88%, 31%);
	--color-warning-hover: hsl(41, 98%, 50%);
	--color-warning-text: hsl(47, 100%, 56%);

	/* Background */
	--color-bg-level0: hsl(230, 6%, 0%);
	--color-bg-base: hsl(230, 6%, 4%);
	--color-bg-level1: hsl(230, 6%, 8%);
	--color-bg-level2: hsl(230, 6%, 12%);

	/* foreground */
	--color-text: hsl(0, 0%, 100%);
	--color-text-secondary: hsl(230, 6%, 60%);
	--color-text-tertiary: hsl(230, 6%, 48%);
	--color-text-disabled: hsl(230, 6%, 36%);
	--color-text-inverse: hsl(230, 6%, 4%);

	/* stroke */
	--color-border: hsl(230, 6%, 16%);
	--color-border-alpha: color-mix(in srgb, hsl(0, 0%, 100%), transparent 88%);
	--color-soft: hsl(230, 6%, 12%);
	--color-soft-alpha: color-mix(in srgb, hsl(0, 0%, 100%), transparent 92%);
	/* fill */
	--color-fill-level1: hsl(230, 6%, 6%);
	/* 2% opacity */
	--color-fill-level2: hsl(230, 6%, 8%);
	/* 4% opacity */
	--color-fill-level3: hsl(230, 6%, 12%);
	/* 8% opacity */
	--color-fill-level4: hsl(230, 6%, 16%);
	/* 16% opacity */

	/* fill-inverse */
	--color-inverse-fill-level1: color-mix(in srgb, hsl(240, 5%, 4%), transparent 98%);
	/* 2% opacity */
	--color-inverse-fill-level2: color-mix(in srgb, hsl(240, 5%, 4%), transparent 96%);
	/* 4% opacity */
	--color-inverse-fill-level3: color-mix(in srgb, hsl(240, 5%, 4%), transparent 92%);
	/* 8% opacity */
	--color-inverse-fill-level4: color-mix(in srgb, hsl(240, 5%, 4%), transparent 84%);
	/* 16% opacity */

	/* static */
	--color-static-white: hsl(0, 0%, 100%);
	--color-static-black: hsl(230, 6%, 4%);

	/* inverse */
	--color-inverse-black: hsl(0, 0%, 100%);
	--color-inverse-white: hsl(230, 6%, 4%);

	--color-text-primary: hsl(0, 0%, 100%);
	/* --color-text-paragraph: var(--color-white-10); */
	--color-text-disabled: hsl(230, 6%, 36%);
	/* --color-text-4: var(--color-black-5); */

	/* static */
	--color-static-white: hsl(0, 0%, 100%);
	--color-static-black: hsl(240, 5%, 4%);
}
@layer base {
    * {
        @apply border-border;
    }
body {
        @apply font-body bg-bg-base text-text;
    }
}
@utility font-heading {
	/* Base typography classes for headings and body */
	font-family: var(--heading-font);
}

@utility font-body {
	font-family: var(--body-font);
}

@utility heading-1 {
	/* Heading styles */
	@apply font-heading text-[2.25rem] font-bold leading-[2.75rem];

	@media (width >=theme(--breakpoint-sm)) {
		font-size: 3rem;
		line-height: 3.5rem;
	}

	@media (width >=theme(--breakpoint-lg)) {
		font-size: 4rem;
		line-height: 4.5rem;
	}
}

@utility heading-2 {
	@apply font-heading text-[2rem] font-bold leading-[2.5rem];

	@media (width >=theme(--breakpoint-sm)) {
		font-size: 2.5rem;
		line-height: 3rem;
	}

	@media (width >=theme(--breakpoint-lg)) {
		font-size: 3rem;
		line-height: 3.5rem;
	}
}

@utility heading-3 {
	@apply font-heading text-[1.875rem] font-bold leading-[2.375rem];

	@media (width >=theme(--breakpoint-sm)) {
		font-size: 2.25rem;
		line-height: 2.75rem;
	}

	@media (width >=theme(--breakpoint-lg)) {
		font-size: 2.5rem;
		line-height: 3rem;
	}
}

@utility heading-4 {
	@apply font-heading text-[1.75rem] font-bold leading-[2.25rem];

	@media (width >=theme(--breakpoint-sm)) {
		font-size: 1.875rem;
		line-height: 2.375rem;
	}

	@media (width >=theme(--breakpoint-lg)) {
		font-size: 2rem;
		line-height: 2.5rem;
	}
}

@utility heading-5 {
	@apply font-heading text-[1.5rem] font-bold leading-[2rem];

	@media (width >=theme(--breakpoint-sm)) {
		font-size: 1.5rem;
		line-height: 2rem;
	}

	@media (width >=theme(--breakpoint-lg)) {
		font-size: 1.5rem;
		line-height: 2rem;
	}
}

@utility heading-6 {
	@apply font-heading text-[1.25rem] font-bold leading-[1.75rem];

	@media (width >=theme(--breakpoint-sm)) {
		font-size: 1.25rem;
		line-height: 1.75rem;
	}

	@media (width >=theme(--breakpoint-lg)) {
		font-size: 1.25rem;
		line-height: 1.75rem;
	}
}

@utility body-15 {
	@apply font-body text-[0.9375rem] leading-[1.375];
}

@utility text-sm-p {
	@apply font-body text-sm leading-[1.25rem];
}

@utility body-13 {
	@apply font-body text-[0.8125rem] leading-[1.125rem];
}

@utility no-scrollbar {
	-ms-overflow-style: none;
	/* IE and Edge */
	scrollbar-width: none;
	/* Firefox */

	&::-webkit-scrollbar {
		display: none;
		/* Chrome, Safari and Opera */
	}
}

`
