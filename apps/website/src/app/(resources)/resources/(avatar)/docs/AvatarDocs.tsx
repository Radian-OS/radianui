import React from "react"
import AvatarBestPracticeDesign from "./AvatarBestPracticeDesign"
import AvatarCTA from "./AvatarCTA"
import AvatarDesign from "./AvatarDesign"
import AvatarDevlopment from "./AvatarDevlopment"
import AvatarFaq from "./AvatarFaq"
import AvatarIntroduction from "./AvatarIntroduction"
import AvatarUseCase from "./AvatarUseCase"

const AvatarDocs = () => {
	return (
		<article
			aria-label="UI avatar design and development guide"
			className="from-fill1 to-bg flex flex-col gap-10 bg-linear-to-b px-5 py-8 sm:gap-20 sm:px-6 sm:py-20 md:gap-25 md:py-30">
			<AvatarIntroduction />
			<AvatarDesign />
			<AvatarUseCase />
			<AvatarBestPracticeDesign />
			<AvatarDevlopment />
			<AvatarFaq />
			<AvatarCTA />
		</article>
	)
}

export default AvatarDocs
