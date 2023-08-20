import { IUserAdminPage, admin } from '@entities/admin'
import { useEffect, useState } from 'react'
import classes from './AdminPage.module.scss'
import { observer } from 'mobx-react-lite'
import { clsx } from '@shared/utils'

const UsersTab = observer(() => {
  useEffect(() => {
    admin.loadUsers()
  }, [])

  useEffect(() => {
    setCurrentUsers(admin.usersList)
  }, [admin.usersList])

  const [currentUsers, setCurrentUsers] = useState([] as IUserAdminPage[])

  return (
    <div className={classes.UsersTab}>
      <div className={classes.user}>
        <span>ID</span>
        <span>Login</span>
        <span>System Role</span>
      </div>
      {currentUsers?.map(({ id, avatar, login, systemRole }) => (
        <div key={id} className={clsx(classes.user, classes[systemRole])}>
          <span>{id}</span>
          <a href={`/@${login}`} rel="noreferrer" target="_blank">
            {login}
          </a>
          <span>{systemRole}</span>
          <div className={classes.image}>
            <img src={avatar.src} alt="" />
          </div>
        </div>
      ))}
    </div>
  )
})

export default UsersTab
