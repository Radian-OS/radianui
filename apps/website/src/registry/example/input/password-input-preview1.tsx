import { CodeArea } from "@/registry/ui/code"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { Password } from "@/registry/ui/password"

export type SizeOptions = "32" | "36" | "40" | "44" | "48"
export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
export type ExampleOptions = "default" | "disabled"

const PasswordInputPreview = () => {

    const code = `<Password
label="Password"
trial={false}
/>`



    return (
        <Tabs defaultValue="preview" className="mb-10 mt-2">
            <div className="flex items-center justify-end">
                <TabsList>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="preview">
                <div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
                    <div className="flex flex-col items-center w-full gap-4">
                        <div className="flex flex-col items-center gap-5 w-full">
                            <Password
                                label="Password"
                                trial={false}
                            />
                        </div>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="code">
                <CodeArea
                    language="tsx"
                    showLineNumbers
                    className="h-[420px]"
                    code={code}
                />
            </TabsContent>
        </Tabs>
    )
}

export default PasswordInputPreview