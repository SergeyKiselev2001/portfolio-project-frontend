import classes from './Tags.module.scss'

interface IOneTagSkeleton {
  isLogged: boolean
}

const OneTagSkeleton = ({ isLogged }: IOneTagSkeleton) => {
  return (
    <div
      className={`${classes.OneTagSkeleton} ${isLogged ? classes.logged : ''}`}
    >
      <div className={classes.light} />
    </div>
  )
}

export default OneTagSkeleton
