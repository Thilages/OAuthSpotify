import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import { useEffect } from 'react'
import Home from './components/Home'
import Callback from './components/Callback'

const App = () => {

  const access_token = localStorage.getItem("access_token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={access_token ? <Home token={access_token}/> : <Login />} />
        <Route path='/callback' element={<Callback/>}/>
      </Routes>
    </BrowserRouter>

  );
};

export default App