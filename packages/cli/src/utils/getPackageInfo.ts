import fs from 'fs-extra'
import path from 'path'
import { type PackageJson } from 'type-fest'

//This function reads and return the whole package.json file contents
export const getPackageInfo = async (cwd: string = '', shouldThrow: boolean = true): Promise<PackageJson | null> => {
  const packageJsonPath = path.join(cwd, 'package.json')

  return (await fs.readJSON(packageJsonPath, {
    throws: shouldThrow,
  })) as PackageJson
}


