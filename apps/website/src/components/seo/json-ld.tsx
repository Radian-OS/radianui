export type JsonLdValue =
	| string
	| number
	| boolean
	| null
	| JsonLdObject
	| JsonLdValue[]

export interface JsonLdObject {
	[key: string]: JsonLdValue
}

interface JsonLdProps {
	data: JsonLdObject
	id?: string
}

export function JsonLd({ data, id }: JsonLdProps) {
	// Escaping `<` prevents user-controlled content from closing the script tag.
	const json = JSON.stringify(data).replace(/</g, "\\u003c")

	return (
		<script
			id={id}
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: json }}
		/>
	)
}
