import classes from './Spinner.module.scss'

interface ISpinner {
  size?: number
}

const Spinner = (props: ISpinner) => {
  const { size } = props

  return <div className={classes.Spinner}>Подождите...</div>
}

export default Spinner
