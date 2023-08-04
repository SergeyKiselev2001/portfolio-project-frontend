/* eslint-disable no-case-declarations */
import { wordForm } from "./wordForm"

export enum TimeFormat {
  FORMAT_1 = 'dd.mm.yy',
  FORMAT_2 = 'xxx ago',
}

export const timeConverter = (timestamp: number, format: TimeFormat) => {
  const date = new Date(timestamp)

  const normalize = (num: number) => {
    if (`${num}`.length == 1) {
      return `0${num}`
    } else {
      return num
    }
  }

  const day = date.getDate()
  const month = date.getMonth() + 1
  const fullYear = date.getFullYear()

  const dayNormalized = normalize(day)
  const monthNormalized = normalize(month)

  switch (format) {
    case TimeFormat.FORMAT_1:
      return `${dayNormalized}.${monthNormalized}.${fullYear}`

    case TimeFormat.FORMAT_2:
      const currentDate = +new Date()
      const timeDifference = (currentDate - timestamp) / 60 / 24
      const secondsAgo = Math.ceil(timeDifference)
      const minutesAgo = Math.ceil(timeDifference / 60)
      const hoursAgo = Math.ceil(timeDifference / 60 / 60)
      const daysAgo = Math.ceil(timeDifference / 60 / 60 / 24)

      if (secondsAgo <= 59) {
        return wordForm(
          `${secondsAgo} секунду`,
          `${secondsAgo} секунды`,
          `${secondsAgo} секунд`,
          secondsAgo
        )
      } else if (minutesAgo <= 59) {
        return wordForm(
          `${minutesAgo} минуту`,
          `${minutesAgo} минуты`,
          `${minutesAgo} минут`,
          minutesAgo
        )
      } else if (hoursAgo <= 23) {
        return wordForm(
          `${hoursAgo} час`,
          `${hoursAgo} часа`,
          `${hoursAgo} часов`,
          hoursAgo
        )
      } else {
        return wordForm(
          `${daysAgo} день`,
          `${daysAgo} дня`,
          `${daysAgo} дней`,
          daysAgo
        )
      }
  }
}
