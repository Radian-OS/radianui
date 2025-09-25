import React, { useMemo, useState } from "react"
import { CircleCheck } from "lucide-react"
import { z } from "zod"
import { Label } from "@/registry/ui/label"
import { Password } from "@/registry/ui/password"
import { Progress } from "@/registry/ui/progress-bar"

function PasswordVlidationExample() {
	const passwordSchema = z
		.string()
		.min(8, { message: "At least 8 characters" })
		.regex(/\d/, { message: "At least one number" })
		.regex(/[a-z]/, { message: "At least one lowercase letter" })
		.regex(/[A-Z]/, { message: "At least one uppercase letter" })

	const [password, setPassword] = useState("")

	const validation = useMemo(() => passwordSchema.safeParse(password), [password])

	const errors = useMemo(() => {
		if (validation.success) return []
		return validation.error.issues.map((e) => e.message)
	}, [validation])

	const progress = useMemo(() => {
		const totalChecks = 4
		const passedChecks = totalChecks - errors.length
		return (passedChecks / totalChecks) * 100
	}, [errors])

	const isValid = (message: string) => !errors.includes(message)
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-1.5">
				<Label>Password</Label>
				<Password value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-80" toggleVisibility="focus" />
			</div>
			<div className="body-13 flex w-full flex-col gap-2">
				<Progress value={progress} />
				<p className="text-sm font-semibold">Your Password must contain</p>
				{["At least 8 characters", "At least one number", "At least one lowercase letter", "At least one uppercase letter"].map((label) => (
					<p key={label} className="text-fg-tertiary flex items-center gap-2">
						<CircleCheck className={`size-4 ${isValid(label) ? "text-success-text" : ""}`} />
						{label}
					</p>
				))}
			</div>
		</div>
	)
}

export default PasswordVlidationExample
