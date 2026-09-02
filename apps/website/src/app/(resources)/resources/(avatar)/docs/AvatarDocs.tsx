import React from "react"
import { ResourceDocs } from "../../components/ResourceDocs"
import AvatarCTA from "./AvatarCTA"
import AvatarDesign from "./AvatarDesign"
import AvatarDevlopment from "./AvatarDevlopment"
import AvatarFaq from "./AvatarFaq"
import AvatarIntroduction from "./AvatarIntroduction"
import AvatarUseCase from "./AvatarUseCase"

const AvatarDocs = () => {
	return (
		<ResourceDocs label="UI avatar design and development guide">
			<AvatarIntroduction />
			<AvatarUseCase />
			<AvatarDesign />
			<AvatarDevlopment />
			<AvatarFaq />
			<AvatarCTA />
		</ResourceDocs>
	)
}

export default AvatarDocs
