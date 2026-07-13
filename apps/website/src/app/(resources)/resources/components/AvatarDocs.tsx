import React from "react"
import AvatarCTA from "./AvatarCTA"
import AvatarDesign from "./AvatarDesign"
import AvatarDevlopment from "./AvatarDevlopment"
import AvatarFaq from "./AvatarFaq"
import AvatarIntroduction from "./AvatarIntroduction"
import AvatarUseCase from "./AvatarUseCase"

const AvatarDocs = () => {
	return (
		<div className="gap-25 py-30 border-soft bg-linear-to-b from-fill1 to-bg flex flex-col border-b px-5 sm:px-6">
			<AvatarIntroduction />
			<AvatarUseCase />
			<AvatarDesign />
			<AvatarDevlopment />
			<AvatarFaq />
			<AvatarCTA />
		</div>
	)
}

export default AvatarDocs
