export const wordForm = (
  variant1: string,
  variant2: string,
  variant3: string,
  length: number
) => {
  /// example
  /// variant1 = объект, variant2 = объекта, variant3 = объектов
  /// length = 1000 -> объектов
  /// length = 142 -> объекта
  /// length = 311 -> объектов
  /// length = 301 -> объект

  const commonCheck = (length2: number) => {
    const lastNumberOfQuantity = Number(
      String(length2)[String(length2).length - 1]
    )

    if (lastNumberOfQuantity == 1 && length2) {
      return variant1
    } else if (lastNumberOfQuantity >= 2 && lastNumberOfQuantity <= 4) {
      return variant2
    } else if (lastNumberOfQuantity >= 5 || lastNumberOfQuantity == 0) {
      return variant3
    }
  }

  if (length < 10) {
    return commonCheck(length)
  } else if (String(length)[String(length).length - 2] == '1') {
    return variant3
  } else {
    return commonCheck(length)
  }
}
