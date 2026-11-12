import { create } from "zustand"
import { createJSONStorage, persist, StateStorage } from "zustand/middleware"
import { DEFAULT_CONFIG, type ThemerConfig } from "@/registry/config"

interface ThemerStoreState {
	params: ThemerConfig
	setParams: (updates: Partial<ThemerConfig>) => void
	resetParams: () => void
}

export const useThemerStore = create<ThemerStoreState>()(
	// persist(
	(set) => ({
		params: DEFAULT_CONFIG,
		setParams: (updates) =>
			set((state) => ({
				params: { ...state.params, ...updates },
			})),
		resetParams: () => set({ params: DEFAULT_CONFIG }),
	})
	// {
	// name: "radian-themer-config",
	// storage: createJSONStorage(() => sessionStorage),
	// }
	// )
)
