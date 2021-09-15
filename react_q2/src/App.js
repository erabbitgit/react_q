import './App.css'
import {Suspense} from 'react'
import Routers from '@/router/router'
import {LoginAuthProvider} from '@/store/loginAuth-context'

function App() {
  return (
    <LoginAuthProvider>
      <div className="App">
        <Suspense fallback={<>載入中...</>}>
          <Routers/>
        </Suspense>
      </div>
    </LoginAuthProvider>
  )
}

export default App
