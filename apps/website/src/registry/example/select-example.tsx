"use client"

import { useState } from "react"

import { Select, SelectDivider, SelectGroup, SelectItem } from "../ui/select"

const SelectExample = () => {
	const [selectedValues, setSelectedValues] = useState<string[]>([])
	const [selectedValues2, setSelectedValues2] = useState<string[]>([])

	return (
		<div className="mb-2 flex flex-col gap-3">
			<Select
				label="Label here"
				placeholder="Select a framework"
				selectedValues={selectedValues}
				onSelectedChange={setSelectedValues}
				isSearchable={true}
				searchPlaceholder="Search framework"
				selectionMode="single"
				className="w-[12rem]">
				<SelectItem value="angular">Angular</SelectItem>
				<SelectItem value="astro">Astro</SelectItem>
				<SelectItem value="backbone">Backbone.js</SelectItem>
				<SelectItem value="ember">Ember.js</SelectItem>
				<SelectItem value="next">Next.js</SelectItem>
				<SelectItem value="nuxt">Nuxt.js</SelectItem>
				<SelectItem value="preact">Preact</SelectItem>
				<SelectItem value="solid">Solid</SelectItem>
				<SelectItem value="svelte">Svelte</SelectItem>
				<SelectItem value="typescript">TypeScript</SelectItem>
				<SelectItem value="vue">Vue.js</SelectItem>
				<SelectItem value="qwik">Qwik</SelectItem>
			</Select>
			<Select
				placeholder="Select a framework"
				selectedValues={selectedValues2}
				onSelectedChange={setSelectedValues2}
				isSearchable={true}
				searchPlaceholder="Search framework"
				selectionMode="multiple"
				minSelectionCount={2}
				className="w-[15rem]">
				<SelectItem value="astro">Astro</SelectItem>
				<SelectItem value="backbone">Backbone.js</SelectItem>
				<SelectItem value="ember">Ember.js</SelectItem>
				<SelectItem value="next">Next.js</SelectItem>
				<SelectItem value="nuxt">Nuxt.js</SelectItem>
				<SelectItem value="preact">Preact</SelectItem>
				<SelectItem value="react">React</SelectItem>
				<SelectItem value="solid">Solid</SelectItem>
				<SelectItem value="svelte">Svelte</SelectItem>
				<SelectItem value="typescript">TypeScript</SelectItem>
				<SelectItem value="vue">Vue.js</SelectItem>
				<SelectItem value="qwik">Qwik</SelectItem>
			</Select>
			<Select placeholder="Test" minSelectionCount={1} className="w-[10rem]">
				<SelectGroup label="Language 1">
					<SelectItem value="typescript">TypeScript</SelectItem>
					<SelectItem value="vue">Vue.js</SelectItem>
					<SelectItem value="qwik">Qwik</SelectItem>
				</SelectGroup>
				<SelectDivider />
				<SelectGroup>
					<SelectItem value="nuxt">Nuxt.js</SelectItem>
					<SelectItem value="preact">Preact</SelectItem>
					<SelectItem value="react">React</SelectItem>
				</SelectGroup>
			</Select>
		</div>
	)
}

export default SelectExample
