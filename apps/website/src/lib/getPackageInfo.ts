import packageJson from "../../package.json"

export const getPackageVersion = () => {
	return packageJson.version
}
