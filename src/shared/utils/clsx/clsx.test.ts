import { clsx } from '.'

describe('@shared/utils/clsx', () => {
  test('Добавление классов по условию', () => {
    expect(clsx({ class1: true, class2: false })).toBe('class1')
    expect(clsx({ class1: false, class2: true })).toBe('class2')
    expect(clsx({ class1: true, class2: true })).toBe('class1 class2')
    expect(clsx({ class1: false, class2: false })).toBe('')
  })

  test('Добавление массива классов', () => {
    expect(clsx({}, ['class1', 'class2'])).toBe('class1 class2')
  })

  test('Произвольный порядок аргументов', () => {
    expect(clsx('class1', { class2: true }, ['class3'])).toBe(
      'class1 class2 class3'
    )

    expect(clsx({ class1: true }, { class2: true }, { class3: true })).toBe(
      'class1 class2 class3'
    )
  })

  test('Пустые классы', () => {
    expect(clsx('', {}, [])).toBe('')
  })
})
