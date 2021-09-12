import './App.css'
import { Suspense } from 'react'
import Routers from '@/router/router'
import Layout from '@/layout/layout'

function App () {
  return (
    <div className="App">
      <Layout />
      <Suspense fallback={<></>}>
        <Routers/>
      </Suspense>
    </div>
  )
}

export default App
