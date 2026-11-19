import { type SourceFile, SyntaxKind } from "ts-morph"

export function getVariantCall(source: SourceFile, name: string) {
	return source
		.getVariableDeclaration(name)
		?.getInitializerIfKind(SyntaxKind.CallExpression)
}

export function setVariantDefaults(
	call: ReturnType<typeof getVariantCall>,
	size?: string,
	variant?: string
) {
	const defaults = call
		?.getArguments()[1]
		?.asKind(SyntaxKind.ObjectLiteralExpression)
		?.getProperty("defaultVariants")
		?.asKind(SyntaxKind.PropertyAssignment)
		?.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression)

	for (const [name, value] of Object.entries({ size, variant })) {
		if (value !== undefined) {
			defaults
				?.getProperty(name)
				?.asKind(SyntaxKind.PropertyAssignment)
				?.setInitializer(JSON.stringify(value))
		}
	}
}

export function setSizeStyles(
	call: ReturnType<typeof getVariantCall>,
	radii?: Readonly<Record<string, number>>,
	paddings?: Readonly<Record<string, number>>
) {
	if (!radii && !paddings) return

	const sizes = call
		?.getArguments()[1]
		?.asKind(SyntaxKind.ObjectLiteralExpression)
		?.getProperty("variants")
		?.asKind(SyntaxKind.PropertyAssignment)
		?.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression)
		?.getProperty("size")
		?.asKind(SyntaxKind.PropertyAssignment)
		?.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression)

	for (const entry of sizes?.getProperties() ?? []) {
		const size = entry.asKind(SyntaxKind.PropertyAssignment)
		const key = size?.getName().replace(/^["']|["']$/g, "")
		const classes = size?.getInitializerIfKind(SyntaxKind.StringLiteral)
		if (!key || !classes) continue

		let value = classes.getLiteralValue()
		const radius = radii?.[key]
		const padding = paddings?.[key]
		if (radius !== undefined) value = setRadiusClass(value, radius)
		if (padding !== undefined)
			value = setUtility(
				value,
				/(?:^|\s)px-(?:\[[^\]]+\]|[\d.]+)(?=\s|$)/,
				`px-[${padding}px]`
			)
		classes.setLiteralValue(value)
	}
}

export function setRadiusClass(value: string, radius: number) {
	const utility = radius >= 999 ? "rounded-full" : `rounded-[${radius}px]`
	return setUtility(
		value,
		/(?:^|\s)rounded-(?:\[[^\]]+\]|[\w-]+)(?=\s|$)/,
		utility
	)
}

function setUtility(value: string, pattern: RegExp, utility: string) {
	// Some sources supply the base styles through a scoped registry class.
	const override = /(?:^|\s)cn-/.test(value) ? `${utility}!` : utility
	return `${value.replace(pattern, "").trim()} ${override}`.trim()
}
