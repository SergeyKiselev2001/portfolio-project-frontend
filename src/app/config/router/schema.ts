export enum RouterPaths {
  ERROR = '*',
  MAIN = '/',
  ABOUT = '/about',
  PROFILE = '/profile',
  TAGS = '/tags',
}

export enum QueryParams {
  TAGS = 'tags_like',
  LIMIT = '_limit',
  PAGE = '_page',
  ID_NE = 'id_ne',
}

export type Route = { path: RouterPaths; element: JSX.Element }
