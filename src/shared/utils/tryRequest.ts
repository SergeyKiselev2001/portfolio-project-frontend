import { toast } from 'react-toastify'

export const tryRequest = async <T>(
  callback: () => Promise<T>,
  errorCallback?: VoidFunction
) => {
  try {
    await callback()
  } catch (e) {
    if ((e as { response?: { status: number } }).response?.status == 401) {
      toast.error('AUTH ERROR')
    }

    errorCallback && errorCallback()
    console.log(e)
  }
}
