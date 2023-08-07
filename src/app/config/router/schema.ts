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
  POST = '/post/:id',
}

export enum QueryParams {
  TAG = 'tag',
  POST_ID = 'post_id',
  LIMIT = 'limit',
  PAGE = 'page',
  ID_NE = 'id_ne',
  LOGIN = 'author',
  START = 'start',
  END = 'end',
}

export type Route = { path: RouterPaths; element: JSX.Element }
