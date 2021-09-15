import { NavLink } from 'react-router-dom'
import '@/App.css'

const Navigation = () => {
  return (
    <div className="relative h-screen w-36 border-r border-gray-500">
      <div className="absolute inset-0">
        <NavLink className='block py-5' to="/personalManagement">個人資料管理</NavLink>
        <NavLink className='block py-5' to="/memberManagement" activeClassName="selected">會員管理</NavLink>
      </div>
    </div>
  )
}

export default Navigation
