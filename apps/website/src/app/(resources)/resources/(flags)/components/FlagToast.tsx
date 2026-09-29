import {
	ResourceToastPreview,
	showResourceToast,
} from "../../components/ResourceToast"
import { FlagImage } from "./FlagImage"
import type { FlagName, FlagShape } from "./flags-data"

export function showFlagToast({
	name,
	shape,
	description,
	title,
}: {
	name: FlagName
	shape: FlagShape
	description: string
	title?: string
}) {
	showResourceToast({
		title,
		description,
		preview: (
			<ResourceToastPreview>
				<FlagImage name={name} shape={shape} size={40} alt="" />
			</ResourceToastPreview>
		),
	})
}
