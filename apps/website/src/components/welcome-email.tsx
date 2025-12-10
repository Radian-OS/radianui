import * as React from "react"
import { Button, Html } from "@react-email/components"

export function Email() {
	return (
		<Html lang="en">
			<Button href={"#"}>Click me</Button>
		</Html>
	)
}

export default Email
