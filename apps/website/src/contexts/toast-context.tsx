"use client"

import { ReactNode, createContext, useContext, useState } from "react"

type ToastPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"

interface ToastContextType {
	position: ToastPosition
	setPosition: (position: ToastPosition) => void
	isExpandable: boolean
	setIsExpandable: (isExpandable: boolean) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
	const context = useContext(ToastContext)
	if (context === undefined) {
		throw new Error("useToast must be used within a ToastProvider")
	}
	return context
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
	const [position, setPosition] = useState<ToastPosition>("bottom-right")
	const [isExpandable, setIsExpandable] = useState(false)

	return <ToastContext.Provider value={{ position, setPosition, isExpandable, setIsExpandable }}>{children}</ToastContext.Provider>
}
