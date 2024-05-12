import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=979685bc93d64c61abbd5f0bfa9a9b79&response_type=code&redirect_uri=http://localhost:5173/callback&scope=ugc-image-upload user-read-recently-played user-top-read user-read-playback-position user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private user-library-modify user-library-read user-read-email user-read-private"

  return (

    <div className='flex bg-[#101016] min-h-[100vh] justify-center align-middle'>
      <div className='w-[50%] bg-[#101016] space-y-10 pl-10 m-auto '>
        <div className='pr-20'>
          <h1 className='font-mono text-3xl font-bold text-[#d61d4c] '>BETTER SPOTIFY</h1>
          <p className='text-gray-500 font-thin'>Better spotify offers a refined approach to music discovery, tailoring playlists and recommendations to suit your individual taste. Dive into a world of curated tracks and personalized suggestions that go beyond the ordinary. With MelodyCraft, your music journey is crafted to perfection</p>
        </div>
        <Link  to={AUTH_URL}><button className='bg-[#d61d4c] mt-10 h-10 p-2 rounded-lg font-bold text-white'>Login With Spotify</button></Link>
      </div>
      <div className='w-[50%] '>
        <img className='object-cover h-[100%]' src="https://cdn.dribbble.com/users/729161/screenshots/11233158/media/ef3635b8795130c555b15faabbb9e331.png" alt="login off side" />
      </div>
    </div>
  )
}

export default Login