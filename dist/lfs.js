"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/fast-text-encoding/text.min.js
  var require_text_min = __commonJS({
    "node_modules/fast-text-encoding/text.min.js"(exports) {
      (function(scope) {
        "use strict";
        function B(r, e) {
          var f;
          return r instanceof Buffer ? f = r : f = Buffer.from(r.buffer, r.byteOffset, r.byteLength), f.toString(e);
        }
        var w = function(r) {
          return Buffer.from(r);
        };
        function h(r) {
          for (var e = 0, f = Math.min(256 * 256, r.length + 1), n = new Uint16Array(f), i = [], o = 0; ; ) {
            var t = e < r.length;
            if (!t || o >= f - 1) {
              var s = n.subarray(0, o), m = s;
              if (i.push(String.fromCharCode.apply(null, m)), !t)
                return i.join("");
              r = r.subarray(e), e = 0, o = 0;
            }
            var a = r[e++];
            if ((a & 128) === 0)
              n[o++] = a;
            else if ((a & 224) === 192) {
              var d = r[e++] & 63;
              n[o++] = (a & 31) << 6 | d;
            } else if ((a & 240) === 224) {
              var d = r[e++] & 63, l = r[e++] & 63;
              n[o++] = (a & 31) << 12 | d << 6 | l;
            } else if ((a & 248) === 240) {
              var d = r[e++] & 63, l = r[e++] & 63, R = r[e++] & 63, c = (a & 7) << 18 | d << 12 | l << 6 | R;
              c > 65535 && (c -= 65536, n[o++] = c >>> 10 & 1023 | 55296, c = 56320 | c & 1023), n[o++] = c;
            }
          }
        }
        function F(r) {
          for (var e = 0, f = r.length, n = 0, i = Math.max(32, f + (f >>> 1) + 7), o = new Uint8Array(i >>> 3 << 3); e < f; ) {
            var t = r.charCodeAt(e++);
            if (t >= 55296 && t <= 56319) {
              if (e < f) {
                var s = r.charCodeAt(e);
                (s & 64512) === 56320 && (++e, t = ((t & 1023) << 10) + (s & 1023) + 65536);
              }
              if (t >= 55296 && t <= 56319)
                continue;
            }
            if (n + 4 > o.length) {
              i += 8, i *= 1 + e / r.length * 2, i = i >>> 3 << 3;
              var m = new Uint8Array(i);
              m.set(o), o = m;
            }
            if ((t & 4294967168) === 0) {
              o[n++] = t;
              continue;
            } else if ((t & 4294965248) === 0)
              o[n++] = t >>> 6 & 31 | 192;
            else if ((t & 4294901760) === 0)
              o[n++] = t >>> 12 & 15 | 224, o[n++] = t >>> 6 & 63 | 128;
            else if ((t & 4292870144) === 0)
              o[n++] = t >>> 18 & 7 | 240, o[n++] = t >>> 12 & 63 | 128, o[n++] = t >>> 6 & 63 | 128;
            else
              continue;
            o[n++] = t & 63 | 128;
          }
          return o.slice ? o.slice(0, n) : o.subarray(0, n);
        }
        var u = "Failed to ", p = function(r, e, f) {
          if (r)
            throw new Error("".concat(u).concat(e, ": the '").concat(f, "' option is unsupported."));
        };
        var x = typeof Buffer == "function" && Buffer.from;
        var A = x ? w : F;
        function v() {
          this.encoding = "utf-8";
        }
        v.prototype.encode = function(r, e) {
          return p(e && e.stream, "encode", "stream"), A(r);
        };
        function U(r) {
          var e;
          try {
            var f = new Blob([r], { type: "text/plain;charset=UTF-8" });
            e = URL.createObjectURL(f);
            var n = new XMLHttpRequest();
            return n.open("GET", e, false), n.send(), n.responseText;
          } finally {
            e && URL.revokeObjectURL(e);
          }
        }
        var O = !x && typeof Blob == "function" && typeof URL == "function" && typeof URL.createObjectURL == "function", S = ["utf-8", "utf8", "unicode-1-1-utf-8"], T = h;
        x ? T = B : O && (T = function(r) {
          try {
            return U(r);
          } catch (e) {
            return h(r);
          }
        });
        var y = "construct 'TextDecoder'", E = "".concat(u, " ").concat(y, ": the ");
        function g(r, e) {
          p(e && e.fatal, y, "fatal"), r = r || "utf-8";
          var f;
          if (x ? f = Buffer.isEncoding(r) : f = S.indexOf(r.toLowerCase()) !== -1, !f)
            throw new RangeError("".concat(E, " encoding label provided ('").concat(r, "') is invalid."));
          this.encoding = r, this.fatal = false, this.ignoreBOM = false;
        }
        g.prototype.decode = function(r, e) {
          p(e && e.stream, "decode", "stream");
          var f;
          return r instanceof Uint8Array ? f = r : r.buffer instanceof ArrayBuffer ? f = new Uint8Array(r.buffer) : f = new Uint8Array(r), T(f, this.encoding);
        };
        scope.TextEncoder = scope.TextEncoder || v;
        scope.TextDecoder = scope.TextDecoder || g;
      })(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : exports);
    }
  });

  // node_modules/isomorphic-textencoder/browser.js
  var require_browser = __commonJS({
    "node_modules/isomorphic-textencoder/browser.js"(exports, module) {
      require_text_min();
      module.exports = {
        encode: (string) => new TextEncoder().encode(string),
        decode: (buffer) => new TextDecoder().decode(buffer)
      };
    }
  });

  // node_modules/just-once/index.mjs
  var functionOnce = once;
  function once(fn) {
    var called, value;
    if (typeof fn !== "function") {
      throw new Error("expected a function but got " + fn);
    }
    return function wrap() {
      if (called) {
        return value;
      }
      called = true;
      value = fn.apply(this, arguments);
      fn = void 0;
      return value;
    };
  }

  // src/libs/lfs/DefaultBackend.js
  var import_isomorphic_textencoder = __toESM(require_browser());

  // node_modules/just-debounce-it/index.mjs
  var functionDebounce = debounce;
  function debounce(fn, wait, callFirst) {
    var timeout = null;
    var debouncedFn = null;
    var clear2 = function() {
      if (timeout) {
        clearTimeout(timeout);
        debouncedFn = null;
        timeout = null;
      }
    };
    var flush = function() {
      var call = debouncedFn;
      clear2();
      if (call) {
        call();
      }
    };
    var debounceWrapper = function() {
      if (!wait) {
        return fn.apply(this, arguments);
      }
      var context = this;
      var args = arguments;
      var callNow = callFirst && !timeout;
      clear2();
      debouncedFn = function() {
        fn.apply(context, args);
      };
      timeout = setTimeout(function() {
        timeout = null;
        if (!callNow) {
          var call = debouncedFn;
          debouncedFn = null;
          return call();
        }
      }, wait);
      if (callNow) {
        return debouncedFn();
      }
    };
    debounceWrapper.cancel = clear2;
    debounceWrapper.flush = flush;
    return debounceWrapper;
  }

  // src/libs/lfs/path.js
  var normalizePath = (path) => {
    if (path.length === 0) {
      return ".";
    }
    let parts = splitPath(path);
    parts = parts.reduce(reducer, []);
    return joinPath(...parts);
  };
  var resolvePath = (...paths) => {
    let result = "";
    for (const path of paths) {
      if (path.startsWith("/")) {
        result = path;
      } else {
        result = normalizePath(joinPath(result, path));
      }
    }
    return result;
  };
  var joinPath = (...parts) => {
    if (parts.length === 0)
      return "";
    let path = parts.join("/");
    path = path.replace(/\/{2,}/g, "/");
    return path;
  };
  var splitPath = (path) => {
    console.log(path);
    if (path.length === 0)
      return [];
    if (path === "/")
      return ["/"];
    let parts = path.split("/");
    if (parts[parts.length - 1] === "") {
      parts.pop();
    }
    if (path[0] === "/") {
      parts[0] = "/";
    } else {
      if (parts[0] !== ".") {
        parts.unshift(".");
      }
    }
    return parts;
  };
  var dirname = (path) => {
    const last = path.lastIndexOf("/");
    if (last === -1)
      throw new Error(`Cannot get dirname of "${path}"`);
    if (last === 0)
      return "/";
    return path.slice(0, last);
  };
  var basename = (path) => {
    if (path === "/")
      throw new Error(`Cannot get basename of "${path}"`);
    const last = path.lastIndexOf("/");
    if (last === -1)
      return path;
    return path.slice(last + 1);
  };
  var reducer = (ancestors, current) => {
    if (ancestors.length === 0) {
      ancestors.push(current);
      return ancestors;
    }
    if (current === ".")
      return ancestors;
    if (current === "..") {
      if (ancestors.length === 1) {
        if (ancestors[0] === "/") {
          throw new Error(
            "Unable to normalize path - traverses above root directory"
          );
        }
        if (ancestors[0] === ".") {
          ancestors.push(current);
          return ancestors;
        }
      }
      if (ancestors.length > 1 && ancestors[ancestors.length - 1] !== "..") {
        ancestors.pop();
      } else {
        ancestors.push("..");
      }
      return ancestors;
    }
    ancestors.push(current);
    return ancestors;
  };
  var path_default = {
    join: joinPath,
    normalize: normalizePath,
    split: splitPath,
    basename,
    dirname,
    resolve: resolvePath
  };

  // src/libs/lfs/errors.js
  function Err(name) {
    return class extends Error {
      constructor(...args) {
        super(...args);
        this.code = name;
        if (this.message) {
          this.message = `${name}: ${this.message}`;
        } else {
          this.message = name;
        }
      }
    };
  }
  var EEXIST = Err("EEXIST");
  var ENOENT = Err("ENOENT");
  var ENOTDIR = Err("ENOTDIR");
  var ENOTEMPTY = Err("ENOTEMPTY");
  var ETIMEDOUT = Err("ETIMEDOUT");
  var EISDIR = Err("EISDIR");

  // src/libs/lfs/CacheFS.js
  var STAT = 0;
  var CacheFS = class {
    constructor() {
    }
    _makeRoot(root = /* @__PURE__ */ new Map()) {
      root.set(STAT, {
        mode: 511,
        type: "dir",
        size: 0,
        ino: 0,
        mtimeMs: Date.now()
      });
      return root;
    }
    activate(superblock = null) {
      if (superblock === null) {
        this._root = /* @__PURE__ */ new Map([["/", this._makeRoot()]]);
      } else if (typeof superblock === "string") {
        this._root = /* @__PURE__ */ new Map([["/", this._makeRoot(this.parse(superblock))]]);
      } else {
        this._root = superblock;
      }
    }
    get activated() {
      return !!this._root;
    }
    deactivate() {
      this._root = void 0;
    }
    size() {
      return this._countInodes(this._root.get("/")) - 1;
    }
    _countInodes(map) {
      let count = 1;
      for (let [key, val] of map) {
        if (key === STAT)
          continue;
        count += this._countInodes(val);
      }
      return count;
    }
    autoinc() {
      let val = this._maxInode(this._root.get("/")) + 1;
      return val;
    }
    _maxInode(map) {
      let max = map.get(STAT).ino;
      for (let [key, val] of map) {
        if (key === STAT)
          continue;
        max = Math.max(max, this._maxInode(val));
      }
      return max;
    }
    print(root = this._root.get("/")) {
      let str = "";
      const printTree = (root2, indent) => {
        for (let [file, node] of root2) {
          if (file === 0)
            continue;
          let stat = node.get(STAT);
          let mode = stat.mode.toString(8);
          str += `${"	".repeat(indent)}${file}	${mode}`;
          if (stat.type === "file") {
            str += `	${stat.size}	${stat.mtimeMs}
`;
          } else {
            str += `
`;
            printTree(node, indent + 1);
          }
        }
      };
      printTree(root, 0);
      return str;
    }
    parse(print) {
      let autoinc = 0;
      const mk = (stat) => {
        const ino = ++autoinc;
        const type = stat.length === 1 ? "dir" : "file";
        let [mode, size, mtimeMs] = stat;
        mode = parseInt(mode, 8);
        size = size ? parseInt(size) : 0;
        mtimeMs = mtimeMs ? parseInt(mtimeMs) : Date.now();
        return /* @__PURE__ */ new Map([[STAT, { mode, type, size, mtimeMs, ino }]]);
      };
      let lines = print.trim().split("\n");
      let _root = this._makeRoot();
      let stack = [
        { indent: -1, node: _root },
        { indent: 0, node: null }
      ];
      for (let line of lines) {
        let prefix = line.match(/^\t*/)[0];
        let indent = prefix.length;
        line = line.slice(indent);
        let [filename, ...stat] = line.split("	");
        let node = mk(stat);
        if (indent <= stack[stack.length - 1].indent) {
          while (indent <= stack[stack.length - 1].indent) {
            stack.pop();
          }
        }
        stack.push({ indent, node });
        let cd = stack[stack.length - 2].node;
        cd.set(filename, node);
      }
      return _root;
    }
    _lookup(filepath, follow = true) {
      let dir = this._root;
      let partialPath = "/";
      let parts = path_default.split(filepath);
      for (let i = 0; i < parts.length; ++i) {
        let part = parts[i];
        dir = dir.get(part);
        if (!dir)
          throw new ENOENT(filepath);
        if (follow || i < parts.length - 1) {
          const stat = dir.get(STAT);
          if (stat.type === "symlink") {
            let target = path_default.resolve(partialPath, stat.target);
            dir = this._lookup(target);
          }
          if (!partialPath) {
            partialPath = part;
          } else {
            partialPath = path_default.join(partialPath, part);
          }
        }
      }
      return dir;
    }
    mkdir(filepath, { mode }) {
      if (filepath === "/")
        throw new EEXIST();
      let dir = this._lookup(path_default.dirname(filepath));
      let basename2 = path_default.basename(filepath);
      if (dir.has(basename2)) {
        throw new EEXIST();
      }
      let entry = /* @__PURE__ */ new Map();
      let stat = {
        mode,
        type: "dir",
        size: 0,
        mtimeMs: Date.now(),
        ino: this.autoinc()
      };
      entry.set(STAT, stat);
      dir.set(basename2, entry);
    }
    rmdir(filepath) {
      let dir = this._lookup(filepath);
      if (dir.get(STAT).type !== "dir")
        throw new ENOTDIR();
      if (dir.size > 1)
        throw new ENOTEMPTY();
      let parent = this._lookup(path_default.dirname(filepath));
      let basename2 = path_default.basename(filepath);
      parent.delete(basename2);
    }
    readdir(filepath) {
      let dir = this._lookup(filepath);
      if (dir.get(STAT).type !== "dir")
        throw new ENOTDIR();
      return [...dir.keys()].filter((key) => typeof key === "string");
    }
    writeStat(filepath, size, { mode }) {
      let ino;
      let oldStat;
      try {
        oldStat = this.stat(filepath);
      } catch (err) {
      }
      if (oldStat !== void 0) {
        if (oldStat.type === "dir") {
          throw new EISDIR();
        }
        if (mode == null) {
          mode = oldStat.mode;
        }
        ino = oldStat.ino;
      }
      if (mode == null) {
        mode = 438;
      }
      if (ino == null) {
        ino = this.autoinc();
      }
      let dir = this._lookup(path_default.dirname(filepath));
      let basename2 = path_default.basename(filepath);
      let stat = {
        mode,
        type: "file",
        size,
        mtimeMs: Date.now(),
        ino
      };
      let entry = /* @__PURE__ */ new Map();
      entry.set(STAT, stat);
      dir.set(basename2, entry);
      return stat;
    }
    unlink(filepath) {
      let parent = this._lookup(path_default.dirname(filepath));
      let basename2 = path_default.basename(filepath);
      parent.delete(basename2);
    }
    rename(oldFilepath, newFilepath) {
      let basename2 = path_default.basename(newFilepath);
      let entry = this._lookup(oldFilepath);
      let destDir = this._lookup(path_default.dirname(newFilepath));
      destDir.set(basename2, entry);
      this.unlink(oldFilepath);
    }
    stat(filepath) {
      return this._lookup(filepath).get(STAT);
    }
    lstat(filepath) {
      return this._lookup(filepath, false).get(STAT);
    }
    readlink(filepath) {
      return this._lookup(filepath, false).get(STAT).target;
    }
    symlink(target, filepath) {
      let ino, mode;
      try {
        let oldStat = this.stat(filepath);
        if (mode === null) {
          mode = oldStat.mode;
        }
        ino = oldStat.ino;
      } catch (err) {
      }
      if (mode == null) {
        mode = 40960;
      }
      if (ino == null) {
        ino = this.autoinc();
      }
      let dir = this._lookup(path_default.dirname(filepath));
      let basename2 = path_default.basename(filepath);
      let stat = {
        mode,
        type: "symlink",
        target,
        size: 0,
        mtimeMs: Date.now(),
        ino
      };
      let entry = /* @__PURE__ */ new Map();
      entry.set(STAT, stat);
      dir.set(basename2, entry);
      return stat;
    }
    _du(dir) {
      let size = 0;
      for (const [name, entry] of dir.entries()) {
        if (name === STAT) {
          size += entry.size;
        } else {
          size += this._du(entry);
        }
      }
      return size;
    }
    du(filepath) {
      let dir = this._lookup(filepath);
      return this._du(dir);
    }
  };

  // src/libs/idb-keyval/index.js
  var Store = class _Store {
    static instance = null;
    static createInstance(dbName, storeName, KV_STORE) {
      _Store.instance = new _Store(dbName, storeName, KV_STORE);
    }
    static getInstance() {
      return _Store.instance;
    }
    _dbp = null;
    _dbName = null;
    _storeName = null;
    constructor(dbName = "keyval-store", storeName = "keyval", KV_STORE = null) {
      this._dbName = dbName;
      this._storeName = storeName;
      this._init(KV_STORE);
    }
    getDb() {
      return this._dbp;
    }
    async keys() {
      console.log(`idb.Store.keys()`);
      return await this._dbp.list();
    }
    _init(kvStore) {
      if (this._dbp) {
        return;
      }
      this._dbp = kvStore;
    }
    //   _withIDBStore(
    //     type: IDBTransactionMode,
    //     callback: (store: IDBObjectStore) => void
    //   ): Promise<void> {
    //     this._init()
    //     return (this._dbp as Promise<IDBDatabase>).then(
    //       (db) =>
    //         new Promise<void>((resolve, reject) => {
    //           const transaction = db.transaction(this.storeName, type)
    //           transaction.oncomplete = () => resolve()
    //           transaction.onabort = transaction.onerror = () =>
    //             reject(transaction.error)
    //           callback(transaction.objectStore(this.storeName))
    //         })
    //     )
    //   }
    _close() {
      console.log(`idb.Store.close()`);
      this._init();
    }
  };
  var defaultStore = null;
  function getDefaultStore() {
    if (!defaultStore) {
      console.log(`defaultStore is null`);
      defaultStore = Store.getInstance();
      console.log(defaultStore);
    }
    return defaultStore;
  }
  async function get(key, store = getDefaultStore()) {
    console.log(`idb.get()`);
    const raw = await store.getDb().get(key);
    if (typeof raw === "undefined")
      return null;
    let value = raw;
    try {
      value = JSON.parse(raw);
    } catch (e) {
      console.error(e);
      value = null;
    }
    return value;
  }
  async function set(key, value, store = getDefaultStore()) {
    console.log(`idb.set()`);
    console.log(store);
    return await store.getDb().put(key, JSON.stringify(value));
  }
  async function update(key, updater, store = getDefaultStore()) {
    console.log(`idb.update()`);
    const oldValue = await get(key, store);
    const newValue = JSON.stringify(updater(oldValue));
    return await store.getDb().put(key, newValue);
  }
  async function del(key, store = getDefaultStore()) {
    console.log(`idb.del()`);
    return await store.getDb().delete(key);
  }
  async function clear(store = getDefaultStore()) {
    console.log(`idb.clear()`);
    try {
    } catch (err) {
      console.error(err);
    }
  }
  function close(store = getDefaultStore()) {
    return store._close();
  }

  // src/libs/lfs/IdbBackend.js
  var IdbBackend = class {
    constructor(dbname, storename) {
      this._database = dbname;
      this._storename = storename;
      this._store = new Store(this._database, this._storename);
    }
    saveSuperblock(superblock) {
      return set("!root", superblock, this._store);
    }
    loadSuperblock() {
      return get("!root", this._store);
    }
    readFile(inode) {
      return get(inode, this._store);
    }
    writeFile(inode, data) {
      return set(inode, data, this._store);
    }
    unlink(inode) {
      return del(inode, this._store);
    }
    wipe() {
      return clear(this._store);
    }
    close() {
      return close(this._store);
    }
  };

  // src/libs/lfs/HttpBackend.js
  var HttpBackend = class {
    constructor(url) {
      this._url = url;
    }
    loadSuperblock() {
      return fetch(this._url + "/.superblock.txt").then(
        (res) => res.ok ? res.text() : null
      );
    }
    async readFile(filepath) {
      const res = await fetch(this._url + filepath);
      if (res.status === 200) {
        return res.arrayBuffer();
      } else {
        throw new Error("ENOENT");
      }
    }
    async sizeFile(filepath) {
      const res = await fetch(this._url + filepath, { method: "HEAD" });
      if (res.status === 200) {
        return res.headers.get("content-length");
      } else {
        throw new Error("ENOENT");
      }
    }
  };

  // src/libs/lfs/Mutex.js
  var sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  var Mutex = class {
    constructor(dbname, storename) {
      this._id = Math.random();
      this._database = dbname;
      this._storename = storename;
      this._store = Store.getInstance();
      this._lock = null;
    }
    async has({ margin = 2e3 } = {}) {
      if (this._lock && this._lock.holder === this._id) {
        const now = Date.now();
        if (this._lock.expires > now + margin) {
          return true;
        } else {
          return await this.renew();
        }
      } else {
        return false;
      }
    }
    // Returns true if successful
    async renew({ ttl = 5e3 } = {}) {
      let success;
      await update(
        "lock",
        (current) => {
          const now = Date.now();
          const expires = now + ttl;
          success = current && current.holder === this._id;
          this._lock = success ? { holder: this._id, expires } : current;
          return this._lock;
        },
        this._store
      );
      return success;
    }
    // Returns true if successful
    async acquire({ ttl = 5e3 } = {}) {
      let success;
      let expired;
      let doubleLock;
      await update(
        "lock",
        (current) => {
          const now = Date.now();
          const expires = now + ttl;
          expired = current && current.expires < now;
          success = current === void 0 || expired;
          doubleLock = current && current.holder === this._id;
          this._lock = success ? { holder: this._id, expires } : current;
          return this._lock;
        },
        this._store
      );
      if (doubleLock) {
        throw new Error("Mutex double-locked");
      }
      return success;
    }
    // check at 10Hz, give up after 10 minutes
    async wait({ interval = 100, limit = 6e3, ttl } = {}) {
      while (limit--) {
        if (await this.acquire({ ttl }))
          return true;
        await sleep(interval);
      }
      throw new Error("Mutex timeout");
    }
    // Returns true if successful
    async release({ force = false } = {}) {
      let success;
      let doubleFree;
      let someoneElseHasIt;
      await update(
        "lock",
        (current) => {
          success = force || current && current.holder === this._id;
          doubleFree = current === void 0;
          someoneElseHasIt = current && current.holder !== this._id;
          this._lock = success ? void 0 : current;
          return this._lock;
        },
        this._store
      );
      await close(this._store);
      if (!success && !force) {
        if (doubleFree)
          throw new Error("Mutex double-freed");
        if (someoneElseHasIt)
          throw new Error("Mutex lost ownership");
      }
      return success;
    }
  };

  // src/libs/lfs/Mutex2.js
  var Mutex2 = class {
    constructor(name) {
      this._id = Math.random();
      this._database = name;
      this._has = false;
      this._release = null;
    }
    async has() {
      return this._has;
    }
    // Returns true if successful
    async acquire() {
      return new Promise((resolve) => {
        navigator.locks.request(
          this._database + "_lock",
          { ifAvailable: true },
          (lock) => {
            this._has = !!lock;
            resolve(!!lock);
            return new Promise((resolve2) => {
              this._release = resolve2;
            });
          }
        );
      });
    }
    // Returns true if successful, gives up after 10 minutes
    async wait({ timeout = 6e5 } = {}) {
      return new Promise((resolve, reject) => {
        const controller = new AbortController();
        setTimeout(() => {
          controller.abort();
          reject(new Error("Mutex timeout"));
        }, timeout);
        navigator.locks.request(
          this._database + "_lock",
          { signal: controller.signal },
          (lock) => {
            this._has = !!lock;
            resolve(!!lock);
            return new Promise((resolve2) => {
              this._release = resolve2;
            });
          }
        );
      });
    }
    // Returns true if successful
    async release({ force = false } = {}) {
      this._has = false;
      if (this._release) {
        this._release();
      } else if (force) {
        navigator.locks.request(
          this._database + "_lock",
          { steal: true },
          (lock) => true
        );
      }
    }
  };

  // src/libs/lfs/DefaultBackend.js
  var DefaultBackend = class {
    constructor() {
      this.saveSuperblock = functionDebounce(() => {
        this.flush();
      }, 500);
    }
    async init(name, {
      wipe,
      url,
      urlauto,
      fileDbName = name,
      db = null,
      fileStoreName = `${name}_files`,
      lockDbName = `${name}_lock`,
      lockStoreName = `${name}_lock`
    } = {}) {
      this._name = name;
      this._idb = db || new IdbBackend(fileDbName, fileStoreName);
      this._mutex = navigator.locks ? new Mutex2(name) : new Mutex(lockDbName, lockStoreName);
      this._cache = new CacheFS(name);
      this._opts = { wipe, url };
      this._needsWipe = !!wipe;
      if (url) {
        this._http = new HttpBackend(url);
        this._urlauto = !!urlauto;
      }
    }
    async activate() {
      if (this._cache.activated)
        return;
      if (this._needsWipe) {
        this._needsWipe = false;
        await this._idb.wipe();
        await this._mutex.release({ force: true });
      }
      if (!await this._mutex.has())
        await this._mutex.wait();
      const root = await this._idb.loadSuperblock();
      if (root) {
        this._cache.activate(root);
      } else if (this._http) {
        const text = await this._http.loadSuperblock();
        this._cache.activate(text);
        await this._saveSuperblock();
      } else {
        this._cache.activate();
      }
      if (await this._mutex.has()) {
        return;
      } else {
        throw new ETIMEDOUT();
      }
    }
    async deactivate() {
      if (await this._mutex.has()) {
        await this._saveSuperblock();
      }
      this._cache.deactivate();
      try {
        await this._mutex.release();
      } catch (e) {
        console.log(e);
      }
      await this._idb.close();
    }
    async _saveSuperblock() {
      if (this._cache.activated) {
        this._lastSavedAt = Date.now();
        await this._idb.saveSuperblock(this._cache._root);
      }
    }
    _writeStat(filepath, size, opts) {
      const dirparts = path_default.split(path_default.dirname(filepath));
      let dir = dirparts.shift();
      for (const dirpart of dirparts) {
        dir = path_default.join(dir, dirpart);
        try {
          this._cache.mkdir(dir, { mode: 511 });
        } catch (e) {
        }
      }
      return this._cache.writeStat(filepath, size, opts);
    }
    async readFile(filepath, opts) {
      const encoding = typeof opts === "string" ? opts : opts && opts.encoding;
      if (encoding && encoding !== "utf8")
        throw new Error('Only "utf8" encoding is supported in readFile');
      let data = null, stat = null;
      try {
        stat = this._cache.stat(filepath);
        data = await this._idb.readFile(stat.ino);
      } catch (e) {
        if (!this._urlauto)
          throw e;
      }
      if (!data && this._http) {
        let lstat = this._cache.lstat(filepath);
        while (lstat.type === "symlink") {
          filepath = path_default.resolve(path_default.dirname(filepath), lstat.target);
          lstat = this._cache.lstat(filepath);
        }
        data = await this._http.readFile(filepath);
      }
      if (data) {
        if (!stat || stat.size != data.byteLength) {
          stat = await this._writeStat(filepath, data.byteLength, {
            mode: stat ? stat.mode : 438
          });
          this.saveSuperblock();
        }
        if (encoding === "utf8") {
          data = (0, import_isomorphic_textencoder.decode)(data);
        } else {
          data.toString = () => (0, import_isomorphic_textencoder.decode)(data);
        }
      }
      if (!stat)
        throw new ENOENT(filepath);
      return data;
    }
    async writeFile(filepath, data, opts) {
      const { mode, encoding = "utf8" } = opts;
      if (typeof data === "string") {
        if (encoding !== "utf8") {
          throw new Error('Only "utf8" encoding is supported in writeFile');
        }
        data = (0, import_isomorphic_textencoder.encode)(data);
      }
      const stat = await this._cache.writeStat(filepath, data.byteLength, {
        mode
      });
      await this._idb.writeFile(stat.ino, data);
    }
    async unlink(filepath, opts) {
      const stat = this._cache.lstat(filepath);
      this._cache.unlink(filepath);
      if (stat.type !== "symlink") {
        await this._idb.unlink(stat.ino);
      }
    }
    readdir(filepath, opts) {
      return this._cache.readdir(filepath);
    }
    mkdir(filepath, opts) {
      const { mode = 511 } = opts;
      this._cache.mkdir(filepath, { mode });
    }
    rmdir(filepath, opts) {
      if (filepath === "/") {
        throw new ENOTEMPTY();
      }
      this._cache.rmdir(filepath);
    }
    rename(oldFilepath, newFilepath) {
      this._cache.rename(oldFilepath, newFilepath);
    }
    stat(filepath, opts) {
      return this._cache.stat(filepath);
    }
    lstat(filepath, opts) {
      return this._cache.lstat(filepath);
    }
    readlink(filepath, opts) {
      return this._cache.readlink(filepath);
    }
    symlink(target, filepath) {
      this._cache.symlink(target, filepath);
    }
    async backFile(filepath, opts) {
      const size = await this._http.sizeFile(filepath);
      await this._writeStat(filepath, size, opts);
    }
    du(filepath) {
      return this._cache.du(filepath);
    }
    flush() {
      return this._saveSuperblock();
    }
  };

  // src/libs/lfs/Stat.js
  var Stat = class {
    constructor(stats) {
      this.type = stats.type;
      this.mode = stats.mode;
      this.size = stats.size;
      this.ino = stats.ino;
      this.mtimeMs = stats.mtimeMs;
      this.ctimeMs = stats.ctimeMs || stats.mtimeMs;
      this.uid = 1;
      this.gid = 1;
      this.dev = 1;
    }
    isFile() {
      return this.type === "file";
    }
    isDirectory() {
      return this.type === "dir";
    }
    isSymbolicLink() {
      return this.type === "symlink";
    }
  };
  var Stat_default = Stat;

  // src/libs/lfs/PromisifiedFS.js
  var cleanParamsFilepathOpts = (filepath, opts, ...rest) => {
    filepath = path_default.normalize(filepath);
    if (typeof opts === "undefined" || typeof opts === "function") {
      opts = {};
    }
    if (typeof opts === "string") {
      opts = {
        encoding: opts
      };
    }
    return [filepath, opts, ...rest];
  };
  var cleanParamsFilepathDataOpts = (filepath, data, opts, ...rest) => {
    filepath = path_default.normalize(filepath);
    if (typeof opts === "undefined" || typeof opts === "function") {
      opts = {};
    }
    if (typeof opts === "string") {
      opts = {
        encoding: opts
      };
    }
    return [filepath, data, opts, ...rest];
  };
  var cleanParamsFilepathFilepath = (oldFilepath, newFilepath, ...rest) => {
    return [path_default.normalize(oldFilepath), path_default.normalize(newFilepath), ...rest];
  };
  var PromisifiedFS = class {
    constructor(name, options = {}) {
      this.init = this.init.bind(this);
      this.readFile = this._wrap(this.readFile, cleanParamsFilepathOpts, false);
      this.writeFile = this._wrap(
        this.writeFile,
        cleanParamsFilepathDataOpts,
        true
      );
      this.unlink = this._wrap(this.unlink, cleanParamsFilepathOpts, true);
      this.readdir = this._wrap(this.readdir, cleanParamsFilepathOpts, false);
      this.mkdir = this._wrap(this.mkdir, cleanParamsFilepathOpts, true);
      this.rmdir = this._wrap(this.rmdir, cleanParamsFilepathOpts, true);
      this.rename = this._wrap(this.rename, cleanParamsFilepathFilepath, true);
      this.stat = this._wrap(this.stat, cleanParamsFilepathOpts, false);
      this.lstat = this._wrap(this.lstat, cleanParamsFilepathOpts, false);
      this.readlink = this._wrap(this.readlink, cleanParamsFilepathOpts, false);
      this.symlink = this._wrap(this.symlink, cleanParamsFilepathFilepath, true);
      this.backFile = this._wrap(this.backFile, cleanParamsFilepathOpts, true);
      this.du = this._wrap(this.du, cleanParamsFilepathOpts, false);
      this._deactivationPromise = null;
      this._deactivationTimeout = null;
      this._activationPromise = null;
      this._operations = /* @__PURE__ */ new Set();
      if (name) {
        this.init(name, options);
      }
    }
    async init(...args) {
      if (this._initPromiseResolve)
        await this._initPromise;
      this._initPromise = this._init(...args);
      return this._initPromise;
    }
    async _init(name, options = {}) {
      await this._gracefulShutdown();
      if (this._activationPromise)
        await this._deactivate();
      if (this._backend && this._backend.destroy) {
        await this._backend.destroy();
      }
      this._backend = options.backend || new DefaultBackend();
      if (this._backend.init) {
        await this._backend.init(name, options);
      }
      if (this._initPromiseResolve) {
        this._initPromiseResolve();
        this._initPromiseResolve = null;
      }
      if (!options.defer) {
        this.stat("/");
      }
    }
    async _gracefulShutdown() {
      if (this._operations.size > 0) {
        this._isShuttingDown = true;
        await new Promise((resolve) => this._gracefulShutdownResolve = resolve);
        this._isShuttingDown = false;
        this._gracefulShutdownResolve = null;
      }
    }
    _wrap(fn, paramCleaner, mutating) {
      return async (...args) => {
        args = paramCleaner(...args);
        let op = {
          name: fn.name,
          args
        };
        this._operations.add(op);
        try {
          await this._activate();
          return await fn.apply(this, args);
        } finally {
          this._operations.delete(op);
          if (mutating)
            this._backend.saveSuperblock();
          if (this._operations.size === 0) {
            if (this._deactivationTimeout)
              clearTimeout(this._deactivationTimeout);
            this._deactivationTimeout = setTimeout(
              this._deactivate.bind(this),
              500
            );
          }
        }
      };
    }
    async _activate() {
      if (!this._initPromise)
        console.warn(
          new Error(
            `Attempted to use LightningFS ${this._name} before it was initialized.`
          )
        );
      await this._initPromise;
      if (this._deactivationTimeout) {
        clearTimeout(this._deactivationTimeout);
        this._deactivationTimeout = null;
      }
      if (this._deactivationPromise)
        await this._deactivationPromise;
      this._deactivationPromise = null;
      if (!this._activationPromise) {
        this._activationPromise = this._backend.activate ? this._backend.activate() : Promise.resolve();
      }
      await this._activationPromise;
    }
    async _deactivate() {
      if (this._activationPromise)
        await this._activationPromise;
      if (!this._deactivationPromise) {
        this._deactivationPromise = this._backend.deactivate ? this._backend.deactivate() : Promise.resolve();
      }
      this._activationPromise = null;
      if (this._gracefulShutdownResolve)
        this._gracefulShutdownResolve();
      return this._deactivationPromise;
    }
    async readFile(filepath, opts) {
      return this._backend.readFile(filepath, opts);
    }
    async writeFile(filepath, data, opts) {
      await this._backend.writeFile(filepath, data, opts);
      return null;
    }
    async unlink(filepath, opts) {
      await this._backend.unlink(filepath, opts);
      return null;
    }
    async readdir(filepath, opts) {
      return this._backend.readdir(filepath, opts);
    }
    async mkdir(filepath, opts) {
      await this._backend.mkdir(filepath, opts);
      return null;
    }
    async rmdir(filepath, opts) {
      await this._backend.rmdir(filepath, opts);
      return null;
    }
    async rename(oldFilepath, newFilepath) {
      await this._backend.rename(oldFilepath, newFilepath);
      return null;
    }
    async stat(filepath, opts) {
      const data = await this._backend.stat(filepath, opts);
      return new Stat_default(data);
    }
    async lstat(filepath, opts) {
      const data = await this._backend.lstat(filepath, opts);
      return new Stat_default(data);
    }
    async readlink(filepath, opts) {
      return this._backend.readlink(filepath, opts);
    }
    async symlink(target, filepath) {
      await this._backend.symlink(target, filepath);
      return null;
    }
    async backFile(filepath, opts) {
      await this._backend.backFile(filepath, opts);
      return null;
    }
    async du(filepath) {
      return this._backend.du(filepath);
    }
    async flush() {
      return this._backend.flush();
    }
  };

  // src/libs/lfs/index.js
  function wrapCallback(opts, cb) {
    if (typeof opts === "function") {
      cb = opts;
    }
    cb = functionOnce(cb);
    const resolve = (...args) => cb(null, ...args);
    return [resolve, cb];
  }
  var FS = class {
    constructor(...args) {
      this.promises = new PromisifiedFS(...args);
      this.init = this.init.bind(this);
      this.readFile = this.readFile.bind(this);
      this.writeFile = this.writeFile.bind(this);
      this.unlink = this.unlink.bind(this);
      this.readdir = this.readdir.bind(this);
      this.mkdir = this.mkdir.bind(this);
      this.rmdir = this.rmdir.bind(this);
      this.rename = this.rename.bind(this);
      this.stat = this.stat.bind(this);
      this.lstat = this.lstat.bind(this);
      this.readlink = this.readlink.bind(this);
      this.symlink = this.symlink.bind(this);
      this.backFile = this.backFile.bind(this);
      this.du = this.du.bind(this);
      this.flush = this.flush.bind(this);
    }
    init(name, options) {
      return this.promises.init(name, options);
    }
    readFile(filepath, opts, cb) {
      const [resolve, reject] = wrapCallback(opts, cb);
      this.promises.readFile(filepath, opts).then(resolve).catch(reject);
    }
    writeFile(filepath, data, opts, cb) {
      const [resolve, reject] = wrapCallback(opts, cb);
      this.promises.writeFile(filepath, data, opts).then(resolve).catch(reject);
    }
    unlink(filepath, opts, cb) {
      const [resolve, reject] = wrapCallback(opts, cb);
      this.promises.unlink(filepath, opts).then(resolve).catch(reject);
    }
    readdir(filepath, opts, cb) {
      const [resolve, reject] = wrapCallback(opts, cb);
      this.promises.readdir(filepath, opts).then(resolve).catch(reject);
    }
    mkdir(filepath, opts, cb) {
      const [resolve, reject] = wrapCallback(opts, cb);
      this.promises.mkdir(filepath, opts).then(resolve).catch(reject);
    }
    rmdir(filepath, opts, cb) {
      const [resolve, reject] = wrapCallback(opts, cb);
      this.promises.rmdir(filepath, opts).then(resolve).catch(reject);
    }
    rename(oldFilepath, newFilepath, cb) {
      const [resolve, reject] = wrapCallback(cb);
      this.promises.rename(oldFilepath, newFilepath).then(resolve).catch(reject);
    }
    stat(filepath, opts, cb) {
      const [resolve, reject] = wrapCallback(opts, cb);
      this.promises.stat(filepath).then(resolve).catch(reject);
    }
    lstat(filepath, opts, cb) {
      const [resolve, reject] = wrapCallback(opts, cb);
      this.promises.lstat(filepath).then(resolve).catch(reject);
    }
    readlink(filepath, opts, cb) {
      const [resolve, reject] = wrapCallback(opts, cb);
      this.promises.readlink(filepath).then(resolve).catch(reject);
    }
    symlink(target, filepath, cb) {
      const [resolve, reject] = wrapCallback(cb);
      this.promises.symlink(target, filepath).then(resolve).catch(reject);
    }
    backFile(filepath, opts, cb) {
      const [resolve, reject] = wrapCallback(opts, cb);
      this.promises.backFile(filepath, opts).then(resolve).catch(reject);
    }
    du(filepath, cb) {
      const [resolve, reject] = wrapCallback(cb);
      this.promises.du(filepath).then(resolve).catch(reject);
    }
    flush(cb) {
      const [resolve, reject] = wrapCallback(cb);
      this.promises.flush().then(resolve).catch(reject);
    }
  };
})();
