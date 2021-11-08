import React, {useEffect, useState, useRef} from 'react';
import './App.css';
import {FaRegThumbsUp, FaRegThumbsDown, FaRegClock} from "react-icons/fa";
import {io, Socket} from "socket.io-client";

function App() {
    interface IQuestion {
        contents: any[];
        description: string;
        id: number | null;
        matches: any[];
        title: string;
    }

    const [webSocket, setWebsocket] = useState<Socket | null>(null)
    const [timer, setTimer] = useState(300)
    const [users, setUsers] = useState<any[]>([{}])
    const [user, setUser] = useState<{ id: string }>({id: ''})
    const [question, setQuestion] = useState<IQuestion>({
        contents: [],
        description: "",
        id: null,
        matches: [],
        title: "",
    })
    const [messages, setMessages] = useState<any[]>([])
    const [message, setMessage] = useState('')
    const scrollRef = useRef({scrollTop: 0, scrollHeight: 0})

    /* 建立連線 */
    useEffect(() => {
        setWebsocket(
            io('https://l8-upgrade-ws-api1.herokuapp.com/', {
                extraHeaders: {
                    'user_info': JSON.stringify({
                        id: sessionStorage.getItem('id') || '',
                        name: 'eee'
                    })
                }
            })
        )
    }, [])

    useEffect(() => {
        if (webSocket) {
            webSocket.on('connection', (data) => {
                console.log('socket is connect ===> ', webSocket.connected)
                let {users, question, messages, user} = data
                console.log(data, '-------------data')
                if (sessionStorage.getItem('id') === null) {
                    sessionStorage.setItem('id', user.id)
                }
                setMessages(messages)
                setQuestion(question)
                setUser(user)
                setUsers(users)
            })
        }
        return () => {
            webSocket?.disconnect()
            console.log('socket is close ===> ', webSocket)
        }
    }, [webSocket])

    /* Left */
    useEffect(() => {
        if (!timer) {
            console.log('Times up')
            return
        }
        const intervalId = setInterval(() => {
            setTimer(timer - 1)
        }, 1000)

        return () => clearInterval(intervalId)
    }, [timer])

    const timeLeft = () => {
        let calSeconds = (timer / 60).toFixed(0)
        let calMinutes = (timer % 60)
        if (calSeconds <= '9' && calMinutes >= 10) {
            return 0 + (timer / 60).toFixed(0) + ':' + calMinutes
        } else if (calSeconds <= '9' && calMinutes <= 9) {
            return 0 + (timer / 60).toFixed(0) + ':' + 0 + calMinutes
        }
    }

    const handleBless = (type: string, id: string) => {
        webSocket?.emit('bless', {
            type: type,
            userId: id,
        })
    }

    const getUserList = users.map((item, i) => {
        let nameFirstWord
        if (item.name) {
            nameFirstWord = item.name.split("")[0]
        }
        return (
            <li className="bg-blue-50 flex items-center">
                <div className="relative w-1/4 h-20">
                    <img src={`http://fakeimg.pl/60/429bf5/FFFFFF/?text=${nameFirstWord}&font_size=32`}
                         alt="" className="rounded-full m-3"/>
                    <div
                        className="absolute top-2 left-2 flex items-center justify-center border-gray-700 border bg-white rounded-full w-5 h-5">
                        <p className="text-sm text-gray-700">1</p>
                    </div>
                    <div className="absolute right-0 bottom-4 -right-1 w-1 h-1 bg-green-500 rounded-full"></div>
                </div>
                <div className="ml-3">
                    <div className="flex items-center">
                        <p className="ml-1">{item.name}</p>
                        {item.id === user.id && <p className="ml-1">(you)</p>}
                        <p className="ml-1">{item.score}分</p>
                    </div>
                    <div className="flex items-center mt-2 ml-1">
                        <button onClick={() => handleBless('GOOD', item.id)}><FaRegThumbsUp className='mr-2 text-lg'/>
                        </button>
                        <button onClick={() => handleBless('BAD', item.id)}><FaRegThumbsDown className='mr-2 text-lg'/>
                        </button>
                    </div>
                </div>
            </li>
        )
    })

    /* Center */
    const giveUpBtn = () => {
        webSocket?.emit('giveUp')
    }

    const GetQuestion = () => {
        return (
            <div>
                <div className="text-6xl font-bold">{question.title}</div>
                <div className="text-sm text-gray-400 p-5">{question.description}</div>
            </div>
        )
    }

    const getQuestionDetail = question.contents.map((item, i) => {
        return (
            <div className="flex justify-items-start p-1" key={i}>
                <div>{item.name}</div>
            </div>
        )
    })

    /* Right */
    useEffect(() => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }, [messages])

    const getMessages = messages.map((item, i) => {
        return (
            <div
                className="flex justify-start"
                key={i}>
                {item.type !== 'MESSAGE' &&
                    <p className={
                        item.type === 'JOIN' || item.type === 'ANSWER' && item.pass === true ? 'text-green-600' :
                        item.type === 'LEAVE' || item.type === 'ANSWER' && item.pass === false || item.type === 'GIVE_UP'? 'text-red-600' :
                        item.type === 'BLESS_YOU' ? 'text-gray-500' : ''}
                    >{item.dateTime + ' ' + item.message}</p>}
                {item.type === 'MESSAGE' && <p>{item.dateTime + ' ' + item.from.name + ': ' + item.message}</p>}
            </div>
        )
    })

    const handleEnterKey = (e: any) => {
        if (e.keyCode === 13 && !e.ctrlKey) {
            onSubmitMessage()
        }
        if (e.keyCode === 13 && e.ctrlKey) {
            webSocket?.emit('answer', message)
        }
    }

    const onSubmitMessage = () => {
        webSocket?.emit('message', message)
        setMessage('')
    }

    return (
        <div className="flex h-screen w-screen">
            <div className="flex items-center justify-center m-auto h-5/6 w-5/6 text-center">
                <div className="flex flex-col w-3/12 h-full">
                    <div className="flex items-center justify-center h-1/6 mb-4 text-6xl">
                        <FaRegClock className='mr-2'/>
                        <div className='mb-2'>{timeLeft()}</div>
                    </div>
                    <div className="flex-1 border-solid border-gray-700 border-2 overflow-y-auto">
                        <ul>
                            {getUserList}
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col w-5/12 h-full mx-3">
                    <div className="absolute p-3 text-blue-500">
                        <button onClick={giveUpBtn}>放棄</button>
                    </div>
                    <div className="flex items-center h-1/3 mb-4 border-solid border-gray-700 border-2">
                        <GetQuestion/>
                    </div>
                    <div className="flex-1 border-solid border-gray-700 border-2 p-2">
                        {getQuestionDetail}
                    </div>
                </div>
                <div className="relative flex justify-start w-4/12 h-full border-solid border-gray-700 border-2">
                    <div className="h-auto overflow-hidden mt-3 ml-4 mb-14 text-sm overflow-y-auto"
                         ref={scrollRef as React.RefObject<HTMLDivElement>}>
                        {getMessages}
                    </div>
                    <div className="absolute flex justify-center bottom-0 mb-3 w-full">
                        <input className="w-4/6 border border-gray-700 rounded-sm"
                               type="text"
                               value={message}
                               onKeyDown={(e) => handleEnterKey(e)}
                               onChange={(e) => setMessage(e.target.value)}/>
                        <button
                            className="bg-blue-500 text-white w-14 h-6 rounded-sm ml-3 text-sm"
                            onClick={onSubmitMessage}>送出
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
