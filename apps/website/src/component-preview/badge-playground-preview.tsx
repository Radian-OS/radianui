import { useState } from "react"
import { Badge } from "@/registry/ui/badge"
import { CodeArea } from "@/registry/ui/code"
import {
    Dropdown,
    DropdownContent,
    DropdownGroup,
    DropdownItem,
    DropdownSub,
    DropdownSubContent,
    DropdownSubTrigger,
    DropdownTrigger,
} from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { Dot } from "lucide-react"
import { Avatar } from "@/registry/ui/avatar"

const BadgePlaygroundPreview = () => {
    const [example, setExample] = useState<'Destructive' | 'Dot' | 'Avatar' | 'Close Icon'>("Destructive")
    const [size, setSize] = useState<"24" | "20" | "28" | "32">("24")
    const [key, setKey] = useState(0)

    const getExampleBadges = () => {
        switch (example) {
            case "Destructive":
                return (<Badge key={key} closable={true} size={size} >
                    Destructive
                </Badge>
                )
            case "Dot":
                return <Badge key={key} size={size} >Dot</Badge>
            case "Avatar":
                return <Badge key={key} size={size} >Avatar</Badge>
            case "Close Icon":
                return <Badge key={key} size={size} >Close Icon</Badge>
        }
    }


    return (
        <Tabs defaultValue="preview" className="mt-2 mb-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Dropdown>
                        <DropdownTrigger>Properties</DropdownTrigger>
                        <DropdownContent className="min-w-20">
                            <DropdownSub>
                                <DropdownSubTrigger>Example</DropdownSubTrigger>
                                <DropdownSubContent>
                                    <DropdownGroup
                                        selectionMode="single"
                                        onSelectedChange={(keys) => {
                                            setExample(Array.from(keys)[0] as 'Destructive' | 'Dot' | 'Avatar' | 'Close Icon')
                                            setKey((k) => k + 1)
                                        }}
                                        minSelectionCount={1}
                                        selectedValues={[example]}>
                                        <DropdownItem value="Destructive">Destructive</DropdownItem>
                                        <DropdownItem value="Dot">Dot</DropdownItem>
                                        <DropdownItem value="Avatar">Avatar</DropdownItem>
                                        <DropdownItem value="Close Icon">Close Icon</DropdownItem>
                                    </DropdownGroup>
                                </DropdownSubContent>
                            </DropdownSub>

                            <DropdownSub>
                                <DropdownSubTrigger>Size</DropdownSubTrigger>
                                <DropdownSubContent>
                                    <DropdownGroup
                                        selectionMode="single"
                                        onSelectedChange={(keys) => {
                                            setSize(Array.from(keys)[0] as "24" | "20" | "28" | "32")
                                            setKey((k) => k + 1)
                                        }}
                                        minSelectionCount={1}
                                        selectedValues={[size]}>
                                        <DropdownItem value="20">20</DropdownItem>
                                        <DropdownItem value="24">24</DropdownItem>
                                        <DropdownItem value="28">28</DropdownItem>
                                        <DropdownItem value="32">32</DropdownItem>
                                    </DropdownGroup>
                                </DropdownSubContent>
                            </DropdownSub>
                        </DropdownContent>
                    </Dropdown>
                </div>
                <TabsList>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="preview">
                <div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border">
                    {getExampleBadges()}
                </div>
            </TabsContent>
            <TabsContent value="code">
                <CodeArea
                    language="tsx"
                    showLineNumbers
                    className="h-[420px]"
                    code={`<Badge 
 size="${size}" 
 >
 Badge Example
</Badge>`}
                />
            </TabsContent>
        </Tabs>
    )
}

export default BadgePlaygroundPreview
