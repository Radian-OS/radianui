import { Config } from "@/utils/getConfig"

/**
 * Detect the Tailwind CSS version used in the project.
 */
export async function getProjectTailwindVersionFromConfig(
	config: Config
): Promise<"v3" | "v4"> {
	// If tailwind.config is empty or not set, assume v4.
	if (!config.tailwind?.config) {
		return "v4"
	}

	return "v3"
}
