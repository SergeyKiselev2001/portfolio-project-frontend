export enum RouterPaths {
  ERROR = '*',
  MAIN = '/',
  ABOUT = '/about',
  PROFILE = '/profile',
}

export type Route = { path: RouterPaths; element: JSX.Element }
