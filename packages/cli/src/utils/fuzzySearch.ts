import { RegistryComponent } from "./registry"

export type SearchResult = {
    component: RegistryComponent
    score: number
}

const STOP_WORDS = new Set([
    "a", "an", "the", "in", "on", "at", "to", "for", "of", "with", "by", "and", "or", "is", "it", "that", "this", "as"
])

function levenshtein(a: string, b: string): number {
    if (a === b) return 0
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix: number[][] = [];

    for (let i = 0; i <= a.length; i++) matrix[i] = [i]
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            if (a[i - 1] === b[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1]
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + 1
                )
            }
        }
    }

    return matrix[a.length][b.length]
}

export function fuzzySearch(components: RegistryComponent[], query: string, maxResults: number = 6): SearchResult[] {
    const normalizedQuery = query.toLocaleLowerCase().trim()
    const queryTokens = normalizedQuery.split(/\s+/)

    const results: SearchResult[] = []

    for (const component of components) {
        const name = component.name.toLowerCase()
        let score = 0

        if (name === normalizedQuery) {
            score += 150
        } else if (name.includes(normalizedQuery)) {
            score += 70
        } else if (normalizedQuery.includes(name)) {
            score += 50
        } else {
            const distance = levenshtein(name, normalizedQuery);
            const maxLen = Math.max(name.length, normalizedQuery.length)
            const similarity = 1 - distance / maxLen
            if (similarity >= 0.5) {
                score += similarity * 50
            }
        }

        if (component.description) {
            const desc = component.description.toLowerCase()

            if (normalizedQuery.length > 3 && desc.includes(normalizedQuery)) {
                score += 20
            }

            const tokens = queryTokens.filter((t) => t.length > 1 && !STOP_WORDS.has(t))
            const activeTokens = tokens.length > 0 ? tokens : queryTokens

            const descWords: string[] = desc.match(/[a-z0-9-]+/g) || []
            let matchedWeight = 0

            for (const token of activeTokens) {
                if (descWords.includes(token)) {
                    matchedWeight += 1
                } else if (token.endsWith("s") && descWords.includes(token.slice(0, -1))) {
                    matchedWeight += 0.9
                } else if (token.length >= 3 && descWords.some((w) => w.startsWith(token))) {
                    matchedWeight += 0.7
                }
            }

            if (matchedWeight > 0) {
                score += (matchedWeight / activeTokens.length) * 30
            }
        }

        if (score > 0) {
            results.push({ component, score })
        }
    }

    return results.sort((a, b) => b.score - a.score).slice(0, maxResults)
}