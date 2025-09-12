import React from "react"
import { Ellipsis, EyeIcon, RotateCcw, Send, Settings, SquareTerminal, User } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

const TooltipIconButtonExample = () => {
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
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border">
					<div className="flex items-center justify-center gap-2">
						<Tooltip>
							<TooltipTrigger asChild>
								<IconButton>
									<Ellipsis />
								</IconButton>
							</TooltipTrigger>
							<TooltipContent>Ellipsis</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<IconButton color="success">
									<Send />
								</IconButton>
							</TooltipTrigger>
							<TooltipContent>Send</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<IconButton color="warning">
									<RotateCcw />
								</IconButton>
							</TooltipTrigger>
							<TooltipContent>Rotate</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<IconButton variant="outline" color="neutral">
									<User />
								</IconButton>
							</TooltipTrigger>
							<TooltipContent>User</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<IconButton color="neutral">
									<Settings className="hover:animate-spin" />
								</IconButton>
							</TooltipTrigger>
							<TooltipContent>Settings</TooltipContent>
						</Tooltip>
					</div>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title=""
					showLineNumber
					className="h-[420px]"
					code={`<div className="flex items-center justify-center gap-2">

<Tooltip>
 <TooltipTrigger asChild>
  <IconButton>
   <Ellipsis />
  </IconButton>
 </TooltipTrigger>
 <TooltipContent>Ellipsis</TooltipContent>
</Tooltip>

<Tooltip>
 <TooltipTrigger asChild>
  <IconButton color="success">
   <Send />
  </IconButton>
 </TooltipTrigger>
 <TooltipContent>Send</TooltipContent>
 </Tooltip>
 
 <Tooltip>
  <TooltipTrigger asChild>
   <IconButton color="warning">
    <RotateCcw />
   </IconButton>
  </TooltipTrigger>
  <TooltipContent>Rotate</TooltipContent>
 </Tooltip>

<Tooltip>
<TooltipTrigger asChild>
  <IconButton variant="outline" color="neutral">
   <User />
  </IconButton>
  </TooltipTrigger>
 <TooltipContent>User</TooltipContent>
</Tooltip>						

<Tooltip>
 <TooltipTrigger asChild>
  <IconButton color="neutral">
   <Settings className="hover:animate-spin" />
  </IconButton>
 </TooltipTrigger>
 <TooltipContent>Settings</TooltipContent>
</Tooltip>

</div>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default TooltipIconButtonExample
