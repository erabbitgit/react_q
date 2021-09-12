import { Link } from 'react-router-dom'
import AuthorizationPage from "@/components/AuthorizationPage";

const Home = () => {
  AuthorizationPage()
  return (
    <>
      <h1>Home Page</h1>
      <Link
        className="block text-center text-blue-600 p-3 duration-300 rounded-sm  hover:text-blue-300 w-3/12 m-auto"
        to='/news'>
        最新消息
      </Link>
    </>
  )
}

export default Home
