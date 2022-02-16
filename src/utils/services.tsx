import {openDB, deleteDB, wrap, unwrap, DBSchema} from 'idb'
import {cloneDeep, isEmpty} from 'lodash'

const DB_NAME = 'HEROES_TD_DB1'
const STORE_NAME = 'store'
const version = 1
const KEY_PATH = {keyPath: 'id'}
export async function getDB() {
  const db = await openDB(DB_NAME, version, {
    upgrade(database) {
      database.createObjectStore(STORE_NAME)
    },
  })
  return db
}

export async function get(key: string) {
  return (await getDB()).get(STORE_NAME, key)
}
export async function set(key: string, value: any) {
  const db = await getDB()
  const tx = db.transaction(STORE_NAME, 'readwrite')
  const store = await tx.objectStore(STORE_NAME)
  const val = await store.put(value, key)
  await tx.done
  return val
}
export async function del(key: string) {
  try {
    return (await getDB()).delete(STORE_NAME, key)
  } catch {
    return false
  }
}
export async function clear() {
  return (await getDB()).clear(STORE_NAME)
}
export async function keys() {
  return (await getDB()).getAllKeys(STORE_NAME)
}
