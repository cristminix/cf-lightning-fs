import { describe, expect, it } from "vitest"
// import jasmine
// const jasmine from "jasmine"
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000
import FS from "../index.js"

const fs = new FS("testfs-worker", { wipe: true }).promises

describe("thread safety", () => {
  it("launch a bunch of workers", (done) => {
    let workers = []
    let promises = []
    let numWorkers = 5
    fs.readdir("/").then((files) => {
      expect(files.length).toBe(0)
      for (let i = 1; i <= numWorkers; i++) {
        let promise = new Promise((resolve) => {
          let worker = new Worker(
            "http://127.0.0.1:8080/src/libs/lfs/__tests__/threadsafety.worker.js",
            { name: `worker_${i}` }
          )
          worker.onmessage = (e) => {
            if (e.data && e.data.message === "COMPLETE") resolve()
          }
          workers.push(worker)
        })
        promises.push(promise)
      }
      Promise.all(promises).then(() => {
        fs.readdir("/").then((files) => {
          expect(files.length).toBe(5 * numWorkers)
          done()
        })
      })
    })
  })
})
