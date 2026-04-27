import { Input } from "@/styles/default/ui/input"
import { Label } from "@/styles/default/ui/label"

const FileUploadExample = () => {
	return (
		<div className="flex flex-col gap-1.5">
			<Label>File Upload</Label>
			<Input className="md:w-80" type="file" />
		</div>
	)
}

export default FileUploadExample
