import { Switch, Route, Link } from "react-router-dom";
import Login from '../pages/login'
import Register from '../pages/register'
import Home from '../pages/home'
import News from '../pages/news'
import Error from '../pages/errorPage'

const routes = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/news",
    component: News
  },
  {
    path: "*",
    component: Error
  },
]

const Routers = () => {
  return(
    <>
      <Switch>
        {routes.map((route, i) =>
          <Route
            key={i}
            path={route.path}
            render={props => (
              <route.component {...props} routes={route.routes} />
            )}
          />
        )}
      </Switch>
    </>
  )
}

export default Routers;
