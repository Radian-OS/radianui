import fsExtra from "fs-extra"
import { promises as fs } from "fs"
import os from "os"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const fixturesRoot = path.resolve(__dirname, "../fixtures")

/**
 * Copy a fixture directory into a fresh tmp path and return it.
 * Caller is responsible for removing it (usually via `cleanup`).
 */
export const copyFixture = async (
  fixtureRelativePath: string
): Promise<string> => {
  const src = path.join(fixturesRoot, fixtureRelativePath)
  const dst = await fs.mkdtemp(path.join(os.tmpdir(), "radianui-e2e-"))
  await fsExtra.copy(src, dst)
  return dst
}

export const makeTmpDir = () =>
  fs.mkdtemp(path.join(os.tmpdir(), "radianui-e2e-"))

export const cleanup = async (dir: string) => {
  await fs.rm(dir, { recursive: true, force: true })
}
