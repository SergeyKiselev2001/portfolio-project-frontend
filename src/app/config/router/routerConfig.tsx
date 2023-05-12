import { ErrorPage } from '@pages/ErrorPage'
import { createBrowserRouter } from 'react-router-dom'
import { Route, RouterPaths } from './schema'
import App from '@app/App'

export const listOfRoutes: Route[] = [
  {
    path: RouterPaths.ERROR,
    element: <ErrorPage />,
  },
  {
    path: RouterPaths.ENG,
    element: <App />,
  },
  {
    path: RouterPaths.RU,
    element: <App />,
  },
]

export const router = createBrowserRouter(listOfRoutes)
