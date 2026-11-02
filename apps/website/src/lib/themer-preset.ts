import React from "react"
import { useThemerStore } from "./themer-store"

export function useThemerPreset() {
	const params = useThemerStore((state) => state.params)
	const setParams = useThemerStore((state) => state.setParams)

	return [params, setParams] as const
}
