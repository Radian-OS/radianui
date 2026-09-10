# @radianui/flags

Accessible country flag components for React and React frameworks.

## Installation

```bash
pnpm add @radianui/flags
```

## Usage

```tsx
import { Flag } from "@radianui/flags"

export function Example() {
	return (
		<>
			<Flag country="NP" />
			<Flag country="GB" shape="circle" />
			<Flag country="GB" size={32} aria-label="United Kingdom" />
		</>
	)
}
```

`country` is mandatory and accepts supported uppercase ISO 3166-1 alpha-2
codes. The available shapes are `flat` and `circle`. The default shape is
`flat`, and the default size is `24`.

Flags are decorative by default and receive `aria-hidden="true"`. Provide an
`aria-label` when the flag communicates information that is not already
available as text:

```tsx
<Flag country="NP" aria-label="Nepal" />
```

The package also exports `countryCodes`, `CountryCode`, `FlagProps`,
`FlagShape`, and `getCountryName`.

## Source of truth

Every flag has exactly one canonical SVG in `source/flags`. Filenames use
lowercase kebab-case slugs, such as `nepal.svg` and `united-kingdom.svg`.

The React package and the future RadianUI CLI flag registry are both generated
from these files. Generated package or registry output must never be edited as
flag artwork.

`source/manifest.json` owns the flag IDs, display names, files, and country-code
metadata. The React package exposes only supported ISO 3166-1 alpha-2 codes;
regional and organizational metadata remains available for the future CLI.
Run the synchronization script after adding a manifest entry, and add an
explicit override for regional or organizational flags.

```bash
pnpm --filter @radianui/flags sync:manifest
```

## Development

From the repository root:

```bash
pnpm --filter @radianui/flags validate:source
pnpm --filter @radianui/flags check-types
pnpm --filter @radianui/flags test
pnpm --filter @radianui/flags build
```

The validator checks metadata uniqueness, country codes, filename coverage,
SVG view boxes, and unsafe SVG content.

## License

MIT © RadianOS
