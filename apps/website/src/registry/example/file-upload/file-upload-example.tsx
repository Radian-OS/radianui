import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

const FileUploadExample = () => {
	return (
		<div className="flex flex-col gap-1.5">
			<Label>File Upload</Label>
			<Input className="md:w-80" type="file" />
		</div>
	)
}

export default FileUploadExample
