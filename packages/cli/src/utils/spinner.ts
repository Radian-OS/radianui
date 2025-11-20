import ora, { type Options } from "ora"
import { txt } from "@/utils/colors"

export function spinner(
	text: Options["text"],
	options?: {
		silent?: boolean
		spinner?: Options["spinner"]
	}
) {
	return ora({
		text: txt.light(text),
		isSilent: options?.silent,
		spinner: options?.spinner ?? "clock",
	})
}
