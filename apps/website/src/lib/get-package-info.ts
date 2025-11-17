export const getPackageVersion = async () => {
	const version = await fetch(process.env.VERSION! || "https://registry.npmjs.org/radianui")
		.then((res) => res.json())
		.then((data) => data["dist-tags"].latest)
	return version
}
