#!/usr/bin/env node
import packageJson from '../package.json'
import { Command } from 'commander'

import { add } from '@commands/add.js'
import { init } from '@commands/init.js'
import { displayGradientString } from '@utils/gradientString'
import { handleError } from '@utils/handleError'

process.on('uncaughtException', handleError)
process.on('unhandledRejection', handleError)
process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

async function main() {
  const program = new Command()
    .name(packageJson.name)
    .description(packageJson.description)
    .version(packageJson.version, '-v, --version', 'display the version number')

  displayGradientString(`RadianOS v${packageJson.version}`)

  program.addCommand(init)

  program.addCommand(add)

  program.parse()
}

main()
