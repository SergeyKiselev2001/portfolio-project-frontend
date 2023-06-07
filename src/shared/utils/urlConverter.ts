import { QueryParamsObj } from '@entities/Post'

export const urlConverter = (
  base: string,
  params: QueryParamsObj[]
): string => {
  let result = `${base}?`

  params = params.filter((el) => el[1] != null)

  for (const value of params) {
    result = `${result}&${value[0]}=${value[1]}`
  }

  return result.replace('&', '')
}
