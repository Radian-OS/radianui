export const getPackageVersion = async () => {
	const version = await fetch("https://registry.npmjs.org/radianui", {
		next: { revalidate: false },
	})
		.then((res) => res.json())
		.then((data) => data["dist-tags"].latest)
	return version
}
