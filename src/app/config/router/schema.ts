export enum RouterPaths {
  ERROR = '*',
  MAIN = '/',
  ABOUT = '/about',
  PROFILE = '/profile',
  TAGS = '/tags',
}

export enum QueryParams {
  TAGS = 'tags_like',
}

export type Route = { path: RouterPaths; element: JSX.Element }
