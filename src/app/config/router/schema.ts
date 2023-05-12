export enum RouterPaths {
  ERROR = '*',
  ENG = '/eng',
  RU = '/ru',
  MAIN = '',
  ABOUT = '/about',
}

export type Route = { path: RouterPaths; element: JSX.Element }
