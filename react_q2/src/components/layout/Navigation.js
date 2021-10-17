import {NavLink, Redirect} from 'react-router-dom'
import '@/App.css'
import { BiChevronsDown } from "react-icons/bi";
import { BiUser } from 'react-icons/bi'
import { FiUsers } from 'react-icons/fi'

const sidebarData = [
  {
    key: 'account',
    icon: <BiUser className='mr-2 text-lg'/>,
    title: '個人資訊管理',
    path: '/account',
    children: [
      {
        key: 'accountSet',
        title: '帳戶設定',
        path: '/account/profile-setting',
      }]
  },
  {
    key: 'member',
    icon:  <FiUsers className='mr-2 text-lg'/>,
    title: '會員管理',
    path: '/user',
  }
]

const MenuList = (menu) => (
  <li className='block pt-5 text-left ml-6 hover:text-blue-500 cursor-pointer '>
    <NavLink
      className={'flex items-center flex-nowrap'}
      to={menu.path}
      activeStyle={{
        fontWeight: 'bold',
        color: 'blue'
      }}>
      {menu.icon}
      {menu.title}
      {menu.path === '/account' && (<BiChevronsDown className='ml-1 text-lg'/>)}
    </NavLink>

  </li>
)

const Navigation = () => {
  return (
    <div>
      <SideBar menu={sidebarData}/>
    </div>
  )
}

const SideBar = (props) => {
  return (
    <ul className="relative h-screen border-r border-gray-500" style={{width: 190}}>
      {props.menu.map(menu => {
        if (menu.children) {
          return (
            <>
              <MenuList {...menu}/>
              <SideBarChild menu={menu.children}/>
            </>
          )
        } else {
          return (
            <MenuList {...menu}/>
          )
        }
      })}
    </ul>
  )
}

const SideBarChild = (props) => {
  return (
    <ul className="ml-10">
      {props.menu.map(childMenu => <MenuList {...childMenu}/>)}
    </ul>
  )
}

export default Navigation
