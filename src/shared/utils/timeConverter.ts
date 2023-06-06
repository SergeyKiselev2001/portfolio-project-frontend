export enum TimeFormat {
  FORMAT_1 = 'dd.mm.yy',
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

  const day = date.getDay()
  const month = date.getMonth()
  const fullYear = date.getFullYear()

  const dayNormalized = normalize(day)
  const monthNormalized = normalize(month)

  switch (format) {
    case TimeFormat.FORMAT_1:
      return `${dayNormalized}.${monthNormalized}.${fullYear}`
  }
}
