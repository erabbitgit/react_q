import {createContext, useState, useEffect} from "react";
import axios from "axios";

const LoginAuthContext = createContext({
  /* just for IDE know initial state */
  isLogin: false,
  isAuth: false,
  loginAuth: () => {},
})

export default LoginAuthContext

export const LoginAuthProvider = props => {
  const [isLogin, setIsLogin] = useState(false)
  const [isAuth, setIsAuth] = useState(false)

  const loginAuth = (token = '') => {
    let headerToken;
    if (token === '') {
      headerToken = localStorage.getItem('token')
    } else {
      localStorage.setItem('token', token)
      headerToken = token;
    }
    axios.get('https://l8-upgrade-apis.vercel.app/api/user', {headers: {'Authorization': `Bearer ${headerToken}`}})
      .then(res => {
        if (res.data.success) {
          setIsAuth(true)
        }
      }).catch((error) => {
      console.log(error.response, '---------LoginAuth Fail')
    })
  }

  const contextValue = {
    isLogin,
    setIsLogin,
    isAuth,
    loginAuth,
  }

  return (
    <LoginAuthContext.Provider
      value={contextValue}
    >
      {props.children}
    </LoginAuthContext.Provider>
  )
}