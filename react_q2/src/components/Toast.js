const Toast = (obj) => {
  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 flex items-center bg-white py-4 px-4 shadow-md rounded-full mt-2 m-auto">
      {obj.type === 'success' && (
        <>
          {/* Success icons */}
          <div className="text-white rounded-full bg-green-500 mr-3">
            <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" className="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
            </svg>
          </div>
          {/* message */}
          <div className="text-black max-w-xs ">
            Success
          </div>
        </>
      )}
      {obj.type === 'error' && (
        <>
          {/* Error icons */}
          <div className="text-white rounded-full bg-red-500 mr-3">
            <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
              <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
            </svg>
          </div>
          {/* message */}
          <div className="text-black max-w-xs ">
            {obj.message}
          </div>
        </>
      )}
    </div>
  )
}

export default Toast
