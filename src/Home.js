import React, { useEffect, useState, useRef, useCallback } from 'react'
import axios from 'axios';

import TabsCard from './TabsCard'
import { object } from 'prop-types';

const Home = ({changePage}) => {
  const [username, setUsername] = useState('');
  const [histories, setHistories] = useState([]);
  const [devices, setDevices] = useState([]);
  const socket = useRef(null);

  const login = useCallback(async (token) => {
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
      changePage('login')
    }
  }, [changePage])

  const fetchDeviceList = async (token) => {
    try {
      const result = await axios.get('/users/token/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
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
      if (!(socket.current instanceof object)) {
        socket.current = new WebSocket(`wss://6dbb1786.ngrok.io/user/check/?token=${token}`);
        socket.current.onopen = () => {
          console.log('connect')
          const data = { status : 'login' }
          socket.current.send(JSON.stringify(data));
        }
        socket.current.onmessage = (event) => {
          const result = JSON.parse(event.data)
          if(!result.is_logged_in) {
            localStorage.removeItem('token')
            changePage('login')
          } else {
            setDevices(result.data)
          }
        }
      }
    } else {
      changePage('login')
    }
    return () => {
      socket.current.close();
    }
  }, [changePage, login])
  return (
    <div style={{margin: '16px', textAlign: 'center'}}>
      <br />
      <h1 style={{display: 'inline-block'}}>{username}님이 로그인 하셨습니다.</h1><span onClick={()=> {
        localStorage.removeItem('token')
        changePage('login')
      }}
      style={{
        color: 'blue',
        marginLeft: '8px',
      }}
      >로그아웃</span>
      <TabsCard histories={histories} devices={devices} logOut={logOut} />
    </div>
  )
}

export default Home