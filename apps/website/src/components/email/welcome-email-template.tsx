import React from "react"
import { Body, Button, Column, Container, Font, Head, Heading, Hr, Html, Img, Link, Row, Section, Text } from "@react-email/components"
import { TailwindConfig } from "@/components/email/tailwind-config"

export default function WelcomeEmailTemplate({ baseUrl, id }: { baseUrl: string; id: string }) {
	return (
		<Html lang="en">
			<TailwindConfig>
				<Head>
					<Font
						fontFamily="Inter"
						fallbackFontFamily="Arial"
						webFont={{
							url: "https://fonts.gstatic.com/s/inter/v13/UcCo3FwrK3iLTcviYwY.woff2",
							format: "woff2",
						}}
						fontWeight={400}
						fontStyle="normal"
					/>
				</Head>
				<Body>
					<Container className="max-w-150 my-3">
						{/* Welcome To The Community Section */}
						<Section>
							<Img src={`${baseUrl}/media/radian.png`} alt="radianos-logo" height="36" />
							<Heading as="h1" m={0} className="text-fg my-12 text-2xl font-semibold leading-8">
								Welcome to the Community 👋🏻
							</Heading>
							<Text className="text-fg m-0 text-base leading-7">
								Thank you for subscribing to Radian! We are excited to welcome you to our community. Radian is a high-quality, flexible and open-source, design and development
								library built using React, Radix and Tailwind. Here are few resources to help you get started with Radian.
							</Text>
						</Section>

						<Hr className="m-0 my-12 bg-[#06063714]" />

						{/* Figma Community File Section */}
						<Section>
							<Heading as="h2" m={0} className="text-fg mb-3 text-[1.25rem] font-semibold leading-7">
								Figma Community File
							</Heading>
							<Text className="text-fg m-0 text-base leading-7">
								Available on the Figma Community, Radian is a free design system and UI kit built for solo designers, freelancers, startups, agencies, and organizations. It
								utilizes all modern Figma practices such as auto layout, variables, and token systems.
							</Text>
							<Img
								src={`${baseUrl}/media/figma-community-file.png`}
								alt="figma-community-file"
								width="600"
								style={{
									backgroundColor: "#F4F4F6",
									display: "block",
									width: "100%",
									maxWidth: "100%",
									height: "auto",
									marginTop: "32px",
									marginBottom: "32px",
								}}
							/>
							<Button href="#" className="bg-primary block w-full py-1.5 text-center font-medium text-white hover:cursor-pointer">
								<Row cellSpacing={6} align="center" className="mx-auto w-fit">
									<Column align="right">❖ Radian Design System ❖ Figma Kit </Column>
									<Column align="left">
										<Img src={`${baseUrl}/media/arrow-up-right.png`} width="20" height="20" alt="arrow-up-right" className="block" />
									</Column>
								</Row>
							</Button>
						</Section>

						<Hr className="m-0 my-12 bg-[#06063714]" />

						{/* Documentation for Development Section */}
						<Section>
							<Heading as="h2" m={0} className="text-fg mb-3 text-[1.25rem] font-semibold leading-7">
								Documentation for Development
							</Heading>
							<Text className="text-fg m-0 text-base leading-7">
								Get detailed API and prop references for components, usage examples, and installation instructions for different frameworks and many more technical details for your
								product development.
							</Text>
							<Img
								src={`${baseUrl}/media/documentation-for-development.png`}
								alt="documentation-for-development"
								width="600"
								style={{
									backgroundColor: "#F4F4F6",
									display: "block",
									width: "100%",
									maxWidth: "100%",
									height: "auto",
									marginTop: "32px",
									marginBottom: "32px",
								}}
							/>
							<Button href={`${baseUrl}/docs/getting-started/introduction`} className="bg-primary block w-full py-1.5 text-center font-medium text-white hover:cursor-pointer">
								<Row cellSpacing={6} align="center" className="mx-auto w-fit">
									<Column align="right">Read Documentation</Column>
									<Column align="left">
										<Img src={`${baseUrl}/media/arrow-up-right.png`} width="20" height="20" alt="arrow-up-right" className="block" />
									</Column>
								</Row>
							</Button>
						</Section>

						<Hr className="m-0 my-12 bg-[#06063714]" />

						{/* Getting Started Section */}
						<Section>
							<Section>
								<Heading as="h2" m={0} className="text-fg mb-3 text-[1.25rem] font-semibold leading-7">
									Getting Started
								</Heading>
								<Text className="text-fg m-0 text-base leading-7">
									We know jumping into a new system can be overwhelming, so here are three simple steps to integrate Radian into your workflow:
								</Text>

								<Section className="mt-10">
									<Heading as="h3" m={0} className="text-fg text-lg font-semibold leading-7">
										Theme Design To Your New Project
									</Heading>
									<Img
										src={`${baseUrl}/media/theme-design-to-your-new-project.png`}
										alt="theme-design-to-your-new-project"
										width="600"
										style={{
											backgroundColor: "#F4F4F6",
											display: "block",
											width: "100%",
											maxWidth: "100%",
											height: "auto",
											marginTop: "24px",
											marginBottom: "24px",
										}}
									/>
									<Text className="text-fg m-0 text-base leading-7">
										<span className="font-semibold">Changing the logo and Primary theme:</span> The single biggest impact you can make immediately is changing the Primary Color &
										Brand Logo. Read the documentation on colors, typography and logo pages within the Figma file. This will save hours of rework later.
									</Text>
								</Section>

								<Section className="mt-10">
									<Heading as="h3" m={0} className="text-fg text-lg font-semibold leading-7">
										Navigating Documentation
									</Heading>
									<Img
										src={`${baseUrl}/media/navigating-documentation.png`}
										alt="navigating-documentation"
										width="600"
										style={{
											backgroundColor: "#F4F4F6",
											display: "block",
											width: "100%",
											maxWidth: "100%",
											height: "auto",
											marginTop: "24px",
											marginBottom: "24px",
										}}
									/>
									<Text className="text-fg m-0 text-base leading-7">
										<span className="font-semibold">Use the Command Palette for Help:</span> In Radian’s website make use of the [⌘ + K] shortcut. Its the fastest way to search
										components, specific design stuff, documentation, and helpful troubleshooting tips without leaving your current context.
									</Text>
								</Section>

								<Section className="mt-10">
									<Heading as="h3" m={0} className="text-fg text-lg font-semibold leading-7">
										Examples and Blocks
									</Heading>
									<Img
										src={`${baseUrl}/media/examples-and-blocks.png`}
										alt="examples-and-blocks"
										width="600"
										style={{
											backgroundColor: "#F4F4F6",
											display: "block",
											width: "100%",
											maxWidth: "100%",
											height: "auto",
											marginTop: "24px",
											marginBottom: "24px",
										}}
									/>
									<Text className="text-fg m-0 text-base leading-7">
										<span className="font-semibold">Explore / search first:</span> At Radian we try to make sure you have everything you need right out the box. So we have plenty
										of examples and layout blocks for each component. Navigate the documentation for component or visit the blocks page. You might find something you are trying to
										build already there.
									</Text>
								</Section>
							</Section>
						</Section>

						<Hr className="m-0 my-12 bg-[#06063714]" />

						{/* Community & Support Section */}
						<Section>
							<Heading as="h2" m={0} className="text-fg mb-3 text-[1.25rem] font-semibold leading-7">
								Community &amp; Support
							</Heading>

							<Text className="text-fg m-0 mb-6 text-base leading-7">
								Radian is an open-source project aiming to give you the best out of box experience and better UI for your upcoming projects. We invite you to join our community for
								latest updates, feedback and contributions.
							</Text>
							{/* Buttons: three equal-width columns across the row */}
							<Section cellSpacing={0} cellPadding={0}>
								<Row cellSpacing={8}>
									{/* Twitter */}
									<Column className="w-1/3">
										<Link href="#" className="border-border text-fg-secondary block w-full rounded-lg border bg-white py-2 text-sm font-medium no-underline">
											<Row cellSpacing={6} align="center" className="mx-auto w-fit">
												<Column align="right">
													<Img src={`${baseUrl}/media/x.png`} width="20" height="20" alt="x" style={{ display: "block" }} />
												</Column>
												<Column align="left">X (Twitter)</Column>
											</Row>
										</Link>
									</Column>

									{/* GitHub */}
									<Column className="w-1/3">
										<Link href="#" className="border-border text-fg-secondary block w-full rounded-lg border bg-white py-2 text-sm font-medium no-underline">
											<Row cellSpacing={6} align="center" className="mx-auto w-fit">
												<Column align="right">
													<Img src={`${baseUrl}/media/github.png`} width="20" height="20" alt="github" style={{ display: "block" }} />
												</Column>
												<Column align="left" className="text-fg-secondary text-sm font-medium">
													GitHub
												</Column>
											</Row>
										</Link>
									</Column>

									{/* LinkedIn */}
									<Column className="w-1/3">
										<Link href="#" className="border-border text-fg-secondary block w-full rounded-lg border bg-white py-2 text-sm font-medium no-underline">
											<Row cellSpacing={6} align="center" className="mx-auto w-fit">
												<Column align="right">
													<Img src={`${baseUrl}/media/linked-in.png`} width="20" height="20" alt="linked-in" style={{ display: "block" }} />
												</Column>
												<Column align="left" className="text-fg-secondary text-sm font-medium">
													LinkedIn
												</Column>
											</Row>
										</Link>
									</Column>
								</Row>
							</Section>
						</Section>

						<Hr className="m-0 my-12 bg-[#06063714]" />

						<Section>
							<Text className="text-fg m-0 text-base leading-7">
								We are here to help you ship faster. If you need help, feel free to reply to this email. Don’t worry we have no intention to flood your inbox to unnecessary emails.
								We will only send emails when there is a massive update to our library or huge product changes.
							</Text>
							<br />
							<Text className="text-fg m-0 text-base leading-7">
								Best Regards,
								<br />
								The Radian Team
							</Text>
						</Section>

						<Hr className="m-0 my-12 bg-[#06063714]" />

						<Section>
							<Img alt="radian-logo" className="mb-4" height={24} src={`${baseUrl}/media/radian.png`} />
							<Row>
								<Column className="w-4/5" align="left">
									<Text className="text-fg-secondary m-0">
										RadianOS
										<br />
										Delaware 19901, US
										<br />8 The Green STE A Dover
									</Text>
								</Column>
								<Column align="right">
									<Row align="right" cellSpacing={8}>
										<Column>
											<Button
												href="#"
												style={{
													boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
													borderRadius: "8px",
													border: "1px solid #dedee3",
													backgroundColor: "#ffffff",
													padding: "6px",
													cursor: "pointer",
													display: "inline-block",
												}}>
												<Img alt="github" height="20" src={`${baseUrl}/media/github.png`} width="20" />
											</Button>
										</Column>
										<Column>
											<Button
												href="#"
												style={{
													boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
													borderRadius: "8px",
													border: "1px solid #dedee3",
													backgroundColor: "#ffffff",
													padding: "6px",
													cursor: "pointer",
													display: "inline-block",
												}}>
												<Img alt="linked-in" height="20" src={`${baseUrl}/media/linked-in.png`} width="20" />
											</Button>
										</Column>
										<Column>
											<Button
												href="#"
												style={{
													boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
													borderRadius: "8px",
													border: "1px solid #dedee3",
													backgroundColor: "#ffffff",
													padding: "6px",
													cursor: "pointer",
													display: "inline-block",
												}}>
												<Img alt="x" height="20" src={`${baseUrl}/media/x.png`} width="20" />
											</Button>
										</Column>
									</Row>
								</Column>
							</Row>
						</Section>

						{/* Footer */}
						<Section className="mt-11 text-center">
							<Text className="text-fg-tertiary m-0 text-sm">2025 © Radian OS, all rights reserved</Text>
							<Text className="text-fg-tertiary m-0 my-1 text-sm">8 The Green STE A Dover, Delaware 19901, US</Text>
							<Link href={`${baseUrl}/api/unsubscribe?id=${encodeURIComponent(id)}`} className="text-fg-tertiary text-sm underline">
								Unsubscribe
							</Link>
						</Section>
					</Container>
				</Body>
			</TailwindConfig>
		</Html>
	)
}
