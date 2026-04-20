import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { logger } from "@/utils/logger"

describe("logger", () => {
  let logSpy: ReturnType<typeof vi.spyOn>
  let warnSpy: ReturnType<typeof vi.spyOn>
  let errorSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {})
    warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {})
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("success writes to console.log with the joined message", () => {
    logger.success("task", "done")
    expect(logSpy).toHaveBeenCalledTimes(1)
    expect(logSpy.mock.calls[0]?.[0]).toContain("task done")
  })

  it("info writes to console.log", () => {
    logger.info("hello")
    expect(logSpy).toHaveBeenCalledTimes(1)
    expect(logSpy.mock.calls[0]?.[0]).toContain("hello")
  })

  it("warn writes to console.warn", () => {
    logger.warn("careful")
    expect(warnSpy).toHaveBeenCalledTimes(1)
    expect(warnSpy.mock.calls[0]?.[0]).toContain("careful")
  })

  it("error writes to console.error", () => {
    logger.error("bad")
    expect(errorSpy).toHaveBeenCalledTimes(1)
    expect(errorSpy.mock.calls[0]?.[0]).toContain("bad")
  })

  it("log concatenates args without a separator", () => {
    logger.log("foo", "bar")
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("foobar"))
  })

  it("break prints an empty line", () => {
    logger.break()
    expect(logSpy).toHaveBeenCalledWith("")
  })
})
