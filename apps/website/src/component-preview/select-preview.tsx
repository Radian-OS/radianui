import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Select, SelectContent, SelectDivider, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/registry/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function SelectPreview() {
	return (
		<Tabs defaultValue="preview">
			<div className="flex items-center justify-between">
				<TabsList variant="outline-ghost" size="md">
					<TabsTrigger value="preview">
						<EyeIcon />
						Preview
					</TabsTrigger>
					<TabsTrigger value="code">
						<SquareTerminal />
						Code
					</TabsTrigger>
				</TabsList>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<Select indicatorPosition="right" defaultValue="node-js">
						<SelectTrigger className="w-60">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Backend Frameworks</SelectLabel>
								<SelectItem value="node-js">Node.js (Express)</SelectItem>
								<SelectItem value="django">Django (Python)</SelectItem>
								<SelectItem value="rails">Rails (Ruby)</SelectItem>
								<SelectItem disabled value="laravel">
									Laravel (PHP)
								</SelectItem>
								<SelectItem value="spring">Spring Boot (Java)</SelectItem>
							</SelectGroup>
							<SelectDivider />
							<SelectGroup>
								<SelectLabel>Mobile Frameworks</SelectLabel>
								<SelectItem value="react-native">React Native</SelectItem>
								<SelectItem value="flutter">Flutter</SelectItem>
								<SelectItem value="swiftui">SwiftUI</SelectItem>
								<SelectItem value="kotlin-compose">Kotlin Compose</SelectItem>
								<SelectItem value="xamarin">Xamarin</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet title="select.tsx" showLineNumber className="h-[420px]" code={``} />
			</TabsContent>
		</Tabs>
	)
}
