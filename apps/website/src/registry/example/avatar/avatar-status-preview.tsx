import React from "react"
import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Avatar, AvatarFallback, AvatarImage, AvatarIndicator, AvatarStatus } from "@/registry/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

function AvatarStatusPreview() {
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
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<div className="flex gap-6">
						<Avatar size="64">
							<AvatarImage src="https://randomuser.me/api/portraits/men/2.jpg" />
							<AvatarFallback>CH</AvatarFallback>
							<AvatarIndicator className="bottom-1.5 right-1.5">
								<AvatarStatus variant={"online"} />
							</AvatarIndicator>
						</Avatar>
						<Avatar size="64">
							<AvatarImage src="https://randomuser.me/api/portraits/men/8.jpg" />
							<AvatarFallback className="text-error bg-error/10">AJ</AvatarFallback>
							<AvatarIndicator className="right-1.5 top-1.5">
								<AvatarStatus variant={"offline"} />
							</AvatarIndicator>
						</Avatar>
						<Avatar size="64" rounded="square">
							<AvatarImage src="https://randomuser.me/api/portraits/men/4.jpg" />
							<AvatarFallback className="bg-fill4 overflow-hidden">
								<svg width="100" height="100" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
									<defs>
										<clipPath>
											<rect width="36" height="36" rx={20} ry={20} fill="white" />
										</clipPath>
									</defs>
									<g clipPath="url(#clip0_5846_11264)">
										<path d="M5.3999 36C5.3999 29.0536 10.7999 23.4 17.9999 23.4C25.1999 23.4 30.5999 29.0536 30.5999 36" className="fill-elevation-level1" />
										<path
											d="M18.0081 19.8C21.9759 19.8 25.1998 16.5761 25.1998 12.6083C25.1998 8.64044 21.9759 5.40002 18.0081 5.40002C14.0402 5.40002 10.7998 8.6239 10.7998 12.5918C10.7998 16.5596 14.0237 19.7835 17.9915 19.7835C18.0081 19.8"
											className="fill-elevation-level1"
										/>
									</g>
								</svg>
							</AvatarFallback>
							<AvatarIndicator className="right-1.5 top-1.5">
								<AvatarStatus variant={"busy"} />
							</AvatarIndicator>
						</Avatar>
						<Avatar size="64" rounded="square">
							<AvatarImage src="https://randomuser.me/api/portraits/men/18.jpg" />
							<AvatarFallback className="bg-fill4 overflow-hidden">
								<svg width="100" height="100" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
									<defs>
										<clipPath>
											<rect width="36" height="36" rx={20} ry={20} fill="white" />
										</clipPath>
									</defs>
									<g clipPath="url(#clip0_5846_11264)">
										<path d="M5.3999 36C5.3999 29.0536 10.7999 23.4 17.9999 23.4C25.1999 23.4 30.5999 29.0536 30.5999 36" className="fill-elevation-level1" />
										<path
											d="M18.0081 19.8C21.9759 19.8 25.1998 16.5761 25.1998 12.6083C25.1998 8.64044 21.9759 5.40002 18.0081 5.40002C14.0402 5.40002 10.7998 8.6239 10.7998 12.5918C10.7998 16.5596 14.0237 19.7835 17.9915 19.7835C18.0081 19.8"
											className="fill-elevation-level1"
										/>
									</g>
								</svg>
							</AvatarFallback>
							<AvatarIndicator className="bottom-1.5 right-1.5">
								<AvatarStatus variant={"away"} />
							</AvatarIndicator>
						</Avatar>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet title="avatar.tsx" showLineNumber className="h-[420px]" code={``} />
			</TabsContent>
		</Tabs>
	)
}

export default AvatarStatusPreview
