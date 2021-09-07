import {useState, useEffect} from 'react'

let firstRender = true

const InputItem = (props) => {
  const [show, setShow] = useState(true)
  const [touched, setTouched] = useState(false)
  const [_inputValue, setInputValue] = useState('')
  let inputIsInvalid = touched && !props.valid.status

  useEffect(() => {
    if(firstRender){
      firstRender = false
      return
    }
    if(props.touched){
      setTouched(true)
    }
  },[props.touched])

  function handleInput(e) {
    setInputValue(e.target.value)
    props.change(e.target.value)
  }

  function handleShow() {
    setShow(!show)
  }

  const inputTouched = () => {
    setTouched(true)
  }

  const checkLabel = () => {
    return props.label === '密碼' || props.label === '確認密碼';
  }
  const checkType = (value) => {
    if (checkLabel) {
      if (show) {
        return 'text'
      } else {
        return 'password'
      }
    } else {
      return value
    }
  }

  return (
    <div>
      <div className="relative m-5 text-sm flex justify-between items-center">
        <label className="inline-block text-black text-left w-1/5">{props.label}</label>
        <input type={checkType(props.type)}
               value={props.value}
               placeholder={props.placeholder}
               onChange={handleInput}
               onBlur={inputTouched}
               className="inline-block rounded-sm px-4 py-3 border-2 border-gray-300 w-4/5"/>
        {checkLabel() && (
          <div>
            {/*eyeIcon:顯示*/}
            <svg onClick={handleShow}
                 xmlns="http://www.w3.org/2000/svg"
                 className={`${show ? 'block' : 'hidden'} h-6 w-6 absolute top-3 right-4`}
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            {/*eyeIcon:隱藏*/}
            <svg onClick={handleShow}
                 xmlns="http://www.w3.org/2000/svg"
                 className={`${show ? 'hidden' : 'block'} h-6 w-6 absolute top-3 right-4`} fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
            </svg>
          </div>
        )}
      </div>
      {inputIsInvalid && (
        <div className="relative text-sm flex items-center">
          <div className="inline-block text-red-500 text-left absolute left-32">{props.valid.message}</div>
        </div>
      )}
    </div>
  )
}

export default InputItem
