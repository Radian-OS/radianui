import { getPackageVersion } from "@/lib/getPackageInfo"
import { Badge } from "@/registry/ui/badge"

const VersionDisplay = () => {
	const version = getPackageVersion()

	return (
		<div className="hidden items-center justify-center md:flex">
			<Badge className="body-xs" size="24">
				Version {version}
			</Badge>
		</div>
	)
}

export default VersionDisplay
