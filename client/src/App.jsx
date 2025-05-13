import React from 'react'
import { ToastContainer } from "react-toastify"
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'

const App = () => {
  return (
    <>
    <ToastContainer theme='dark'/>
    <Routes>
      <Route path="/" element={<Home />}/>
    </Routes>
    </>
  )
}

export default App