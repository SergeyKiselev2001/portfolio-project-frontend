import classes from './PostEditor.module.scss'

interface IQuotesEditor {
  id: number
  text: string
  changeQuotes: (key: number, newValue: string) => void
  removeBlock: (key: number) => void
}

const QuotesEditor = (props: IQuotesEditor) => {
  const { changeQuotes, removeBlock, id, text } = props

  const onChangeHandle = (e: InputChange) => {
    changeQuotes(id, e.target.value)
  }

  const removeBlockHandle = () => {
    removeBlock(id)
  }

  return (
    <div className={classes.QuotesEditor}>
      <span className={classes.quote}>Цитата</span>
      <div className={classes.block}>
        <input
          className={classes.input}
          type="text"
          value={text}
          onChange={onChangeHandle}
        />
        <button className={classes.removeBlock} onClick={removeBlockHandle} />
      </div>
    </div>
  )
}

export default QuotesEditor
