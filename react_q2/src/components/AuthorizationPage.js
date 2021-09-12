import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from "axios";

const AuthorizationPage = () => {
  const [isVerified, setIsVerified] = useState(false)
  const history = useHistory()
  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get('https://l8-upgrade-apis.vercel.app/api/user', { headers: { 'Authorization': `Bearer ${token}`} })
      .then(res => {
        if (res.data.success) {
          setIsVerified(true)
          history.push('/home')
        }
      }).catch((error) => {
      history.push('/login')
    })
  }, [])
  if (!isVerified) return <>驗證中...</>
}

export default AuthorizationPage