"use client"

import React from "react"
import { cva } from "class-variance-authority"
import {
	AD,
	AE,
	AF,
	AL,
	AM,
	AO,
	AR,
	AS,
	AT,
	AU,
	AZ,
	BA,
	BB,
	BD,
	BE,
	BF,
	BG,
	BH,
	BI,
	BJ,
	BO,
	BR,
	BS,
	BT,
	BW,
	BY,
	BZ,
	CA,
	CD,
	CG,
	CH,
	CI,
	CL,
	CM,
	CN,
	CO,
	CR,
	CU,
	CY,
	CZ,
	DE,
	DJ,
	DK,
	DO,
	DZ,
	EC,
	EE,
	EG,
	ER,
	ES,
	ET,
	FI,
	FR,
	GA,
	GB,
	GE,
	GH,
	GL,
	GM,
	GN,
	GQ,
	GR,
	GT,
	GW,
	GY,
	HK,
	HN,
	HR,
	HT,
	HU,
	ID,
	IE,
	IL,
	IN,
	IQ,
	IR,
	IS,
	IT,
	JM,
	JO,
	JP,
	KE,
	KG,
	KH,
	KN,
	KR,
	KW,
	KZ,
	LA,
	LB,
	LC,
	LK,
	LR,
	LT,
	LU,
	LV,
	LY,
	MA,
	MC,
	MD,
	ME,
	MF,
	MG,
	MK,
	ML,
	MM,
	MN,
	MO,
	MR,
	MT,
	MU,
	MV,
	MW,
	MX,
	MY,
	MZ,
	NA,
	NE,
	NG,
	NI,
	NL,
	NO,
	NP,
	NZ,
	OM,
	PA,
	PE,
	PG,
	PH,
	PK,
	PL,
	PM,
	PR,
	PT,
	PY,
	QA,
	RO,
	RS,
	RU,
	RW,
	SA,
	SB,
	SC,
	SD,
	SE,
	SG,
	SH,
	SI,
	SK,
	SL,
	SM,
	SN,
	SO,
	SR,
	ST,
	SV,
	SY,
	SZ,
	TG,
	TH,
	TJ,
	TL,
	TM,
	TN,
	TO,
	TR,
	TT,
	TW,
	TZ,
	UA,
	UG,
	US,
	UY,
	UZ,
	VC,
	VE,
	VN,
	VU,
	WS,
	YE,
	ZA,
	ZM,
	ZW,
} from "country-flag-icons/react/3x2"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { InputClassNames, RoundedOptions, SizeOptions, cvaInputVariants, defaultInputSize } from "./input"
import NumberInput from "./number"
import { Select, SelectClassNames, SelectGroup, SelectItem } from "./select"

// Defines phoneVariants using the cva (class variance authority) utility, merging with existing input variants
const phoneVariants = cva("", {
	variants: {
		...cvaInputVariants,
		size: {
			"32": "h-8 body-sm",
			"36": "h-9 body-sm",
			"40": "h-10 body-sm",
			"44": "h-11 body-base",
			"48": "h-12 body-base",
			"56": "h-14 body-base",
		},
	},
	defaultVariants: {
		size: defaultInputSize,
	},
})
// Defines the props for the PhoneNumber component, including various configuration options
type PhoneNumberProps = {
	className?: string
	defaultCountryCode?: string
	onValueChange?: (value: string) => void
	size?: SizeOptions
	rounded?: RoundedOptions
	allowedCountries?: string[]
	disabled?: boolean
	classNames?: {
		base?: string
		select?: SelectClassNames
		numberInput?: InputClassNames
	}
}

