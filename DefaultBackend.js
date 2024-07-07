
import { encode, decode } from "isomorphic-textencoder"
import debounce from "just-debounce-it"

import CacheFS from "./CacheFS"
import { ENOENT, ENOTEMPTY, ETIMEDOUT } from "./errors"
import IdbBackend from "./IdbBackend"
import HttpBackend from "./HttpBackend"
import Mutex from "./Mutex"
import Mutex2 from "./Mutex2"
import path from "./path"

export default class DefaultBackend {
  constructor() {
    this.saveSuperblock = debounce(() => {
      this.flush()
    }, 500)
  }

  async init(
    name,
    {
      wipe,
      url,
      urlauto,
      fileDbName = name,
      db = null,
      fileStoreName = `${name}_files`,
      lockDbName = `${name}_lock`,
      lockStoreName = `${name}_lock`,
    } = {}
  ) {
    this._name = name
    this._idb = db || new IdbBackend(fileDbName, fileStoreName)
    this._mutex = navigator.locks
      ? new Mutex2(name)
      : new Mutex(lockDbName, lockStoreName)
    this._cache = new CacheFS(name)
    this._opts = { wipe, url }
    this._needsWipe = !!wipe
    if (url) {
      this._http = new HttpBackend(url)
      this._urlauto = !!urlauto
    }
  }

  async activate() {
    if (this._cache.activated) return
    if (this._needsWipe) {
      this._needsWipe = false
      await this._idb.wipe()
      await this._mutex.release({ force: true })
    }
    if (!(await this._mutex.has())) await this._mutex.wait()
    const root = await this._idb.loadSuperblock()
    if (root) {
      this._cache.activate(root)
    } else if (this._http) {
      const text = await this._http.loadSuperblock()
      this._cache.activate(text)
      await this._saveSuperblock()
    } else {
      this._cache.activate()
    }
    if (await this._mutex.has()) {
      return
    } else {
      throw new ETIMEDOUT()
    }
  }

  async deactivate() {
    if (await this._mutex.has()) {
      await this._saveSuperblock()
    }
    this._cache.deactivate()
    try {
      await this._mutex.release()
    } catch (e) {
      console.log(e)
    }
    await this._idb.close()
  }

  async _saveSuperblock() {
    if (this._cache.activated) {
      this._lastSavedAt = Date.now()
      await this._idb.saveSuperblock(this._cache._root)
    }
  }

  _writeStat(filepath, size, opts) {
    const dirparts = path.split(path.dirname(filepath))
    let dir = dirparts.shift()
    for (const dirpart of dirparts) {
      dir = path.join(dir, dirpart)
      try {
        this._cache.mkdir(dir, { mode: 0o777 })
      } catch (e) {}
    }
    return this._cache.writeStat(filepath, size, opts)
  }

  async readFile(filepath, opts) {
    const encoding = typeof opts === "string" ? opts : opts && opts.encoding
    if (encoding && encoding !== "utf8")
      throw new Error('Only "utf8" encoding is supported in readFile')
    let data = null,
      stat = null
    try {
      stat = this._cache.stat(filepath)
      data = await this._idb.readFile(stat.ino)
      data = this.arrayToArrayBuffer(data)

    } catch (e) {
      if (!this._urlauto) throw e
    }
    if (!data && this._http) {
      let lstat = this._cache.lstat(filepath)
      while (lstat.type === "symlink") {
        filepath = path.resolve(path.dirname(filepath), lstat.target)
        lstat = this._cache.lstat(filepath)
      }
      data = await this._http.readFile(filepath)
    }
    if (data) {
      if (!stat || stat.size != data.byteLength) {
        stat = await this._writeStat(filepath, data.byteLength, {
          mode: stat ? stat.mode : 0o666,
        })
        this.saveSuperblock() // debounced
      }
      if (encoding === "utf8") {
        data = decode(data)
      } else {
        // if(typeof data !== 'string')
        data.toString = () => decode(data)
      }
    }
    if (!stat) throw new ENOENT(filepath)
    return data
  }
  arrayToArrayBuffer( array ) {
    var length = array.length;
    var buffer = new ArrayBuffer( length  );
    var view = new Uint8Array(buffer);
    for ( var i = 0; i < length; i++) {
        view[i] = array[i];
    }
    return buffer;
}
  async writeFile(filepath, data, opts) {
    const { mode, encoding = "utf8" } = opts
    if (typeof data === "string") {
      if (encoding !== "utf8") {
        throw new Error('Only "utf8" encoding is supported in writeFile')
      }
      data = encode(data)
    }
    const stat = await this._cache.writeStat(filepath, data.byteLength, {
      mode,
    })
    await this._idb.writeFile(stat.ino, data)
  }

  async unlink(filepath, opts) {
    const stat = this._cache.lstat(filepath)
    this._cache.unlink(filepath)
    if (stat.type !== "symlink") {
      await this._idb.unlink(stat.ino)
    }
  }

  readdir(filepath, opts) {
    return this._cache.readdir(filepath)
  }

  mkdir(filepath, opts) {
    const { mode = 0o777 } = opts
    this._cache.mkdir(filepath, { mode })
  }

  rmdir(filepath, opts) {
    if (filepath === "/") {
      throw new ENOTEMPTY()
    }
    this._cache.rmdir(filepath)
  }

  rename(oldFilepath, newFilepath) {
    this._cache.rename(oldFilepath, newFilepath)
  }

  stat(filepath, opts) {
    return this._cache.stat(filepath)
  }

  lstat(filepath, opts) {
    return this._cache.lstat(filepath)
  }

  readlink(filepath, opts) {
    return this._cache.readlink(filepath)
  }

  symlink(target, filepath) {
    this._cache.symlink(target, filepath)
  }

  async backFile(filepath, opts) {
    const size = await this._http.sizeFile(filepath)
    await this._writeStat(filepath, size, opts)
  }

  du(filepath) {
    return this._cache.du(filepath)
  }

  flush() {
    return this._saveSuperblock()
  }
}
