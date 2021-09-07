import { useHistory } from 'react-router-dom'
const News = () => {
  const history = useHistory()
  const goHome = () => {
    history.push('/home')
  }
  return(
    <>
      <h1>News</h1>
      <button
        className="block text-center text-blue-600 p-3 duration-300 rounded-sm  hover:text-blue-300 w-3/12 m-auto"
        onClick={goHome}>返回首頁
      </button>
    </>
  )
}

export default News