import { useState } from "react"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code"
import { Drawer, DrawerBody, DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/registry/ui/drawer"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const DrawerPreview = () => {
	const [variant, setVariant] = useState<"float" | "default" | "rounded" | undefined>("default")
	const [position, setPosition] = useState<"right" | "bottom" | "left" | "top" | undefined>("right")
	const [handle, setHandle] = useState<"true" | "false">("false")
	const [backdrop, setBackdrop] = useState<"blur" | "overlay" | null | undefined>("overlay")

	const code = `<Drawer
 type='${variant}'
 direction='${position}'
 handle={${handle}}
 backdrop='${backdrop}'
 trigger={<Button>Open Drawer</Button>}
 >
<DrawerHeader>
 <DrawerTitle>This is a drawer header</DrawerTitle>
 <DrawerDescription>This is a drawer description message.</DrawerDescription>
</DrawerHeader>
<DrawerBody className="flex flex-col gap-3" >
 <div className="bg-fill-level4 h-64 rounded-radius-xl" ></div>
 <div className="bg-fill-level3 h-64 rounded-radius-xl" ></div>
 <div className="bg-fill-level4 h-64 rounded-radius-xl" ></div>
</DrawerBody>
<DrawerFooter>
 <DrawerClose>
  <Button variant="outline" color="neutral" >Close Drawer</Button>
 </DrawerClose>
  <Button>Submit Action</Button>
</DrawerFooter>
</Drawer>`

	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent className="min-w-20">
							<DropdownSub>
								<DropdownSubTrigger>Variant</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => setVariant(Array.from(keys)[0] as "float" | "default" | "rounded" | undefined)}
										selectedValues={variant ? [variant] : []}>
										<DropdownItem value="float">float</DropdownItem>
										<DropdownItem value="default">default</DropdownItem>
										<DropdownItem value="rounded">rounded</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Position</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => setPosition(Array.from(keys)[0] as "right" | "bottom" | "left" | "top" | undefined)}
										selectedValues={position ? [position] : []}>
										<DropdownItem value="right">right</DropdownItem>
										<DropdownItem value="bottom">bottom</DropdownItem>
										<DropdownItem value="left">left</DropdownItem>
										<DropdownItem value="top">top</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Handle</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setHandle(Array.from(keys)[0] as "true" | "false")} selectedValues={handle ? [handle] : []}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Backdrop</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => setBackdrop(Array.from(keys)[0] as "blur" | "overlay" | null | undefined)}
										selectedValues={backdrop ? [backdrop] : []}>
										<DropdownItem value="blur">blur</DropdownItem>
										<DropdownItem value="overlay">overlay</DropdownItem>
										<DropdownItem value="none">none</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
						</DropdownContent>
					</Dropdown>
				</div>
				<TabsList>
					<TabsTrigger value="preview">Preview</TabsTrigger>
					<TabsTrigger value="code">Code</TabsTrigger>
				</TabsList>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center rounded-xl border px-10">
					<Drawer type={variant} direction={position} handle={handle === "true" ? true : false} backdrop={backdrop} trigger={<Button>Open Drawer</Button>}>
						<DrawerHeader>
							<DrawerTitle>This is a drawer header</DrawerTitle>
							<DrawerDescription>This is a drawer description message.</DrawerDescription>
						</DrawerHeader>
						<DrawerBody className="h-100 max-w-112.5 w-full">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, officiis minima? Numquam similique fugit illum repellat in nobis sapiente. Sunt, aspernatur natus
							iste mollitia iure earum! Incidunt omnis eveniet vero. Tenetur, iste porro quaerat officia, architecto excepturi minima iure beatae, enim doloremque ex assumenda
							optio? At necessitatibus tenetur quasi beatae numquam error alias nisi! Dolores deleniti non unde iusto recusandae. Placeat officia atque recusandae consequatur alias
							labore omnis nam pariatur minus libero animi impedit, accusantium repudiandae sint incidunt aut dicta temporibus assumenda asperiores rerum commodi maxime ducimus non
							ex. Inventore. Iusto, magni optio. Adipisci cupiditate facere veritatis officia, eveniet beatae impedit cum doloremque ipsa repellat maxime quod a consequatur quos
							odit exercitationem eaque facilis. Mollitia ducimus aspernatur voluptatem esse ea! Expedita quasi architecto a! Fugiat voluptates modi in, rem repudiandae expedita
							officia totam beatae molestias corrupti nihil doloremque deleniti possimus maxime architecto illum at tempora eum explicabo facilis consequuntur necessitatibus!
							Quaerat odio tempora dignissimos soluta provident officiis veritatis, amet error praesentium quo totam illo atque cupiditate quidem voluptates quibusdam. Sapiente non
							velit ipsa. Laborum, perspiciatis aliquid eveniet omnis a atque. Reprehenderit provident tempore rem mollitia, eaque fugit et deserunt at culpa animi possimus illum
							nemo accusantium molestias dolores distinctio! Explicabo laborum labore beatae, vitae ipsum eum sequi molestiae recusandae mollitia? Velit rem non magnam magni
							nesciunt fuga, exercitationem aut aliquid quae eos facilis officia natus nam. Quam aliquam illo reprehenderit, quia soluta corrupti? Saepe, incidunt perferendis quae
							consequuntur fugit earum. Soluta atque suscipit blanditiis deserunt totam nemo magni vitae inventore architecto quidem recusandae harum, nisi corrupti sunt placeat
							illum labore aperiam ullam eius et quo quibusdam pariatur ex iste. Dignissimos. Soluta ipsum qui officiis nihil esse illum, debitis eius nulla distinctio incidunt
							explicabo in maxime itaque, deserunt consectetur rem asperiores ab enim? Quia, dolor. Maiores soluta quibusdam esse quia nisi. At cum obcaecati eligendi iusto tempora
							deleniti aperiam molestiae ipsa aliquid. Itaque adipisci ut commodi officia ex nulla magnam. Culpa provident molestias nostrum similique libero, neque nobis nesciunt.
							Temporibus, unde? Adipisci doloribus non voluptatum iste beatae vel, obcaecati eveniet illo aperiam, veritatis officiis fuga fugit, sint commodi. Saepe cupiditate,
							optio officia aut, qui corporis eligendi repudiandae explicabo, deleniti officiis voluptas? Esse vel incidunt quaerat officia voluptatem, dolorem minus iste saepe rem
							dignissimos, dicta repudiandae itaque deleniti voluptas optio possimus perferendis sequi ipsum earum. Fuga facilis optio debitis reiciendis atque blanditiis? Quae
							laboriosam, dicta hic iure quibusdam magnam porro blanditiis, enim error culpa vitae ad veritatis eum cupiditate ipsam eius iusto repellat delectus dolor. Dolore
							laboriosam, placeat delectus blanditiis ducimus molestiae. Illo consequuntur asperiores quis optio a unde, sequi rem vero voluptatum molestiae! Numquam ab iste, cum
							eos sunt necessitatibus repellat harum. Modi ducimus dolores libero beatae laboriosam amet vitae voluptate! Aspernatur deleniti, obcaecati, dicta laborum
							necessitatibus illum ab natus sed blanditiis expedita libero molestiae ipsam quam. Quae hic necessitatibus magnam dolorem laborum culpa, quia doloribus rem saepe, ex
							ipsum debitis. Sapiente porro perferendis, eaque nemo consequatur quod corrupti ab doloribus quidem animi perspiciatis? Itaque ad officia aut corporis adipisci illo
							suscipit veritatis illum labore at atque debitis, ratione optio commodi. Nihil, quasi sapiente eveniet commodi vel at rem architecto ut similique eum soluta amet
							ducimus enim doloremque vitae, facilis ab id aliquid laborum minus qui. Iste reprehenderit soluta possimus fugiat. Eveniet quia optio voluptatem laborum ab numquam
							architecto nostrum quibusdam fuga earum eligendi reiciendis, explicabo nesciunt quo quam reprehenderit ipsa facere porro nobis dicta nulla! Dicta dolorum repellendus
							nam illum? Perspiciatis perferendis ipsum consequatur debitis ipsam iusto maiores cum beatae alias aliquid ex a pariatur distinctio reiciendis recusandae aliquam
							delectus consectetur, sed atque molestiae architecto in, sint iste inventore. Alias? Tempore nobis, veritatis officiis eum tenetur autem adipisci sint numquam
							similique facere dolore expedita a rerum doloribus distinctio non quibusdam maiores officia consequuntur soluta nam. Soluta eos quas doloribus quidem! Porro soluta
							voluptas cumque exercitationem quaerat, nihil nostrum aliquam obcaecati distinctio ea ullam ipsam omnis, dolores, hic necessitatibus! Ex ut sed tempore numquam odio
							itaque, quisquam minima hic deserunt nulla? Minus exercitationem, ipsum omnis quasi sapiente quo eos maxime amet nemo itaque perspiciatis, ipsa explicabo doloremque
							accusantium ratione fugit nulla quos magnam soluta? Sequi vitae in laboriosam corrupti nam rerum. Pariatur ut eius nobis dolorum possimus placeat facilis doloremque.
							Fugiat cupiditate delectus impedit maxime, praesentium ratione ipsa corrupti earum explicabo odio quidem id aliquid eius consequuntur deserunt adipisci, aperiam quod?
							Animi delectus vel illum, unde rem sapiente beatae suscipit provident impedit id laudantium reiciendis, quibusdam quasi architecto fuga, dicta ratione saepe!
							Explicabo, at ex. Recusandae dignissimos assumenda esse sed nemo! Doloremque explicabo labore quam quod beatae eaque dolores quibusdam nihil, velit reiciendis
							eligendi saepe libero tempore nemo! Odio qui tempore excepturi voluptas perspiciatis distinctio repellendus consectetur, ea tenetur, veritatis repudiandae.
							Repellendus atque impedit ipsa necessitatibus reprehenderit facere architecto, ratione cum temporibus omnis veritatis aliquid assumenda illo nostrum dolores animi
							tenetur autem aperiam nulla deleniti, totam saepe enim ab odit? Dolore! Ducimus fuga temporibus dolorem qui laboriosam deleniti, officia laudantium aperiam hic
							expedita illum, quidem nihil saepe neque itaque quisquam beatae aliquam quasi asperiores. Pariatur consectetur modi, numquam voluptates nostrum rerum. Provident
							sapiente fugiat nisi minima deleniti id veritatis, debitis amet beatae ipsum recusandae eveniet assumenda sequi, quod dolor iste, sunt officia eius similique illo
							quae. Beatae excepturi accusamus quasi itaque. Fugit eveniet rerum eos obcaecati provident quia suscipit sint dolor ullam iure maxime quas repudiandae vel minima
							aliquam id atque tenetur ducimus, dolorum ipsa. Natus id veniam magni corrupti odio?
						</DrawerBody>
						<DrawerFooter>
							<DrawerClose>
								<Button variant="outline">Close Drawer</Button>
							</DrawerClose>
							<Button>Submit Action</Button>
						</DrawerFooter>
					</Drawer>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeArea language="tsx" showLineNumbers code={code} className="h-[420px]" />
			</TabsContent>
		</Tabs>
	)
}

export default DrawerPreview
