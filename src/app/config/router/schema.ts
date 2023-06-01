export enum RouterPaths {
  ERROR = '*',
  MAIN = '/',
  ABOUT = '/about',
  PROFILE = '/profile',
  TAGS = '/tags',
}

export type Route = { path: RouterPaths; element: JSX.Element }
