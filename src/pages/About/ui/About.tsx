import { withHeader } from '@shared/hocs/withHeader'
import { observer } from 'mobx-react-lite'
import counter from '@app/store/counter'
import classes from './About.module.scss'

const About = observer(() => {
  return (
    <div className={classes.About} style={{ color: 'white' }}>
      about {counter.count}
      <button onClick={() => counter.increment()} style={{ color: 'white' }}>
        PLUS
      </button>
      <button onClick={() => counter.fetchData()} style={{ color: 'red' }}>
        FETCH
      </button>
    </div>
  )
})

export default withHeader(About)
