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
  TAGS = 'tags_like',
  POST_ID = 'post_id',
  LIMIT = '_limit',
  PAGE = '_page',
  ID_NE = 'id_ne',
  LOGIN = 'author.name',
  START = '_start',
  END = '_end',
}

export type Route = { path: RouterPaths; element: JSX.Element }
