/**
 * Logo registry for BlogExampleCard.
 *
 * To add a new logo:
 *  1. Create a new file in this folder, e.g. `my-company-logo.tsx`, and export a component from it.
 *  2. Import it below and add it to the `logoRegistry` map under the desired key(s).
 *  3. Optionally extend the `LogoKey` union in `blog-example-card.tsx` for better type safety.
 *
 * That's it — no changes needed in BlogExampleCard itself.
 */

import type React from "react"
import { RadianLogo } from "./radian-logo"
import { UntitledUILogo } from "./untitledui-logo"
import { RelumeLogo } from "./relume-logo"
import { ShadcnLogo } from "./shadcn-logo"
import { GoogleLogo, MaterialLogo } from "./google-logo"
import { IBMLogo } from "./ibm-logo"
import { AppleLogo } from "./apple-logo"
import { AtlassianLogo } from "./atlassian-logo"
import { ChatGPTLogo } from "./chatgpt-logo"
import { ClaudeLogo } from "./claude"
import { FigmaLogo } from "./figma"
import { GeminiLogo } from "./gemini"
import { LovableLogo } from "./lovable"
import { PerplexityLogo } from "./perplexity"
import { ReplitLogo } from "./replit"
import { V0Logo } from "./v0"

export const logoRegistry = {
	radian: RadianLogo,
	untitledui: UntitledUILogo,
	relume: RelumeLogo,
	shadcn: ShadcnLogo,
	google: GoogleLogo,
	material: MaterialLogo,
	ibm: IBMLogo,
	apple: AppleLogo,
	atlassian: AtlassianLogo,
	chatgpt: ChatGPTLogo,
	claude: ClaudeLogo,
	figma: FigmaLogo,
	gemini: GeminiLogo,
	lovable: LovableLogo,
	perplexity: PerplexityLogo,
	replit: ReplitLogo,
	v0: V0Logo,
} satisfies Record<string, React.ComponentType>

/** Auto-derived from the registry — adding a new logo here automatically updates this type. */
export type LogoKey = keyof typeof logoRegistry
