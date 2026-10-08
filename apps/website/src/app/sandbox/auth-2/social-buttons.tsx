import Image from "next/image"
import { Button } from "@/styles/default/ui/button"
import { SOCIAL_PROVIDERS } from "./types"

export function SocialButtons() {
	return (
		<div className="flex flex-col gap-3">
			{SOCIAL_PROVIDERS.map((provider) => (
				<Button
					key={provider.id}
					type="button"
					variant="outline"
					color="neutral"
					className="w-full justify-center gap-2">
					<Image
						src={provider.iconUrl}
						alt={provider.label}
						width={16}
						height={16}
						className={`size-4 shrink-0 ${provider.invertInDark ? "dark:invert" : ""}`}
						unoptimized
					/>
					<span>{provider.label}</span>
				</Button>
			))}
		</div>
	)
}
