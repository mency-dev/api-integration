
import './App.css'
import Todos from './pages/todos/todos'
import { Route, Router, Routes } from 'react-router-dom'
import Tasks from './pages/todos/tasks'
import Home from './api-login-flow/home'
import RoutePage from './potd/routePage'
import Login from './api-login-flow/pages/login'
import HomePage from './api-login-flow/pages/homePage'

function App() {
  

  return (
    <>
      
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path='/home' element={<Home></Home>}>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="homePage" element={<HomePage></HomePage>}></Route>
        </Route>
        <Route path='/routePage/*' element={<RoutePage></RoutePage>}></Route>
        <Route path="/todo/:id" element={<Tasks/>} />
      </Routes>
   
    </>
  )
}

export default App
