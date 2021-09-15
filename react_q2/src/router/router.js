import {lazy, useContext} from 'react'
import {Switch, Route, Redirect} from "react-router-dom";
import Layout from '@/components/Layout'
import LoginAuthContext from '@/store/loginAuth-context'

const Login = lazy(() => import(/* webpackChunkName: "login" */ '@/pages/login'))
const Register = lazy(() => import(/* webpackChunkName: "register" */ '@/pages/register'))
const ErrorPage = lazy(() => import(/* webpackChunkName: "errorPage" */ '@/pages/errorPage'))
const Home = lazy(() => import(/* webpackChunkName: "home" */ '@/pages/home'))
const News = lazy(() => import(/* webpackChunkName: "news" */ '@/pages/news'))

const routes = [
  // {
  //   path: "/login",
  //   pathName: 'login',
  //   component: Login,
  // },
  // {
  //   path: "/register",
  //   pathName: 'register',
  //   component: Register,
  // },
  {
    path: "/home",
    pathName: 'home',
    component: Home,
  },
  {
    path: "/news",
    pathName: 'news',
    component: News,
  },
  // {
  //   path: "*",
  //   pathName: '404',
  //   component: ErrorPage,
  // },
]

const Routers = () => {
  const { isAuth } = useContext(LoginAuthContext)
  console.log('isAuth:',isAuth);
  return (
    <>
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        {routes.map(({path, pathName, component}, index) => {
          return (  localStorage.getItem('token') ?
              <Layout key={pathName}>
                <Route
                  path={path}
                  component={component}
                />
              </Layout> :
              <Redirect to='/login' key={pathName}/>
          )
        })}
        <Route path='*' component={ErrorPage}/>
      </Switch>
    </>
  )
}

export default Routers;
