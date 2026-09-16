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
			const trimmed = line.trim()
			if (
				trimmed.startsWith("//") ||
				trimmed.startsWith("{/*") ||
				trimmed.startsWith("/*")
			) {
				continue
			}
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
				line.toLowerCase().includes(`</${tagLower}`) ||
				(tagLower === "button" && line.includes("<Button")) ||
				(tagLower === "a" && line.includes("<Link"))
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

export interface ResolvedElementDetails {
	file: string
	lineNumber: number
	tag: string
	className: string
}

function extractClassNameFromAttrs(attrs: string): string {
	let className = ""
	const strMatch =
		attrs.match(/className\s*=\s*"([^"]*)"/) ||
		attrs.match(/className\s*=\s*'([^']*)'/)
	if (strMatch) {
		className = strMatch[1]
	} else {
		// Match className={...} including multi-line expressions
		const braceMatch = attrs.match(
			/className\s*=\s*\{([\s\S]*?)\}(?:\s|\n|\/|>|$)/
		)
		if (braceMatch) {
			const raw = braceMatch[1]
			const literals: string[] = []
			const litRegex = /(?:`([^`]*)`|"([^"]*)"|'([^']*)')/g
			let lm: RegExpExecArray | null
			while ((lm = litRegex.exec(raw)) !== null) {
				const val = (lm[1] || lm[2] || lm[3] || "").trim()
				if (val) literals.push(val)
			}
			className = literals.join(" ").trim()
		}
	}
	return className
}

export function parseJsxElementAtLine(
	content: string,
	targetLine: number,
	preferTag?: string | boolean
): {
	tag: string
	className: string
	startLine: number
	endLine: number
} | null {
	if (!content) return null
	const lines = content.split(/\r?\n/)
	if (targetLine < 1 || targetLine > lines.length) return null

	// If preferTag is provided, check upwards up to 15 lines for the enclosing component
	let targetSearchLine = targetLine
	if (preferTag) {
		const tagNameFilter =
			typeof preferTag === "string" ? preferTag : "[A-Z][A-Za-z0-9_.-]*"
		const reg = new RegExp(`^\\s*<(${tagNameFilter})(?:\\s|>|\\/|$)`)
		for (let i = targetLine - 1; i >= Math.max(0, targetLine - 15); i--) {
			const l = lines[i]
			if (reg.test(l)) {
				targetSearchLine = i + 1
				break
			}
		}
	}

	// Search starting from targetSearchLine upwards to find the opening JSX tag
	let candidateLine = -1
	for (
		let i = targetSearchLine - 1;
		i >= Math.max(0, targetSearchLine - 25);
		i--
	) {
		const l = lines[i].trim()
		if (
			l.startsWith("//") ||
			l.startsWith("{/*") ||
			l.startsWith("/*") ||
			l.startsWith("</")
		) {
			continue
		}
		const tagMatch = l.match(/<([A-Za-z0-9_.-]+)(?:\s|>|\/|$)/)
		if (tagMatch) {
			candidateLine = i
			break
		}
	}

	if (candidateLine < 0) return null

	let tagText = ""
	for (
		let j = candidateLine;
		j < Math.min(lines.length, candidateLine + 35);
		j++
	) {
		tagText += (j === candidateLine ? "" : "\n") + lines[j]
		const match = tagText.match(
			/<([A-Za-z0-9_.-]+)((?:[^>"']|"[^"]*"|'[^']*'|\{[^}]*\})*?)(\/?>)/
		)
		if (match) {
			const tagName = match[1]
			const attrs = match[2]
			const className = extractClassNameFromAttrs(attrs)

			return {
				tag: tagName,
				className,
				startLine: candidateLine + 1,
				endLine: j + 1,
			}
		}
	}

	return null
}

export function getFiberSourceDetails(
	element: HTMLElement,
	componentFiles: Record<string, string>
): ResolvedElementDetails | null {
	try {
		const targetElements = [
			element,
			element.closest(
				'button, a, input, select, textarea, [role="button"], [role="tab"], [role="checkbox"], [class*="button"], [class*="badge"], [class*="card"]'
			),
			element.parentElement,
		].filter(Boolean) as HTMLElement[]

		for (const el of targetElements) {
			const fiberKey = Object.keys(el).find(
				(k) =>
					k.startsWith("__reactFiber$") ||
					k.startsWith("__reactInternalInstance$")
			)
			if (!fiberKey) continue

			let fiber = (el as any)[fiberKey]
			let depth = 0
			const maxDepth = 40
			const matchedCandidates: ResolvedElementDetails[] = []

			while (fiber && depth < maxDepth) {
				depth++

				let file: string | null = null
				let lineNumber: number | null = null

				if (fiber._debugSource?.fileName) {
					file = matchComponentFile(fiber._debugSource.fileName, componentFiles)
					if (file && typeof fiber._debugSource.lineNumber === "number") {
						lineNumber = fiber._debugSource.lineNumber
					}
				}

				if (!file && fiber._debugOwner?._debugSource?.fileName) {
					file = matchComponentFile(
						fiber._debugOwner._debugSource.fileName,
						componentFiles
					)
					if (
						file &&
						typeof fiber._debugOwner._debugSource.lineNumber === "number"
					) {
						lineNumber = fiber._debugOwner._debugSource.lineNumber
					}
				}

				if (file && lineNumber && lineNumber > 0) {
					let tag = ""
					if (typeof fiber.type === "string") {
						tag = fiber.type
					} else if (fiber.type && typeof fiber.type === "function") {
						tag = fiber.type.displayName || fiber.type.name || ""
					} else if (fiber.type && typeof fiber.type === "object") {
						tag =
							fiber.type.displayName ||
							fiber.type.render?.displayName ||
							fiber.type.render?.name ||
							""
					}
					if (!tag) {
						tag =
							fiber.elementType?.displayName || fiber.elementType?.name || ""
					}

					const props = fiber.memoizedProps || fiber.pendingProps
					const className =
						props && typeof props.className === "string"
							? props.className.trim()
							: ""

					matchedCandidates.push({
						file,
						lineNumber,
						tag: tag || el.tagName.toLowerCase(),
						className,
					})
				}

				fiber = fiber._debugOwner || fiber.return
			}

			if (matchedCandidates.length > 0) {
				// Prefer a component like Button, Link, Card, Badge if it has a custom className
				const componentWithClass = matchedCandidates.find(
					(c) => /^[A-Z]/.test(c.tag) && c.className.length > 0
				)
				if (componentWithClass) return componentWithClass

				const anyComponent = matchedCandidates.find((c) => /^[A-Z]/.test(c.tag))
				if (anyComponent) return anyComponent

				return matchedCandidates[0]
			}
		}
	} catch {
		// Ignore fiber traversal errors in sandboxed frames
	}

	return null
}

export function resolveElementSourceDetails(
	element: HTMLElement,
	componentFiles: Record<string, string>,
	defaultFile: string
): ResolvedElementDetails {
	const isInteractive = !!element.closest(
		'button, a, input, select, textarea, [role="button"], [role="tab"], [role="checkbox"], [class*="button"], [class*="badge"], [class*="card"]'
	)

	// 1. Try React Fiber inspection first
	const fiberDetails = getFiberSourceDetails(element, componentFiles)

	let file = fiberDetails?.file
	let lineNumber = fiberDetails?.lineNumber || 1
	let tag = fiberDetails?.tag || ""
	let className = fiberDetails?.className || ""

	// 2. If fiber didn't resolve location, use static locator
	if (!file || lineNumber <= 0) {
		const staticLoc = locateSourceElement(element, componentFiles, defaultFile)
		file = staticLoc.file
		lineNumber = staticLoc.lineNumber
	}

	// 3. If we have the source file content, parse JSX around lineNumber to get exact author JSX tag and className
	if (file && componentFiles[file]) {
		const jsxParsed = parseJsxElementAtLine(
			componentFiles[file],
			lineNumber,
			tag || isInteractive
		)
		if (jsxParsed) {
			if (jsxParsed.tag) {
				tag = jsxParsed.tag
			}
			// Prefer exact author-written className from source JSX
			if (typeof jsxParsed.className === "string") {
				className = jsxParsed.className
			}
			if (jsxParsed.startLine) {
				lineNumber = jsxParsed.startLine
			}
		}
	}

	// Fallback tag if still empty
	if (!tag) {
		tag = element.tagName.toLowerCase()
	}

	return {
		file,
		lineNumber,
		tag,
		className,
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
	const details = resolveElementSourceDetails(
		element,
		componentFiles,
		defaultFile
	)
	return {
		file: details.file,
		lineNumber: details.lineNumber,
	}
}
