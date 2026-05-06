import React, { createContext, useState } from "react"

type CodeTreeContextType = {
	selectedFile: SelectedFile | null
	setSelectedFile: React.Dispatch<React.SetStateAction<SelectedFile | null>>
}

const CodeTreeContext = createContext<CodeTreeContextType | null>(null)

export function useCodeTreeContext() {
	const context = React.useContext(CodeTreeContext)
	if (!context) {
		throw new Error(
			"useCodeTreeContext must be used within a CodeTreeContextProvider"
		)
	}
	return context
}

type SelectedFile = {
	path: string
	content: string
}

export default function CodeTreeContextProvider({
	initialSelectedFile,
	children,
}: {
	initialSelectedFile: SelectedFile | null
	children: React.ReactNode
}) {
	const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(
		initialSelectedFile
	)

	return (
		<CodeTreeContext.Provider value={{ selectedFile, setSelectedFile }}>
			{children}
		</CodeTreeContext.Provider>
	)
}
