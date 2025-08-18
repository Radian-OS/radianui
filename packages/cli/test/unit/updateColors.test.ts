import postcss from 'postcss'
import { describe, expect, it, vi } from 'vitest'

import { updateDarkThemeColors, updateLightThemeColors } from '@utils/updaters/update-css'

describe('updateLightThemeColors', () => {
  it('should update only --color-primary declarations in @theme static blocks', () => {
    const css = `
      @theme static {
        --color-primary: red;
        --color-primary-light: pink;
        --color-secondary: blue;
      }
    `
    const root = postcss.parse(css)

    updateLightThemeColors(root, {
      primary: '#111111',
      'primary-light': '#222222',
    })

    const result = root.toString()

    expect(result).toContain('--color-primary: #111111')
    expect(result).toContain('--color-primary-light: #222222')
    expect(result).toContain('--color-secondary: blue')
  })

  it('should log a message if a color is missing', () => {
    const css = `
      @theme static {
        --color-primary-dark: brown;
      }
    `
    const root = postcss.parse(css)
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    updateLightThemeColors(root, { primary: '#111111' })

    expect(logSpy).toHaveBeenCalledWith('No color found for: primary-dark')
    logSpy.mockRestore()
  })
})

describe('updateDarkThemeColors', () => {
  it('should update only --color-primary declarations in @theme static blocks', () => {
    const css = `
      .dark {
        --color-primary: red;
        --color-primary-light: pink;
        --color-secondary: blue;
      }
    `
    const root = postcss.parse(css)

    updateDarkThemeColors(root, {
      primary: '#111111',
      'primary-light': '#222222',
    })

    const result = root.toString()

    expect(result).toContain('--color-primary: #111111')
    expect(result).toContain('--color-primary-light: #222222')
    expect(result).toContain('--color-secondary: blue')
  })

  it('should log a message if a color is missing', () => {
    const css = `
      @theme static {
        --color-primary-dark: brown;
      }
    `
    const root = postcss.parse(css)
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    updateLightThemeColors(root, { primary: '#111111' })

    expect(logSpy).toHaveBeenCalledWith('No color found for: primary-dark')
    logSpy.mockRestore()
  })
})
