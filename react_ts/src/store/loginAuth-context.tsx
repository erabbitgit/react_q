import {createContext, useState, useEffect, FC, Dispatch, SetStateAction} from "react";
import axios, {AxiosResponse} from "axios";
import {CommonApiResponse, Iuser} from "@/commonType";

interface IloginAuth {
  isLogin: boolean;
  isAuth: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  loginAuth: (token?:string) => void;
}

const LoginAuthContext = createContext<IloginAuth>(null!)

export default LoginAuthContext

export const LoginAuthProvider:FC = props => {
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
    axios.get<CommonApiResponse<Iuser>>('https://l8-upgrade-apis.herokuapp.com/api/user', {headers: {'Authorization': `Bearer ${headerToken}`}})
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