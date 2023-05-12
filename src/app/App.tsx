import { MainPage } from '@pages/MainPage'
import './App.css'
import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import LangSwitcher from '@widgets/LangSwitcher/ui/LangSwitcher'
import Header from '@widgets/Header/ui/Header'
import { RouterProvider } from 'react-router'
import { router } from './config/router/routerConfig'

function MyComponent() {
  const { t } = useTranslation()

  return <h1>{t('title')}</h1>
}

const App = () => {
  return (
    <Suspense fallback="">
      <Header />
      <RouterProvider router={router} />
      <LangSwitcher />
      <MyComponent />
      <MainPage />
    </Suspense>
  )
}

export default App
