import { useHistory } from 'react-router-dom'
const Home = () => {
  const history = useHistory()
  const goNews = () => {
    history.push('/news')
  }
  return(
    <>
    <h1>Home Page</h1>
      <button
        className="block text-center text-blue-600 p-3 duration-300 rounded-sm  hover:text-blue-300 w-3/12 m-auto"
        onClick={goNews}>最新消息
      </button>
    </>
  )
}

export default Home
