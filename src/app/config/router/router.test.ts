import { listOfRoutes } from './routerConfig'
import { RouterPaths } from './schema'

describe('@app/config/router', () => {
  test('Список роутов', () => {
    for (const key of Object.keys(RouterPaths)) {
      expect(listOfRoutes.map(({ path }) => path)).toContainEqual(
        RouterPaths[key as keyof typeof RouterPaths]
      )
    }
  })
})
