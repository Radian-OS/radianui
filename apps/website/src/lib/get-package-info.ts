export const getPackageVersion = async () => {
	const version = await fetch("https://registry.npmjs.org/radianui", {
		cache: "no-store",
	})
		.then((res) => res.json())
		.then((data) => data["dist-tags"].latest)
	return version
}
