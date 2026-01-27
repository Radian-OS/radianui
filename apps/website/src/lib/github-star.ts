let cachedStars: number | null = 0
let lastFetch = 0
const CACHE_DURATION = 1000 * 60 * 10 // 10 minutes

export async function fetchGithubStars() {
	const now = Date.now()
	if (cachedStars !== null && now - lastFetch < CACHE_DURATION) {
		return cachedStars
	}

	try {
		const res = await fetch("https://api.github.com/repos/Radian-os/radianos")
		if (!res.ok) throw new Error(`GitHub API returned ${res.status}`)
		const data = await res.json()
		cachedStars = data.stargazers_count
		lastFetch = now
		return cachedStars
	} catch (error) {
		console.error("GitHub fetch error:", error)
		return cachedStars // fallback to last known value (or 0)
	}
}
