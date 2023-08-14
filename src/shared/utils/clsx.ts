import { toast } from 'react-toastify'

interface IConditionCLasses {
  [className: string]: boolean
}

export const clsx = (
  conditionCLasses: IConditionCLasses,
  commonClasses?: string[] | string
) => {
  let result = Array.isArray(commonClasses)
    ? commonClasses.join(' ')
    : commonClasses || ''

  Object.entries(conditionCLasses).forEach(([key, value]) => {
    if (!value) return

    if (key != 'undefined') {
      result = `${result} ${key}`
    } else {
      toast.error('Вы не описали класс в файле стилей')
    }
  })

  return result
}
