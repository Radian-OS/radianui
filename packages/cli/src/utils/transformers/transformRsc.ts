import { SourceFile, SyntaxKind } from "ts-morph"
import { ProjectInfo } from "@/utils/getProjectInfo"

const directiveRegex = /^["']use client["'];?$/

export const transformRsc = ({ sourceFile, projectInfo }: { sourceFile: SourceFile; projectInfo: ProjectInfo }): string => {
	if (projectInfo.isRSC) {
		return sourceFile.getFullText()
	}

	// 1. Remove `"use client"` directive
	const first = sourceFile.getFirstChildByKind(SyntaxKind.ExpressionStatement)
	if (first && directiveRegex.test(first.getText())) {
		first.remove()
	}

	// 2. Remove next/image and next/link imports
	const importDecls = sourceFile.getImportDeclarations()
	for (const decl of importDecls) {
		const module = decl.getModuleSpecifierValue()

		if (module === "next/image" || module === "next/link") {
			decl.remove()
		}
	}

	// 3. Replace <Image /> with <img />
	const imageJsx = sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement)
	for (const node of imageJsx) {
		if (node.getTagNameNode().getText() === "Image") {
			node.replaceWithText((writer) => {
				writer.write("<img")
				node.getAttributes().forEach((attr) => {
					writer.write(" ").write(attr.getText())
				})
				writer.write(" />")
			})
		}
	}

	const imageJsxOpen = sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement)
	const imageJsxClose = sourceFile.getDescendantsOfKind(SyntaxKind.JsxClosingElement)

	for (const node of imageJsxOpen) {
		if (node.getTagNameNode().getText() === "Image") {
			node.getTagNameNode().replaceWithText("img")
		}
	}
	for (const node of imageJsxClose) {
		if (node.getTagNameNode().getText() === "Image") {
			node.getTagNameNode().replaceWithText("img")
		}
	}

	// 4. Replace <Link> with <a>
	const linkJsxOpen = sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement)
	const linkJsxClose = sourceFile.getDescendantsOfKind(SyntaxKind.JsxClosingElement)
	const linkJsxSelf = sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement)

	for (const node of linkJsxOpen) {
		if (node.getTagNameNode().getText() === "Link") {
			node.getTagNameNode().replaceWithText("a")
		}
	}
	for (const node of linkJsxClose) {
		if (node.getTagNameNode().getText() === "Link") {
			node.getTagNameNode().replaceWithText("a")
		}
	}
	for (const node of linkJsxSelf) {
		if (node.getTagNameNode().getText() === "Link") {
			node.replaceWithText((writer) => {
				writer.write("<a")
				node.getAttributes().forEach((attr) => {
					writer.write(" ").write(attr.getText())
				})
				writer.write(" />")
			})
		}
	}

	return sourceFile.getFullText()
}
