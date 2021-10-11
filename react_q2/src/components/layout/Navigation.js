import {NavLink} from 'react-router-dom'
import '@/App.css'

const sidebarData = [
  {
    key: 'account',
    icon: '',
    title: '個人資訊管理',
    path: '/account/profile-setting',
    children: [
      {
        key: 'accountSet',
        title: '帳戶設定',
        path: '/account/profile-setting'
      }]
  },
  {
    key: 'member',
    icon: '',
    title: '會員管理',
    path: '/user',
  }
]

const MenuList = (menu) => (
  <li key={menu.key} className='block pt-5 text-left ml-12 hover:text-blue-500 cursor-pointer'>
    <NavLink
      to={menu.path}
      activeStyle={{
        fontWeight: 'bold',
        color: 'blue'
      }}>{menu.title}</NavLink>
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
    <ul className="relative h-screen border-r border-gray-500" style={{width: 180}}>
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
    <ul className="ml-6">
      {props.menu.map(childMenu => <MenuList {...childMenu}/>)}
    </ul>
  )
}

export default Navigation
