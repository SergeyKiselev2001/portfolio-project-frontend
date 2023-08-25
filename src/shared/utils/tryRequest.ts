/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const tryRequest = async <T>(
  callback: () => Promise<T>,
  errorCallback?: VoidFunction,
  options?: {
    hideToast: boolean
  }
) => {
  const showToast = !options?.hideToast

  try {
    await callback()
  } catch (e) {
    switch ((e as AxiosError).response?.status) {
      case 400:
        showToast && toast.error('Bad request')
        return
      case 401:
        showToast && toast.error('Auth error')
        return
      case 404:
        showToast && toast.error(`${(e as any).response?.data.message}`)
        return
      case 422:
        showToast && toast.warn(`${(e as any).response?.data.message}`)
        return
      case 500:
        showToast && toast.error(`${(e as any).response?.data.message}`)
        return
    }

    errorCallback && errorCallback()
    console.log(e)
  }
}
