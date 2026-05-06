import {
	Select,
	SelectContent,
	SelectDivider,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/styles/default/ui/select"

export default function SelectPreview() {
	return (
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
	)
}
