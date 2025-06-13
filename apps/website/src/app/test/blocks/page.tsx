import Navbar from "@/components/navbar"
import { blocks } from "@/data/blocks"
import BlockPreview from "./block-viewer"

const page = () => {
	return (
		<div>
			<header className="sticky top-0 z-50 w-full">
				{/* <Banner /> */}
				<Navbar />
			</header>

			<div>
				{blocks.map((block, index) => (
					<BlockPreview preview={block.preview} code={block.code} title={block.title} category={block.category} key={index} />
				))}
			</div>
		</div>
	)
}

export default page
