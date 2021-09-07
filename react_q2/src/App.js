import './App.css'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Routers from '../src/router/router'
import axios from 'axios';

let firstRender = true

function App () {
  const history = useHistory()
  useEffect(() => {
    if(firstRender){
      const token = localStorage.getItem('token')
      axios.get('/api/authentication',{headers: {'AUTHENTICATION_TOKEN': token}}).then(res => {
        if(res.data.success){
          history.push('/home')
        }
      }).catch((error) =>{
        history.push('/login')
      })
      firstRender = false
    }
  },[])

  return (
    <div className="App">
      <Routers/>
    </div>
  )
}

export default App
