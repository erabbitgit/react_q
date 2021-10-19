import Header from './Header'
import Navigation from './Navigation'
import {FC} from "react";

const Layout:FC = (props) => {
  return (
    <>
      <Header/>
      <div className={'flex'}>
        <Navigation/>
        <div className={'w-4/5'}>{props.children}</div>
      </div>
    </>
  )
}

export default Layout
