import classes from './ErrorPage.module.scss'

interface IErrorPage {}

const ErrorPage = (props: IErrorPage) => {
  const {} = props

  return (
    <div className={classes.ErrorPage}>
      <h1>Oops! dgdfgdfgdfg</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  )
}

export default ErrorPage
