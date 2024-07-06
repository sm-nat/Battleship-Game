import React from 'react'
import { useState } from 'react'
import { useNavigate, Route, Routes, Router } from 'react-router-dom'

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
        <Route path="/board" element={<Board />} /> 
      </Routes>
      <Footer />
    </div>
  )
}

export default App
