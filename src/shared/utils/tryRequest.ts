/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const tryRequest = async <T>(
  callback: () => Promise<T>,
  errorCallback?: VoidFunction
) => {
  try {
    await callback()
  } catch (e) {
    switch ((e as AxiosError).response?.status) {
      case 400:
        toast.error('Bad request')
        return
      case 401:
        toast.error('Auth error')
        return
      case 422:
        toast.warn(`${(e as any).response?.data.message}`)
        return
      case 500:
        toast.error(`${(e as any).response?.data.message}`)
        return
    }

    errorCallback && errorCallback()
    console.log(e)
  }
}
