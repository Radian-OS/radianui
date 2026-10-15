import {
	ResourceToastPreview,
	showResourceToast,
} from "../../components/ResourceToast"

export function showBrandLogoToast({
	logoUrl,
	description,
	title,
}: {
	logoUrl: string
	description: string
	title?: string
}) {
	showResourceToast({
		title,
		description,
		preview: (
			<ResourceToastPreview>
				<img
					src={logoUrl}
					alt=""
					width={48}
					height={48}
					className="size-12 object-contain"
					aria-hidden="true"
				/>
			</ResourceToastPreview>
		),
	})
}
