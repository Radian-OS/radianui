import { allChangelogs } from "contentlayer/generated"
import { Mdx } from "@/components/mdx"

export default function ChangelogList() {
	const sortedChangelogs = allChangelogs.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	)

	return (
		<div className="my-8 flex flex-col gap-16">
			{sortedChangelogs.map((changelog) => (
				<Mdx key={changelog._id} code={changelog.body.code} />
			))}
		</div>
	)
}
