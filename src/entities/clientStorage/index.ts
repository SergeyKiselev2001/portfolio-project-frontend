export enum StorageKeys {
  AUTH = 'AUTH',
  HIDDEN_POSTS = 'HIDDEN_POSTS',
}

export const getStorageItem = (key: StorageKeys) => {
  const session = JSON.parse(`${sessionStorage.getItem(key)}`)
  const local = JSON.parse(`${localStorage.getItem(key)}`)

  return session || local
}
