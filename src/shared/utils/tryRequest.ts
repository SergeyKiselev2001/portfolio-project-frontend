export const tryRequest = async <T>(callback: () => Promise<T>) => {
  try {
    await callback()
  } catch (e) {
    console.log(e)
  }
}
