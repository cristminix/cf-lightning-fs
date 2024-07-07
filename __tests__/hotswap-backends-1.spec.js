import { env ,createExecutionContext} from "cloudflare:test";
import { describe, expect, it } from "vitest"

import {Store} as idb from "../../idb-keyval"

import FS from "../index.js";

Store.setKVStore(env.KV_STORE)

// idb.Store.createInstance('test','test-kv')

const c = createExecutionContext()
Store.setCtx(c)
const fs = new FS();
const pfs = fs.promises;

describe("hotswap backends", () => {

  it("re-init with new backend", async () => {
    // write a file
    fs.init("testfs-1", { wipe: true })
    await pfs.writeFile('/a.txt', 'HELLO');
    expect(await pfs.readFile('/a.txt', 'utf8')).toBe('HELLO');
    // idb.Store.setKVStore(env.KV_STORE)
    // console.log(env.KV_STORE)
    // we swap backends. file is gone
    fs.init('testfs-2', { wipe: true })
    let err = null
    try {
      await pfs.readFile('/a.txt', 'utf8')
    } catch (e) {
      err = e
    }
    expect(err).not.toBeNull();
    expect(err.code).toBe('ENOENT');
  });

});
