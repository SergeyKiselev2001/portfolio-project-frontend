export enum StorageKeys {
  AUTH = 'AUTH',
  HIDDEN_POSTS = 'HIDDEN_POSTS',
}

export const getStorageItem = (key: StorageKeys) => {
  const session = JSON.parse(`${sessionStorage.getItem(key)}`)
  const local = JSON.parse(`${localStorage.getItem(key)}`)

  return session || local
}

export const clearLocalStorage = () => {
  for (const key of Object.values(StorageKeys)) {
    localStorage.removeItem(key)
  }
}

export const clearSessionStorage = () => {
  for (const key of Object.values(StorageKeys)) {
    sessionStorage.removeItem(key)
  }
}
