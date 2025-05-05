"use client"

import { Password } from "@/registry/ui/password"
import { useState, useMemo } from "react"
import Link from "next/link"
import ProgressBar from "@/registry/ui/progress-bar"
import { CircleCheck } from "lucide-react"

const PasswordInputPreview = () => {

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

    return (
        <div className="flex h-[450px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
            <div className="flex flex-col items-center w-full gap-4">
                <div className="flex flex-col items-center gap-5 w-full">
                    <Password
                        trial={false}
                        value={password1}
                        onChange={(e) => handleChange(e.target.value, setPassword1)}
                    />
                    <div className="relative w-full">
                        <Link href="#" className="text-primary text-sm absolute right-0">Forgot Password ?</Link>
                        <Password
                            trial={false}
                            value={password2}
                            onChange={(e) => handleChange(e.target.value, setPassword2)}
                        />
                    </div>
                    <Password
                        trial={false}
                        value={password3}
                        onChange={(e) => handleChange(e.target.value, setPassword3)}
                    />
                </div>
                <div className="flex flex-col w-full gap-2">
                    <ProgressBar value={progress} />
                    <h3 className="text-sm font-semibold">Your Password Must Contain (all three)</h3>
                    <p className="flex items-center gap-2 text-text-tertiary"><CircleCheck className={`size-4 ${allMinLength ? 'text-success' : 'text-text-tertiary'}`} />At least 8 Characters</p>
                    <p className="flex items-center gap-2 text-text-tertiary"><CircleCheck className={`size-4 ${allHasNumber ? 'text-success' : 'text-text-tertiary'}`} />At least 1 Number</p>
                    <p className="flex items-center gap-2 text-text-tertiary"><CircleCheck className={`size-4 ${allHasLower ? 'text-success' : 'text-text-tertiary'}`} />At least 1 lowercase letter</p>
                    <p className="flex items-center gap-2 text-text-tertiary"><CircleCheck className={`size-4 ${allHasUpper ? 'text-success' : 'text-text-tertiary'}`} />At least 1 uppercase letter</p>
                </div>
            </div>
        </div>
    )
}

export default PasswordInputPreview