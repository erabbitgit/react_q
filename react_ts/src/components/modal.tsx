import ReactDOM from "react-dom";
import InputItem from "@/components/InputItem";
import axios from "axios";
import {useState} from "react";

const Modal = () => {
  const [userName, setUserName] = useState('')
  const [formTouch, setFormTouch] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)

  const userNameInput = (value:any) => {
    console.log(value,'--------userNameInput')
    setUserName(String(value));
  }

  const userNameVerify = (value:string) => {
    let obj = {
      status: true,
      message: ''
    }
    if(value) {
      obj.status = true
      return obj
    }
    return obj
  }

  const onSubmitUserName = () => {
    if(!isInvalid) return false
    axios.put('https://l8-upgrade-apis.herokuapp.comapi/users/updateName', {name: userName})
      .then(res => {
        console.log(res.data,'設定成功')
      }).catch((error) => {
      console.log(error.response, '---------Set UserName Fail')
    })
  }

  return (
    <>
      {ReactDOM.createPortal(
        <div className={'fixed bg-gray-500 bg-opacity-50 w-full m-auto flex items-center justify-center inset-0'}>
          <div className={'bg-white w-1/3 h-1/3 shadow-md flex items-center justify-center'}>
            <div className="py-8 px-8 rounded-xl flex flex-col">
              <h2 className="font-medium text-2xl mt-3 text-center font-semibold">使用者資料補全</h2>
              <form action="" className={'mt-3'}>
                <InputItem
                  label='使用者名稱'
                  type='text'
                  change={userNameInput}
                  placeholder='請輸入帳號'
                  valid={userNameVerify(userName)}
                  isTouched={formTouch}
                  required
                />
                <button
                  className="block text-center text-white bg-blue-500 p-1 duration-300 rounded-md hover:bg-blue-500 w-1/5 m-auto mt-3"
                  onClick={onSubmitUserName}>確定
                </button>
              </form>
            </div>
          </div>
        </div>, document.getElementById('modal-root')!)}
    </>
  )
}

export default Modal