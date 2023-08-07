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
    if ((e as AxiosError).response?.status == 401) {
      toast.error('Auth error')
    }

    if ((e as AxiosError).response?.status == 400) {
      toast.error('Bad request')
    }

    if ((e as AxiosError).response?.status == 500) {
      toast.error(`${(e as any).response?.data.message}`)
    }

    errorCallback && errorCallback()
    console.log(e)
  }
}
