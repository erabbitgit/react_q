import {MouseEvent, useState} from 'react'
import {useHistory, Link} from 'react-router-dom'
import axios from 'axios'
import InputItem from '@/components/InputItem'
import Toast from '@/components/Toast'
import ReactDOM from "react-dom";
import {CommonApiResponse, Ialert} from "@/commonType";

const Register = () => {
  const [account, setAccount] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  const [formTouch, setFormTouch] = useState(false)
  const [alert, setAlert] = useState<Ialert>({} as Ialert)
  const history = useHistory()
  let accountIsValid:boolean | undefined;
  let passwordIsValid:boolean | undefined;
  let checkPasswordIsValid:boolean | undefined;

  const accountInput = (value:string) => {
    setAccount(value)
  }

  const userNameInput = (value:string) => {
    setUserName(value)
  }

  const passwordInput = (value:string) => {
    setPassword(value)
  }

  const doubleCheckInput = (value:string) => {
    setCheckPassword(value)
  }

  const onSubmit = async (e:MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setFormTouch(true)
    if (accountIsValid && passwordIsValid && checkPasswordIsValid) {
      let params = {
        username: account,
        password: password,
        name: userName,
      }
      try {
        const res = await axios.post<CommonApiResponse>('https://l8-upgrade-apis.herokuapp.com/api/register', params)
        if(res.data.success){
          const res = await axios.post<CommonApiResponse&{token: string}>('https://l8-upgrade-apis.herokuapp.com/api/login', params)
          localStorage.setItem('token',res.data.token)
          history.push('/home')
        }
      } catch (error:any) {
        setAlert({show: true, msg: error.response.data.message, type: 'error'})
      }
    }
  }

  const accountVerify = (value:string) => {
    let obj = {
      status: true,
      message: ''
    }
    if (value.trim() !== '' && value.includes('@')) {
      accountIsValid = true
      return obj
    } else {
      obj.status = false
      obj.message = '???????????????'
      return obj
    }
  }

  const passwordVerify = (value:string) => {
    let obj = {
      status: true,
      message: ''
    }
    if (value.trim() !== '' && value.trim().length > 3) {
      passwordIsValid = true
      return obj
    } else {
      obj.status = false
      obj.message = '???????????????'
      return obj
    }
  }

  const confirmVerify = (value:string) => {
    let obj = {
      status: true,
      message: ''
    }
    if (value.trim() !== '' && value === password) {
      checkPasswordIsValid = true
      return obj
    } else if (value.trim() !== '' && value !== password) {
      obj.status = false
      obj.message = '???????????????'
      return obj
    } else {
      obj.status = false
      obj.message = '?????????????????????'
      return obj
    }
  }

  return (
    <>
      {alert.show && ReactDOM.createPortal(<Toast type={alert.type} message={alert.msg} />, document.getElementById('modal-root')!)}
      <div className="bg-white lg:w-5/12 md:6/12 w-10/12 m-auto my-10 shadow-md">
        <div className="py-8 px-8 rounded-xl flex flex-col">
          <h1 className="font-medium text-2xl mt-3 text-center">??????</h1>
          <form action="" className="mt-6">
            <InputItem label="??????"
                       type="text"
                       change={accountInput}
                       placeholder="???????????????"
                       valid={accountVerify(account)}
                       isTouched={formTouch}
                       required
            />
            <InputItem label="???????????????"
                       type="text"
                       change={userNameInput}
                       placeholder="????????????????????????"
                       valid={{status: true, message:''}}
                       isTouched={formTouch}
            />
            <InputItem label="??????"
                       type="password"
                       change={passwordInput}
                       placeholder="4-8??????????????????????????????????????????????????????"
                       valid={passwordVerify(password)}
                       isTouched={formTouch}
                       visible
                       required
            />
            <InputItem label="????????????"
                       type="password"
                       change={doubleCheckInput}
                       placeholder="4-8??????????????????????????????????????????????????????"
                       valid={confirmVerify(checkPassword)}
                       isTouched={formTouch}
                       visible
                       required
            />
            <Link
              className="block text-center text-blue-600 p-3 duration-300 rounded-sm  hover:text-blue-300 w-3/12 m-auto"
              to='/login'>????????????
            </Link>
            <button
              className="block text-center text-white bg-blue-700 p-1 duration-300 rounded-md hover:bg-blue-500 w-1/5 m-auto"
              onClick={onSubmit}>??????
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
