import { HeaderPage, withHeader } from '@shared/hocs/withHeader'
import { observer } from 'mobx-react-lite'
import classes from './About.module.scss'
import { RouterPaths } from '@app/config/router'
import { useEffect } from 'react'

const About = observer(() => {
  useEffect(() => {
    HeaderPage.setCurrentPage(RouterPaths.ABOUT)
  })

  return (
    <div className={classes.About} style={{ color: 'white' }}>
      heh
    </div>
  )
})

export default withHeader(About)
