import { ErrorPage } from '@pages/ErrorPage'
import { createBrowserRouter } from 'react-router-dom'
import { Route, RouterPaths } from './schema'
import { MainPage } from '@pages/MainPage'
import { Profile } from '@pages/Profile'
import { About } from '@pages/About'

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
    path: RouterPaths.PROFILE,
    element: <Profile />,
  },
]

export const router = createBrowserRouter(listOfRoutes)
