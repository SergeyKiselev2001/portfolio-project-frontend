import { IUserState } from '@entities/user'
import classes from './ProfileInfo.module.scss'
import { me } from '@entities/me'
import { LangSwitcher } from '@widgets/LangSwitcher'
import { ThemeSwitcher } from '@widgets/ThemeSwitcher'

interface IProfileInfo {
  user: IUserState
}

const ProfileInfo = ({ user }: IProfileInfo) => {
  const { login, status, avatar, systemRole } = user

  const isMe = me.login == login

  return (
    <div className={classes.ProfileInfo}>
      <div className={classes.header}>
        <img className={classes.avatar} src={avatar?.src} alt={avatar?.alt} />
        <div className={classes.texts}>
          <h3 className={classes.name}>{login}</h3>
          <span className={classes.status}>🔥 {status} 🔥</span>
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.stats}>
          <span>Дата регистрации: 20.12.2023</span>
          <span>Роль: {systemRole}</span>
        </div>
        {isMe && (
          <div className={classes.settings}>
            <LangSwitcher />
            <ThemeSwitcher />
            <span>Дата регистрации: 20.12.2023</span>
            <span>Роль: Пользователь</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileInfo
