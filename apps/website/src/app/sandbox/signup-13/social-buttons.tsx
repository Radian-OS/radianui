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
					className="w-full">
					{provider.iconDarkUrl ? (
						<>
							<Image
								src={provider.iconUrl}
								alt={provider.label}
								width={20}
								height={20}
								className="block size-5 shrink-0 dark:hidden"
								unoptimized
							/>
							<Image
								src={provider.iconDarkUrl}
								alt={provider.label}
								width={20}
								height={20}
								className="hidden size-5 shrink-0 dark:block"
								unoptimized
							/>
						</>
					) : (
						<Image
							src={provider.iconUrl}
							alt={provider.label}
							width={20}
							height={20}
							className={`size-5 shrink-0 ${provider.invertInDark ? "dark:invert" : ""}`}
							unoptimized
						/>
					)}
					<span>{provider.label}</span>
				</Button>
			))}
		</div>
	)
}
