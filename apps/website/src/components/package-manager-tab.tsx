import { cn } from "@/lib/utils"
import { CodeArea, CodeAreaProps } from "@/registry/ui/code"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function PackageManagerTabs({
	pkg = ["pnpm", "yarn", "npm", "bun"],
	language,
	code,
	showLineNumbers,
	copiable = true,
	isNpx = false,
	className,
	...props
}: CodeAreaProps & { isNpx?: boolean }) {
	return (
		<Tabs defaultValue={pkg[0]} variant="open" size="md" className="overflow-hidden rounded-xl bg-[#0a0c10]">
			<TabsList>
				{pkg.map((manager) => (
					<TabsTrigger key={manager} value={manager} className="!text-white">
						{manager}
					</TabsTrigger>
				))}
			</TabsList>
			{pkg.map((manager) => {
				let prefix = manager

				if (isNpx) {
					if (manager === "npm" || manager === "yarn") {
						prefix = "npx"
					} else if (manager === "pnpm") {
						prefix = "pnpm dlx"
					} else if (manager === "bun") {
						prefix = "bunx --bun"
					}
				}
				return (
					<TabsContent key={manager} value={manager}>
						<CodeArea language={language} code={`${prefix} ${code}`} showLineNumbers={showLineNumbers} copiable={copiable} className={cn("px-3 py-4", className)} {...props} />
					</TabsContent>
				)
			})}
		</Tabs>
	)
}
