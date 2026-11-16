import path from "path"
import fs from 'fs-extra'

export async function updateDefaultTheme(
    projectPath: string,
    useSrcDir: boolean,
    defaultTheme: "light" | "dark" | "system"
) {
    if (defaultTheme === "system") return

    const candidatePaths = [
        path.join(projectPath, useSrcDir ? "src" : "", "components", "theme-provider.tsx"),
        path.join(projectPath, "src", "components", "theme-provider.tsx"),
        path.join(projectPath, "components", "theme-provider.tsx"),
    ]

    const filePath = candidatePaths.find((p) => fs.existsSync(p))
    if (!filePath) return

    const content = await fs.readFile(filePath, "utf-8")
    const updated = content
        .replace(/defaultTheme="system"/, `defaultTheme="${defaultTheme}"`)
        .replace(/defaultTheme = "system"/, `defaultTheme = "${defaultTheme}"`)

    await fs.writeFile(filePath, updated, "utf-8")
}