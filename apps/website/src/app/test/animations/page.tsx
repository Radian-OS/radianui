// "use client"

// import { motion } from "motion/react"
// import { GradientText } from "@/registry/animated/GradientText"
// import { Rotate } from "@/registry/animated/Rotate"
// import { ScaleOnHover } from "@/registry/animated/ScaleOnHover"
// // import { Rotate } from "@/registry/animated/Rotate"
// // import { ScaleOnHover } from "@/registry/animated/ScaleOnHover"
// import { SlideRight } from "@/registry/animated/SlideRight"
// import { TypingText } from "@/registry/animated/typing-text"
// // import { TypingText } from "@/registry/animated/TypingAnim"
// import { Button } from "@/registry/ui/button"

// /*
// issues
// 1. block vs inline issues
// 2. onHover scale doesn't work
// 3. rotate
// 4. full width
// */
// const MotionButton = motion(Button)

// export default function Page() {
// 	return (
// 		// <div className="align-center lflex h-screen w-screen items-center justify-center">
// 		<div>
// 			{/* <TypingText
// 				text="
// 				Lorem ipsum dolor sit amet consectetur adipisicing elit. Error incidunt quia tempore odit? Enim dolorem eligendi ad magnam expedita, ipsum, numquam fuga error quaerat
// 				eveniet voluptatum explicabo sed odio quo.
//             ">
// 				Lorem ipsum dolor sit amet consectetur adipisicing elit. Error incidunt quia tempore odit? Enim dolorem eligendi ad magnam expedita, ipsum, numquam fuga error quaerat
// 				eveniet voluptatum explicabo sed odio quo.
// 			</TypingText> */}
// 			<button className="transition-colors">test</button>
// 			<div className="flex gap-6 px-10">
// 				<Button>Test</Button>
// 				<MotionButton animate={{ rotate: [0, 90, 180, 270, 360] }} transition={{ ease: "linear", duration: 0.2 }}>
// 					123
// 				</MotionButton>
// 				<motion.button animate={{ rotate: [0, 90, 180, 270, 360] }} transition={{ ease: "linear", duration: 2 }}>
// 					123
// 				</motion.button>
// 			</div>
// 			{/* <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto delectus ullam, eius eveniet odio </span>
// 			<button>test</button> */}
// 			{/* <Rotate>
// 				<Button>Test button</Button>
// 			</Rotate> */}
// 			{/* <MotionButton whileHover={{ scale: 1.4 }}>test 2 button</MotionButton> */}
// 			{/* <motion.button animate={{rota}}></motion.button> */}
// 			{/* <ScaleOnHover> */}
// 			{/* <Button>123</Button> */}
// 			{/* </ScaleOnHover> */}
// 			{/* <motion.button whileHover={{ scale: 1.1 }}>test button</motion.button> */}
// 			{/* <motion.button whileHover={{ scale: 1.1 }}>123</motion.button> */}
// 			{/* <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. </h1> */}
// 			{/* <span>123</span>
// 			<Rotate>
// 				<Button>Test button</Button>
// 			</Rotate>
// 			<motion.button animate={{ rotate: [0, 90, 180, 270, 360] }}>Test button</motion.button> */}
// 			{/* <SlideRight>
// 				<h1>Test test</h1>
// 			</SlideRight>
// 			<SlideRight>
// 				<Button>Test button</Button>
// 			</SlideRight>
// 			<motion.h1
// 				animate={{
// 					x: 100,
// 				}}>
// 				Test test
// 			</motion.h1>
// 			<GradientText>
// 				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam fugit voluptatum quo harum iste expedita corporis cumque provident, sint atque sed minima dolorem, quibusdam
// 				alias ratione. Obcaecati rerum soluta suscipit?
// 			</GradientText> */}
// 		</div>
// 	)
// }
