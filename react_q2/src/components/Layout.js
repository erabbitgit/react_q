import Header from './layout/Header'
import Navigation from './layout/Navigation'

const Layout = (props) => {
  return (
    <div>
      <Header />
      <Navigation />
      {props.children}
    </div>
  )
}

export default Layout
