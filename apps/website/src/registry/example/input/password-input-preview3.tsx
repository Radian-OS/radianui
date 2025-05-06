"use client"

import { useState, useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { Password } from "@/registry/ui/password"
import ProgressBar from "@/registry/ui/progress-bar"
import { CircleCheck } from "lucide-react"
import { z } from "zod"
import { CodeArea } from "@/registry/ui/code"

// Define the Zod schema for password validation
const passwordSchema = z
    .string()
    .min(8, { message: "At least 8 characters" })
    .regex(/\d/, { message: "At least one number" })
    .regex(/[a-z]/, { message: "At least one lowercase letter" })
    .regex(/[A-Z]/, { message: "At least one uppercase letter" })

const PasswordInputPreview = () => {
    const [password, setPassword] = useState("")

    // Validate the password using Zod
    const validation = useMemo(() => passwordSchema.safeParse(password), [password])
    const codeCname = '`size-4 ${ isValid(label) ? "text-success" : "" } `'

    // Extract error messages
    const errors = useMemo(() => {
        if (validation.success) return []
        return validation.error.errors.map((e) => e.message)
    }, [validation])

    // Calculate progress based on the number of passed validations
    const progress = useMemo(() => {
        const totalChecks = 4
        const passedChecks = totalChecks - errors.length
        return (passedChecks / totalChecks) * 100
    }, [errors])

    // Helper function to check if a specific validation passed
    const isValid = (message: string) => !errors.includes(message)

    // Code string for display in CodeArea
    const code = `"use client"

import { useState, useMemo } from "react"
import { Password } from "@/registry/ui/password"
import ProgressBar from "@/registry/ui/progress-bar"
import { CircleCheck } from "lucide-react"
import { z } from "zod"

// Define the Zod schema for password validation
const passwordSchema = z
.string()
.min(8, { message: "At least 8 characters" })
.regex(/\\d/, { message: "At least one number" })
.regex(/[a-z]/, { message: "At least one lowercase letter" })
.regex(/[A-Z]/, { message: "At least one uppercase letter" })

const PasswordInputPreview = () => {
const [password, setPassword] = useState("")

// Validate the password using Zod
const validation = useMemo(() => passwordSchema.safeParse(password), [password])

// Extract error messages
const errors = useMemo(() => {
if (validation.success) return []
return validation.error.errors.map((e) => e.message)
}, [validation])

// Calculate progress based on the number of passed validations
const progress = useMemo(() => {
const totalChecks = 4
const passedChecks = totalChecks - errors.length
return (passedChecks / totalChecks) * 100
}, [errors])

// Helper function to check if a specific validation passed
const isValid = (message) => !errors.includes(message)

return (
<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
<div className="flex flex-col gap-4 w-full">
<Password
trial={false}
value={password}
onChange={(e) => setPassword(e.target.value)}
placeholder="Enter your password"
/>
{/* Make sure the progress bar has a specified height and visible styling */}
<ProgressBar
value={progress}
/>
<div className="w-full text-sm gap-2 flex flex-col">
{[
"At least 8 characters",
"At least one number",
"At least one lowercase letter",
"At least one uppercase letter",
].map((label) => (
<p key={label} className="flex items-center gap-2 text-text-tertiary">
<CircleCheck className={${codeCname}} />
{label}
</p>
))}
    </div>
  </div>
</div>
  )
}

export default PasswordInputPreview
`

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
                    <div className="flex flex-col gap-4 w-full">
                        <Password
                            trial={false}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                        {/* Make sure the progress bar has a specified height and visible styling */}
                        <ProgressBar
                            value={progress}
                        />
                        <div className="w-full text-sm gap-2 flex flex-col">
                            {[
                                "At least 8 characters",
                                "At least one number",
                                "At least one lowercase letter",
                                "At least one uppercase letter",
                            ].map((label) => (
                                <p key={label} className="flex items-center gap-2 text-text-tertiary">
                                    <CircleCheck className={`size-4 ${isValid(label) ? "text-success" : ""}`} />
                                    {label}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="code">
                <CodeArea language="tsx" showLineNumbers className="h-[420px]" code={code} />
            </TabsContent>
        </Tabs>
    )
}

export default PasswordInputPreview