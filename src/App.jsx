
import './App.css'
import Todos from './pages/todos/todos'
import { Route, Router, Routes } from 'react-router-dom'
import Tasks from './pages/todos/tasks'
import RoutePage from './potd/routePage'
import Login from './api-login-flow/pages/login'
import Home from './api-login-flow/home'
import HomePage from './api-login-flow/pages/homePage'
import Institute from './api-login-flow/pages/institute'
import { UserProvider } from './api-login-flow/context/UserContext'
import InstituteReviewPage from './api-login-flow/pages/InstituteReviewPage'

function App() {
  

  return (
    <>
      
      <Routes>
        <Route path="/" element={<Todos />} />
        
        <Route path='/home' element={<UserProvider><Home/></UserProvider>}>
        <Route path="login" element={<Login/>}></Route>
        <Route path="homePage" element={<HomePage/>}></Route>
        <Route path='institute/:id' element={<Institute></Institute>}></Route>
        <Route path="institute/:id/reviews" element={<InstituteReviewPage />} />
        </Route>
        <Route path='/routePage/*' element={<RoutePage></RoutePage>}></Route>
        <Route path="/todo/:id" element={<Tasks/>} />
      </Routes>
   
    </>
  )
}

export default App
