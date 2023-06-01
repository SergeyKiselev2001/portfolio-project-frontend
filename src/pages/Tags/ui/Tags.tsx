import { HeaderPage, withHeader } from '@shared/hocs/withHeader'
import classes from './Tags.module.scss'
import { RouterPaths } from '@app/config/router'
import { useEffect } from 'react'

const Tags = () => {
  useEffect(() => {
    HeaderPage.setCurrentPage(RouterPaths.TAGS)
  })

  return <div className={classes.Tags}>Tags</div>
}

export default withHeader(Tags)
