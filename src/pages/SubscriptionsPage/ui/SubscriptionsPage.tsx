import { HeaderPage, withHeader } from '@shared/hocs/withHeader'
import classes from './SubscriptionsPage.module.scss'
import { RouterPaths } from '@app/config/router'
import { useEffect } from 'react'

const SubscriptionsPage = () => {
  useEffect(() => {
    HeaderPage.currentPage = RouterPaths.SUBSCRIPTIONS
  }, [])

  return <div className={classes.SubscriptionsPage}>SubscriptionsPage</div>
}

export default withHeader(SubscriptionsPage)
