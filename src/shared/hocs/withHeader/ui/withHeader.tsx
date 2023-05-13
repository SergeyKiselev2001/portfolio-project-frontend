import { Header } from '@widgets/Header'

const withHeader = (Children: () => JSX.Element) => {
  const newComponent = () => {
    return (
      <>
        <Header />
        <Children />
      </>
    )
  }

  return newComponent
}

export default withHeader
