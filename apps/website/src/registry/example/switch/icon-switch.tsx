import { useId } from "react"
import { Moon, Sun } from "lucide-react"
import { Label } from "@/registry/ui/label"
import { Switch, SwitchIndicator, SwitchWrapper } from "@/registry/ui/switch"

export default function IconSwitch() {
	const id = useId()
	const id2 = useId()

	return (
		<div className="flex flex-col gap-8">
			<div className="flex items-center space-x-2.5">
				<SwitchWrapper>
					<Switch id={id} size="24" />
					<SwitchIndicator state="on">
						<Sun className="size-4 text-white" />
					</SwitchIndicator>
					<SwitchIndicator state="off">
						<Moon className="text-muted-foreground size-4" />
					</SwitchIndicator>
				</SwitchWrapper>
				<Label htmlFor={id}>Icon Indicator</Label>
			</div>
			<div className="flex items-center space-x-2.5">
				<SwitchWrapper permanent={true}>
					<Switch id={id2} size="24" />
					<SwitchIndicator state="on">
						<Sun className="text-muted-foreground size-4" />
					</SwitchIndicator>
					<SwitchIndicator state="off">
						<Moon className="text-muted-foreground size-4" />
					</SwitchIndicator>
				</SwitchWrapper>
				<Label htmlFor={id2}>Permanent Indicator</Label>
			</div>
		</div>
	)
}
