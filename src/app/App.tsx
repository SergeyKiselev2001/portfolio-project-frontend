import { MainPage } from '@pages/MainPage'
import './App.css'
import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { t, i18n } = useTranslation()

  return <h1>{t('Welcome to React')}</h1>
}

const App = () => {
  return (
    <Suspense fallback="">
      <MyComponent />
      <MainPage />
    </Suspense>
  )
}

export default App
