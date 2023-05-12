export enum RouterPaths {
  ERROR = '*',
  ENG = '/eng',
  RU = '/ru',
}

export type Route = { path: RouterPaths; element: JSX.Element }
