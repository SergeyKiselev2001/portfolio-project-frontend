import { HeaderPage, withHeader } from '@shared/hocs/withHeader'
import classes from './LoginPage.module.scss'
import { Login } from '@widgets/Login'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { RouterPaths } from '@app/config/router'

const LoginPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    HeaderPage.currentPage = RouterPaths.LOGIN
  }, [])

  const onLogin = (link: string) => {
    navigate(link)
  }

  return (
    <div className={classes.LoginPage}>
      <div className={classes.content_wrapper}>
        <div className={classes.content}>
          <Login onLogin={onLogin} />
        </div>
      </div>
    </div>
  )
}

export default withHeader(LoginPage)
