import { admin } from '@entities/admin'
import { useEffect, useState } from 'react'
import classes from './AdminPage.module.scss'
import { observer } from 'mobx-react-lite'
import { IReportsAdminPage } from '@entities/admin/schema'

const ReportsTab = observer(() => {
  useEffect(() => {
    admin.loadReports()
  }, [])

  useEffect(() => {
    setCurrentReports(admin.reportsList)
  }, [admin.reportsList])

  const [currentReports, setCurrentReports] = useState(
    [] as IReportsAdminPage[]
  )

  const deleteReportHandle = (report_id: number) => {
    admin.deleteReport(report_id)
  } 

  return (
    <div className={classes.ReportsTab}>
      <div className={classes.report}>
        <span />
        <span>ID</span>
        <span>Login</span>
        <span>Post Title</span>
      </div>
      {currentReports?.map(({ id, post_id, post_title, user_login }) => (
        <div key={id} className={classes.report}>
          <button onClick={() => deleteReportHandle(id)}>delete</button>
          <span>{id}</span>
          <a href={`/@${user_login}`} rel="noreferrer" target="_blank">
            {user_login}
          </a>
          <a
            className={classes.title}
            href={`/post/${post_id}`}
            rel="noreferrer"
            target="_blank"
          >
            {post_title}
          </a>
        </div>
      ))}
    </div>
  )
})

export default ReportsTab
