import { getComponent } from "@/components/component-preview"

export default async function Page({
	params,
}: {
	params: Promise<{ type: string; name: string }>
}) {
	const { name, type } = await params

	const Component = getComponent(`${type}/${name}`)

	return <Component />
}
