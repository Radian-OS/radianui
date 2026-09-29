import {
	BrandLogo,
	CountryFlags,
	CreditCard,
	Emoji,
	FileFormat,
	LogoGenerator,
	UIAvatars,
} from "./nav-icons"

export const resourceIconComponents = {
	avatar: UIAvatars,
	emoji: Emoji,
	"brand-logo": BrandLogo,
	"file-format": FileFormat,
	flags: CountryFlags,
	"logo-generator": LogoGenerator,
	"credit-card": CreditCard,
} as const

export type ResourceIconName = keyof typeof resourceIconComponents

export function ResourceIcon({ name }: { name: ResourceIconName }) {
	const Icon = resourceIconComponents[name]
	return <Icon />
}
