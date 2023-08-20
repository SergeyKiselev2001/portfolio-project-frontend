import { HeaderPage, withHeader } from '@shared/hocs/withHeader'
import classes from './AdminPage.module.scss'
import { useEffect, useState } from 'react'
import { RouterPaths } from '@app/config/router'
import { me } from '@entities/me'
import { SystemRoles } from '@entities/user'
import { ErrorPage } from '@pages/ErrorPage'
import { clsx } from '@shared/utils'
import { observer } from 'mobx-react-lite'
import UsersTab from './UsersTab'
import ReportsTab from './ReportsTab'

const AdminPage = observer(() => {
  enum Tab {
    DASHBOARD,
    USERS,
    REPORTS,
  }

  const [activeTab, setActiveTab] = useState(Tab.DASHBOARD)

  useEffect(() => {
    HeaderPage.currentPage = RouterPaths.ADMIN
  }, [me.isDataLoaded])

  return (
    <>
      {me.systemRole != SystemRoles.ADMIN ? (
        <ErrorPage showHeader={false} />
      ) : (
        <div
          className={clsx(classes.AdminPage, {
            [classes.pending]: !me.isDataLoaded,
          })}
        >
          <div className={classes.sidebar}>
            <button
              onClick={() => {
                setActiveTab(Tab.DASHBOARD)
              }}
              className={clsx({ [classes.active]: activeTab == Tab.DASHBOARD })}
            >
              Дашбоард
            </button>
            <button
              onClick={() => {
                setActiveTab(Tab.USERS)
              }}
              className={clsx({ [classes.active]: activeTab == Tab.USERS })}
            >
              Пользователи
            </button>
            <button
              onClick={() => {
                setActiveTab(Tab.REPORTS)
              }}
              className={clsx({ [classes.active]: activeTab == Tab.REPORTS })}
            >
              Жалобы
            </button>
          </div>
          <div className={classes.content}>
            {activeTab == Tab.USERS && <UsersTab />}
            {activeTab == Tab.REPORTS && <ReportsTab />}
          </div>
        </div>
      )}
    </>
  )
})

export default withHeader(AdminPage)
