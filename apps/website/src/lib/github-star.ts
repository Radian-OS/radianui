export async function fetchGithubStars() {
	try {
		const res = await fetch("https://api.github.com/repos/Radian-os/radianos", {
			cache: "no-store",
		})
		if (!res.ok) throw new Error("Failed to fetch")

		const data = await res.json()
		return data.stargazers_count as number
	} catch (error) {
		console.error("GitHub fetch error:", error)
		return null
	}
}
