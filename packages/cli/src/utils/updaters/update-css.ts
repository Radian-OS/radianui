import type { AtRule, Declaration, PluginCreator, Root, Rule } from 'postcss'
import postcss from 'postcss'

import { logger } from '@utils/logger'
import { Color, type Font, type FontData, getBrandColor, getFont } from '@utils/registry'


export interface ThemeUpdateOptions {
  color?: Color
  font?: Font
}

type ColorSet = Record<string, string>

const CSS_CONSTANTS = {
  DARK_SELECTOR: '.dark',
  COLOR_PRIMARY_PREFIX: '--color-primary',
  GOOGLE_FONTS_DOMAIN: 'fonts.googleapis.com',
  HEADING_FONT_PROP: '--heading-font',
  BODY_FONT_PROP: '--body-font',
  FALLBACK_FONTS: 'system-ui, sans-serif',
} as const

/**
 * Updates CSS custom properties for primary colors in light theme
 * Processes @theme at-rules and replaces color values based on the provided color set
 *
 * @param root - PostCSS AST root node
 * @param colorSet - Object mapping color names to their CSS values
 */
function updateLightThemeColors(root: Root, colorSet: ColorSet): void {
  root.walkAtRules('theme', (atRule: AtRule) => {
    updateColorDeclarations(atRule, colorSet, 'light theme @theme rule')
  })
}

/**
 * Updates CSS custom properties for primary colors in dark theme
 * Processes .dark selector rules and replaces color values based on the provided color set
 *
 * @param root - PostCSS AST root node
 * @param colorSet - Object mapping color names to their CSS values
 */
function updateDarkThemeColors(root: Root, colorSet: ColorSet): void {
  root.walkRules((rule: Rule) => {
    if (rule.selector === CSS_CONSTANTS.DARK_SELECTOR) {
      updateColorDeclarations(rule, colorSet, 'dark theme rule')
    }
  })
}

/**
 * Helper function to update color declarations within a given CSS node
 * Extracts the color key from CSS property names and updates values accordingly
 *
 * @param node - PostCSS node containing declarations (AtRule or Rule)
 * @param colorSet - Object mapping color names to their CSS values
 * @param context - Context string for logging purposes
 */
function updateColorDeclarations(node: AtRule | Rule, colorSet: ColorSet, context: string): void {
  node.walkDecls((decl: Declaration) => {
    if (!decl.prop.startsWith(CSS_CONSTANTS.COLOR_PRIMARY_PREFIX)) {
      return
    }

    const colorKey = extractColorKey(decl.prop)
    const fullColorName = buildFullColorName(colorKey)

    if (colorSet[fullColorName]) {
      decl.value = colorSet[fullColorName]
    } else {
      logger.error(`No color found for: ${fullColorName} in ${context}`)
    }
  })
}

/**
 * Extracts the color key from a CSS property name
 * Example: '--color-primary-500' → '-500', '--color-primary' → ''
 *
 * @param prop - CSS property name
 * @returns The extracted color key suffix
 */
function extractColorKey(prop: string): string {
  return prop.replace(CSS_CONSTANTS.COLOR_PRIMARY_PREFIX, '') || ''
}

/**
 * Builds the full color name from a color key
 * Example: '-500' → 'primary-500', '' → 'primary'
 *
 * @param colorKey - The color key suffix
 * @returns The full color name for lookup
 */
function buildFullColorName(colorKey: string): string {
  return colorKey ? `primary${colorKey}` : 'primary'
}

/**
 * Updates or adds Google Fonts import and font family CSS variables
 * Handles both existing import updates and new import creation
 *
 * @param root - PostCSS AST root node
 * @param fontData - Font configuration data containing import URL and CSS variables
 */
function updateFontVariables(root: Root, fontData: FontData): void {
  validateFontData(fontData)

  const importUpdated = updateExistingFontImport(root, fontData.importURL)

  if (!importUpdated) {
    addNewFontImport(root, fontData.importURL)
  }

  updateFontDeclarations(root, fontData)
}

/**
 * Validates font data to ensure required properties exist
 *
 * @param fontData - Font data to validate
 * @throws Error if required font data is missing
 */
function validateFontData(fontData: FontData): void {
  if (!fontData.importURL || !fontData.cssVariables) {
    throw new Error('Font data must contain importURL and cssVariables')
  }
}

/**
 * Updates existing Google Fonts import statements
 *
 * @param root - PostCSS AST root node
 * @param importURL - New Google Fonts import URL
 * @returns True if an import was found and updated, false otherwise
 */
