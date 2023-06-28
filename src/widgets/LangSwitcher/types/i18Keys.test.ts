import ru_translations from '@public/locales/ru/translation.json'
import en_translations from '@public/locales/en/translation.json'
import ru_header from '@public/locales/ru/header.json'
import en_header from '@public/locales/en/header.json'
import ru_tags from '@public/locales/ru/tags.json'
import en_tags from '@public/locales/en/tags.json'
import ru_profile from '@public/locales/ru/profile.json'
import en_profile from '@public/locales/en/profile.json'
import { i18Keys, i18KeysHeader, i18KeysProfile, i18Tags } from './i18Keys'

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

  test('i18Tags', async () => {
    for (const key of Object.keys(i18Tags)) {
      expect(Object.keys(ru_tags)).toContainEqual(
        i18Tags[key as keyof typeof i18Tags]
      )

      expect(Object.keys(en_tags)).toContainEqual(
        i18Tags[key as keyof typeof i18Tags]
      )
    }
  })

  test('i18KeysProfile', async () => {
    for (const key of Object.keys(i18KeysProfile)) {
      expect(Object.keys(ru_profile)).toContainEqual(
        i18KeysProfile[key as keyof typeof i18KeysProfile]
      )

      expect(Object.keys(en_profile)).toContainEqual(
        i18KeysProfile[key as keyof typeof i18KeysProfile]
      )
    }
  })
})
