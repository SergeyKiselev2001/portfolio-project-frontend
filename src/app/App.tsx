import './App.css'
import { Suspense } from 'react'
import { LangSwitcher } from '@widgets/LangSwitcher'
import { RouterProvider } from 'react-router'
import { router } from '@app/config/router'

const App = () => {
  return (
    <Suspense fallback="">
      <RouterProvider router={router} />
      <LangSwitcher />
    </Suspense>
  )
}

export default App
