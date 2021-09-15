import InputItem from '@/components/InputItem'
import { useState, useContext } from 'react'
import ReactDOM from "react-dom";
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import Toast from "@/components/Toast";
import LoginAuthContext from '@/store/loginAuth-context'

const Login = () => {
  const { isAuth, setIsLogin, setToken, loginAuth, localStorageToken } = useContext(LoginAuthContext)
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [formTouch, setFormTouch] = useState(false)
  const [alert, setAlert] = useState({})
  const history = useHistory()
  let accountIsValid
  let passwordIsValid

  const accountInput = (value) => {
    setAccount(value);
  }

  const passwordInput = (value) => {
    setPassword(value);
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setFormTouch(true)
    if (accountIsValid && passwordIsValid) {
      let params = {
        username: account,
        password: password
      }
      try {
        const res = await axios.post('https://l8-upgrade-apis.vercel.app/api/login', params)
        if (res.data.success) {
          setIsLogin(true)
          loginAuth(res.data.token)
          isAuth ? history.push('/home') : history.push('/login')
        }
      } catch (error) {
        setAlert({show: true, msg: error.response.data.message, type: 'error'})
      }
    }
  }

  const accountVerify = (value) => {
    let obj = {
      status: true,
      message: ''
    }
    if (value.trim() !== '' && value.includes('@')) {
      accountIsValid = true
      return obj
    } else {
      obj.status = false
      obj.message = '請輸入帳號'
      return obj
    }
  }

  const passwordVerify = (value) => {
    let obj = {
      status: true,
      message: ''
    }
    if (value.trim() !== '' && value.trim().length > 3) {
      passwordIsValid = true
      return obj
    } else {
      obj.status = false
      obj.message = '請輸入密碼'
      return obj
    }
  }

  return (
    <>
      {alert.show && ReactDOM.createPortal(<Toast type={alert.type} message={alert.msg}/>, document.getElementById('modal-root'))}
      <div className="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto my-10 shadow-md">
        <div className="py-8 px-8 rounded-xl flex flex-col">
          <h1 className="font-medium text-2xl mt-3 text-center">登入</h1>
          <form action="" className="mt-6">
            <InputItem
              label='帳號'
              type='text'
              change={accountInput}
              placeholder='請輸入帳號'
              valid={accountVerify(account)}
              isTouched={formTouch}
              required
            />
            <InputItem
              label='密碼'
              type='password'
              change={passwordInput}
              placeholder='請輸入密碼'
              valid={passwordVerify(password)}
              isTouched={formTouch}
              visible
              required
            />
            <Link
              className="block text-center text-blue-600 p-3 duration-300 rounded-sm  hover:text-blue-300 w-3/12 m-auto"
              to='/register'>註冊
            </Link>
            <button
              className="block text-center text-white bg-blue-700 p-1 duration-300 rounded-md hover:bg-blue-500 w-1/5 m-auto"
              onClick={onSubmit}>登入
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
