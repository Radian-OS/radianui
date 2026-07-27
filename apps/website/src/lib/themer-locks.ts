import { create } from "zustand"
import { persist } from "zustand/middleware"

type ThemerLockKey = "headingFont" | "bodyFont" | "radius"

type ThemerLocksState = {
	locked: Record<ThemerLockKey, boolean>
	toggleLock: (key: ThemerLockKey) => void
}

export const useThemerLocks = create<ThemerLocksState>()(
	persist(
		(set) => ({
			locked: {
				headingFont: false,
				bodyFont: false,
				radius: false,
			},
			toggleLock: (key) =>
				set((state) => ({
					locked: {
						...state.locked,
						[key]: !state.locked[key],
					},
				})),
		}),
		{
			name: "radianui-themer-locks",
		}
	)
)
