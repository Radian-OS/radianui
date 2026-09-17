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
	fullCode: string
	parentTag?: string
	displayTag?: string
}

export function normalizeIndentation(text: string): string {
	const lines = text.split(/\r?\n/)
	let minIndent = Infinity
	for (const line of lines) {
		if (!line.trim()) continue
		const match = line.match(/^([ \t]*)/)
		if (match) {
			const indentLen = match[1].replace(/\t/g, "  ").length
			if (indentLen < minIndent) {
				minIndent = indentLen
			}
		}
	}
	if (minIndent === Infinity || minIndent === 0) return text
	return lines
		.map((line) => {
			if (!line.trim()) return ""
			let toRemove = minIndent
			let i = 0
			while (i < line.length && toRemove > 0) {
				if (line[i] === "\t") {
					toRemove -= 2
					i++
				} else if (line[i] === " ") {
					toRemove -= 1
					i++
				} else {
					break
				}
			}
			return line.slice(i)
		})
		.join("\n")
}

export function highlightJsx(code: string): string {
	if (!code) return ""

	const escapeHtml = (str: string) =>
		str
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#039;")

	const escaped = escapeHtml(code)

	return (
		escaped
			// JSX Comments: {/* ... */}
			.replace(
				/(\{\/\*[\s\S]*?\*\/\})/g,
				'<span style="color:#64748b;font-style:italic;">$1</span>'
			)
			// Strings: "..." or '...' or `...`
			.replace(
				/(&quot;[\s\S]*?&quot;|&#039;[\s\S]*?&#039;|`[\s\S]*?`)/g,
				'<span style="color:#4ade80;">$1</span>'
			)
			// Tag Opening/Closing: &lt;/?[A-Za-z0-9_.-]+
			.replace(
				/(&lt;\/?[A-Za-z0-9_.-]+)/g,
				'<span style="color:#38bdf8;font-weight:600;">$1</span>'
			)
			// Tag Closing brackets: /&gt; or &gt;
			.replace(
				/(\/?&gt;)/g,
				'<span style="color:#38bdf8;font-weight:600;">$1</span>'
			)
			// Prop names: prop=
			.replace(
				/\b([a-zA-Z0-9_-]+)(?==)/g,
				'<span style="color:#c084fc;">$1</span>'
			)
			// Boolean/standalone props
			.replace(
				/\b(asChild|disabled|required|autoFocus|readOnly|checked|multiple|open)\b/g,
				'<span style="color:#c084fc;font-style:italic;">$1</span>'
			)
	)
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

export function extractCompleteJsxBlock(
	content: string,
	targetLine: number,
	preferTag?: string
): {
	tag: string
	parentTag?: string
	displayTag: string
	className: string
	fullCode: string
	startLine: number
	endLine: number
} | null {
	if (!content) return null
	const lines = content.split(/\r?\n/)
	if (targetLine < 1 || targetLine > lines.length) return null

	// 1. If preferTag provided, search upward for that tag
	let candidateLine = -1
	let candidateTag = ""

	if (preferTag && typeof preferTag === "string") {
		const reg = new RegExp(`^\\s*<(${preferTag})(?:\\s|>|\\/|$)`)
		for (let i = targetLine - 1; i >= Math.max(0, targetLine - 25); i--) {
			const m = lines[i].match(reg)
			if (m) {
				candidateLine = i
				candidateTag = m[1]
				break
			}
		}
	}

	// If not found with preferTag, search upward for the enclosing JSX tag
	if (candidateLine < 0) {
		for (let i = targetLine - 1; i >= Math.max(0, targetLine - 25); i--) {
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
				candidateTag = tagMatch[1]
				break
			}
		}
	}

	if (candidateLine < 0) return null

	// 2. Check if this tag is inside an outer wrapper component with `asChild` (e.g. `<Button ... asChild>`)
	let parentTag: string | undefined
	let parentStartLine = -1

	for (let i = candidateLine - 1; i >= Math.max(0, candidateLine - 12); i--) {
		const l = lines[i].trim()
		if (l.startsWith("</") || l.startsWith("{/*")) break
		const parentMatch = l.match(/<([A-Z][A-Za-z0-9_.-]*)(?:\s|>|\/|$)/)
		if (parentMatch) {
			// Check if the lines between i and candidateLine contain asChild or wrap this element
			const blockAbove = lines.slice(i, candidateLine).join("\n")
			if (
				blockAbove.includes("asChild") ||
				parentMatch[1] === "Button" ||
				parentMatch[1] === "Badge"
			) {
				parentTag = parentMatch[1]
				parentStartLine = i
				break
			}
		}
	}

	// 3. Determine start line and main tag for block extraction
	// If parentTag with asChild exists, extract from parent so both tags are captured
	const blockStartLine = parentStartLine >= 0 ? parentStartLine : candidateLine
	const mainTag = parentTag || candidateTag

	// 4. Find where the tag ends (closing tag or self-closing)
	let endLine = blockStartLine
	let foundClosing = false

	// Check if opening tag is self-closing
	let openTagStr = ""
	for (
		let j = blockStartLine;
		j < Math.min(lines.length, blockStartLine + 15);
		j++
	) {
		openTagStr += lines[j]
		if (openTagStr.includes("/>")) {
			endLine = j
			foundClosing = true
			break
		}
		if (openTagStr.includes(">")) {
			// Opening tag finished, now look for matching </mainTag>
			endLine = j
			break
		}
	}

	if (!foundClosing) {
		// Scan forward for closing tag </mainTag>
		const closeTagPattern = new RegExp(`</${mainTag}>`)
		let depth = 0
		const openTagPattern = new RegExp(`<${mainTag}(?:\\s|>|\\/|$)`)

		for (
			let j = blockStartLine;
			j < Math.min(lines.length, blockStartLine + 35);
			j++
		) {
			const line = lines[j]
			if (openTagPattern.test(line) && !line.includes("/>")) {
				depth++
			}
			if (closeTagPattern.test(line)) {
				depth--
				if (depth <= 0) {
					endLine = j
					foundClosing = true
					break
				}
			}
		}
	}

	// 5. Slice and clean indentation
	const rawBlock = lines.slice(blockStartLine, endLine + 1).join("\n")
	const fullCode = normalizeIndentation(rawBlock)
	const className = extractClassNameFromAttrs(rawBlock)

	const displayTag =
		parentTag && parentTag !== candidateTag
			? `${parentTag} asChild › ${candidateTag}`
			: candidateTag

	return {
		tag: candidateTag,
		parentTag,
		displayTag,
		className,
		fullCode,
		startLine: blockStartLine + 1,
		endLine: endLine + 1,
	}
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
	const block = extractCompleteJsxBlock(
		content,
		targetLine,
		typeof preferTag === "string" ? preferTag : undefined
	)
	if (!block) return null
	return {
		tag: block.tag,
		className: block.className,
		startLine: block.startLine,
		endLine: block.endLine,
	}
}

export interface FiberMatch {
	file: string
	lineNumber: number
	tag: string
	className: string
}

export function getFiberSourceDetails(
	element: HTMLElement,
	componentFiles: Record<string, string>
): {
	file: string
	lineNumber: number
	tag: string
	className: string
	parentTag?: string
	displayTag?: string
} | null {
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
			const matchedCandidates: FiberMatch[] = []

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
				// Check for both parent component (e.g. Button) and child tag (e.g. Link)
				const customComponents = matchedCandidates.filter((c) =>
					/^[A-Z]/.test(c.tag)
				)

				let primary = matchedCandidates[0]
				let parentTag: string | undefined

				if (customComponents.length >= 2) {
					// e.g. [Link, Button] -> primary is Link, parent is Button
					primary = customComponents[0]
					parentTag = customComponents[1].tag
				} else if (customComponents.length === 1) {
					primary = customComponents[0]
					// Check if element itself was a child tag like 'a' or 'span'
					const innerHtmlTag = matchedCandidates.find(
						(c) => c !== primary && /^[a-z]/.test(c.tag)
					)
					if (innerHtmlTag && innerHtmlTag.tag !== primary.tag.toLowerCase()) {
						parentTag = primary.tag
						primary = innerHtmlTag
					}
				}

				const displayTag =
					parentTag && parentTag !== primary.tag
						? `${parentTag} › ${primary.tag}`
						: primary.tag

				return {
					file: primary.file,
					lineNumber: primary.lineNumber,
					tag: primary.tag,
					className: primary.className,
					parentTag,
					displayTag,
				}
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
	let parentTag = fiberDetails?.parentTag
	let displayTag = fiberDetails?.displayTag
	let className = fiberDetails?.className || ""
	let fullCode = ""

	// 2. If fiber didn't resolve location, use static locator
	if (!file || lineNumber <= 0) {
		const staticLoc = locateSourceElement(element, componentFiles, defaultFile)
		file = staticLoc.file
		lineNumber = staticLoc.lineNumber
	}

	// 3. Extract complete author JSX block from source file
	if (file && componentFiles[file]) {
		const jsxBlock = extractCompleteJsxBlock(
			componentFiles[file],
			lineNumber,
			tag || (isInteractive ? "Button" : undefined)
		)
		if (jsxBlock) {
			if (jsxBlock.tag) tag = jsxBlock.tag
			if (jsxBlock.parentTag) parentTag = jsxBlock.parentTag
			if (jsxBlock.displayTag) displayTag = jsxBlock.displayTag
			if (typeof jsxBlock.className === "string" && jsxBlock.className) {
				className = jsxBlock.className
			}
			if (jsxBlock.fullCode) {
				fullCode = jsxBlock.fullCode
			}
			if (jsxBlock.startLine) {
				lineNumber = jsxBlock.startLine
			}
		}
	}

	// Fallback tag if still empty
	if (!tag) {
		tag = element.tagName.toLowerCase()
	}

	if (!displayTag) {
		displayTag = parentTag && parentTag !== tag ? `${parentTag} › ${tag}` : tag
	}

	// Fallback fullCode if extraction didn't find block
	if (!fullCode) {
		const innerText = (element.textContent || "").trim()
		const cleanText =
			innerText.length > 60 ? innerText.slice(0, 57) + "..." : innerText
		const classAttr = className ? ` className="${className}"` : ""
		if (cleanText) {
			fullCode = `<${tag}${classAttr}>\n  ${cleanText}\n</${tag}>`
		} else {
			fullCode = `<${tag}${classAttr} />`
		}
	}

	return {
		file: file || defaultFile,
		lineNumber,
		tag,
		parentTag,
		displayTag,
		className,
		fullCode,
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
