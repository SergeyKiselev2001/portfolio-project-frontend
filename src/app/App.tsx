import './App.css'
import { Suspense } from 'react'
import { LangSwitcher } from '@widgets/LangSwitcher'
import { RouterProvider } from 'react-router'
import { router } from './config/router/routerConfig'

const App = () => {
  return (
    <Suspense fallback="">
      <RouterProvider router={router} />
      <LangSwitcher />
    </Suspense>
  )
}

export default App
