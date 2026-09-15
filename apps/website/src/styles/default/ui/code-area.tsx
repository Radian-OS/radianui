"use client"

import ShikiHighlighter from "react-shiki"
import { cn } from "@/lib/utils"

type CodeAreaProps = {
	theme?:
		| "andromeeda"
		| "aurora-x"
		| "ayu-dark"
		| "catppuccin-frappe"
		| "catppuccin-latte"
		| "catppuccin-macchiato"
		| "catppuccin-mocha"
		| "dark-plus"
		| "dracula"
		| "dracula-soft"
		| "everforest-dark"
		| "everforest-light"
		| "github-dark"
		| "github-dark-default"
		| "github-dark-dimmed"
		| "github-dark-high-contrast"
		| "github-light"
		| "github-light-default"
		| "github-light-high-contrast"
		| "gruvbox-dark-hard"
		| "gruvbox-dark-medium"
		| "gruvbox-dark-soft"
		| "gruvbox-light-hard"
		| "gruvbox-light-medium"
		| "gruvbox-light-soft"
		| "houston"
		| "kanagawa-dragon"
		| "kanagawa-lotus"
		| "kanagawa-wave"
		| "laserwave"
		| "light-plus"
		| "material-theme"
		| "material-theme-darker"
		| "material-theme-lighter"
		| "material-theme-ocean"
		| "material-theme-palenight"
		| "min-dark"
		| "min-light"
		| "monokai"
		| "night-owl"
		| "nord"
		| "one-dark-pro"
		| "one-light"
		| "plastic"
		| "poimandres"
		| "red"
		| "rose-pine"
		| "rose-pine-dawn"
		| "rose-pine-moon"
		| "slack-dark"
		| "slack-ochin"
		| "snazzy-light"
		| "solarized-dark"
		| "solarized-light"
		| "synthwave-84"
		| "tokyo-night"
		| "vesper"
		| "vitesse-black"
		| "vitesse-dark"
		| "vitesse-light"
	code: string
	language:
		| "angular-html"
		| "angular-ts"
		| "astro"
		| "bash"
		| "blade"
		| "c"
		| "c++"
		| "coffee"
		| "coffeescript"
		| "cpp"
		| "css"
		| "glsl"
		| "gql"
		| "graphql"
		| "haml"
		| "handlebars"
		| "hbs"
		| "html"
		| "html-derivative"
		| "http"
		| "imba"
		| "jade"
		| "java"
		| "javascript"
		| "jinja"
		| "jison"
		| "jl"
		| "js"
		| "json"
		| "json5"
		| "jsonc"
		| "jsonl"
		| "jsx"
		| "julia"
		| "less"
		| "lit"
		| "markdown"
		| "marko"
		| "md"
		| "mdc"
		| "mdx"
		| "php"
		| "postcss"
		| "pug"
		| "py"
		| "python"
		| "r"
		| "regex"
		| "regexp"
		| "sass"
		| "scss"
		| "sh"
		| "shell"
		| "shellscript"
		| "sql"
		| "styl"
		| "stylus"
		| "svelte"
		| "ts"
		| "ts-tags"
		| "tsx"
		| "typescript"
		| "vue"
		| "vue-html"
		| "wasm"
		| "wgsl"
		| "wit"
		| "xml"
		| "yaml"
		| "yml"
		| "zsh"
	className?: string
	lineNumbers?: boolean
	pkg?: string[]
	tabs?: boolean
}

const DEFAULT_THEME = "github-dark-high-contrast"

function CodeArea({
	code,
	theme = DEFAULT_THEME,
	language,
	className,
	lineNumbers = false,
}: CodeAreaProps) {
	return (
		<div
			className={cn(
				"no-scrollbar relative box-border overflow-auto rounded-xl text-sm",
				className
			)}>
			<ShikiHighlighter
				as={`pre`}
				className="[&_pre]:no-scrollbar h-full w-full [&_pre]:h-full [&_pre]:w-full"
				language={language}
				theme={theme}
				showLineNumbers={lineNumbers}
				showLanguage={false}>
				{code.trim()}
			</ShikiHighlighter>
		</div>
	)
}

export { CodeArea, type CodeAreaProps }
