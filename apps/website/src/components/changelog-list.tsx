import { allChangelogs } from "contentlayer/generated"
import { format } from "date-fns"
import { Mdx } from "@/components/mdx"
import { Divider } from "@/registry/ui/divider"

export default function ChangelogList() {
	const sortedChangelogs = allChangelogs.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	)

	return (
		<div className="my-8 flex flex-col">
			{sortedChangelogs.map((changelog, index) => {
				const formattedDate = format(new Date(changelog.date), "d MMMM, yyyy")

				return (
					<div key={changelog._id} className="flex flex-col items-start">
						<h2 className="heading-5 text-fg mb-4">{formattedDate}</h2>
						<Mdx code={changelog.body.code} />
						{index < sortedChangelogs.length - 1 && (
							<Divider className="my-16" />
						)}
					</div>
				)
			})}
		</div>
	)
}
