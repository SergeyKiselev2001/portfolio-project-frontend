export enum StorageKeys {
  AUTH = 'AUTH',
}

export const getStorageItem = (key: StorageKeys) => {
  const session = sessionStorage.getItem(key)
  const local = localStorage.getItem(key)

  return session || local
}
