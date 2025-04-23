import { Badge } from "@/registry/ui/badge"
import { CodeArea } from "@/registry/ui/code"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { Avatar } from "@/registry/ui/avatar"

const BadgeExamplePreview = () => {
    const badgeExamples = [
        {
            name: "Destructive",
            component: (
                <Badge variant="pastel" className="bg-error-focus text-error-text" size="24">
                    Destructive
                </Badge>
            ),
            code: `<Badge
variant="pastel"
className="bg-error-focus text-error-text"
size="24">
Destructive
</Badge>`
        },
        {
            name: "Dot",
            component: (
                <Badge size="24" closable={true}>
                    <div className="h-1.5 w-1.5 rounded-full bg-success"></div>
                    Label
                </Badge>
            ),
            code: `<Badge size="24" closable={true}>
<div className="h-1.5 w-1.5 rounded-full bg-success"></div>
Label
</Badge>`
        },
        {
            name: "Avatar",
            component: (
                <Badge variant="strong" className="bg-info" size="24">
                    <Avatar src="/avatar.png" name="Roman Shrestha" size="16" />
                    Roman Shrestha
                </Badge>
            ),
            code: `<Badge
variant="strong"
className="bg-info" size="24">
<Avatar src="/avatar.png" name="Roman Shrestha" size="16" />
Roman Shrestha
</Badge>`
        },
        {
            name: "Close Icon",
            component: (
                <Badge
                    variant="pastel"
                    className="outline outline-warning text-warning-text bg-warning-focus"
                    closable
                    size="24">
                    <Avatar src="/avatar.png" name="Roman Shrestha" size="16" />
                    My Custom Badge
                </Badge>
            ),
            code: `<Badge
variant="pastel"
className="outline outline-warning text-warning-text bg-warning-focus"
closable
size="24">
<Avatar src="/avatar.png" name="Roman Shrestha" size="16" />
My Custom Badge
</Badge>`
        }
    ]

    return (
        <div className="mt-2 mb-10 space-y-8">
            {badgeExamples.map((example, index) => (
                <div key={index} className="rounded-lg overflow-hidden">
                    <h1 className="heading-6 mb-4 font-semibold" >{example.name}</h1>
                    <Tabs defaultValue="preview">
                        <TabsList>
                            <TabsTrigger value="preview">Preview</TabsTrigger>
                            <TabsTrigger value="code">Code</TabsTrigger>
                        </TabsList>
                        <TabsContent value="preview">
                            <div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border">
                                {example.component}
                            </div>
                        </TabsContent>
                        <TabsContent value="code">
                            <CodeArea
                                language="tsx"
                                showLineNumbers
                                className="h-[420px]"
                                code={example.code}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            ))}
        </div>
    )
}

export default BadgeExamplePreview