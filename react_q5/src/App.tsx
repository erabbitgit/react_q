import React, {useEffect, useState} from 'react';
import './App.css';
import {FaRegThumbsUp, FaRegThumbsDown, FaRegClock} from "react-icons/fa";
import {io} from "socket.io-client";

function App() {
    const [messages, setMessages] = useState([])
    const socket = io('https://l8-upgrade-ws-api1.herokuapp.com/', {
        extraHeaders: {
            'user_info': JSON.stringify({
                id: sessionStorage.getItem('id') || '',
                name: 'Elisa'
            })
        }
    })

    useEffect(() => {
        console.log(socket.connected, messages,1111111111);
        if (!socket.connected) {
            socket.on('connection', obj => {
                console.log('connection', obj)
                if (!sessionStorage.getItem('id')) {
                    sessionStorage.setItem('id', obj.user.id)
                }
                setMessages(obj.messages)
            })
            initSocket()
        }
    }, [])

    const initSocket = () => {
        console.log('initSocket!!!')
    }

    const GetMessages = () => {
        messages.map(item => {
            console.log(item)
        })
        return <></>
    }

    // @ts-ignore
    return (
        <div className="flex h-screen w-screen">
            <div className="flex items-center justify-center m-auto h-5/6 w-5/6 bg-blue-900 text-center">
                <div className="flex flex-col bg-blue-500 w-3/12 h-full">
                    <div className="bg-blue-100 flex items-center justify-center h-1/6 mb-4 text-6xl">
                        <FaRegClock className='mr-2'/>
                        <div className='mb-2'>60:00</div>
                    </div>
                    <div className="bg-blue-200 flex-1">
                        <ul>
                            <li className="bg-blue-50 flex items-center">
                                <div className="relative w-1/4 h-20">
                                    <img src="http://fakeimg.pl/60/555555/FFA500/?text=F" alt=""
                                         className="rounded-full m-3"/>
                                    <div
                                        className="absolute top-2 left-2 flex items-center justify-center border-black border-2 rounded-full w-5 h-5">
                                        <p>1</p>
                                    </div>
                                    <div className="absolute right-0 bottom-2 w-1 h-1 bg-green-500 rounded-full"></div>
                                </div>
                                <div className="ml-3">
                                    <div className="flex items-center">
                                        <p>frank (you)</p>
                                        <p>12分</p>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <FaRegThumbsUp className='mr-2 text-lg'/>
                                        <FaRegThumbsDown className='mr-2 text-lg'/>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col bg-pink-400 w-5/12 h-full mx-3">
                    <div className="bg-blue-100 h-1/3 mb-4">
                        題目名稱 & 簡述
                    </div>
                    <div className="bg-blue-200 flex-1">
                        題目詳情
                    </div>
                </div>
                <div className="relative flex justify-center bg-green-500 w-4/12 h-full">
                    <div>
                        <GetMessages />
                    </div>
                    <div className="absolute flex justify-center bottom-0 mb-3 w-full">
                        <input className="w-4/6" type="text"/>
                        <button className="bg-blue-300 w-14 h-6 rounded-sm ml-3">送出</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
