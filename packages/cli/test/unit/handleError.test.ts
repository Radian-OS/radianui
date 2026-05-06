import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { handleError } from "@/utils/handleError"

describe("handleError", () => {
  let exitSpy: ReturnType<typeof vi.spyOn>
  let errorSpy: ReturnType<typeof vi.spyOn>
  let logSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    exitSpy = vi.spyOn(process, "exit").mockImplementation((code?) => {
      throw new Error(`__exit:${code ?? 0}`)
    })
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {})
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("logs a string error and exits with code 1", () => {
    expect(() => handleError("something failed")).toThrow("__exit:1")
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining("something failed")
    )
    expect(exitSpy).toHaveBeenCalledWith(1)
  })

  it("logs an Error.message and exits with code 1", () => {
    expect(() => handleError(new Error("boom"))).toThrow("__exit:1")
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining("boom"))
    expect(exitSpy).toHaveBeenCalledWith(1)
  })

  it("falls back to a generic message for unknown error shapes", () => {
    expect(() => handleError({ weird: true })).toThrow("__exit:1")
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining("Something went wrong. Please try again.")
    )
    expect(exitSpy).toHaveBeenCalledWith(1)
  })

  it("falls back to a generic message for null/undefined", () => {
    expect(() => handleError(null)).toThrow("__exit:1")
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining("Something went wrong. Please try again.")
    )
  })
})
