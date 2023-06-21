import { ErrorPage } from '@pages/ErrorPage'
import { createBrowserRouter } from 'react-router-dom'
import { Route, RouterPaths } from './schema'
import { MainPage } from '@pages/MainPage'
import { LoginPage } from '@pages/LoginPage'
import { About } from '@pages/About'
import { Tags } from '@pages/Tags'
import { ProfilePage } from '@pages/ProfilePage'

export const listOfRoutes: Route[] = [
  {
    path: RouterPaths.ERROR,
    element: <ErrorPage />,
  },
  {
    path: RouterPaths.MAIN,
    element: <MainPage />,
  },
  {
    path: RouterPaths.ABOUT,
    element: <About />,
  },
  {
    path: RouterPaths.LOGIN,
    element: <LoginPage />,
  },
  {
    path: RouterPaths.TAGS,
    element: <Tags />,
  },
  {
    path: RouterPaths.USER,
    element: <ProfilePage />,
  },
  {
    path: RouterPaths.SUBSCRIPTIONS,
    element: <h1>SUBSCRIPTIONS</h1>,
  },
]

export const router = createBrowserRouter(listOfRoutes)
