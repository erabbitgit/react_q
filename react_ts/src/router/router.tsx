import {lazy, useContext} from 'react'
import {Switch, Route, Redirect} from "react-router-dom";
import Layout from '@/components/layout'
import LoginAuthContext from '@/store/loginAuth-context'

const Login = lazy(() => import(/* webpackChunkName: "login" */ '@/pages/login'))
const Register = lazy(() => import(/* webpackChunkName: "register" */ '@/pages/register'))
const ErrorPage = lazy(() => import(/* webpackChunkName: "errorPage" */ '@/pages/errorPage'))
const Home = lazy(() => import(/* webpackChunkName: "home" */ '@/pages/home'))
const Profile = lazy(() => import(/* webpackChunkName: "profile" */ '@/pages/profile'))
const Member = lazy(() => import(/* webpackChunkName: "member" */ '@/pages/member'))

const Routers = () => {
  const {isAuth} = useContext(LoginAuthContext)
  console.log('isAuth:', isAuth);
  return (
    <>
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        {localStorage.getItem('token') ?
          (
            <Route path='/home'>
              <Layout>
                <Home />
              </Layout>
            </Route>
          ) :
          <Redirect to='/login'/>
        }
        <Layout>
          <Route path="/account/profile-setting" component={Profile} />
          <Route path="/user" component={Member} />
        </Layout>
        <Route path='*' component={ErrorPage}/>
      </Switch>
    </>
  )
}

export default Routers;
