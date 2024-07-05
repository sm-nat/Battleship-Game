import { useState } from 'react'
{/*import { useNavigate, Route, Routes, Router } from 'react-router-dom'*/}

import { Header } from './Header.jsx'
import { Footer } from './Footer.jsx'
import { Play } from './Play.jsx'
import { Board } from './Board.jsx'
import './App.css'




function App() {

 
  return (
   
    <div> 
      <Header />
      <Play />
      <Footer />
    </div>
  )
}

export default App
