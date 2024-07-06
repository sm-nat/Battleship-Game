import React from 'react'
//import { useState } from 'react'
import { useNavigate, Route, Routes } from 'react-router-dom'

import { Header } from './Header.jsx'
import { Footer } from './Footer.jsx'
import { Play } from './Play.jsx'
import { Board } from './Board.jsx'
import './App.css'


function App() {
  const navigate = useNavigate();

  const startPlay = () => {
    navigate('/board');
  }
 
  return (
   
    <div> 
      <Header />
      <Routes>
        <Route path="/" element={<Play startPlay={startPlay} />} />
        <Route path="/board" element={
          <div className='boards-container'>
          <Board title="⚓️ Tu tablero de batalla ⚓️"/>
          <Board title="🦾 Computador" />
          </div>
        } /> 
      </Routes>
      <Footer />
    </div>
  )
}

export default App
