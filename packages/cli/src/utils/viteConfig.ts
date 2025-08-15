import fs from 'fs-extra'
import path from 'path'

export const updateViteConfig = async (projectPath: string) => {
  const viteConfigPath = path.join(projectPath, 'vite.config.ts')
  const viteTemplate = `import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})`

  try {
    if (await fs.pathExists(viteConfigPath)) {
      await fs.writeFile(viteConfigPath, viteTemplate, 'utf8')
    }
  } catch (err) {
    throw new Error(`Failed to update vite.config.ts: ${err}`)
  }
}

export const replaceViteAppTsxAndRemoveCss = async (projectDir: string) => {
  try {
    const appTsxPath = path.join(projectDir, 'src', 'App.tsx')
    const cssFilePath = path.join(projectDir, 'src', 'App.css')

    const minimalAppTsx = `import React from 'react'

const App = () => {
  return (
    <h1 className="text-4xl font-bold text-center mt-20 text-blue-600">
      Welcome to Your Tailwind-powered App!
    </h1>
  )
}

export default App
`

    await fs.ensureFile(appTsxPath)
    await fs.writeFile(appTsxPath, minimalAppTsx, 'utf8')

    if (await fs.pathExists(cssFilePath)) {
      await fs.remove(cssFilePath)
    }
  } catch (error) {
    throw new Error(`Failed to replace App.tsx and remove App.css: ${error.message}`)
  }
}
