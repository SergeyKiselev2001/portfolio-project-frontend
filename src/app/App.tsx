import './App.css'
import { Suspense } from 'react'
import { RouterProvider } from 'react-router'
import { router } from '@app/config/router'

const App = () => {
  return (
    <Suspense fallback="">
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
