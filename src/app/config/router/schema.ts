export enum RouterPaths {
  ERROR = '*',
  MAIN = '/',
  ABOUT = '/about',
  LOGIN = '/login',
  TAGS = '/tags',
  ADMIN = '/admin',
  USER = ':user',
  SUBSCRIPTIONS = '/subscriptions',
  CREATE_POST = '/create_post',
}

export enum QueryParams {
  TAGS = 'tags_like',
  LIMIT = '_limit',
  PAGE = '_page',
  ID_NE = 'id_ne',
  LOGIN = 'q',
}

export type Route = { path: RouterPaths; element: JSX.Element }
