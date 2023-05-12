import { ErrorPage } from '@pages/ErrorPage'
import { createBrowserRouter } from 'react-router-dom'
import { Route, RouterPaths } from './schema'
import { About } from '@pages/About'

export const listOfRoutes: Route[] = [
  {
    path: RouterPaths.ERROR,
    element: <ErrorPage />,
  },
  {
    path: RouterPaths.MAIN,
    element: <About />,
  },
  {
    path: RouterPaths.ENG,
    element: <About />,
  },
  {
    path: RouterPaths.RU,
    element: <About />,
  },
  {
    path: RouterPaths.ABOUT,
    element: <About />,
  },
]

export const router = createBrowserRouter(listOfRoutes)
