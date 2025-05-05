import { CodeArea } from "@/registry/ui/code"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { useState, useMemo } from "react"
import { Password } from "@/registry/ui/password"
import Link from "next/link"
import ProgressBar from "@/registry/ui/progress-bar"
import { CircleCheck } from "lucide-react"

export type SizeOptions = "32" | "36" | "40" | "44" | "48"
export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
export type ExampleOptions = "default" | "disabled"

const PasswordInputPreview2 = () => {
    const codeCn1 = "`size-4 ${allMinLength ? 'text-success' : 'text-text-tertiary'}`"
    const codeCn2 = "`size-4 ${allHasNumber ? 'text-success' : 'text-text-tertiary'}`"
    const codeCn3 = "`size-4 ${allHasLower ? 'text-success' : 'text-text-tertiary'}`"
    const codeCn4 = "`size-4 ${allHasUpper ? 'text-success' : 'text-text-tertiary'}`"
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const [password3, setPassword3] = useState("")

    const allMinLength = useMemo(() => [password1, password2, password3].every(pw => pw.length >= 8), [password1, password2, password3])
    const allHasNumber = useMemo(() => [password1, password2, password3].every(pw => /[0-9]/.test(pw)), [password1, password2, password3])
    const allHasLower = useMemo(() => [password1, password2, password3].every(pw => /[a-z]/.test(pw)), [password1, password2, password3])
    const allHasUpper = useMemo(() => [password1, password2, password3].every(pw => /[A-Z]/.test(pw)), [password1, password2, password3])

    // compute progress dynamically: 4 rules total
    const progress = useMemo(() => {
        const checks = [allMinLength, allHasNumber, allHasLower, allHasUpper]
        const passed = checks.filter(Boolean).length
        return (passed / checks.length) * 100
    }, [allMinLength, allHasNumber, allHasLower, allHasUpper])


    const handleChange = (value: string, setter: (v: string) => void) => {
        setter(value)
    }

    const code = `<div className="relative w-full">
<Link href="#" className="text-primary text-sm absolute right-0">Forgot Password ?</Link>
<Password
trial={false}
label="Password"
/>
</div>`



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
                    <div className="relative w-full">
                        <Link href="#" className="text-primary text-sm absolute right-0">Forgot Password ?</Link>
                        <Password
                            trial={false}
                            label="Password"
                        />
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

export default PasswordInputPreview2