// PhoneNumber functional component definition
function PhoneNumber({
	className,
	defaultCountryCode = "US",
	onValueChange,
	size,
	rounded,
	allowedCountries,
	disabled,
	classNames,
}: PhoneNumberProps) {
	// Filters the country codes based on allowedCountries prop
	const FILTERED_COUNTRY_CODES = allowedCountries
		? COUNTRY_CODES.filter(function (data) {
				allowedCountries.includes(data.countryCode)
			})
		: COUNTRY_CODES
	// State management for focus and internal country code/number
	const [isFocused, setIsFocused] = React.useState(false)
	const defaultSelected = FILTERED_COUNTRY_CODES.find((data) => data.countryCode === defaultCountryCode)
	const [internalCode, setInternalCode] = React.useState(defaultSelected?.code || "") /* Country Code */
	const [internalNumber, setInternalNumber] = React.useState("") /* The number portion */
	// Effect to update value when country code or number changes
	React.useEffect(
		function () {
			const newVal = internalCode + internalNumber
			onValueChange?.(newVal)
		},
		[internalCode, internalNumber, onValueChange]
	)
	// Custom trigger function for the select component, rendering the selected country and code
	function customTrigger(selectedValues: string[]) {
		const selectedCountry = FILTERED_COUNTRY_CODES.find((data) => data.country == selectedValues[0])
		return (
			<Button
				rounded={rounded}
				variant="neutral-soft"
				className={cn(
					"body-sm border-stroke text-fg1 flex h-full w-full shrink-0 items-center justify-start gap-2 rounded-r-none border-r px-3 py-2.5 font-normal whitespace-nowrap",
					{
						"border-r-primary border-r": isFocused,
						"pointer-events-none": disabled,
					}
				)}>
				{selectedCountry ? (
					<>
						{selectedCountry.icon}
						<span>{selectedCountry.code}</span>
					</>
				) : (
					<span>Unpicked</span>
				)}
			</Button>
		)
	}

	return (
		<div
			className={cn(
				"border-stroke focus-within:border-primary! focus-within:ring-primary/10 hover:border-stroke-decorative border focus-within:ring-2",
				phoneVariants({ size, rounded }),
				"inline-flex overflow-hidden p-0",
				{ "hover:border-stroke cursor-not-allowed": disabled },
				className,
				classNames?.base
			)}>
			<Select
				placeholder="Phone"
				isSearchable={true}
				searchPlaceholder="Search country or code"
				selectedValues={[FILTERED_COUNTRY_CODES.find((data) => data.code === internalCode)?.country || ""]}
				onSelectedChange={(values: string[]) => {
					setInternalCode(FILTERED_COUNTRY_CODES.find((data) => data.country === values[0])?.code || "")
				}}
				showSelectedCheck={false}
				minSelectionCount={1}
				renderTrigger={customTrigger}
				classNames={{
					base: cn("w-22"),
					...classNames?.select,
				}}
				disabled={disabled}>
				<SelectGroup label="select country">
					{FILTERED_COUNTRY_CODES.map((data, index) => (
						<SelectItem value={data.country} key={`${data.code}_${index}`}>
							<span className="flex flex-1 items-center gap-2">
								{data.icon}
								<span>{data.country}</span>
							</span>
							{internalCode === data.code && <Check size={20} className="stroke-fg1" />}
							<span className="text-fg2">{data.code}</span>
						</SelectItem>
					))}
				</SelectGroup>
			</Select>
			<NumberInput
				placeholder="Enter your phone number"
				className=""
				size={size}
				rounded={rounded}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				showStepper={false}
				value={internalNumber}
				onChange={(e) => setInternalNumber(e.target.value)}
				onWheel={(e) => e.currentTarget.blur()}
				classNames={{
					wrapper: "border-none hover:none focus-within:ring-0 rounded-none",
					...classNames?.numberInput,
				}}
				disabled={disabled}
			/>
		</div>
	)
}

