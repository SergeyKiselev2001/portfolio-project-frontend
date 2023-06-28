import { HeaderPage } from '@shared/hocs/withHeader'
import { useEffect, FC } from 'react'
import classes from './ErrorPage.module.scss'
import { Header } from '@widgets/Header'

interface IErrorPage {
  showHeader?: boolean
  message?: string
}

const ErrorPage: FC<IErrorPage> = ({ showHeader = false, message }) => {
  useEffect(() => {
    HeaderPage.setCurrentPage('')
  })

  return (
    <>
      {showHeader && <Header />}

      <div className={classes.ErrorPage}>
        <h1 className={classes.message}>{message || 'Страница не найдена'}</h1>
      </div>
    </>
  )
}

export default ErrorPage
