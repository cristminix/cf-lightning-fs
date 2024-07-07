import { describe, expect, it } from "vitest"
import CacheFS from "../CacheFS"

import treeText from "./__fixtures__/tree-txt"

describe("CacheFS module", () => {
  it("print ∘ parse == id", () => {
    const fs = new CacheFS()
    let parsed = fs.parse(treeText)
    let text = fs.print(parsed)
    expect(text).toEqual(treeText)
  })
  it("size()", () => {
    const fs = new CacheFS()
    fs.activate()
    expect(fs.size()).toEqual(0)
    fs.activate(treeText)
    let inodeCount = treeText.trim().split("\n").length
    expect(fs.size()).toEqual(inodeCount)
  })
  it("autoinc()", () => {
    const fs = new CacheFS()
    fs.activate()
    expect(fs.autoinc()).toEqual(1)
    fs.writeStat("/foo", 3, {})
    expect(fs.autoinc()).toEqual(2)
    fs.mkdir("/bar", {})
    expect(fs.autoinc()).toEqual(3)
    fs.unlink("/foo")
    expect(fs.autoinc()).toEqual(3)
    fs.mkdir("/bar/baz", {})
    expect(fs.autoinc()).toEqual(4)
    fs.rmdir("/bar/baz")
    expect(fs.autoinc()).toEqual(3)
    fs.mkdir("/bar/bar", {})
    expect(fs.autoinc()).toEqual(4)
    fs.writeStat("/bar/bar/boo", 3, {})
    expect(fs.autoinc()).toEqual(5)
    fs.unlink("/bar/bar/boo")
    expect(fs.autoinc()).toEqual(4)
  })
})