export default PhoneNumber
// Defines the structure of a country code object
export interface CountryCode {
	country: string
	icon: React.ReactNode
	code: string
	countryCode: string
}
// Array of country codes with associated data
export const COUNTRY_CODES: CountryCode[] = [
	{
		country: "Afghanistan",
		icon: <AF />,
		code: "+93",
		countryCode: "AF",
	},
	{
		country: "Albania",
		icon: <AL />,
		code: "+355",
		countryCode: "AL",
	},
	{
		country: "Algeria",
		icon: <DZ />,
		code: "+213",
		countryCode: "DZ",
	},
	{
		country: "American Samoa",
		icon: <AS />,
		code: "+1-684",
		countryCode: "AS",
	},
	{
		country: "Andorra",
		icon: <AD />,
		code: "+376",
		countryCode: "AD",
	},
	{
		country: "Angola",
		icon: <AO />,
		code: "+244",
		countryCode: "AO",
	},
	{
		country: "Argentina",
		icon: <AR />,
		code: "+54",
		countryCode: "AR",
	},
	{
		country: "Armenia",
		icon: <AM />,
		code: "+374",
		countryCode: "AM",
	},
	{
		country: "Australia",
		icon: <AU />,
		code: "+61",
		countryCode: "AU",
	},
	{
		country: "Austria",
		icon: <AT />,
		code: "+43",
		countryCode: "AT",
	},
	{
		country: "Azerbaijan",
		icon: <AZ />,
		code: "+994",
		countryCode: "AZ",
	},
	{
		country: "Bahamas",
		icon: <BS />,
		code: "+1-242",
		countryCode: "BS",
	},
	{
		country: "Bahrain",
		icon: <BH />,
		code: "+973",
		countryCode: "BH",
	},
	{
		country: "Bangladesh",
		icon: <BD />,
		code: "+880",
		countryCode: "BD",
	},
	{
		country: "Barbados",
		icon: <BB />,
		code: "+1-246",
		countryCode: "BB",
	},
	{
		country: "Belarus",
		icon: <BY />,
		code: "+375",
		countryCode: "BY",
	},
	{
		country: "Belgium",
		icon: <BE />,
		code: "+32",
		countryCode: "BE",
	},
	{
		country: "Belize",
		icon: <BZ />,
		code: "+501",
		countryCode: "BZ",
	},
	{
		country: "Benin",
		icon: <BJ />,
		code: "+229",
		countryCode: "BJ",
	},
	{
		country: "Bhutan",
		icon: <BT />,
		code: "+975",
		countryCode: "BT",
	},
	{
		country: "Bolivia",
		icon: <BO />,
		code: "+591",
		countryCode: "BO",
	},
	{
		country: "Bosnia and Herzegovina",
		icon: <BA />,
		code: "+387",
		countryCode: "BA",
	},
	{
		country: "Botswana",
		icon: <BW />,
		code: "+267",
		countryCode: "BW",
	},
	{
		country: "Brazil",
		icon: <BR />,
		code: "+55",
		countryCode: "BR",
	},
	{
		country: "Bulgaria",
		icon: <BG />,
		code: "+359",
		countryCode: "BG",
	},
	{
		country: "Burkina Faso",
		icon: <BF />,
		code: "+226",
		countryCode: "BF",
	},
	{
		country: "Burundi",
		icon: <BI />,
		code: "+257",
		countryCode: "BI",
	},
	{
		country: "Cambodia",
		icon: <KH />,
		code: "+855",
		countryCode: "KH",
	},
	{
		country: "Cameroon",
		icon: <CM />,
		code: "+237",
		countryCode: "CM",
	},
	{
		country: "Canada",
		icon: <CA />,
		code: "+1",
		countryCode: "CA",
	},
	{
		country: "Chile",
		icon: <CL />,
		code: "+56",
		countryCode: "CL",
	},
	{
		country: "China",
		icon: <CN />,
		code: "+86",
		countryCode: "CN",
	},
	{
		country: "Colombia",
		icon: <CO />,
		code: "+57",
		countryCode: "CO",
	},
	{
		country: "Congo",
		icon: <CG />,
		code: "+242",
		countryCode: "CG",
	},
	{
		country: "Congo",
		icon: <CD />,
		code: "+243",
		countryCode: "CD",
	},
	{
		country: "Costa Rica",
		icon: <CR />,
		code: "+506",
		countryCode: "CR",
	},
	{
		country: "Côte d'Ivoire",
		icon: <CI />,
		code: "+225",
		countryCode: "CI",
	},
	{
		country: "Croatia",
		icon: <HR />,
		code: "+385",
		countryCode: "HR",
	},
	{
		country: "Cuba",
		icon: <CU />,
		code: "+53",
		countryCode: "CU",
	},
	{
		country: "Cyprus",
		icon: <CY />,
		code: "+357",
		countryCode: "CY",
	},
	{
		country: "Czech Republic",
		icon: <CZ />,
		code: "+420",
		countryCode: "CZ",
	},
	{
		country: "Denmark",
		icon: <DK />,
		code: "+45",
		countryCode: "DK",
	},
	{
		country: "Djibouti",
		icon: <DJ />,
		code: "+253",
		countryCode: "DJ",
	},
	{
		country: "Dominican Republic",
		icon: <DO />,
		code: "+1-809",
		countryCode: "DO",
	},
	{
		country: "Ecuador",
		icon: <EC />,
		code: "+593",
		countryCode: "EC",
	},
	{
		country: "Egypt",
		icon: <EG />,
		code: "+20",
		countryCode: "EG",
	},
	{
		country: "El Salvador",
		icon: <SV />,
		code: "+503",
		countryCode: "SV",
	},
	{
		country: "Equatorial Guinea",
		icon: <GQ />,
		code: "+240",
		countryCode: "GQ",
	},
	{
		country: "Eritrea",
		icon: <ER />,
		code: "+291",
		countryCode: "ER",
	},
	{
		country: "Estonia",
		icon: <EE />,
		code: "+372",
		countryCode: "EE",
	},
	{
		country: "Ethiopia",
		icon: <ET />,
		code: "+251",
		countryCode: "ET",
	},
	{
		country: "Finland",
		icon: <FI />,
		code: "+358",
		countryCode: "FI",
	},
	{
		country: "France",
		icon: <FR />,
		code: "+33",
		countryCode: "FR",
	},
	{
		country: "Gabon",
		icon: <GA />,
		code: "+241",
		countryCode: "GA",
	},
	{
		country: "Gambia",
		icon: <GM />,
		code: "+220",
		countryCode: "GM",
	},
	{
		country: "Georgia",
		icon: <GE />,
		code: "+995",
		countryCode: "GE",
	},
	{
		country: "Germany",
		icon: <DE />,
		code: "+49",
		countryCode: "DE",
	},
	{
		country: "Ghana",
		icon: <GH />,
		code: "+233",
		countryCode: "GH",
	},
	{
		country: "Greece",
		icon: <GR />,
		code: "+30",
		countryCode: "GR",
	},
	{
		country: "Greenland",
		icon: <GL />,
		code: "+299",
		countryCode: "GL",
	},
	{
		country: "Guatemala",
		icon: <GT />,
		code: "+502",
		countryCode: "GT",
	},
	{
		country: "Guinea",
		icon: <GN />,
		code: "+224",
		countryCode: "GN",
	},
	{
		country: "Guinea-Bissau",
		icon: <GW />,
		code: "+245",
		countryCode: "GW",
	},
	{
		country: "Guyana",
		icon: <GY />,
		code: "+592",
		countryCode: "GY",
	},
	{
		country: "Haiti",
		icon: <HT />,
		code: "+509",
		countryCode: "HT",
	},
	{
		country: "Honduras",
		icon: <HN />,
		code: "+504",
		countryCode: "HN",
	},
	{
		country: "Hong Kong",
		icon: <HK />,
		code: "+852",
		countryCode: "HK",
	},
	{
		country: "Hungary",
		icon: <HU />,
		code: "+36",
		countryCode: "HU",
	},
	{
		country: "Iceland",
		icon: <IS />,
		code: "+354",
		countryCode: "IS",
	},
	{
		country: "India",
		icon: <IN />,
		code: "+91",
		countryCode: "IN",
	},
	{
		country: "Indonesia",
		icon: <ID />,
		code: "+62",
		countryCode: "ID",
	},
	{
		country: "Iran",
		icon: <IR />,
		code: "+98",
		countryCode: "IR",
	},
	{
		country: "Iraq",
		icon: <IQ />,
		code: "+964",
		countryCode: "IQ",
	},
	{
		country: "Ireland",
		icon: <IE />,
		code: "+353",
		countryCode: "IE",
	},
	{
		country: "Israel",
		icon: <IL />,
		code: "+972",
		countryCode: "IL",
	},
	{
		country: "Italy",
		icon: <IT />,
		code: "+39",
		countryCode: "IT",
	},
	{
		country: "Jamaica",
		icon: <JM />,
		code: "+1-876",
		countryCode: "JM",
	},
	{
		country: "Japan",
		icon: <JP />,
		code: "+81",
		countryCode: "JP",
	},
	{
		country: "Jordan",
		icon: <JO />,
		code: "+962",
		countryCode: "JO",
	},
	{
		country: "Kazakhstan",
		icon: <KZ />,
		code: "+997",
		countryCode: "KZ",
	},
	{
		country: "Kenya",
		icon: <KE />,
		code: "+254",
		countryCode: "KE",
	},
	{
		country: "South Korea",
		icon: <KR />,
		code: "+82",
		countryCode: "KR",
	},
	{
		country: "Kuwait",
		icon: <KW />,
		code: "+965",
		countryCode: "KW",
	},
	{
		country: "Kyrgyzstan",
		icon: <KG />,
		code: "+996",
		countryCode: "KG",
	},
	{
		country: "Lao",
		icon: <LA />,
		code: "+856",
		countryCode: "LA",
	},
	{
		country: "Latvia",
		icon: <LV />,
		code: "+371",
		countryCode: "LV",
	},
	{
		country: "Lebanon",
		icon: <LB />,
		code: "+961",
		countryCode: "LB",
	},
	{
		country: "Liberia",
		icon: <LR />,
		code: "+231",
		countryCode: "LR",
	},
	{
		country: "Libya",
		icon: <LY />,
		code: "+218",
		countryCode: "LY",
	},
	{
		country: "Lithuania",
		icon: <LT />,
		code: "+370",
		countryCode: "LT",
	},
	{
		country: "Luxembourg",
		icon: <LU />,
		code: "+352",
		countryCode: "LU",
	},
	{
		country: "Macao",
		icon: <MO />,
		code: "+853",
		countryCode: "MO",
	},
	{
		country: "Macedonia",
		icon: <MK />,
		code: "+389",
		countryCode: "MK",
	},
	{
		country: "Madagascar",
		icon: <MG />,
		code: "+261",
		countryCode: "MG",
	},
	{
		country: "Malawi",
		icon: <MW />,
		code: "+265",
		countryCode: "MW",
	},
	{
		country: "Malaysia",
		icon: <MY />,
		code: "+60",
		countryCode: "MY",
	},
	{
		country: "Maldives",
		icon: <MV />,
		code: "+960",
		countryCode: "MV",
	},
	{
		country: "Mali",
		icon: <ML />,
		code: "+223",
		countryCode: "ML",
	},
	{
		country: "Malta",
		icon: <MT />,
		code: "+356",
		countryCode: "MT",
	},
	{
		country: "Mauritania",
		icon: <MR />,
		code: "+222",
		countryCode: "MR",
	},
	{
		country: "Mauritius",
		icon: <MU />,
		code: "+230",
		countryCode: "MU",
	},
	{
		country: "Mexico",
		icon: <MX />,
		code: "+52",
		countryCode: "MX",
	},
	{
		country: "Moldova",
		icon: <MD />,
		code: "+373",
		countryCode: "MD",
	},
	{
		country: "Monaco",
		icon: <MC />,
		code: "+377",
		countryCode: "MC",
	},
	{
		country: "Mongolia",
		icon: <MN />,
		code: "+976",
		countryCode: "MN",
	},
	{
		country: "Montenegro",
		icon: <ME />,
		code: "+382",
		countryCode: "ME",
	},
	{
		country: "Morocco",
		icon: <MA />,
		code: "+212",
		countryCode: "MA",
	},
	{
		country: "Mozambique",
		icon: <MZ />,
		code: "+258",
		countryCode: "MZ",
	},
	{
		country: "Myanmar",
		icon: <MM />,
		code: "+95",
		countryCode: "MM",
	},
	{
		country: "Namibia",
		icon: <NA />,
		code: "+264",
		countryCode: "NA",
	},
	{
		country: "Nepal",
		icon: <NP />,
		code: "+977",
		countryCode: "NP",
	},
	{
		country: "Netherlands",
		icon: <NL />,
		code: "+31",
		countryCode: "NL",
	},
	{
		country: "New Zealand",
		icon: <NZ />,
		code: "+64",
		countryCode: "NZ",
	},
	{
		country: "Nicaragua",
		icon: <NI />,
		code: "+505",
		countryCode: "NI",
	},
	{
		country: "Niger",
		icon: <NE />,
		code: "+227",
		countryCode: "NE",
	},
	{
		country: "Nigeria",
		icon: <NG />,
		code: "+234",
		countryCode: "NG",
	},
	{
		country: "Norway",
		icon: <NO />,
		code: "+47",
		countryCode: "NO",
	},
	{
		country: "Oman",
		icon: <OM />,
		code: "+968",
		countryCode: "OM",
	},
	{
		country: "Pakistan",
		icon: <PK />,
		code: "+92",
		countryCode: "PK",
	},
	{
		country: "Panama",
		icon: <PA />,
		code: "+507",
		countryCode: "PA",
	},
	{
		country: "Papua New Guinea",
		icon: <PG />,
		code: "+675",
		countryCode: "PG",
	},
	{
		country: "Paraguay",
		icon: <PY />,
		code: "+595",
		countryCode: "PY",
	},
	{
		country: "Peru",
		icon: <PE />,
		code: "+51",
		countryCode: "PE",
	},
	{
		country: "Philippines",
		icon: <PH />,
		code: "+63",
		countryCode: "PH",
	},
	{
		country: "Poland",
		icon: <PL />,
		code: "+48",
		countryCode: "PL",
	},
	{
		country: "Portugal",
		icon: <PT />,
		code: "+351",
		countryCode: "PT",
	},
	{
		country: "Puerto Rico",
		icon: <PR />,
		code: "+1-787",
		countryCode: "PR",
	},
	{
		country: "Qatar",
		icon: <QA />,
		code: "+974",
		countryCode: "QA",
	},
	{
		country: "Romania",
		icon: <RO />,
		code: "+40",
		countryCode: "RO",
	},
	{
		country: "Russian Federation",
		icon: <RU />,
		code: "+7",
		countryCode: "RU",
	},
	{
		country: "Rwanda",
		icon: <RW />,
		code: "+250",
		countryCode: "RW",
	},
	{
		country: "Saint Helena, Ascension and Tristan da Cunha",
		icon: <SH />,
		code: "+290",
		countryCode: "SH",
	},
	{
		country: "Saint Kitts and Nevis",
		icon: <KN />,
		code: "+1-869",
		countryCode: "KN",
	},
	{
		country: "Saint Lucia",
		icon: <LC />,
		code: "+1-758",
		countryCode: "LC",
	},
	{
		country: "Saint Martin (French part)",
		icon: <MF />,
		code: "+590",
		countryCode: "MF",
	},
	{
		country: "Saint Pierre and Miquelon",
		icon: <PM />,
		code: "+508",
		countryCode: "PM",
	},
	{
		country: "Saint Vincent and the Grenadines",
		icon: <VC />,
		code: "+1-784",
		countryCode: "VC",
	},
	{
		country: "Samoa",
		icon: <WS />,
		code: "+685",
		countryCode: "WS",
	},
	{
		country: "San Marino",
		icon: <SM />,
		code: "+378",
		countryCode: "SM",
	},
	{
		country: "Sao Tome and Principe",
		icon: <ST />,
		code: "+239",
		countryCode: "ST",
	},
	{
		country: "Saudi Arabia",
		icon: <SA />,
		code: "+966",
		countryCode: "SA",
	},
	{
		country: "Senegal",
		icon: <SN />,
		code: "+221",
		countryCode: "SN",
	},
	{
		country: "Serbia",
		icon: <RS />,
		code: "+381",
		countryCode: "RS",
	},
	{
		country: "Seychelles",
		icon: <SC />,
		code: "+248",
		countryCode: "SC",
	},
	{
		country: "Sierra Leone",
		icon: <SL />,
		code: "+232",
		countryCode: "SL",
	},
	{
		country: "Singapore",
		icon: <SG />,
		code: "+65",
		countryCode: "SG",
	},
	{
		country: "Slovakia",
		icon: <SK />,
		code: "+421",
		countryCode: "SK",
	},
	{
		country: "Slovenia",
		icon: <SI />,
		code: "+386",
		countryCode: "SI",
	},
	{
		country: "Solomon Islands",
		icon: <SB />,
		code: "+677",
		countryCode: "SB",
	},
	{
		country: "Somalia",
		icon: <SO />,
		code: "+252",
		countryCode: "SO",
	},
	{
		country: "South Africa",
		icon: <ZA />,
		code: "+27",
		countryCode: "ZA",
	},
	{
		country: "Spain",
		icon: <ES />,
		code: "+34",
		countryCode: "ES",
	},
	{
		country: "Sri Lanka",
		icon: <LK />,
		code: "+94",
		countryCode: "LK",
	},
	{
		country: "Sudan",
		icon: <SD />,
		code: "+249",
		countryCode: "SD",
	},
	{
		country: "Suriname",
		icon: <SR />,
		code: "+597",
		countryCode: "SR",
	},
	{
		country: "Swaziland",
		icon: <SZ />,
		code: "+268",
		countryCode: "SZ",
	},
	{
		country: "Sweden",
		icon: <SE />,
		code: "+46",
		countryCode: "SE",
	},
	{
		country: "Switzerland",
		icon: <CH />,
		code: "+41",
		countryCode: "CH",
	},
	{
		country: "Syrian Arab Republic",
		icon: <SY />,
		code: "+963",
		countryCode: "SY",
	},
	{
		country: "Taiwan",
		icon: <TW />,
		code: "+886",
		countryCode: "TW",
	},
	{
		country: "Tajikistan",
		icon: <TJ />,
		code: "+992",
		countryCode: "TJ",
	},
	{
		country: "Tanzania",
		icon: <TZ />,
		code: "+255",
		countryCode: "TZ",
	},
	{
		country: "Thailand",
		icon: <TH />,
		code: "+66",
		countryCode: "TH",
	},
	{
		country: "Timor-Leste",
		icon: <TL />,
		code: "+670",
		countryCode: "TL",
	},
	{
		country: "Togo",
		icon: <TG />,
		code: "+228",
		countryCode: "TG",
	},
	{
		country: "Tonga",
		icon: <TO />,
		code: "+676",
		countryCode: "TO",
	},
	{
		country: "Trinidad and Tobago",
		icon: <TT />,
		code: "+1-868",
		countryCode: "TT",
	},
	{
		country: "Tunisia",
		icon: <TN />,
		code: "+216",
		countryCode: "TN",
	},
	{
		country: "Turkey",
		icon: <TR />,
		code: "+90",
		countryCode: "TR",
	},
	{
		country: "Turkmenistan",
		icon: <TM />,
		code: "+993",
		countryCode: "TM",
	},
	{
		country: "Uganda",
		icon: <UG />,
		code: "+256",
		countryCode: "UG",
	},
	{
		country: "Ukraine",
		icon: <UA />,
		code: "+380",
		countryCode: "UA",
	},
	{
		country: "United Arab Emirates",
		icon: <AE />,
		code: "+971",
		countryCode: "AE",
	},
	{
		country: "United Kingdom",
		icon: <GB />,
		code: "+44",
		countryCode: "GB",
	},
	{
		country: "United States",
		icon: <US />,
		code: "+1",
		countryCode: "US",
	},
	{
		country: "Uruguay",
		icon: <UY />,
		code: "+598",
		countryCode: "UY",
	},
	{
		country: "Uzbekistan",
		icon: <UZ />,
		code: "+998",
		countryCode: "UZ",
	},
	{
		country: "Vanuatu",
		icon: <VU />,
		code: "+678",
		countryCode: "VU",
	},
	{
		country: "Venezuela",
		icon: <VE />,
		code: "+58",
		countryCode: "VE",
	},
	{
		country: "Viet Nam",
		icon: <VN />,
		code: "+84",
		countryCode: "VN",
	},
	{
		country: "Yemen",
		icon: <YE />,
		code: "+967",
		countryCode: "YE",
	},
	{
		country: "Zambia",
		icon: <ZM />,
		code: "+260",
		countryCode: "ZM",
	},
	{
		country: "Zimbabwe",
		icon: <ZW />,
		code: "+263",
		countryCode: "ZW",
	},
]
