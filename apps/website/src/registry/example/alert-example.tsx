import { Alert } from "@/registry/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs";

const AlertExample = () => {
  return (
    <div className="mx-auto mt-2 flex max-w-5xl flex-col items-center gap-2 py-4">
      <Tabs defaultValue="default-variant">
        <TabsList>
          <TabsTrigger value="default-variant">Default Variant</TabsTrigger>
          <TabsTrigger value="bordered-variant">Bordered Variant</TabsTrigger>
        </TabsList>

        <TabsContent value="default-variant" className="space-y-4">
          <Alert
            type="neutral"
            title="Default Alert"
            message="This is a generic alert message."
          />
          <Alert
            type="info"
            title="Information"
            message="Your message has been successfully sent to the recipient."
          />
          <Alert
            type="success"
            title="Operation Info"
            message="Your operation was completed successfully."
          />
          <Alert
            type="warning"
            title="Warning"
            message="Please check the details before proceeding."
          />
          <Alert
            type="danger"
            title="Error"
            message="Something went wrong with your operation."
          />
        </TabsContent>

        <TabsContent value="bordered-variant" className="space-y-4">
          <Alert
            variant="bordered"
            type="neutral"
            title="Default Alert"
            message="This is a generic alert message."
          />
          <Alert
            variant="bordered"
            type="info"
            title="Information"
            message="Your message has been successfully sent to the recipient."
          />
          <Alert
            variant="bordered"
            type="success"
            title="Operation Info"
            message="Your operation was completed successfully."
          />
          <Alert
            variant="bordered"
            type="warning"
            title="Warning"
            message="Please check the details before proceeding."
          />
          <Alert
            variant="bordered"
            type="danger"
            title="Error"
            message="Something went wrong with your operation."
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AlertExample;
