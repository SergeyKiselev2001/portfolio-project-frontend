import { createBrowserRouter } from 'react-router-dom'
import App from '../../App'
import ErrorPage from './ErrorPage';

enum Paths {
    ERROR = '*',
    ENG = '/eng',
    RU = '/ru'
}

type Route = { path: Paths; element: any, errorElement?: any }

const listOfRoutes: Route[] = [
  {
    path: Paths.ERROR,
    element: <ErrorPage />,
  },
  {
    path: Paths.ENG,
    element: <App />,
  },
  {
    path: Paths.RU,
    element: <App />,
  },
]

export const router = createBrowserRouter(listOfRoutes)
