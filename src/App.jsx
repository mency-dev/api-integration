import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Todos from './pages/todos/todos'
import { Route, Router, Routes } from 'react-router-dom'
import Tasks from './pages/todos/tasks'

function App() {
  

  return (
    <>
      
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/todo/:id" element={<Tasks/>} />
      </Routes>
   
    </>
  )
}

export default App
