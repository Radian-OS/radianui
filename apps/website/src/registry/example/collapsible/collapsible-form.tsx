"use client"

import React, { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ui/accordion"
import { Button } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { Collapsible, CollapsibleContent } from "@/registry/ui/collapsible"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

export default function CollapsibleForm() {
	const [sameAsShipping, setSameAsShipping] = useState(true)

	return (
		<div className="max-w-95 w-full">
			<Accordion type="single" variant={"table"} size={"lg"} collapsible defaultValue="shipping">
				<AccordionItem value="shipping">
					<AccordionTrigger className="p-5 data-[state=open]:pb-4">Shipping Address</AccordionTrigger>
					<AccordionContent className="p-5 pt-0">
						<div className="space-y-5">
							<div className="grid grid-cols-2 gap-2.5">
								<div className="space-y-1.5">
									<Label htmlFor="shipping-first-name">First Name</Label>
									<Input id="shipping-first-name" name="shipping-first-name" />
								</div>
								<div className="space-y-1.5">
									<Label htmlFor="shipping-last-name">Last Name</Label>
									<Input id="shipping-last-name" name="shipping-last-name" />
								</div>
							</div>
							<div className="space-y-1.5">
								<Label htmlFor="shipping-address-1">Address Line 1</Label>
								<Input id="shipping-address-1" name="shipping-address-1" />
							</div>
							<div className="space-y-1.5">
								<Label htmlFor="shipping-address-2">Address Line 2</Label>
								<Input id="shipping-address-2" name="shipping-address-2" />
							</div>
							<div className="space-y-1.5">
								<Label htmlFor="shipping-city">City</Label>
								<Input id="shipping-city" name="shipping-city" />
							</div>
							<div className="grid grid-cols-2 gap-2.5">
								<div className="space-y-1.5">
									<Label htmlFor="shipping-state">State</Label>
									<Input id="shipping-state" name="shipping-state" />
								</div>
								<div className="space-y-1.5">
									<Label htmlFor="shipping-zip">Zip Code</Label>
									<Input id="shipping-zip" name="shipping-zip" />
								</div>
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="billing">
					<AccordionTrigger className="p-5 data-[state=open]:pb-4">Billing Address</AccordionTrigger>
					<AccordionContent className="p-5 pt-0">
						<div className="space-y-4 pt-2">
							<div className="flex items-center gap-2">
								<Checkbox id="same-as-shipping" checked={sameAsShipping} onCheckedChange={(checked) => setSameAsShipping(checked === true)} />
								<Label htmlFor="same-as-shipping">Same as shipping address</Label>
							</div>

							<Collapsible open={!sameAsShipping}>
								<CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
									<div className="space-y-5">
										<div className="grid grid-cols-2 gap-2.5">
											<div>
												<Label htmlFor="billing-first-name">First Name</Label>
												<Input id="billing-first-name" name="billing-first-name" />
											</div>
											<div className="space-y-1.5">
												<Label htmlFor="billing-last-name">Last Name</Label>
												<Input id="billing-last-name" name="billing-last-name" />
											</div>
										</div>
										<div className="space-y-1.5">
											<Label htmlFor="billing-address-1">Address Line 1</Label>
											<Input id="billing-address-1" name="billing-address-1" />
										</div>
										<div className="space-y-1.5">
											<Label htmlFor="billing-address-2">Address Line 2</Label>
											<Input id="billing-address-2" name="billing-address-2" />
										</div>
										<div className="space-y-1.5">
											<Label htmlFor="billing-city">City</Label>
											<Input id="billing-city" name="billing-city" />
										</div>
										<div className="grid grid-cols-2 gap-2.5">
											<div className="space-y-1.5">
												<Label htmlFor="billing-state">State</Label>
												<Input id="billing-state" name="billing-state" />
											</div>
											<div className="space-y-1.5">
												<Label htmlFor="billing-zip">Zip Code</Label>
												<Input id="billing-zip" name="billing-zip" />
											</div>
										</div>
									</div>
								</CollapsibleContent>
							</Collapsible>
						</div>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="footer" className="flex items-center justify-end gap-2 p-4">
					<Button variant="outline" color="neutral" type="button">
						Go Back
					</Button>
					<Button variant="strong" color="primary" type="button">
						Submit
					</Button>
				</AccordionItem>
			</Accordion>
		</div>
	)
}
