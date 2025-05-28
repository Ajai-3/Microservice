import React from 'react'
import { ToastContainer } from "react-toastify"
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <ToastContainer theme='dark' />
    </>
  )
}

export default App