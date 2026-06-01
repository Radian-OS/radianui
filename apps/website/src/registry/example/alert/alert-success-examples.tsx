import React from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import {
	Alert,
	AlertContent,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	AlertToolbar,
} from "@/registry/ui/alert"
import { Button } from "@/registry/ui/button"

const AlertSuccessExamples = () => {
	return (
		<div className="max-w-135 flex w-full flex-col items-center justify-center gap-3">
			<Alert color="success">
				<AlertIcon>
					<IconSlot slot="box" size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Profile Updated Successfully</AlertTitle>
					<AlertDescription>Your changes have been saved</AlertDescription>
				</AlertContent>
				<AlertToolbar className="pt-1">
					<Button color="success">Done</Button>
				</AlertToolbar>
			</Alert>
			<Alert color="success" variant="outline" close>
				<AlertIcon>
					<IconSlot slot="circle-check" size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Credit Purchased Successfully</AlertTitle>
					<AlertDescription>
						You have successfully added credits to your account. Start creating
						more with Radian
					</AlertDescription>
					<section className="flex items-center gap-2 pt-2">
						<Button variant="link" color="success">
							View Credit Balance
							<IconSlot slot="arrow-right" />
						</Button>
					</section>
				</AlertContent>
			</Alert>
		</div>
	)
}

export default AlertSuccessExamples
