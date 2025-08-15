import { logger } from '@utils/logger'

export function handleError(error: unknown) {
  if (typeof error === 'string') {
    logger.break()
    logger.error(error)
    logger.break()
    process.exit(1)
  }

  if (error instanceof Error) {
    logger.break()
    logger.error(error.message)
    logger.break()
    process.exit(1)
  }

  logger.error('Something went wrong. Please try again.')
  process.exit(1)
}
