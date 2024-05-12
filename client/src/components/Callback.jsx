import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'


const Callback = () => {
  const code = new URLSearchParams(window.location.search).get('code')
  const handleCallback = async () => {

    if (code) {
      try {
        const response = await axios.post('http://localhost:3000/login', { code });
        const { access_token, refresh_token } = response.data;
        const currentTime = new Date();
        const oneHourLater = new Date(currentTime.getTime() + (1 * 60 * 60 * 1000));
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token)
        localStorage.setItem('expires_in', oneHourLater)
        window.location = '/';
      } catch (error) {
        console.error('Login failed:', error);
      };
    }
  }

  useEffect(() => {
    handleCallback()
  })
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
      <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
      <p className="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>
    </div>
  )
}

export default Callback