import { txt } from '@utils/colors'

export const logger = {
  success: (...args: unknown[]) => {
    console.log(txt.success(args.join(' ')))
  },
  info: (...args: unknown[]) => {
    console.log(txt.info(args.join(' ')))
  },
  warn: (...args: unknown[]) => {
    console.log(txt.warning(args.join(' ')))
  },
  error: (...args: unknown[]) => {
    console.log(txt.error(args.join(' ')))
  },
  log: (...args: unknown[]) => {
    console.log(txt.dark(args.join('')))
  },
  break: () => {
    console.log('')
  },
}
