import assert from "node:assert/strict"
import { test } from "node:test"
import React from "react"
import { renderToStaticMarkup } from "react-dom/server"
import {
	Button,
	ButtonGroup,
	CompactButton,
	IconButton,
	ButtonThemeProvider,
} from "../ui/button"

function render(
	children: React.ReactNode,
	defaultVariant: "glossy" | "link" = "glossy"
) {
	return renderToStaticMarkup(
		<ButtonThemeProvider value={{ defaultSize: "lg", defaultVariant }}>
			{children}
		</ButtonThemeProvider>
	)
}
test("Button uses selected defaults but explicit props win", () => {
	assert.match(render(<Button>Save</Button>), /h-10/)
	assert.match(render(<Button>Save</Button>), /before:from-white/)
	const overridden = render(
		<Button size="xs" variant="ghost">
			Cancel
		</Button>
	)
	assert.match(overridden, /h-7/)
	assert.match(overridden, /bg-transparent/)
	assert.doesNotMatch(overridden, /before:from-white/)
})
test("ButtonGroup uses shared defaults, handles a single child, and preserves child overrides", () => {
	const html = render(
		<ButtonGroup>
			<Button>One</Button>
			{null}
			<Button size="xs" variant="ghost">
				Two
			</Button>
		</ButtonGroup>
	)
	assert.match(html, /h-10/)
	assert.match(html, /h-7/)
	assert.match(html, /rounded-l-/)
	assert.match(html, /rounded-r-/)
	const single = render(
		<ButtonGroup>
			<Button>One</Button>
		</ButtonGroup>
	)
	assert.match(single, /rounded-\[var\(--button-effective-radius/)
})
test("CompactButton keeps both sizes, shares radius, and rejects unsupported Link defaults", () => {
	for (const [size, height] of [
		["sm", "h-5"],
		["md", "h-6"],
	] as const) {
		const html = render(<CompactButton size={size}>X</CompactButton>)
		assert.ok(html.includes(height))
		assert.match(html, /var\(--compact-button-radius,/)
		assert.doesNotMatch(html, /h-10/)
		assert.doesNotMatch(
			render(<CompactButton size={size}>X</CompactButton>, "link"),
			/h-auto/
		)
	}
	assert.match(render(<IconButton size="sm">X</IconButton>), /size-8/)
})
