import classes from './PostEditor.module.scss'

interface ITextEditor {
  id: number
  text: string
  changeText: (key: number, newValue: string) => void
  removeBlock: (key: number) => void
}

const TextEditor = (props: ITextEditor) => {
  const { changeText, removeBlock, id, text } = props

  const onChangeHandle = (e: InputChange) => {
    changeText(id, e.target.value)
  }

  const removeBlockHandle = () => {
    removeBlock(id)
  }

  return (
    <div className={classes.TextEditor}>
      <span className={classes.paragraph}>Блок текста</span>
      <div className={classes.block}>
        <textarea
          className={classes.textarea}
          value={text}
          onChange={onChangeHandle}
        />
        <button className={classes.removeBlock} onClick={removeBlockHandle} />
      </div>
    </div>
  )
}

export default TextEditor
