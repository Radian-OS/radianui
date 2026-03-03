/**
 * Mdx component to render MDX content
 * @param code - The MDX code to render
 * @returns A React component that renders the MDX content
 */

import { useMemo } from "react"
import { getMDXComponent } from "mdx-bundler/client"
import Examples from "@/registry/example/example.json"
import { components } from "./mdx-components-docs"

type MdxProps = {
	code: string
	examples: typeof Examples
}

/**
 * @returns A React component that renders an error message
 */

function ErrorComponent() {
	return <div className="text-error-text">Error rendering content</div>
}

export function Mdx({ code, examples }: MdxProps) {
	const Component = useMemo(() => {
		if (!code) return () => null
		try {
			return getMDXComponent(code)
		} catch (error) {
			console.log(error)
			return ErrorComponent
		}
	}, [code])

	return <Component components={components(examples)} />
}
