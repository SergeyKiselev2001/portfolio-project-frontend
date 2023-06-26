import { HeaderPage } from '@shared/hocs/withHeader'
import { useEffect, FC } from 'react'
import classes from './ErrorPage.module.scss'
import { Header } from '@widgets/Header'

const ErrorPage: FC = () => {
  useEffect(() => {
    HeaderPage.setCurrentPage('')
  })

  return (
    <>
      <Header />
      <div className={classes.ErrorPage}>
        <h1>Oops! dgdfgdfgdfg</h1>
        <p>Sorry, an unexpected error has occurred.</p>
      </div>
    </>
  )
}

export default ErrorPage
