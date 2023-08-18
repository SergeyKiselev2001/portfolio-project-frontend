import { toast } from 'react-toastify'

interface IConditionCLasses {
  [className: string]: boolean
}

export const clsx = <X, Y>(...args: X[] | Y[]) => {
  let result = ''

  for (const arg of args) {
    if (typeof arg == 'object' && !Array.isArray(arg)) {
      Object.entries(arg as IConditionCLasses).forEach(([key, value]) => {
        if (!value) return

        if (key != 'undefined') {
          result = `${result} ${key}`
        } else {
          toast.error('Вы не описали класс в файле стилей')
        }
      })
    } else if (typeof arg == 'string') {
      result += ` ${arg}`
    } else if (Array.isArray(arg)) {
      result += ` ${(arg as string[]).join(' ')}`
    }
  }

  return result.trim()
}
