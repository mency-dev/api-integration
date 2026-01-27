import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Todos from './pages/todos/todos'
import { Route, Router, Routes } from 'react-router-dom'
import Tasks from './pages/todos/tasks'
import Home from './api-login-flow/home'
import RoutePage from './potd/routePage'

function App() {
  

  return (
    <>
      
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path='/home/*' element={<Home></Home>}></Route>
        <Route path='/routePage/*' element={<RoutePage></RoutePage>}></Route>
        <Route path="/todo/:id" element={<Tasks/>} />
      </Routes>
   
    </>
  )
}

export default App
