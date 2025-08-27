import { instagram } from "gradient-string"
import { logger } from "@/utils/logger"

export const displayGradientString = (text: string) => {
	logger.break()
	logger.log(instagram(text))
	logger.break()
}
