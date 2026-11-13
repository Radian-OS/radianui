import { create } from "zustand"
import { DEFAULT_CONFIG, type ThemerConfig } from "@/registry/config"

interface ThemerStoreState {
	params: ThemerConfig
	setParams: (updates: Partial<ThemerConfig>) => void
	resetParams: () => void
}

export const useThemerStore = create<ThemerStoreState>()((set) => ({
	params: DEFAULT_CONFIG,
	setParams: (updates) =>
		set((state) => ({
			params: { ...state.params, ...updates },
		})),
	resetParams: () => set({ params: DEFAULT_CONFIG }),
}))
