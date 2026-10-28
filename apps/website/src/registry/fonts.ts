export type FontCategory =
	| "sans-serif"
	| "serif"
	| "display"
	| "monospace"
	| "handwriting"

export type FontType = FontCategory | "sans"

export interface FontItem {
	readonly value: string
	readonly name: string
	readonly type: "registry:font"
	readonly category: FontCategory
	readonly font: {
		readonly family: string
		readonly provider: string
		readonly subsets: readonly string[]
		readonly import: string
		readonly googleFontsUrl: string
	}
}

export type Font = FontItem

export type FontValue = string

export const FONTS: readonly FontItem[] = [
	{
		value: "inter",
		name: "Inter",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Inter', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Inter",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
		},
	},
	{
		value: "roboto",
		name: "Roboto",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Roboto', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Roboto",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Roboto:wght@100..900&display=swap",
		},
	},
	{
		value: "open-sans",
		name: "Open Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Open Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Open_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Open+Sans:wght@300..800&display=swap",
		},
	},
	{
		value: "manrope",
		name: "Manrope",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Manrope', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Manrope",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap",
		},
	},
	{
		value: "geist",
		name: "Geist",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Geist', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Geist",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap",
		},
	},
	{
		value: "rubik",
		name: "Rubik",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Rubik', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Rubik",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rubik:wght@300..900&display=swap",
		},
	},
	{
		value: "dm-sans",
		name: "DM Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'DM Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "DM_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=DM+Sans:wght@100..900&display=swap",
		},
	},
	{
		value: "lato",
		name: "Lato",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Lato', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Lato",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap",
		},
	},
	{
		value: "raleway",
		name: "Raleway",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Raleway', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Raleway",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Raleway:wght@100..900&display=swap",
		},
	},
	{
		value: "work-sans",
		name: "Work Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Work Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Work_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Work+Sans:wght@100..900&display=swap",
		},
	},
	{
		value: "ibm-plex-sans",
		name: "IBM Plex Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'IBM Plex Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "IBM_Plex_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@100..700&display=swap",
		},
	},
	{
		value: "figtree",
		name: "Figtree",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Figtree', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Figtree",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Figtree:wght@300..900&display=swap",
		},
	},
	{
		value: "abeezee",
		name: "ABeeZee",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'ABeeZee', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "ABeeZee",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=ABeeZee&display=swap",
		},
	},
	{
		value: "ar-one-sans",
		name: "AR One Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'AR One Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "AR_One_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=AR+One+Sans:wght@400..700&display=swap",
		},
	},
	{
		value: "architects-daughter",
		name: "Architects Daughter",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Architects Daughter', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Architects_Daughter",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap",
		},
	},
	{
		value: "abel",
		name: "Abel",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Abel', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Abel",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Abel&display=swap",
		},
	},
	{
		value: "aclonica",
		name: "Aclonica",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Aclonica', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Aclonica",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Aclonica&display=swap",
		},
	},
	{
		value: "acme",
		name: "Acme",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Acme', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Acme",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Acme&display=swap",
		},
	},
	{
		value: "actor",
		name: "Actor",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Actor', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Actor",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Actor&display=swap",
		},
	},
	{
		value: "advent-pro",
		name: "Advent Pro",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Advent Pro', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Advent_Pro",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Advent+Pro:wght@100..900&display=swap",
		},
	},
	{
		value: "afacad",
		name: "Afacad",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Afacad', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Afacad",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Afacad:wght@400..700&display=swap",
		},
	},
	{
		value: "afacad-flux",
		name: "Afacad Flux",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Afacad Flux', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Afacad_Flux",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Afacad+Flux:wght@100..900&display=swap",
		},
	},
	{
		value: "agdasima",
		name: "Agdasima",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Agdasima', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Agdasima",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Agdasima:wght@400;700&display=swap",
		},
	},
	{
		value: "akatab",
		name: "Akatab",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Akatab', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Akatab",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Akatab:wght@400..900&display=swap",
		},
	},
	{
		value: "akshar",
		name: "Akshar",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Akshar', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Akshar",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Akshar:wght@300..700&display=swap",
		},
	},
	{
		value: "alan-sans",
		name: "Alan Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Alan Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Alan_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Alan+Sans:wght@300..900&display=swap",
		},
	},
	{
		value: "alata",
		name: "Alata",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Alata', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Alata",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Alata&display=swap",
		},
	},
	{
		value: "alatsi",
		name: "Alatsi",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Alatsi', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Alatsi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Alatsi&display=swap",
		},
	},
	{
		value: "albert-sans",
		name: "Albert Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Albert Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Albert_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Albert+Sans:wght@100..900&display=swap",
		},
	},
	{
		value: "aldrich",
		name: "Aldrich",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Aldrich', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Aldrich",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Aldrich&display=swap",
		},
	},
	{
		value: "alef",
		name: "Alef",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Alef', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Alef",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Alef:wght@400;700&display=swap",
		},
	},
	{
		value: "alegreya-sans",
		name: "Alegreya Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Alegreya Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Alegreya_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@100;300;400;500;700;800;900&display=swap",
		},
	},
	{
		value: "alegreya-sans-sc",
		name: "Alegreya Sans SC",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Alegreya Sans SC', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Alegreya_Sans_SC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:wght@100;300;400;500;700;800;900&display=swap",
		},
	},
	{
		value: "alexandria",
		name: "Alexandria",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Alexandria', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Alexandria",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Alexandria:wght@100..900&display=swap",
		},
	},
	{
		value: "allerta",
		name: "Allerta",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Allerta', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Allerta",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Allerta&display=swap",
		},
	},
	{
		value: "allerta-stencil",
		name: "Allerta Stencil",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Allerta Stencil', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Allerta_Stencil",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Allerta+Stencil&display=swap",
		},
	},
	{
		value: "almarai",
		name: "Almarai",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Almarai', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Almarai",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap",
		},
	},
	{
		value: "alumni-sans",
		name: "Alumni Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Alumni Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Alumni_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Alumni+Sans:wght@100..900&display=swap",
		},
	},
	{
		value: "alumni-sans-collegiate-one",
		name: "Alumni Sans Collegiate One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Alumni Sans Collegiate One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Alumni_Sans_Collegiate_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Alumni+Sans+Collegiate+One&display=swap",
		},
	},
	{
		value: "alumni-sans-pinstripe",
		name: "Alumni Sans Pinstripe",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Alumni Sans Pinstripe', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Alumni_Sans_Pinstripe",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Alumni+Sans+Pinstripe&display=swap",
		},
	},
	{
		value: "alumni-sans-sc",
		name: "Alumni Sans SC",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Alumni Sans SC', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Alumni_Sans_SC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Alumni+Sans+SC:wght@100..900&display=swap",
		},
	},
	{
		value: "amaranth",
		name: "Amaranth",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Amaranth', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Amaranth",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Amaranth:wght@400;700&display=swap",
		},
	},
	{
		value: "amiko",
		name: "Amiko",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Amiko', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Amiko",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Amiko:wght@400;600;700&display=swap",
		},
	},
	{
		value: "anaheim",
		name: "Anaheim",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Anaheim', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Anaheim",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Anaheim:wght@400..800&display=swap",
		},
	},
	{
		value: "ancizar-sans",
		name: "Ancizar Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Ancizar Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Ancizar_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ancizar+Sans:wght@100..900&display=swap",
		},
	},
	{
		value: "andika",
		name: "Andika",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Andika', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Andika",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Andika:wght@400;700&display=swap",
		},
	},
	{
		value: "anek-bangla",
		name: "Anek Bangla",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Anek Bangla', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Anek_Bangla",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Anek+Bangla:wght@100..800&display=swap",
		},
	},
	{
		value: "anek-devanagari",
		name: "Anek Devanagari",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Anek Devanagari', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Anek_Devanagari",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Anek+Devanagari:wght@100..800&display=swap",
		},
	},
	{
		value: "anek-gujarati",
		name: "Anek Gujarati",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Anek Gujarati', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Anek_Gujarati",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Anek+Gujarati:wght@100..800&display=swap",
		},
	},
	{
		value: "anek-gurmukhi",
		name: "Anek Gurmukhi",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Anek Gurmukhi', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Anek_Gurmukhi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Anek+Gurmukhi:wght@100..800&display=swap",
		},
	},
	{
		value: "anek-kannada",
		name: "Anek Kannada",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Anek Kannada', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Anek_Kannada",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Anek+Kannada:wght@100..800&display=swap",
		},
	},
	{
		value: "anek-latin",
		name: "Anek Latin",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Anek Latin', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Anek_Latin",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Anek+Latin:wght@100..800&display=swap",
		},
	},
	{
		value: "anek-malayalam",
		name: "Anek Malayalam",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Anek Malayalam', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Anek_Malayalam",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Anek+Malayalam:wght@100..800&display=swap",
		},
	},
	{
		value: "anek-odia",
		name: "Anek Odia",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Anek Odia', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Anek_Odia",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Anek+Odia:wght@100..800&display=swap",
		},
	},
	{
		value: "anek-tamil",
		name: "Anek Tamil",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Anek Tamil', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Anek_Tamil",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Anek+Tamil:wght@100..800&display=swap",
		},
	},
	{
		value: "anek-telugu",
		name: "Anek Telugu",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Anek Telugu', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Anek_Telugu",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Anek+Telugu:wght@100..800&display=swap",
		},
	},
	{
		value: "anta",
		name: "Anta",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Anta', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Anta",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Anta&display=swap",
		},
	},
	{
		value: "antic",
		name: "Antic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Antic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Antic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Antic&display=swap",
		},
	},
	{
		value: "anton",
		name: "Anton",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Anton', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Anton",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Anton&display=swap",
		},
	},
	{
		value: "anton-sc",
		name: "Anton SC",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Anton SC', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Anton_SC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Anton+SC&display=swap",
		},
	},
	{
		value: "antonio",
		name: "Antonio",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Antonio', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Antonio",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Antonio:wght@100..700&display=swap",
		},
	},
	{
		value: "anuphan",
		name: "Anuphan",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Anuphan', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Anuphan",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Anuphan:wght@100..700&display=swap",
		},
	},
	{
		value: "archivo",
		name: "Archivo",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Archivo', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Archivo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Archivo:wght@100..900&display=swap",
		},
	},
	{
		value: "archivo-black",
		name: "Archivo Black",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Archivo Black', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Archivo_Black",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap",
		},
	},
	{
		value: "archivo-narrow",
		name: "Archivo Narrow",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Archivo Narrow', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Archivo_Narrow",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@400..700&display=swap",
		},
	},
	{
		value: "arimo",
		name: "Arimo",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Arimo', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Arimo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Arimo:wght@400..700&display=swap",
		},
	},
	{
		value: "armata",
		name: "Armata",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Armata', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Armata",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Armata&display=swap",
		},
	},
	{
		value: "arsenal",
		name: "Arsenal",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Arsenal', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Arsenal",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Arsenal:wght@400;700&display=swap",
		},
	},
	{
		value: "arsenal-sc",
		name: "Arsenal SC",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Arsenal SC', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Arsenal_SC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Arsenal+SC:wght@400;700&display=swap",
		},
	},
	{
		value: "arya",
		name: "Arya",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Arya', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Arya",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Arya:wght@400;700&display=swap",
		},
	},
	{
		value: "asap",
		name: "Asap",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Asap', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Asap",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Asap:wght@100..900&display=swap",
		},
	},
	{
		value: "asap-condensed",
		name: "Asap Condensed",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Asap Condensed', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Asap_Condensed",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Asap+Condensed:wght@200..900&display=swap",
		},
	},
	{
		value: "asimovian",
		name: "Asimovian",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Asimovian', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Asimovian",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Asimovian&display=swap",
		},
	},
	{
		value: "assistant",
		name: "Assistant",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Assistant', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Assistant",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Assistant:wght@200..800&display=swap",
		},
	},
	{
		value: "asta-sans",
		name: "Asta Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Asta Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Asta_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Asta+Sans:wght@300..800&display=swap",
		},
	},
	{
		value: "athiti",
		name: "Athiti",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Athiti', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Athiti",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Athiti:wght@200..700&display=swap",
		},
	},
	{
		value: "atkinson-hyperlegible",
		name: "Atkinson Hyperlegible",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Atkinson Hyperlegible', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Atkinson_Hyperlegible",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap",
		},
	},
	{
		value: "atkinson-hyperlegible-mono",
		name: "Atkinson Hyperlegible Mono",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Atkinson Hyperlegible Mono', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Atkinson_Hyperlegible_Mono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Mono:wght@200..800&display=swap",
		},
	},
	{
		value: "atkinson-hyperlegible-next",
		name: "Atkinson Hyperlegible Next",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Atkinson Hyperlegible Next', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Atkinson_Hyperlegible_Next",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:wght@200..800&display=swap",
		},
	},
	{
		value: "average-sans",
		name: "Average Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Average Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Average_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Average+Sans&display=swap",
		},
	},
	{
		value: "b612",
		name: "B612",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'B612', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "B612",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=B612:wght@400;700&display=swap",
		},
	},
	{
		value: "bbh-sans-bartle",
		name: "BBH Sans Bartle",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'BBH Sans Bartle', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "BBH_Sans_Bartle",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=BBH+Sans+Bartle&display=swap",
		},
	},
	{
		value: "bbh-sans-bogle",
		name: "BBH Sans Bogle",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'BBH Sans Bogle', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "BBH_Sans_Bogle",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=BBH+Sans+Bogle&display=swap",
		},
	},
	{
		value: "bbh-sans-hegarty",
		name: "BBH Sans Hegarty",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'BBH Sans Hegarty', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "BBH_Sans_Hegarty",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=BBH+Sans+Hegarty&display=swap",
		},
	},
	{
		value: "biz-udgothic",
		name: "BIZ UDGothic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'BIZ UDGothic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "BIZ_UDGothic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=BIZ+UDGothic:wght@400;700&display=swap",
		},
	},
	{
		value: "biz-udpgothic",
		name: "BIZ UDPGothic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'BIZ UDPGothic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "BIZ_UDPGothic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=BIZ+UDPGothic:wght@400;700&display=swap",
		},
	},
	{
		value: "bai-jamjuree",
		name: "Bai Jamjuree",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Bai Jamjuree', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Bai_Jamjuree",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@200..700&display=swap",
		},
	},
	{
		value: "barlow",
		name: "Barlow",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Barlow', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Barlow",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Barlow:wght@100..900&display=swap",
		},
	},
	{
		value: "barlow-condensed",
		name: "Barlow Condensed",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Barlow Condensed', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Barlow_Condensed",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@100..900&display=swap",
		},
	},
	{
		value: "barlow-semi-condensed",
		name: "Barlow Semi Condensed",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Barlow Semi Condensed', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Barlow_Semi_Condensed",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@100..900&display=swap",
		},
	},
	{
		value: "basic",
		name: "Basic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Basic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Basic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Basic&display=swap",
		},
	},
	{
		value: "bayon",
		name: "Bayon",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Bayon', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Bayon",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bayon&display=swap",
		},
	},
	{
		value: "be-vietnam-pro",
		name: "Be Vietnam Pro",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Be Vietnam Pro', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Be_Vietnam_Pro",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@100..900&display=swap",
		},
	},
	{
		value: "bebas-neue",
		name: "Bebas Neue",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Bebas Neue', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Bebas_Neue",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap",
		},
	},
	{
		value: "beiruti",
		name: "Beiruti",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Beiruti', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Beiruti",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Beiruti:wght@200..900&display=swap",
		},
	},
	{
		value: "belanosima",
		name: "Belanosima",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Belanosima', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Belanosima",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Belanosima:wght@400;600;700&display=swap",
		},
	},
	{
		value: "belleza",
		name: "Belleza",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Belleza', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Belleza",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Belleza&display=swap",
		},
	},
	{
		value: "benchnine",
		name: "BenchNine",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'BenchNine', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "BenchNine",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=BenchNine:wght@300;400;700&display=swap",
		},
	},
	{
		value: "biryani",
		name: "Biryani",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Biryani', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Biryani",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Biryani:wght@200;300;400;600;700;800;900&display=swap",
		},
	},
	{
		value: "black-han-sans",
		name: "Black Han Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Black Han Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Black_Han_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap",
		},
	},
	{
		value: "blinker",
		name: "Blinker",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Blinker', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Blinker",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Blinker:wght@100;200;300;400;600;700;800;900&display=swap",
		},
	},
	{
		value: "braah-one",
		name: "Braah One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Braah One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Braah_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Braah+One&display=swap",
		},
	},
	{
		value: "bricolage-grotesque",
		name: "Bricolage Grotesque",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Bricolage Grotesque', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Bricolage_Grotesque",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@200..800&display=swap",
		},
	},
	{
		value: "bubbler-one",
		name: "Bubbler One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Bubbler One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Bubbler_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bubbler+One&display=swap",
		},
	},
	{
		value: "bytesized",
		name: "Bytesized",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Bytesized', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Bytesized",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bytesized&display=swap",
		},
	},
	{
		value: "cabin",
		name: "Cabin",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Cabin', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Cabin",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cabin:wght@400..700&display=swap",
		},
	},
	{
		value: "cabin-condensed",
		name: "Cabin Condensed",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Cabin Condensed', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Cabin_Condensed",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cabin+Condensed:wght@400..700&display=swap",
		},
	},
	{
		value: "cagliostro",
		name: "Cagliostro",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Cagliostro', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Cagliostro",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cagliostro&display=swap",
		},
	},
	{
		value: "cairo",
		name: "Cairo",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Cairo', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Cairo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cairo:wght@200..900&display=swap",
		},
	},
	{
		value: "cairo-play",
		name: "Cairo Play",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Cairo Play', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Cairo_Play",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cairo+Play:wght@200..900&display=swap",
		},
	},
	{
		value: "cal-sans",
		name: "Cal Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Cal Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Cal_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cal+Sans&display=swap",
		},
	},
	{
		value: "cambay",
		name: "Cambay",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Cambay', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Cambay",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cambay:wght@400;700&display=swap",
		},
	},
	{
		value: "candal",
		name: "Candal",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Candal', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Candal",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Candal&display=swap",
		},
	},
	{
		value: "cantarell",
		name: "Cantarell",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Cantarell', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Cantarell",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cantarell:wght@400;700&display=swap",
		},
	},
	{
		value: "cantora-one",
		name: "Cantora One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Cantora One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Cantora_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cantora+One&display=swap",
		},
	},
	{
		value: "capriola",
		name: "Capriola",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Capriola', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Capriola",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Capriola&display=swap",
		},
	},
	{
		value: "carlito",
		name: "Carlito",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Carlito', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Carlito",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Carlito:wght@400;700&display=swap",
		},
	},
	{
		value: "carme",
		name: "Carme",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Carme', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Carme",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Carme&display=swap",
		},
	},
	{
		value: "carrois-gothic",
		name: "Carrois Gothic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Carrois Gothic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Carrois_Gothic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Carrois+Gothic&display=swap",
		},
	},
	{
		value: "carrois-gothic-sc",
		name: "Carrois Gothic SC",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Carrois Gothic SC', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Carrois_Gothic_SC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Carrois+Gothic+SC&display=swap",
		},
	},
	{
		value: "cascadia-code",
		name: "Cascadia Code",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Cascadia Code', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Cascadia_Code",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cascadia+Code:wght@200..700&display=swap",
		},
	},
	{
		value: "cascadia-mono",
		name: "Cascadia Mono",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Cascadia Mono', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Cascadia_Mono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cascadia+Mono:wght@200..700&display=swap",
		},
	},
	{
		value: "catamaran",
		name: "Catamaran",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Catamaran', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Catamaran",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Catamaran:wght@100..900&display=swap",
		},
	},
	{
		value: "chakra-petch",
		name: "Chakra Petch",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Chakra Petch', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Chakra_Petch",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300..700&display=swap",
		},
	},
	{
		value: "changa",
		name: "Changa",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Changa', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Changa",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Changa:wght@200..800&display=swap",
		},
	},
	{
		value: "chathura",
		name: "Chathura",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Chathura', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Chathura",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Chathura:wght@100;300;400;700;800&display=swap",
		},
	},
	{
		value: "chau-philomene-one",
		name: "Chau Philomene One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Chau Philomene One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Chau_Philomene_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Chau+Philomene+One&display=swap",
		},
	},
	{
		value: "chiron-goround-tc",
		name: "Chiron GoRound TC",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Chiron GoRound TC', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Chiron_GoRound_TC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Chiron+GoRound+TC:wght@200..900&display=swap",
		},
	},
	{
		value: "chiron-hei-hk",
		name: "Chiron Hei HK",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Chiron Hei HK', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Chiron_Hei_HK",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Chiron+Hei+HK:wght@200..900&display=swap",
		},
	},
	{
		value: "chivo",
		name: "Chivo",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Chivo', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Chivo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Chivo:wght@100..900&display=swap",
		},
	},
	{
		value: "chocolate-classical-sans",
		name: "Chocolate Classical Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Chocolate Classical Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Chocolate_Classical_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Chocolate+Classical+Sans&display=swap",
		},
	},
	{
		value: "comme",
		name: "Comme",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Comme', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Comme",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Comme:wght@100..900&display=swap",
		},
	},
	{
		value: "commissioner",
		name: "Commissioner",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Commissioner', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Commissioner",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Commissioner:wght@100..900&display=swap",
		},
	},
	{
		value: "convergence",
		name: "Convergence",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Convergence', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Convergence",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Convergence&display=swap",
		},
	},
	{
		value: "cossette-texte",
		name: "Cossette Texte",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Cossette Texte', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Cossette_Texte",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cossette+Texte:wght@400;700&display=swap",
		},
	},
	{
		value: "cossette-titre",
		name: "Cossette Titre",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Cossette Titre', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Cossette_Titre",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cossette+Titre:wght@400;700&display=swap",
		},
	},
	{
		value: "cuprum",
		name: "Cuprum",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Cuprum', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Cuprum",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cuprum:wght@400..700&display=swap",
		},
	},
	{
		value: "darker-grotesque",
		name: "Darker Grotesque",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Darker Grotesque', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Darker_Grotesque",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@300..900&display=swap",
		},
	},
	{
		value: "days-one",
		name: "Days One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Days One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Days_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Days+One&display=swap",
		},
	},
	{
		value: "denk-one",
		name: "Denk One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Denk One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Denk_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Denk+One&display=swap",
		},
	},
	{
		value: "dhurjati",
		name: "Dhurjati",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Dhurjati', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Dhurjati",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Dhurjati&display=swap",
		},
	},
	{
		value: "didact-gothic",
		name: "Didact Gothic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Didact Gothic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Didact_Gothic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap",
		},
	},
	{
		value: "do-hyeon",
		name: "Do Hyeon",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Do Hyeon', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Do_Hyeon",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap",
		},
	},
	{
		value: "dongle",
		name: "Dongle",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Dongle', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Dongle",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Dongle:wght@300;400;700&display=swap",
		},
	},
	{
		value: "doppio-one",
		name: "Doppio One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Doppio One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Doppio_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Doppio+One&display=swap",
		},
	},
	{
		value: "dorsa",
		name: "Dorsa",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Dorsa', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Dorsa",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Dorsa&display=swap",
		},
	},
	{
		value: "dosis",
		name: "Dosis",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Dosis', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Dosis",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&display=swap",
		},
	},
	{
		value: "dotgothic16",
		name: "DotGothic16",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'DotGothic16', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "DotGothic16",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=DotGothic16&display=swap",
		},
	},
	{
		value: "doto",
		name: "Doto",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Doto', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Doto",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Doto:wght@100..900&display=swap",
		},
	},
	{
		value: "duru-sans",
		name: "Duru Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Duru Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Duru_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Duru+Sans&display=swap",
		},
	},
	{
		value: "economica",
		name: "Economica",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Economica', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Economica",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Economica:wght@400;700&display=swap",
		},
	},
	{
		value: "el-messiri",
		name: "El Messiri",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'El Messiri', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "El_Messiri",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=El+Messiri:wght@400..700&display=swap",
		},
	},
	{
		value: "electrolize",
		name: "Electrolize",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Electrolize', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Electrolize",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Electrolize&display=swap",
		},
	},
	{
		value: "elms-sans",
		name: "Elms Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Elms Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Elms_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Elms+Sans:wght@100..900&display=swap",
		},
	},
	{
		value: "encode-sans",
		name: "Encode Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Encode Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Encode_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Encode+Sans:wght@100..900&display=swap",
		},
	},
	{
		value: "encode-sans-condensed",
		name: "Encode Sans Condensed",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Encode Sans Condensed', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Encode_Sans_Condensed",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Encode+Sans+Condensed:wght@100..900&display=swap",
		},
	},
	{
		value: "encode-sans-expanded",
		name: "Encode Sans Expanded",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Encode Sans Expanded', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Encode_Sans_Expanded",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Encode+Sans+Expanded:wght@100..900&display=swap",
		},
	},
	{
		value: "encode-sans-sc",
		name: "Encode Sans SC",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Encode Sans SC', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Encode_Sans_SC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Encode+Sans+SC:wght@100..900&display=swap",
		},
	},
	{
		value: "encode-sans-semi-condensed",
		name: "Encode Sans Semi Condensed",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Encode Sans Semi Condensed', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Encode_Sans_Semi_Condensed",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Encode+Sans+Semi+Condensed:wght@100..900&display=swap",
		},
	},
	{
		value: "encode-sans-semi-expanded",
		name: "Encode Sans Semi Expanded",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Encode Sans Semi Expanded', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Encode_Sans_Semi_Expanded",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Encode+Sans+Semi+Expanded:wght@100..900&display=swap",
		},
	},
	{
		value: "englebert",
		name: "Englebert",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Englebert', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Englebert",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Englebert&display=swap",
		},
	},
	{
		value: "epilogue",
		name: "Epilogue",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Epilogue', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Epilogue",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Epilogue:wght@100..900&display=swap",
		},
	},
	{
		value: "epunda-sans",
		name: "Epunda Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Epunda Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Epunda_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Epunda+Sans:wght@300..900&display=swap",
		},
	},
	{
		value: "exo",
		name: "Exo",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Exo', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Exo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Exo:wght@100..900&display=swap",
		},
	},
	{
		value: "exo-2",
		name: "Exo 2",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Exo 2', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Exo_2",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Exo+2:wght@100..900&display=swap",
		},
	},
	{
		value: "faculty-glyphic",
		name: "Faculty Glyphic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Faculty Glyphic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Faculty_Glyphic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Faculty+Glyphic&display=swap",
		},
	},
	{
		value: "fahkwang",
		name: "Fahkwang",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Fahkwang', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Fahkwang",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Fahkwang:wght@200..700&display=swap",
		},
	},
	{
		value: "familjen-grotesk",
		name: "Familjen Grotesk",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Familjen Grotesk', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Familjen_Grotesk",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400..700&display=swap",
		},
	},
	{
		value: "farro",
		name: "Farro",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Farro', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Farro",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Farro:wght@300;400;500;700&display=swap",
		},
	},
	{
		value: "federo",
		name: "Federo",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Federo', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Federo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Federo&display=swap",
		},
	},
	{
		value: "finlandica",
		name: "Finlandica",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Finlandica', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Finlandica",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Finlandica:wght@400..700&display=swap",
		},
	},
	{
		value: "fira-sans",
		name: "Fira Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Fira Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Fira_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Fira+Sans:wght@100..900&display=swap",
		},
	},
	{
		value: "fira-sans-condensed",
		name: "Fira Sans Condensed",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Fira Sans Condensed', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Fira_Sans_Condensed",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@100..900&display=swap",
		},
	},
	{
		value: "fira-sans-extra-condensed",
		name: "Fira Sans Extra Condensed",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Fira Sans Extra Condensed', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Fira_Sans_Extra_Condensed",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Fira+Sans+Extra+Condensed:wght@100..900&display=swap",
		},
	},
	{
		value: "fjalla-one",
		name: "Fjalla One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Fjalla One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Fjalla_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Fjalla+One&display=swap",
		},
	},
	{
		value: "francois-one",
		name: "Francois One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Francois One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Francois_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Francois+One&display=swap",
		},
	},
	{
		value: "fredoka",
		name: "Fredoka",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Fredoka', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Fredoka",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap",
		},
	},
	{
		value: "fresca",
		name: "Fresca",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Fresca', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Fresca",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Fresca&display=swap",
		},
	},
	{
		value: "funnel-sans",
		name: "Funnel Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Funnel Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Funnel_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Funnel+Sans:wght@300..800&display=swap",
		},
	},
	{
		value: "fustat",
		name: "Fustat",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Fustat', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Fustat",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Fustat:wght@200..800&display=swap",
		},
	},
	{
		value: "gfs-neohellenic",
		name: "GFS Neohellenic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'GFS Neohellenic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "GFS_Neohellenic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=GFS+Neohellenic:wght@400;700&display=swap",
		},
	},
	{
		value: "gafata",
		name: "Gafata",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Gafata', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Gafata",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gafata&display=swap",
		},
	},
	{
		value: "galdeano",
		name: "Galdeano",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Galdeano', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Galdeano",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Galdeano&display=swap",
		},
	},
	{
		value: "gantari",
		name: "Gantari",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Gantari', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Gantari",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gantari:wght@100..900&display=swap",
		},
	},
	{
		value: "gasoek-one",
		name: "Gasoek One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Gasoek One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Gasoek_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gasoek+One&display=swap",
		},
	},
	{
		value: "gayathri",
		name: "Gayathri",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Gayathri', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Gayathri",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gayathri:wght@100;400;700&display=swap",
		},
	},
	{
		value: "gemunu-libre",
		name: "Gemunu Libre",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Gemunu Libre', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Gemunu_Libre",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gemunu+Libre:wght@200..800&display=swap",
		},
	},
	{
		value: "genos",
		name: "Genos",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Genos', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Genos",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Genos:wght@100..900&display=swap",
		},
	},
	{
		value: "geo",
		name: "Geo",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Geo', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Geo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Geo&display=swap",
		},
	},
	{
		value: "geologica",
		name: "Geologica",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Geologica', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Geologica",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Geologica:wght@100..900&display=swap",
		},
	},
	{
		value: "georama",
		name: "Georama",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Georama', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Georama",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Georama:wght@100..900&display=swap",
		},
	},
	{
		value: "gidole",
		name: "Gidole",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Gidole', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Gidole",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gidole&display=swap",
		},
	},
	{
		value: "gidugu",
		name: "Gidugu",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Gidugu', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Gidugu",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gidugu&display=swap",
		},
	},
	{
		value: "glory",
		name: "Glory",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Glory', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Glory",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Glory:wght@100..800&display=swap",
		},
	},
	{
		value: "golos-text",
		name: "Golos Text",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Golos Text', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Golos_Text",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Golos+Text:wght@400..900&display=swap",
		},
	},
	{
		value: "gothic-a1",
		name: "Gothic A1",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Gothic A1', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Gothic_A1",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gothic+A1:wght@100..900&display=swap",
		},
	},
	{
		value: "gotu",
		name: "Gotu",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Gotu', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Gotu",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gotu&display=swap",
		},
	},
	{
		value: "gowun-dodum",
		name: "Gowun Dodum",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Gowun Dodum', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Gowun_Dodum",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gowun+Dodum&display=swap",
		},
	},
	{
		value: "gruppo",
		name: "Gruppo",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Gruppo', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Gruppo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gruppo&display=swap",
		},
	},
	{
		value: "gudea",
		name: "Gudea",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Gudea', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Gudea",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gudea:wght@400;700&display=swap",
		},
	},
	{
		value: "gurajada",
		name: "Gurajada",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Gurajada', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Gurajada",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gurajada&display=swap",
		},
	},
	{
		value: "hammersmith-one",
		name: "Hammersmith One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Hammersmith One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Hammersmith_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Hammersmith+One&display=swap",
		},
	},
	{
		value: "hanken-grotesk",
		name: "Hanken Grotesk",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Hanken Grotesk', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Hanken_Grotesk",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@100..900&display=swap",
		},
	},
	{
		value: "harmattan",
		name: "Harmattan",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Harmattan', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Harmattan",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Harmattan:wght@400..700&display=swap",
		},
	},
	{
		value: "hedvig-letters-sans",
		name: "Hedvig Letters Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Hedvig Letters Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Hedvig_Letters_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Hedvig+Letters+Sans&display=swap",
		},
	},
	{
		value: "heebo",
		name: "Heebo",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Heebo', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Heebo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Heebo:wght@100..900&display=swap",
		},
	},
	{
		value: "hind",
		name: "Hind",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Hind', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Hind",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Hind:wght@300..700&display=swap",
		},
	},
	{
		value: "hind-guntur",
		name: "Hind Guntur",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Hind Guntur', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Hind_Guntur",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Hind+Guntur:wght@300..700&display=swap",
		},
	},
	{
		value: "hind-madurai",
		name: "Hind Madurai",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Hind Madurai', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Hind_Madurai",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Hind+Madurai:wght@300..700&display=swap",
		},
	},
	{
		value: "hind-mysuru",
		name: "Hind Mysuru",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Hind Mysuru', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Hind_Mysuru",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Hind+Mysuru:wght@300..700&display=swap",
		},
	},
	{
		value: "hind-siliguri",
		name: "Hind Siliguri",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Hind Siliguri', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Hind_Siliguri",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300..700&display=swap",
		},
	},
	{
		value: "hind-vadodara",
		name: "Hind Vadodara",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Hind Vadodara', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Hind_Vadodara",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Hind+Vadodara:wght@300..700&display=swap",
		},
	},
	{
		value: "homenaje",
		name: "Homenaje",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Homenaje', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Homenaje",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Homenaje&display=swap",
		},
	},
	{
		value: "host-grotesk",
		name: "Host Grotesk",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Host Grotesk', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Host_Grotesk",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@300..800&display=swap",
		},
	},
	{
		value: "hubballi",
		name: "Hubballi",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Hubballi', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Hubballi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Hubballi&display=swap",
		},
	},
	{
		value: "hubot-sans",
		name: "Hubot Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Hubot Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Hubot_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Hubot+Sans:wght@200..900&display=swap",
		},
	},
	{
		value: "huninn",
		name: "Huninn",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Huninn', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Huninn",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Huninn&display=swap",
		},
	},
	{
		value: "ibm-plex-sans-arabic",
		name: "IBM Plex Sans Arabic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'IBM Plex Sans Arabic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "IBM_Plex_Sans_Arabic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@100..700&display=swap",
		},
	},
	{
		value: "ibm-plex-sans-condensed",
		name: "IBM Plex Sans Condensed",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'IBM Plex Sans Condensed', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "IBM_Plex_Sans_Condensed",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:wght@100..700&display=swap",
		},
	},
	{
		value: "ibm-plex-sans-devanagari",
		name: "IBM Plex Sans Devanagari",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'IBM Plex Sans Devanagari', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "IBM_Plex_Sans_Devanagari",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Devanagari:wght@100..700&display=swap",
		},
	},
	{
		value: "ibm-plex-sans-hebrew",
		name: "IBM Plex Sans Hebrew",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'IBM Plex Sans Hebrew', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "IBM_Plex_Sans_Hebrew",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Hebrew:wght@100..700&display=swap",
		},
	},
	{
		value: "ibm-plex-sans-jp",
		name: "IBM Plex Sans JP",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'IBM Plex Sans JP', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "IBM_Plex_Sans_JP",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+JP:wght@100..700&display=swap",
		},
	},
	{
		value: "ibm-plex-sans-kr",
		name: "IBM Plex Sans KR",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'IBM Plex Sans KR', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "IBM_Plex_Sans_KR",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@100..700&display=swap",
		},
	},
	{
		value: "ibm-plex-sans-thai",
		name: "IBM Plex Sans Thai",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'IBM Plex Sans Thai', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "IBM_Plex_Sans_Thai",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@100..700&display=swap",
		},
	},
	{
		value: "ibm-plex-sans-thai-looped",
		name: "IBM Plex Sans Thai Looped",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'IBM Plex Sans Thai Looped', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "IBM_Plex_Sans_Thai_Looped",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai+Looped:wght@100..700&display=swap",
		},
	},
	{
		value: "imprima",
		name: "Imprima",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Imprima', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Imprima",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Imprima&display=swap",
		},
	},
	{
		value: "inclusive-sans",
		name: "Inclusive Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Inclusive Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Inclusive_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Inclusive+Sans:wght@300..700&display=swap",
		},
	},
	{
		value: "inder",
		name: "Inder",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Inder', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Inder",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Inder&display=swap",
		},
	},
	{
		value: "inria-sans",
		name: "Inria Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Inria Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Inria_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Inria+Sans:wght@300;400;700&display=swap",
		},
	},
	{
		value: "instrument-sans",
		name: "Instrument Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Instrument Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Instrument_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400..700&display=swap",
		},
	},
	{
		value: "inter-tight",
		name: "Inter Tight",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Inter Tight', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Inter_Tight",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Inter+Tight:wght@100..900&display=swap",
		},
	},
	{
		value: "istok-web",
		name: "Istok Web",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Istok Web', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Istok_Web",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Istok+Web:wght@400;700&display=swap",
		},
	},
	{
		value: "italiana",
		name: "Italiana",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Italiana', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Italiana",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Italiana&display=swap",
		},
	},
	{
		value: "jaldi",
		name: "Jaldi",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Jaldi', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Jaldi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Jaldi:wght@400;700&display=swap",
		},
	},
	{
		value: "jaro",
		name: "Jaro",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Jaro', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Jaro",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Jaro&display=swap",
		},
	},
	{
		value: "jockey-one",
		name: "Jockey One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Jockey One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Jockey_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Jockey+One&display=swap",
		},
	},
	{
		value: "josefin-sans",
		name: "Josefin Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Josefin Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Josefin_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100..700&display=swap",
		},
	},
	{
		value: "jost",
		name: "Jost",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Jost', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Jost",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Jost:wght@100..900&display=swap",
		},
	},
	{
		value: "jua",
		name: "Jua",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Jua', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Jua",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Jua&display=swap",
		},
	},
	{
		value: "julius-sans-one",
		name: "Julius Sans One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Julius Sans One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Julius_Sans_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Julius+Sans+One&display=swap",
		},
	},
	{
		value: "jura",
		name: "Jura",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Jura', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Jura",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Jura:wght@300..700&display=swap",
		},
	},
	{
		value: "k2d",
		name: "K2D",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'K2D', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "K2D",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=K2D:wght@100..800&display=swap",
		},
	},
	{
		value: "kanchenjunga",
		name: "Kanchenjunga",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Kanchenjunga', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Kanchenjunga",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kanchenjunga:wght@400..700&display=swap",
		},
	},
	{
		value: "kanit",
		name: "Kanit",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Kanit', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Kanit",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kanit:wght@100..900&display=swap",
		},
	},
	{
		value: "kantumruy-pro",
		name: "Kantumruy Pro",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Kantumruy Pro', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Kantumruy_Pro",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@100..700&display=swap",
		},
	},
	{
		value: "karla",
		name: "Karla",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Karla', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Karla",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Karla:wght@200..800&display=swap",
		},
	},
	{
		value: "karla-tamil-inclined",
		name: "Karla Tamil Inclined",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Karla Tamil Inclined', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Karla_Tamil_Inclined",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Karla+Tamil+Inclined:wght@400;700&display=swap",
		},
	},
	{
		value: "karla-tamil-upright",
		name: "Karla Tamil Upright",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Karla Tamil Upright', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Karla_Tamil_Upright",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Karla+Tamil+Upright:wght@400;700&display=swap",
		},
	},
	{
		value: "kdam-thmor-pro",
		name: "Kdam Thmor Pro",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Kdam Thmor Pro', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Kdam_Thmor_Pro",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kdam+Thmor+Pro&display=swap",
		},
	},
	{
		value: "kedebideri",
		name: "Kedebideri",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Kedebideri', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Kedebideri",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kedebideri:wght@400..900&display=swap",
		},
	},
	{
		value: "khand",
		name: "Khand",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Khand', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Khand",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Khand:wght@300..700&display=swap",
		},
	},
	{
		value: "khmer",
		name: "Khmer",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Khmer', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Khmer",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Khmer&display=swap",
		},
	},
	{
		value: "khula",
		name: "Khula",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Khula', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Khula",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Khula:wght@300;400;600;700;800&display=swap",
		},
	},
	{
		value: "kite-one",
		name: "Kite One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Kite One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Kite_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kite+One&display=swap",
		},
	},
	{
		value: "koho",
		name: "KoHo",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'KoHo', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "KoHo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=KoHo:wght@200..700&display=swap",
		},
	},
	{
		value: "kodchasan",
		name: "Kodchasan",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Kodchasan', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Kodchasan",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kodchasan:wght@200..700&display=swap",
		},
	},
	{
		value: "kosugi",
		name: "Kosugi",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Kosugi', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Kosugi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kosugi&display=swap",
		},
	},
	{
		value: "kosugi-maru",
		name: "Kosugi Maru",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Kosugi Maru', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Kosugi_Maru",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap",
		},
	},
	{
		value: "krona-one",
		name: "Krona One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Krona One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Krona_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Krona+One&display=swap",
		},
	},
	{
		value: "krub",
		name: "Krub",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Krub', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Krub",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Krub:wght@200..700&display=swap",
		},
	},
	{
		value: "kufam",
		name: "Kufam",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Kufam', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Kufam",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kufam:wght@400..900&display=swap",
		},
	},
	{
		value: "kulim-park",
		name: "Kulim Park",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Kulim Park', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Kulim_Park",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kulim+Park:wght@200;300;400;600;700&display=swap",
		},
	},
	{
		value: "kumbh-sans",
		name: "Kumbh Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Kumbh Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Kumbh_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@100..900&display=swap",
		},
	},
	{
		value: "lxgw-marker-gothic",
		name: "LXGW Marker Gothic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'LXGW Marker Gothic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "LXGW_Marker_Gothic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=LXGW+Marker+Gothic&display=swap",
		},
	},
	{
		value: "lalezar",
		name: "Lalezar",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Lalezar', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Lalezar",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Lalezar&display=swap",
		},
	},
	{
		value: "league-gothic",
		name: "League Gothic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'League Gothic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "League_Gothic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=League+Gothic&display=swap",
		},
	},
	{
		value: "league-spartan",
		name: "League Spartan",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'League Spartan', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "League_Spartan",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=League+Spartan:wght@100..900&display=swap",
		},
	},
	{
		value: "lexend",
		name: "Lexend",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Lexend', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Lexend",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap",
		},
	},
	{
		value: "lexend-deca",
		name: "Lexend Deca",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Lexend Deca', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Lexend_Deca",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&display=swap",
		},
	},
	{
		value: "lexend-exa",
		name: "Lexend Exa",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Lexend Exa', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Lexend_Exa",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Lexend+Exa:wght@100..900&display=swap",
		},
	},
	{
		value: "lexend-giga",
		name: "Lexend Giga",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Lexend Giga', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Lexend_Giga",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Lexend+Giga:wght@100..900&display=swap",
		},
	},
	{
		value: "lexend-mega",
		name: "Lexend Mega",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Lexend Mega', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Lexend_Mega",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Lexend+Mega:wght@100..900&display=swap",
		},
	},
	{
		value: "lexend-peta",
		name: "Lexend Peta",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Lexend Peta', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Lexend_Peta",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Lexend+Peta:wght@100..900&display=swap",
		},
	},
	{
		value: "lexend-tera",
		name: "Lexend Tera",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Lexend Tera', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Lexend_Tera",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Lexend+Tera:wght@100..900&display=swap",
		},
	},
	{
		value: "lexend-zetta",
		name: "Lexend Zetta",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Lexend Zetta', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Lexend_Zetta",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Lexend+Zetta:wght@100..900&display=swap",
		},
	},
	{
		value: "libertinus-sans",
		name: "Libertinus Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Libertinus Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Libertinus_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Libertinus+Sans:wght@400;700&display=swap",
		},
	},
	{
		value: "libre-franklin",
		name: "Libre Franklin",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Libre Franklin', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Libre_Franklin",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@100..900&display=swap",
		},
	},
	{
		value: "liter",
		name: "Liter",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Liter', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Liter",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Liter&display=swap",
		},
	},
	{
		value: "livvic",
		name: "Livvic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Livvic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Livvic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Livvic:wght@100;200;300;400;500;600;700;900&display=swap",
		},
	},
	{
		value: "lunasima",
		name: "Lunasima",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Lunasima', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Lunasima",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Lunasima:wght@400;700&display=swap",
		},
	},
	{
		value: "m-plus-1",
		name: "M PLUS 1",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'M PLUS 1', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "M_PLUS_1",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=M+PLUS+1:wght@100..900&display=swap",
		},
	},
	{
		value: "m-plus-1p",
		name: "M PLUS 1p",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'M PLUS 1p', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "M_PLUS_1p",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@100;300;400;500;700;800;900&display=swap",
		},
	},
	{
		value: "m-plus-2",
		name: "M PLUS 2",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'M PLUS 2', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "M_PLUS_2",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=M+PLUS+2:wght@100..900&display=swap",
		},
	},
	{
		value: "m-plus-code-latin",
		name: "M PLUS Code Latin",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'M PLUS Code Latin', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "M_PLUS_Code_Latin",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=M+PLUS+Code+Latin:wght@100..700&display=swap",
		},
	},
	{
		value: "m-plus-rounded-1c",
		name: "M PLUS Rounded 1c",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'M PLUS Rounded 1c', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "M_PLUS_Rounded_1c",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900&display=swap",
		},
	},
	{
		value: "mada",
		name: "Mada",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Mada', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Mada",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mada:wght@200..900&display=swap",
		},
	},
	{
		value: "madimi-one",
		name: "Madimi One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Madimi One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Madimi_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Madimi+One&display=swap",
		},
	},
	{
		value: "magra",
		name: "Magra",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Magra', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Magra",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Magra:wght@400;700&display=swap",
		},
	},
	{
		value: "mako",
		name: "Mako",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Mako', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Mako",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mako&display=swap",
		},
	},
	{
		value: "mallanna",
		name: "Mallanna",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Mallanna', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Mallanna",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mallanna&display=swap",
		},
	},
	{
		value: "mandali",
		name: "Mandali",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Mandali', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Mandali",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mandali&display=swap",
		},
	},
	{
		value: "manjari",
		name: "Manjari",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Manjari', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Manjari",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Manjari:wght@100;400;700&display=swap",
		},
	},
	{
		value: "marmelad",
		name: "Marmelad",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Marmelad', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Marmelad",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Marmelad&display=swap",
		},
	},
	{
		value: "martel-sans",
		name: "Martel Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Martel Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Martel_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Martel+Sans:wght@200;300;400;600;700;800;900&display=swap",
		},
	},
	{
		value: "marvel",
		name: "Marvel",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Marvel', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Marvel",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Marvel:wght@400;700&display=swap",
		},
	},
	{
		value: "matangi",
		name: "Matangi",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Matangi', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Matangi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Matangi:wght@300..900&display=swap",
		},
	},
	{
		value: "matemasie",
		name: "Matemasie",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Matemasie', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Matemasie",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Matemasie&display=swap",
		},
	},
	{
		value: "maven-pro",
		name: "Maven Pro",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Maven Pro', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Maven_Pro",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Maven+Pro:wght@400..900&display=swap",
		},
	},
	{
		value: "meera-inimai",
		name: "Meera Inimai",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Meera Inimai', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Meera_Inimai",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Meera+Inimai&display=swap",
		},
	},
	{
		value: "menbere",
		name: "Menbere",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Menbere', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Menbere",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Menbere:wght@100..700&display=swap",
		},
	},
	{
		value: "merriweather-sans",
		name: "Merriweather Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Merriweather Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Merriweather_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Merriweather+Sans:wght@300..800&display=swap",
		},
	},
	{
		value: "metrophobic",
		name: "Metrophobic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Metrophobic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Metrophobic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Metrophobic&display=swap",
		},
	},
	{
		value: "michroma",
		name: "Michroma",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Michroma', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Michroma",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Michroma&display=swap",
		},
	},
	{
		value: "mina",
		name: "Mina",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Mina', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Mina",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mina:wght@400;700&display=swap",
		},
	},
	{
		value: "mingzat",
		name: "Mingzat",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Mingzat', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Mingzat",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mingzat&display=swap",
		},
	},
	{
		value: "miriam-libre",
		name: "Miriam Libre",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Miriam Libre', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Miriam_Libre",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Miriam+Libre:wght@400..700&display=swap",
		},
	},
	{
		value: "mitr",
		name: "Mitr",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Mitr', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Mitr",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mitr:wght@200..700&display=swap",
		},
	},
	{
		value: "mochiy-pop-one",
		name: "Mochiy Pop One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Mochiy Pop One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Mochiy_Pop_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&display=swap",
		},
	},
	{
		value: "mochiy-pop-p-one",
		name: "Mochiy Pop P One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Mochiy Pop P One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Mochiy_Pop_P_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mochiy+Pop+P+One&display=swap",
		},
	},
	{
		value: "moderustic",
		name: "Moderustic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Moderustic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Moderustic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Moderustic:wght@300..800&display=swap",
		},
	},
	{
		value: "mohave",
		name: "Mohave",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Mohave', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Mohave",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mohave:wght@300..700&display=swap",
		},
	},
	{
		value: "molengo",
		name: "Molengo",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Molengo', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Molengo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Molengo&display=swap",
		},
	},
	{
		value: "momo-signature",
		name: "Momo Signature",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Momo Signature', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Momo_Signature",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Momo+Signature&display=swap",
		},
	},
	{
		value: "momo-trust-display",
		name: "Momo Trust Display",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Momo Trust Display', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Momo_Trust_Display",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Momo+Trust+Display&display=swap",
		},
	},
	{
		value: "momo-trust-sans",
		name: "Momo Trust Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Momo Trust Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Momo_Trust_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Momo+Trust+Sans:wght@200..800&display=swap",
		},
	},
	{
		value: "mona-sans",
		name: "Mona Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Mona Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Mona_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mona+Sans:wght@200..900&display=swap",
		},
	},
	{
		value: "monda",
		name: "Monda",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Monda', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Monda",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Monda:wght@400..700&display=swap",
		},
	},
	{
		value: "monomaniac-one",
		name: "Monomaniac One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Monomaniac One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Monomaniac_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Monomaniac+One&display=swap",
		},
	},
	{
		value: "montserrat",
		name: "Montserrat",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Montserrat', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Montserrat",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap",
		},
	},
	{
		value: "montserrat-alternates",
		name: "Montserrat Alternates",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Montserrat Alternates', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Montserrat_Alternates",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@100..900&display=swap",
		},
	},
	{
		value: "montserrat-underline",
		name: "Montserrat Underline",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Montserrat Underline', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Montserrat_Underline",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Montserrat+Underline:wght@100..900&display=swap",
		},
	},
	{
		value: "mooli",
		name: "Mooli",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Mooli', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Mooli",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mooli&display=swap",
		},
	},
	{
		value: "moulpali",
		name: "Moulpali",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Moulpali', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Moulpali",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Moulpali&display=swap",
		},
	},
	{
		value: "mouse-memoirs",
		name: "Mouse Memoirs",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Mouse Memoirs', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Mouse_Memoirs",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mouse+Memoirs&display=swap",
		},
	},
	{
		value: "mozilla-headline",
		name: "Mozilla Headline",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Mozilla Headline', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Mozilla_Headline",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mozilla+Headline:wght@200..700&display=swap",
		},
	},
	{
		value: "mozilla-text",
		name: "Mozilla Text",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Mozilla Text', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Mozilla_Text",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mozilla+Text:wght@200..700&display=swap",
		},
	},
	{
		value: "mukta",
		name: "Mukta",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Mukta', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Mukta",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mukta:wght@200..800&display=swap",
		},
	},
	{
		value: "mukta-mahee",
		name: "Mukta Mahee",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Mukta Mahee', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Mukta_Mahee",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mukta+Mahee:wght@200..800&display=swap",
		},
	},
	{
		value: "mukta-malar",
		name: "Mukta Malar",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Mukta Malar', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Mukta_Malar",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mukta+Malar:wght@200..800&display=swap",
		},
	},
	{
		value: "mukta-vaani",
		name: "Mukta Vaani",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Mukta Vaani', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Mukta_Vaani",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mukta+Vaani:wght@200..800&display=swap",
		},
	},
	{
		value: "mulish",
		name: "Mulish",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Mulish', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Mulish",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mulish:wght@200..900&display=swap",
		},
	},
	{
		value: "murecho",
		name: "Murecho",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Murecho', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Murecho",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Murecho:wght@100..900&display=swap",
		},
	},
	{
		value: "ntr",
		name: "NTR",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'NTR', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "NTR",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=NTR&display=swap",
		},
	},
	{
		value: "nanum-gothic",
		name: "Nanum Gothic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Nanum Gothic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Nanum_Gothic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap",
		},
	},
	{
		value: "narnoor",
		name: "Narnoor",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Narnoor', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Narnoor",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Narnoor:wght@400..800&display=swap",
		},
	},
	{
		value: "nata-sans",
		name: "Nata Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Nata Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Nata_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Nata+Sans:wght@100..900&display=swap",
		},
	},
	{
		value: "national-park",
		name: "National Park",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'National Park', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "National_Park",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=National+Park:wght@200..800&display=swap",
		},
	},
	{
		value: "new-amsterdam",
		name: "New Amsterdam",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'New Amsterdam', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "New_Amsterdam",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=New+Amsterdam&display=swap",
		},
	},
	{
		value: "news-cycle",
		name: "News Cycle",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'News Cycle', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "News_Cycle",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=News+Cycle:wght@400;700&display=swap",
		},
	},
	{
		value: "niramit",
		name: "Niramit",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Niramit', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Niramit",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Niramit:wght@200..700&display=swap",
		},
	},
	{
		value: "nobile",
		name: "Nobile",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Nobile', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Nobile",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Nobile:wght@400;500;700&display=swap",
		},
	},
	{
		value: "nokora",
		name: "Nokora",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Nokora', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Nokora",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Nokora:wght@100..900&display=swap",
		},
	},
	{
		value: "notable",
		name: "Notable",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Notable', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Notable",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Notable&display=swap",
		},
	},
	{
		value: "noto-color-emoji",
		name: "Noto Color Emoji",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Color Emoji', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Color_Emoji",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&display=swap",
		},
	},
	{
		value: "noto-emoji",
		name: "Noto Emoji",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Emoji', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Emoji",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Emoji:wght@300..700&display=swap",
		},
	},
	{
		value: "noto-kufi-arabic",
		name: "Noto Kufi Arabic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Kufi Arabic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Kufi_Arabic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-music",
		name: "Noto Music",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Music', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Music",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Music&display=swap",
		},
	},
	{
		value: "noto-sans",
		name: "Noto Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-adlam",
		name: "Noto Sans Adlam",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Adlam', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Adlam",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Adlam:wght@400..700&display=swap",
		},
	},
	{
		value: "noto-sans-adlam-unjoined",
		name: "Noto Sans Adlam Unjoined",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Adlam Unjoined', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Adlam_Unjoined",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Adlam+Unjoined:wght@400..700&display=swap",
		},
	},
	{
		value: "noto-sans-anatolian-hieroglyphs",
		name: "Noto Sans Anatolian Hieroglyphs",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Anatolian Hieroglyphs', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Anatolian_Hieroglyphs",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Anatolian+Hieroglyphs&display=swap",
		},
	},
	{
		value: "noto-sans-arabic",
		name: "Noto Sans Arabic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Arabic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Arabic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-armenian",
		name: "Noto Sans Armenian",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Armenian', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Armenian",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Armenian:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-avestan",
		name: "Noto Sans Avestan",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Avestan', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Avestan",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Avestan&display=swap",
		},
	},
	{
		value: "noto-sans-balinese",
		name: "Noto Sans Balinese",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Balinese', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Balinese",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Balinese:wght@400..700&display=swap",
		},
	},
	{
		value: "noto-sans-bamum",
		name: "Noto Sans Bamum",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Bamum', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Bamum",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Bamum:wght@400..700&display=swap",
		},
	},
	{
		value: "noto-sans-bassa-vah",
		name: "Noto Sans Bassa Vah",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Bassa Vah', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Bassa_Vah",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Bassa+Vah:wght@400..700&display=swap",
		},
	},
	{
		value: "noto-sans-batak",
		name: "Noto Sans Batak",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Batak', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Batak",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Batak&display=swap",
		},
	},
	{
		value: "noto-sans-bengali",
		name: "Noto Sans Bengali",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Bengali', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Bengali",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-bhaiksuki",
		name: "Noto Sans Bhaiksuki",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Bhaiksuki', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Bhaiksuki",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Bhaiksuki&display=swap",
		},
	},
	{
		value: "noto-sans-brahmi",
		name: "Noto Sans Brahmi",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Brahmi', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Brahmi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Brahmi&display=swap",
		},
	},
	{
		value: "noto-sans-buginese",
		name: "Noto Sans Buginese",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Buginese', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Buginese",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Buginese&display=swap",
		},
	},
	{
		value: "noto-sans-buhid",
		name: "Noto Sans Buhid",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Buhid', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Buhid",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Buhid&display=swap",
		},
	},
	{
		value: "noto-sans-canadian-aboriginal",
		name: "Noto Sans Canadian Aboriginal",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Canadian Aboriginal', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Canadian_Aboriginal",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Canadian+Aboriginal:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-carian",
		name: "Noto Sans Carian",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Carian', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Carian",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Carian&display=swap",
		},
	},
	{
		value: "noto-sans-caucasian-albanian",
		name: "Noto Sans Caucasian Albanian",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Caucasian Albanian', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Caucasian_Albanian",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Caucasian+Albanian&display=swap",
		},
	},
	{
		value: "noto-sans-chakma",
		name: "Noto Sans Chakma",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Chakma', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Chakma",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Chakma&display=swap",
		},
	},
	{
		value: "noto-sans-cham",
		name: "Noto Sans Cham",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Cham', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Cham",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Cham:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-cherokee",
		name: "Noto Sans Cherokee",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Cherokee', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Cherokee",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Cherokee:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-chorasmian",
		name: "Noto Sans Chorasmian",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Chorasmian', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Chorasmian",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Chorasmian&display=swap",
		},
	},
	{
		value: "noto-sans-coptic",
		name: "Noto Sans Coptic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Coptic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Coptic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Coptic&display=swap",
		},
	},
	{
		value: "noto-sans-cuneiform",
		name: "Noto Sans Cuneiform",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Cuneiform', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Cuneiform",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Cuneiform&display=swap",
		},
	},
	{
		value: "noto-sans-cypriot",
		name: "Noto Sans Cypriot",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Cypriot', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Cypriot",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Cypriot&display=swap",
		},
	},
	{
		value: "noto-sans-cypro-minoan",
		name: "Noto Sans Cypro Minoan",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Cypro Minoan', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Cypro_Minoan",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Cypro+Minoan&display=swap",
		},
	},
	{
		value: "noto-sans-deseret",
		name: "Noto Sans Deseret",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Deseret', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Deseret",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Deseret&display=swap",
		},
	},
	{
		value: "noto-sans-devanagari",
		name: "Noto Sans Devanagari",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Devanagari', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Devanagari",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-display",
		name: "Noto Sans Display",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Display', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Display",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Display:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-duployan",
		name: "Noto Sans Duployan",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Duployan', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Duployan",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Duployan:wght@400;700&display=swap",
		},
	},
	{
		value: "noto-sans-egyptian-hieroglyphs",
		name: "Noto Sans Egyptian Hieroglyphs",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Egyptian Hieroglyphs', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Egyptian_Hieroglyphs",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Egyptian+Hieroglyphs&display=swap",
		},
	},
	{
		value: "noto-sans-elbasan",
		name: "Noto Sans Elbasan",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Elbasan', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Elbasan",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Elbasan&display=swap",
		},
	},
	{
		value: "noto-sans-elymaic",
		name: "Noto Sans Elymaic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Elymaic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Elymaic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Elymaic&display=swap",
		},
	},
	{
		value: "noto-sans-ethiopic",
		name: "Noto Sans Ethiopic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Ethiopic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Ethiopic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Ethiopic:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-georgian",
		name: "Noto Sans Georgian",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Georgian', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Georgian",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-glagolitic",
		name: "Noto Sans Glagolitic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Glagolitic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Glagolitic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Glagolitic&display=swap",
		},
	},
	{
		value: "noto-sans-gothic",
		name: "Noto Sans Gothic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Gothic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Gothic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Gothic&display=swap",
		},
	},
	{
		value: "noto-sans-grantha",
		name: "Noto Sans Grantha",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Grantha', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Grantha",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Grantha&display=swap",
		},
	},
	{
		value: "noto-sans-gujarati",
		name: "Noto Sans Gujarati",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Gujarati', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Gujarati",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Gujarati:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-gunjala-gondi",
		name: "Noto Sans Gunjala Gondi",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Gunjala Gondi', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Gunjala_Gondi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Gunjala+Gondi:wght@400..700&display=swap",
		},
	},
	{
		value: "noto-sans-gurmukhi",
		name: "Noto Sans Gurmukhi",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Gurmukhi', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Gurmukhi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Gurmukhi:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-hk",
		name: "Noto Sans HK",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans HK', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_HK",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+HK:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-hanifi-rohingya",
		name: "Noto Sans Hanifi Rohingya",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Hanifi Rohingya', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Hanifi_Rohingya",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Hanifi+Rohingya:wght@400..700&display=swap",
		},
	},
	{
		value: "noto-sans-hanunoo",
		name: "Noto Sans Hanunoo",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Hanunoo', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Hanunoo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Hanunoo&display=swap",
		},
	},
	{
		value: "noto-sans-hatran",
		name: "Noto Sans Hatran",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Hatran', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Hatran",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Hatran&display=swap",
		},
	},
	{
		value: "noto-sans-hebrew",
		name: "Noto Sans Hebrew",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Hebrew', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Hebrew",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Hebrew:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-imperial-aramaic",
		name: "Noto Sans Imperial Aramaic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Imperial Aramaic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Imperial_Aramaic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Imperial+Aramaic&display=swap",
		},
	},
	{
		value: "noto-sans-indic-siyaq-numbers",
		name: "Noto Sans Indic Siyaq Numbers",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Indic Siyaq Numbers', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Indic_Siyaq_Numbers",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Indic+Siyaq+Numbers&display=swap",
		},
	},
	{
		value: "noto-sans-inscriptional-pahlavi",
		name: "Noto Sans Inscriptional Pahlavi",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Inscriptional Pahlavi', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Inscriptional_Pahlavi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Inscriptional+Pahlavi&display=swap",
		},
	},
	{
		value: "noto-sans-inscriptional-parthian",
		name: "Noto Sans Inscriptional Parthian",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Inscriptional Parthian', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Inscriptional_Parthian",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Inscriptional+Parthian&display=swap",
		},
	},
	{
		value: "noto-sans-jp",
		name: "Noto Sans JP",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans JP', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_JP",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-javanese",
		name: "Noto Sans Javanese",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Javanese', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Javanese",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Javanese:wght@400..700&display=swap",
		},
	},
	{
		value: "noto-sans-kr",
		name: "Noto Sans KR",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans KR', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_KR",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-kaithi",
		name: "Noto Sans Kaithi",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Kaithi', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Kaithi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Kaithi&display=swap",
		},
	},
	{
		value: "noto-sans-kannada",
		name: "Noto Sans Kannada",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Kannada', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Kannada",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-kawi",
		name: "Noto Sans Kawi",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Kawi', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Kawi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Kawi:wght@400..700&display=swap",
		},
	},
	{
		value: "noto-sans-kayah-li",
		name: "Noto Sans Kayah Li",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Kayah Li', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Kayah_Li",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Kayah+Li:wght@400..700&display=swap",
		},
	},
	{
		value: "noto-sans-kharoshthi",
		name: "Noto Sans Kharoshthi",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Kharoshthi', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Kharoshthi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Kharoshthi&display=swap",
		},
	},
	{
		value: "noto-sans-khmer",
		name: "Noto Sans Khmer",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Khmer', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Khmer",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Khmer:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-khojki",
		name: "Noto Sans Khojki",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Khojki', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Khojki",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Khojki&display=swap",
		},
	},
	{
		value: "noto-sans-khudawadi",
		name: "Noto Sans Khudawadi",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Khudawadi', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Khudawadi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Khudawadi&display=swap",
		},
	},
	{
		value: "noto-sans-lao",
		name: "Noto Sans Lao",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Lao', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Lao",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-lao-looped",
		name: "Noto Sans Lao Looped",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Lao Looped', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Lao_Looped",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Lao+Looped:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-lepcha",
		name: "Noto Sans Lepcha",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Lepcha', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Lepcha",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Lepcha&display=swap",
		},
	},
	{
		value: "noto-sans-limbu",
		name: "Noto Sans Limbu",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Limbu', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Limbu",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Limbu&display=swap",
		},
	},
	{
		value: "noto-sans-linear-a",
		name: "Noto Sans Linear A",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Linear A', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Linear_A",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Linear+A&display=swap",
		},
	},
	{
		value: "noto-sans-linear-b",
		name: "Noto Sans Linear B",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Linear B', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Linear_B",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Linear+B&display=swap",
		},
	},
	{
		value: "noto-sans-lisu",
		name: "Noto Sans Lisu",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Lisu', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Lisu",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Lisu:wght@400..700&display=swap",
		},
	},
	{
		value: "noto-sans-lycian",
		name: "Noto Sans Lycian",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Lycian', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Lycian",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Lycian&display=swap",
		},
	},
	{
		value: "noto-sans-lydian",
		name: "Noto Sans Lydian",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Lydian', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Lydian",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Lydian&display=swap",
		},
	},
	{
		value: "noto-sans-mahajani",
		name: "Noto Sans Mahajani",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Mahajani', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Mahajani",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Mahajani&display=swap",
		},
	},
	{
		value: "noto-sans-malayalam",
		name: "Noto Sans Malayalam",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Malayalam', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Malayalam",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Malayalam:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-mandaic",
		name: "Noto Sans Mandaic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Mandaic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Mandaic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Mandaic&display=swap",
		},
	},
	{
		value: "noto-sans-manichaean",
		name: "Noto Sans Manichaean",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Manichaean', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Manichaean",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Manichaean&display=swap",
		},
	},
	{
		value: "noto-sans-marchen",
		name: "Noto Sans Marchen",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Marchen', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Marchen",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Marchen&display=swap",
		},
	},
	{
		value: "noto-sans-masaram-gondi",
		name: "Noto Sans Masaram Gondi",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Masaram Gondi', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Masaram_Gondi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Masaram+Gondi&display=swap",
		},
	},
	{
		value: "noto-sans-math",
		name: "Noto Sans Math",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Math', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Math",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Math&display=swap",
		},
	},
	{
		value: "noto-sans-mayan-numerals",
		name: "Noto Sans Mayan Numerals",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Mayan Numerals', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Mayan_Numerals",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Mayan+Numerals&display=swap",
		},
	},
	{
		value: "noto-sans-medefaidrin",
		name: "Noto Sans Medefaidrin",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Medefaidrin', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Medefaidrin",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Medefaidrin:wght@400..700&display=swap",
		},
	},
	{
		value: "noto-sans-meetei-mayek",
		name: "Noto Sans Meetei Mayek",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Meetei Mayek', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Meetei_Mayek",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Meetei+Mayek:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-mende-kikakui",
		name: "Noto Sans Mende Kikakui",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Mende Kikakui', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Mende_Kikakui",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Mende+Kikakui&display=swap",
		},
	},
	{
		value: "noto-sans-meroitic",
		name: "Noto Sans Meroitic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Meroitic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Meroitic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Meroitic&display=swap",
		},
	},
	{
		value: "noto-sans-miao",
		name: "Noto Sans Miao",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Miao', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Miao",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Miao&display=swap",
		},
	},
	{
		value: "noto-sans-modi",
		name: "Noto Sans Modi",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Modi', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Modi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Modi&display=swap",
		},
	},
	{
		value: "noto-sans-mongolian",
		name: "Noto Sans Mongolian",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Mongolian', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Mongolian",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Mongolian&display=swap",
		},
	},
	{
		value: "noto-sans-mono",
		name: "Noto Sans Mono",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Noto Sans Mono', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Mono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-mro",
		name: "Noto Sans Mro",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Mro', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Mro",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Mro&display=swap",
		},
	},
	{
		value: "noto-sans-multani",
		name: "Noto Sans Multani",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Multani', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Multani",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Multani&display=swap",
		},
	},
	{
		value: "noto-sans-myanmar",
		name: "Noto Sans Myanmar",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Myanmar', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Myanmar",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Myanmar:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-nko",
		name: "Noto Sans NKo",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans NKo', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_NKo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+NKo&display=swap",
		},
	},
	{
		value: "noto-sans-nko-unjoined",
		name: "Noto Sans NKo Unjoined",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans NKo Unjoined', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_NKo_Unjoined",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+NKo+Unjoined:wght@400..700&display=swap",
		},
	},
	{
		value: "noto-sans-nabataean",
		name: "Noto Sans Nabataean",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Nabataean', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Nabataean",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Nabataean&display=swap",
		},
	},
	{
		value: "noto-sans-nag-mundari",
		name: "Noto Sans Nag Mundari",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Nag Mundari', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Nag_Mundari",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Nag+Mundari:wght@400..700&display=swap",
		},
	},
	{
		value: "noto-sans-nandinagari",
		name: "Noto Sans Nandinagari",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Nandinagari', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Nandinagari",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Nandinagari&display=swap",
		},
	},
	{
		value: "noto-sans-new-tai-lue",
		name: "Noto Sans New Tai Lue",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans New Tai Lue', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_New_Tai_Lue",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+New+Tai+Lue:wght@400..700&display=swap",
		},
	},
	{
		value: "noto-sans-newa",
		name: "Noto Sans Newa",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Newa', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Newa",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Newa&display=swap",
		},
	},
	{
		value: "noto-sans-nushu",
		name: "Noto Sans Nushu",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Nushu', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Nushu",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Nushu&display=swap",
		},
	},
	{
		value: "noto-sans-ogham",
		name: "Noto Sans Ogham",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Ogham', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Ogham",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Ogham&display=swap",
		},
	},
	{
		value: "noto-sans-ol-chiki",
		name: "Noto Sans Ol Chiki",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Ol Chiki', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Ol_Chiki",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Ol+Chiki:wght@400..700&display=swap",
		},
	},
	{
		value: "noto-sans-old-hungarian",
		name: "Noto Sans Old Hungarian",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Old Hungarian', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Old_Hungarian",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Old+Hungarian&display=swap",
		},
	},
	{
		value: "noto-sans-old-italic",
		name: "Noto Sans Old Italic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Old Italic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Old_Italic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Old+Italic&display=swap",
		},
	},
	{
		value: "noto-sans-old-north-arabian",
		name: "Noto Sans Old North Arabian",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Old North Arabian', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Old_North_Arabian",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Old+North+Arabian&display=swap",
		},
	},
	{
		value: "noto-sans-old-permic",
		name: "Noto Sans Old Permic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Old Permic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Old_Permic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Old+Permic&display=swap",
		},
	},
	{
		value: "noto-sans-old-persian",
		name: "Noto Sans Old Persian",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Old Persian', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Old_Persian",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Old+Persian&display=swap",
		},
	},
	{
		value: "noto-sans-old-sogdian",
		name: "Noto Sans Old Sogdian",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Old Sogdian', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Old_Sogdian",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Old+Sogdian&display=swap",
		},
	},
	{
		value: "noto-sans-old-south-arabian",
		name: "Noto Sans Old South Arabian",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Old South Arabian', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Old_South_Arabian",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Old+South+Arabian&display=swap",
		},
	},
	{
		value: "noto-sans-old-turkic",
		name: "Noto Sans Old Turkic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Old Turkic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Old_Turkic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Old+Turkic&display=swap",
		},
	},
	{
		value: "noto-sans-oriya",
		name: "Noto Sans Oriya",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Oriya', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Oriya",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Oriya:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-osage",
		name: "Noto Sans Osage",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Osage', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Osage",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Osage&display=swap",
		},
	},
	{
		value: "noto-sans-osmanya",
		name: "Noto Sans Osmanya",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Osmanya', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Osmanya",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Osmanya&display=swap",
		},
	},
	{
		value: "noto-sans-pahawh-hmong",
		name: "Noto Sans Pahawh Hmong",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Pahawh Hmong', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Pahawh_Hmong",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Pahawh+Hmong&display=swap",
		},
	},
	{
		value: "noto-sans-palmyrene",
		name: "Noto Sans Palmyrene",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Palmyrene', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Palmyrene",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Palmyrene&display=swap",
		},
	},
	{
		value: "noto-sans-pau-cin-hau",
		name: "Noto Sans Pau Cin Hau",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Pau Cin Hau', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Pau_Cin_Hau",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Pau+Cin+Hau&display=swap",
		},
	},
	{
		value: "noto-sans-phagspa",
		name: "Noto Sans PhagsPa",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans PhagsPa', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_PhagsPa",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+PhagsPa&display=swap",
		},
	},
	{
		value: "noto-sans-phoenician",
		name: "Noto Sans Phoenician",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Phoenician', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Phoenician",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Phoenician&display=swap",
		},
	},
	{
		value: "noto-sans-psalter-pahlavi",
		name: "Noto Sans Psalter Pahlavi",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Psalter Pahlavi', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Psalter_Pahlavi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Psalter+Pahlavi&display=swap",
		},
	},
	{
		value: "noto-sans-rejang",
		name: "Noto Sans Rejang",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Rejang', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Rejang",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Rejang&display=swap",
		},
	},
	{
		value: "noto-sans-runic",
		name: "Noto Sans Runic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Runic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Runic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Runic&display=swap",
		},
	},
	{
		value: "noto-sans-sc",
		name: "Noto Sans SC",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans SC', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_SC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-samaritan",
		name: "Noto Sans Samaritan",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Samaritan', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Samaritan",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Samaritan&display=swap",
		},
	},
	{
		value: "noto-sans-saurashtra",
		name: "Noto Sans Saurashtra",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Saurashtra', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Saurashtra",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Saurashtra&display=swap",
		},
	},
	{
		value: "noto-sans-sharada",
		name: "Noto Sans Sharada",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Sharada', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Sharada",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Sharada&display=swap",
		},
	},
	{
		value: "noto-sans-shavian",
		name: "Noto Sans Shavian",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Shavian', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Shavian",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Shavian&display=swap",
		},
	},
	{
		value: "noto-sans-siddham",
		name: "Noto Sans Siddham",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Siddham', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Siddham",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Siddham&display=swap",
		},
	},
	{
		value: "noto-sans-signwriting",
		name: "Noto Sans SignWriting",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans SignWriting', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_SignWriting",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+SignWriting&display=swap",
		},
	},
	{
		value: "noto-sans-sinhala",
		name: "Noto Sans Sinhala",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Sinhala', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Sinhala",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Sinhala:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-sogdian",
		name: "Noto Sans Sogdian",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Sogdian', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Sogdian",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Sogdian&display=swap",
		},
	},
	{
		value: "noto-sans-sora-sompeng",
		name: "Noto Sans Sora Sompeng",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Sora Sompeng', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Sora_Sompeng",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Sora+Sompeng:wght@400..700&display=swap",
		},
	},
	{
		value: "noto-sans-soyombo",
		name: "Noto Sans Soyombo",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Soyombo', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Soyombo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Soyombo&display=swap",
		},
	},
	{
		value: "noto-sans-sundanese",
		name: "Noto Sans Sundanese",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Sundanese', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Sundanese",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Sundanese:wght@400..700&display=swap",
		},
	},
	{
		value: "noto-sans-sunuwar",
		name: "Noto Sans Sunuwar",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Sunuwar', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Sunuwar",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Sunuwar&display=swap",
		},
	},
	{
		value: "noto-sans-syloti-nagri",
		name: "Noto Sans Syloti Nagri",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Syloti Nagri', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Syloti_Nagri",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Syloti+Nagri&display=swap",
		},
	},
	{
		value: "noto-sans-symbols",
		name: "Noto Sans Symbols",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Symbols', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Symbols",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Symbols:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-symbols-2",
		name: "Noto Sans Symbols 2",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Symbols 2', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Symbols_2",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Symbols+2&display=swap",
		},
	},
	{
		value: "noto-sans-syriac",
		name: "Noto Sans Syriac",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Syriac', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Syriac",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Syriac:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-syriac-eastern",
		name: "Noto Sans Syriac Eastern",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Syriac Eastern', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Syriac_Eastern",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Syriac+Eastern:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-syriac-western",
		name: "Noto Sans Syriac Western",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Syriac Western', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Syriac_Western",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Syriac+Western:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-tc",
		name: "Noto Sans TC",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans TC', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_TC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-tagalog",
		name: "Noto Sans Tagalog",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Tagalog', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Tagalog",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Tagalog&display=swap",
		},
	},
	{
		value: "noto-sans-tagbanwa",
		name: "Noto Sans Tagbanwa",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Tagbanwa', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Tagbanwa",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Tagbanwa&display=swap",
		},
	},
	{
		value: "noto-sans-tai-le",
		name: "Noto Sans Tai Le",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Tai Le', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Tai_Le",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Tai+Le&display=swap",
		},
	},
	{
		value: "noto-sans-tai-tham",
		name: "Noto Sans Tai Tham",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Tai Tham', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Tai_Tham",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Tai+Tham:wght@400..700&display=swap",
		},
	},
	{
		value: "noto-sans-tai-viet",
		name: "Noto Sans Tai Viet",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Tai Viet', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Tai_Viet",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Tai+Viet&display=swap",
		},
	},
	{
		value: "noto-sans-takri",
		name: "Noto Sans Takri",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Takri', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Takri",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Takri&display=swap",
		},
	},
	{
		value: "noto-sans-tamil",
		name: "Noto Sans Tamil",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Tamil', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Tamil",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-tamil-supplement",
		name: "Noto Sans Tamil Supplement",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Tamil Supplement', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Tamil_Supplement",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil+Supplement&display=swap",
		},
	},
	{
		value: "noto-sans-tangsa",
		name: "Noto Sans Tangsa",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Tangsa', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Tangsa",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Tangsa:wght@400..700&display=swap",
		},
	},
	{
		value: "noto-sans-telugu",
		name: "Noto Sans Telugu",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Telugu', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Telugu",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-thaana",
		name: "Noto Sans Thaana",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Thaana', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Thaana",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Thaana:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-thai",
		name: "Noto Sans Thai",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Thai', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Thai",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-thai-looped",
		name: "Noto Sans Thai Looped",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Thai Looped', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Thai_Looped",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Thai+Looped:wght@100..900&display=swap",
		},
	},
	{
		value: "noto-sans-tifinagh",
		name: "Noto Sans Tifinagh",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Tifinagh', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Tifinagh",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Tifinagh&display=swap",
		},
	},
	{
		value: "noto-sans-tirhuta",
		name: "Noto Sans Tirhuta",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Tirhuta', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Tirhuta",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Tirhuta&display=swap",
		},
	},
	{
		value: "noto-sans-ugaritic",
		name: "Noto Sans Ugaritic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Ugaritic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Ugaritic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Ugaritic&display=swap",
		},
	},
	{
		value: "noto-sans-vai",
		name: "Noto Sans Vai",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Vai', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Vai",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Vai&display=swap",
		},
	},
	{
		value: "noto-sans-vithkuqi",
		name: "Noto Sans Vithkuqi",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Vithkuqi', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Vithkuqi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Vithkuqi:wght@400..700&display=swap",
		},
	},
	{
		value: "noto-sans-wancho",
		name: "Noto Sans Wancho",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Wancho', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Wancho",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Wancho&display=swap",
		},
	},
	{
		value: "noto-sans-warang-citi",
		name: "Noto Sans Warang Citi",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Warang Citi', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Warang_Citi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Warang+Citi&display=swap",
		},
	},
	{
		value: "noto-sans-yi",
		name: "Noto Sans Yi",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Yi', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Yi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Yi&display=swap",
		},
	},
	{
		value: "noto-sans-zanabazar-square",
		name: "Noto Sans Zanabazar Square",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Zanabazar Square', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Sans_Zanabazar_Square",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Zanabazar+Square&display=swap",
		},
	},
	{
		value: "noto-traditional-nushu",
		name: "Noto Traditional Nushu",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Traditional Nushu', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Traditional_Nushu",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Traditional+Nushu:wght@300..700&display=swap",
		},
	},
	{
		value: "noto-znamenny-musical-notation",
		name: "Noto Znamenny Musical Notation",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Znamenny Musical Notation', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Noto_Znamenny_Musical_Notation",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Znamenny+Musical+Notation&display=swap",
		},
	},
	{
		value: "numans",
		name: "Numans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Numans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Numans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Numans&display=swap",
		},
	},
	{
		value: "nunito",
		name: "Nunito",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Nunito', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Nunito",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Nunito:wght@200..900&display=swap",
		},
	},
	{
		value: "nunito-sans",
		name: "Nunito Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Nunito Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Nunito_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..900&display=swap",
		},
	},
	{
		value: "nuosu-sil",
		name: "Nuosu SIL",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Nuosu SIL', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Nuosu_SIL",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Nuosu+SIL&display=swap",
		},
	},
	{
		value: "ojuju",
		name: "Ojuju",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Ojuju', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Ojuju",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ojuju:wght@200..800&display=swap",
		},
	},
	{
		value: "onest",
		name: "Onest",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Onest', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Onest",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Onest:wght@100..900&display=swap",
		},
	},
	{
		value: "orbit",
		name: "Orbit",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Orbit', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Orbit",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Orbit&display=swap",
		},
	},
	{
		value: "orbitron",
		name: "Orbitron",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Orbitron', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Orbitron",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap",
		},
	},
	{
		value: "orienta",
		name: "Orienta",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Orienta', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Orienta",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Orienta&display=swap",
		},
	},
	{
		value: "oswald",
		name: "Oswald",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Oswald', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Oswald",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap",
		},
	},
	{
		value: "outfit",
		name: "Outfit",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Outfit', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Outfit",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap",
		},
	},
	{
		value: "overpass",
		name: "Overpass",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Overpass', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Overpass",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Overpass:wght@100..900&display=swap",
		},
	},
	{
		value: "oxygen",
		name: "Oxygen",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Oxygen', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Oxygen",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap",
		},
	},
	{
		value: "pt-sans",
		name: "PT Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'PT Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "PT_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap",
		},
	},
	{
		value: "pt-sans-caption",
		name: "PT Sans Caption",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'PT Sans Caption', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "PT_Sans_Caption",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=PT+Sans+Caption:wght@400;700&display=swap",
		},
	},
	{
		value: "pt-sans-narrow",
		name: "PT Sans Narrow",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'PT Sans Narrow', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "PT_Sans_Narrow",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=PT+Sans+Narrow:wght@400;700&display=swap",
		},
	},
	{
		value: "padauk",
		name: "Padauk",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Padauk', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Padauk",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Padauk:wght@400;700&display=swap",
		},
	},
	{
		value: "palanquin",
		name: "Palanquin",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Palanquin', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Palanquin",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Palanquin:wght@100..700&display=swap",
		},
	},
	{
		value: "palanquin-dark",
		name: "Palanquin Dark",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Palanquin Dark', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Palanquin_Dark",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Palanquin+Dark:wght@400..700&display=swap",
		},
	},
	{
		value: "parkinsans",
		name: "Parkinsans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Parkinsans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Parkinsans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Parkinsans:wght@300..800&display=swap",
		},
	},
	{
		value: "pathway-extreme",
		name: "Pathway Extreme",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Pathway Extreme', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Pathway_Extreme",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Pathway+Extreme:wght@100..900&display=swap",
		},
	},
	{
		value: "pathway-gothic-one",
		name: "Pathway Gothic One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Pathway Gothic One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Pathway_Gothic_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Pathway+Gothic+One&display=swap",
		},
	},
	{
		value: "pattaya",
		name: "Pattaya",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Pattaya', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Pattaya",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Pattaya&display=swap",
		},
	},
	{
		value: "pavanam",
		name: "Pavanam",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Pavanam', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Pavanam",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Pavanam&display=swap",
		},
	},
	{
		value: "paytone-one",
		name: "Paytone One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Paytone One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Paytone_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Paytone+One&display=swap",
		},
	},
	{
		value: "phetsarath",
		name: "Phetsarath",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Phetsarath', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Phetsarath",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Phetsarath:wght@400;700&display=swap",
		},
	},
	{
		value: "philosopher",
		name: "Philosopher",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Philosopher', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Philosopher",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Philosopher:wght@400;700&display=swap",
		},
	},
	{
		value: "play",
		name: "Play",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Play', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Play",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap",
		},
	},
	{
		value: "plus-jakarta-sans",
		name: "Plus Jakarta Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Plus Jakarta Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Plus_Jakarta_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200..800&display=swap",
		},
	},
	{
		value: "playfair-display",
		name: "Playfair Display",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Playfair Display', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Playfair_Display",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap",
		},
	},
	{
		value: "pontano-sans",
		name: "Pontano Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Pontano Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Pontano_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Pontano+Sans:wght@300..700&display=swap",
		},
	},
	{
		value: "poppins",
		name: "Poppins",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Poppins', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Poppins",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Poppins:wght@100..900&display=swap",
		},
	},
	{
		value: "port-lligat-sans",
		name: "Port Lligat Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Port Lligat Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Port_Lligat_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Port+Lligat+Sans&display=swap",
		},
	},
	{
		value: "pragati-narrow",
		name: "Pragati Narrow",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Pragati Narrow', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Pragati_Narrow",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Pragati+Narrow:wght@400;700&display=swap",
		},
	},
	{
		value: "preahvihear",
		name: "Preahvihear",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Preahvihear', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Preahvihear",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Preahvihear&display=swap",
		},
	},
	{
		value: "prompt",
		name: "Prompt",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Prompt', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Prompt",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Prompt:wght@100..900&display=swap",
		},
	},
	{
		value: "proza-libre",
		name: "Proza Libre",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Proza Libre', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Proza_Libre",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Proza+Libre:wght@400..800&display=swap",
		},
	},
	{
		value: "public-sans",
		name: "Public Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Public Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Public_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Public+Sans:wght@100..900&display=swap",
		},
	},
	{
		value: "puritan",
		name: "Puritan",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Puritan', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Puritan",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Puritan:wght@400;700&display=swap",
		},
	},
	{
		value: "qahiri",
		name: "Qahiri",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Qahiri', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Qahiri",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Qahiri&display=swap",
		},
	},
	{
		value: "quantico",
		name: "Quantico",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Quantico', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Quantico",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Quantico:wght@400;700&display=swap",
		},
	},
	{
		value: "quattrocento-sans",
		name: "Quattrocento Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Quattrocento Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Quattrocento_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Quattrocento+Sans:wght@400;700&display=swap",
		},
	},
	{
		value: "questrial",
		name: "Questrial",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Questrial', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Questrial",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Questrial&display=swap",
		},
	},
	{
		value: "quicksand",
		name: "Quicksand",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Quicksand', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Quicksand",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap",
		},
	},
	{
		value: "rem",
		name: "REM",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'REM', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "REM",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=REM:wght@100..900&display=swap",
		},
	},
	{
		value: "radio-canada",
		name: "Radio Canada",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Radio Canada', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Radio_Canada",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Radio+Canada:wght@300..700&display=swap",
		},
	},
	{
		value: "radio-canada-big",
		name: "Radio Canada Big",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Radio Canada Big', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Radio_Canada_Big",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Radio+Canada+Big:wght@400..700&display=swap",
		},
	},
	{
		value: "rajdhani",
		name: "Rajdhani",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Rajdhani', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Rajdhani",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rajdhani:wght@300..700&display=swap",
		},
	},
	{
		value: "ramabhadra",
		name: "Ramabhadra",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Ramabhadra', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Ramabhadra",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ramabhadra&display=swap",
		},
	},
	{
		value: "rambla",
		name: "Rambla",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Rambla', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Rambla",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rambla:wght@400;700&display=swap",
		},
	},
	{
		value: "rationale",
		name: "Rationale",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Rationale', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Rationale",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rationale&display=swap",
		},
	},
	{
		value: "readex-pro",
		name: "Readex Pro",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Readex Pro', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Readex_Pro",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Readex+Pro:wght@200..700&display=swap",
		},
	},
	{
		value: "recursive",
		name: "Recursive",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Recursive', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Recursive",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Recursive:wght@300..900&display=swap",
		},
	},
	{
		value: "red-hat-display",
		name: "Red Hat Display",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Red Hat Display', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Red_Hat_Display",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300..900&display=swap",
		},
	},
	{
		value: "red-hat-text",
		name: "Red Hat Text",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Red Hat Text', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Red_Hat_Text",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@300..700&display=swap",
		},
	},
	{
		value: "reddit-sans",
		name: "Reddit Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Reddit Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Reddit_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Reddit+Sans:wght@200..900&display=swap",
		},
	},
	{
		value: "reddit-sans-condensed",
		name: "Reddit Sans Condensed",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Reddit Sans Condensed', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Reddit_Sans_Condensed",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Reddit+Sans+Condensed:wght@200..900&display=swap",
		},
	},
	{
		value: "reem-kufi",
		name: "Reem Kufi",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Reem Kufi', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Reem_Kufi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Reem+Kufi:wght@400..700&display=swap",
		},
	},
	{
		value: "reem-kufi-fun",
		name: "Reem Kufi Fun",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Reem Kufi Fun', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Reem_Kufi_Fun",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Reem+Kufi+Fun:wght@400..700&display=swap",
		},
	},
	{
		value: "reem-kufi-ink",
		name: "Reem Kufi Ink",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Reem Kufi Ink', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Reem_Kufi_Ink",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Reem+Kufi+Ink&display=swap",
		},
	},
	{
		value: "rethink-sans",
		name: "Rethink Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Rethink Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Rethink_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rethink+Sans:wght@400..800&display=swap",
		},
	},
	{
		value: "roboto-condensed",
		name: "Roboto Condensed",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Roboto Condensed', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Roboto_Condensed",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@100..900&display=swap",
		},
	},
	{
		value: "roboto-flex",
		name: "Roboto Flex",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Roboto Flex', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Roboto_Flex",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Roboto+Flex&display=swap",
		},
	},
	{
		value: "rocknroll-one",
		name: "RocknRoll One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'RocknRoll One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "RocknRoll_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=RocknRoll+One&display=swap",
		},
	},
	{
		value: "ropa-sans",
		name: "Ropa Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Ropa Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Ropa_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ropa+Sans&display=swap",
		},
	},
	{
		value: "rosario",
		name: "Rosario",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Rosario', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Rosario",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rosario:wght@300..700&display=swap",
		},
	},
	{
		value: "rubik-mono-one",
		name: "Rubik Mono One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Rubik Mono One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Rubik_Mono_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap",
		},
	},
	{
		value: "ruda",
		name: "Ruda",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Ruda', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Ruda",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ruda:wght@400..900&display=swap",
		},
	},
	{
		value: "ruluko",
		name: "Ruluko",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Ruluko', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Ruluko",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ruluko&display=swap",
		},
	},
	{
		value: "rum-raisin",
		name: "Rum Raisin",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Rum Raisin', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Rum_Raisin",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rum+Raisin&display=swap",
		},
	},
	{
		value: "russo-one",
		name: "Russo One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Russo One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Russo_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Russo+One&display=swap",
		},
	},
	{
		value: "suse",
		name: "SUSE",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'SUSE', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "SUSE",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=SUSE:wght@100..900&display=swap",
		},
	},
	{
		value: "suse-mono",
		name: "SUSE Mono",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'SUSE Mono', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "SUSE_Mono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=SUSE+Mono:wght@100..800&display=swap",
		},
	},
	{
		value: "saira",
		name: "Saira",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Saira', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Saira",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Saira:wght@100..900&display=swap",
		},
	},
	{
		value: "saira-condensed",
		name: "Saira Condensed",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Saira Condensed', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Saira_Condensed",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@100..900&display=swap",
		},
	},
	{
		value: "saira-extra-condensed",
		name: "Saira Extra Condensed",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Saira Extra Condensed', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Saira_Extra_Condensed",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Saira+Extra+Condensed:wght@100..900&display=swap",
		},
	},
	{
		value: "saira-semi-condensed",
		name: "Saira Semi Condensed",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Saira Semi Condensed', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Saira_Semi_Condensed",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Saira+Semi+Condensed:wght@100..900&display=swap",
		},
	},
	{
		value: "sankofa-display",
		name: "Sankofa Display",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Sankofa Display', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Sankofa_Display",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sankofa+Display&display=swap",
		},
	},
	{
		value: "sansation",
		name: "Sansation",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Sansation', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Sansation",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sansation:wght@300;400;700&display=swap",
		},
	},
	{
		value: "sansita",
		name: "Sansita",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Sansita', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Sansita",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sansita:wght@400;700;800;900&display=swap",
		},
	},
	{
		value: "sarabun",
		name: "Sarabun",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Sarabun', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Sarabun",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sarabun:wght@100..800&display=swap",
		},
	},
	{
		value: "sarala",
		name: "Sarala",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Sarala', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Sarala",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sarala:wght@400;700&display=swap",
		},
	},
	{
		value: "sarpanch",
		name: "Sarpanch",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Sarpanch', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Sarpanch",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sarpanch:wght@400..900&display=swap",
		},
	},
	{
		value: "savate",
		name: "Savate",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Savate', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Savate",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Savate:wght@200..900&display=swap",
		},
	},
	{
		value: "sawarabi-gothic",
		name: "Sawarabi Gothic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Sawarabi Gothic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Sawarabi_Gothic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sawarabi+Gothic&display=swap",
		},
	},
	{
		value: "scada",
		name: "Scada",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Scada', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Scada",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Scada:wght@400;700&display=swap",
		},
	},
	{
		value: "schibsted-grotesk",
		name: "Schibsted Grotesk",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Schibsted Grotesk', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Schibsted_Grotesk",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400..900&display=swap",
		},
	},
	{
		value: "science-gothic",
		name: "Science Gothic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Science Gothic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Science_Gothic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Science+Gothic:wght@100..900&display=swap",
		},
	},
	{
		value: "secular-one",
		name: "Secular One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Secular One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Secular_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Secular+One&display=swap",
		},
	},
	{
		value: "sen",
		name: "Sen",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Sen', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Sen",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sen:wght@400..800&display=swap",
		},
	},
	{
		value: "seymour-one",
		name: "Seymour One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Seymour One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Seymour_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Seymour+One&display=swap",
		},
	},
	{
		value: "shanti",
		name: "Shanti",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Shanti', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Shanti",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Shanti&display=swap",
		},
	},
	{
		value: "share",
		name: "Share",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Share', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Share",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Share:wght@400;700&display=swap",
		},
	},
	{
		value: "share-tech",
		name: "Share Tech",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Share Tech', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Share_Tech",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Share+Tech&display=swap",
		},
	},
	{
		value: "shippori-antique",
		name: "Shippori Antique",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Shippori Antique', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Shippori_Antique",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Shippori+Antique&display=swap",
		},
	},
	{
		value: "shippori-antique-b1",
		name: "Shippori Antique B1",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Shippori Antique B1', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Shippori_Antique_B1",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Shippori+Antique+B1&display=swap",
		},
	},
	{
		value: "siemreap",
		name: "Siemreap",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Siemreap', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Siemreap",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Siemreap&display=swap",
		},
	},
	{
		value: "signika",
		name: "Signika",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Signika', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Signika",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Signika:wght@300..700&display=swap",
		},
	},
	{
		value: "signika-negative",
		name: "Signika Negative",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Signika Negative', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Signika_Negative",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Signika+Negative:wght@300..700&display=swap",
		},
	},
	{
		value: "sintony",
		name: "Sintony",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Sintony', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Sintony",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sintony:wght@400;700&display=swap",
		},
	},
	{
		value: "sirivennela",
		name: "Sirivennela",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Sirivennela', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Sirivennela",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sirivennela&display=swap",
		},
	},
	{
		value: "six-caps",
		name: "Six Caps",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Six Caps', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Six_Caps",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Six+Caps&display=swap",
		},
	},
	{
		value: "smooch-sans",
		name: "Smooch Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Smooch Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Smooch_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Smooch+Sans:wght@100..900&display=swap",
		},
	},
	{
		value: "snippet",
		name: "Snippet",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Snippet', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Snippet",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Snippet&display=swap",
		},
	},
	{
		value: "sofia-sans",
		name: "Sofia Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Sofia Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Sofia_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sofia+Sans:wght@100..900&display=swap",
		},
	},
	{
		value: "sofia-sans-condensed",
		name: "Sofia Sans Condensed",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Sofia Sans Condensed', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Sofia_Sans_Condensed",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sofia+Sans+Condensed:wght@100..900&display=swap",
		},
	},
	{
		value: "sofia-sans-extra-condensed",
		name: "Sofia Sans Extra Condensed",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Sofia Sans Extra Condensed', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Sofia_Sans_Extra_Condensed",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sofia+Sans+Extra+Condensed:wght@100..900&display=swap",
		},
	},
	{
		value: "sofia-sans-semi-condensed",
		name: "Sofia Sans Semi Condensed",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Sofia Sans Semi Condensed', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Sofia_Sans_Semi_Condensed",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sofia+Sans+Semi+Condensed:wght@100..900&display=swap",
		},
	},
	{
		value: "sono",
		name: "Sono",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Sono', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Sono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sono:wght@200..800&display=swap",
		},
	},
	{
		value: "sora",
		name: "Sora",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Sora', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Sora",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap",
		},
	},
	{
		value: "sour-gummy",
		name: "Sour Gummy",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Sour Gummy', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Sour_Gummy",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sour+Gummy:wght@100..900&display=swap",
		},
	},
	{
		value: "source-sans-3",
		name: "Source Sans 3",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Source Sans 3', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Source_Sans_3",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@200..900&display=swap",
		},
	},
	{
		value: "space-grotesk",
		name: "Space Grotesk",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Space Grotesk', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Space_Grotesk",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap",
		},
	},
	{
		value: "special-gothic",
		name: "Special Gothic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Special Gothic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Special_Gothic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Special+Gothic:wght@400..700&display=swap",
		},
	},
	{
		value: "special-gothic-condensed-one",
		name: "Special Gothic Condensed One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Special Gothic Condensed One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Special_Gothic_Condensed_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Special+Gothic+Condensed+One&display=swap",
		},
	},
	{
		value: "special-gothic-expanded-one",
		name: "Special Gothic Expanded One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Special Gothic Expanded One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Special_Gothic_Expanded_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Special+Gothic+Expanded+One&display=swap",
		},
	},
	{
		value: "spinnaker",
		name: "Spinnaker",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Spinnaker', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Spinnaker",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Spinnaker&display=swap",
		},
	},
	{
		value: "spline-sans",
		name: "Spline Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Spline Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Spline_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300..700&display=swap",
		},
	},
	{
		value: "stack-sans-headline",
		name: "Stack Sans Headline",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Stack Sans Headline', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Stack_Sans_Headline",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Stack+Sans+Headline:wght@200..700&display=swap",
		},
	},
	{
		value: "stack-sans-notch",
		name: "Stack Sans Notch",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Stack Sans Notch', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Stack_Sans_Notch",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Stack+Sans+Notch:wght@200..700&display=swap",
		},
	},
	{
		value: "stack-sans-text",
		name: "Stack Sans Text",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Stack Sans Text', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Stack_Sans_Text",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Stack+Sans+Text:wght@200..700&display=swap",
		},
	},
	{
		value: "stick",
		name: "Stick",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Stick', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Stick",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Stick&display=swap",
		},
	},
	{
		value: "stick-no-bills",
		name: "Stick No Bills",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Stick No Bills', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Stick_No_Bills",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Stick+No+Bills:wght@200..800&display=swap",
		},
	},
	{
		value: "story-script",
		name: "Story Script",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Story Script', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Story_Script",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Story+Script&display=swap",
		},
	},
	{
		value: "strait",
		name: "Strait",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Strait', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Strait",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Strait&display=swap",
		},
	},
	{
		value: "stylish",
		name: "Stylish",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Stylish', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Stylish",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Stylish&display=swap",
		},
	},
	{
		value: "sulphur-point",
		name: "Sulphur Point",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Sulphur Point', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Sulphur_Point",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sulphur+Point:wght@300;400;700&display=swap",
		},
	},
	{
		value: "sunflower",
		name: "Sunflower",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Sunflower', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Sunflower",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sunflower:wght@300;500;700&display=swap",
		},
	},
	{
		value: "syncopate",
		name: "Syncopate",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Syncopate', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Syncopate",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&display=swap",
		},
	},
	{
		value: "syne",
		name: "Syne",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Syne', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Syne",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Syne:wght@400..800&display=swap",
		},
	},
	{
		value: "tasa-explorer",
		name: "TASA Explorer",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'TASA Explorer', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "TASA_Explorer",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=TASA+Explorer:wght@400..800&display=swap",
		},
	},
	{
		value: "tasa-orbiter",
		name: "TASA Orbiter",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'TASA Orbiter', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "TASA_Orbiter",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=TASA+Orbiter:wght@400..800&display=swap",
		},
	},
	{
		value: "tac-one",
		name: "Tac One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Tac One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Tac_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Tac+One&display=swap",
		},
	},
	{
		value: "tajawal",
		name: "Tajawal",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Tajawal', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Tajawal",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap",
		},
	},
	{
		value: "tauri",
		name: "Tauri",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Tauri', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Tauri",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Tauri&display=swap",
		},
	},
	{
		value: "teachers",
		name: "Teachers",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Teachers', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Teachers",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Teachers:wght@400..800&display=swap",
		},
	},
	{
		value: "teko",
		name: "Teko",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Teko', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Teko",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Teko:wght@300..700&display=swap",
		},
	},
	{
		value: "telex",
		name: "Telex",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Telex', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Telex",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Telex&display=swap",
		},
	},
	{
		value: "tenali-ramakrishna",
		name: "Tenali Ramakrishna",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Tenali Ramakrishna', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Tenali_Ramakrishna",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Tenali+Ramakrishna&display=swap",
		},
	},
	{
		value: "tenor-sans",
		name: "Tenor Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Tenor Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Tenor_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Tenor+Sans&display=swap",
		},
	},
	{
		value: "text-me-one",
		name: "Text Me One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Text Me One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Text_Me_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Text+Me+One&display=swap",
		},
	},
	{
		value: "thasadith",
		name: "Thasadith",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Thasadith', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Thasadith",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Thasadith:wght@400;700&display=swap",
		},
	},
	{
		value: "tiktok-sans",
		name: "TikTok Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'TikTok Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "TikTok_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=TikTok+Sans:wght@300..900&display=swap",
		},
	},
	{
		value: "timmana",
		name: "Timmana",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Timmana', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Timmana",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Timmana&display=swap",
		},
	},
	{
		value: "tiny5",
		name: "Tiny5",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Tiny5', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Tiny5",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Tiny5&display=swap",
		},
	},
	{
		value: "tirra",
		name: "Tirra",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Tirra', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Tirra",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Tirra:wght@400..900&display=swap",
		},
	},
	{
		value: "titillium-web",
		name: "Titillium Web",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Titillium Web', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Titillium_Web",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200;300;400;600;700;900&display=swap",
		},
	},
	{
		value: "tomorrow",
		name: "Tomorrow",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Tomorrow', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Tomorrow",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Tomorrow:wght@100..900&display=swap",
		},
	},
	{
		value: "trispace",
		name: "Trispace",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Trispace', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Trispace",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Trispace:wght@100..800&display=swap",
		},
	},
	{
		value: "truculenta",
		name: "Truculenta",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Truculenta', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Truculenta",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Truculenta:wght@100..900&display=swap",
		},
	},
	{
		value: "tsukimi-rounded",
		name: "Tsukimi Rounded",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Tsukimi Rounded', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Tsukimi_Rounded",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Tsukimi+Rounded:wght@300..700&display=swap",
		},
	},
	{
		value: "tuffy",
		name: "Tuffy",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Tuffy', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Tuffy",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Tuffy:wght@400;700&display=swap",
		},
	},
	{
		value: "ubuntu",
		name: "Ubuntu",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Ubuntu', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Ubuntu",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap",
		},
	},
	{
		value: "ubuntu-condensed",
		name: "Ubuntu Condensed",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Ubuntu Condensed', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Ubuntu_Condensed",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ubuntu+Condensed&display=swap",
		},
	},
	{
		value: "ubuntu-sans",
		name: "Ubuntu Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Ubuntu Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Ubuntu_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ubuntu+Sans:wght@100..800&display=swap",
		},
	},
	{
		value: "unbounded",
		name: "Unbounded",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Unbounded', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Unbounded",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Unbounded:wght@200..900&display=swap",
		},
	},
	{
		value: "urbanist",
		name: "Urbanist",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Urbanist', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Urbanist",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Urbanist:wght@100..900&display=swap",
		},
	},
	{
		value: "varela",
		name: "Varela",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Varela', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Varela",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Varela&display=swap",
		},
	},
	{
		value: "varela-round",
		name: "Varela Round",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Varela Round', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Varela_Round",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Varela+Round&display=swap",
		},
	},
	{
		value: "varta",
		name: "Varta",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Varta', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Varta",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Varta:wght@300..700&display=swap",
		},
	},
	{
		value: "vazirmatn",
		name: "Vazirmatn",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Vazirmatn', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Vazirmatn",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap",
		},
	},
	{
		value: "vend-sans",
		name: "Vend Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Vend Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Vend_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Vend+Sans:wght@300..700&display=swap",
		},
	},
	{
		value: "viga",
		name: "Viga",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Viga', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Viga",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Viga&display=swap",
		},
	},
	{
		value: "voces",
		name: "Voces",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Voces', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Voces",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Voces&display=swap",
		},
	},
	{
		value: "voltaire",
		name: "Voltaire",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Voltaire', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Voltaire",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Voltaire&display=swap",
		},
	},
	{
		value: "wdxl-lubrifont-jp-n",
		name: "WDXL Lubrifont JP N",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'WDXL Lubrifont JP N', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "WDXL_Lubrifont_JP_N",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=WDXL+Lubrifont+JP+N&display=swap",
		},
	},
	{
		value: "wdxl-lubrifont-sc",
		name: "WDXL Lubrifont SC",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'WDXL Lubrifont SC', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "WDXL_Lubrifont_SC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=WDXL+Lubrifont+SC&display=swap",
		},
	},
	{
		value: "wdxl-lubrifont-tc",
		name: "WDXL Lubrifont TC",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'WDXL Lubrifont TC', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "WDXL_Lubrifont_TC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=WDXL+Lubrifont+TC&display=swap",
		},
	},
	{
		value: "wendy-one",
		name: "Wendy One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Wendy One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Wendy_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Wendy+One&display=swap",
		},
	},
	{
		value: "winky-rough",
		name: "Winky Rough",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Winky Rough', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Winky_Rough",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Winky+Rough:wght@300..900&display=swap",
		},
	},
	{
		value: "winky-sans",
		name: "Winky Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Winky Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Winky_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Winky+Sans:wght@300..900&display=swap",
		},
	},
	{
		value: "wire-one",
		name: "Wire One",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Wire One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Wire_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Wire+One&display=swap",
		},
	},
	{
		value: "wix-madefor-display",
		name: "Wix Madefor Display",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Wix Madefor Display', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Wix_Madefor_Display",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Wix+Madefor+Display:wght@400..800&display=swap",
		},
	},
	{
		value: "wix-madefor-text",
		name: "Wix Madefor Text",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Wix Madefor Text', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Wix_Madefor_Text",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Wix+Madefor+Text:wght@400..800&display=swap",
		},
	},
	{
		value: "yaldevi",
		name: "Yaldevi",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Yaldevi', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Yaldevi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Yaldevi:wght@200..700&display=swap",
		},
	},
	{
		value: "yanone-kaffeesatz",
		name: "Yanone Kaffeesatz",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Yanone Kaffeesatz', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Yanone_Kaffeesatz",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Yanone+Kaffeesatz:wght@200..700&display=swap",
		},
	},
	{
		value: "yantramanav",
		name: "Yantramanav",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Yantramanav', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Yantramanav",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Yantramanav:wght@100;300;400;500;700;900&display=swap",
		},
	},
	{
		value: "ysabeau",
		name: "Ysabeau",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Ysabeau', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Ysabeau",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ysabeau:wght@100..900&display=swap",
		},
	},
	{
		value: "ysabeau-infant",
		name: "Ysabeau Infant",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Ysabeau Infant', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Ysabeau_Infant",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ysabeau+Infant:wght@100..900&display=swap",
		},
	},
	{
		value: "ysabeau-office",
		name: "Ysabeau Office",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Ysabeau Office', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Ysabeau_Office",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ysabeau+Office:wght@100..900&display=swap",
		},
	},
	{
		value: "ysabeau-sc",
		name: "Ysabeau SC",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Ysabeau SC', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Ysabeau_SC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ysabeau+SC:wght@100..900&display=swap",
		},
	},
	{
		value: "yusei-magic",
		name: "Yusei Magic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Yusei Magic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Yusei_Magic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Yusei+Magic&display=swap",
		},
	},
	{
		value: "zcool-kuaile",
		name: "ZCOOL KuaiLe",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'ZCOOL KuaiLe', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "ZCOOL_KuaiLe",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&display=swap",
		},
	},
	{
		value: "zcool-qingke-huangyou",
		name: "ZCOOL QingKe HuangYou",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'ZCOOL QingKe HuangYou', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "ZCOOL_QingKe_HuangYou",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=ZCOOL+QingKe+HuangYou&display=swap",
		},
	},
	{
		value: "zcool-xiaowei",
		name: "ZCOOL XiaoWei",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'ZCOOL XiaoWei', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "ZCOOL_XiaoWei",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&display=swap",
		},
	},
	{
		value: "zain",
		name: "Zain",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Zain', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Zain",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Zain:wght@200;300;400;700;800;900&display=swap",
		},
	},
	{
		value: "zalando-sans",
		name: "Zalando Sans",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Zalando Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Zalando_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Zalando+Sans:wght@200..900&display=swap",
		},
	},
	{
		value: "zalando-sans-expanded",
		name: "Zalando Sans Expanded",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Zalando Sans Expanded', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Zalando_Sans_Expanded",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Zalando+Sans+Expanded:wght@200..900&display=swap",
		},
	},
	{
		value: "zalando-sans-semiexpanded",
		name: "Zalando Sans SemiExpanded",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Zalando Sans SemiExpanded', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Zalando_Sans_SemiExpanded",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Zalando+Sans+SemiExpanded:wght@200..900&display=swap",
		},
	},
	{
		value: "zen-kaku-gothic-antique",
		name: "Zen Kaku Gothic Antique",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Zen Kaku Gothic Antique', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Zen_Kaku_Gothic_Antique",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+Antique:wght@300;400;500;700;900&display=swap",
		},
	},
	{
		value: "zen-kaku-gothic-new",
		name: "Zen Kaku Gothic New",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Zen Kaku Gothic New', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Zen_Kaku_Gothic_New",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@300;400;500;700;900&display=swap",
		},
	},
	{
		value: "zen-kurenaido",
		name: "Zen Kurenaido",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Zen Kurenaido', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Zen_Kurenaido",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Zen+Kurenaido&display=swap",
		},
	},
	{
		value: "zen-maru-gothic",
		name: "Zen Maru Gothic",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Zen Maru Gothic', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Zen_Maru_Gothic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@300;400;500;700;900&display=swap",
		},
	},
	{
		value: "adlam-display",
		name: "ADLaM Display",
		type: "registry:font",
		category: "display",
		font: {
			family: "'ADLaM Display', sans-serif",
			provider: "google",
			subsets: ["adlam", "latin", "latin-ext"],
			import: "ADLaM_Display",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=ADLaM+Display&display=swap",
		},
	},
	{
		value: "abhaya-libre",
		name: "Abhaya Libre",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Abhaya Libre', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "sinhala"],
			import: "Abhaya_Libre",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Abhaya+Libre&display=swap",
		},
	},
	{
		value: "aboreto",
		name: "Aboreto",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Aboreto', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Aboreto",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Aboreto&display=swap",
		},
	},
	{
		value: "abril-fatface",
		name: "Abril Fatface",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Abril Fatface', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Abril_Fatface",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap",
		},
	},
	{
		value: "abyssinica-sil",
		name: "Abyssinica SIL",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Abyssinica SIL', serif",
			provider: "google",
			subsets: ["ethiopic", "latin", "latin-ext"],
			import: "Abyssinica_SIL",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Abyssinica+SIL&display=swap",
		},
	},
	{
		value: "adamina",
		name: "Adamina",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Adamina', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Adamina",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Adamina&display=swap",
		},
	},
	{
		value: "aguafina-script",
		name: "Aguafina Script",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Aguafina Script', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Aguafina_Script",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Aguafina+Script&display=swap",
		},
	},
	{
		value: "akaya-kanadaka",
		name: "Akaya Kanadaka",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Akaya Kanadaka', sans-serif",
			provider: "google",
			subsets: ["kannada", "latin", "latin-ext"],
			import: "Akaya_Kanadaka",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Akaya+Kanadaka&display=swap",
		},
	},
	{
		value: "akaya-telivigala",
		name: "Akaya Telivigala",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Akaya Telivigala', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "telugu"],
			import: "Akaya_Telivigala",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Akaya+Telivigala&display=swap",
		},
	},
	{
		value: "akronim",
		name: "Akronim",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Akronim', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Akronim",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Akronim&display=swap",
		},
	},
	{
		value: "aladin",
		name: "Aladin",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Aladin', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Aladin",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Aladin&display=swap",
		},
	},
	{
		value: "alegreya",
		name: "Alegreya",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Alegreya', serif",
			provider: "google",
			subsets: [
				"cyrillic",
				"cyrillic-ext",
				"greek",
				"greek-ext",
				"latin",
				"latin-ext",
				"vietnamese",
			],
			import: "Alegreya",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Alegreya&display=swap",
		},
	},
	{
		value: "alegreya-sc",
		name: "Alegreya SC",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Alegreya SC', serif",
			provider: "google",
			subsets: [
				"cyrillic",
				"cyrillic-ext",
				"greek",
				"greek-ext",
				"latin",
				"latin-ext",
				"vietnamese",
			],
			import: "Alegreya_SC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Alegreya+SC&display=swap",
		},
	},
	{
		value: "aleo",
		name: "Aleo",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Aleo', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Aleo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Aleo&display=swap",
		},
	},
	{
		value: "alex-brush",
		name: "Alex Brush",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Alex Brush', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Alex_Brush",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Alex+Brush&display=swap",
		},
	},
	{
		value: "alfa-slab-one",
		name: "Alfa Slab One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Alfa Slab One', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Alfa_Slab_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap",
		},
	},
	{
		value: "alice",
		name: "Alice",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Alice', serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
			import: "Alice",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Alice&display=swap",
		},
	},
	{
		value: "alike",
		name: "Alike",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Alike', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Alike",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Alike&display=swap",
		},
	},
	{
		value: "alike-angular",
		name: "Alike Angular",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Alike Angular', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Alike_Angular",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Alike+Angular&display=swap",
		},
	},
	{
		value: "alkalami",
		name: "Alkalami",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Alkalami', serif",
			provider: "google",
			subsets: ["arabic", "latin", "latin-ext"],
			import: "Alkalami",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Alkalami&display=swap",
		},
	},
	{
		value: "alkatra",
		name: "Alkatra",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Alkatra', sans-serif",
			provider: "google",
			subsets: ["bengali", "devanagari", "latin", "latin-ext", "oriya"],
			import: "Alkatra",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Alkatra&display=swap",
		},
	},
	{
		value: "allan",
		name: "Allan",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Allan', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Allan",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Allan&display=swap",
		},
	},
	{
		value: "allison",
		name: "Allison",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Allison', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Allison",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Allison&display=swap",
		},
	},
	{
		value: "allura",
		name: "Allura",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Allura', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Allura",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Allura&display=swap",
		},
	},
	{
		value: "almendra",
		name: "Almendra",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Almendra', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Almendra",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Almendra&display=swap",
		},
	},
	{
		value: "almendra-display",
		name: "Almendra Display",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Almendra Display', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Almendra_Display",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Almendra+Display&display=swap",
		},
	},
	{
		value: "almendra-sc",
		name: "Almendra SC",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Almendra SC', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Almendra_SC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Almendra+SC&display=swap",
		},
	},
	{
		value: "alumni-sans-inline-one",
		name: "Alumni Sans Inline One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Alumni Sans Inline One', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Alumni_Sans_Inline_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Alumni+Sans+Inline+One&display=swap",
		},
	},
	{
		value: "amarante",
		name: "Amarante",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Amarante', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Amarante",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Amarante&display=swap",
		},
	},
	{
		value: "amatic-sc",
		name: "Amatic SC",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Amatic SC', cursive",
			provider: "google",
			subsets: ["cyrillic", "hebrew", "latin", "latin-ext", "vietnamese"],
			import: "Amatic_SC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Amatic+SC&display=swap",
		},
	},
	{
		value: "amethysta",
		name: "Amethysta",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Amethysta', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Amethysta",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Amethysta&display=swap",
		},
	},
	{
		value: "amiri",
		name: "Amiri",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Amiri', serif",
			provider: "google",
			subsets: ["arabic", "latin", "latin-ext"],
			import: "Amiri",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Amiri&display=swap",
		},
	},
	{
		value: "amiri-quran",
		name: "Amiri Quran",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Amiri Quran', serif",
			provider: "google",
			subsets: ["arabic", "latin"],
			import: "Amiri_Quran",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Amiri+Quran&display=swap",
		},
	},
	{
		value: "amita",
		name: "Amita",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Amita', cursive",
			provider: "google",
			subsets: ["devanagari", "latin", "latin-ext"],
			import: "Amita",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Amita&display=swap",
		},
	},
	{
		value: "andada-pro",
		name: "Andada Pro",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Andada Pro', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Andada_Pro",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Andada+Pro&display=swap",
		},
	},
	{
		value: "angkor",
		name: "Angkor",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Angkor', sans-serif",
			provider: "google",
			subsets: ["khmer", "latin"],
			import: "Angkor",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Angkor&display=swap",
		},
	},
	{
		value: "annie-use-your-telescope",
		name: "Annie Use Your Telescope",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Annie Use Your Telescope', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Annie_Use_Your_Telescope",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Annie+Use+Your+Telescope&display=swap",
		},
	},
	{
		value: "anonymous-pro",
		name: "Anonymous Pro",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Anonymous Pro', monospace",
			provider: "google",
			subsets: ["cyrillic", "greek", "latin", "latin-ext"],
			import: "Anonymous_Pro",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Anonymous+Pro&display=swap",
		},
	},
	{
		value: "antic-didone",
		name: "Antic Didone",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Antic Didone', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Antic_Didone",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Antic+Didone&display=swap",
		},
	},
	{
		value: "antic-slab",
		name: "Antic Slab",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Antic Slab', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Antic_Slab",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Antic+Slab&display=swap",
		},
	},
	{
		value: "anybody",
		name: "Anybody",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Anybody', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Anybody",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Anybody&display=swap",
		},
	},
	{
		value: "aoboshi-one",
		name: "Aoboshi One",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Aoboshi One', serif",
			provider: "google",
			subsets: ["japanese", "latin", "latin-ext"],
			import: "Aoboshi_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Aoboshi+One&display=swap",
		},
	},
	{
		value: "arapey",
		name: "Arapey",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Arapey', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Arapey",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Arapey&display=swap",
		},
	},
	{
		value: "arbutus",
		name: "Arbutus",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Arbutus', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Arbutus",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Arbutus&display=swap",
		},
	},
	{
		value: "arbutus-slab",
		name: "Arbutus Slab",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Arbutus Slab', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Arbutus_Slab",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Arbutus+Slab&display=swap",
		},
	},
	{
		value: "are-you-serious",
		name: "Are You Serious",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Are You Serious', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Are_You_Serious",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Are+You+Serious&display=swap",
		},
	},
	{
		value: "aref-ruqaa",
		name: "Aref Ruqaa",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Aref Ruqaa', serif",
			provider: "google",
			subsets: ["arabic", "latin", "latin-ext"],
			import: "Aref_Ruqaa",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Aref+Ruqaa&display=swap",
		},
	},
	{
		value: "aref-ruqaa-ink",
		name: "Aref Ruqaa Ink",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Aref Ruqaa Ink', serif",
			provider: "google",
			subsets: ["arabic", "latin", "latin-ext"],
			import: "Aref_Ruqaa_Ink",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Aref+Ruqaa+Ink&display=swap",
		},
	},
	{
		value: "arima",
		name: "Arima",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Arima', sans-serif",
			provider: "google",
			subsets: [
				"greek",
				"greek-ext",
				"latin",
				"latin-ext",
				"malayalam",
				"tamil",
				"vietnamese",
			],
			import: "Arima",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Arima&display=swap",
		},
	},
	{
		value: "arima-madurai",
		name: "Arima Madurai",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Arima Madurai', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "tamil", "vietnamese"],
			import: "Arima_Madurai",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Arima+Madurai&display=swap",
		},
	},
	{
		value: "arizonia",
		name: "Arizonia",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Arizonia', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Arizonia",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Arizonia&display=swap",
		},
	},
	{
		value: "artifika",
		name: "Artifika",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Artifika', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Artifika",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Artifika&display=swap",
		},
	},
	{
		value: "arvo",
		name: "Arvo",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Arvo', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Arvo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Arvo&display=swap",
		},
	},
	{
		value: "asar",
		name: "Asar",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Asar', serif",
			provider: "google",
			subsets: ["devanagari", "latin", "latin-ext"],
			import: "Asar",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Asar&display=swap",
		},
	},
	{
		value: "asset",
		name: "Asset",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Asset', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Asset",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Asset&display=swap",
		},
	},
	{
		value: "astloch",
		name: "Astloch",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Astloch', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Astloch",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Astloch&display=swap",
		},
	},
	{
		value: "asul",
		name: "Asul",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Asul', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Asul",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Asul&display=swap",
		},
	},
	{
		value: "atma",
		name: "Atma",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Atma', sans-serif",
			provider: "google",
			subsets: ["bengali", "latin", "latin-ext"],
			import: "Atma",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Atma&display=swap",
		},
	},
	{
		value: "atomic-age",
		name: "Atomic Age",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Atomic Age', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Atomic_Age",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Atomic+Age&display=swap",
		},
	},
	{
		value: "aubrey",
		name: "Aubrey",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Aubrey', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Aubrey",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Aubrey&display=swap",
		},
	},
	{
		value: "audiowide",
		name: "Audiowide",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Audiowide', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Audiowide",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Audiowide&display=swap",
		},
	},
	{
		value: "autour-one",
		name: "Autour One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Autour One', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Autour_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Autour+One&display=swap",
		},
	},
	{
		value: "average",
		name: "Average",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Average', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Average",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Average&display=swap",
		},
	},
	{
		value: "averia-gruesa-libre",
		name: "Averia Gruesa Libre",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Averia Gruesa Libre', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Averia_Gruesa_Libre",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Averia+Gruesa+Libre&display=swap",
		},
	},
	{
		value: "averia-libre",
		name: "Averia Libre",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Averia Libre', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Averia_Libre",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Averia+Libre&display=swap",
		},
	},
	{
		value: "averia-sans-libre",
		name: "Averia Sans Libre",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Averia Sans Libre', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Averia_Sans_Libre",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Averia+Sans+Libre&display=swap",
		},
	},
	{
		value: "averia-serif-libre",
		name: "Averia Serif Libre",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Averia Serif Libre', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Averia_Serif_Libre",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Averia+Serif+Libre&display=swap",
		},
	},
	{
		value: "azeret-mono",
		name: "Azeret Mono",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Azeret Mono', monospace",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Azeret_Mono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Azeret+Mono&display=swap",
		},
	},
	{
		value: "b612-mono",
		name: "B612 Mono",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'B612 Mono', monospace",
			provider: "google",
			subsets: ["latin"],
			import: "B612_Mono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=B612+Mono&display=swap",
		},
	},
	{
		value: "biz-udmincho",
		name: "BIZ UDMincho",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'BIZ UDMincho', serif",
			provider: "google",
			subsets: ["cyrillic", "greek-ext", "japanese", "latin", "latin-ext"],
			import: "BIZ_UDMincho",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=BIZ+UDMincho&display=swap",
		},
	},
	{
		value: "biz-udpmincho",
		name: "BIZ UDPMincho",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'BIZ UDPMincho', serif",
			provider: "google",
			subsets: ["cyrillic", "greek-ext", "japanese", "latin", "latin-ext"],
			import: "BIZ_UDPMincho",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=BIZ+UDPMincho&display=swap",
		},
	},
	{
		value: "babylonica",
		name: "Babylonica",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Babylonica', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Babylonica",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Babylonica&display=swap",
		},
	},
	{
		value: "bacasime-antique",
		name: "Bacasime Antique",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Bacasime Antique', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Bacasime_Antique",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bacasime+Antique&display=swap",
		},
	},
	{
		value: "bad-script",
		name: "Bad Script",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Bad Script', cursive",
			provider: "google",
			subsets: ["cyrillic", "latin"],
			import: "Bad_Script",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bad+Script&display=swap",
		},
	},
	{
		value: "bagel-fat-one",
		name: "Bagel Fat One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Bagel Fat One', sans-serif",
			provider: "google",
			subsets: ["korean", "latin", "latin-ext"],
			import: "Bagel_Fat_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bagel+Fat+One&display=swap",
		},
	},
	{
		value: "bahiana",
		name: "Bahiana",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Bahiana', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Bahiana",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bahiana&display=swap",
		},
	},
	{
		value: "bahianita",
		name: "Bahianita",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Bahianita', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Bahianita",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bahianita&display=swap",
		},
	},
	{
		value: "bakbak-one",
		name: "Bakbak One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Bakbak One', sans-serif",
			provider: "google",
			subsets: ["devanagari", "latin", "latin-ext"],
			import: "Bakbak_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bakbak+One&display=swap",
		},
	},
	{
		value: "ballet",
		name: "Ballet",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Ballet', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Ballet",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ballet&display=swap",
		},
	},
	{
		value: "baloo-2",
		name: "Baloo 2",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Baloo 2', sans-serif",
			provider: "google",
			subsets: ["devanagari", "latin", "latin-ext", "vietnamese"],
			import: "Baloo_2",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Baloo+2&display=swap",
		},
	},
	{
		value: "baloo-bhai-2",
		name: "Baloo Bhai 2",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Baloo Bhai 2', sans-serif",
			provider: "google",
			subsets: ["gujarati", "latin", "latin-ext", "vietnamese"],
			import: "Baloo_Bhai_2",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Baloo+Bhai+2&display=swap",
		},
	},
	{
		value: "baloo-bhaijaan-2",
		name: "Baloo Bhaijaan 2",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Baloo Bhaijaan 2', sans-serif",
			provider: "google",
			subsets: ["arabic", "latin", "latin-ext", "vietnamese"],
			import: "Baloo_Bhaijaan_2",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2&display=swap",
		},
	},
	{
		value: "baloo-bhaina-2",
		name: "Baloo Bhaina 2",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Baloo Bhaina 2', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "oriya", "vietnamese"],
			import: "Baloo_Bhaina_2",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Baloo+Bhaina+2&display=swap",
		},
	},
	{
		value: "baloo-chettan-2",
		name: "Baloo Chettan 2",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Baloo Chettan 2', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "malayalam", "vietnamese"],
			import: "Baloo_Chettan_2",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Baloo+Chettan+2&display=swap",
		},
	},
	{
		value: "baloo-da-2",
		name: "Baloo Da 2",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Baloo Da 2', sans-serif",
			provider: "google",
			subsets: ["bengali", "latin", "latin-ext", "vietnamese"],
			import: "Baloo_Da_2",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Baloo+Da+2&display=swap",
		},
	},
	{
		value: "baloo-paaji-2",
		name: "Baloo Paaji 2",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Baloo Paaji 2', sans-serif",
			provider: "google",
			subsets: ["gurmukhi", "latin", "latin-ext", "vietnamese"],
			import: "Baloo_Paaji_2",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Baloo+Paaji+2&display=swap",
		},
	},
	{
		value: "baloo-tamma-2",
		name: "Baloo Tamma 2",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Baloo Tamma 2', sans-serif",
			provider: "google",
			subsets: ["kannada", "latin", "latin-ext", "vietnamese"],
			import: "Baloo_Tamma_2",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Baloo+Tamma+2&display=swap",
		},
	},
	{
		value: "baloo-tammudu-2",
		name: "Baloo Tammudu 2",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Baloo Tammudu 2', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "telugu", "vietnamese"],
			import: "Baloo_Tammudu_2",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Baloo+Tammudu+2&display=swap",
		},
	},
	{
		value: "baloo-thambi-2",
		name: "Baloo Thambi 2",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Baloo Thambi 2', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "tamil", "vietnamese"],
			import: "Baloo_Thambi_2",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Baloo+Thambi+2&display=swap",
		},
	},
	{
		value: "balsamiq-sans",
		name: "Balsamiq Sans",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Balsamiq Sans', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
			import: "Balsamiq_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Balsamiq+Sans&display=swap",
		},
	},
	{
		value: "balthazar",
		name: "Balthazar",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Balthazar', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Balthazar",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Balthazar&display=swap",
		},
	},
	{
		value: "bangers",
		name: "Bangers",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Bangers', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Bangers",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bangers&display=swap",
		},
	},
	{
		value: "barriecito",
		name: "Barriecito",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Barriecito', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Barriecito",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Barriecito&display=swap",
		},
	},
	{
		value: "barrio",
		name: "Barrio",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Barrio', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Barrio",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Barrio&display=swap",
		},
	},
	{
		value: "baskervville",
		name: "Baskervville",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Baskervville', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Baskervville",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Baskervville&display=swap",
		},
	},
	{
		value: "battambang",
		name: "Battambang",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Battambang', sans-serif",
			provider: "google",
			subsets: ["khmer", "latin"],
			import: "Battambang",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Battambang&display=swap",
		},
	},
	{
		value: "baumans",
		name: "Baumans",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Baumans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Baumans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Baumans&display=swap",
		},
	},
	{
		value: "beau-rivage",
		name: "Beau Rivage",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Beau Rivage', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Beau_Rivage",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Beau+Rivage&display=swap",
		},
	},
	{
		value: "belgrano",
		name: "Belgrano",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Belgrano', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Belgrano",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Belgrano&display=swap",
		},
	},
	{
		value: "bellefair",
		name: "Bellefair",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Bellefair', serif",
			provider: "google",
			subsets: ["hebrew", "latin", "latin-ext"],
			import: "Bellefair",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bellefair&display=swap",
		},
	},
	{
		value: "bellota",
		name: "Bellota",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Bellota', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "latin", "latin-ext", "vietnamese"],
			import: "Bellota",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bellota&display=swap",
		},
	},
	{
		value: "bellota-text",
		name: "Bellota Text",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Bellota Text', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "latin", "latin-ext", "vietnamese"],
			import: "Bellota_Text",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bellota+Text&display=swap",
		},
	},
	{
		value: "benne",
		name: "Benne",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Benne', serif",
			provider: "google",
			subsets: ["kannada", "latin", "latin-ext"],
			import: "Benne",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Benne&display=swap",
		},
	},
	{
		value: "bentham",
		name: "Bentham",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Bentham', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Bentham",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bentham&display=swap",
		},
	},
	{
		value: "berkshire-swash",
		name: "Berkshire Swash",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Berkshire Swash', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Berkshire_Swash",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Berkshire+Swash&display=swap",
		},
	},
	{
		value: "besley",
		name: "Besley",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Besley', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Besley",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Besley&display=swap",
		},
	},
	{
		value: "beth-ellen",
		name: "Beth Ellen",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Beth Ellen', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Beth_Ellen",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Beth+Ellen&display=swap",
		},
	},
	{
		value: "bevan",
		name: "Bevan",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Bevan', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Bevan",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bevan&display=swap",
		},
	},
	{
		value: "bhutuka-expanded-one",
		name: "BhuTuka Expanded One",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'BhuTuka Expanded One', serif",
			provider: "google",
			subsets: ["gurmukhi", "latin", "latin-ext"],
			import: "BhuTuka_Expanded_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=BhuTuka+Expanded+One&display=swap",
		},
	},
	{
		value: "big-shoulders-display",
		name: "Big Shoulders Display",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Big Shoulders Display', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Big_Shoulders_Display",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Big+Shoulders+Display&display=swap",
		},
	},
	{
		value: "big-shoulders-inline-display",
		name: "Big Shoulders Inline Display",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Big Shoulders Inline Display', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Big_Shoulders_Inline_Display",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Big+Shoulders+Inline+Display&display=swap",
		},
	},
	{
		value: "big-shoulders-inline-text",
		name: "Big Shoulders Inline Text",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Big Shoulders Inline Text', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Big_Shoulders_Inline_Text",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Big+Shoulders+Inline+Text&display=swap",
		},
	},
	{
		value: "big-shoulders-stencil-display",
		name: "Big Shoulders Stencil Display",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Big Shoulders Stencil Display', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Big_Shoulders_Stencil_Display",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Big+Shoulders+Stencil+Display&display=swap",
		},
	},
	{
		value: "big-shoulders-stencil-text",
		name: "Big Shoulders Stencil Text",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Big Shoulders Stencil Text', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Big_Shoulders_Stencil_Text",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Big+Shoulders+Stencil+Text&display=swap",
		},
	},
	{
		value: "big-shoulders-text",
		name: "Big Shoulders Text",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Big Shoulders Text', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Big_Shoulders_Text",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Big+Shoulders+Text&display=swap",
		},
	},
	{
		value: "bigelow-rules",
		name: "Bigelow Rules",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Bigelow Rules', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Bigelow_Rules",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bigelow+Rules&display=swap",
		},
	},
	{
		value: "bigshot-one",
		name: "Bigshot One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Bigshot One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Bigshot_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bigshot+One&display=swap",
		},
	},
	{
		value: "bilbo",
		name: "Bilbo",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Bilbo', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Bilbo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bilbo&display=swap",
		},
	},
	{
		value: "bilbo-swash-caps",
		name: "Bilbo Swash Caps",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Bilbo Swash Caps', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Bilbo_Swash_Caps",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bilbo+Swash+Caps&display=swap",
		},
	},
	{
		value: "biorhyme",
		name: "BioRhyme",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'BioRhyme', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "BioRhyme",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=BioRhyme&display=swap",
		},
	},
	{
		value: "biorhyme-expanded",
		name: "BioRhyme Expanded",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'BioRhyme Expanded', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "BioRhyme_Expanded",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=BioRhyme+Expanded&display=swap",
		},
	},
	{
		value: "birthstone",
		name: "Birthstone",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Birthstone', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Birthstone",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Birthstone&display=swap",
		},
	},
	{
		value: "birthstone-bounce",
		name: "Birthstone Bounce",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Birthstone Bounce', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Birthstone_Bounce",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Birthstone+Bounce&display=swap",
		},
	},
	{
		value: "bitter",
		name: "Bitter",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Bitter', serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
			import: "Bitter",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bitter&display=swap",
		},
	},
	{
		value: "black-and-white-picture",
		name: "Black And White Picture",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Black And White Picture', sans-serif",
			provider: "google",
			subsets: ["korean", "latin"],
			import: "Black_And_White_Picture",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Black+And+White+Picture&display=swap",
		},
	},
	{
		value: "black-ops-one",
		name: "Black Ops One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Black Ops One', sans-serif",
			provider: "google",
			subsets: ["cyrillic-ext", "latin", "latin-ext", "vietnamese"],
			import: "Black_Ops_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap",
		},
	},
	{
		value: "blaka",
		name: "Blaka",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Blaka', sans-serif",
			provider: "google",
			subsets: ["arabic", "latin", "latin-ext"],
			import: "Blaka",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Blaka&display=swap",
		},
	},
	{
		value: "blaka-hollow",
		name: "Blaka Hollow",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Blaka Hollow', sans-serif",
			provider: "google",
			subsets: ["arabic", "latin", "latin-ext"],
			import: "Blaka_Hollow",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Blaka+Hollow&display=swap",
		},
	},
	{
		value: "blaka-ink",
		name: "Blaka Ink",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Blaka Ink', sans-serif",
			provider: "google",
			subsets: ["arabic", "latin", "latin-ext"],
			import: "Blaka_Ink",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Blaka+Ink&display=swap",
		},
	},
	{
		value: "bodoni-moda",
		name: "Bodoni Moda",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Bodoni Moda', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Bodoni_Moda",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bodoni+Moda&display=swap",
		},
	},
	{
		value: "bokor",
		name: "Bokor",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Bokor', sans-serif",
			provider: "google",
			subsets: ["khmer", "latin"],
			import: "Bokor",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bokor&display=swap",
		},
	},
	{
		value: "bona-nova",
		name: "Bona Nova",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Bona Nova', serif",
			provider: "google",
			subsets: [
				"cyrillic",
				"cyrillic-ext",
				"greek",
				"hebrew",
				"latin",
				"latin-ext",
				"vietnamese",
			],
			import: "Bona_Nova",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bona+Nova&display=swap",
		},
	},
	{
		value: "bonbon",
		name: "Bonbon",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Bonbon', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Bonbon",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bonbon&display=swap",
		},
	},
	{
		value: "bonheur-royale",
		name: "Bonheur Royale",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Bonheur Royale', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Bonheur_Royale",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bonheur+Royale&display=swap",
		},
	},
	{
		value: "boogaloo",
		name: "Boogaloo",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Boogaloo', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Boogaloo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Boogaloo&display=swap",
		},
	},
	{
		value: "borel",
		name: "Borel",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Borel', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Borel",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Borel&display=swap",
		},
	},
	{
		value: "bowlby-one",
		name: "Bowlby One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Bowlby One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Bowlby_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bowlby+One&display=swap",
		},
	},
	{
		value: "bowlby-one-sc",
		name: "Bowlby One SC",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Bowlby One SC', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Bowlby_One_SC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bowlby+One+SC&display=swap",
		},
	},
	{
		value: "brawler",
		name: "Brawler",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Brawler', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Brawler",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Brawler&display=swap",
		},
	},
	{
		value: "bree-serif",
		name: "Bree Serif",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Bree Serif', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Bree_Serif",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bree+Serif&display=swap",
		},
	},
	{
		value: "bruno-ace",
		name: "Bruno Ace",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Bruno Ace', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Bruno_Ace",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bruno+Ace&display=swap",
		},
	},
	{
		value: "bruno-ace-sc",
		name: "Bruno Ace SC",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Bruno Ace SC', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Bruno_Ace_SC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bruno+Ace+SC&display=swap",
		},
	},
	{
		value: "brygada-1918",
		name: "Brygada 1918",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Brygada 1918', serif",
			provider: "google",
			subsets: [
				"cyrillic",
				"cyrillic-ext",
				"greek",
				"latin",
				"latin-ext",
				"vietnamese",
			],
			import: "Brygada_1918",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Brygada+1918&display=swap",
		},
	},
	{
		value: "bubblegum-sans",
		name: "Bubblegum Sans",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Bubblegum Sans', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Bubblegum_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bubblegum+Sans&display=swap",
		},
	},
	{
		value: "buda",
		name: "Buda",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Buda', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Buda",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Buda&display=swap",
		},
	},
	{
		value: "buenard",
		name: "Buenard",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Buenard', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Buenard",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Buenard&display=swap",
		},
	},
	{
		value: "bungee",
		name: "Bungee",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Bungee', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Bungee",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bungee&display=swap",
		},
	},
	{
		value: "bungee-hairline",
		name: "Bungee Hairline",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Bungee Hairline', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Bungee_Hairline",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bungee+Hairline&display=swap",
		},
	},
	{
		value: "bungee-inline",
		name: "Bungee Inline",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Bungee Inline', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Bungee_Inline",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bungee+Inline&display=swap",
		},
	},
	{
		value: "bungee-outline",
		name: "Bungee Outline",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Bungee Outline', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Bungee_Outline",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bungee+Outline&display=swap",
		},
	},
	{
		value: "bungee-shade",
		name: "Bungee Shade",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Bungee Shade', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Bungee_Shade",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bungee+Shade&display=swap",
		},
	},
	{
		value: "bungee-spice",
		name: "Bungee Spice",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Bungee Spice', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Bungee_Spice",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Bungee+Spice&display=swap",
		},
	},
	{
		value: "butcherman",
		name: "Butcherman",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Butcherman', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Butcherman",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Butcherman&display=swap",
		},
	},
	{
		value: "butterfly-kids",
		name: "Butterfly Kids",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Butterfly Kids', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Butterfly_Kids",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Butterfly+Kids&display=swap",
		},
	},
	{
		value: "cabin-sketch",
		name: "Cabin Sketch",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Cabin Sketch', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Cabin_Sketch",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cabin+Sketch&display=swap",
		},
	},
	{
		value: "caesar-dressing",
		name: "Caesar Dressing",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Caesar Dressing', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Caesar_Dressing",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Caesar+Dressing&display=swap",
		},
	},
	{
		value: "caladea",
		name: "Caladea",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Caladea', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Caladea",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Caladea&display=swap",
		},
	},
	{
		value: "calistoga",
		name: "Calistoga",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Calistoga', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Calistoga",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Calistoga&display=swap",
		},
	},
	{
		value: "calligraffitti",
		name: "Calligraffitti",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Calligraffitti', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Calligraffitti",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Calligraffitti&display=swap",
		},
	},
	{
		value: "cambo",
		name: "Cambo",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Cambo', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Cambo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cambo&display=swap",
		},
	},
	{
		value: "cantata-one",
		name: "Cantata One",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Cantata One', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Cantata_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cantata+One&display=swap",
		},
	},
	{
		value: "caprasimo",
		name: "Caprasimo",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Caprasimo', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Caprasimo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Caprasimo&display=swap",
		},
	},
	{
		value: "caramel",
		name: "Caramel",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Caramel', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Caramel",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Caramel&display=swap",
		},
	},
	{
		value: "carattere",
		name: "Carattere",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Carattere', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Carattere",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Carattere&display=swap",
		},
	},
	{
		value: "cardo",
		name: "Cardo",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Cardo', serif",
			provider: "google",
			subsets: ["greek", "greek-ext", "latin", "latin-ext"],
			import: "Cardo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cardo&display=swap",
		},
	},
	{
		value: "carter-one",
		name: "Carter One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Carter One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Carter_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Carter+One&display=swap",
		},
	},
	{
		value: "castoro",
		name: "Castoro",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Castoro', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Castoro",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Castoro&display=swap",
		},
	},
	{
		value: "castoro-titling",
		name: "Castoro Titling",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Castoro Titling', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Castoro_Titling",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Castoro+Titling&display=swap",
		},
	},
	{
		value: "caudex",
		name: "Caudex",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Caudex', serif",
			provider: "google",
			subsets: ["greek", "greek-ext", "latin", "latin-ext"],
			import: "Caudex",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Caudex&display=swap",
		},
	},
	{
		value: "caveat",
		name: "Caveat",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Caveat', cursive",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
			import: "Caveat",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Caveat&display=swap",
		},
	},
	{
		value: "caveat-brush",
		name: "Caveat Brush",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Caveat Brush', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Caveat_Brush",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Caveat+Brush&display=swap",
		},
	},
	{
		value: "cedarville-cursive",
		name: "Cedarville Cursive",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Cedarville Cursive', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Cedarville_Cursive",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cedarville+Cursive&display=swap",
		},
	},
	{
		value: "ceviche-one",
		name: "Ceviche One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Ceviche One', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Ceviche_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ceviche+One&display=swap",
		},
	},
	{
		value: "changa-one",
		name: "Changa One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Changa One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Changa_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Changa+One&display=swap",
		},
	},
	{
		value: "chango",
		name: "Chango",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Chango', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Chango",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Chango&display=swap",
		},
	},
	{
		value: "charis-sil",
		name: "Charis SIL",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Charis SIL', serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
			import: "Charis_SIL",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Charis+SIL&display=swap",
		},
	},
	{
		value: "charm",
		name: "Charm",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Charm', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "thai", "vietnamese"],
			import: "Charm",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Charm&display=swap",
		},
	},
	{
		value: "charmonman",
		name: "Charmonman",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Charmonman', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "thai", "vietnamese"],
			import: "Charmonman",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Charmonman&display=swap",
		},
	},
	{
		value: "chela-one",
		name: "Chela One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Chela One', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Chela_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Chela+One&display=swap",
		},
	},
	{
		value: "chelsea-market",
		name: "Chelsea Market",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Chelsea Market', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Chelsea_Market",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Chelsea+Market&display=swap",
		},
	},
	{
		value: "chenla",
		name: "Chenla",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Chenla', sans-serif",
			provider: "google",
			subsets: ["khmer"],
			import: "Chenla",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Chenla&display=swap",
		},
	},
	{
		value: "cherish",
		name: "Cherish",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Cherish', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Cherish",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cherish&display=swap",
		},
	},
	{
		value: "cherry-bomb-one",
		name: "Cherry Bomb One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Cherry Bomb One', sans-serif",
			provider: "google",
			subsets: ["japanese", "latin", "latin-ext", "vietnamese"],
			import: "Cherry_Bomb_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cherry+Bomb+One&display=swap",
		},
	},
	{
		value: "cherry-cream-soda",
		name: "Cherry Cream Soda",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Cherry Cream Soda', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Cherry_Cream_Soda",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cherry+Cream+Soda&display=swap",
		},
	},
	{
		value: "cherry-swash",
		name: "Cherry Swash",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Cherry Swash', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Cherry_Swash",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cherry+Swash&display=swap",
		},
	},
	{
		value: "chewy",
		name: "Chewy",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Chewy', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Chewy",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Chewy&display=swap",
		},
	},
	{
		value: "chicle",
		name: "Chicle",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Chicle', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Chicle",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Chicle&display=swap",
		},
	},
	{
		value: "chilanka",
		name: "Chilanka",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Chilanka', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "malayalam"],
			import: "Chilanka",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Chilanka&display=swap",
		},
	},
	{
		value: "chivo-mono",
		name: "Chivo Mono",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Chivo Mono', monospace",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Chivo_Mono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Chivo+Mono&display=swap",
		},
	},
	{
		value: "chokokutai",
		name: "Chokokutai",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Chokokutai', sans-serif",
			provider: "google",
			subsets: ["japanese", "latin", "latin-ext", "vietnamese"],
			import: "Chokokutai",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Chokokutai&display=swap",
		},
	},
	{
		value: "chonburi",
		name: "Chonburi",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Chonburi', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "thai", "vietnamese"],
			import: "Chonburi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Chonburi&display=swap",
		},
	},
	{
		value: "cinzel",
		name: "Cinzel",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Cinzel', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Cinzel",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cinzel&display=swap",
		},
	},
	{
		value: "cinzel-decorative",
		name: "Cinzel Decorative",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Cinzel Decorative', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Cinzel_Decorative",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cinzel+Decorative&display=swap",
		},
	},
	{
		value: "clicker-script",
		name: "Clicker Script",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Clicker Script', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Clicker_Script",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Clicker+Script&display=swap",
		},
	},
	{
		value: "climate-crisis",
		name: "Climate Crisis",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Climate Crisis', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Climate_Crisis",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Climate+Crisis&display=swap",
		},
	},
	{
		value: "coda",
		name: "Coda",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Coda', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Coda",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Coda&display=swap",
		},
	},
	{
		value: "coda-caption",
		name: "Coda Caption",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Coda Caption', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Coda_Caption",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Coda+Caption&display=swap",
		},
	},
	{
		value: "codystar",
		name: "Codystar",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Codystar', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Codystar",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Codystar&display=swap",
		},
	},
	{
		value: "coiny",
		name: "Coiny",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Coiny', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "tamil", "vietnamese"],
			import: "Coiny",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Coiny&display=swap",
		},
	},
	{
		value: "combo",
		name: "Combo",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Combo', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Combo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Combo&display=swap",
		},
	},
	{
		value: "comfortaa",
		name: "Comfortaa",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Comfortaa', sans-serif",
			provider: "google",
			subsets: [
				"cyrillic",
				"cyrillic-ext",
				"greek",
				"latin",
				"latin-ext",
				"vietnamese",
			],
			import: "Comfortaa",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Comfortaa&display=swap",
		},
	},
	{
		value: "comforter",
		name: "Comforter",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Comforter', cursive",
			provider: "google",
			subsets: ["cyrillic", "latin", "latin-ext", "vietnamese"],
			import: "Comforter",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Comforter&display=swap",
		},
	},
	{
		value: "comforter-brush",
		name: "Comforter Brush",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Comforter Brush', cursive",
			provider: "google",
			subsets: ["cyrillic", "latin", "latin-ext", "vietnamese"],
			import: "Comforter_Brush",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Comforter+Brush&display=swap",
		},
	},
	{
		value: "comic-neue",
		name: "Comic Neue",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Comic Neue', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Comic_Neue",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Comic+Neue&display=swap",
		},
	},
	{
		value: "coming-soon",
		name: "Coming Soon",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Coming Soon', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Coming_Soon",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Coming+Soon&display=swap",
		},
	},
	{
		value: "concert-one",
		name: "Concert One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Concert One', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Concert_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Concert+One&display=swap",
		},
	},
	{
		value: "condiment",
		name: "Condiment",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Condiment', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Condiment",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Condiment&display=swap",
		},
	},
	{
		value: "content",
		name: "Content",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Content', sans-serif",
			provider: "google",
			subsets: ["khmer"],
			import: "Content",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Content&display=swap",
		},
	},
	{
		value: "contrail-one",
		name: "Contrail One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Contrail One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Contrail_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Contrail+One&display=swap",
		},
	},
	{
		value: "cookie",
		name: "Cookie",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Cookie', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Cookie",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cookie&display=swap",
		},
	},
	{
		value: "copse",
		name: "Copse",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Copse', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Copse",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Copse&display=swap",
		},
	},
	{
		value: "corben",
		name: "Corben",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Corben', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Corben",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Corben&display=swap",
		},
	},
	{
		value: "corinthia",
		name: "Corinthia",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Corinthia', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Corinthia",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Corinthia&display=swap",
		},
	},
	{
		value: "cormorant",
		name: "Cormorant",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Cormorant', serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
			import: "Cormorant",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cormorant&display=swap",
		},
	},
	{
		value: "cormorant-garamond",
		name: "Cormorant Garamond",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Cormorant Garamond', serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
			import: "Cormorant_Garamond",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cormorant+Garamond&display=swap",
		},
	},
	{
		value: "cormorant-infant",
		name: "Cormorant Infant",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Cormorant Infant', serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
			import: "Cormorant_Infant",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cormorant+Infant&display=swap",
		},
	},
	{
		value: "cormorant-sc",
		name: "Cormorant SC",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Cormorant SC', serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
			import: "Cormorant_SC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cormorant+SC&display=swap",
		},
	},
	{
		value: "cormorant-unicase",
		name: "Cormorant Unicase",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Cormorant Unicase', serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
			import: "Cormorant_Unicase",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cormorant+Unicase&display=swap",
		},
	},
	{
		value: "cormorant-upright",
		name: "Cormorant Upright",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Cormorant Upright', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Cormorant_Upright",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cormorant+Upright&display=swap",
		},
	},
	{
		value: "courgette",
		name: "Courgette",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Courgette', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Courgette",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Courgette&display=swap",
		},
	},
	{
		value: "courier-prime",
		name: "Courier Prime",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Courier Prime', monospace",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Courier_Prime",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap",
		},
	},
	{
		value: "cousine",
		name: "Cousine",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Cousine', monospace",
			provider: "google",
			subsets: [
				"cyrillic",
				"cyrillic-ext",
				"greek",
				"greek-ext",
				"hebrew",
				"latin",
				"latin-ext",
				"vietnamese",
			],
			import: "Cousine",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cousine&display=swap",
		},
	},
	{
		value: "coustard",
		name: "Coustard",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Coustard', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Coustard",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Coustard&display=swap",
		},
	},
	{
		value: "covered-by-your-grace",
		name: "Covered By Your Grace",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Covered By Your Grace', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Covered_By_Your_Grace",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Covered+By+Your+Grace&display=swap",
		},
	},
	{
		value: "crafty-girls",
		name: "Crafty Girls",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Crafty Girls', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Crafty_Girls",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Crafty+Girls&display=swap",
		},
	},
	{
		value: "creepster",
		name: "Creepster",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Creepster', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Creepster",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Creepster&display=swap",
		},
	},
	{
		value: "crete-round",
		name: "Crete Round",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Crete Round', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Crete_Round",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Crete+Round&display=swap",
		},
	},
	{
		value: "crimson-pro",
		name: "Crimson Pro",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Crimson Pro', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Crimson_Pro",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Crimson+Pro&display=swap",
		},
	},
	{
		value: "crimson-text",
		name: "Crimson Text",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Crimson Text', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Crimson_Text",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Crimson+Text&display=swap",
		},
	},
	{
		value: "croissant-one",
		name: "Croissant One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Croissant One', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Croissant_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Croissant+One&display=swap",
		},
	},
	{
		value: "crushed",
		name: "Crushed",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Crushed', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Crushed",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Crushed&display=swap",
		},
	},
	{
		value: "cute-font",
		name: "Cute Font",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Cute Font', sans-serif",
			provider: "google",
			subsets: ["korean", "latin"],
			import: "Cute_Font",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cute+Font&display=swap",
		},
	},
	{
		value: "cutive",
		name: "Cutive",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Cutive', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Cutive",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cutive&display=swap",
		},
	},
	{
		value: "cutive-mono",
		name: "Cutive Mono",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Cutive Mono', monospace",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Cutive_Mono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Cutive+Mono&display=swap",
		},
	},
	{
		value: "dm-mono",
		name: "DM Mono",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'DM Mono', monospace",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "DM_Mono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=DM+Mono&display=swap",
		},
	},
	{
		value: "dm-serif-display",
		name: "DM Serif Display",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'DM Serif Display', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "DM_Serif_Display",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap",
		},
	},
	{
		value: "dm-serif-text",
		name: "DM Serif Text",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'DM Serif Text', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "DM_Serif_Text",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=DM+Serif+Text&display=swap",
		},
	},
	{
		value: "dai-banna-sil",
		name: "Dai Banna SIL",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Dai Banna SIL', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "new-tai-lue"],
			import: "Dai_Banna_SIL",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Dai+Banna+SIL&display=swap",
		},
	},
	{
		value: "damion",
		name: "Damion",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Damion', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Damion",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Damion&display=swap",
		},
	},
	{
		value: "dancing-script",
		name: "Dancing Script",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Dancing Script', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Dancing_Script",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap",
		},
	},
	{
		value: "dangrek",
		name: "Dangrek",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Dangrek', sans-serif",
			provider: "google",
			subsets: ["khmer", "latin"],
			import: "Dangrek",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Dangrek&display=swap",
		},
	},
	{
		value: "darumadrop-one",
		name: "Darumadrop One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Darumadrop One', sans-serif",
			provider: "google",
			subsets: ["japanese", "latin", "latin-ext"],
			import: "Darumadrop_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Darumadrop+One&display=swap",
		},
	},
	{
		value: "david-libre",
		name: "David Libre",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'David Libre', serif",
			provider: "google",
			subsets: ["hebrew", "latin", "latin-ext", "vietnamese"],
			import: "David_Libre",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=David+Libre&display=swap",
		},
	},
	{
		value: "dawning-of-a-new-day",
		name: "Dawning of a New Day",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Dawning of a New Day', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Dawning_of_a_New_Day",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Dawning+of+a+New+Day&display=swap",
		},
	},
	{
		value: "dekko",
		name: "Dekko",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Dekko', cursive",
			provider: "google",
			subsets: ["devanagari", "latin", "latin-ext"],
			import: "Dekko",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Dekko&display=swap",
		},
	},
	{
		value: "dela-gothic-one",
		name: "Dela Gothic One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Dela Gothic One', sans-serif",
			provider: "google",
			subsets: [
				"cyrillic",
				"greek",
				"japanese",
				"latin",
				"latin-ext",
				"vietnamese",
			],
			import: "Dela_Gothic_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap",
		},
	},
	{
		value: "delicious-handrawn",
		name: "Delicious Handrawn",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Delicious Handrawn', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Delicious_Handrawn",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Delicious+Handrawn&display=swap",
		},
	},
	{
		value: "delius",
		name: "Delius",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Delius', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Delius",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Delius&display=swap",
		},
	},
	{
		value: "delius-swash-caps",
		name: "Delius Swash Caps",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Delius Swash Caps', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Delius_Swash_Caps",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Delius+Swash+Caps&display=swap",
		},
	},
	{
		value: "delius-unicase",
		name: "Delius Unicase",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Delius Unicase', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Delius_Unicase",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Delius+Unicase&display=swap",
		},
	},
	{
		value: "della-respira",
		name: "Della Respira",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Della Respira', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Della_Respira",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Della+Respira&display=swap",
		},
	},
	{
		value: "devonshire",
		name: "Devonshire",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Devonshire', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Devonshire",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Devonshire&display=swap",
		},
	},
	{
		value: "diphylleia",
		name: "Diphylleia",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Diphylleia', serif",
			provider: "google",
			subsets: ["korean", "latin", "latin-ext"],
			import: "Diphylleia",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Diphylleia&display=swap",
		},
	},
	{
		value: "diplomata",
		name: "Diplomata",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Diplomata', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Diplomata",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Diplomata&display=swap",
		},
	},
	{
		value: "diplomata-sc",
		name: "Diplomata SC",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Diplomata SC', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Diplomata_SC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Diplomata+SC&display=swap",
		},
	},
	{
		value: "dokdo",
		name: "Dokdo",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Dokdo', sans-serif",
			provider: "google",
			subsets: ["korean", "latin"],
			import: "Dokdo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Dokdo&display=swap",
		},
	},
	{
		value: "domine",
		name: "Domine",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Domine', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Domine",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Domine&display=swap",
		},
	},
	{
		value: "donegal-one",
		name: "Donegal One",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Donegal One', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Donegal_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Donegal+One&display=swap",
		},
	},
	{
		value: "dr-sugiyama",
		name: "Dr Sugiyama",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Dr Sugiyama', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Dr_Sugiyama",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Dr+Sugiyama&display=swap",
		},
	},
	{
		value: "dynapuff",
		name: "DynaPuff",
		type: "registry:font",
		category: "display",
		font: {
			family: "'DynaPuff', sans-serif",
			provider: "google",
			subsets: ["cyrillic-ext", "latin", "latin-ext"],
			import: "DynaPuff",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=DynaPuff&display=swap",
		},
	},
	{
		value: "dynalight",
		name: "Dynalight",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Dynalight', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Dynalight",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Dynalight&display=swap",
		},
	},
	{
		value: "eb-garamond",
		name: "EB Garamond",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'EB Garamond', serif",
			provider: "google",
			subsets: [
				"cyrillic",
				"cyrillic-ext",
				"greek",
				"greek-ext",
				"latin",
				"latin-ext",
				"vietnamese",
			],
			import: "EB_Garamond",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=EB+Garamond&display=swap",
		},
	},
	{
		value: "eagle-lake",
		name: "Eagle Lake",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Eagle Lake', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Eagle_Lake",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Eagle+Lake&display=swap",
		},
	},
	{
		value: "east-sea-dokdo",
		name: "East Sea Dokdo",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'East Sea Dokdo', cursive",
			provider: "google",
			subsets: ["korean", "latin"],
			import: "East_Sea_Dokdo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=East+Sea+Dokdo&display=swap",
		},
	},
	{
		value: "eater",
		name: "Eater",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Eater', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Eater",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Eater&display=swap",
		},
	},
	{
		value: "eczar",
		name: "Eczar",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Eczar', serif",
			provider: "google",
			subsets: ["devanagari", "greek", "greek-ext", "latin", "latin-ext"],
			import: "Eczar",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Eczar&display=swap",
		},
	},
	{
		value: "edu-nsw-act-foundation",
		name: "Edu NSW ACT Foundation",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Edu NSW ACT Foundation', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Edu_NSW_ACT_Foundation",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Edu+NSW+ACT+Foundation&display=swap",
		},
	},
	{
		value: "edu-qld-beginner",
		name: "Edu QLD Beginner",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Edu QLD Beginner', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Edu_QLD_Beginner",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Edu+QLD+Beginner&display=swap",
		},
	},
	{
		value: "edu-sa-beginner",
		name: "Edu SA Beginner",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Edu SA Beginner', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Edu_SA_Beginner",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Edu+SA+Beginner&display=swap",
		},
	},
	{
		value: "edu-tas-beginner",
		name: "Edu TAS Beginner",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Edu TAS Beginner', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Edu_TAS_Beginner",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Edu+TAS+Beginner&display=swap",
		},
	},
	{
		value: "edu-vic-wa-nt-beginner",
		name: "Edu VIC WA NT Beginner",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Edu VIC WA NT Beginner', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Edu_VIC_WA_NT_Beginner",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Edu+VIC+WA+NT+Beginner&display=swap",
		},
	},
	{
		value: "elsie",
		name: "Elsie",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Elsie', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Elsie",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Elsie&display=swap",
		},
	},
	{
		value: "elsie-swash-caps",
		name: "Elsie Swash Caps",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Elsie Swash Caps', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Elsie_Swash_Caps",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Elsie+Swash+Caps&display=swap",
		},
	},
	{
		value: "emblema-one",
		name: "Emblema One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Emblema One', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Emblema_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Emblema+One&display=swap",
		},
	},
	{
		value: "emilys-candy",
		name: "Emilys Candy",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Emilys Candy', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Emilys_Candy",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Emilys+Candy&display=swap",
		},
	},
	{
		value: "engagement",
		name: "Engagement",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Engagement', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Engagement",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Engagement&display=swap",
		},
	},
	{
		value: "enriqueta",
		name: "Enriqueta",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Enriqueta', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Enriqueta",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Enriqueta&display=swap",
		},
	},
	{
		value: "ephesis",
		name: "Ephesis",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Ephesis', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Ephesis",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ephesis&display=swap",
		},
	},
	{
		value: "erica-one",
		name: "Erica One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Erica One', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Erica_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Erica+One&display=swap",
		},
	},
	{
		value: "esteban",
		name: "Esteban",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Esteban', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Esteban",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Esteban&display=swap",
		},
	},
	{
		value: "estonia",
		name: "Estonia",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Estonia', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Estonia",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Estonia&display=swap",
		},
	},
	{
		value: "euphoria-script",
		name: "Euphoria Script",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Euphoria Script', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Euphoria_Script",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Euphoria+Script&display=swap",
		},
	},
	{
		value: "ewert",
		name: "Ewert",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Ewert', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Ewert",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ewert&display=swap",
		},
	},
	{
		value: "expletus-sans",
		name: "Expletus Sans",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Expletus Sans', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Expletus_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Expletus+Sans&display=swap",
		},
	},
	{
		value: "explora",
		name: "Explora",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Explora', cursive",
			provider: "google",
			subsets: ["cherokee", "latin", "latin-ext", "vietnamese"],
			import: "Explora",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Explora&display=swap",
		},
	},
	{
		value: "fanwood-text",
		name: "Fanwood Text",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Fanwood Text', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Fanwood_Text",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Fanwood+Text&display=swap",
		},
	},
	{
		value: "farsan",
		name: "Farsan",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Farsan', sans-serif",
			provider: "google",
			subsets: ["gujarati", "latin", "latin-ext", "vietnamese"],
			import: "Farsan",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Farsan&display=swap",
		},
	},
	{
		value: "fascinate",
		name: "Fascinate",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Fascinate', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Fascinate",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Fascinate&display=swap",
		},
	},
	{
		value: "fascinate-inline",
		name: "Fascinate Inline",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Fascinate Inline', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Fascinate_Inline",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Fascinate+Inline&display=swap",
		},
	},
	{
		value: "faster-one",
		name: "Faster One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Faster One', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Faster_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Faster+One&display=swap",
		},
	},
	{
		value: "fasthand",
		name: "Fasthand",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Fasthand', sans-serif",
			provider: "google",
			subsets: ["khmer", "latin"],
			import: "Fasthand",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Fasthand&display=swap",
		},
	},
	{
		value: "fauna-one",
		name: "Fauna One",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Fauna One', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Fauna_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Fauna+One&display=swap",
		},
	},
	{
		value: "faustina",
		name: "Faustina",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Faustina', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Faustina",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Faustina&display=swap",
		},
	},
	{
		value: "federant",
		name: "Federant",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Federant', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Federant",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Federant&display=swap",
		},
	},
	{
		value: "felipa",
		name: "Felipa",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Felipa', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Felipa",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Felipa&display=swap",
		},
	},
	{
		value: "fenix",
		name: "Fenix",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Fenix', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Fenix",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Fenix&display=swap",
		},
	},
	{
		value: "festive",
		name: "Festive",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Festive', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Festive",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Festive&display=swap",
		},
	},
	{
		value: "finger-paint",
		name: "Finger Paint",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Finger Paint', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Finger_Paint",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Finger+Paint&display=swap",
		},
	},
	{
		value: "fira-code",
		name: "Fira Code",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Fira Code', monospace",
			provider: "google",
			subsets: [
				"cyrillic",
				"cyrillic-ext",
				"greek",
				"greek-ext",
				"latin",
				"latin-ext",
			],
			import: "Fira_Code",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Fira+Code&display=swap",
		},
	},
	{
		value: "fira-mono",
		name: "Fira Mono",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Fira Mono', monospace",
			provider: "google",
			subsets: [
				"cyrillic",
				"cyrillic-ext",
				"greek",
				"greek-ext",
				"latin",
				"latin-ext",
			],
			import: "Fira_Mono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Fira+Mono&display=swap",
		},
	},
	{
		value: "fjord-one",
		name: "Fjord One",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Fjord One', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Fjord_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Fjord+One&display=swap",
		},
	},
	{
		value: "flamenco",
		name: "Flamenco",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Flamenco', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Flamenco",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Flamenco&display=swap",
		},
	},
	{
		value: "flavors",
		name: "Flavors",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Flavors', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Flavors",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Flavors&display=swap",
		},
	},
	{
		value: "fleur-de-leah",
		name: "Fleur De Leah",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Fleur De Leah', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Fleur_De_Leah",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Fleur+De+Leah&display=swap",
		},
	},
	{
		value: "flow-block",
		name: "Flow Block",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Flow Block', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
			import: "Flow_Block",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Flow+Block&display=swap",
		},
	},
	{
		value: "flow-circular",
		name: "Flow Circular",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Flow Circular', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
			import: "Flow_Circular",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Flow+Circular&display=swap",
		},
	},
	{
		value: "flow-rounded",
		name: "Flow Rounded",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Flow Rounded', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
			import: "Flow_Rounded",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Flow+Rounded&display=swap",
		},
	},
	{
		value: "foldit",
		name: "Foldit",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Foldit', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Foldit",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Foldit&display=swap",
		},
	},
	{
		value: "fondamento",
		name: "Fondamento",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Fondamento', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Fondamento",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Fondamento&display=swap",
		},
	},
	{
		value: "fontdiner-swanky",
		name: "Fontdiner Swanky",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Fontdiner Swanky', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Fontdiner_Swanky",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Fontdiner+Swanky&display=swap",
		},
	},
	{
		value: "forum",
		name: "Forum",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Forum', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
			import: "Forum",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Forum&display=swap",
		},
	},
	{
		value: "fragment-mono",
		name: "Fragment Mono",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Fragment Mono', monospace",
			provider: "google",
			subsets: ["cyrillic-ext", "latin", "latin-ext"],
			import: "Fragment_Mono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Fragment+Mono&display=swap",
		},
	},
	{
		value: "frank-ruhl-libre",
		name: "Frank Ruhl Libre",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Frank Ruhl Libre', serif",
			provider: "google",
			subsets: ["hebrew", "latin", "latin-ext"],
			import: "Frank_Ruhl_Libre",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre&display=swap",
		},
	},
	{
		value: "fraunces",
		name: "Fraunces",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Fraunces', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Fraunces",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Fraunces&display=swap",
		},
	},
	{
		value: "freckle-face",
		name: "Freckle Face",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Freckle Face', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Freckle_Face",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Freckle+Face&display=swap",
		},
	},
	{
		value: "fredericka-the-great",
		name: "Fredericka the Great",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Fredericka the Great', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Fredericka_the_Great",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Fredericka+the+Great&display=swap",
		},
	},
	{
		value: "freehand",
		name: "Freehand",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Freehand', sans-serif",
			provider: "google",
			subsets: ["khmer", "latin"],
			import: "Freehand",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Freehand&display=swap",
		},
	},
	{
		value: "frijole",
		name: "Frijole",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Frijole', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Frijole",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Frijole&display=swap",
		},
	},
	{
		value: "fruktur",
		name: "Fruktur",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Fruktur', sans-serif",
			provider: "google",
			subsets: ["cyrillic-ext", "latin", "latin-ext", "vietnamese"],
			import: "Fruktur",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Fruktur&display=swap",
		},
	},
	{
		value: "fugaz-one",
		name: "Fugaz One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Fugaz One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Fugaz_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Fugaz+One&display=swap",
		},
	},
	{
		value: "fuggles",
		name: "Fuggles",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Fuggles', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Fuggles",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Fuggles&display=swap",
		},
	},
	{
		value: "fuzzy-bubbles",
		name: "Fuzzy Bubbles",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Fuzzy Bubbles', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Fuzzy_Bubbles",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Fuzzy+Bubbles&display=swap",
		},
	},
	{
		value: "gfs-didot",
		name: "GFS Didot",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'GFS Didot', serif",
			provider: "google",
			subsets: ["greek"],
			import: "GFS_Didot",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=GFS+Didot&display=swap",
		},
	},
	{
		value: "gabarito",
		name: "Gabarito",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Gabarito', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Gabarito",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gabarito&display=swap",
		},
	},
	{
		value: "gabriela",
		name: "Gabriela",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Gabriela', serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
			import: "Gabriela",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gabriela&display=swap",
		},
	},
	{
		value: "gaegu",
		name: "Gaegu",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Gaegu', cursive",
			provider: "google",
			subsets: ["korean", "latin"],
			import: "Gaegu",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gaegu&display=swap",
		},
	},
	{
		value: "gajraj-one",
		name: "Gajraj One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Gajraj One', sans-serif",
			provider: "google",
			subsets: ["devanagari", "latin", "latin-ext"],
			import: "Gajraj_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gajraj+One&display=swap",
		},
	},
	{
		value: "galada",
		name: "Galada",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Galada', sans-serif",
			provider: "google",
			subsets: ["bengali", "latin"],
			import: "Galada",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Galada&display=swap",
		},
	},
	{
		value: "galindo",
		name: "Galindo",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Galindo', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Galindo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Galindo&display=swap",
		},
	},
	{
		value: "gamja-flower",
		name: "Gamja Flower",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Gamja Flower', cursive",
			provider: "google",
			subsets: ["korean", "latin"],
			import: "Gamja_Flower",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gamja+Flower&display=swap",
		},
	},
	{
		value: "gelasio",
		name: "Gelasio",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Gelasio', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Gelasio",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gelasio&display=swap",
		},
	},
	{
		value: "gentium-book-plus",
		name: "Gentium Book Plus",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Gentium Book Plus', serif",
			provider: "google",
			subsets: [
				"cyrillic",
				"cyrillic-ext",
				"greek",
				"greek-ext",
				"latin",
				"latin-ext",
				"vietnamese",
			],
			import: "Gentium_Book_Plus",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gentium+Book+Plus&display=swap",
		},
	},
	{
		value: "gentium-plus",
		name: "Gentium Plus",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Gentium Plus', serif",
			provider: "google",
			subsets: [
				"cyrillic",
				"cyrillic-ext",
				"greek",
				"greek-ext",
				"latin",
				"latin-ext",
				"vietnamese",
			],
			import: "Gentium_Plus",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gentium+Plus&display=swap",
		},
	},
	{
		value: "geostar",
		name: "Geostar",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Geostar', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Geostar",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Geostar&display=swap",
		},
	},
	{
		value: "geostar-fill",
		name: "Geostar Fill",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Geostar Fill', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Geostar_Fill",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Geostar+Fill&display=swap",
		},
	},
	{
		value: "germania-one",
		name: "Germania One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Germania One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Germania_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Germania+One&display=swap",
		},
	},
	{
		value: "gideon-roman",
		name: "Gideon Roman",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Gideon Roman', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Gideon_Roman",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gideon+Roman&display=swap",
		},
	},
	{
		value: "gilda-display",
		name: "Gilda Display",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Gilda Display', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Gilda_Display",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gilda+Display&display=swap",
		},
	},
	{
		value: "girassol",
		name: "Girassol",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Girassol', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Girassol",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Girassol&display=swap",
		},
	},
	{
		value: "give-you-glory",
		name: "Give You Glory",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Give You Glory', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Give_You_Glory",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Give+You+Glory&display=swap",
		},
	},
	{
		value: "glass-antiqua",
		name: "Glass Antiqua",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Glass Antiqua', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Glass_Antiqua",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Glass+Antiqua&display=swap",
		},
	},
	{
		value: "glegoo",
		name: "Glegoo",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Glegoo', serif",
			provider: "google",
			subsets: ["devanagari", "latin", "latin-ext"],
			import: "Glegoo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Glegoo&display=swap",
		},
	},
	{
		value: "gloock",
		name: "Gloock",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Gloock', serif",
			provider: "google",
			subsets: ["cyrillic-ext", "latin", "latin-ext"],
			import: "Gloock",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gloock&display=swap",
		},
	},
	{
		value: "gloria-hallelujah",
		name: "Gloria Hallelujah",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Gloria Hallelujah', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Gloria_Hallelujah",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap",
		},
	},
	{
		value: "gluten",
		name: "Gluten",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Gluten', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Gluten",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gluten&display=swap",
		},
	},
	{
		value: "goblin-one",
		name: "Goblin One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Goblin One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Goblin_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Goblin+One&display=swap",
		},
	},
	{
		value: "gochi-hand",
		name: "Gochi Hand",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Gochi Hand', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Gochi_Hand",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gochi+Hand&display=swap",
		},
	},
	{
		value: "goldman",
		name: "Goldman",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Goldman', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Goldman",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Goldman&display=swap",
		},
	},
	{
		value: "gorditas",
		name: "Gorditas",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Gorditas', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Gorditas",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gorditas&display=swap",
		},
	},
	{
		value: "goudy-bookletter-1911",
		name: "Goudy Bookletter 1911",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Goudy Bookletter 1911', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Goudy_Bookletter_1911",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Goudy+Bookletter+1911&display=swap",
		},
	},
	{
		value: "gowun-batang",
		name: "Gowun Batang",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Gowun Batang', serif",
			provider: "google",
			subsets: ["korean", "latin", "latin-ext", "vietnamese"],
			import: "Gowun_Batang",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gowun+Batang&display=swap",
		},
	},
	{
		value: "graduate",
		name: "Graduate",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Graduate', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Graduate",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Graduate&display=swap",
		},
	},
	{
		value: "grand-hotel",
		name: "Grand Hotel",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Grand Hotel', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Grand_Hotel",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Grand+Hotel&display=swap",
		},
	},
	{
		value: "grandiflora-one",
		name: "Grandiflora One",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Grandiflora One', serif",
			provider: "google",
			subsets: ["korean", "latin", "latin-ext"],
			import: "Grandiflora_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Grandiflora+One&display=swap",
		},
	},
	{
		value: "grandstander",
		name: "Grandstander",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Grandstander', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Grandstander",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Grandstander&display=swap",
		},
	},
	{
		value: "grape-nuts",
		name: "Grape Nuts",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Grape Nuts', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Grape_Nuts",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Grape+Nuts&display=swap",
		},
	},
	{
		value: "gravitas-one",
		name: "Gravitas One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Gravitas One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Gravitas_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gravitas+One&display=swap",
		},
	},
	{
		value: "great-vibes",
		name: "Great Vibes",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Great Vibes', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Great_Vibes",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap",
		},
	},
	{
		value: "grechen-fuemen",
		name: "Grechen Fuemen",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Grechen Fuemen', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Grechen_Fuemen",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Grechen+Fuemen&display=swap",
		},
	},
	{
		value: "grenze",
		name: "Grenze",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Grenze', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Grenze",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Grenze&display=swap",
		},
	},
	{
		value: "grenze-gotisch",
		name: "Grenze Gotisch",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Grenze Gotisch', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Grenze_Gotisch",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Grenze+Gotisch&display=swap",
		},
	},
	{
		value: "grey-qo",
		name: "Grey Qo",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Grey Qo', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Grey_Qo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Grey+Qo&display=swap",
		},
	},
	{
		value: "griffy",
		name: "Griffy",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Griffy', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Griffy",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Griffy&display=swap",
		},
	},
	{
		value: "gugi",
		name: "Gugi",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Gugi', sans-serif",
			provider: "google",
			subsets: ["korean", "latin"],
			import: "Gugi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gugi&display=swap",
		},
	},
	{
		value: "gulzar",
		name: "Gulzar",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Gulzar', serif",
			provider: "google",
			subsets: ["arabic", "latin", "latin-ext"],
			import: "Gulzar",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gulzar&display=swap",
		},
	},
	{
		value: "gupter",
		name: "Gupter",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Gupter', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Gupter",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gupter&display=swap",
		},
	},
	{
		value: "gwendolyn",
		name: "Gwendolyn",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Gwendolyn', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Gwendolyn",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Gwendolyn&display=swap",
		},
	},
	{
		value: "habibi",
		name: "Habibi",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Habibi', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Habibi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Habibi&display=swap",
		},
	},
	{
		value: "hachi-maru-pop",
		name: "Hachi Maru Pop",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Hachi Maru Pop', cursive",
			provider: "google",
			subsets: ["cyrillic", "japanese", "latin", "latin-ext"],
			import: "Hachi_Maru_Pop",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap",
		},
	},
	{
		value: "hahmlet",
		name: "Hahmlet",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Hahmlet', serif",
			provider: "google",
			subsets: ["korean", "latin", "latin-ext", "vietnamese"],
			import: "Hahmlet",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Hahmlet&display=swap",
		},
	},
	{
		value: "halant",
		name: "Halant",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Halant', serif",
			provider: "google",
			subsets: ["devanagari", "latin", "latin-ext"],
			import: "Halant",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Halant&display=swap",
		},
	},
	{
		value: "hanalei",
		name: "Hanalei",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Hanalei', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Hanalei",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Hanalei&display=swap",
		},
	},
	{
		value: "hanalei-fill",
		name: "Hanalei Fill",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Hanalei Fill', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Hanalei_Fill",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Hanalei+Fill&display=swap",
		},
	},
	{
		value: "handjet",
		name: "Handjet",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Handjet', sans-serif",
			provider: "google",
			subsets: [
				"arabic",
				"armenian",
				"cyrillic",
				"cyrillic-ext",
				"greek",
				"hebrew",
				"latin",
				"latin-ext",
				"vietnamese",
			],
			import: "Handjet",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Handjet&display=swap",
		},
	},
	{
		value: "handlee",
		name: "Handlee",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Handlee', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Handlee",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Handlee&display=swap",
		},
	},
	{
		value: "hanuman",
		name: "Hanuman",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Hanuman', serif",
			provider: "google",
			subsets: ["khmer", "latin"],
			import: "Hanuman",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Hanuman&display=swap",
		},
	},
	{
		value: "happy-monkey",
		name: "Happy Monkey",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Happy Monkey', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Happy_Monkey",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Happy+Monkey&display=swap",
		},
	},
	{
		value: "headland-one",
		name: "Headland One",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Headland One', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Headland_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Headland+One&display=swap",
		},
	},
	{
		value: "henny-penny",
		name: "Henny Penny",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Henny Penny', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Henny_Penny",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Henny+Penny&display=swap",
		},
	},
	{
		value: "hepta-slab",
		name: "Hepta Slab",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Hepta Slab', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Hepta_Slab",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Hepta+Slab&display=swap",
		},
	},
	{
		value: "herr-von-muellerhoff",
		name: "Herr Von Muellerhoff",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Herr Von Muellerhoff', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Herr_Von_Muellerhoff",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Herr+Von+Muellerhoff&display=swap",
		},
	},
	{
		value: "hi-melody",
		name: "Hi Melody",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Hi Melody', cursive",
			provider: "google",
			subsets: ["korean", "latin"],
			import: "Hi_Melody",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Hi+Melody&display=swap",
		},
	},
	{
		value: "hina-mincho",
		name: "Hina Mincho",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Hina Mincho', serif",
			provider: "google",
			subsets: ["cyrillic", "japanese", "latin", "latin-ext", "vietnamese"],
			import: "Hina_Mincho",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Hina+Mincho&display=swap",
		},
	},
	{
		value: "holtwood-one-sc",
		name: "Holtwood One SC",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Holtwood One SC', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Holtwood_One_SC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Holtwood+One+SC&display=swap",
		},
	},
	{
		value: "homemade-apple",
		name: "Homemade Apple",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Homemade Apple', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Homemade_Apple",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Homemade+Apple&display=swap",
		},
	},
	{
		value: "hurricane",
		name: "Hurricane",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Hurricane', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Hurricane",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Hurricane&display=swap",
		},
	},
	{
		value: "ibm-plex-mono",
		name: "IBM Plex Mono",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'IBM Plex Mono', monospace",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
			import: "IBM_Plex_Mono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap",
		},
	},
	{
		value: "ibm-plex-serif",
		name: "IBM Plex Serif",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'IBM Plex Serif', serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
			import: "IBM_Plex_Serif",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=IBM+Plex+Serif&display=swap",
		},
	},
	{
		value: "im-fell-dw-pica",
		name: "IM Fell DW Pica",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'IM Fell DW Pica', serif",
			provider: "google",
			subsets: ["latin"],
			import: "IM_Fell_DW_Pica",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=IM+Fell+DW+Pica&display=swap",
		},
	},
	{
		value: "im-fell-dw-pica-sc",
		name: "IM Fell DW Pica SC",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'IM Fell DW Pica SC', serif",
			provider: "google",
			subsets: ["latin"],
			import: "IM_Fell_DW_Pica_SC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=IM+Fell+DW+Pica+SC&display=swap",
		},
	},
	{
		value: "im-fell-double-pica",
		name: "IM Fell Double Pica",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'IM Fell Double Pica', serif",
			provider: "google",
			subsets: ["latin"],
			import: "IM_Fell_Double_Pica",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=IM+Fell+Double+Pica&display=swap",
		},
	},
	{
		value: "im-fell-double-pica-sc",
		name: "IM Fell Double Pica SC",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'IM Fell Double Pica SC', serif",
			provider: "google",
			subsets: ["latin"],
			import: "IM_Fell_Double_Pica_SC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=IM+Fell+Double+Pica+SC&display=swap",
		},
	},
	{
		value: "im-fell-english",
		name: "IM Fell English",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'IM Fell English', serif",
			provider: "google",
			subsets: ["latin"],
			import: "IM_Fell_English",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=IM+Fell+English&display=swap",
		},
	},
	{
		value: "im-fell-english-sc",
		name: "IM Fell English SC",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'IM Fell English SC', serif",
			provider: "google",
			subsets: ["latin"],
			import: "IM_Fell_English_SC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=IM+Fell+English+SC&display=swap",
		},
	},
	{
		value: "im-fell-french-canon",
		name: "IM Fell French Canon",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'IM Fell French Canon', serif",
			provider: "google",
			subsets: ["latin"],
			import: "IM_Fell_French_Canon",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=IM+Fell+French+Canon&display=swap",
		},
	},
	{
		value: "im-fell-french-canon-sc",
		name: "IM Fell French Canon SC",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'IM Fell French Canon SC', serif",
			provider: "google",
			subsets: ["latin"],
			import: "IM_Fell_French_Canon_SC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=IM+Fell+French+Canon+SC&display=swap",
		},
	},
	{
		value: "im-fell-great-primer",
		name: "IM Fell Great Primer",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'IM Fell Great Primer', serif",
			provider: "google",
			subsets: ["latin"],
			import: "IM_Fell_Great_Primer",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=IM+Fell+Great+Primer&display=swap",
		},
	},
	{
		value: "im-fell-great-primer-sc",
		name: "IM Fell Great Primer SC",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'IM Fell Great Primer SC', serif",
			provider: "google",
			subsets: ["latin"],
			import: "IM_Fell_Great_Primer_SC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=IM+Fell+Great+Primer+SC&display=swap",
		},
	},
	{
		value: "ibarra-real-nova",
		name: "Ibarra Real Nova",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Ibarra Real Nova', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Ibarra_Real_Nova",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ibarra+Real+Nova&display=swap",
		},
	},
	{
		value: "iceberg",
		name: "Iceberg",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Iceberg', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Iceberg",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Iceberg&display=swap",
		},
	},
	{
		value: "iceland",
		name: "Iceland",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Iceland', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Iceland",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Iceland&display=swap",
		},
	},
	{
		value: "imbue",
		name: "Imbue",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Imbue', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Imbue",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Imbue&display=swap",
		},
	},
	{
		value: "imperial-script",
		name: "Imperial Script",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Imperial Script', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Imperial_Script",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Imperial+Script&display=swap",
		},
	},
	{
		value: "inconsolata",
		name: "Inconsolata",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Inconsolata', monospace",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Inconsolata",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Inconsolata&display=swap",
		},
	},
	{
		value: "indie-flower",
		name: "Indie Flower",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Indie Flower', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Indie_Flower",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap",
		},
	},
	{
		value: "ingrid-darling",
		name: "Ingrid Darling",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Ingrid Darling', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Ingrid_Darling",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ingrid+Darling&display=swap",
		},
	},
	{
		value: "inika",
		name: "Inika",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Inika', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Inika",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Inika&display=swap",
		},
	},
	{
		value: "inknut-antiqua",
		name: "Inknut Antiqua",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Inknut Antiqua', serif",
			provider: "google",
			subsets: ["devanagari", "latin", "latin-ext"],
			import: "Inknut_Antiqua",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Inknut+Antiqua&display=swap",
		},
	},
	{
		value: "inria-serif",
		name: "Inria Serif",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Inria Serif', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Inria_Serif",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Inria+Serif&display=swap",
		},
	},
	{
		value: "inspiration",
		name: "Inspiration",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Inspiration', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Inspiration",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Inspiration&display=swap",
		},
	},
	{
		value: "instrument-serif",
		name: "Instrument Serif",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Instrument Serif', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Instrument_Serif",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Instrument+Serif&display=swap",
		},
	},
	{
		value: "irish-grover",
		name: "Irish Grover",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Irish Grover', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Irish_Grover",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Irish+Grover&display=swap",
		},
	},
	{
		value: "island-moments",
		name: "Island Moments",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Island Moments', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Island_Moments",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Island+Moments&display=swap",
		},
	},
	{
		value: "italianno",
		name: "Italianno",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Italianno', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Italianno",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Italianno&display=swap",
		},
	},
	{
		value: "itim",
		name: "Itim",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Itim', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "thai", "vietnamese"],
			import: "Itim",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Itim&display=swap",
		},
	},
	{
		value: "jacques-francois",
		name: "Jacques Francois",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Jacques Francois', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Jacques_Francois",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Jacques+Francois&display=swap",
		},
	},
	{
		value: "jacques-francois-shadow",
		name: "Jacques Francois Shadow",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Jacques Francois Shadow', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Jacques_Francois_Shadow",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Jacques+Francois+Shadow&display=swap",
		},
	},
	{
		value: "jetbrains-mono",
		name: "JetBrains Mono",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'JetBrains Mono', monospace",
			provider: "google",
			subsets: [
				"cyrillic",
				"cyrillic-ext",
				"greek",
				"latin",
				"latin-ext",
				"vietnamese",
			],
			import: "JetBrains_Mono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap",
		},
	},
	{
		value: "jim-nightshade",
		name: "Jim Nightshade",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Jim Nightshade', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Jim_Nightshade",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Jim+Nightshade&display=swap",
		},
	},
	{
		value: "joan",
		name: "Joan",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Joan', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Joan",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Joan&display=swap",
		},
	},
	{
		value: "jolly-lodger",
		name: "Jolly Lodger",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Jolly Lodger', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Jolly_Lodger",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Jolly+Lodger&display=swap",
		},
	},
	{
		value: "jomhuria",
		name: "Jomhuria",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Jomhuria', sans-serif",
			provider: "google",
			subsets: ["arabic", "latin", "latin-ext"],
			import: "Jomhuria",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Jomhuria&display=swap",
		},
	},
	{
		value: "jomolhari",
		name: "Jomolhari",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Jomolhari', serif",
			provider: "google",
			subsets: ["latin", "tibetan"],
			import: "Jomolhari",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Jomolhari&display=swap",
		},
	},
	{
		value: "josefin-slab",
		name: "Josefin Slab",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Josefin Slab', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Josefin_Slab",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Josefin+Slab&display=swap",
		},
	},
	{
		value: "joti-one",
		name: "Joti One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Joti One', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Joti_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Joti+One&display=swap",
		},
	},
	{
		value: "judson",
		name: "Judson",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Judson', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Judson",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Judson&display=swap",
		},
	},
	{
		value: "julee",
		name: "Julee",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Julee', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Julee",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Julee&display=swap",
		},
	},
	{
		value: "junge",
		name: "Junge",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Junge', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Junge",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Junge&display=swap",
		},
	},
	{
		value: "just-another-hand",
		name: "Just Another Hand",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Just Another Hand', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Just_Another_Hand",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Just+Another+Hand&display=swap",
		},
	},
	{
		value: "just-me-again-down-here",
		name: "Just Me Again Down Here",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Just Me Again Down Here', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Just_Me_Again_Down_Here",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Just+Me+Again+Down+Here&display=swap",
		},
	},
	{
		value: "kablammo",
		name: "Kablammo",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Kablammo', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
			import: "Kablammo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kablammo&display=swap",
		},
	},
	{
		value: "kadwa",
		name: "Kadwa",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Kadwa', serif",
			provider: "google",
			subsets: ["devanagari", "latin"],
			import: "Kadwa",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kadwa&display=swap",
		},
	},
	{
		value: "kaisei-decol",
		name: "Kaisei Decol",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Kaisei Decol', serif",
			provider: "google",
			subsets: ["cyrillic", "japanese", "latin", "latin-ext"],
			import: "Kaisei_Decol",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kaisei+Decol&display=swap",
		},
	},
	{
		value: "kaisei-harunoumi",
		name: "Kaisei HarunoUmi",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Kaisei HarunoUmi', serif",
			provider: "google",
			subsets: ["cyrillic", "japanese", "latin", "latin-ext"],
			import: "Kaisei_HarunoUmi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kaisei+HarunoUmi&display=swap",
		},
	},
	{
		value: "kaisei-opti",
		name: "Kaisei Opti",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Kaisei Opti', serif",
			provider: "google",
			subsets: ["cyrillic", "japanese", "latin", "latin-ext"],
			import: "Kaisei_Opti",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kaisei+Opti&display=swap",
		},
	},
	{
		value: "kaisei-tokumin",
		name: "Kaisei Tokumin",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Kaisei Tokumin', serif",
			provider: "google",
			subsets: ["cyrillic", "japanese", "latin", "latin-ext"],
			import: "Kaisei_Tokumin",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kaisei+Tokumin&display=swap",
		},
	},
	{
		value: "kalam",
		name: "Kalam",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Kalam', cursive",
			provider: "google",
			subsets: ["devanagari", "latin", "latin-ext"],
			import: "Kalam",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kalam&display=swap",
		},
	},
	{
		value: "kameron",
		name: "Kameron",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Kameron', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Kameron",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kameron&display=swap",
		},
	},
	{
		value: "karantina",
		name: "Karantina",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Karantina', sans-serif",
			provider: "google",
			subsets: ["hebrew", "latin", "latin-ext"],
			import: "Karantina",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Karantina&display=swap",
		},
	},
	{
		value: "karma",
		name: "Karma",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Karma', serif",
			provider: "google",
			subsets: ["devanagari", "latin", "latin-ext"],
			import: "Karma",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Karma&display=swap",
		},
	},
	{
		value: "katibeh",
		name: "Katibeh",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Katibeh', sans-serif",
			provider: "google",
			subsets: ["arabic", "latin", "latin-ext"],
			import: "Katibeh",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Katibeh&display=swap",
		},
	},
	{
		value: "kaushan-script",
		name: "Kaushan Script",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Kaushan Script', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Kaushan_Script",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap",
		},
	},
	{
		value: "kavivanar",
		name: "Kavivanar",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Kavivanar', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "tamil"],
			import: "Kavivanar",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kavivanar&display=swap",
		},
	},
	{
		value: "kavoon",
		name: "Kavoon",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Kavoon', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Kavoon",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kavoon&display=swap",
		},
	},
	{
		value: "keania-one",
		name: "Keania One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Keania One', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Keania_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Keania+One&display=swap",
		},
	},
	{
		value: "kelly-slab",
		name: "Kelly Slab",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Kelly Slab', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "latin", "latin-ext"],
			import: "Kelly_Slab",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kelly+Slab&display=swap",
		},
	},
	{
		value: "kenia",
		name: "Kenia",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Kenia', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Kenia",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kenia&display=swap",
		},
	},
	{
		value: "kings",
		name: "Kings",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Kings', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Kings",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kings&display=swap",
		},
	},
	{
		value: "kirang-haerang",
		name: "Kirang Haerang",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Kirang Haerang', sans-serif",
			provider: "google",
			subsets: ["korean", "latin"],
			import: "Kirang_Haerang",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kirang+Haerang&display=swap",
		},
	},
	{
		value: "kiwi-maru",
		name: "Kiwi Maru",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Kiwi Maru', serif",
			provider: "google",
			subsets: ["cyrillic", "japanese", "latin", "latin-ext"],
			import: "Kiwi_Maru",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kiwi+Maru&display=swap",
		},
	},
	{
		value: "klee-one",
		name: "Klee One",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Klee One', cursive",
			provider: "google",
			subsets: ["cyrillic", "greek-ext", "japanese", "latin", "latin-ext"],
			import: "Klee_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Klee+One&display=swap",
		},
	},
	{
		value: "knewave",
		name: "Knewave",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Knewave', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Knewave",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Knewave&display=swap",
		},
	},
	{
		value: "koh-santepheap",
		name: "Koh Santepheap",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Koh Santepheap', serif",
			provider: "google",
			subsets: ["khmer", "latin"],
			import: "Koh_Santepheap",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Koh+Santepheap&display=swap",
		},
	},
	{
		value: "kolker-brush",
		name: "Kolker Brush",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Kolker Brush', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Kolker_Brush",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kolker+Brush&display=swap",
		},
	},
	{
		value: "konkhmer-sleokchher",
		name: "Konkhmer Sleokchher",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Konkhmer Sleokchher', sans-serif",
			provider: "google",
			subsets: ["khmer", "latin", "latin-ext"],
			import: "Konkhmer_Sleokchher",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Konkhmer+Sleokchher&display=swap",
		},
	},
	{
		value: "kotta-one",
		name: "Kotta One",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Kotta One', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Kotta_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kotta+One&display=swap",
		},
	},
	{
		value: "koulen",
		name: "Koulen",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Koulen', sans-serif",
			provider: "google",
			subsets: ["khmer", "latin"],
			import: "Koulen",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Koulen&display=swap",
		},
	},
	{
		value: "kranky",
		name: "Kranky",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Kranky', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Kranky",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kranky&display=swap",
		},
	},
	{
		value: "kreon",
		name: "Kreon",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Kreon', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Kreon",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kreon&display=swap",
		},
	},
	{
		value: "kristi",
		name: "Kristi",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Kristi', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Kristi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kristi&display=swap",
		},
	},
	{
		value: "kumar-one",
		name: "Kumar One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Kumar One', sans-serif",
			provider: "google",
			subsets: ["gujarati", "latin", "latin-ext"],
			import: "Kumar_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kumar+One&display=swap",
		},
	},
	{
		value: "kumar-one-outline",
		name: "Kumar One Outline",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Kumar One Outline', sans-serif",
			provider: "google",
			subsets: ["gujarati", "latin", "latin-ext"],
			import: "Kumar_One_Outline",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kumar+One+Outline&display=swap",
		},
	},
	{
		value: "kurale",
		name: "Kurale",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Kurale', serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "devanagari", "latin", "latin-ext"],
			import: "Kurale",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Kurale&display=swap",
		},
	},
	{
		value: "la-belle-aurore",
		name: "La Belle Aurore",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'La Belle Aurore', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "La_Belle_Aurore",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=La+Belle+Aurore&display=swap",
		},
	},
	{
		value: "labrada",
		name: "Labrada",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Labrada', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Labrada",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Labrada&display=swap",
		},
	},
	{
		value: "lacquer",
		name: "Lacquer",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Lacquer', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Lacquer",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Lacquer&display=swap",
		},
	},
	{
		value: "laila",
		name: "Laila",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Laila', sans-serif",
			provider: "google",
			subsets: ["devanagari", "latin", "latin-ext"],
			import: "Laila",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Laila&display=swap",
		},
	},
	{
		value: "lakki-reddy",
		name: "Lakki Reddy",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Lakki Reddy', cursive",
			provider: "google",
			subsets: ["latin", "telugu"],
			import: "Lakki_Reddy",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Lakki+Reddy&display=swap",
		},
	},
	{
		value: "lancelot",
		name: "Lancelot",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Lancelot', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Lancelot",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Lancelot&display=swap",
		},
	},
	{
		value: "langar",
		name: "Langar",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Langar', sans-serif",
			provider: "google",
			subsets: ["gurmukhi", "latin", "latin-ext"],
			import: "Langar",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Langar&display=swap",
		},
	},
	{
		value: "lateef",
		name: "Lateef",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Lateef', serif",
			provider: "google",
			subsets: ["arabic", "latin", "latin-ext"],
			import: "Lateef",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Lateef&display=swap",
		},
	},
	{
		value: "lavishly-yours",
		name: "Lavishly Yours",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Lavishly Yours', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Lavishly_Yours",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Lavishly+Yours&display=swap",
		},
	},
	{
		value: "league-script",
		name: "League Script",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'League Script', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "League_Script",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=League+Script&display=swap",
		},
	},
	{
		value: "leckerli-one",
		name: "Leckerli One",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Leckerli One', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Leckerli_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Leckerli+One&display=swap",
		},
	},
	{
		value: "ledger",
		name: "Ledger",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Ledger', serif",
			provider: "google",
			subsets: ["cyrillic", "latin", "latin-ext"],
			import: "Ledger",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ledger&display=swap",
		},
	},
	{
		value: "lekton",
		name: "Lekton",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Lekton', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Lekton",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Lekton&display=swap",
		},
	},
	{
		value: "lemon",
		name: "Lemon",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Lemon', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Lemon",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Lemon&display=swap",
		},
	},
	{
		value: "lemonada",
		name: "Lemonada",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Lemonada', sans-serif",
			provider: "google",
			subsets: ["arabic", "latin", "latin-ext", "vietnamese"],
			import: "Lemonada",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Lemonada&display=swap",
		},
	},
	{
		value: "libre-barcode-128",
		name: "Libre Barcode 128",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Libre Barcode 128', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Libre_Barcode_128",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Libre+Barcode+128&display=swap",
		},
	},
	{
		value: "libre-barcode-128-text",
		name: "Libre Barcode 128 Text",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Libre Barcode 128 Text', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Libre_Barcode_128_Text",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Libre+Barcode+128+Text&display=swap",
		},
	},
	{
		value: "libre-barcode-39",
		name: "Libre Barcode 39",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Libre Barcode 39', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Libre_Barcode_39",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Libre+Barcode+39&display=swap",
		},
	},
	{
		value: "libre-barcode-39-extended",
		name: "Libre Barcode 39 Extended",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Libre Barcode 39 Extended', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Libre_Barcode_39_Extended",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Libre+Barcode+39+Extended&display=swap",
		},
	},
	{
		value: "libre-barcode-39-extended-text",
		name: "Libre Barcode 39 Extended Text",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Libre Barcode 39 Extended Text', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Libre_Barcode_39_Extended_Text",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Libre+Barcode+39+Extended+Text&display=swap",
		},
	},
	{
		value: "libre-barcode-39-text",
		name: "Libre Barcode 39 Text",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Libre Barcode 39 Text', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Libre_Barcode_39_Text",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Libre+Barcode+39+Text&display=swap",
		},
	},
	{
		value: "libre-barcode-ean13-text",
		name: "Libre Barcode EAN13 Text",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Libre Barcode EAN13 Text', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Libre_Barcode_EAN13_Text",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Libre+Barcode+EAN13+Text&display=swap",
		},
	},
	{
		value: "libre-baskerville",
		name: "Libre Baskerville",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Libre Baskerville', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Libre_Baskerville",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap",
		},
	},
	{
		value: "libre-bodoni",
		name: "Libre Bodoni",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Libre Bodoni', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Libre_Bodoni",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Libre+Bodoni&display=swap",
		},
	},
	{
		value: "libre-caslon-display",
		name: "Libre Caslon Display",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Libre Caslon Display', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Libre_Caslon_Display",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&display=swap",
		},
	},
	{
		value: "libre-caslon-text",
		name: "Libre Caslon Text",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Libre Caslon Text', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Libre_Caslon_Text",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Libre+Caslon+Text&display=swap",
		},
	},
	{
		value: "licorice",
		name: "Licorice",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Licorice', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Licorice",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Licorice&display=swap",
		},
	},
	{
		value: "life-savers",
		name: "Life Savers",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Life Savers', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Life_Savers",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Life+Savers&display=swap",
		},
	},
	{
		value: "lilita-one",
		name: "Lilita One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Lilita One', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Lilita_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Lilita+One&display=swap",
		},
	},
	{
		value: "lily-script-one",
		name: "Lily Script One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Lily Script One', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Lily_Script_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Lily+Script+One&display=swap",
		},
	},
	{
		value: "limelight",
		name: "Limelight",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Limelight', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Limelight",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Limelight&display=swap",
		},
	},
	{
		value: "linden-hill",
		name: "Linden Hill",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Linden Hill', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Linden_Hill",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Linden+Hill&display=swap",
		},
	},
	{
		value: "lisu-bosa",
		name: "Lisu Bosa",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Lisu Bosa', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "lisu"],
			import: "Lisu_Bosa",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Lisu+Bosa&display=swap",
		},
	},
	{
		value: "literata",
		name: "Literata",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Literata', serif",
			provider: "google",
			subsets: [
				"cyrillic",
				"cyrillic-ext",
				"greek",
				"greek-ext",
				"latin",
				"latin-ext",
				"vietnamese",
			],
			import: "Literata",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Literata&display=swap",
		},
	},
	{
		value: "liu-jian-mao-cao",
		name: "Liu Jian Mao Cao",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Liu Jian Mao Cao', cursive",
			provider: "google",
			subsets: ["chinese-simplified", "latin"],
			import: "Liu_Jian_Mao_Cao",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Liu+Jian+Mao+Cao&display=swap",
		},
	},
	{
		value: "lobster",
		name: "Lobster",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Lobster', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
			import: "Lobster",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Lobster&display=swap",
		},
	},
	{
		value: "lobster-two",
		name: "Lobster Two",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Lobster Two', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Lobster_Two",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Lobster+Two&display=swap",
		},
	},
	{
		value: "londrina-outline",
		name: "Londrina Outline",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Londrina Outline', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Londrina_Outline",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Londrina+Outline&display=swap",
		},
	},
	{
		value: "londrina-shadow",
		name: "Londrina Shadow",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Londrina Shadow', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Londrina_Shadow",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Londrina+Shadow&display=swap",
		},
	},
	{
		value: "londrina-sketch",
		name: "Londrina Sketch",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Londrina Sketch', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Londrina_Sketch",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Londrina+Sketch&display=swap",
		},
	},
	{
		value: "londrina-solid",
		name: "Londrina Solid",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Londrina Solid', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Londrina_Solid",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Londrina+Solid&display=swap",
		},
	},
	{
		value: "long-cang",
		name: "Long Cang",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Long Cang', cursive",
			provider: "google",
			subsets: ["chinese-simplified", "latin"],
			import: "Long_Cang",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Long+Cang&display=swap",
		},
	},
	{
		value: "lora",
		name: "Lora",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Lora', serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
			import: "Lora",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Lora&display=swap",
		},
	},
	{
		value: "love-light",
		name: "Love Light",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Love Light', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Love_Light",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Love+Light&display=swap",
		},
	},
	{
		value: "love-ya-like-a-sister",
		name: "Love Ya Like A Sister",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Love Ya Like A Sister', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Love_Ya_Like_A_Sister",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Love+Ya+Like+A+Sister&display=swap",
		},
	},
	{
		value: "loved-by-the-king",
		name: "Loved by the King",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Loved by the King', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Loved_by_the_King",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Loved+by+the+King&display=swap",
		},
	},
	{
		value: "lovers-quarrel",
		name: "Lovers Quarrel",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Lovers Quarrel', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Lovers_Quarrel",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Lovers+Quarrel&display=swap",
		},
	},
	{
		value: "luckiest-guy",
		name: "Luckiest Guy",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Luckiest Guy', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Luckiest_Guy",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap",
		},
	},
	{
		value: "lugrasimo",
		name: "Lugrasimo",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Lugrasimo', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Lugrasimo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Lugrasimo&display=swap",
		},
	},
	{
		value: "lumanosimo",
		name: "Lumanosimo",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Lumanosimo', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Lumanosimo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Lumanosimo&display=swap",
		},
	},
	{
		value: "lusitana",
		name: "Lusitana",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Lusitana', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Lusitana",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Lusitana&display=swap",
		},
	},
	{
		value: "lustria",
		name: "Lustria",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Lustria', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Lustria",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Lustria&display=swap",
		},
	},
	{
		value: "luxurious-roman",
		name: "Luxurious Roman",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Luxurious Roman', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Luxurious_Roman",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Luxurious+Roman&display=swap",
		},
	},
	{
		value: "luxurious-script",
		name: "Luxurious Script",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Luxurious Script', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Luxurious_Script",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Luxurious+Script&display=swap",
		},
	},
	{
		value: "m-plus-1-code",
		name: "M PLUS 1 Code",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'M PLUS 1 Code', monospace",
			provider: "google",
			subsets: ["japanese", "latin", "latin-ext", "vietnamese"],
			import: "M_PLUS_1_Code",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=M+PLUS+1+Code&display=swap",
		},
	},
	{
		value: "ma-shan-zheng",
		name: "Ma Shan Zheng",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Ma Shan Zheng', cursive",
			provider: "google",
			subsets: ["chinese-simplified", "latin"],
			import: "Ma_Shan_Zheng",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap",
		},
	},
	{
		value: "macondo",
		name: "Macondo",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Macondo', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Macondo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Macondo&display=swap",
		},
	},
	{
		value: "macondo-swash-caps",
		name: "Macondo Swash Caps",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Macondo Swash Caps', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Macondo_Swash_Caps",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Macondo+Swash+Caps&display=swap",
		},
	},
	{
		value: "maiden-orange",
		name: "Maiden Orange",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Maiden Orange', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Maiden_Orange",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Maiden+Orange&display=swap",
		},
	},
	{
		value: "maitree",
		name: "Maitree",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Maitree', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "thai", "vietnamese"],
			import: "Maitree",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Maitree&display=swap",
		},
	},
	{
		value: "major-mono-display",
		name: "Major Mono Display",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Major Mono Display', monospace",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Major_Mono_Display",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap",
		},
	},
	{
		value: "mali",
		name: "Mali",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Mali', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "thai", "vietnamese"],
			import: "Mali",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mali&display=swap",
		},
	},
	{
		value: "mansalva",
		name: "Mansalva",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Mansalva', cursive",
			provider: "google",
			subsets: ["greek", "latin", "latin-ext", "vietnamese"],
			import: "Mansalva",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mansalva&display=swap",
		},
	},
	{
		value: "manuale",
		name: "Manuale",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Manuale', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Manuale",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Manuale&display=swap",
		},
	},
	{
		value: "marcellus",
		name: "Marcellus",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Marcellus', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Marcellus",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Marcellus&display=swap",
		},
	},
	{
		value: "marcellus-sc",
		name: "Marcellus SC",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Marcellus SC', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Marcellus_SC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Marcellus+SC&display=swap",
		},
	},
	{
		value: "marck-script",
		name: "Marck Script",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Marck Script', cursive",
			provider: "google",
			subsets: ["cyrillic", "latin", "latin-ext"],
			import: "Marck_Script",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Marck+Script&display=swap",
		},
	},
	{
		value: "margarine",
		name: "Margarine",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Margarine', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Margarine",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Margarine&display=swap",
		},
	},
	{
		value: "marhey",
		name: "Marhey",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Marhey', sans-serif",
			provider: "google",
			subsets: ["arabic", "latin", "latin-ext"],
			import: "Marhey",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Marhey&display=swap",
		},
	},
	{
		value: "markazi-text",
		name: "Markazi Text",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Markazi Text', serif",
			provider: "google",
			subsets: ["arabic", "latin", "latin-ext", "vietnamese"],
			import: "Markazi_Text",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Markazi+Text&display=swap",
		},
	},
	{
		value: "marko-one",
		name: "Marko One",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Marko One', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Marko_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Marko+One&display=swap",
		},
	},
	{
		value: "martel",
		name: "Martel",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Martel', serif",
			provider: "google",
			subsets: ["devanagari", "latin", "latin-ext"],
			import: "Martel",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Martel&display=swap",
		},
	},
	{
		value: "martian-mono",
		name: "Martian Mono",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Martian Mono', monospace",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
			import: "Martian_Mono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Martian+Mono&display=swap",
		},
	},
	{
		value: "mate",
		name: "Mate",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Mate', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Mate",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mate&display=swap",
		},
	},
	{
		value: "mate-sc",
		name: "Mate SC",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Mate SC', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Mate_SC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mate+SC&display=swap",
		},
	},
	{
		value: "material-icons-outlined",
		name: "Material Icons Outlined",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Material Icons Outlined', monospace",
			provider: "google",
			subsets: ["latin"],
			import: "Material_Icons_Outlined",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Material+Icons+Outlined&display=swap",
		},
	},
	{
		value: "material-icons-round",
		name: "Material Icons Round",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Material Icons Round', monospace",
			provider: "google",
			subsets: ["latin"],
			import: "Material_Icons_Round",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Material+Icons+Round&display=swap",
		},
	},
	{
		value: "material-icons-sharp",
		name: "Material Icons Sharp",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Material Icons Sharp', monospace",
			provider: "google",
			subsets: ["latin"],
			import: "Material_Icons_Sharp",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Material+Icons+Sharp&display=swap",
		},
	},
	{
		value: "material-icons-two-tone",
		name: "Material Icons Two Tone",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Material Icons Two Tone', monospace",
			provider: "google",
			subsets: ["latin"],
			import: "Material_Icons_Two_Tone",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Material+Icons+Two+Tone&display=swap",
		},
	},
	{
		value: "material-symbols-outlined",
		name: "Material Symbols Outlined",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Material Symbols Outlined', monospace",
			provider: "google",
			subsets: ["latin"],
			import: "Material_Symbols_Outlined",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap",
		},
	},
	{
		value: "material-symbols-rounded",
		name: "Material Symbols Rounded",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Material Symbols Rounded', monospace",
			provider: "google",
			subsets: ["latin"],
			import: "Material_Symbols_Rounded",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded&display=swap",
		},
	},
	{
		value: "material-symbols-sharp",
		name: "Material Symbols Sharp",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Material Symbols Sharp', monospace",
			provider: "google",
			subsets: ["latin"],
			import: "Material_Symbols_Sharp",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp&display=swap",
		},
	},
	{
		value: "mclaren",
		name: "McLaren",
		type: "registry:font",
		category: "display",
		font: {
			family: "'McLaren', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "McLaren",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=McLaren&display=swap",
		},
	},
	{
		value: "mea-culpa",
		name: "Mea Culpa",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Mea Culpa', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Mea_Culpa",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mea+Culpa&display=swap",
		},
	},
	{
		value: "meddon",
		name: "Meddon",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Meddon', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Meddon",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Meddon&display=swap",
		},
	},
	{
		value: "medievalsharp",
		name: "MedievalSharp",
		type: "registry:font",
		category: "display",
		font: {
			family: "'MedievalSharp', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "MedievalSharp",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap",
		},
	},
	{
		value: "medula-one",
		name: "Medula One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Medula One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Medula_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Medula+One&display=swap",
		},
	},
	{
		value: "megrim",
		name: "Megrim",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Megrim', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Megrim",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Megrim&display=swap",
		},
	},
	{
		value: "meie-script",
		name: "Meie Script",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Meie Script', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Meie_Script",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Meie+Script&display=swap",
		},
	},
	{
		value: "meow-script",
		name: "Meow Script",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Meow Script', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Meow_Script",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Meow+Script&display=swap",
		},
	},
	{
		value: "merienda",
		name: "Merienda",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Merienda', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Merienda",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Merienda&display=swap",
		},
	},
	{
		value: "merriweather",
		name: "Merriweather",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Merriweather', serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
			import: "Merriweather",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Merriweather&display=swap",
		},
	},
	{
		value: "metal",
		name: "Metal",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Metal', sans-serif",
			provider: "google",
			subsets: ["khmer", "latin"],
			import: "Metal",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Metal&display=swap",
		},
	},
	{
		value: "metal-mania",
		name: "Metal Mania",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Metal Mania', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Metal_Mania",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Metal+Mania&display=swap",
		},
	},
	{
		value: "metamorphous",
		name: "Metamorphous",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Metamorphous', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Metamorphous",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Metamorphous&display=swap",
		},
	},
	{
		value: "milonga",
		name: "Milonga",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Milonga', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Milonga",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Milonga&display=swap",
		},
	},
	{
		value: "miltonian",
		name: "Miltonian",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Miltonian', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Miltonian",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Miltonian&display=swap",
		},
	},
	{
		value: "miltonian-tattoo",
		name: "Miltonian Tattoo",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Miltonian Tattoo', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Miltonian_Tattoo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Miltonian+Tattoo&display=swap",
		},
	},
	{
		value: "miniver",
		name: "Miniver",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Miniver', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Miniver",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Miniver&display=swap",
		},
	},
	{
		value: "mirza",
		name: "Mirza",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Mirza', serif",
			provider: "google",
			subsets: ["arabic", "latin", "latin-ext"],
			import: "Mirza",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mirza&display=swap",
		},
	},
	{
		value: "miss-fajardose",
		name: "Miss Fajardose",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Miss Fajardose', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Miss_Fajardose",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Miss+Fajardose&display=swap",
		},
	},
	{
		value: "modak",
		name: "Modak",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Modak', sans-serif",
			provider: "google",
			subsets: ["devanagari", "latin", "latin-ext"],
			import: "Modak",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Modak&display=swap",
		},
	},
	{
		value: "modern-antiqua",
		name: "Modern Antiqua",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Modern Antiqua', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Modern_Antiqua",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Modern+Antiqua&display=swap",
		},
	},
	{
		value: "mogra",
		name: "Mogra",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Mogra', sans-serif",
			provider: "google",
			subsets: ["gujarati", "latin", "latin-ext"],
			import: "Mogra",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mogra&display=swap",
		},
	},
	{
		value: "moirai-one",
		name: "Moirai One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Moirai One', sans-serif",
			provider: "google",
			subsets: ["korean", "latin", "latin-ext"],
			import: "Moirai_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Moirai+One&display=swap",
		},
	},
	{
		value: "molle",
		name: "Molle",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Molle', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Molle",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Molle&display=swap",
		},
	},
	{
		value: "monofett",
		name: "Monofett",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Monofett', monospace",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Monofett",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Monofett&display=swap",
		},
	},
	{
		value: "monoton",
		name: "Monoton",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Monoton', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Monoton",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Monoton&display=swap",
		},
	},
	{
		value: "monsieur-la-doulaise",
		name: "Monsieur La Doulaise",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Monsieur La Doulaise', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Monsieur_La_Doulaise",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Monsieur+La+Doulaise&display=swap",
		},
	},
	{
		value: "montaga",
		name: "Montaga",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Montaga', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Montaga",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Montaga&display=swap",
		},
	},
	{
		value: "montagu-slab",
		name: "Montagu Slab",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Montagu Slab', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Montagu_Slab",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Montagu+Slab&display=swap",
		},
	},
	{
		value: "montecarlo",
		name: "MonteCarlo",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'MonteCarlo', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "MonteCarlo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=MonteCarlo&display=swap",
		},
	},
	{
		value: "montez",
		name: "Montez",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Montez', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Montez",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Montez&display=swap",
		},
	},
	{
		value: "montserrat-subrayada",
		name: "Montserrat Subrayada",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Montserrat Subrayada', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Montserrat_Subrayada",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Montserrat+Subrayada&display=swap",
		},
	},
	{
		value: "moo-lah-lah",
		name: "Moo Lah Lah",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Moo Lah Lah', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Moo_Lah_Lah",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Moo+Lah+Lah&display=swap",
		},
	},
	{
		value: "moon-dance",
		name: "Moon Dance",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Moon Dance', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Moon_Dance",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Moon+Dance&display=swap",
		},
	},
	{
		value: "moul",
		name: "Moul",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Moul', sans-serif",
			provider: "google",
			subsets: ["khmer", "latin"],
			import: "Moul",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Moul&display=swap",
		},
	},
	{
		value: "mountains-of-christmas",
		name: "Mountains of Christmas",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Mountains of Christmas', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Mountains_of_Christmas",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mountains+of+Christmas&display=swap",
		},
	},
	{
		value: "mr-bedfort",
		name: "Mr Bedfort",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Mr Bedfort', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Mr_Bedfort",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mr+Bedfort&display=swap",
		},
	},
	{
		value: "mr-dafoe",
		name: "Mr Dafoe",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Mr Dafoe', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Mr_Dafoe",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mr+Dafoe&display=swap",
		},
	},
	{
		value: "mr-de-haviland",
		name: "Mr De Haviland",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Mr De Haviland', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Mr_De_Haviland",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mr+De+Haviland&display=swap",
		},
	},
	{
		value: "mrs-saint-delafield",
		name: "Mrs Saint Delafield",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Mrs Saint Delafield', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Mrs_Saint_Delafield",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mrs+Saint+Delafield&display=swap",
		},
	},
	{
		value: "mrs-sheppards",
		name: "Mrs Sheppards",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Mrs Sheppards', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Mrs_Sheppards",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mrs+Sheppards&display=swap",
		},
	},
	{
		value: "ms-madi",
		name: "Ms Madi",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Ms Madi', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Ms_Madi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ms+Madi&display=swap",
		},
	},
	{
		value: "museomoderno",
		name: "MuseoModerno",
		type: "registry:font",
		category: "display",
		font: {
			family: "'MuseoModerno', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "MuseoModerno",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=MuseoModerno&display=swap",
		},
	},
	{
		value: "my-soul",
		name: "My Soul",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'My Soul', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "My_Soul",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=My+Soul&display=swap",
		},
	},
	{
		value: "mynerve",
		name: "Mynerve",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Mynerve', cursive",
			provider: "google",
			subsets: ["greek", "latin", "latin-ext", "vietnamese"],
			import: "Mynerve",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mynerve&display=swap",
		},
	},
	{
		value: "mystery-quest",
		name: "Mystery Quest",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Mystery Quest', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Mystery_Quest",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Mystery+Quest&display=swap",
		},
	},
	{
		value: "nabla",
		name: "Nabla",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Nabla', sans-serif",
			provider: "google",
			subsets: ["cyrillic-ext", "latin", "latin-ext", "math", "vietnamese"],
			import: "Nabla",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Nabla&display=swap",
		},
	},
	{
		value: "nanum-brush-script",
		name: "Nanum Brush Script",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Nanum Brush Script', cursive",
			provider: "google",
			subsets: ["korean", "latin"],
			import: "Nanum_Brush_Script",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Nanum+Brush+Script&display=swap",
		},
	},
	{
		value: "nanum-gothic-coding",
		name: "Nanum Gothic Coding",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Nanum Gothic Coding', cursive",
			provider: "google",
			subsets: ["korean", "latin"],
			import: "Nanum_Gothic_Coding",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding&display=swap",
		},
	},
	{
		value: "nanum-myeongjo",
		name: "Nanum Myeongjo",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Nanum Myeongjo', serif",
			provider: "google",
			subsets: ["korean", "latin"],
			import: "Nanum_Myeongjo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Nanum+Myeongjo&display=swap",
		},
	},
	{
		value: "nanum-pen-script",
		name: "Nanum Pen Script",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Nanum Pen Script', cursive",
			provider: "google",
			subsets: ["korean", "latin"],
			import: "Nanum_Pen_Script",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap",
		},
	},
	{
		value: "neonderthaw",
		name: "Neonderthaw",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Neonderthaw', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Neonderthaw",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Neonderthaw&display=swap",
		},
	},
	{
		value: "nerko-one",
		name: "Nerko One",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Nerko One', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Nerko_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Nerko+One&display=swap",
		},
	},
	{
		value: "neucha",
		name: "Neucha",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Neucha', cursive",
			provider: "google",
			subsets: ["cyrillic", "latin"],
			import: "Neucha",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Neucha&display=swap",
		},
	},
	{
		value: "neuton",
		name: "Neuton",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Neuton', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Neuton",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Neuton&display=swap",
		},
	},
	{
		value: "new-rocker",
		name: "New Rocker",
		type: "registry:font",
		category: "display",
		font: {
			family: "'New Rocker', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "New_Rocker",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=New+Rocker&display=swap",
		},
	},
	{
		value: "new-tegomin",
		name: "New Tegomin",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'New Tegomin', serif",
			provider: "google",
			subsets: ["japanese", "latin", "latin-ext"],
			import: "New_Tegomin",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=New+Tegomin&display=swap",
		},
	},
	{
		value: "newsreader",
		name: "Newsreader",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Newsreader', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Newsreader",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Newsreader&display=swap",
		},
	},
	{
		value: "niconne",
		name: "Niconne",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Niconne', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Niconne",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Niconne&display=swap",
		},
	},
	{
		value: "nixie-one",
		name: "Nixie One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Nixie One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Nixie_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Nixie+One&display=swap",
		},
	},
	{
		value: "norican",
		name: "Norican",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Norican', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Norican",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Norican&display=swap",
		},
	},
	{
		value: "nosifer",
		name: "Nosifer",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Nosifer', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Nosifer",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Nosifer&display=swap",
		},
	},
	{
		value: "nothing-you-could-do",
		name: "Nothing You Could Do",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Nothing You Could Do', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Nothing_You_Could_Do",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Nothing+You+Could+Do&display=swap",
		},
	},
	{
		value: "noticia-text",
		name: "Noticia Text",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noticia Text', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Noticia_Text",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noticia+Text&display=swap",
		},
	},
	{
		value: "noto-naskh-arabic",
		name: "Noto Naskh Arabic",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Naskh Arabic', serif",
			provider: "google",
			subsets: ["arabic", "latin", "latin-ext"],
			import: "Noto_Naskh_Arabic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic&display=swap",
		},
	},
	{
		value: "noto-nastaliq-urdu",
		name: "Noto Nastaliq Urdu",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Nastaliq Urdu', serif",
			provider: "google",
			subsets: ["arabic", "latin", "latin-ext"],
			import: "Noto_Nastaliq_Urdu",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu&display=swap",
		},
	},
	{
		value: "noto-rashi-hebrew",
		name: "Noto Rashi Hebrew",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Rashi Hebrew', serif",
			provider: "google",
			subsets: ["hebrew", "latin", "latin-ext"],
			import: "Noto_Rashi_Hebrew",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Rashi+Hebrew&display=swap",
		},
	},
	{
		value: "noto-sans-phags-pa",
		name: "Noto Sans Phags Pa",
		type: "registry:font",
		category: "sans-serif",
		font: {
			family: "'Noto Sans Phags Pa', sans-serif",
			provider: "google",
			subsets: ["phags-pa"],
			import: "Noto_Sans_Phags_Pa",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Sans+Phags+Pa&display=swap",
		},
	},
	{
		value: "noto-serif",
		name: "Noto Serif",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif', serif",
			provider: "google",
			subsets: [
				"cyrillic",
				"cyrillic-ext",
				"greek",
				"greek-ext",
				"latin",
				"latin-ext",
				"vietnamese",
			],
			import: "Noto_Serif",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap",
		},
	},
	{
		value: "noto-serif-ahom",
		name: "Noto Serif Ahom",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Ahom', serif",
			provider: "google",
			subsets: ["ahom", "latin", "latin-ext"],
			import: "Noto_Serif_Ahom",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Ahom&display=swap",
		},
	},
	{
		value: "noto-serif-armenian",
		name: "Noto Serif Armenian",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Armenian', serif",
			provider: "google",
			subsets: ["armenian", "latin", "latin-ext"],
			import: "Noto_Serif_Armenian",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Armenian&display=swap",
		},
	},
	{
		value: "noto-serif-balinese",
		name: "Noto Serif Balinese",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Balinese', serif",
			provider: "google",
			subsets: ["balinese", "latin", "latin-ext"],
			import: "Noto_Serif_Balinese",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Balinese&display=swap",
		},
	},
	{
		value: "noto-serif-bengali",
		name: "Noto Serif Bengali",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Bengali', serif",
			provider: "google",
			subsets: ["bengali", "latin", "latin-ext"],
			import: "Noto_Serif_Bengali",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali&display=swap",
		},
	},
	{
		value: "noto-serif-devanagari",
		name: "Noto Serif Devanagari",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Devanagari', serif",
			provider: "google",
			subsets: ["devanagari", "latin", "latin-ext"],
			import: "Noto_Serif_Devanagari",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Devanagari&display=swap",
		},
	},
	{
		value: "noto-serif-display",
		name: "Noto Serif Display",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Display', serif",
			provider: "google",
			subsets: [
				"cyrillic",
				"cyrillic-ext",
				"greek",
				"greek-ext",
				"latin",
				"latin-ext",
				"vietnamese",
			],
			import: "Noto_Serif_Display",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Display&display=swap",
		},
	},
	{
		value: "noto-serif-dogra",
		name: "Noto Serif Dogra",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Dogra', serif",
			provider: "google",
			subsets: ["dogra", "latin", "latin-ext"],
			import: "Noto_Serif_Dogra",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Dogra&display=swap",
		},
	},
	{
		value: "noto-serif-ethiopic",
		name: "Noto Serif Ethiopic",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Ethiopic', serif",
			provider: "google",
			subsets: ["ethiopic", "latin", "latin-ext"],
			import: "Noto_Serif_Ethiopic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Ethiopic&display=swap",
		},
	},
	{
		value: "noto-serif-georgian",
		name: "Noto Serif Georgian",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Georgian', serif",
			provider: "google",
			subsets: ["georgian", "latin", "latin-ext"],
			import: "Noto_Serif_Georgian",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Georgian&display=swap",
		},
	},
	{
		value: "noto-serif-grantha",
		name: "Noto Serif Grantha",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Grantha', serif",
			provider: "google",
			subsets: ["grantha", "latin", "latin-ext"],
			import: "Noto_Serif_Grantha",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Grantha&display=swap",
		},
	},
	{
		value: "noto-serif-gujarati",
		name: "Noto Serif Gujarati",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Gujarati', serif",
			provider: "google",
			subsets: ["gujarati", "latin", "latin-ext"],
			import: "Noto_Serif_Gujarati",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Gujarati&display=swap",
		},
	},
	{
		value: "noto-serif-gurmukhi",
		name: "Noto Serif Gurmukhi",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Gurmukhi', serif",
			provider: "google",
			subsets: ["gurmukhi", "latin", "latin-ext"],
			import: "Noto_Serif_Gurmukhi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Gurmukhi&display=swap",
		},
	},
	{
		value: "noto-serif-hk",
		name: "Noto Serif HK",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif HK', serif",
			provider: "google",
			subsets: [
				"chinese-hongkong",
				"cyrillic",
				"latin",
				"latin-ext",
				"vietnamese",
			],
			import: "Noto_Serif_HK",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+HK&display=swap",
		},
	},
	{
		value: "noto-serif-hebrew",
		name: "Noto Serif Hebrew",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Hebrew', serif",
			provider: "google",
			subsets: ["hebrew", "latin", "latin-ext"],
			import: "Noto_Serif_Hebrew",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Hebrew&display=swap",
		},
	},
	{
		value: "noto-serif-jp",
		name: "Noto Serif JP",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif JP', serif",
			provider: "google",
			subsets: ["japanese", "latin"],
			import: "Noto_Serif_JP",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+JP&display=swap",
		},
	},
	{
		value: "noto-serif-kr",
		name: "Noto Serif KR",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif KR', serif",
			provider: "google",
			subsets: ["korean", "latin"],
			import: "Noto_Serif_KR",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+KR&display=swap",
		},
	},
	{
		value: "noto-serif-kannada",
		name: "Noto Serif Kannada",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Kannada', serif",
			provider: "google",
			subsets: ["kannada", "latin", "latin-ext"],
			import: "Noto_Serif_Kannada",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Kannada&display=swap",
		},
	},
	{
		value: "noto-serif-khitan-small-script",
		name: "Noto Serif Khitan Small Script",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Khitan Small Script', serif",
			provider: "google",
			subsets: ["khitan-small-script", "latin", "latin-ext"],
			import: "Noto_Serif_Khitan_Small_Script",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Khitan+Small+Script&display=swap",
		},
	},
	{
		value: "noto-serif-khmer",
		name: "Noto Serif Khmer",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Khmer', serif",
			provider: "google",
			subsets: ["khmer", "latin", "latin-ext"],
			import: "Noto_Serif_Khmer",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Khmer&display=swap",
		},
	},
	{
		value: "noto-serif-khojki",
		name: "Noto Serif Khojki",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Khojki', serif",
			provider: "google",
			subsets: ["khojki", "latin", "latin-ext"],
			import: "Noto_Serif_Khojki",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Khojki&display=swap",
		},
	},
	{
		value: "noto-serif-lao",
		name: "Noto Serif Lao",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Lao', serif",
			provider: "google",
			subsets: ["lao", "latin", "latin-ext"],
			import: "Noto_Serif_Lao",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Lao&display=swap",
		},
	},
	{
		value: "noto-serif-makasar",
		name: "Noto Serif Makasar",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Makasar', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "makasar"],
			import: "Noto_Serif_Makasar",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Makasar&display=swap",
		},
	},
	{
		value: "noto-serif-malayalam",
		name: "Noto Serif Malayalam",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Malayalam', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "malayalam"],
			import: "Noto_Serif_Malayalam",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Malayalam&display=swap",
		},
	},
	{
		value: "noto-serif-myanmar",
		name: "Noto Serif Myanmar",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Myanmar', serif",
			provider: "google",
			subsets: ["myanmar"],
			import: "Noto_Serif_Myanmar",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Myanmar&display=swap",
		},
	},
	{
		value: "noto-serif-np-hmong",
		name: "Noto Serif NP Hmong",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif NP Hmong', serif",
			provider: "google",
			subsets: ["latin", "nyiakeng-puachue-hmong"],
			import: "Noto_Serif_NP_Hmong",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+NP+Hmong&display=swap",
		},
	},
	{
		value: "noto-serif-oriya",
		name: "Noto Serif Oriya",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Oriya', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "oriya"],
			import: "Noto_Serif_Oriya",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Oriya&display=swap",
		},
	},
	{
		value: "noto-serif-ottoman-siyaq",
		name: "Noto Serif Ottoman Siyaq",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Ottoman Siyaq', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "ottoman-siyaq-numbers"],
			import: "Noto_Serif_Ottoman_Siyaq",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Ottoman+Siyaq&display=swap",
		},
	},
	{
		value: "noto-serif-sc",
		name: "Noto Serif SC",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif SC', serif",
			provider: "google",
			subsets: ["chinese-simplified", "latin"],
			import: "Noto_Serif_SC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+SC&display=swap",
		},
	},
	{
		value: "noto-serif-sinhala",
		name: "Noto Serif Sinhala",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Sinhala', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "sinhala"],
			import: "Noto_Serif_Sinhala",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Sinhala&display=swap",
		},
	},
	{
		value: "noto-serif-tc",
		name: "Noto Serif TC",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif TC', serif",
			provider: "google",
			subsets: ["chinese-traditional", "latin"],
			import: "Noto_Serif_TC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+TC&display=swap",
		},
	},
	{
		value: "noto-serif-tamil",
		name: "Noto Serif Tamil",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Tamil', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "tamil"],
			import: "Noto_Serif_Tamil",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Tamil&display=swap",
		},
	},
	{
		value: "noto-serif-tangut",
		name: "Noto Serif Tangut",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Tangut', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "tangut"],
			import: "Noto_Serif_Tangut",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Tangut&display=swap",
		},
	},
	{
		value: "noto-serif-telugu",
		name: "Noto Serif Telugu",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Telugu', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "telugu"],
			import: "Noto_Serif_Telugu",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Telugu&display=swap",
		},
	},
	{
		value: "noto-serif-thai",
		name: "Noto Serif Thai",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Thai', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "thai"],
			import: "Noto_Serif_Thai",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Thai&display=swap",
		},
	},
	{
		value: "noto-serif-tibetan",
		name: "Noto Serif Tibetan",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Tibetan', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "tibetan"],
			import: "Noto_Serif_Tibetan",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Tibetan&display=swap",
		},
	},
	{
		value: "noto-serif-toto",
		name: "Noto Serif Toto",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Toto', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "toto"],
			import: "Noto_Serif_Toto",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Toto&display=swap",
		},
	},
	{
		value: "noto-serif-vithkuqi",
		name: "Noto Serif Vithkuqi",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Vithkuqi', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vithkuqi"],
			import: "Noto_Serif_Vithkuqi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Vithkuqi&display=swap",
		},
	},
	{
		value: "noto-serif-yezidi",
		name: "Noto Serif Yezidi",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Noto Serif Yezidi', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "yezidi"],
			import: "Noto_Serif_Yezidi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Noto+Serif+Yezidi&display=swap",
		},
	},
	{
		value: "nova-cut",
		name: "Nova Cut",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Nova Cut', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Nova_Cut",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Nova+Cut&display=swap",
		},
	},
	{
		value: "nova-flat",
		name: "Nova Flat",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Nova Flat', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Nova_Flat",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Nova+Flat&display=swap",
		},
	},
	{
		value: "nova-mono",
		name: "Nova Mono",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Nova Mono', monospace",
			provider: "google",
			subsets: ["greek", "latin"],
			import: "Nova_Mono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Nova+Mono&display=swap",
		},
	},
	{
		value: "nova-oval",
		name: "Nova Oval",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Nova Oval', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Nova_Oval",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Nova+Oval&display=swap",
		},
	},
	{
		value: "nova-round",
		name: "Nova Round",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Nova Round', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Nova_Round",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Nova+Round&display=swap",
		},
	},
	{
		value: "nova-script",
		name: "Nova Script",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Nova Script', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Nova_Script",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Nova+Script&display=swap",
		},
	},
	{
		value: "nova-slim",
		name: "Nova Slim",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Nova Slim', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Nova_Slim",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Nova+Slim&display=swap",
		},
	},
	{
		value: "nova-square",
		name: "Nova Square",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Nova Square', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Nova_Square",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Nova+Square&display=swap",
		},
	},
	{
		value: "odibee-sans",
		name: "Odibee Sans",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Odibee Sans', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Odibee_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Odibee+Sans&display=swap",
		},
	},
	{
		value: "odor-mean-chey",
		name: "Odor Mean Chey",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Odor Mean Chey', serif",
			provider: "google",
			subsets: ["khmer", "latin"],
			import: "Odor_Mean_Chey",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Odor+Mean+Chey&display=swap",
		},
	},
	{
		value: "offside",
		name: "Offside",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Offside', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Offside",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Offside&display=swap",
		},
	},
	{
		value: "oi",
		name: "Oi",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Oi', sans-serif",
			provider: "google",
			subsets: [
				"cyrillic",
				"cyrillic-ext",
				"greek",
				"latin",
				"latin-ext",
				"tamil",
				"vietnamese",
			],
			import: "Oi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Oi&display=swap",
		},
	},
	{
		value: "old-standard-tt",
		name: "Old Standard TT",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Old Standard TT', serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
			import: "Old_Standard_TT",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Old+Standard+TT&display=swap",
		},
	},
	{
		value: "oldenburg",
		name: "Oldenburg",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Oldenburg', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Oldenburg",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Oldenburg&display=swap",
		},
	},
	{
		value: "ole",
		name: "Ole",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Ole', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Ole",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ole&display=swap",
		},
	},
	{
		value: "oleo-script",
		name: "Oleo Script",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Oleo Script', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Oleo_Script",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Oleo+Script&display=swap",
		},
	},
	{
		value: "oleo-script-swash-caps",
		name: "Oleo Script Swash Caps",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Oleo Script Swash Caps', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Oleo_Script_Swash_Caps",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Oleo+Script+Swash+Caps&display=swap",
		},
	},
	{
		value: "oooh-baby",
		name: "Oooh Baby",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Oooh Baby', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Oooh_Baby",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Oooh+Baby&display=swap",
		},
	},
	{
		value: "oranienbaum",
		name: "Oranienbaum",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Oranienbaum', serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
			import: "Oranienbaum",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Oranienbaum&display=swap",
		},
	},
	{
		value: "oregano",
		name: "Oregano",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Oregano', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Oregano",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Oregano&display=swap",
		},
	},
	{
		value: "orelega-one",
		name: "Orelega One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Orelega One', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
			import: "Orelega_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Orelega+One&display=swap",
		},
	},
	{
		value: "original-surfer",
		name: "Original Surfer",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Original Surfer', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Original_Surfer",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Original+Surfer&display=swap",
		},
	},
	{
		value: "over-the-rainbow",
		name: "Over the Rainbow",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Over the Rainbow', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Over_the_Rainbow",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Over+the+Rainbow&display=swap",
		},
	},
	{
		value: "overlock",
		name: "Overlock",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Overlock', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Overlock",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Overlock&display=swap",
		},
	},
	{
		value: "overlock-sc",
		name: "Overlock SC",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Overlock SC', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Overlock_SC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Overlock+SC&display=swap",
		},
	},
	{
		value: "overpass-mono",
		name: "Overpass Mono",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Overpass Mono', monospace",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
			import: "Overpass_Mono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Overpass+Mono&display=swap",
		},
	},
	{
		value: "ovo",
		name: "Ovo",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Ovo', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Ovo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ovo&display=swap",
		},
	},
	{
		value: "oxanium",
		name: "Oxanium",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Oxanium', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Oxanium",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Oxanium&display=swap",
		},
	},
	{
		value: "oxygen-mono",
		name: "Oxygen Mono",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Oxygen Mono', monospace",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Oxygen_Mono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Oxygen+Mono&display=swap",
		},
	},
	{
		value: "pt-mono",
		name: "PT Mono",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'PT Mono', monospace",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
			import: "PT_Mono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=PT+Mono&display=swap",
		},
	},
	{
		value: "pt-serif",
		name: "PT Serif",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'PT Serif', serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
			import: "PT_Serif",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=PT+Serif&display=swap",
		},
	},
	{
		value: "pt-serif-caption",
		name: "PT Serif Caption",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'PT Serif Caption', serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
			import: "PT_Serif_Caption",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=PT+Serif+Caption&display=swap",
		},
	},
	{
		value: "pacifico",
		name: "Pacifico",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Pacifico', cursive",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
			import: "Pacifico",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Pacifico&display=swap",
		},
	},
	{
		value: "padyakke-expanded-one",
		name: "Padyakke Expanded One",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Padyakke Expanded One', serif",
			provider: "google",
			subsets: ["kannada", "latin", "latin-ext"],
			import: "Padyakke_Expanded_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Padyakke+Expanded+One&display=swap",
		},
	},
	{
		value: "palette-mosaic",
		name: "Palette Mosaic",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Palette Mosaic', sans-serif",
			provider: "google",
			subsets: ["japanese", "latin"],
			import: "Palette_Mosaic",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Palette+Mosaic&display=swap",
		},
	},
	{
		value: "pangolin",
		name: "Pangolin",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Pangolin', cursive",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
			import: "Pangolin",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Pangolin&display=swap",
		},
	},
	{
		value: "paprika",
		name: "Paprika",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Paprika', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Paprika",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Paprika&display=swap",
		},
	},
	{
		value: "parisienne",
		name: "Parisienne",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Parisienne', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Parisienne",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Parisienne&display=swap",
		},
	},
	{
		value: "passero-one",
		name: "Passero One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Passero One', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Passero_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Passero+One&display=swap",
		},
	},
	{
		value: "passion-one",
		name: "Passion One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Passion One', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Passion_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Passion+One&display=swap",
		},
	},
	{
		value: "passions-conflict",
		name: "Passions Conflict",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Passions Conflict', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Passions_Conflict",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Passions+Conflict&display=swap",
		},
	},
	{
		value: "patrick-hand",
		name: "Patrick Hand",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Patrick Hand', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Patrick_Hand",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap",
		},
	},
	{
		value: "patrick-hand-sc",
		name: "Patrick Hand SC",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Patrick Hand SC', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Patrick_Hand_SC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Patrick+Hand+SC&display=swap",
		},
	},
	{
		value: "patua-one",
		name: "Patua One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Patua One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Patua_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Patua+One&display=swap",
		},
	},
	{
		value: "peddana",
		name: "Peddana",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Peddana', serif",
			provider: "google",
			subsets: ["latin", "telugu"],
			import: "Peddana",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Peddana&display=swap",
		},
	},
	{
		value: "peralta",
		name: "Peralta",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Peralta', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Peralta",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Peralta&display=swap",
		},
	},
	{
		value: "permanent-marker",
		name: "Permanent Marker",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Permanent Marker', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Permanent_Marker",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap",
		},
	},
	{
		value: "petemoss",
		name: "Petemoss",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Petemoss', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Petemoss",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Petemoss&display=swap",
		},
	},
	{
		value: "petit-formal-script",
		name: "Petit Formal Script",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Petit Formal Script', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Petit_Formal_Script",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Petit+Formal+Script&display=swap",
		},
	},
	{
		value: "petrona",
		name: "Petrona",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Petrona', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Petrona",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Petrona&display=swap",
		},
	},
	{
		value: "phudu",
		name: "Phudu",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Phudu', sans-serif",
			provider: "google",
			subsets: ["cyrillic-ext", "latin", "latin-ext", "vietnamese"],
			import: "Phudu",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Phudu&display=swap",
		},
	},
	{
		value: "piazzolla",
		name: "Piazzolla",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Piazzolla', serif",
			provider: "google",
			subsets: [
				"cyrillic",
				"cyrillic-ext",
				"greek",
				"greek-ext",
				"latin",
				"latin-ext",
				"vietnamese",
			],
			import: "Piazzolla",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Piazzolla&display=swap",
		},
	},
	{
		value: "piedra",
		name: "Piedra",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Piedra', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Piedra",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Piedra&display=swap",
		},
	},
	{
		value: "pinyon-script",
		name: "Pinyon Script",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Pinyon Script', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Pinyon_Script",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap",
		},
	},
	{
		value: "pirata-one",
		name: "Pirata One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Pirata One', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Pirata_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Pirata+One&display=swap",
		},
	},
	{
		value: "pixelify-sans",
		name: "Pixelify Sans",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Pixelify Sans', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "latin", "latin-ext"],
			import: "Pixelify_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Pixelify+Sans&display=swap",
		},
	},
	{
		value: "plaster",
		name: "Plaster",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Plaster', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Plaster",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Plaster&display=swap",
		},
	},
	{
		value: "playball",
		name: "Playball",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Playball', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Playball",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Playball&display=swap",
		},
	},
	{
		value: "playfair",
		name: "Playfair",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Playfair', serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
			import: "Playfair",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Playfair&display=swap",
		},
	},
	{
		value: "playfair-display-sc",
		name: "Playfair Display SC",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Playfair Display SC', serif",
			provider: "google",
			subsets: ["cyrillic", "latin", "latin-ext", "vietnamese"],
			import: "Playfair_Display_SC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Playfair+Display+SC&display=swap",
		},
	},
	{
		value: "playpen-sans",
		name: "Playpen Sans",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Playpen Sans', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "math", "symbols", "vietnamese"],
			import: "Playpen_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Playpen+Sans&display=swap",
		},
	},
	{
		value: "podkova",
		name: "Podkova",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Podkova', serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
			import: "Podkova",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Podkova&display=swap",
		},
	},
	{
		value: "poiret-one",
		name: "Poiret One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Poiret One', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "latin", "latin-ext"],
			import: "Poiret_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Poiret+One&display=swap",
		},
	},
	{
		value: "poller-one",
		name: "Poller One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Poller One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Poller_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Poller+One&display=swap",
		},
	},
	{
		value: "poltawski-nowy",
		name: "Poltawski Nowy",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Poltawski Nowy', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Poltawski_Nowy",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Poltawski+Nowy&display=swap",
		},
	},
	{
		value: "poly",
		name: "Poly",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Poly', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Poly",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Poly&display=swap",
		},
	},
	{
		value: "pompiere",
		name: "Pompiere",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Pompiere', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Pompiere",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Pompiere&display=swap",
		},
	},
	{
		value: "poor-story",
		name: "Poor Story",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Poor Story', sans-serif",
			provider: "google",
			subsets: ["korean", "latin"],
			import: "Poor_Story",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Poor+Story&display=swap",
		},
	},
	{
		value: "port-lligat-slab",
		name: "Port Lligat Slab",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Port Lligat Slab', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Port_Lligat_Slab",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Port+Lligat+Slab&display=swap",
		},
	},
	{
		value: "potta-one",
		name: "Potta One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Potta One', sans-serif",
			provider: "google",
			subsets: ["japanese", "latin", "latin-ext", "vietnamese"],
			import: "Potta_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Potta+One&display=swap",
		},
	},
	{
		value: "praise",
		name: "Praise",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Praise', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Praise",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Praise&display=swap",
		},
	},
	{
		value: "prata",
		name: "Prata",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Prata', serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "vietnamese"],
			import: "Prata",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Prata&display=swap",
		},
	},
	{
		value: "press-start-2p",
		name: "Press Start 2P",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Press Start 2P', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext"],
			import: "Press_Start_2P",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap",
		},
	},
	{
		value: "pridi",
		name: "Pridi",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Pridi', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "thai", "vietnamese"],
			import: "Pridi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Pridi&display=swap",
		},
	},
	{
		value: "princess-sofia",
		name: "Princess Sofia",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Princess Sofia', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Princess_Sofia",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Princess+Sofia&display=swap",
		},
	},
	{
		value: "prociono",
		name: "Prociono",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Prociono', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Prociono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Prociono&display=swap",
		},
	},
	{
		value: "prosto-one",
		name: "Prosto One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Prosto One', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "latin", "latin-ext"],
			import: "Prosto_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Prosto+One&display=swap",
		},
	},
	{
		value: "puppies-play",
		name: "Puppies Play",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Puppies Play', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Puppies_Play",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Puppies+Play&display=swap",
		},
	},
	{
		value: "purple-purse",
		name: "Purple Purse",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Purple Purse', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Purple_Purse",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Purple+Purse&display=swap",
		},
	},
	{
		value: "quando",
		name: "Quando",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Quando', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Quando",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Quando&display=swap",
		},
	},
	{
		value: "quattrocento",
		name: "Quattrocento",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Quattrocento', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Quattrocento",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Quattrocento&display=swap",
		},
	},
	{
		value: "quintessential",
		name: "Quintessential",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Quintessential', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Quintessential",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Quintessential&display=swap",
		},
	},
	{
		value: "qwigley",
		name: "Qwigley",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Qwigley', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Qwigley",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Qwigley&display=swap",
		},
	},
	{
		value: "qwitcher-grypen",
		name: "Qwitcher Grypen",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Qwitcher Grypen', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Qwitcher_Grypen",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Qwitcher+Grypen&display=swap",
		},
	},
	{
		value: "racing-sans-one",
		name: "Racing Sans One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Racing Sans One', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Racing_Sans_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Racing+Sans+One&display=swap",
		},
	},
	{
		value: "radley",
		name: "Radley",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Radley', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Radley",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Radley&display=swap",
		},
	},
	{
		value: "rakkas",
		name: "Rakkas",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Rakkas', sans-serif",
			provider: "google",
			subsets: ["arabic", "latin", "latin-ext"],
			import: "Rakkas",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rakkas&display=swap",
		},
	},
	{
		value: "raleway-dots",
		name: "Raleway Dots",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Raleway Dots', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Raleway_Dots",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Raleway+Dots&display=swap",
		},
	},
	{
		value: "ramaraja",
		name: "Ramaraja",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Ramaraja', serif",
			provider: "google",
			subsets: ["latin", "telugu"],
			import: "Ramaraja",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ramaraja&display=swap",
		},
	},
	{
		value: "rammetto-one",
		name: "Rammetto One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Rammetto One', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Rammetto_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rammetto+One&display=swap",
		},
	},
	{
		value: "rampart-one",
		name: "Rampart One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Rampart One', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "japanese", "latin", "latin-ext"],
			import: "Rampart_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rampart+One&display=swap",
		},
	},
	{
		value: "ranchers",
		name: "Ranchers",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Ranchers', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Ranchers",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ranchers&display=swap",
		},
	},
	{
		value: "rancho",
		name: "Rancho",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Rancho', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Rancho",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rancho&display=swap",
		},
	},
	{
		value: "ranga",
		name: "Ranga",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Ranga', sans-serif",
			provider: "google",
			subsets: ["devanagari", "latin", "latin-ext"],
			import: "Ranga",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ranga&display=swap",
		},
	},
	{
		value: "rasa",
		name: "Rasa",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Rasa', serif",
			provider: "google",
			subsets: ["gujarati", "latin", "latin-ext", "vietnamese"],
			import: "Rasa",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rasa&display=swap",
		},
	},
	{
		value: "ravi-prakash",
		name: "Ravi Prakash",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Ravi Prakash', sans-serif",
			provider: "google",
			subsets: ["latin", "telugu"],
			import: "Ravi_Prakash",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ravi+Prakash&display=swap",
		},
	},
	{
		value: "red-hat-mono",
		name: "Red Hat Mono",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Red Hat Mono', monospace",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Red_Hat_Mono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Red+Hat+Mono&display=swap",
		},
	},
	{
		value: "red-rose",
		name: "Red Rose",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Red Rose', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Red_Rose",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Red+Rose&display=swap",
		},
	},
	{
		value: "redacted",
		name: "Redacted",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Redacted', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Redacted",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Redacted&display=swap",
		},
	},
	{
		value: "redacted-script",
		name: "Redacted Script",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Redacted Script', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Redacted_Script",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Redacted+Script&display=swap",
		},
	},
	{
		value: "redressed",
		name: "Redressed",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Redressed', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Redressed",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Redressed&display=swap",
		},
	},
	{
		value: "reenie-beanie",
		name: "Reenie Beanie",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Reenie Beanie', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Reenie_Beanie",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Reenie+Beanie&display=swap",
		},
	},
	{
		value: "reggae-one",
		name: "Reggae One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Reggae One', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "japanese", "latin", "latin-ext"],
			import: "Reggae_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Reggae+One&display=swap",
		},
	},
	{
		value: "revalia",
		name: "Revalia",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Revalia', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Revalia",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Revalia&display=swap",
		},
	},
	{
		value: "rhodium-libre",
		name: "Rhodium Libre",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Rhodium Libre', serif",
			provider: "google",
			subsets: ["devanagari", "latin", "latin-ext"],
			import: "Rhodium_Libre",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rhodium+Libre&display=swap",
		},
	},
	{
		value: "ribeye",
		name: "Ribeye",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Ribeye', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Ribeye",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ribeye&display=swap",
		},
	},
	{
		value: "ribeye-marrow",
		name: "Ribeye Marrow",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Ribeye Marrow', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Ribeye_Marrow",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ribeye+Marrow&display=swap",
		},
	},
	{
		value: "righteous",
		name: "Righteous",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Righteous', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Righteous",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Righteous&display=swap",
		},
	},
	{
		value: "risque",
		name: "Risque",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Risque', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Risque",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Risque&display=swap",
		},
	},
	{
		value: "road-rage",
		name: "Road Rage",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Road Rage', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Road_Rage",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Road+Rage&display=swap",
		},
	},
	{
		value: "roboto-mono",
		name: "Roboto Mono",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Roboto Mono', monospace",
			provider: "google",
			subsets: [
				"cyrillic",
				"cyrillic-ext",
				"greek",
				"latin",
				"latin-ext",
				"vietnamese",
			],
			import: "Roboto_Mono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap",
		},
	},
	{
		value: "roboto-serif",
		name: "Roboto Serif",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Roboto Serif', serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
			import: "Roboto_Serif",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Roboto+Serif&display=swap",
		},
	},
	{
		value: "roboto-slab",
		name: "Roboto Slab",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Roboto Slab', serif",
			provider: "google",
			subsets: [
				"cyrillic",
				"cyrillic-ext",
				"greek",
				"greek-ext",
				"latin",
				"latin-ext",
				"vietnamese",
			],
			import: "Roboto_Slab",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap",
		},
	},
	{
		value: "rochester",
		name: "Rochester",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Rochester', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Rochester",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rochester&display=swap",
		},
	},
	{
		value: "rock-3d",
		name: "Rock 3D",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Rock 3D', sans-serif",
			provider: "google",
			subsets: ["japanese", "latin"],
			import: "Rock_3D",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rock+3D&display=swap",
		},
	},
	{
		value: "rock-salt",
		name: "Rock Salt",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Rock Salt', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Rock_Salt",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap",
		},
	},
	{
		value: "rokkitt",
		name: "Rokkitt",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Rokkitt', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Rokkitt",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rokkitt&display=swap",
		},
	},
	{
		value: "romanesco",
		name: "Romanesco",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Romanesco', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Romanesco",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Romanesco&display=swap",
		},
	},
	{
		value: "rosarivo",
		name: "Rosarivo",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Rosarivo', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Rosarivo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rosarivo&display=swap",
		},
	},
	{
		value: "rouge-script",
		name: "Rouge Script",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Rouge Script', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Rouge_Script",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rouge+Script&display=swap",
		},
	},
	{
		value: "rowdies",
		name: "Rowdies",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Rowdies', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Rowdies",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rowdies&display=swap",
		},
	},
	{
		value: "rozha-one",
		name: "Rozha One",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Rozha One', serif",
			provider: "google",
			subsets: ["devanagari", "latin", "latin-ext"],
			import: "Rozha_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rozha+One&display=swap",
		},
	},
	{
		value: "rubik-80s-fade",
		name: "Rubik 80s Fade",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Rubik 80s Fade', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "hebrew", "latin", "latin-ext"],
			import: "Rubik_80s_Fade",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rubik+80s+Fade&display=swap",
		},
	},
	{
		value: "rubik-beastly",
		name: "Rubik Beastly",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Rubik Beastly', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "hebrew", "latin", "latin-ext"],
			import: "Rubik_Beastly",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rubik+Beastly&display=swap",
		},
	},
	{
		value: "rubik-bubbles",
		name: "Rubik Bubbles",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Rubik Bubbles', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "hebrew", "latin", "latin-ext"],
			import: "Rubik_Bubbles",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rubik+Bubbles&display=swap",
		},
	},
	{
		value: "rubik-burned",
		name: "Rubik Burned",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Rubik Burned', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "hebrew", "latin", "latin-ext"],
			import: "Rubik_Burned",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rubik+Burned&display=swap",
		},
	},
	{
		value: "rubik-dirt",
		name: "Rubik Dirt",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Rubik Dirt', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "hebrew", "latin", "latin-ext"],
			import: "Rubik_Dirt",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rubik+Dirt&display=swap",
		},
	},
	{
		value: "rubik-distressed",
		name: "Rubik Distressed",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Rubik Distressed', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "hebrew", "latin", "latin-ext"],
			import: "Rubik_Distressed",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rubik+Distressed&display=swap",
		},
	},
	{
		value: "rubik-gemstones",
		name: "Rubik Gemstones",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Rubik Gemstones', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "hebrew", "latin", "latin-ext"],
			import: "Rubik_Gemstones",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rubik+Gemstones&display=swap",
		},
	},
	{
		value: "rubik-glitch",
		name: "Rubik Glitch",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Rubik Glitch', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "hebrew", "latin", "latin-ext"],
			import: "Rubik_Glitch",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rubik+Glitch&display=swap",
		},
	},
	{
		value: "rubik-iso",
		name: "Rubik Iso",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Rubik Iso', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "hebrew", "latin", "latin-ext"],
			import: "Rubik_Iso",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rubik+Iso&display=swap",
		},
	},
	{
		value: "rubik-marker-hatch",
		name: "Rubik Marker Hatch",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Rubik Marker Hatch', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "hebrew", "latin", "latin-ext"],
			import: "Rubik_Marker_Hatch",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rubik+Marker+Hatch&display=swap",
		},
	},
	{
		value: "rubik-maze",
		name: "Rubik Maze",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Rubik Maze', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "hebrew", "latin", "latin-ext"],
			import: "Rubik_Maze",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rubik+Maze&display=swap",
		},
	},
	{
		value: "rubik-microbe",
		name: "Rubik Microbe",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Rubik Microbe', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "hebrew", "latin", "latin-ext"],
			import: "Rubik_Microbe",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rubik+Microbe&display=swap",
		},
	},
	{
		value: "rubik-moonrocks",
		name: "Rubik Moonrocks",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Rubik Moonrocks', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "hebrew", "latin", "latin-ext"],
			import: "Rubik_Moonrocks",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rubik+Moonrocks&display=swap",
		},
	},
	{
		value: "rubik-pixels",
		name: "Rubik Pixels",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Rubik Pixels', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "hebrew", "latin", "latin-ext"],
			import: "Rubik_Pixels",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rubik+Pixels&display=swap",
		},
	},
	{
		value: "rubik-puddles",
		name: "Rubik Puddles",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Rubik Puddles', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "hebrew", "latin", "latin-ext"],
			import: "Rubik_Puddles",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rubik+Puddles&display=swap",
		},
	},
	{
		value: "rubik-spray-paint",
		name: "Rubik Spray Paint",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Rubik Spray Paint', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "hebrew", "latin", "latin-ext"],
			import: "Rubik_Spray_Paint",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rubik+Spray+Paint&display=swap",
		},
	},
	{
		value: "rubik-storm",
		name: "Rubik Storm",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Rubik Storm', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "hebrew", "latin", "latin-ext"],
			import: "Rubik_Storm",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rubik+Storm&display=swap",
		},
	},
	{
		value: "rubik-vinyl",
		name: "Rubik Vinyl",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Rubik Vinyl', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "hebrew", "latin", "latin-ext"],
			import: "Rubik_Vinyl",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rubik+Vinyl&display=swap",
		},
	},
	{
		value: "rubik-wet-paint",
		name: "Rubik Wet Paint",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Rubik Wet Paint', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "hebrew", "latin", "latin-ext"],
			import: "Rubik_Wet_Paint",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rubik+Wet+Paint&display=swap",
		},
	},
	{
		value: "rufina",
		name: "Rufina",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Rufina', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Rufina",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rufina&display=swap",
		},
	},
	{
		value: "ruge-boogie",
		name: "Ruge Boogie",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Ruge Boogie', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Ruge_Boogie",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ruge+Boogie&display=swap",
		},
	},
	{
		value: "ruslan-display",
		name: "Ruslan Display",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Ruslan Display', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "latin", "latin-ext"],
			import: "Ruslan_Display",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ruslan+Display&display=swap",
		},
	},
	{
		value: "ruthie",
		name: "Ruthie",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Ruthie', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Ruthie",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ruthie&display=swap",
		},
	},
	{
		value: "ruwudu",
		name: "Ruwudu",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Ruwudu', serif",
			provider: "google",
			subsets: ["arabic", "latin", "latin-ext"],
			import: "Ruwudu",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ruwudu&display=swap",
		},
	},
	{
		value: "rye",
		name: "Rye",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Rye', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Rye",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Rye&display=swap",
		},
	},
	{
		value: "stix-two-text",
		name: "STIX Two Text",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'STIX Two Text', serif",
			provider: "google",
			subsets: [
				"cyrillic",
				"cyrillic-ext",
				"greek",
				"latin",
				"latin-ext",
				"vietnamese",
			],
			import: "STIX_Two_Text",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=STIX+Two+Text&display=swap",
		},
	},
	{
		value: "sacramento",
		name: "Sacramento",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Sacramento', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Sacramento",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sacramento&display=swap",
		},
	},
	{
		value: "sahitya",
		name: "Sahitya",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Sahitya', serif",
			provider: "google",
			subsets: ["devanagari", "latin"],
			import: "Sahitya",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sahitya&display=swap",
		},
	},
	{
		value: "sail",
		name: "Sail",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Sail', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Sail",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sail&display=swap",
		},
	},
	{
		value: "saira-stencil-one",
		name: "Saira Stencil One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Saira Stencil One', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Saira_Stencil_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Saira+Stencil+One&display=swap",
		},
	},
	{
		value: "salsa",
		name: "Salsa",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Salsa', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Salsa",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Salsa&display=swap",
		},
	},
	{
		value: "sanchez",
		name: "Sanchez",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Sanchez', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Sanchez",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sanchez&display=swap",
		},
	},
	{
		value: "sancreek",
		name: "Sancreek",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Sancreek', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Sancreek",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sancreek&display=swap",
		},
	},
	{
		value: "sansita-swashed",
		name: "Sansita Swashed",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Sansita Swashed', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Sansita_Swashed",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sansita+Swashed&display=swap",
		},
	},
	{
		value: "sarina",
		name: "Sarina",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Sarina', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Sarina",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sarina&display=swap",
		},
	},
	{
		value: "sassy-frass",
		name: "Sassy Frass",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Sassy Frass', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Sassy_Frass",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sassy+Frass&display=swap",
		},
	},
	{
		value: "satisfy",
		name: "Satisfy",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Satisfy', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Satisfy",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Satisfy&display=swap",
		},
	},
	{
		value: "sawarabi-mincho",
		name: "Sawarabi Mincho",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Sawarabi Mincho', serif",
			provider: "google",
			subsets: ["japanese", "latin", "latin-ext"],
			import: "Sawarabi_Mincho",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sawarabi+Mincho&display=swap",
		},
	},
	{
		value: "scheherazade-new",
		name: "Scheherazade New",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Scheherazade New', serif",
			provider: "google",
			subsets: ["arabic", "latin", "latin-ext"],
			import: "Scheherazade_New",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Scheherazade+New&display=swap",
		},
	},
	{
		value: "schoolbell",
		name: "Schoolbell",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Schoolbell', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Schoolbell",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Schoolbell&display=swap",
		},
	},
	{
		value: "scope-one",
		name: "Scope One",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Scope One', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Scope_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Scope+One&display=swap",
		},
	},
	{
		value: "seaweed-script",
		name: "Seaweed Script",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Seaweed Script', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Seaweed_Script",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Seaweed+Script&display=swap",
		},
	},
	{
		value: "sedgwick-ave",
		name: "Sedgwick Ave",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Sedgwick Ave', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Sedgwick_Ave",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sedgwick+Ave&display=swap",
		},
	},
	{
		value: "sedgwick-ave-display",
		name: "Sedgwick Ave Display",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Sedgwick Ave Display', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Sedgwick_Ave_Display",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sedgwick+Ave+Display&display=swap",
		},
	},
	{
		value: "send-flowers",
		name: "Send Flowers",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Send Flowers', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Send_Flowers",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Send+Flowers&display=swap",
		},
	},
	{
		value: "sevillana",
		name: "Sevillana",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Sevillana', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Sevillana",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sevillana&display=swap",
		},
	},
	{
		value: "shadows-into-light",
		name: "Shadows Into Light",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Shadows Into Light', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Shadows_Into_Light",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap",
		},
	},
	{
		value: "shadows-into-light-two",
		name: "Shadows Into Light Two",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Shadows Into Light Two', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Shadows_Into_Light_Two",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Shadows+Into+Light+Two&display=swap",
		},
	},
	{
		value: "shalimar",
		name: "Shalimar",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Shalimar', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Shalimar",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Shalimar&display=swap",
		},
	},
	{
		value: "shantell-sans",
		name: "Shantell Sans",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Shantell Sans', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
			import: "Shantell_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Shantell+Sans&display=swap",
		},
	},
	{
		value: "share-tech-mono",
		name: "Share Tech Mono",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Share Tech Mono', monospace",
			provider: "google",
			subsets: ["latin"],
			import: "Share_Tech_Mono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap",
		},
	},
	{
		value: "shippori-mincho",
		name: "Shippori Mincho",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Shippori Mincho', serif",
			provider: "google",
			subsets: ["japanese", "latin", "latin-ext"],
			import: "Shippori_Mincho",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Shippori+Mincho&display=swap",
		},
	},
	{
		value: "shippori-mincho-b1",
		name: "Shippori Mincho B1",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Shippori Mincho B1', serif",
			provider: "google",
			subsets: ["japanese", "latin", "latin-ext"],
			import: "Shippori_Mincho_B1",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1&display=swap",
		},
	},
	{
		value: "shizuru",
		name: "Shizuru",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Shizuru', sans-serif",
			provider: "google",
			subsets: ["japanese", "latin"],
			import: "Shizuru",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Shizuru&display=swap",
		},
	},
	{
		value: "shojumaru",
		name: "Shojumaru",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Shojumaru', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Shojumaru",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Shojumaru&display=swap",
		},
	},
	{
		value: "short-stack",
		name: "Short Stack",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Short Stack', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Short_Stack",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Short+Stack&display=swap",
		},
	},
	{
		value: "shrikhand",
		name: "Shrikhand",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Shrikhand', sans-serif",
			provider: "google",
			subsets: ["gujarati", "latin", "latin-ext"],
			import: "Shrikhand",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Shrikhand&display=swap",
		},
	},
	{
		value: "sigmar",
		name: "Sigmar",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Sigmar', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Sigmar",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sigmar&display=swap",
		},
	},
	{
		value: "sigmar-one",
		name: "Sigmar One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Sigmar One', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Sigmar_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sigmar+One&display=swap",
		},
	},
	{
		value: "silkscreen",
		name: "Silkscreen",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Silkscreen', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Silkscreen",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Silkscreen&display=swap",
		},
	},
	{
		value: "simonetta",
		name: "Simonetta",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Simonetta', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Simonetta",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Simonetta&display=swap",
		},
	},
	{
		value: "single-day",
		name: "Single Day",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Single Day', sans-serif",
			provider: "google",
			subsets: ["korean"],
			import: "Single_Day",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Single+Day&display=swap",
		},
	},
	{
		value: "sirin-stencil",
		name: "Sirin Stencil",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Sirin Stencil', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Sirin_Stencil",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sirin+Stencil&display=swap",
		},
	},
	{
		value: "skranji",
		name: "Skranji",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Skranji', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Skranji",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Skranji&display=swap",
		},
	},
	{
		value: "slabo-13px",
		name: "Slabo 13px",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Slabo 13px', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Slabo_13px",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Slabo+13px&display=swap",
		},
	},
	{
		value: "slabo-27px",
		name: "Slabo 27px",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Slabo 27px', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Slabo_27px",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Slabo+27px&display=swap",
		},
	},
	{
		value: "slackey",
		name: "Slackey",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Slackey', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Slackey",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Slackey&display=swap",
		},
	},
	{
		value: "slackside-one",
		name: "Slackside One",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Slackside One', cursive",
			provider: "google",
			subsets: ["japanese", "latin", "latin-ext"],
			import: "Slackside_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Slackside+One&display=swap",
		},
	},
	{
		value: "smokum",
		name: "Smokum",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Smokum', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Smokum",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Smokum&display=swap",
		},
	},
	{
		value: "smooch",
		name: "Smooch",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Smooch', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Smooch",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Smooch&display=swap",
		},
	},
	{
		value: "smythe",
		name: "Smythe",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Smythe', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Smythe",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Smythe&display=swap",
		},
	},
	{
		value: "sniglet",
		name: "Sniglet",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Sniglet', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Sniglet",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sniglet&display=swap",
		},
	},
	{
		value: "snowburst-one",
		name: "Snowburst One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Snowburst One', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Snowburst_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Snowburst+One&display=swap",
		},
	},
	{
		value: "sofadi-one",
		name: "Sofadi One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Sofadi One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Sofadi_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sofadi+One&display=swap",
		},
	},
	{
		value: "sofia",
		name: "Sofia",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Sofia', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Sofia",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sofia&display=swap",
		},
	},
	{
		value: "solitreo",
		name: "Solitreo",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Solitreo', cursive",
			provider: "google",
			subsets: ["hebrew", "latin", "latin-ext"],
			import: "Solitreo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Solitreo&display=swap",
		},
	},
	{
		value: "solway",
		name: "Solway",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Solway', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Solway",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Solway&display=swap",
		},
	},
	{
		value: "sometype-mono",
		name: "Sometype Mono",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Sometype Mono', monospace",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Sometype_Mono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sometype+Mono&display=swap",
		},
	},
	{
		value: "song-myung",
		name: "Song Myung",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Song Myung', serif",
			provider: "google",
			subsets: ["korean", "latin"],
			import: "Song_Myung",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Song+Myung&display=swap",
		},
	},
	{
		value: "sonsie-one",
		name: "Sonsie One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Sonsie One', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Sonsie_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sonsie+One&display=swap",
		},
	},
	{
		value: "sorts-mill-goudy",
		name: "Sorts Mill Goudy",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Sorts Mill Goudy', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Sorts_Mill_Goudy",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sorts+Mill+Goudy&display=swap",
		},
	},
	{
		value: "source-code-pro",
		name: "Source Code Pro",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Source Code Pro', monospace",
			provider: "google",
			subsets: [
				"cyrillic",
				"cyrillic-ext",
				"greek",
				"greek-ext",
				"latin",
				"latin-ext",
				"vietnamese",
			],
			import: "Source_Code_Pro",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap",
		},
	},
	{
		value: "source-serif-4",
		name: "Source Serif 4",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Source Serif 4', serif",
			provider: "google",
			subsets: [
				"cyrillic",
				"cyrillic-ext",
				"greek",
				"latin",
				"latin-ext",
				"vietnamese",
			],
			import: "Source_Serif_4",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Source+Serif+4&display=swap",
		},
	},
	{
		value: "space-mono",
		name: "Space Mono",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Space Mono', monospace",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Space_Mono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Space+Mono&display=swap",
		},
	},
	{
		value: "special-elite",
		name: "Special Elite",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Special Elite', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Special_Elite",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Special+Elite&display=swap",
		},
	},
	{
		value: "spectral",
		name: "Spectral",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Spectral', serif",
			provider: "google",
			subsets: ["cyrillic", "latin", "latin-ext", "vietnamese"],
			import: "Spectral",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Spectral&display=swap",
		},
	},
	{
		value: "spectral-sc",
		name: "Spectral SC",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Spectral SC', serif",
			provider: "google",
			subsets: ["cyrillic", "latin", "latin-ext", "vietnamese"],
			import: "Spectral_SC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Spectral+SC&display=swap",
		},
	},
	{
		value: "spicy-rice",
		name: "Spicy Rice",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Spicy Rice', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Spicy_Rice",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Spicy+Rice&display=swap",
		},
	},
	{
		value: "spirax",
		name: "Spirax",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Spirax', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Spirax",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Spirax&display=swap",
		},
	},
	{
		value: "splash",
		name: "Splash",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Splash', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Splash",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Splash&display=swap",
		},
	},
	{
		value: "spline-sans-mono",
		name: "Spline Sans Mono",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Spline Sans Mono', monospace",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Spline_Sans_Mono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Spline+Sans+Mono&display=swap",
		},
	},
	{
		value: "squada-one",
		name: "Squada One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Squada One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Squada_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Squada+One&display=swap",
		},
	},
	{
		value: "square-peg",
		name: "Square Peg",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Square Peg', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Square_Peg",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Square+Peg&display=swap",
		},
	},
	{
		value: "sree-krushnadevaraya",
		name: "Sree Krushnadevaraya",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Sree Krushnadevaraya', serif",
			provider: "google",
			subsets: ["latin", "telugu"],
			import: "Sree_Krushnadevaraya",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sree+Krushnadevaraya&display=swap",
		},
	},
	{
		value: "sriracha",
		name: "Sriracha",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Sriracha', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "thai", "vietnamese"],
			import: "Sriracha",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sriracha&display=swap",
		},
	},
	{
		value: "srisakdi",
		name: "Srisakdi",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Srisakdi', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "thai", "vietnamese"],
			import: "Srisakdi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Srisakdi&display=swap",
		},
	},
	{
		value: "staatliches",
		name: "Staatliches",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Staatliches', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Staatliches",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Staatliches&display=swap",
		},
	},
	{
		value: "stalemate",
		name: "Stalemate",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Stalemate', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Stalemate",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Stalemate&display=swap",
		},
	},
	{
		value: "stalinist-one",
		name: "Stalinist One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Stalinist One', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "latin", "latin-ext"],
			import: "Stalinist_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Stalinist+One&display=swap",
		},
	},
	{
		value: "stardos-stencil",
		name: "Stardos Stencil",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Stardos Stencil', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Stardos_Stencil",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Stardos+Stencil&display=swap",
		},
	},
	{
		value: "stint-ultra-condensed",
		name: "Stint Ultra Condensed",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Stint Ultra Condensed', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Stint_Ultra_Condensed",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Stint+Ultra+Condensed&display=swap",
		},
	},
	{
		value: "stint-ultra-expanded",
		name: "Stint Ultra Expanded",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Stint Ultra Expanded', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Stint_Ultra_Expanded",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Stint+Ultra+Expanded&display=swap",
		},
	},
	{
		value: "stoke",
		name: "Stoke",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Stoke', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Stoke",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Stoke&display=swap",
		},
	},
	{
		value: "style-script",
		name: "Style Script",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Style Script', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Style_Script",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Style+Script&display=swap",
		},
	},
	{
		value: "sue-ellen-francisco",
		name: "Sue Ellen Francisco",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Sue Ellen Francisco', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Sue_Ellen_Francisco",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sue+Ellen+Francisco&display=swap",
		},
	},
	{
		value: "suez-one",
		name: "Suez One",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Suez One', serif",
			provider: "google",
			subsets: ["hebrew", "latin", "latin-ext"],
			import: "Suez_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Suez+One&display=swap",
		},
	},
	{
		value: "sumana",
		name: "Sumana",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Sumana', serif",
			provider: "google",
			subsets: ["devanagari", "latin", "latin-ext"],
			import: "Sumana",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sumana&display=swap",
		},
	},
	{
		value: "sunshiney",
		name: "Sunshiney",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Sunshiney', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Sunshiney",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sunshiney&display=swap",
		},
	},
	{
		value: "supermercado-one",
		name: "Supermercado One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Supermercado One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Supermercado_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Supermercado+One&display=swap",
		},
	},
	{
		value: "sura",
		name: "Sura",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Sura', serif",
			provider: "google",
			subsets: ["devanagari", "latin", "latin-ext"],
			import: "Sura",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Sura&display=swap",
		},
	},
	{
		value: "suranna",
		name: "Suranna",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Suranna', serif",
			provider: "google",
			subsets: ["latin", "telugu"],
			import: "Suranna",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Suranna&display=swap",
		},
	},
	{
		value: "suravaram",
		name: "Suravaram",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Suravaram', serif",
			provider: "google",
			subsets: ["latin", "telugu"],
			import: "Suravaram",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Suravaram&display=swap",
		},
	},
	{
		value: "suwannaphum",
		name: "Suwannaphum",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Suwannaphum', serif",
			provider: "google",
			subsets: ["khmer", "latin"],
			import: "Suwannaphum",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Suwannaphum&display=swap",
		},
	},
	{
		value: "swanky-and-moo-moo",
		name: "Swanky and Moo Moo",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Swanky and Moo Moo', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Swanky_and_Moo_Moo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Swanky+and+Moo+Moo&display=swap",
		},
	},
	{
		value: "syne-mono",
		name: "Syne Mono",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Syne Mono', monospace",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Syne_Mono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Syne+Mono&display=swap",
		},
	},
	{
		value: "syne-tactile",
		name: "Syne Tactile",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Syne Tactile', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Syne_Tactile",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Syne+Tactile&display=swap",
		},
	},
	{
		value: "tai-heritage-pro",
		name: "Tai Heritage Pro",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Tai Heritage Pro', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "tai-viet", "vietnamese"],
			import: "Tai_Heritage_Pro",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Tai+Heritage+Pro&display=swap",
		},
	},
	{
		value: "tangerine",
		name: "Tangerine",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Tangerine', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Tangerine",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Tangerine&display=swap",
		},
	},
	{
		value: "tapestry",
		name: "Tapestry",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Tapestry', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Tapestry",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Tapestry&display=swap",
		},
	},
	{
		value: "taprom",
		name: "Taprom",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Taprom', sans-serif",
			provider: "google",
			subsets: ["khmer", "latin"],
			import: "Taprom",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Taprom&display=swap",
		},
	},
	{
		value: "taviraj",
		name: "Taviraj",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Taviraj', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "thai", "vietnamese"],
			import: "Taviraj",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Taviraj&display=swap",
		},
	},
	{
		value: "tektur",
		name: "Tektur",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Tektur', sans-serif",
			provider: "google",
			subsets: [
				"cyrillic",
				"cyrillic-ext",
				"greek",
				"latin",
				"latin-ext",
				"vietnamese",
			],
			import: "Tektur",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Tektur&display=swap",
		},
	},
	{
		value: "texturina",
		name: "Texturina",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Texturina', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Texturina",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Texturina&display=swap",
		},
	},
	{
		value: "the-girl-next-door",
		name: "The Girl Next Door",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'The Girl Next Door', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "The_Girl_Next_Door",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=The+Girl+Next+Door&display=swap",
		},
	},
	{
		value: "the-nautigal",
		name: "The Nautigal",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'The Nautigal', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "The_Nautigal",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=The+Nautigal&display=swap",
		},
	},
	{
		value: "tienne",
		name: "Tienne",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Tienne', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Tienne",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Tienne&display=swap",
		},
	},
	{
		value: "tillana",
		name: "Tillana",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Tillana', sans-serif",
			provider: "google",
			subsets: ["devanagari", "latin", "latin-ext"],
			import: "Tillana",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Tillana&display=swap",
		},
	},
	{
		value: "tilt-neon",
		name: "Tilt Neon",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Tilt Neon', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Tilt_Neon",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Tilt+Neon&display=swap",
		},
	},
	{
		value: "tilt-prism",
		name: "Tilt Prism",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Tilt Prism', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Tilt_Prism",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Tilt+Prism&display=swap",
		},
	},
	{
		value: "tilt-warp",
		name: "Tilt Warp",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Tilt Warp', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Tilt_Warp",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Tilt+Warp&display=swap",
		},
	},
	{
		value: "tinos",
		name: "Tinos",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Tinos', serif",
			provider: "google",
			subsets: [
				"cyrillic",
				"cyrillic-ext",
				"greek",
				"greek-ext",
				"hebrew",
				"latin",
				"latin-ext",
				"vietnamese",
			],
			import: "Tinos",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Tinos&display=swap",
		},
	},
	{
		value: "tiro-bangla",
		name: "Tiro Bangla",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Tiro Bangla', serif",
			provider: "google",
			subsets: ["bengali", "latin", "latin-ext"],
			import: "Tiro_Bangla",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Tiro+Bangla&display=swap",
		},
	},
	{
		value: "tiro-devanagari-hindi",
		name: "Tiro Devanagari Hindi",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Tiro Devanagari Hindi', serif",
			provider: "google",
			subsets: ["devanagari", "latin", "latin-ext"],
			import: "Tiro_Devanagari_Hindi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi&display=swap",
		},
	},
	{
		value: "tiro-devanagari-marathi",
		name: "Tiro Devanagari Marathi",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Tiro Devanagari Marathi', serif",
			provider: "google",
			subsets: ["devanagari", "latin", "latin-ext"],
			import: "Tiro_Devanagari_Marathi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Marathi&display=swap",
		},
	},
	{
		value: "tiro-devanagari-sanskrit",
		name: "Tiro Devanagari Sanskrit",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Tiro Devanagari Sanskrit', serif",
			provider: "google",
			subsets: ["devanagari", "latin", "latin-ext"],
			import: "Tiro_Devanagari_Sanskrit",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Sanskrit&display=swap",
		},
	},
	{
		value: "tiro-gurmukhi",
		name: "Tiro Gurmukhi",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Tiro Gurmukhi', serif",
			provider: "google",
			subsets: ["gurmukhi", "latin", "latin-ext"],
			import: "Tiro_Gurmukhi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Tiro+Gurmukhi&display=swap",
		},
	},
	{
		value: "tiro-kannada",
		name: "Tiro Kannada",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Tiro Kannada', serif",
			provider: "google",
			subsets: ["kannada", "latin", "latin-ext"],
			import: "Tiro_Kannada",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Tiro+Kannada&display=swap",
		},
	},
	{
		value: "tiro-tamil",
		name: "Tiro Tamil",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Tiro Tamil', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "tamil"],
			import: "Tiro_Tamil",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Tiro+Tamil&display=swap",
		},
	},
	{
		value: "tiro-telugu",
		name: "Tiro Telugu",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Tiro Telugu', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "telugu"],
			import: "Tiro_Telugu",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Tiro+Telugu&display=swap",
		},
	},
	{
		value: "titan-one",
		name: "Titan One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Titan One', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Titan_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Titan+One&display=swap",
		},
	},
	{
		value: "tourney",
		name: "Tourney",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Tourney', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Tourney",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Tourney&display=swap",
		},
	},
	{
		value: "trade-winds",
		name: "Trade Winds",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Trade Winds', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Trade_Winds",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Trade+Winds&display=swap",
		},
	},
	{
		value: "train-one",
		name: "Train One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Train One', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "japanese", "latin", "latin-ext"],
			import: "Train_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Train+One&display=swap",
		},
	},
	{
		value: "trirong",
		name: "Trirong",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Trirong', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "thai", "vietnamese"],
			import: "Trirong",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Trirong&display=swap",
		},
	},
	{
		value: "trocchi",
		name: "Trocchi",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Trocchi', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Trocchi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Trocchi&display=swap",
		},
	},
	{
		value: "trochut",
		name: "Trochut",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Trochut', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Trochut",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Trochut&display=swap",
		},
	},
	{
		value: "trykker",
		name: "Trykker",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Trykker', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Trykker",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Trykker&display=swap",
		},
	},
	{
		value: "tulpen-one",
		name: "Tulpen One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Tulpen One', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Tulpen_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Tulpen+One&display=swap",
		},
	},
	{
		value: "turret-road",
		name: "Turret Road",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Turret Road', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Turret_Road",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Turret+Road&display=swap",
		},
	},
	{
		value: "twinkle-star",
		name: "Twinkle Star",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Twinkle Star', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Twinkle_Star",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Twinkle+Star&display=swap",
		},
	},
	{
		value: "ubuntu-mono",
		name: "Ubuntu Mono",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Ubuntu Mono', monospace",
			provider: "google",
			subsets: [
				"cyrillic",
				"cyrillic-ext",
				"greek",
				"greek-ext",
				"latin",
				"latin-ext",
			],
			import: "Ubuntu_Mono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ubuntu+Mono&display=swap",
		},
	},
	{
		value: "uchen",
		name: "Uchen",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Uchen', serif",
			provider: "google",
			subsets: ["latin", "tibetan"],
			import: "Uchen",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Uchen&display=swap",
		},
	},
	{
		value: "ultra",
		name: "Ultra",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Ultra', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Ultra",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Ultra&display=swap",
		},
	},
	{
		value: "uncial-antiqua",
		name: "Uncial Antiqua",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Uncial Antiqua', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Uncial_Antiqua",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Uncial+Antiqua&display=swap",
		},
	},
	{
		value: "underdog",
		name: "Underdog",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Underdog', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "latin", "latin-ext"],
			import: "Underdog",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Underdog&display=swap",
		},
	},
	{
		value: "unica-one",
		name: "Unica One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Unica One', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Unica_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Unica+One&display=swap",
		},
	},
	{
		value: "unifrakturcook",
		name: "UnifrakturCook",
		type: "registry:font",
		category: "display",
		font: {
			family: "'UnifrakturCook', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "UnifrakturCook",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=UnifrakturCook&display=swap",
		},
	},
	{
		value: "unifrakturmaguntia",
		name: "UnifrakturMaguntia",
		type: "registry:font",
		category: "display",
		font: {
			family: "'UnifrakturMaguntia', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "UnifrakturMaguntia",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&display=swap",
		},
	},
	{
		value: "unkempt",
		name: "Unkempt",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Unkempt', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Unkempt",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Unkempt&display=swap",
		},
	},
	{
		value: "unlock",
		name: "Unlock",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Unlock', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Unlock",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Unlock&display=swap",
		},
	},
	{
		value: "unna",
		name: "Unna",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Unna', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Unna",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Unna&display=swap",
		},
	},
	{
		value: "updock",
		name: "Updock",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Updock', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Updock",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Updock&display=swap",
		},
	},
	{
		value: "vt323",
		name: "VT323",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'VT323', monospace",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "VT323",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=VT323&display=swap",
		},
	},
	{
		value: "vampiro-one",
		name: "Vampiro One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Vampiro One', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Vampiro_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Vampiro+One&display=swap",
		},
	},
	{
		value: "vast-shadow",
		name: "Vast Shadow",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Vast Shadow', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Vast_Shadow",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Vast+Shadow&display=swap",
		},
	},
	{
		value: "vesper-libre",
		name: "Vesper Libre",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Vesper Libre', serif",
			provider: "google",
			subsets: ["devanagari", "latin", "latin-ext"],
			import: "Vesper_Libre",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Vesper+Libre&display=swap",
		},
	},
	{
		value: "viaoda-libre",
		name: "Viaoda Libre",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Viaoda Libre', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
			import: "Viaoda_Libre",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Viaoda+Libre&display=swap",
		},
	},
	{
		value: "vibes",
		name: "Vibes",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Vibes', sans-serif",
			provider: "google",
			subsets: ["arabic", "latin"],
			import: "Vibes",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Vibes&display=swap",
		},
	},
	{
		value: "vibur",
		name: "Vibur",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Vibur', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Vibur",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Vibur&display=swap",
		},
	},
	{
		value: "victor-mono",
		name: "Victor Mono",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Victor Mono', monospace",
			provider: "google",
			subsets: [
				"cyrillic",
				"cyrillic-ext",
				"greek",
				"latin",
				"latin-ext",
				"vietnamese",
			],
			import: "Victor_Mono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Victor+Mono&display=swap",
		},
	},
	{
		value: "vidaloka",
		name: "Vidaloka",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Vidaloka', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Vidaloka",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Vidaloka&display=swap",
		},
	},
	{
		value: "vina-sans",
		name: "Vina Sans",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Vina Sans', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Vina_Sans",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Vina+Sans&display=swap",
		},
	},
	{
		value: "volkhov",
		name: "Volkhov",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Volkhov', serif",
			provider: "google",
			subsets: ["latin"],
			import: "Volkhov",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Volkhov&display=swap",
		},
	},
	{
		value: "vollkorn",
		name: "Vollkorn",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Vollkorn', serif",
			provider: "google",
			subsets: [
				"cyrillic",
				"cyrillic-ext",
				"greek",
				"latin",
				"latin-ext",
				"vietnamese",
			],
			import: "Vollkorn",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Vollkorn&display=swap",
		},
	},
	{
		value: "vollkorn-sc",
		name: "Vollkorn SC",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Vollkorn SC', serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
			import: "Vollkorn_SC",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Vollkorn+SC&display=swap",
		},
	},
	{
		value: "vujahday-script",
		name: "Vujahday Script",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Vujahday Script', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Vujahday_Script",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Vujahday+Script&display=swap",
		},
	},
	{
		value: "waiting-for-the-sunrise",
		name: "Waiting for the Sunrise",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Waiting for the Sunrise', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Waiting_for_the_Sunrise",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Waiting+for+the+Sunrise&display=swap",
		},
	},
	{
		value: "wallpoet",
		name: "Wallpoet",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Wallpoet', sans-serif",
			provider: "google",
			subsets: ["latin"],
			import: "Wallpoet",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Wallpoet&display=swap",
		},
	},
	{
		value: "walter-turncoat",
		name: "Walter Turncoat",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Walter Turncoat', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Walter_Turncoat",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Walter+Turncoat&display=swap",
		},
	},
	{
		value: "warnes",
		name: "Warnes",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Warnes', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Warnes",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Warnes&display=swap",
		},
	},
	{
		value: "water-brush",
		name: "Water Brush",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Water Brush', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Water_Brush",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Water+Brush&display=swap",
		},
	},
	{
		value: "waterfall",
		name: "Waterfall",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Waterfall', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Waterfall",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Waterfall&display=swap",
		},
	},
	{
		value: "wavefont",
		name: "Wavefont",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Wavefont', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Wavefont",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Wavefont&display=swap",
		},
	},
	{
		value: "wellfleet",
		name: "Wellfleet",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Wellfleet', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Wellfleet",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Wellfleet&display=swap",
		},
	},
	{
		value: "whisper",
		name: "Whisper",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Whisper', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Whisper",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Whisper&display=swap",
		},
	},
	{
		value: "windsong",
		name: "WindSong",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'WindSong', cursive",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "WindSong",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=WindSong&display=swap",
		},
	},
	{
		value: "xanh-mono",
		name: "Xanh Mono",
		type: "registry:font",
		category: "monospace",
		font: {
			family: "'Xanh Mono', monospace",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Xanh_Mono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Xanh+Mono&display=swap",
		},
	},
	{
		value: "yatra-one",
		name: "Yatra One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Yatra One', sans-serif",
			provider: "google",
			subsets: ["devanagari", "latin", "latin-ext"],
			import: "Yatra_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Yatra+One&display=swap",
		},
	},
	{
		value: "yellowtail",
		name: "Yellowtail",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Yellowtail', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Yellowtail",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Yellowtail&display=swap",
		},
	},
	{
		value: "yeon-sung",
		name: "Yeon Sung",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Yeon Sung', sans-serif",
			provider: "google",
			subsets: ["korean", "latin"],
			import: "Yeon_Sung",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Yeon+Sung&display=swap",
		},
	},
	{
		value: "yeseva-one",
		name: "Yeseva One",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Yeseva One', sans-serif",
			provider: "google",
			subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
			import: "Yeseva_One",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Yeseva+One&display=swap",
		},
	},
	{
		value: "yesteryear",
		name: "Yesteryear",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Yesteryear', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Yesteryear",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Yesteryear&display=swap",
		},
	},
	{
		value: "yomogi",
		name: "Yomogi",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Yomogi', cursive",
			provider: "google",
			subsets: ["cyrillic", "japanese", "latin", "latin-ext", "vietnamese"],
			import: "Yomogi",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Yomogi&display=swap",
		},
	},
	{
		value: "young-serif",
		name: "Young Serif",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Young Serif', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Young_Serif",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Young+Serif&display=swap",
		},
	},
	{
		value: "yrsa",
		name: "Yrsa",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Yrsa', serif",
			provider: "google",
			subsets: ["latin", "latin-ext", "vietnamese"],
			import: "Yrsa",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Yrsa&display=swap",
		},
	},
	{
		value: "yuji-boku",
		name: "Yuji Boku",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Yuji Boku', serif",
			provider: "google",
			subsets: ["cyrillic", "japanese", "latin", "latin-ext"],
			import: "Yuji_Boku",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Yuji+Boku&display=swap",
		},
	},
	{
		value: "yuji-hentaigana-akari",
		name: "Yuji Hentaigana Akari",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Yuji Hentaigana Akari', cursive",
			provider: "google",
			subsets: ["japanese", "latin", "latin-ext"],
			import: "Yuji_Hentaigana_Akari",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Yuji+Hentaigana+Akari&display=swap",
		},
	},
	{
		value: "yuji-hentaigana-akebono",
		name: "Yuji Hentaigana Akebono",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Yuji Hentaigana Akebono', cursive",
			provider: "google",
			subsets: ["japanese", "latin", "latin-ext"],
			import: "Yuji_Hentaigana_Akebono",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Yuji+Hentaigana+Akebono&display=swap",
		},
	},
	{
		value: "yuji-mai",
		name: "Yuji Mai",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Yuji Mai', serif",
			provider: "google",
			subsets: ["cyrillic", "japanese", "latin", "latin-ext"],
			import: "Yuji_Mai",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Yuji+Mai&display=swap",
		},
	},
	{
		value: "yuji-syuku",
		name: "Yuji Syuku",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Yuji Syuku', serif",
			provider: "google",
			subsets: ["cyrillic", "japanese", "latin", "latin-ext"],
			import: "Yuji_Syuku",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Yuji+Syuku&display=swap",
		},
	},
	{
		value: "zen-antique",
		name: "Zen Antique",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Zen Antique', serif",
			provider: "google",
			subsets: ["cyrillic", "greek", "japanese", "latin", "latin-ext"],
			import: "Zen_Antique",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Zen+Antique&display=swap",
		},
	},
	{
		value: "zen-antique-soft",
		name: "Zen Antique Soft",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Zen Antique Soft', serif",
			provider: "google",
			subsets: ["cyrillic", "greek", "japanese", "latin", "latin-ext"],
			import: "Zen_Antique_Soft",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Zen+Antique+Soft&display=swap",
		},
	},
	{
		value: "zen-dots",
		name: "Zen Dots",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Zen Dots', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Zen_Dots",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap",
		},
	},
	{
		value: "zen-loop",
		name: "Zen Loop",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Zen Loop', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Zen_Loop",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Zen+Loop&display=swap",
		},
	},
	{
		value: "zen-old-mincho",
		name: "Zen Old Mincho",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Zen Old Mincho', serif",
			provider: "google",
			subsets: ["cyrillic", "greek", "japanese", "latin", "latin-ext"],
			import: "Zen_Old_Mincho",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Zen+Old+Mincho&display=swap",
		},
	},
	{
		value: "zen-tokyo-zoo",
		name: "Zen Tokyo Zoo",
		type: "registry:font",
		category: "display",
		font: {
			family: "'Zen Tokyo Zoo', sans-serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Zen_Tokyo_Zoo",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Zen+Tokyo+Zoo&display=swap",
		},
	},
	{
		value: "zeyada",
		name: "Zeyada",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Zeyada', cursive",
			provider: "google",
			subsets: ["latin"],
			import: "Zeyada",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Zeyada&display=swap",
		},
	},
	{
		value: "zhi-mang-xing",
		name: "Zhi Mang Xing",
		type: "registry:font",
		category: "handwriting",
		font: {
			family: "'Zhi Mang Xing', cursive",
			provider: "google",
			subsets: ["chinese-simplified", "latin"],
			import: "Zhi_Mang_Xing",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Zhi+Mang+Xing&display=swap",
		},
	},
	{
		value: "zilla-slab",
		name: "Zilla Slab",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Zilla Slab', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Zilla_Slab",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Zilla+Slab&display=swap",
		},
	},
	{
		value: "zilla-slab-highlight",
		name: "Zilla Slab Highlight",
		type: "registry:font",
		category: "serif",
		font: {
			family: "'Zilla Slab Highlight', serif",
			provider: "google",
			subsets: ["latin", "latin-ext"],
			import: "Zilla_Slab_Highlight",
			googleFontsUrl:
				"https://fonts.googleapis.com/css2?family=Zilla+Slab+Highlight&display=swap",
		},
	},
] as const
