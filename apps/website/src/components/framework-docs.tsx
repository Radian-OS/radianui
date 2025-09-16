"use client"

import * as React from "react"
import { allDocs } from "contentlayer/generated"
import { Mdx } from "@/components/mdx-components-docs"
import Examples from "@/registry/example/example.json"

interface FrameworkDocsProps extends React.HTMLAttributes<HTMLDivElement> {
	data: string
}

export function FrameworkDocs({ ...props }: FrameworkDocsProps) {
	const frameworkDoc = allDocs.find((doc) => doc.slug === `/docs/installation/${props.data}`)

	if (!frameworkDoc) {
		return null
	}

	return <Mdx code={frameworkDoc.body.code} examples={Examples.filter((example) => example.name === frameworkDoc.slugAsParams.split("/").pop())} />
}
