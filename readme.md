###Example Hono routes

```
import { createHonoWithBindings } from "../global/fn/createHonoWithBindings"
import { drizzle } from "drizzle-orm/d1"
import path from "../libs/lfs/path"
import {Store,get,set,setDefaultStore,keys} from "../libs/idb-keyval"

import FS from "../libs/lfs"

const app = createHonoWithBindings()

app.get("/", async (c) => {
  // const KV_STORE = c.env.IDB_KEYVAL
  Store.setCtx(c)
  // const store = new Store("debug-keyval-store", "debug-keyval")
  // setDefaultStore(store)
  // let message = path.split("/hello/world.txt")

  const fs = new FS("fs", { wipe: true })
  // const HELLO = new Uint8Array([72, 69, 76, 76, 79])
  // await set("example2", { a: "Example prop" })
  // const obj = await get("example2")
  const keys_ = await c.env.IDB_KEYVAL.list()
  fs.mkdir("/booya", (err) => {
    console.log(err)
    // expect(err).not.toBe(null);
    // expect(err.code).toEqual("EEXIST");
    // done();
  })
  try{
    await fs.promises.writeFile("/booya/hello.txt","This is a text file")
  }catch(e){
    console.error(e)
  }
  try{
    await fs.promises.unlink("/booya/hello.txt")
  }catch(e){
    console.error(e)
  }
  let message = "blank"
  try{
    message = await fs.promises.readFile("/booya/hello.txt",)
    message = message.toString()
  }catch(e){
    console.error(e)
  }
  return c.json({
    debug: true,
    message,
    keys_,
  })
})

export default app
```