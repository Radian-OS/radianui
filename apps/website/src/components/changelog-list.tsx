import { components } from "@/components/mdx-components-docs"
import { changelog } from "@/lib/source"
import { Divider } from "@/registry/ui/divider"

export default function ChangelogList() {
	const sortedChangelogs = [...changelog.getPages()].sort(
		(a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
	)

	return (
		<div className="my-8 flex flex-col">
			{sortedChangelogs.map((post, index) => (
				<div key={post.url} className="flex flex-col items-start">
					<post.data.body components={components} />
					{index < sortedChangelogs.length - 1 && <Divider className="my-16" />}
				</div>
			))}
		</div>
	)
}
