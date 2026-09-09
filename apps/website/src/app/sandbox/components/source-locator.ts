export interface SourceLocation {
	file: string
	lineNumber: number
}

/**
 * Normalizes file paths from stack traces or debugSource to match componentFiles keys
 */
function matchComponentFile(
	rawPath: string,
	componentFiles: Record<string, string>
): string | null {
	if (!rawPath) return null
	const clean = rawPath.replace(/\\/g, "/").split("?")[0]
	const fileNames = Object.keys(componentFiles)

	// Direct match with known file name (e.g. "hero-section.tsx")
	for (const name of fileNames) {
		if (clean.endsWith(`/${name}`) || clean === name) {
			return name
		}
	}
	return null
}

/**
 * Attempts to extract file and line number directly from React 18/19 Fiber internals
 */
export function getFiberSourceLocation(
	element: HTMLElement,
	componentFiles: Record<string, string>
): SourceLocation | null {
	try {
		// Find React Fiber key on element
		const fiberKey = Object.keys(element).find(
			(k) =>
				k.startsWith("__reactFiber$") ||
				k.startsWith("__reactInternalInstance$")
		)
		if (!fiberKey) return null

		let fiber = (element as any)[fiberKey]
		let depth = 0
		const maxDepth = 40

		while (fiber && depth < maxDepth) {
			depth++

			// Check _debugSource (Babel / SWC react-jsx-source)
			if (fiber._debugSource?.fileName) {
				const matchedFile = matchComponentFile(
					fiber._debugSource.fileName,
					componentFiles
				)
				if (matchedFile && typeof fiber._debugSource.lineNumber === "number") {
					return {
						file: matchedFile,
						lineNumber: fiber._debugSource.lineNumber,
					}
				}
			}

			// Check _debugStack (React 19 development jsxDEV error stack)
			const debugStack = fiber._debugStack || fiber._debugOwner?._debugStack
			if (debugStack) {
				const stackStr =
					typeof debugStack === "string" ? debugStack : debugStack?.stack || ""
				if (stackStr) {
					const lines = stackStr.split("\n")
					for (const line of lines) {
						for (const fileName of Object.keys(componentFiles)) {
							// Match e.g. "hero-section.tsx:28:11" or "/hero-section.tsx:28"
							const regex = new RegExp(
								`[/\\\\]?(${fileName.replace(".", "\\.")}):(\\d+)`
							)
							const match = line.match(regex)
							if (match && match[2]) {
								const lineNum = parseInt(match[2], 10)
								if (!isNaN(lineNum) && lineNum > 0) {
									return { file: fileName, lineNumber: lineNum }
								}
							}
						}
					}
				}
			}

			// Check _debugOwner's _debugSource
			if (fiber._debugOwner?._debugSource?.fileName) {
				const matchedFile = matchComponentFile(
					fiber._debugOwner._debugSource.fileName,
					componentFiles
				)
				if (
					matchedFile &&
					typeof fiber._debugOwner._debugSource.lineNumber === "number"
				) {
					return {
						file: matchedFile,
						lineNumber: fiber._debugOwner._debugSource.lineNumber,
					}
				}
			}

			fiber = fiber._debugOwner || fiber.return
		}
	} catch {
		// Ignore fiber traversal errors in sandboxed frames
	}

	return null
}

/**
 * Intelligent static code locator that parses tag, class tokens, text content,
 * and attributes against componentFiles to accurately identify source file and line.
 */
export function locateSourceElement(
	element: HTMLElement,
	componentFiles: Record<string, string>,
	defaultFile: string
): SourceLocation {
	const tag = element.tagName.toLowerCase()

	// Extract clean text content (without excessive child text)
	let directText = ""
	for (const child of Array.from(element.childNodes)) {
		if (child.nodeType === Node.TEXT_NODE && child.textContent) {
			directText += " " + child.textContent.trim()
		}
	}
	directText = directText.trim()
	if (!directText) {
		directText = (element.textContent || "").trim().slice(0, 80)
	}

	// Filter out inspect-specific classes
	const rawClasses =
		typeof element.className === "string"
			? element.className.split(/\s+/).filter(Boolean)
			: []
	const validClasses = rawClasses.filter(
		(c) => c && !c.includes("sandbox-") && !c.startsWith("rs-") && c.length > 1
	)

	// Attributes of interest
	const attrs: string[] = []
	for (const attrName of [
		"href",
		"src",
		"alt",
		"id",
		"placeholder",
		"aria-label",
	]) {
		const val = element.getAttribute(attrName)
		if (val) {
			attrs.push(val)
		}
	}

	let bestFile = defaultFile || Object.keys(componentFiles)[0] || "page.tsx"
	let bestLine = 1
	let bestScore = -1

	for (const [fileName, content] of Object.entries(componentFiles)) {
		if (!content || typeof content !== "string") continue

		const lines = content.split(/\r?\n/)

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i]
			const lineNum = i + 1
			let score = 0

			// 1. Text Content Matching (High confidence)
			if (directText && directText.length >= 3) {
				if (line.includes(directText)) {
					score += 120
				} else {
					// Word-level matching for wrapped JSX text
					const words = directText
						.split(/\s+/)
						.filter((w) => w.length >= 4 && !/^[0-9]+$/.test(w))
					if (words.length > 0) {
						let matchedWords = 0
						for (const word of words) {
							if (line.includes(word)) {
								matchedWords++
							}
						}
						if (matchedWords > 0) {
							score += (matchedWords / words.length) * 80
						}
					}
				}
			}

			// 2. Tag Matching in JSX: e.g. `<h1`, `<button`, `<p`, `<div`
			const tagLower = tag.toLowerCase()
			if (
				line.toLowerCase().includes(`<${tagLower}`) ||
				line.toLowerCase().includes(`</${tagLower}`)
			) {
				score += 25
			}

			// 3. Class Names Matching
			if (validClasses.length > 0) {
				let classMatches = 0
				for (const cls of validClasses) {
					if (line.includes(cls)) {
						classMatches++
						score += 12
					}
				}
				if (classMatches === validClasses.length && validClasses.length >= 2) {
					score += 35
				}
			}

			// 4. Attribute values matching (href, alt, etc.)
			for (const attr of attrs) {
				if (line.includes(attr)) {
					score += 30
				}
			}

			// Prefer specific component files over generic page.tsx if score is close
			if (score > 0 && fileName !== "page.tsx") {
				score += 2
			}

			if (score > bestScore) {
				bestScore = score
				bestFile = fileName
				bestLine = lineNum
			}
		}
	}

	return {
		file: bestFile,
		lineNumber: bestLine,
	}
}

/**
 * Top-level locator that tries React Fiber first, then falls back to static AST/text locator.
 */
export function resolveElementSourceLocation(
	element: HTMLElement,
	componentFiles: Record<string, string>,
	defaultFile: string
): SourceLocation {
	const fiberSource = getFiberSourceLocation(element, componentFiles)
	if (fiberSource && fiberSource.lineNumber > 0) {
		return fiberSource
	}

	return locateSourceElement(element, componentFiles, defaultFile)
}
