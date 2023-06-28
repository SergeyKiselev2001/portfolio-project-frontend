import { HeaderPage, withHeader } from '@shared/hocs/withHeader'
import classes from './AdminPage.module.scss'
import { useEffect } from 'react'
import { RouterPaths } from '@app/config/router'
import { me } from '@entities/me'
import { SystemRoles } from '@entities/user'
import { ErrorPage } from '@pages/ErrorPage'

const AdminPage = () => {
  useEffect(() => {
    HeaderPage.currentPage = RouterPaths.ADMIN
  }, [])

  if (me.systemRole != SystemRoles.ADMIN) {
    return <ErrorPage showHeader={false} />
  }

  return <div className={classes.AdminPage}>AdminPage</div>
}

export default withHeader(AdminPage)
