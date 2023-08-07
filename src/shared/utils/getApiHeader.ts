import { StorageKeys, getStorageItem } from '@entities/clientStorage'

export const getApiHeader = () => {
  const token = getStorageItem(StorageKeys.AUTH)

  return {
    headers: {
      Authorization: `Bearer ${token?.token}`,
    },
  }
}
