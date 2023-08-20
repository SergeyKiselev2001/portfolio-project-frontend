export enum StorageKeys {
  AUTH = 'AUTH',
  THEME = 'THEME',
  POST_CONTENT = 'POST_CONTENT',
  POST_TITLE = 'POST_TITLE',
}

export const getStorageItem = (key: StorageKeys) => {
  const session = JSON.parse(`${sessionStorage.getItem(key)}`)
  const local = JSON.parse(`${localStorage.getItem(key)}`)

  return session || local || ''
}

export const setStorageItem = (
  key: StorageKeys,
  value: unknown,
  storage?: 'local' | 'session'
) => {
  const setLocal = () => localStorage.setItem(key, JSON.stringify(value))
  const setSession = () => sessionStorage.setItem(key, JSON.stringify(value))

  if (storage == 'local') {
    setLocal()
  } else if (storage == 'session') {
    setSession()
  } else {
    setLocal()
    setSession()
  }
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
