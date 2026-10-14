import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"

const profile = {
	name: "Kaelin Tristian",
	avatar: "/media/female-3.jpg",
}

// Utility function to get the avatar fallback from the name
function getAvatarFallback(name: string): string {
	const words = name.trim().split(/\s+/)
	if (words.length === 1) {
		// Single word: return first character
		return words[0].charAt(0).toUpperCase()
	}
	// Multiple words: return first character of first and last word
	return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase()
}

export default function AvatarSize() {
	const fallback = getAvatarFallback(profile.name)
	return (
		<div className="flex flex-wrap items-center justify-center gap-3">
			<Avatar size="3xs">
				<AvatarImage src={profile.avatar} />
				<AvatarFallback>{fallback}</AvatarFallback>
			</Avatar>
			<Avatar size="2xs">
				<AvatarImage src={profile.avatar} />
				<AvatarFallback>{fallback}</AvatarFallback>
			</Avatar>
			<Avatar size="xs">
				<AvatarImage src={profile.avatar} />
				<AvatarFallback>{fallback}</AvatarFallback>
			</Avatar>
			<Avatar size="sm">
				<AvatarImage src={profile.avatar} />
				<AvatarFallback>{fallback}</AvatarFallback>
			</Avatar>
			<Avatar size="md">
				<AvatarImage src={profile.avatar} />
				<AvatarFallback>{fallback}</AvatarFallback>
			</Avatar>
			<Avatar size="lg">
				<AvatarImage src={profile.avatar} />
				<AvatarFallback>{fallback}</AvatarFallback>
			</Avatar>
			<Avatar size="xl">
				<AvatarImage src={profile.avatar} />
				<AvatarFallback>{fallback}</AvatarFallback>
			</Avatar>
			<Avatar size="2xl">
				<AvatarImage src={profile.avatar} />
				<AvatarFallback>{fallback}</AvatarFallback>
			</Avatar>
			<Avatar size="3xl">
				<AvatarImage src={profile.avatar} />
				<AvatarFallback>{fallback}</AvatarFallback>
			</Avatar>
		</div>
	)
}
