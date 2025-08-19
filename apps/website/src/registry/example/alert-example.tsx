import { Alert } from "@/registry/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const AlertExample = () => {
	return (
		<div className="mx-auto mt-2 flex max-w-5xl flex-col items-center gap-2 py-4">
			<Tabs defaultValue="default-variant">
				<TabsList>
					<TabsTrigger value="default-variant">Default Variant</TabsTrigger>
					<TabsTrigger value="bordered-variant">Bordered Variant</TabsTrigger>
				</TabsList>

				<TabsContent value="default-variant" className="space-y-4">
					<Alert color="neutral" title="Default Alert" description="This is a generic alert description." />
					<Alert color="info" title="Information" description="Your description has been successfully sent to the recipient." />
					<Alert color="success" title="Operation Info" description="Your operation was completed successfully." />
					<Alert color="warning" title="Warning" description="Please check the details before proceeding." />
					<Alert color="danger" title="Error" description="Something went wrong with your operation." />
				</TabsContent>

				<TabsContent value="bordered-variant" className="space-y-4">
					<Alert variant="bordered" color="neutral" title="Default Alert" description="This is a generic alert description." />
					<Alert variant="bordered" color="info" title="Information" description="Your description has been successfully sent to the recipient." />
					<Alert variant="bordered" color="success" title="Operation Info" description="Your operation was completed successfully." />
					<Alert variant="bordered" color="warning" title="Warning" description="Please check the details before proceeding." />
					<Alert variant="bordered" color="danger" title="Error" description="Something went wrong with your operation." />
				</TabsContent>
			</Tabs>
		</div>
	)
}

export default AlertExample
