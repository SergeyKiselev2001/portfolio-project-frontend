export const tryRequest = async <T>(
  callback: () => Promise<T>,
  errorCallback?: VoidFunction
) => {
  try {
    await callback()
  } catch (e) {
    errorCallback && errorCallback()
    console.log(e)
  }
}
