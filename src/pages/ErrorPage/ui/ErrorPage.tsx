import { HeaderPage } from '@shared/hocs/withHeader'
import { useEffect } from 'react'
import classes from './ErrorPage.module.scss'

const ErrorPage = () => {
  useEffect(() => {
    HeaderPage.setCurrentPage('')
  })

  return (
    <div className={classes.ErrorPage}>
      <h1>Oops! dgdfgdfgdfg</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  )
}

export default ErrorPage
