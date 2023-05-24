import ru_translations from '@public/locales/ru/translation.json'
import en_translations from '@public/locales/en/translation.json'
import ru_header from '@public/locales/ru/header.json'
import en_header from '@public/locales/en/header.json'
import { i18Keys, i18KeysHeader } from './i18Keys'

describe('@widgets/LangSwitcher', () => {
  test('i18Keys', async () => {
    for (const key of Object.keys(i18Keys)) {
      expect(Object.keys(ru_translations)).toContainEqual(
        i18Keys[key as keyof typeof i18Keys]
      )

      expect(Object.keys(en_translations)).toContainEqual(
        i18Keys[key as keyof typeof i18Keys]
      )
    }
  })

  test('i18KeysHeader', async () => {
    for (const key of Object.keys(i18KeysHeader)) {
      expect(Object.keys(ru_header)).toContainEqual(
        i18KeysHeader[key as keyof typeof i18KeysHeader]
      )

      expect(Object.keys(en_header)).toContainEqual(
        i18KeysHeader[key as keyof typeof i18KeysHeader]
      )
    }
  })
})
