import React, { useEffect } from 'react'
import axios from 'axios';
import Player from './Player';

const handle_refresh = async () => {
  const responce = await axios.post("http://localhost:3000/refresh", {
    "refresh_token": localStorage.getItem('refresh_token'),
    "access_token": localStorage.getItem("access_token")
  })
  const currentTime = new Date();
  const currentTimeMs = currentTime.getTime() + (1 * 60 * 60 * 1000);
  localStorage.setItem("access_token", responce.data['access_token'])
  localStorage.setItem("expires_in", currentTimeMs)
}


const Home = () => {
  useEffect(() => {
    const currentTime = new Date();
    const currentTimeMs = currentTime.getTime();
    if (localStorage.getItem('expires_in') > currentTimeMs) {
      handle_refresh()
    }
  }
  )
    ;


  return (
    <Player />
  )
}

export { handle_refresh }
export default Home
