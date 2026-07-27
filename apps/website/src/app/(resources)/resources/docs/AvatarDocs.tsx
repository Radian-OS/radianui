import React from "react"
import AvatarCTA from "./AvatarCTA"
import AvatarDesign from "./AvatarDesign"
import AvatarDevlopment from "./AvatarDevlopment"
import AvatarFaq from "./AvatarFaq"
import AvatarIntroduction from "./AvatarIntroduction"
import AvatarUseCase from "./AvatarUseCase"

const AvatarDocs = () => {
	return (
		<div className="md:gap-25 md:py-30 border-soft bg-linear-to-b from-fill1 to-bg flex flex-col gap-10 border-b px-5 py-8 sm:gap-20 sm:px-6 sm:py-20">
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
