import { Link } from 'react-router-dom'
const News = () => {
  return(
    <>
      <h1>News</h1>
      <Link
        className="block text-center text-blue-600 p-3 duration-300 rounded-sm  hover:text-blue-300 w-3/12 m-auto"
        to='/home'>返回首頁
      </Link>
    </>
  )
}

export default News