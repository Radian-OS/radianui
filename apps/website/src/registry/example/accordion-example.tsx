"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ui/accordion"

const AccordionExample = () => {
	return (
		<div className="flex flex-col gap-5">
			<Accordion>
				<AccordionItem value="value 1">
					<AccordionTrigger>What is Radian?</AccordionTrigger>
					<AccordionContent>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, facere. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam fuga nobis dolorem ipsam
						numquam. Dolorum reiciendis vero veniam repellendus! Eos sint sequi commodi voluptates voluptatum magni illum consequatur quae doloribus.
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="value 2">
					<AccordionTrigger>How can Radian speed up my development process?</AccordionTrigger>
					<AccordionContent>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, facere.</AccordionContent>
				</AccordionItem>

				<AccordionItem value="value 3">
					<AccordionTrigger>Is Radian suitable for developers of all skill levels?</AccordionTrigger>
					<AccordionContent>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, facere.</AccordionContent>
				</AccordionItem>
			</Accordion>

			<Accordion size="lg">
				<AccordionItem value="value 1">
					<AccordionTrigger>What is Radian?</AccordionTrigger>
					<AccordionContent>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, facere. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam fuga nobis dolorem ipsam
						numquam. Dolorum reiciendis vero veniam repellendus! Eos sint sequi commodi voluptates voluptatum magni illum consequatur quae doloribus.
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="value 2">
					<AccordionTrigger>How can Radian speed up my development process?</AccordionTrigger>
					<AccordionContent>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, facere.</AccordionContent>
				</AccordionItem>

				<AccordionItem value="value 3">
					<AccordionTrigger>Is Radian suitable for developers of all skill levels?</AccordionTrigger>
					<AccordionContent>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, facere.</AccordionContent>
				</AccordionItem>
			</Accordion>

			<Accordion size="sm" variant="open">
				<AccordionItem value="value 1">
					<AccordionTrigger>What is Radian?</AccordionTrigger>
					<AccordionContent>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, facere. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam fuga nobis dolorem ipsam
						numquam. Dolorum reiciendis vero veniam repellendus! Eos sint sequi commodi voluptates voluptatum magni illum consequatur quae doloribus.
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="value 2">
					<AccordionTrigger>How can Radian speed up my development process?</AccordionTrigger>
					<AccordionContent>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, facere.</AccordionContent>
				</AccordionItem>

				<AccordionItem value="value 3">
					<AccordionTrigger>Is Radian suitable for developers of all skill levels?</AccordionTrigger>
					<AccordionContent>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, facere.</AccordionContent>
				</AccordionItem>
			</Accordion>

			<Accordion size="sm" variant="table">
				<AccordionItem value="value 1">
					<AccordionTrigger>What is Radian?</AccordionTrigger>
					<AccordionContent>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, facere. Lorem ipsum dlor sit amet consectetur adipisicing elit. Laboriosam fuga nobis dolorem ipsam
						numquam. Dolorum reiciendis vero veniam repellendus! Eos sint sequi commodi voluptates voluptatum magni illum consequatur quae doloribus.
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="value 2">
					<AccordionTrigger>How can Radian speed up my development process?</AccordionTrigger>
					<AccordionContent>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, facere.</AccordionContent>
				</AccordionItem>

				<AccordionItem value="value 3">
					<AccordionTrigger>Is Radian suitable for developers of all skill levels?</AccordionTrigger>
					<AccordionContent>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, facere.</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	)
}

export default AccordionExample
