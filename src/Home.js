import React, {useEffect, useState, useRef } from 'react'
import axios from 'axios';

import TabsCard from './TabsCard'

const Home = (props) => {
  const [username, setUsername] = useState('');
  const [histories, setHistories] = useState([]);
  const [devices, setDevices] = useState([]);
  const socket = useRef(null);

  const login = async (token) => {
    try {
      const result = await axios.get('/histories/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUsername(result.data.username)
      setHistories(result.data.data)
    } catch(error) {
      console.log(error);
      localStorage.removeItem('token')
      props.history.push('/login')
    }
  }

  const fetchDeviceList = async (token) => {
    try {
      const result = await axios.get('/users/token/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(22, result.data)
      setDevices(result.data)
    } catch(error) {
      console.log(error);
    }
  }

  const logOut = (token) => {
    socket.current.send(JSON.stringify({ token }));
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!!token && token.length > 0) {
      login(token);
      fetchDeviceList(token);
      socket.current = new WebSocket(`ws://192.168.1.11:8000/user/check/?token=${token}`);
      socket.current.onopen = () => {
        console.log('connect')
        const data = { status : 'login' }
        socket.current.send(JSON.stringify(data));
      }
      socket.current.onmessage = (event) => {
        console.log(event.data)
        const result = JSON.parse(event.data)
        if(!result.is_logged_in) {
          localStorage.removeItem('token')
          props.history.push('/login')
        } else {
          setDevices(result.data)
        }
      }
    } else {
      props.history.push('/login')
    }
  }, [])
  return (
    <div style={{margin: '16px'}}>
      <br />
      <div onClick={()=> {
        localStorage.removeItem('token')
        props.history.push('/login')
      }}>로그아웃</div>
      <h1>{username}님이 로그인 하셨습니다.</h1>
      <TabsCard histories={histories} devices={devices} logOut={logOut} />
    </div>
  )
}

export default Home