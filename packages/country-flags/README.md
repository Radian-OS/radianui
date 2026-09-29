# @radianui/flags

Accessible, type-safe SVG country flag components for React and Next.js. The
package supports ISO 3166-1 alpha-2 country codes, flat and circular artwork,
responsive sizing, and standard SVG props without requiring an image loader or
external asset requests.

[Browse all flags](https://radianui.com/resources/flags) ·
[Read the documentation](https://radianui.com/docs/miscellaneous/flags) ·
[View on npm](https://www.npmjs.com/package/@radianui/flags) ·
[GitHub repository](https://github.com/Radian-OS/radianui)

## Features

- Typed ISO 3166-1 alpha-2 country codes
- Inline SVG rendering with no runtime network request
- Flat and circular flag shapes
- Numeric and CSS-compatible string sizes
- Accessible decorative and labelled states
- React 18 and React 19 support
- Tree-shakeable ESM package with TypeScript declarations
- Country names, supported codes, and complete flag metadata

## Installation

```bash
pnpm add @radianui/flags
```

```bash
npm install @radianui/flags
```

```bash
yarn add @radianui/flags
```

```bash
bun add @radianui/flags
```

The package requires React 18.2 or newer and Node.js 18 or newer.

## Quick start

Import `Flag` and pass an uppercase ISO country code. This example renders the
flags of the United States, India, and Japan:

```tsx
import { Flag } from "@radianui/flags"

export function CountryFlags() {
	return (
		<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
			<Flag country="US" aria-label="United States" />
			<Flag country="IN" aria-label="India" />
			<Flag country="JP" aria-label="Japan" />
		</div>
	)
}
```

The `country` prop is required. `shape` defaults to `flat`, and `size` defaults
to `24` pixels.

## Shapes and sizes

Use `shape="circle"` for a consistently cropped circular flag. The `size` prop
sets both the SVG width and height and accepts either a number or a valid CSS
length.

```tsx
import { Flag } from "@radianui/flags"

export function FlagVariants() {
	return (
		<>
			<Flag country="US" size={24} />
			<Flag country="IN" shape="circle" size={32} />
			<Flag country="JP" size="2.5rem" />
		</>
	)
}
```

## Accessibility

Flags are decorative by default. An unlabelled flag receives
`aria-hidden="true"`, which is appropriate when nearby text already identifies
the country:

```tsx
<span>
	<Flag country="IN" /> India
</span>
```

When a flag communicates information by itself, provide an `aria-label`. The
component then renders with `role="img"` and remains available to assistive
technology:

```tsx
<Flag country="JP" aria-label="Japan" />
```

## Type-safe country data

Use `CountryCode` to type application data. `countryCodes` contains every code
supported by the React component, and `getCountryName` returns its display name.

```ts
import {
	type CountryCode,
	countryCodes,
	getCountryName,
} from "@radianui/flags"

const featuredCountries: CountryCode[] = ["US", "IN", "JP"]

const options = featuredCountries.map((code) => ({
	code,
	name: getCountryName(code),
}))

console.log(countryCodes.includes("US")) // true
console.log(options)
```

The exported `CountryCode` union catches unsupported or incorrectly cased codes
at compile time.

## Country selector example

The component works with any select, command menu, or combobox. Keep the flag
decorative when the option text already contains the country name.

```tsx
import { type CountryCode, Flag } from "@radianui/flags"

const countries = [
	{ code: "US", name: "United States" },
	{ code: "IN", name: "India" },
	{ code: "JP", name: "Japan" },
] as const satisfies ReadonlyArray<{ code: CountryCode; name: string }>

export function CountryOptions() {
	return countries.map((country) => (
		<div key={country.code}>
			<Flag country={country.code} size={20} />
			<span>{country.name}</span>
		</div>
	))
}
```

## Styling and SVG props

`FlagProps` extends React's standard SVG props except for values controlled by
the component. You can pass classes, inline styles, event handlers, and data
attributes directly to the rendered SVG.

```tsx
<Flag
	country="US"
	shape="circle"
	size={40}
	className="shrink-0 drop-shadow-sm"
	style={{ opacity: 0.9 }}
	data-testid="selected-country"
	aria-label="United States"
/>
```

Use the `size` prop for width and height so the flag remains square.

## Complete flag metadata

The `metadata` entry point exposes the complete catalog, including regional and
organizational artwork that is not part of the ISO-only React component API.
Each entry contains a stable ID, display name, source filename, country or
regional codes, and optional crop metadata.

```ts
import { type FlagMetadata, flagMetadata } from "@radianui/flags/metadata"

const featuredFlags = flagMetadata.filter((flag) =>
	flag.codes.some((code) => ["US", "IN", "JP"].includes(code))
)

const japan: FlagMetadata | undefined = flagMetadata.find((flag) =>
	flag.codes.includes("JP")
)
```

## Raw SVG files

Canonical SVG files and the manifest are included in the published package and
are exposed under `@radianui/flags/source/*`. For most React applications, use
the `Flag` component. To copy standalone SVG assets into a project, use the
RadianUI CLI:

```bash
npx radianui@latest add-asset flag US IN JP
```

Add every available flag with:

```bash
npx radianui@latest add-asset flag --all
```

## API reference

### `Flag`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `country` | `CountryCode` | Required | Supported uppercase ISO 3166-1 alpha-2 code. |
| `shape` | `"flat" \| "circle"` | `"flat"` | Controls the displayed flag shape. |
| `size` | `number \| string` | `24` | Sets the SVG width and height. |
| `aria-label` | `string` | — | Labels a meaningful standalone flag. |
| `className` | `string` | — | Applies CSS classes to the SVG. |
| `style` | `React.CSSProperties` | — | Merges inline styles onto the SVG. |

### Package exports

| Export | Description |
| --- | --- |
| `Flag` | React flag component. |
| `FlagProps` | Props accepted by `Flag`. |
| `FlagShape` | The `"flat" \| "circle"` shape union. |
| `CountryCode` | Union of supported uppercase ISO country codes. |
| `countryCodes` | Read-only array of supported country codes. |
| `getCountryName` | Returns the display name for a supported code. |
| `flagMetadata` | Complete catalog from `@radianui/flags/metadata`. |
| `FlagMetadata` | Type for a metadata catalog entry. |

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
