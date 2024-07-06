#!/usr/bin/env node
import fs from "fs/promises"
import { lstatSync, readdirSync } from "fs"
import path from "path"

let symLinks = {}

const printTree = async (root, indent = 0) => {
  let str = ""
  try {
    const files = await fs.readdir(root)
    for (let file of files) {
      // Ignore itself
      if (file === ".superblock.txt") continue

      let fpath = path.join(root, file)
      let lstat = lstatSync(fpath)

      // Avoid infinite loops.
      if (lstat.isSymbolicLink()) {
        if (!symLinks[lstat.dev]) {
          symLinks[lstat.dev] = {}
        }
        // Skip this entry if we've seen it before
        if (symLinks[lstat.dev][lstat.ino]) {
          continue
        }
        symLinks[lstat.dev][lstat.ino] = true
      }

      let mode = lstat.mode.toString(8)
      str += `${"\t".repeat(indent)}`
      if (lstat.isDirectory()) {
        str += `${file}\t${mode}\n`
        str += await printTree(fpath, indent + 1)
      } else {
        str += `${file}\t${mode}\t${lstat.size}\t${lstat.mtimeMs}\n`
      }
    }
  } catch (err) {
    console.error(`Error reading directory: ${root}`, err)
  }
  return str
}

const generateTreeAndSaveToFile = async () => {
  try {
    const dirpath = process.cwd()
    const filepath = path.join(dirpath, ".superblock.txt")
    const contents = await printTree(dirpath)
    await fs.writeFile(filepath, contents)
    console.log(`File '${filepath}' has been written successfully.`)
  } catch (err) {
    console.error("Error generating directory tree:", err)
  }
}

if (!module.parent) {
  generateTreeAndSaveToFile()
}

export default printTree
