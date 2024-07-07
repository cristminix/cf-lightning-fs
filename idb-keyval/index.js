// type string: string;

// import { Context } from "hono"

export class Store {
  static instance = null;
  static KV_STORE = null;
  static CTX = null
  static setCtx(c){
    Store.CTX=c
    if(c){
      // console.log(c.env.IDB_KEYVAL)
      Store.KV_STORE = c.env.IDB_KEYVAL
    }
  }
  static setKVStore(kvStore) {
    Store.KV_STORE = kvStore;
  }
  
  _dbp = null;
  _dbName = null;
  _storeName = null;
  constructor(dbName = "keyval-store", storeName = "keyval") {
    this._dbName = dbName;
    this._storeName = storeName;
    this._init();
  }
  getDb() {
    if(Store.KV_STORE) return Store.KV_STORE 

    return Store.CTX.env[Store.CTX.env.KV_STORE];
  }
  async keys(all=false) {
    console.log(`idb.Store.keys()`);
    const keys_ = await this.getDb().list()
    if(all)
      return keys_.keys
    const keyList = []
    // console.log(keys_)
    const base = `${this._dbName}-${this._storeName}`
    for(const key of keys_.keys){
      const {name} = key
      if(name.startsWith(base)){
        keyList.push(name)
      }
    }
    return keyList
  }
  _init() {

  }

  getRealKey(key){
    const realKey = `${this._dbName}-${this._storeName}-${key}`
    return realKey
  }
  
  async get(key){
    return await this.getDb().get(this.getRealKey(key))
  }

  async put(key,value){
    return await this.getDb().put(this.getRealKey(key),value)
  }

  async delete(key,rawKey=false){
    if(rawKey){
      return await this.getDb().delete(key)
    }
    return await this.getDb().delete(this.getRealKey(key))
  }

  async clear(){

  }
  _close() {
    console.log(`idb.Store.close()`);
    // this._init();
  }
}

let defaultStore = null;

export function setDefaultStore(store) {
  defaultStore = store;
}

function getDefaultStore() {
  if (!defaultStore) {
    console.log(`defaultStore is null`);
    
    defaultStore = new Store("default", "default-kv");

    console.log(defaultStore);
  }
  //store = new Store()
  return defaultStore;
}

export async function get(key, store = getDefaultStore()) {
  console.log(`idb.get(${key})`);
  if (!store) {
    console.log(`store is null`);
    return null;
  }
  let raw
  try{
    raw = await store.get(key);
    // console.log(raw)
  }catch(e){
    console.error(`idb.Store.get failed,key:${key}`)
  }
  if (raw === "undefined") return undefined;
  if (raw === "null") return null;
  if (raw === "true") return true;
  if (raw === "false") return false;
  let value = raw;
  try {
    const realValue = JSON.parse(raw);
    
    if(typeof realValue.type !== 'undefined' && typeof realValue.value !== 'undefined')
      value = realValue.value
    else value = realValue
  } catch (e) {
    // console.error(e);
    // value = null;
  }
  return value;
}

export async function set(key, value, store = getDefaultStore()) {
  console.log(`idb.set()`,key);
  if (!store) {
    console.log(`store is null`);
    return null;
  }
  let result
  let realValue = {
    type : typeof value,
    value:null
  }
  try{
    // console.log(typeof value,{value})
    if(ArrayBuffer.isView(value)){
      console.log(`isView:true`)
      realValue.value = Array.from(value)
     
    }else{
      realValue.value = value
    }
    
    await store.put(key, JSON.stringify(realValue));
  }catch(e){
    console.error(`idb.Store.put failed,key:${key}`)
  }
  return result
}

export async function update(key, updater, store = getDefaultStore()) {
  console.log(`idb.update(${key})`);
  if (!store) {
    console.log(`store is null`);
    return null;
  }
  let oldValue 
  try{
    oldValue = await get(key, store);
  }catch(e){
    console.error(`idb.Store.get failed,key:${key}`)
  }

  const newValue = JSON.stringify(updater(oldValue));

  let result
  try{
    result = await store.put(key, newValue);
  }catch(e){
    console.error(`idb.Store.put failed,key:${key}`)
  }
  return result
  
}

export async function del(key, store = getDefaultStore()) {
  console.log(`idb.del()`);
  let result
  try{
    result = await store.delete(key);
  }catch(e){
    console.error(`idb.Store.put failed, key:${key}`)
  }
  return result
}

export async function clear(store = getDefaultStore()) {
  console.log(`idb.clear()`);
  try {
    const keys = await store.keys()
    for (const key of keys) {
      await store.delete(key,true)
    }
  } catch (err) {
    console.error(err);
  }
}

export async function keys(store = getDefaultStore()) {
  console.log(`idb.keys()`);

  return await store.keys();
}

export function close(store = getDefaultStore()) {
  if (!store) {
    console.log(`store is null`);
    return null;
  }
  return store._close();
}