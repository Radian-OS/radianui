import chalk from 'chalk'

export const txt = {
  error: chalk.redBright,
  success: chalk.greenBright,
  warning: chalk.yellowBright,
  info: chalk.blueBright,
  dark: chalk.blackBright,
  light: chalk.whiteBright,
  deprecated: chalk.gray,
  magenta: chalk.magentaBright,
  cyan: chalk.cyanBright,
  bold: chalk.bold,
  italic: chalk.italic,
  underline: chalk.underline,
  strikethrough: chalk.strikethrough,
}

export const bg = {
  error: chalk.bgRedBright,
  success: chalk.bgGreenBright,
  warning: chalk.bgYellowBright,
  info: chalk.bgBlueBright,
  dark: chalk.bgBlackBright,
  light: chalk.bgWhiteBright,
  magenta: chalk.bgMagentaBright,
  cyan: chalk.bgCyanBright,
}
