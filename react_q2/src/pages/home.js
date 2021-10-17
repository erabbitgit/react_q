import {useContext} from 'react'
import {Link} from 'react-router-dom'
import LoginAuthContext from '@/store/loginAuth-context'

const Home = () => {
  const {isAuth, loginAuth} = useContext(LoginAuthContext)
  // if(!isAuth) return loginAuth()
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  )
}

export default Home
