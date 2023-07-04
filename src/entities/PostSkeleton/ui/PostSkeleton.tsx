import { clsx } from '@shared/utils'
import classes from './PostSkeleton.module.scss'

interface IPostSkeleton {
  isProfilePage?: boolean
}

const PostSkeleton = (props: IPostSkeleton) => {
  const { isProfilePage } = props
  return (
    <div
      className={clsx(
        { [classes.isProfilePage]: !!isProfilePage },
        classes.PostSkeleton
      )}
    >
      <div className={classes.light} />
    </div>
  )
}

export default PostSkeleton
