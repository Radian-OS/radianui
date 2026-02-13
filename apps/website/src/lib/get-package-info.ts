export const getPackageVersion = async () => {
	const version = await fetch("https://registry.npmjs.org/radianui", {
		next: { revalidate: 3600 }, // cache for 1 hour
	})
		.then((res) => res.json())
		.then((data) => data["dist-tags"].latest)
	return version
}
