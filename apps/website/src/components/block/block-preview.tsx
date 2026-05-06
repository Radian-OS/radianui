export const BlockPreview = ({ preview }: { preview: string }) => {
	return (
		<div className="border-soft mb-2 overflow-hidden rounded-xl border">
			<div className="relative h-[800px] w-[800px] overflow-hidden">
				<iframe src={`/view/${preview}`} className="h-full w-full" />
			</div>
		</div>
	)
}