function updateExistingFontImport(root: Root, importURL: string): boolean {
  let foundImport = false

  root.walkAtRules('import', (atRule: AtRule) => {
    const params = atRule.params.replace(/['"]/g, '')

    if (isGoogleFontsImport(params)) {
      atRule.params = `url("${importURL}")`
      foundImport = true
    }
  })

  return foundImport
}

/**
 * Checks if an import parameter is a Google Fonts URL
 *
 * @param params - Import parameters to check
 * @returns True if this is a Google Fonts import
 */
function isGoogleFontsImport(params: string): boolean {
  return params.startsWith('url(') && params.includes(CSS_CONSTANTS.GOOGLE_FONTS_DOMAIN)
}

/**
 * Adds a new Google Fonts import to the beginning of the CSS
 *
 * @param root - PostCSS AST root node
 * @param importURL - Google Fonts import URL to add
 */
function addNewFontImport(root: Root, importURL: string): void {
  const newImport = postcss.atRule({
    name: 'import',
    params: `url("${importURL}")`,
  })

  root.prepend(newImport)
}

/**
 * Updates font family declarations in @theme rules
 *
 * @param root - PostCSS AST root node
 * @param fontData - Font data containing CSS variable definitions
 */
function updateFontDeclarations(root: Root, fontData: FontData): void {
  root.walkAtRules('theme', (atRule: AtRule) => {
    atRule.walkDecls((decl: Declaration) => {
      updateFontDeclaration(decl, fontData)
    })
  })
}

/**
 * Updates individual font declarations
 *
 * @param decl - CSS declaration to potentially update
 * @param fontData - Font data containing CSS variable definitions
 */
function updateFontDeclaration(decl: Declaration, fontData: FontData): void {
  const { cssVariables } = fontData

  if (decl.prop === CSS_CONSTANTS.HEADING_FONT_PROP && cssVariables['heading-font']) {
    decl.value = buildFontValue(cssVariables['heading-font'])
  } else if (decl.prop === CSS_CONSTANTS.BODY_FONT_PROP && cssVariables['body-font']) {
    decl.value = buildFontValue(cssVariables['body-font'])
  }
}

/**
 * Builds a complete CSS font-family value with fallbacks
 *
 * @param fontName - Primary font name
 * @returns Complete font-family CSS value with fallbacks
 */
function buildFontValue(fontName: string): string {
  return `"${fontName}", ${CSS_CONSTANTS.FALLBACK_FONTS}`
}

/**
 * PostCSS plugin for updating theme colors and fonts
 *
 * This plugin processes CSS files to:
 * - Update primary color variables in both light and dark themes
 * - Update or add Google Fonts imports
 * - Update font-family CSS variables
 *
 * @param options - Configuration options for color and font updates
 * @returns PostCSS plugin configuration object
 */
const themeUpdatePlugin: PluginCreator<ThemeUpdateOptions> = (options = {}) => {
  const { color, font } = options

  return {
    postcssPlugin: 'theme-update',

    /**
     * Main plugin execution - runs once per CSS processing
     */
    async Once(root: Root): Promise<void> {
      try {
        validatePluginOptions(color, font)

        // Fetch theme and font data concurrently for better performance
        const [themeData, fontData] = await Promise.all([getBrandColor(color!), getFont(font!)])

        // Update fonts and colors concurrently
        await Promise.all([updateThemeFonts(root, fontData, font!), updateThemeColors(root, themeData, color!)])
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        throw new Error(`Error updating theme colors: ${errorMessage}`)
      }
    },
  }
}

/**
 * Validates that required plugin options are provided
 *
 * @param color - Color theme option
 * @param font - Font option
 * @throws Error if required options are missing
 */
function validatePluginOptions(color?: Color, font?: Font): void {
  if (!color || !font) {
    throw new Error('Both color and font options are required for theme updates')
  }
}

/**
 * Handles font updates with proper error handling and validation
 *
 * @param root - PostCSS AST root node
 * @param fontData - Font configuration data
 * @param font - Font identifier for error messages
 */
async function updateThemeFonts(root: Root, fontData: FontData, font: Font): Promise<void> {
  if (!fontData?.importURL || !fontData?.cssVariables) {
    throw new Error(`Invalid or incomplete font data for font: ${font}`)
  }

  updateFontVariables(root, fontData)
}

/**
 * Handles color updates with proper error handling and validation
 *
 * @param root - PostCSS AST root node
 * @param themeData - Theme color data
 * @param color - Color theme identifier for error messages
 */
async function updateThemeColors(root: Root, themeData: any, color: Color): Promise<void> {
  if (!themeData?.cssVariables) {
    throw new Error(`No theme color data found for theme: ${color}`)
  }

  const { light, dark } = themeData.cssVariables

  if (light) {
    updateLightThemeColors(root, light)
  }

  if (dark) {
    updateDarkThemeColors(root, dark)
  }
}

// Mark plugin as PostCSS compatible
themeUpdatePlugin.postcss = true

export default themeUpdatePlugin

/**
 * Utility function to update a CSS file with theme colors and fonts
 *
 * This is a high-level wrapper that:
 * 1. Reads the CSS file
 * 2. Processes it with the theme update plugin
 * 3. Writes the updated CSS back to the file
 *
 * @param cssFilePath - Path to the CSS file to update
 * @param color - Color theme to apply
 * @param font - Font to apply
 * @throws Error if file operations or theme updates fail
 */
export async function updateCssWithTheme(cssFilePath: string, color: Color, font: Font): Promise<void> {
  try {
    const fs = await import('fs/promises')

    // Read existing CSS content
    const css = await fs.readFile(cssFilePath, 'utf-8')

    // Process CSS with theme updates
    const result = await postcss([themeUpdatePlugin({ color, font })]).process(css, { from: cssFilePath })

    // Write updated CSS back to file
    await fs.writeFile(cssFilePath, result.css)
  } catch (error) {
    throw new Error(`Error updating CSS file: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}