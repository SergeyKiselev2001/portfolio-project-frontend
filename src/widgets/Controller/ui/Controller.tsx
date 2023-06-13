import classes from './Controller.module.scss'
import Options from './Options'
import gearImg from './images/gear.png'
import { useEffect, useState } from 'react'

const Controller = () => {
  const [showOptions, setShowOptions] = useState(false)

  const toggleOptions = () => {
    setShowOptions((prev) => !prev)
    body.removeEventListener('click', toggleOptions)
  }

  const body = document.getElementsByTagName('body')[0]

  useEffect(() => {
    if (showOptions) {
      setTimeout(() => body.addEventListener('click', toggleOptions), 100)
    }
  }, [showOptions])

  return (
    <>
      <div onClick={toggleOptions} className={classes.Controller}>
        <img src={gearImg} alt="gear" />
      </div>
      {showOptions && <Options />}
    </>
  )
}

export default Controller
