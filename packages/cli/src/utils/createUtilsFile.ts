import fs from "fs-extra"
import path from "path"

const UTILS_CONTENT = `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs.filter(Boolean)))
}
`

export const createUtilsFile = async (
	projectDir: string,
	hasSrcDir: boolean
) => {
	const utilsDir = path.join(projectDir, hasSrcDir ? "src/lib" : "lib")
	const utilsFilePath = path.join(utilsDir, "utils.ts")

	if (!(await fs.exists(utilsFilePath))) {
		await fs.ensureDir(utilsDir)
		await fs.writeFile(utilsFilePath, UTILS_CONTENT, "utf-8")
	}
}
