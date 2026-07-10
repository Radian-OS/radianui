import { allChangelogs } from "contentlayer/generated"
import { format } from "date-fns"
import { Mdx } from "@/components/mdx"
import { Badge } from "@/registry/ui/badge"

export default function ChangelogList() {
	const sortedChangelogs = allChangelogs.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	)

	return (
		<div className="my-8 flex flex-col gap-16">
			{sortedChangelogs.map((changelog) => {
				const formattedDate = format(new Date(changelog.date), "d MMMM, yyyy")

				return (
					<div key={changelog._id} className="flex flex-col items-start">
						<Badge variant="soft" color="primary" size="24">
							{formattedDate}
						</Badge>
						<Mdx code={changelog.body.code} />
					</div>
				)
			})}
		</div>
	)
}
