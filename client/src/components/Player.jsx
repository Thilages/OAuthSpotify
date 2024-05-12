import React from 'react'
import { useState, useEffect } from 'react';


import { RiShareForwardFill } from "react-icons/ri";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import { FaPause, FaPlay } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { useRef } from 'react';
import { GetUserLinked } from './Userliked';



// Example usage


const Player = () => {

  // states
  const [isplaying, setisplaying] = useState(false)
  const [current_duration, setcurrent_duration] = useState(0)
  const [songtime_seconds, setsongtime_seconds] = useState(114)
  const [artist_name, setartist_name] = useState("")
  const [song_name, setsong_name] = useState()
  const [card_color, setcard_color] = useState()
  const [songlist, setsonglist] = useState([])
  const [background, setbackground] = useState()
  const [current_index, setcurrent_index] = useState(0)
  const [audio, setaudio] = useState("https://p.scdn.co/mp3-preview/fbc52df880d479ab0e34ee46bcc817a9f8b52a35?cid=979685bc93d64c61abbd5f0bfa9a9b79")
  const [songcover, setsongcover] = useState('https://i.scdn.co/image/ab67616d0000b273b60ddc160e2d49c6f41e8a4f')

  // references
  const seekbar = useRef()
  const audioplayer = useRef()
  const animation = useRef()




  const color = ["#CBE4F9", "#CDF5F6", "#EFF9DA", "#F9EBDF", "#F9D8D6", "#D6CDEA"]
  // seekbar control
  const handleseekbar = () => {
    setcurrent_duration(seekbar.current.value)
    audioplayer.current.currentTime = seekbar.current.value
  }

  // fetching users liked songs
  useEffect(() => {
    GetUserLinked(setsonglist)

  }, [])


  const getRandomItem = list => list[Math.floor(Math.random() * list.length)]

  // displaying first song
  useEffect(() => {
    if (songlist && songlist.length > 0) {
      console.log(songlist[0]['track']['artists'][0]['name'])
      setartist_name(songlist[0]['track']['artists'][0]['name'])
      setsong_name(songlist[0]['track']["name"])
      setaudio(songlist[0]['track']['preview_url'])
      setsongcover(songlist[0]['track']['album']['images'][0]['url'])
      setsongtime_seconds(audioplayer.current.duration)
      const card = getRandomItem(color)
      setcard_color(card)
      

      // console.log(Math.floor(songtime_seconds % 60))
    }
  }, [songlist])


  // play pause conditions
  const handlePausePlay = () => {
    if (isplaying) {
      audioplayer.current.pause()

      setisplaying(false)
    }
    else {
      audioplayer.current.play()
      setisplaying(true)
    }
  }

  // i gave up can't do this without chatgpt
  useEffect(() => {
    const updateTime = () => {
      // console.log(audioplayer.current.currentTime,audioplayer.current.duration)
      // if(audioplayer.current.currentTime == audioplayer.current.duration){
      //   next_song()

      // }
      setcurrent_duration(audioplayer.current.currentTime);
      seekbar.current.value = audioplayer.current.currentTime;
    };
    audioplayer.current.addEventListener('timeupdate', updateTime);
    return () => {
      audioplayer.current.removeEventListener('timeupdate', updateTime);
    };
  }, []);

  // playing next song
  const next_song = () => {
    setaudio(songlist[current_index + 1]['track']['preview_url'])
    setsongcover(songlist[current_index + 1]['track']['album']['images'][0]['url'])
    setisplaying(false)
    audioplayer.current.pause()
    setcurrent_duration(0)
    setsongtime_seconds(audioplayer.current.duration)
    setcurrent_index(current_index + 1)
    setartist_name(songlist[current_index + 1]['track']['artists'][0]['name'])
    setsong_name(songlist[current_index + 1]['track']["name"])
    setcard_color(getRandomItem(color))
    // if(setisplaying){
    //   audioplayer.current.play()
    // }
  }

  // previos song
  const previous_song = () => {
    if (current_index != 0) {
      console.log(songlist[current_index - 1]['track']['preview_url'])
      setaudio(songlist[current_index - 1]['track']['preview_url'])
      setsongcover(songlist[current_index - 1]['track']['album']['images'][0]['url'])
      setisplaying(false)
      audioplayer.current.pause()
      setcurrent_duration(0)
      setsongtime_seconds(audioplayer.current.duration)
      setcurrent_index(current_index - 1)
      setartist_name(songlist[current_index - 1]['track']['artists'][0]['name'])
      setsong_name(songlist[current_index - 1]['track']["name"])
      setcard_color(getRandomItem(color))
    }

  }


  return (
    <div className='min-h-[100vh] w-[100%]  flex justify-center ' style={{ backgroundColor: card_color }}>
      <audio src={audio} ref={audioplayer} />
      <div className={`player-card rounded-xl relative m-auto w-[360px] bg-gray-100  py-7`}>
        <div className='player-upper flex '>
          <div className='w-72 ml-[-40px] shadow-2xl shadow-black rounded-3xl overflow-hidden absolute' ><img src={songcover}></img></div>
          <div className='ml-auto mr-7 '>
            <div className=' text-gray-400 rounded-full p-3 m-auto hover:bg-white hover:text-gray-700 transition-all'><FaRegHeart size={30} className='m-auto' /></div>
            <div className='text-gray-400 rounded-full p-3 hover:bg-white hover:text-gray-700 transition-all '><RiShareForwardFill size={30} /></div>
            <div className='text-gray-400 rounded-full p-3 hover:bg-white hover:text-gray-700 transition-all ml-[-4px]' onClick={previous_song}><MdSkipPrevious size={35} /></div>
            <div className='text-gray-400 rounded-full p-3 hover:bg-white hover:text-gray-700 transition-all ml-[-4px]' onClick={next_song}><MdSkipNext size={35} /></div>
            <div className='text-white absolute rounded-full drop-shadow-lg shadow-black border-white border-8 p-3 bottom-32 right-5 hover:cursor-pointer' onClick={handlePausePlay}>{isplaying ? <FaPause className='' size={40} /> : <FaPlay className='pl-2' size={40} />}</div>
          </div>
        </div>
        <div className='player mt-20 ml-8 w-full'>
          <p className='font-mono font-extrabold w-40 truncate text-gray-600 text-xl'>{song_name}</p>
          <p className='w-48 truncate font-mono text-gray-500'>{artist_name}</p>
          <p className='text-right px-16 font-extrabold text-gray-700'>{String(Math.floor(songtime_seconds / 60)).padStart(2, '0')}:
            {String(Math.floor(parseInt(songtime_seconds) % 60)).padStart(2, '0')}</p>
          <input type="range" value={current_duration} onChange={handleseekbar} ref={seekbar} max={songtime_seconds} className='progressBar w-[300px]' />
          <p className='font-extrabold text-gray-700'>{String(Math.floor(current_duration / 60)).padStart(2, '0')}:
            {String(Math.floor(parseInt(current_duration) % 60)).padStart(2, '0')}</p>
        </div>
      </div>
    </div>
  )
}

export default Player