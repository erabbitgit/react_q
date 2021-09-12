import { lazy } from 'react'
import { Switch, Route } from "react-router-dom";

const routes = [
  {
    path: "/login",
    component: lazy(() => import(/* webpackChunkName: "login" */ '@/pages/login')),
  },
  {
    path: "/register",
    component: lazy(() => import(/* webpackChunkName: "register" */ '@/pages/register')),
  },
  {
    path: "/home",
    component: lazy(() => import(/* webpackChunkName: "home" */ '@/pages/home')),
  },
  {
    path: "/news",
    component: lazy(() => import(/* webpackChunkName: "news" */ '@/pages/news')),
  },
  {
    path: "*",
    component: lazy(() => import(/* webpackChunkName: "errorPage" */ '@/pages/errorPage')),
  },
]

const Routers = () => {
  return (
    <>
      <Switch>
        {routes.map(({path, component}, index) =>
          <Route
            key={index}
            path={path}
            component={component}
          />
        )}
      </Switch>
    </>
  )
}

export default Routers;
