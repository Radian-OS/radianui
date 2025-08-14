import { JsxAttribute, Project, SyntaxKind } from 'ts-morph'

export async function removeNextDefaultFont(baseFilePath: string) {
  const project = new Project()

  const sourceFile = project.addSourceFileAtPath(baseFilePath)

  // Remove font imports
  sourceFile.getImportDeclarations().forEach((importDecl) => {
    if (importDecl.getModuleSpecifierValue().includes('next/font')) {
      importDecl.remove()
    }
  })

  // Remove font variable declarations (both geistSans and geistMono)
  sourceFile.getVariableStatements().forEach((statement) => {
    const declarations = statement.getDeclarations()
    declarations.forEach((decl) => {
      const initializer = decl.getInitializer()
      if (initializer?.getText().includes('Geist')) {
        statement.remove()
      }
    })
  })

  // Remove className from html and body if they exist
  sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement).forEach((jsxElement) => {
    const openingElement = jsxElement.getOpeningElement()
    const classNameAttr = openingElement.getAttribute('className') as JsxAttribute
    if (classNameAttr) {
      const value = classNameAttr.getInitializer()?.getText()
      if (value?.includes('geist')) {
        // Only remove the font related classes
        const newValue = value
          .replace(/[`{}$]/g, '')
          .split(' ')
          .filter((cls) => !cls.includes('geist'))
          .join(' ')

        if (newValue.trim()) {
          classNameAttr.setInitializer(`"${newValue}"`)
        } else {
          classNameAttr.remove()
        }
      }
    }
  })

  await sourceFile.save()
}
