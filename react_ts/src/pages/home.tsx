import {useContext, useEffect, useState} from 'react'
import LoginAuthContext from '@/store/loginAuth-context'
import axios from "axios";
import Modal from '@/components/modal'
import {CommonApiResponse, Iuser} from "@/commonType";

const Home = () => {
  const {isAuth, loginAuth} = useContext(LoginAuthContext)
  const [hadUserName, setHadUserName] = useState(false)
  useEffect(() => {
    checkUserName()
  })

  const checkUserName = () => {
    const account = localStorage.getItem('account')
    axios.get<CommonApiResponse<Iuser>>(`https://l8-upgrade-apis.herokuapp.com/api/users/${account}`)
      .then(res => {
        if (res.data.data.name) {
          //通過驗證，存 name 到 store
          setHadUserName(true)
          console.log(res.data,'----get User')
        }
      }).catch((error) => {
      console.log(error.response, '---------LoginAuth Fail')
    })
  }
  // if(!isAuth) return loginAuth()
  return (
    <div>
      <h1>Home Page</h1>
      {!hadUserName && <Modal />}
    </div>
  )
}

export default Home
