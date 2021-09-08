import {useState, useEffect} from 'react'
import { EyeOpen, EyeClose } from '../assets/image'

let firstRender = true

const InputItem = props => {
  const {
    label,
    type,
    inputValue,
    placeholder,
    change,
    valid,
    isTouched,
    visible = false,
    required = false,
  } = props

  const [show, setShow] = useState(true)
  const [touched, setTouched] = useState(false)
  const [_inputValue, setInputValue] = useState('')
  let inputIsInvalid = touched && !valid.status

  useEffect(() => {
    if(firstRender){
      firstRender = false
      return
    }
    if(isTouched){
      setTouched(true)
    }
  },[isTouched])

  function handleInput(e) {
    setInputValue(e.target.value)
    change(e.target.value)
  }

  function handleShow() {
    setShow(!show)
  }

  const inputTouched = () => {
    setTouched(true)
  }

  return (
    <div>
      <div className="relative m-5 text-sm flex justify-between items-center">
        { required ? <div className="text-red-500 pr-1">*</div> : <div className="pr-1">&ensp;</div>}
        <label className="inline-block text-black text-left w-1/5">{label}</label>
        <input type={visible ? show ? 'text' : 'password' : type }
               value={inputValue}
               placeholder={placeholder}
               onChange={handleInput}
               onBlur={inputTouched}
               className={`${inputIsInvalid ? 'border-red-500':'' } inline-block rounded-sm px-4 py-3 border-2 border-gray-300 w-4/5 focus:outline-none`}/>
        {visible && (
          <div>
            <EyeOpen handleShow={handleShow} show={show} />
            <EyeClose handleShow={handleShow} show={show} />
          </div>
        )}
      </div>
      {inputIsInvalid && (
        <div className="relative text-sm flex items-center">
          <div className="inline-block text-red-500 text-left absolute left-32">{valid.message}</div>
        </div>
      )}
    </div>
  )
}

export default InputItem
