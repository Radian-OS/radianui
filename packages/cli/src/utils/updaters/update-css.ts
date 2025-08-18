import type { PluginCreator, Root } from 'postcss'
import postcss from 'postcss'

import { Color, type Font, type FontData, getBrandColor, getFont } from '@utils/registry'

export type ThemeUpdateOptions = {
  color?: Color
  font?: Font
}

export function updateLightThemeColors(root: Root, colorSet: Record<string, string>) {
  // Process @theme static at-rules for light theme
  root.walkAtRules('theme', (atRule) => {
    if (atRule.params === 'static') {
      atRule.walkDecls((decl) => {
        if (decl.prop.startsWith('--color-primary')) {
          const colorKey = decl.prop.replace('--color-primary', '') || ''
          const fullColorName = colorKey ? `primary${colorKey}` : 'primary'

          if (colorSet[fullColorName]) {
            decl.value = colorSet[fullColorName]
          } else {
            console.log(`No color found for: ${fullColorName}`)
          }
        }
      })
    }
  })
}

export function updateDarkThemeColors(root: Root, colorSet: Record<string, string>) {
  // Process .dark rules for dark theme
  root.walkRules((rule) => {
    if (rule.selector === '.dark') {
      rule.walkDecls((decl) => {
        if (decl.prop.startsWith('--color-primary')) {
          const colorKey = decl.prop.replace('--color-primary', '') || ''
          const fullColorName = colorKey ? `primary${colorKey}` : 'primary'

          if (colorSet[fullColorName]) {
            decl.value = colorSet[fullColorName]
          } else {
            console.log(`No color found for: ${fullColorName}`)
          }
        }
      })
    }
  })
}

const updateFontVariables = (root: Root, fontData: FontData) => {
  let foundImport = false
  root.walkAtRules('import', (atRule) => {
    const params = atRule.params.replace(/['"]/g, '')
    if (params.startsWith('url(') && params.includes('fonts.googleapis.com')) {
      atRule.params = `url("${fontData.importURL}")`
      foundImport = true
    }
  })

  if (!foundImport) {
    const newImport = postcss.atRule({
      name: 'import',
      params: `url("${fontData.importURL}")`,
    })
    root.prepend(newImport)
  }
  root.walkAtRules('theme', (atRule) => {
    if (!atRule.params || atRule.params === 'static') {
      atRule.walkDecls((decl) => {
        if (decl.prop === '--heading-font') {
          decl.value = `"${fontData.cssVariables['heading-font']}", system-ui, sans-serif`
        } else if (decl.prop === '--body-font') {
          decl.value = `"${fontData.cssVariables['body-font']}", system-ui, sans-serif`
        }
      })
    }
  })
}

const themeUpdatePlugin: PluginCreator<ThemeUpdateOptions> = (options = {}) => {
  const { color, font } = options
  return {
    postcssPlugin: 'theme-update',
    async Once(root: Root) {
      try {
        if (!color || !font) {
          throw new Error('No theme name or font name provided.')
        }

        const [themeData, fontData] = await Promise.all([getBrandColor(color), getFont(font)])

        if (!fontData.importURL || !fontData.cssVariables) {
          throw new Error(`No font data found for font: ${font}`)
        }

        updateFontVariables(root, fontData)

        if (!themeData?.cssVariables) {
          throw new Error(`No theme colors found for theme: ${color}`)
        }

        if (themeData.cssVariables.light) {
          updateLightThemeColors(root, themeData.cssVariables.light)
        }

        if (themeData.cssVariables.dark) {
          updateDarkThemeColors(root, themeData.cssVariables.dark)
        }
      } catch (error) {
        throw new Error(`Error updating theme colors: ${error instanceof Error ? error.message : 'unknown error'}`)
      }
    },
  }
}

themeUpdatePlugin.postcss = true

export default themeUpdatePlugin

// Utility function to update CSS file with theme colors and fonts
export async function updateCssWithTheme(cssFilePath: string, color: Color, font: Font): Promise<void> {
  const fs = await import('fs/promises')
  try {
    const css = await fs.readFile(cssFilePath, 'utf-8')

    const result = await postcss([themeUpdatePlugin({ color, font })]).process(css, { from: cssFilePath })

    await fs.writeFile(cssFilePath, result.css)
  } catch (error) {
    throw new Error(`Error updating CSS file: ${error instanceof Error ? error.message : 'unknown error'}`)
  }
}
